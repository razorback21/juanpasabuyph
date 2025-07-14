<?php

namespace App\Observers\Order;

use App\Enums\MovementTypeEnum;
use App\Enums\OrderStatusEnum;
use App\Models\Inventory;
use App\Models\OrderItem;

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
        Inventory::create([
            'quantity' => $orderItem->quantity,
            'product_id' => $orderItem->product_id,
            'movement_type' => MovementTypeEnum::RESERVED,
            'uom' => $orderItem->uom,
            'notes' => "Reserved for ORDER # {$orderItem->order->order_number}",
            'order_id' => $orderItem->order_id,
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
