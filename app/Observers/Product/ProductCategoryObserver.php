<?php

namespace App\Observers\Product;

use App\Models\ProductCategory;
use Illuminate\Support\Facades\Log;

class ProductCategoryObserver
{
    /**
     * Handle the ProductCategory "created" event.
     */
    public function created(ProductCategory $productCategory): void
    {
        //
    }

    /**
     * Handle the ProductCategory "updated" event.
     */
    public function updated(ProductCategory $productCategory): void
    {
        //
    }

    /**
     * Handle the ProductCategory "deleted" event.
     */
    public function deleted(ProductCategory $productCategory): void
    {
        // Set products table product_category_id to null
        $productCategory->products()->update(['product_category_id' => null]);
    }

    /**
     * Handle the ProductCategory "restored" event.
     */
    public function restored(ProductCategory $productCategory): void
    {
        //
    }

    /**
     * Handle the ProductCategory "force deleted" event.
     */
    public function forceDeleted(ProductCategory $productCategory): void
    {
        //
    }
}
