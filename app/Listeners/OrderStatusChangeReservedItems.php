<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderStatusChangeReservedItems
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(EventOrderStatusChanged $event): void
    {
        $this->handleReservedItems($event->order, $event->orderStatusEnum);
    }

    protected function handleReservedItems(Order $order, OrderStatusEnum $status)
    {
        if (OrderStatusEnum::CANCELLED->value == $status->value) {
            $order->inventoryReservations()->delete();
        } elseif (OrderStatusEnum::SHIPPED->value == $status->value) {
            $order->inventoryReservations()->update([
                'movement_type' => 'outbound',
                'notes' => 'Order #' . $order->order_number . ' has been shipped.',
            ]);
        }
    }
}
