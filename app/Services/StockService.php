<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

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
        $productStocks = $this->productStocks();
        $products =  $productStocks->where('stocks', '<', 1);
        return Product::whereIn('id', $products->pluck('product_id'));

    }

    public function productStocks()
    {
        $stocks = DB::raw("SUM(CASE
                WHEN movement_type IN ('inbound', 'adjustment_up', 'returns')
                THEN quantity
                ELSE -quantity
            END) AS stocks");

        $result = Inventory::select([
            'product_id',
            'disabled',
            'cost_price',
            'price',
            $stocks
        ])->join('products', 'inventories.product_id', '=', 'products.id')
            ->groupBy('inventories.product_id')->get();
        return $result;
    }

    public function getPurchasedCost(): float
    {
        $productStocks = $this->productStocks();
        $result = $productStocks->where('stocks', '>', 0)
            ->where('disabled', 0)->map(function (Inventory $item) {
                return [
                    'product_id', $item->product_id,
                    'cost' => $item->stocks > 0 ? $item->cost_price * $item->stocks : 0,
                ];
            })->sum('cost');


        return $result;
    }

    public function getTotalSRPFromPurchase(): float
    {
        $productStocks = $this->productStocks();
        $result = $productStocks->where('stocks', '>', 0)
            ->where('disabled', 0)->map(function (Inventory $item) {
                return [
                    'product_id', $item->product_id,
                    'srp' => $item->stocks > 0 ? $item->price * $item->stocks : 0,
                ];
            })->sum('srp');


        return $result;
    }
}
