<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function getPopularProducts()
    {
        return Product::select(DB::raw('products.*'))
            ->whereHas('orderItems', function ($query) {
                $query->selectRaw('COUNT(order_items.product_id) as orders_count')
                    ->groupBy('order_items.product_id')
                    ->orderByDesc('orders_count');
            });
    }
}
