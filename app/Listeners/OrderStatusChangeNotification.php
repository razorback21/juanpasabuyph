<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;
use App\Notifications\OrderStatusChangedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderStatusChangeNotification
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
        $this->handleOrderStatusNotifications($event->order, $event->orderStatusEnum);
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
