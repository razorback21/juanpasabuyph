<?php

namespace App\Traits;

trait HasDefaultSeo
{
    public function defaultSeo()
    {
        // Default SEO optimization for home page
        seo()
            ->title('JuanPasabuy PH - Premium Dubai Products Delivered to Philippines | Online Shopping')
            ->description('Discover authentic Dubai products at JuanPasabuy PH. Shop premium electronics, fashion, cosmetics & more from Dubai with secure delivery to Philippines. Trusted online shopping since 2022.')
            ->keywords('Dubai products Philippines, online shopping Dubai, JuanPasabuy, Dubai to Philippines delivery, premium products, authentic Dubai shopping, electronics Dubai, fashion Dubai, cosmetics Dubai, online shopping, dubai to philippines, affordable dubai shopping')
            ->image(url('/storage/assets/share.png'))
            ->url(url(url()->current()))
            ->type('website')
            ->locale('en_US')
            ->siteName('JuanPasabuy PH')
            ->twitterCard('summary_large_image')
            ->twitterSite('@juanpasabuyph')
            ->canonical(url('/'))
            ->robots('index,follow')
            ->jsonLd(json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'Organization',
                'name' => 'JuanPasabuy PH',
                'url' => url('/'),
                'logo' => url('/storage/assets/logo.png'),
                'description' => 'Your trusted partner in bringing premium Dubai products right to your doorstep in the Philippines.',
                'address' => [
                    '@type' => 'PostalAddress',
                    'addressCountry' => 'PH'
                ],
                'sameAs' => [
                    'https://facebook.com/juanpasabuyph',
                    'https://instagram.com/juanpasabuyph',
                    'https://twitter.com/juanpasabuyph'
                ],
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => url('/catalog?category={category_term_string}'),
                    'query-input' => 'required name=category_term_string'
                ]
            ]))
            ->jsonLd(json_encode([
                '@context' => 'https://schema.org',
                '@type' => 'WebSite',
                'name' => 'JuanPasabuy PH',
                'url' => url('/'),
                'potentialAction' => [
                    '@type' => 'SearchAction',
                    'target' => [
                        '@type' => 'EntryPoint',
                        'urlTemplate' => url('/catalog?category={category_term_string}'),
                    ],
                    'query-input' => 'required name=category_term_string'
                ]
            ]));
    }
}
