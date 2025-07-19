<?php

namespace App\Observers\Order;

use App\Enums\MovementTypeEnum;
use App\Enums\OrderStatusEnum;
use App\Events\OrderStatusChangedEvent;
use App\Models\Inventory;
use App\Models\OrderItem;
use App\Services\OrderService;
use App\Services\ReservedItemService;

class OrderItemObserver
{

    public function creating(OrderItem $orderItem)
    {
        $orderItem->load("product");
        if ($orderItem->product->current_stock < $orderItem->quantity) {
            abort(403, "Insufficient stock for product {$orderItem->product->name}");
        }
    }
    /**
     * Handle the OrderItem "created" event.
     */
    public function created(OrderItem $orderItem): void
    {

    }

    /**
     * Handle the OrderItem "updated" event.
     */
    public function updated(OrderItem $orderItem): void
    {
        $reservedItem = (new ReservedItemService())->findByOrderOrderItem($orderItem);
        /**
         * Check if the order item's product matches the inventory product
         * If quantity is 0, delete the inventory record and order item
         * Otherwise update the inventory with new UOM and quantity
         */
        if ($orderItem->product_id == $reservedItem->product_id) {
            switch ($orderItem->quantity) {
                case 0:
                    $orderItem->delete();
                    $reservedItem->delete();
                    break;
                default:
                    // sync inventory record with new quantity
                    $reservedItem->update([
                        'uom' => $orderItem->uom,
                        'quantity' => $orderItem->quantity,
                    ]);
            }
        }
    }

    public function deleting(OrderItem $orderItem): void
    {
        $order = $orderItem->order;
        $orderService = new OrderService();
        if (!$orderService->canBeDeleted($order)) {
            abort(403, "Order cannot be deleted");
        }
    }

    /**
     * Handle the OrderItem "deleted" event.
     */
    public function deleted(OrderItem $orderItem): void
    {
        // Make sure to also delete the reserve item when order item is deleted
        $reservedItem = (new ReservedItemService())->findByOrderOrderItem($orderItem);
        $reservedItem->delete();

        // Delete order if all items were deleted
        $order = $orderItem->order;
        if ($order->items()->count() === 0) {
            $order->delete();
        }
    }

    /**
     * Handle the OrderItem "restored" event.
     */
    public function restored(OrderItem $orderItem): void
    {
        //
    }

    /**
     * Handle the OrderItem "force deleted" event.
     */
    public function forceDeleted(OrderItem $orderItem): void
    {
        //
    }
}
