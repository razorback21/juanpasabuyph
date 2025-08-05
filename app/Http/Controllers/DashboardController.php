<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Visitor;
use App\Services\ProductFilterService;
use App\Services\SaleService;
use App\Services\StockService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(private StockService $stockService, private SaleService $saleService)
    {

    }

    public function index(Request $request)
    {
        $categories = ProductCategory::all();
        $activeCategory = $request->query('active_category') ?? 'All';
        $outOfStock = $this->stockService->getOutOfStockProducts()->count();
        $profitThisMonth = $this->saleService->getSaleProfitThisMonth();
        $orderCount = Order::where('status', '=', 'placed')->count();
        $chartData = Visitor::where('created_at', '>=', now()->subDays(90))->get();

        return Inertia::render('Dashboard/Index', compact('categories', 'activeCategory', 'outOfStock', 'profitThisMonth', 'orderCount', 'chartData'));
    }
}
