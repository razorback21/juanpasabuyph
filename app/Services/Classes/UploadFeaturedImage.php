<?php

namespace App\Services\Classes;

use App\Models\Product;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadFeaturedImage implements ProductImageUploadServiceInterface
{
    public function upload(Product $product, UploadedFile $file): string
    {
        // Handle image processing, storage, and cleanup
        // Delete old image if exists
        if ($product->featured_image) {
            Storage::disk('public')->delete($product->featured_image);
        }
        
        // Store new image
        return $file->store('products', 'public');
    }
}
