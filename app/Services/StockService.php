<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;



class StockService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }

    public function getOutOfStockProductsCount(): int
    {
        return $this->getOutOfStockProducts()->get()->count();
    }

    public function getOutOfStockProducts(): Builder
    {
        return $this->productStocks()->whereNull('stocks')->orWhere("stocks", "<", 1);
    }

    public function productStocks(): Builder
    {
        $stocksField = DB::raw("SUM(CASE
                WHEN movement_type IN ('inbound', 'adjustment_up', 'returns')
                THEN quantity
                ELSE -quantity
            END) AS stocks");

        $productStocks = Inventory::select([
            'product_id',
            $stocksField
        ])->groupBy(['product_id']);

        return Product::leftJoinSub(
            $productStocks,
            'stocks_table',
            function ($join) {
                $join->on('products.id', '=', 'stocks_table.product_id');
            }
        )->addSelect(["products.*", "stocks_table.*"])
            ->where('disabled', false);
    }


}
