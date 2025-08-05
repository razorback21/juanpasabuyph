<?php

namespace App\Traits;

use App\Models\Product;

trait HasProductSeo
{
    public function productSeo(Product $product)
    {
        seo()->title($product->title)
            ->description($product->description)
            ->images(
                url('/storage/assets/pdala_hero_bg.png'),
            );
    }
}
