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

    //todo: refactor query. This not a performant query, best only few rows of products
    public function getOutOfStockProducts()
    {
        $result = Product::all()->where('available_stock', 0);
        $productCount = $result->count();
        if (!$productCount) {
            return null;
        }
        $noStockIds = $result->pluck('id')->toArray();
        return $outOfStockProducts = Product::whereIn('id', $noStockIds);
    }
}
