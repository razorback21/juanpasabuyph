<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Visitor;
use App\Services\OrderService;
use App\Services\ProductFilterService;
use App\Services\PurchaseService;
use App\Services\SaleService;
use App\Services\StockService;
use App\Services\VisitorService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(private StockService    $stockService,
                                private SaleService     $saleService,
                                private PurchaseService $purchaseService,
                                private OrderService    $orderService,
                                private VisitorService  $visitorService,
    )
    {

    }

    public function index(Request $request)
    {
        $categories = ProductCategory::all();
        $activeCategory = $request->query('active_category') ?? 'All';
        $outOfStock = $this->stockService->getOutOfStockProductsCount();
        $profitThisMonth = $this->saleService->getSaleProfitThisMonth();
        $orderCount = $this->orderService->getNewOrderCount();
        $chartData = $this->visitorService->getVisitorsByNumMonths(3);
        $purchaseCost = $this->purchaseService->getPurchasedCost();
        $totalSRPFromPurchased = $this->purchaseService->getTotalSRPFromPurchase();
        return Inertia::render('Dashboard/Index', compact('categories', 'activeCategory', 'outOfStock', 'profitThisMonth', 'orderCount', 'chartData', 'purchaseCost', 'totalSRPFromPurchased'));
    }
}
