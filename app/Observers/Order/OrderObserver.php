<?php

namespace App\Observers\Order;

use App\Actions\Order\{GenerateOrderNumberAction, OrderStatusUpdateAction};
use App\Enums\OrderStatusEnum;
use App\Events\EventOrderCreatedAdmin;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;
use App\Models\User;
use App\Notifications\OrderCreatedAdminNotification;
use App\Notifications\OrderCreatedNotification;
use Illuminate\Support\Facades\Notification;

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
        $order->timeline()->create([
            "status" => OrderStatusEnum::PLACED,
            "description" => "Order placed and is now pending for verification and approval.",
            "status_at" => now(),
        ]);
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        // check if order status is updated and run business logic
        // OrderStatusUpdateAction::run();
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
