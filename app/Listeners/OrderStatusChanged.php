<?php

namespace App\Listeners;

use App\Enums\OrderStatusEnum;
use App\Events\EventOrderStatusChanged;
use App\Models\Order;
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
    }
}
