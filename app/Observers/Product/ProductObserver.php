<?php

namespace App\Observers\Product;

use App\Exceptions\CannotDeleteProductException;
use App\Models\Product;
use App\Service\ProductDeleteService;

class ProductObserver
{
    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {
        //
    }
    // Pre-delete logic
    public function deleting(Product $product)
    {
        try {
            if ((new ProductDeleteService())->canDelete($product)) {
                $product->delete();
            }
        } catch (CannotDeleteProductException $e) {
            abort(403, $e->getMessage());
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "restored" event.
     */
    public function restored(Product $product): void
    {
        //
    }

    /**
     * Handle the Product "force deleted" event.
     */
    public function forceDeleted(Product $product): void
    {
        //
    }
}
