<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Enums\StockReservationStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;

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
        $terminalStatuses = [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value];

        if (in_array($status->value, $terminalStatuses)) {
            $order->stockReservations()->update([
                'reservation_status' => $status->value == 'shipped'
                    ? StockReservationStatusEnum::RELEASED->value
                    : StockReservationStatusEnum::CANCELLED->value,
            ]);
        }

        // Reversion: SHIPPED → PROCESSING (re-reserve stock)
        if ($status->value === OrderStatusEnum::PROCESSING->value) {
            $previousStatus = $order->timeline()
                ->latest('id')
                ->skip(1)
                ->value('status');

            if ($previousStatus === OrderStatusEnum::SHIPPED->value) {
                $order->stockReservations()->update([
                    'reservation_status' => StockReservationStatusEnum::CONFIRMED->value,
                ]);
            }
        }
    }
}
