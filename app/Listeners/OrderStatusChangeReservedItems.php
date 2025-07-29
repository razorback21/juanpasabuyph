<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Enums\StockReservationStatusEnum;
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
        $updateReservationStatus = [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value];

        if (in_array($status->value, $updateReservationStatus)) {

            $order->stockReservations()->update([
                'reservation_status' => $status->value == 'shipped' ? StockReservationStatusEnum::RELEASED->value : StockReservationStatusEnum::CANCELLED->value,
            ]);
        }

    }
}
