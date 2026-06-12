<?php

namespace Tests\Feature;

use App\Enums\OrderStatusEnum;
use App\Enums\StockReservationStatusEnum;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\StockReservation;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class OrderStatusReversionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Notification::fake();

        $user = User::factory()->create();
        $this->actingAs($user);

        $this->customer = Customer::create([
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john@example.com',
            'phone' => '123-456-7890',
            'address' => '123 Main St',
        ]);

        $category = ProductCategory::factory()->create();
        $this->product = Product::factory()->create([
            'product_category_id' => $category->id,
        ]);
    }

    public function test_admin_can_change_shipped_order_to_processing(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::SHIPPED->value,
            'order_number' => 'ORD-REV-001',
        ]);

        $order->timeline()->createMany([
            ['status' => 'placed', 'status_at' => now()->subDays(3)],
            ['status' => 'processing', 'status_at' => now()->subDays(2)],
            ['status' => 'shipped', 'status_at' => now()->subDay()],
        ]);

        StockReservation::create([
            'order_id' => $order->id,
            'product_id' => $this->product->id,
            'quantity' => 5,
            'uom' => 'pcs',
            'reservation_type' => 'order',
            'reservation_status' => StockReservationStatusEnum::RELEASED->value,
        ]);

        $response = $this->post(route('order-status-timelines.store'), [
            'order' => ['id' => $order->id],
            'status' => 'processing',
            'description' => 'Returned to warehouse',
        ]);

        $response->assertRedirect();
        $this->assertEquals('processing', $order->fresh()->status->value);

        $this->assertEquals(
            StockReservationStatusEnum::CONFIRMED->value,
            $order->stockReservations->first()->reservation_status,
        );
    }

    public function test_admin_can_change_shipped_order_to_cancelled(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::SHIPPED->value,
            'order_number' => 'ORD-REV-002',
        ]);

        $order->timeline()->createMany([
            ['status' => 'placed', 'status_at' => now()->subDays(3)],
            ['status' => 'shipped', 'status_at' => now()->subDay()],
        ]);

        StockReservation::create([
            'order_id' => $order->id,
            'product_id' => $this->product->id,
            'quantity' => 5,
            'uom' => 'pcs',
            'reservation_type' => 'order',
            'reservation_status' => StockReservationStatusEnum::RELEASED->value,
        ]);

        $response = $this->post(route('order-status-timelines.store'), [
            'order' => ['id' => $order->id],
            'status' => 'cancelled',
            'description' => 'Customer requested cancellation',
        ]);

        $response->assertRedirect();
        $this->assertEquals('cancelled', $order->fresh()->status->value);

        $this->assertEquals(
            StockReservationStatusEnum::CANCELLED->value,
            $order->stockReservations->first()->reservation_status,
        );
    }

    public function test_shipped_order_shows_processing_and_cancelled_as_options(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::SHIPPED->value,
            'order_number' => 'ORD-REV-003',
        ]);

        $order->timeline()->createMany([
            ['status' => 'placed', 'status_at' => now()->subDays(3)],
            ['status' => 'processing', 'status_at' => now()->subDays(2)],
            ['status' => 'shipped', 'status_at' => now()->subDay()],
        ]);

        $options = (new OrderService)->orderStatusOptions($order);

        $this->assertContains('processing', $options);
        $this->assertContains('cancelled', $options);
        $this->assertNotContains('placed', $options);
        $this->assertNotContains('shipped', $options);
    }

    public function test_non_shipped_orders_keep_original_status_option_logic(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::PLACED->value,
            'order_number' => 'ORD-REV-004',
        ]);

        $order->timeline()->create([
            'status' => 'placed',
            'status_at' => now(),
        ]);

        $options = (new OrderService)->orderStatusOptions($order);

        $this->assertNotContains('placed', $options);
        $this->assertContains('processing', $options);
        $this->assertContains('shipped', $options);
        $this->assertContains('cancelled', $options);
    }

    public function test_cancelled_order_read_only_blocks_ui_not_options(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::CANCELLED->value,
            'order_number' => 'ORD-REV-005',
        ]);

        $order->timeline()->createMany([
            ['status' => 'placed', 'status_at' => now()->subDay()],
            ['status' => 'cancelled', 'status_at' => now()],
        ]);

        // readOnlyStatus is the UI guard, orderStatusOptions just diffs enum vs timeline
        $this->assertTrue((new OrderService)->readOnlyStatus($order));
        $this->assertNotEmpty((new OrderService)->orderStatusOptions($order));
    }

    public function test_shipped_order_is_not_read_only(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::SHIPPED->value,
            'order_number' => 'ORD-REV-006',
        ]);

        $this->assertFalse((new OrderService)->readOnlyStatus($order));
    }

    public function test_cancelled_order_is_still_read_only(): void
    {
        $order = Order::create([
            'customer_id' => $this->customer->id,
            'status' => OrderStatusEnum::CANCELLED->value,
            'order_number' => 'ORD-REV-007',
        ]);

        $this->assertTrue((new OrderService)->readOnlyStatus($order));
    }
}
