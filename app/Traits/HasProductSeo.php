<?php

namespace App\Traits;

trait HasProductSeo
{
    public function __construct()
    {
        seo()->description($this->description)
            ->images(
                url('/storage/assets/pdala_hero_bg.png'),
            );
    }
}
