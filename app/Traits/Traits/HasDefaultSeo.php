<?php

namespace App\Traits\Traits;

trait HasDefaultSeo
{
    public function __construct()
    {
        seo()
            ->description("Juanpasabuy Store - Your one-stop online shopping destination in Dubai to the Philippines")
            ->image(url('/storage/assets/share.png'));
    }
}
