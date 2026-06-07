<?php

namespace App\Actions;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DeleteProductGalleryImage
{
    use AsAction;

    public function handle(Product $product, int $mediaId)
    {
        DB::transaction(function () use ($product, $mediaId) {
            $media = $product->getMedia('product_feature_image')
                ->firstWhere('id', $mediaId);

            if (!$media) {
                return;
            }

            $updateFeatured = false;
            $newFeaturedId = null;

            if ((int) $product->featured_media_id === (int) $mediaId) {
                $nextMedia = $product->getMedia('product_feature_image')
                    ->where('id', '!=', $mediaId)
                    ->sortByDesc('id')
                    ->first();

                $newFeaturedId = $nextMedia?->id;
                $updateFeatured = true;
            }

            $media->delete();

            if ($updateFeatured) {
                $product->update(['featured_media_id' => $newFeaturedId]);
            }
        });
    }
}
