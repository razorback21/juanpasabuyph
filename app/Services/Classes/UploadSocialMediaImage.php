<?php

namespace App\Services\Classes;

use App\Models\Product;
use App\Services\ConventToWebp;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class UploadSocialMediaImage implements ProductImageUploadServiceInterface
{
    protected $dbField = "socialmedia_image";
    
    public function upload(Product $product, UploadedFile $file): string
    {
        // Delete old image if exists
        if ($product->{$this->dbField}) {
            Storage::disk('public')->delete($this->dbField);
        }
        
        return (new ConventToWebp())->convert($file,'products');
    }

    public function getDbField(): string
    {
        return $this->dbField;
    }

}