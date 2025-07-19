<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;
use App\Models\OrderStatusTimeline;
use App\Notifications\OrderStatusChangedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderStatusChanged
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
        // Sync timelime status to orders table
        $event->order->update([
            'status' => $event->orderStatusEnum,
        ]);

        // todo: Moved this two process to a separate listener. Observe listener single responsibility principle
        $this->handleReservedItems($event->order, $event->orderStatusEnum);
        $this->handleOrderStatusNotifications($event->order, $event->orderStatusEnum);
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

    protected function handleOrderStatusNotifications(Order $order, OrderStatusEnum $orderStatus)
    {
        $timelineMessage = '';
        $timeline = $order->timeline()->where('status', '=', $orderStatus->value)->first();

        if ($timeline) {
            $timelineMessage = $timeline->description;
        }

        $message = [
            OrderStatusEnum::CANCELLED->value => 'Sorry, your order has been cancelled. ' . $timelineMessage,
            OrderStatusEnum::PROCESSING->value => 'Your order is now being processed. ' . $timelineMessage,
            OrderStatusEnum::SHIPPED->value => 'Your order has been shipped. ' . $timelineMessage,
        ];
        if (isset($message[$orderStatus->value])) {
            $order->customer->notify(new OrderStatusChangedNotification($order, $message[$orderStatus->value]));
        }
    }

}
