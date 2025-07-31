<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutOfStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //todo: refactor query. This not a performant query, best only few rows of products
        $result = Product::all()->where('available_stock', 0);
        $productCount = $result->count();
        $noStockIds = $result->pluck('id')->toArray();
        $outOfStockProducts = Product::whereIn('id', $noStockIds)->paginate(10);

        return Inertia::render('OutOfStock/Index', compact('outOfStockProducts', 'productCount'));
    }
}
