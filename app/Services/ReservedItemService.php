<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\OrderItem;
use App\Models\StockReservation;

class ReservedItemService
{
    public function findByOrderOrderItem(OrderItem $orderItem): StockReservation
    {
        $order = $orderItem->order;
        if (!$order->stockReservations) {
            return new StockReservation();
        }

        return $order->stockReservations->first(function (StockReservation $stockReservation) use ($orderItem): bool {
            return $orderItem->product_id == $stockReservation->product_id;
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
