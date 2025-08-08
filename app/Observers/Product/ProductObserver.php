<?php

namespace App\Observers\Product;

use App\Actions\GenarateSlug;
use App\Exceptions\CannotDeleteProductException;
use App\Models\Product;
use App\Services\ProductDeleteService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductObserver
{

    public function creating(Product $product)
    {
        $product->slug = GenarateSlug::run($product, config('constants.PRODUCT_SLUG_SOURCE_FIELD'));
    }

    /**
     * Handle the Product "created" event.
     */
    public function created(Product $product): void
    {
        //
    }


    public function updating(Product $product): void
    {
        if ($product->isDirty('name') && empty($product->slug)) {
            $product->slug = GenarateSlug::run($product, config('constants.PRODUCT_SLUG_SOURCE_FIELD'));
        }
    }

    /**
     * Handle the Product "updated" event.
     */
    public function updated(Product $product): void
    {

    }
    /**
     *  Handle pre "deleting" event
     */
    public function deleting(Product $product)
    {
        try {
            return ((new ProductDeleteService())->canDelete($product));
        } catch (CannotDeleteProductException $exception) {
            abort(403, $exception->getMessage());
        }
    }

    /**
     * Handle the Product "deleted" event.
     */
    public function deleted(Product $product): void
    {

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
