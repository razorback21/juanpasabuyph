<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\OrderItem;

class ReservedItemService
{
    public function findByOrderOrderItem(OrderItem $orderItem): Inventory
    {
        $order = $orderItem->order;
        return $order->inventoryReservations->first(function (Inventory $inventory) use ($orderItem): bool {
            return $orderItem->product_id == $inventory->product_id;
        });
    }

    public function delete(OrderItem $orderItem): void
    {
        $reserved = $this->findByOrderOrderItem($orderItem);
        if ($reserved) {
            $reserved->delete();
        }
    }
}
