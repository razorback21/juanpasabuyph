<?php

namespace App\Services\Classes;

use App\Models\Product;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadSocialMediaImage implements ProductImageUploadServiceInterface
{
    public function upload(Product $product, UploadedFile $file): string
    {
        // Delete old image if exists
        if ($product->socialmedia_image) {
            Storage::disk('public')->delete($product->socialmedia_image);
        }
        
        return $file->store('products', 'public');
    }
}