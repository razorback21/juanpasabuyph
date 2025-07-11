<?php

namespace App\Observers\Order;

use App\Actions\Order\GenerateOrderNumberAction;
use App\Models\Order;

class OrderObserver
{


    /**
     * Handle the Order "creating" event.
     */
    public function creating(Order $order): void
    {
        if (empty($order->order_number)) {
            $order->order_number = GenerateOrderNumberAction::run();
        }
    }

    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "deleted" event.
     */
    public function deleted(Order $order): void
    {
        // Delete related order items
        $order->items()->delete();

        // delete related inventory reservations
        $order->inventoryReservations()->delete();
    }

    /**
     * Handle the Order "restored" event.
     */
    public function restored(Order $order): void
    {
        //
    }

    /**
     * Handle the Order "force deleted" event.
     */
    public function forceDeleted(Order $order): void
    {
        //
    }
}
