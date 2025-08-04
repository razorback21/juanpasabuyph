<?php

namespace App\Traits;

trait HasDefaultSeo
{
    public function defaultSeo()
    {
        // Default SEO optimization for home page
        seo()
            ->title('JuanPasabuy PH - Premium Dubai Products Delivered to Philippines | Online Shopping')
            ->description('Trusted padala service from Dubai to Philippines. We photograph authentic products from Dubai malls & retailers, you add to cart, we ship to your doorstep. Genuine Dubai electronics, fashion, cosmetics & luxury items and many more with transparent pricing.')
            ->images(
                url('/storage/assets/share.png'),
            )
            ->keywords('JuanPasabuyPH, padala service Dubai to Philippines, Dubai shopping service Philippines, Dubai products delivery Philippines, authentic Dubai products, Dubai mall shopping Philippines, premium Dubai electronics, Dubai fashion Philippines, Dubai cosmetics Philippines, online padala service, Dubai personal shopper, Dubai to Philippines shipping, Dubai retail shopping service, authentic Dubai brands Philippines, Dubai luxury products Philippines, Dubai electronics padala, Dubai perfume Philippines, Dubai gold jewelry Philippines, Dubai watches Philippines, Dubai bags Philippines, Dubai shoes Philippines, trusted padala service, reliable Dubai shopping, secure international shipping, Dubai product sourcing, Philippines online shopping Dubai, Dubai mall products Philippines, Dubai outlet shopping, Dubai brand products, international shopping service, cross-border shopping, Dubai retail therapy, authentic product guarantee, Dubai shopping assistant, personal shopping Dubai, Dubai product photos, real Dubai prices, no markup shopping, transparent pricing Dubai, Dubai shopping experience Philippines, premium product delivery, fast shipping Dubai Philippines, safe shopping service, verified Dubai products, genuine Dubai merchandise, Dubai shopping made easy, hassle-free Dubai shopping, convenient international shopping, Dubai product catalog, Dubai store products, Dubai retail marketplace, authentic Dubai shopping experience');

    }
}
