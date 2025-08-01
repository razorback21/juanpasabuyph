<?php

namespace App\Services;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use Illuminate\Support\Facades\DB;

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
        $orderItems = DB::table('order_items')
            ->select(DB::raw('SUM((price - cost_price) * quantity) as profit'))
            ->whereIn('order_id', $orders->pluck('id')->toArray())
            ->groupBy('order_id');
        return (float) $orderItems->first()->profit;
    }
}
