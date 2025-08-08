<?php

namespace App\Traits;

use App\Models\Product;

trait HasProductSeo
{
    public function productSeo(Product $product)
    {
        seo()->title($product->title)
            ->keywords($product->title)
            ->description($product->description)
            ->images(
                url($product->facebook_image_url),
            );
    }
}
