<?php

namespace App\Actions;

use App\Models\Pages\PageAsset;
use Lorisleiva\Actions\Concerns\AsAction;

class HeroImage
{
    use AsAction;

    private static $lookup = [
        'home' => [
            'code' => 'home',
            'section' => 'hero',
            'media' => 'home_hero',
        ],
        'about' => [
            'code' => 'about',
            'section' => 'hero',
            'media' => 'about_hero',
        ],
    ];

    public function handle($page)
    {
        if (!isset(self::$lookup[$page])) {
            throw new \Exception('Hero image key not found');
        }

        $heroImage = '';
        $assets = PageAsset::where(['code' => self::$lookup[$page]['code'], 'section' => self::$lookup[$page]['section']])->get()->first();
        if ($assets) {
            $media = self::$lookup[$page]['media'];
            $heroImage = $assets->getLastMedia($media)->getUrl('webp_1080');
            $heroImage = $heroImage ?? '';
        }

        return $heroImage;
    }


}
