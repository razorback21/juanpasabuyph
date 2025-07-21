<?php

namespace App\Actions;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Lorisleiva\Actions\Concerns\AsAction;

class GenarateSlug
{
    use AsAction;

    public function handle(Model $model, string $field)
    {
        $slug = Str::slug($model->{$field});
        $originalSlug = $slug;
        $counter = 1;

        while (
            $model->where('slug', $slug)->when($model->id, function ($query, $id) {
                return $query->where('id', '!=', $id);
            })->exists()
        ) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
