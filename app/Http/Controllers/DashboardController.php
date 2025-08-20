<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use App\Services\PurchaseService;
use App\Services\SaleService;
use App\Services\StockService;
use App\Services\VisitorService;
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

    public function index()
    {
        $outOfStock = $this->stockService->getOutOfStockProductsCount();
        $profitThisMonth = $this->saleService->getSaleProfitThisMonth();
        $orderCount = Order::newOrders()->count();
        $chartData = $this->visitorService->getVisitorsByNumMonths(3);
        $purchaseCost = $this->purchaseService->getPurchasedCost();
        $totalSRPFromPurchased = $this->purchaseService->getTotalSRPFromPurchase();
        return Inertia::render('Dashboard/Index', compact('outOfStock', 'profitThisMonth', 'orderCount', 'chartData', 'purchaseCost', 'totalSRPFromPurchased'));
    }
}
