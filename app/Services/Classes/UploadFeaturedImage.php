<?php

namespace App\Services\Classes;

use App\Models\Product;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadFeaturedImage implements ProductImageUploadServiceInterface
{
    protected $dbField = "featured_image";

    public function upload(Product $product, UploadedFile $file): string
    {
        // Handle image processing, storage, and cleanup
        // Delete old image if exists
        if ($product->$this->dbField) {
            Storage::disk('public')->delete($product->$this->dbField);
        }
        
        // Store new image
        return $file->store('products', 'public');
    }

    public function getDbField(): string
    {
        return $this->dbField;
    }
}
