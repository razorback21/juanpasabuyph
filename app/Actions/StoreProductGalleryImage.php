<?php

namespace App\Actions;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreProductGalleryImage
{
    use AsAction;

    public function handle(Product $product, UploadedFile $file)
    {
        DB::transaction(function () use ($product, $file) {
            $collectionName = 'product_feature_image';
            $media = $product->addMedia($file)
                ->toMediaCollection($collectionName);

            if (!$product->featured_media_id) {
                $product->update(['featured_media_id' => $media->id]);
            }
        });
    }
}
