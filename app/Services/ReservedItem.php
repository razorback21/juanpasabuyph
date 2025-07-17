<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\OrderItem;

class ReservedItem
{
    public function findReserved(OrderItem $orderItem): Inventory
    {
        $order = $orderItem->order;
        return $order->inventoryReservations->first(function (Inventory $inventory) use ($orderItem): bool {
            return $orderItem->product_id == $inventory->product_id;
        });
    }

    public function deleteReserved(OrderItem $orderItem): void
    {
        $reserved = $this->findReserved($orderItem);
        if ($reserved) {
            $reserved->delete();
        }
    }
}
