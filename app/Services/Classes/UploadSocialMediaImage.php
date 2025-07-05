<?php

namespace App\Services\Classes;

use App\Models\Product;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadSocialMediaImage implements ProductImageUploadServiceInterface
{
    protected $dbField = "socialmedia_image";
    
    public function upload(Product $product, UploadedFile $file): string
    {
        // Delete old image if exists
        if ($product->$this->dbField) {
            Storage::disk('public')->delete($product->$this->dbField);
        }
        
        return $file->store('products', 'public');
    }

    public function getDbField(): string
    {
        return $this->dbField;
    }

}