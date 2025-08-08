<?php

namespace App\Actions;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreProductImage
{
    use AsAction;

    public function handle(Product $product)
    {
        DB::transaction(function () use ($product) {
            $collectionCode = 'product_feature_image';
            $product->clearMediaCollection($collectionCode);
            $product->addMediaFromRequest('image')->toMediaCollection($collectionCode);
            // $media = $product->getLastMedia($collectionCode);
            // if ($media) {
            //     unlink($media->getPath());
            // }
        });
    }
}
