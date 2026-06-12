# SHIPPED Status Reversion — Implementation Plan (Revised)

## 🎯 Objective
Allow admins to change order status from **SHIPPED → PROCESSING** or **SHIPPED → CANCELLED**.

---

## 🔍 Complete Execution Flow (Traced)

This is the exact chain from button click to database write:

```
[Frontend] Show.jsx
  │  Admin clicks status badge → GenericDialog opens
  │  Admin selects new status → confirms
  │
  ├─ POST route("order-status-timelines.store")
  │
[Controller] OrderStatusTimelineController::store()
  │  Validates: status, status_at, description
  │  Creates: OrderStatusTimeline entry
  │
  ├─ Observer: OrderStatusTimelineObserver::created()
  │    Fires: EventOrderStatusChanged(order, newStatus)
  │
  ├─ Listener 1: OrderStatusChanged::handle() ← runs first (alphabetical)
  │    Does: $event->order->update(['status' => $newStatus])
  │    Effect: Syncs timeline status → orders.status column
  │
  ├─ Listener 2: OrderStatusChangeNotification::handle()
  │    Does: Sends email to customer based on $newStatus
  │    Messages: processing="being processed", shipped="shipped", cancelled="cancelled"
  │
  └─ Listener 3: OrderStatusChangeReservedItems::handle() ← runs last
       Does: Updates stock_reservations.reservation_status
       Logic: CANCELLED→CANCELLED, SHIPPED→RELEASED, else→NOOP
```

### Critical: Listener Execution Order

Laravel auto-discovers listeners alphabetically:
1. `OrderStatusChanged` (updates `orders.status` to NEW value)
2. `OrderStatusChangeNotification` (sends email)
3. `OrderStatusChangeReservedItems` (updates reservations)

By the time `OrderStatusChangeReservedItems` runs, `$event->order->status` is already the **new** status. The **previous** status must be determined from the timeline.

---

## 📊 Stock Reservation Model (Verified)

### Reservation Statuses
```
PENDING → CONFIRMED → RELEASED (shipped)
                     → CANCELLED (cancelled)
                     → EXPIRED
```

### `available_stock` Calculation
```php
// app/Models/Product.php:199
return $this->current_stock - $this->stockReservations()
    ->whereIn('reservation_status', ['confirmed', 'released'])
    ->sum('quantity');
```

**Key insight**: Both CONFIRMED and RELEASED are subtracted from available_stock. This means:

| Transition | Reservation Change | available_stock Impact |
|---|---|---|
| SHIPPED → PROCESSING | RELEASED → CONFIRMED | **No change** (both subtracted) |
| SHIPPED → CANCELLED | RELEASED → CANCELLED | **Increases** (CANCELLED not subtracted) |

### ✅ No Stock Race Condition
Because RELEASED → CONFIRMED doesn't change `available_stock`, there is NO risk of double-booking. The stock is already "spoken for" in both states. This eliminates the most dangerous regression risk from the initial analysis.

---

## 🐛 Bugs Found in Current Code

### Bug 1: `OrderStatusChangeReservedItems` — SHIPPED → PROCESSING is silent

```php
// Current logic only handles terminal statuses
$updateReservationStatus = [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value];

if (in_array($status->value, $updateReservationStatus)) { // 'processing' NOT in array
    // ... update reservations
}
```

**Result**: When SHIPPED → PROCESSING, reservations stay RELEASED. They should become CONFIRMED.
**Impact**: `stockReservationsForOrder()` (queries CONFIRMED only) won't include this order. `stockReservationsForCompletedOrder()` (queries RELEASED only) still WILL include it. This is functionally wrong.

### Bug 2: `orderStatusOptions()` — Timeline dedup blocks reversion

```php
// Current logic: removes ALL previously-used statuses
$timelineStatus = $order->timeline->pluck('status')->toArray();
return array_diff($enumStatus, $timelineStatus);
```

**Result**: For a SHIPPED order with timeline [placed, processing, shipped], PROCESSING is filtered out. Admin can't select it.
**Impact**: Reversion to PROCESSING is impossible even if we fix everything else.

---

## ✏️ Exact Changes Required (4 files)

### Change 1: `app/Services/OrderService.php`

**`readOnlyStatus()` — Remove SHIPPED from blocked list**
```php
// BEFORE:
public function readOnlyStatus(Order $order)
{
    return in_array($order->status->value, [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value]);
}

// AFTER:
public function readOnlyStatus(Order $order)
{
    return $order->status->value === OrderStatusEnum::CANCELLED->value;
}
```

**`orderStatusOptions()` — Add SHIPPED → [PROCESSING, CANCELLED] override**
```php
// BEFORE:
public function orderStatusOptions(Order $order)
{
    $order->load('timeline');
    $timelimeStatus = $order->timeline->pluck('status')->toArray();
    $enumesStatus = OrderStatusEnum::getOptions();
    return array_diff($enumesStatus, $timelimeStatus);
}

// AFTER:
public function orderStatusOptions(Order $order)
{
    // SHIPPED orders can revert to PROCESSING or CANCELLED
    if ($order->status->value === OrderStatusEnum::SHIPPED->value) {
        return [
            OrderStatusEnum::PROCESSING->value,
            OrderStatusEnum::CANCELLED->value,
        ];
    }

    $order->load('timeline');
    $timelineStatus = $order->timeline->pluck('status')->toArray();
    $enumStatus = OrderStatusEnum::getOptions();

    return array_diff($enumStatus, $timelineStatus);
}
```

### Change 2: `resources/js/Pages/Order/Show.jsx`

**`disabledActionbyStatus()` — Only block CANCELLED**
```javascript
// BEFORE:
function disabledActionbyStatus(order) {
    return order.status === "cancelled" || order.status === "shipped";
}

// AFTER:
function disabledActionbyStatus(order) {
    return order.status === "cancelled";
}
```

### Change 3: `app/Listeners/OrderStatusChangeReservedItems.php`

**`handleReservedItems()` — Add SHIPPED → PROCESSING re-reservation**

The listener needs to determine the PREVIOUS status. Since `OrderStatusChanged` listener runs first and updates `$event->order->status`, we check the timeline's second-most-recent entry:

```php
// BEFORE:
protected function handleReservedItems(Order $order, OrderStatusEnum $status)
{
    $updateReservationStatus = [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value];

    if (in_array($status->value, $updateReservationStatus)) {
        $order->stockReservations()->update([
            'reservation_status' => $status->value == 'shipped'
                ? StockReservationStatusEnum::RELEASED->value
                : StockReservationStatusEnum::CANCELLED->value,
        ]);
    }
}

// AFTER:
protected function handleReservedItems(Order $order, OrderStatusEnum $status)
{
    $terminalStatuses = [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value];

    if (in_array($status->value, $terminalStatuses)) {
        $order->stockReservations()->update([
            'reservation_status' => $status->value == 'shipped'
                ? StockReservationStatusEnum::RELEASED->value
                : StockReservationStatusEnum::CANCELLED->value,
        ]);
    }

    // Reversion: SHIPPED → PROCESSING (re-reserve stock)
    if ($status->value === OrderStatusEnum::PROCESSING->value) {
        $previousStatus = $order->timeline()
            ->latest('id')
            ->skip(1)
            ->value('status');

        if ($previousStatus === OrderStatusEnum::SHIPPED->value) {
            $order->stockReservations()->update([
                'reservation_status' => StockReservationStatusEnum::CONFIRMED->value,
            ]);
        }
    }
}
```

### Change 4: Tests

New feature test file: `tests/Feature/OrderStatusReversionTest.php`

```php
test('admin can change shipped order to processing', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::SHIPPED]);
    $order->timeline()->createMany([
        ['status' => 'placed', 'status_at' => now()->subDays(3)],
        ['status' => 'processing', 'status_at' => now()->subDays(2)],
        ['status' => 'shipped', 'status_at' => now()->subDay()],
    ]);

    $response = $this->post(route('order-status-timelines.store'), [
        'order' => ['id' => $order->id],
        'status' => 'processing',
        'status_at' => now()->toDateTimeString(),
        'description' => 'Returned to warehouse',
    ]);

    $response->assertRedirect();
    expect($order->fresh()->status->value)->toBe('processing');

    // Verify reservations are CONFIRMED (not RELEASED)
    expect($order->stockReservations->first()->reservation_status->value)
        ->toBe(StockReservationStatusEnum::CONFIRMED->value);
});

test('admin can change shipped order to cancelled', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::SHIPPED]);
    $order->timeline()->createMany([
        ['status' => 'placed', 'status_at' => now()->subDays(3)],
        ['status' => 'shipped', 'status_at' => now()->subDay()],
    ]);

    $response = $this->post(route('order-status-timelines.store'), [
        'order' => ['id' => $order->id],
        'status' => 'cancelled',
        'status_at' => now()->toDateTimeString(),
        'description' => 'Customer requested cancellation',
    ]);

    $response->assertRedirect();
    expect($order->fresh()->status->value)->toBe('cancelled');

    // Verify reservations are CANCELLED
    expect($order->stockReservations->first()->reservation_status->value)
        ->toBe(StockReservationStatusEnum::CANCELLED->value);
});

test('shipped order shows processing and cancelled as status options', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::SHIPPED]);
    $order->timeline()->createMany([
        ['status' => 'placed', 'status_at' => now()->subDays(3)],
        ['status' => 'processing', 'status_at' => now()->subDays(2)],
        ['status' => 'shipped', 'status_at' => now()->subDay()],
    ]);

    $options = (new OrderService())->orderStatusOptions($order);

    expect($options)->toContain('processing');
    expect($options)->toContain('cancelled');
    expect($options)->not->toContain('placed');
    expect($options)->not->toContain('shipped');
});

test('non-shipped orders keep original status option logic', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::PLACED]);
    $order->timeline()->create([
        'status' => 'placed',
        'status_at' => now(),
    ]);

    $options = (new OrderService())->orderStatusOptions($order);

    expect($options)->not->toContain('placed');
    expect($options)->toContain('processing');
    expect($options)->toContain('shipped');
    expect($options)->toContain('cancelled');
});

test('cancelled order has no status options', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::CANCELLED]);

    $options = (new OrderService())->orderStatusOptions($order);

    expect($options)->toBeEmpty();
});

test('shipped order is not read only', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::SHIPPED]);

    expect((new OrderService())->readOnlyStatus($order))->toBeFalse();
});

test('cancelled order is still read only', function () {
    $order = Order::factory()->create(['status' => OrderStatusEnum::CANCELLED]);

    expect((new OrderService())->readOnlyStatus($order))->toBeTrue();
});
```

---

## 🔒 What Does NOT Change (Verified Safe)

| Component | File | Why No Change |
|---|---|---|
| `OrderStatusChanged` listener | [app/Listeners/OrderStatusChanged.php](app/Listeners/OrderStatusChanged.php) | Already syncs any status to orders table |
| `OrderStatusChangeNotification` listener | [app/Listeners/OrderStatusChangeNotification.php](app/Listeners/OrderStatusChangeNotification.php) | Messages work for PROCESSING and CANCELLED |
| `OrderStatusTimelineController::store()` | [app/Http/Controllers/OrderStatusTimelineController.php](app/Http/Controllers/OrderStatusTimelineController.php) | No additional validation needed — stock is safe |
| `OrderStatusTimelineObserver` | [app/Observers/Order/OrderStatusTimelineObserver.php](app/Observers/Order/OrderStatusTimelineObserver.php) | Fires event regardless of status |
| `statusCantBeDeleted()` | [app/Services/OrderService.php](app/Services/OrderService.php:56) | Deletion is separate from status change |
| `SaleService` | [app/Services/SaleService.php](app/Services/SaleService.php) | Queries current status — naturally reflects reversion |
| `Customer::scopeWithActiveOrders` | [app/Models/Customer.php](app/Models/Customer.php:92) | Only looks at PLACED + PROCESSING — not affected |
| `Order::canBeCancelled()` | [app/Models/Order.php](app/Models/Order.php) | Only used by `cancel()` method, not admin status flow |
| `OrderObserver` | [app/Observers/Order/OrderObserver.php](app/Observers/Order/OrderObserver.php) | Only fires on model create/update/delete, not timeline changes |
| `Track.jsx` (customer tracking) | [resources/js/Pages/Store/Track/Track.jsx](resources/js/Pages/Store/Track/Track.jsx) | Reads timeline entries — reversion shows naturally |

---

## ⚠️ Remaining Considerations (Non-Blocking)

1. **Notification clarity**: When SHIPPED → PROCESSING, customer gets "Your order is now being processed." This is technically correct but could confuse someone who already received "Your order has been shipped." Consider adding reversion context to the message — but this is a UX improvement, not a blocker.

2. **Timeline display**: The customer tracking page (`Track.jsx`) shows timeline entries chronologically. A reversion would show: PLACED → PROCESSING → SHIPPED → PROCESSING. This is inherently clear — the timeline tells the story.

3. **Estimated delivery date**: Currently the calendar popover is hidden for SHIPPED orders (via `disabledActionbyStatus`). After this change, SHIPPED orders will show the calendar again, which makes sense since the delivery date may need updating.

---

## 📋 Implementation Checklist

- [ ] `OrderService::readOnlyStatus()` — remove SHIPPED
- [ ] `OrderService::orderStatusOptions()` — add SHIPPED override
- [ ] `Show.jsx::disabledActionbyStatus()` — remove SHIPPED
- [ ] `OrderStatusChangeReservedItems::handleReservedItems()` — add reversion logic
- [ ] Feature test: shipped → processing
- [ ] Feature test: shipped → cancelled
- [ ] Feature test: status options for shipped
- [ ] Feature test: status options unchanged for non-shipped
- [ ] Feature test: readOnlyStatus for shipped/cancelled
- [ ] Run `vendor/bin/pint --dirty --format agent`
- [ ] Run full test suite

**Total: 4 file changes + 1 test file. No migrations. No new classes. No new dependencies.**
