<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Services\ProductFilterService;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        
        // Apply category filter
        $filter = new ProductFilterService($request);
        
        $products = $filter->getQuery()->paginate(10)
            ->withQueryString()
            ->through(function ($product) {
                return [
                    ...$product->toArray(),
                    'description' => Str::limit($product->description, 100),
                ];
            });

        $categories = ProductCategory::all();

        return Inertia::render('Dashboard/Index', [
            'products' => $products,
            'categories' => $categories,
            'active_category' => $request->query('active_category') ?? 'All',
        ]);
    }
}
