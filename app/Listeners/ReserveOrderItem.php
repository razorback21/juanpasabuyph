<?php

namespace App\Listeners;

use App\Enums\MovementTypeEnum;
use App\Events\EventOrderCreatedCustomer;
use App\Models\Inventory;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ReserveOrderItem
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
    public function handle(EventOrderCreatedCustomer $event): void
    {
        $event->order->items->each(function ($item) {
            Inventory::create([
                'quantity' => $item->quantity,
                'product_id' => $item->product_id,
                'movement_type' => MovementTypeEnum::RESERVED,
                'uom' => $item->uom,
                'notes' => "Reserved for ORDER # {$item->order->order_number}",
                'order_id' => $item->order_id,
            ]);
        });
    }
}
