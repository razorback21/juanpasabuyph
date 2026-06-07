<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductGalleryUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'images.*' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $product = $this->route('product');

            if ($product) {
                $existing = $product->getMedia('product_feature_image')->count();
                $incoming = count($this->file('images', []));
                $total = $existing + $incoming;

                if ($total > 8) {
                    $validator->errors()->add(
                        'images',
                        'Maximum of 8 images allowed. Product already has ' . $existing . ' image(s).'
                    );
                }
            }
        });
    }
}
