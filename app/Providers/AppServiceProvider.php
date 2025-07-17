<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusTimeline;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Observers\Order\OrderItemObserver;
use App\Observers\Order\OrderObserver;
use App\Observers\Product\ProductCategoryObserver;
use App\Observers\Product\ProductObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Observers
        Order::observe(OrderObserver::class);
        OrderItem::observe(OrderItemObserver::class);
        OrderStatusTimeline::observe(OrderStatusTimeline::class);
        Product::observe(ProductObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);
    }
}
