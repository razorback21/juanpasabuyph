<?php

namespace App\Models\Pages;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PageAsset extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('webp')
            ->format('webp')
            ->nonQueued(); // Do not queue conversion
    }

}
