<?php

namespace App\Traits;

use App\Models\Product;

trait HasProductSeo
{
    public function productSeo(Product $product)
    {
        $seo = seo()->title($product->name)
            ->keywords($product->name);
        if ($product->description) {
            $seo->description($product->description);
        }
        $seo->images(
            url($product->facebook_image_url),
        );
    }
}
