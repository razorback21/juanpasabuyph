<?php

namespace App\Observers\Order;

use App\Enums\MovementTypeEnum;
use App\Enums\OrderStatusEnum;
use App\Models\Inventory;
use App\Models\OrderItem;

class OrderItemObserver
{
    /**
     * Handle the OrderItem "created" event.
     */
    public function created(OrderItem $orderItem): void
    {
        // Insert a new record to inventories table and set movement type to reserved
        Inventory::create([
            'product_id' => $orderItem->product_id,
            'uom' => $orderItem->uom,
            'movement_type' => MovementTypeEnum::RESERVED,
            'quantity' => $orderItem->quantity,
        ]);
    }

    /**
     * Handle the OrderItem "updated" event.
     */
    public function updated(OrderItem $orderItem): void
    {
        $order = $orderItem->order();
        // sync inventory record with new quantity
        $order->inventoryReservations()->each(function (Inventory $inventory) use ($orderItem): void {
            /**
             * Check if the order item's product matches the inventory product
             * If quantity is 0, delete the inventory record
             * Otherwise update the inventory with new UOM and quantity
             */
            if ($orderItem->product_id == $inventory->product_id) {
                switch ($orderItem->quantity) {
                    case 0:
                        $inventory->delete();
                        break;
                    default:
                        $inventory->update([
                            'uom' => $orderItem->uom,
                            'quantity' => $orderItem->quantity,
                        ]);
                }
            }

        });

    }

    /**
     * Handle the OrderItem "deleted" event.
     */
    public function deleted(OrderItem $orderItem): void
    {
        // update order status to cancelled if all items were deleted
        if ($orderItem->order->items()->count() === 0) {
            $orderItem->order->update(['status' => OrderStatusEnum::CANCELLED]);
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
