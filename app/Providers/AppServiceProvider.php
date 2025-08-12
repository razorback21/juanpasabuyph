<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderStatusTimeline;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Observers\Order\OrderItemObserver;
use App\Observers\Order\OrderObserver;
use App\Observers\Order\OrderStatusTimelineObserver;
use App\Observers\Product\ProductCategoryObserver;
use App\Observers\Product\ProductObserver;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
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
        OrderStatusTimeline::observe(OrderStatusTimelineObserver::class);
        Product::observe(ProductObserver::class);
        ProductCategory::observe(ProductCategoryObserver::class);

        $this->configureCommands();
        $this->configureModels();

        // Dump sql queries. use only for debug purposes
        // DB::listen(function ($query) {
        //     dump(
        //         $query->sql,
        //         [
        //             'bindings' => $query->bindings,
        //             'time' => $query->time
        //         ],
        //     );
        // });
    }

    private function configureCommands()
    {
        DB::prohibitDestructiveCommands($this->app->isProduction());
    }

    private function configureModels()
    {
        Model::shouldBeStrict(true);
    }
}
