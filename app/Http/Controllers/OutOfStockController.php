<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\StockService;

class OutOfStockController extends Controller
{
    public function __construct(private StockService $stockService)
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $outOfStockProducts = $this->stockService->getOutOfStockProducts()->paginate(10);
        $productCount = $outOfStockProducts->total();
        return Inertia::render('OutOfStock/Index', compact('outOfStockProducts', 'productCount'));
    }
}
