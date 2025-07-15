<?php

namespace App\Listeners;

use App\Events\EventOrderCreatedCustomer;
use App\Notifications\OrderCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class OrderCreatedCustomer
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
    public function handle(EventOrderCreatedCustomer $event)
    {
        $event->order->customer->notify(new OrderCreatedNotification($event->order));
    }
}
