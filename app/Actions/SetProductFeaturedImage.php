<?php

namespace App\Actions;

use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class SetProductFeaturedImage
{
    use AsAction;

    public function handle(Product $product, int $mediaId)
    {
        $media = $product->getMedia('product_feature_image')
            ->firstWhere('id', $mediaId);

        if (!$media) {
            return;
        }

        $product->update(['featured_media_id' => $mediaId]);
    }
}
