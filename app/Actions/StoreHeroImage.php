<?php

namespace App\Actions;

use App\Models\Pages\PageAsset;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreHeroImage
{
    use AsAction;

    public function handle($code, $section)
    {
        DB::transaction(function () use ($code, $section) {
            $asset = PageAsset::firstorNew([
                'code' => $code,
                'section' => $section,
            ]);

            $asset->save();

            $collectionCode = $code . '_' . $section;
            $asset->clearMediaCollection($collectionCode);
            $asset->addMediaFromRequest('image')->toMediaCollection($collectionCode);
            $media = $asset->getLastMedia($collectionCode);
            if ($media) {
                unlink($media->getPath());
            }
        });
    }
}
