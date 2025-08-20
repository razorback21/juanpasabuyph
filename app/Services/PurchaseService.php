<?php

namespace App\Services;

class PurchaseService
{
    /**
     * Create a new class instance.
     */
    public function __construct(private StockService $stockService)
    {
        //
    }

    public function getPurchasedCost(): float
    {
        $productStocks = $this->stockService->productStocks()->get();
        return $productStocks->where('stocks', '>', 0)->map(function ($item) {
            return [
                'product_id' => $item->id,
                'cost' => $item->stocks ? $item->stocks * $item->cost_price : 0,
            ];
        })->sum('cost');
    }

    public function getTotalSRPFromPurchase(): float
    {
        $productStocks = $this->stockService->productStocks()->get();
        return $productStocks->where('stocks', '>', 0)->map(function ($item) {
            return [
                'product_id', $item->id,
                'srp' => $item->stocks > 0 ? $item->stocks * $item->price : 0,
            ];
        })->sum('srp');
    }
}
