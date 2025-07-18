<?php

namespace App\Observers\Order;

use App\Enums\OrderStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\OrderStatusTimeline;
use Illuminate\Validation\Rules\Enum;

class OrderStatusTimelineObserver
{
    /**
     * Handle the OrderStatusTimeline "created" event.
     */
    public function created(OrderStatusTimeline $orderStatusTimeline): void
    {
        $orderStatus = OrderStatusEnum::from($orderStatusTimeline->status);
        event(new EventOrderStatusChanged($orderStatusTimeline->order()->first(), $orderStatus));
    }

    /**
     * Handle the OrderStatusTimeline "updated" event.
     */
    public function updated(OrderStatusTimeline $orderStatusTimeline): void
    {

    }

    /**
     * Handle the OrderStatusTimeline "deleted" event.
     */
    public function deleted(OrderStatusTimeline $orderStatusTimeline): void
    {
        //
    }

    /**
     * Handle the OrderStatusTimeline "restored" event.
     */
    public function restored(OrderStatusTimeline $orderStatusTimeline): void
    {
        //
    }

    /**
     * Handle the OrderStatusTimeline "force deleted" event.
     */
    public function forceDeleted(OrderStatusTimeline $orderStatusTimeline): void
    {
        //
    }
}
