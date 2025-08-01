<?php

namespace App\Services;

use App\Enums\OrderStatusEnum;
use App\Models\Order;

class SaleService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getSaleProfitThisMonth(): float
    {
        $orders = Order::whereMonth('updated_at', now()->month)->where('status', OrderStatusEnum::SHIPPED->value)->get();
        $profit = 0;
        foreach ($orders as $order) {
            $profit += $order->items->sum('net_profit');
        }
        return $profit;
    }
}
