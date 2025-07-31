<?php

namespace App\Services;

use App\Models\Product;

class StockService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }


    public function getOutOfStockProducts()
    {
        //todo: refactor query. This not a performant query, best only few rows of products
        $result = Product::all()->where('available_stock', 0);
        $productCount = $result->count();
        if (!$productCount) {
            return collect([]);
        }
        $noStockIds = $result->pluck('id')->toArray();
        return Product::whereIn('id', $noStockIds);
    }
}
