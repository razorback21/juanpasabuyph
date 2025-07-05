<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\Product;
use App\Observers\Order\OrderObserver;
use App\Observers\Product\ProductObserver;
use App\Services\Classes\UploadFeaturedImage;
use App\Services\Classes\UploadSocialMediaImage;
use App\Services\ProductFileUploadService;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind the interface to the concrete implementation (default to UploadFeaturedImage)
        $this->app->bind(ProductImageUploadServiceInterface::class, UploadFeaturedImage::class);
        
        // Register FileUploadService with container injection
        $this->app->bind(ProductFileUploadService::class, function ($app) {
            return new ProductFileUploadService($app);
        });
        
        // Bind specific services for different image types
        $this->app->bind('upload.featured', UploadFeaturedImage::class);
        $this->app->bind('upload.socialmedia', UploadSocialMediaImage::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Observers
        Order::observe(OrderObserver::class);
        Product::observe(ProductObserver::class);
    }
}
