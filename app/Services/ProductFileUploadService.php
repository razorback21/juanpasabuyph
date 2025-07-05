<?php

namespace App\Services;

use App\Models\Product;
use App\Services\ImageUploadServiceResolver;
use Illuminate\Http\UploadedFile;

class ProductFileUploadService
{
    protected $dbField;

    // Upload image using default service (featured image)
    public function uploadImage(Product $product, UploadedFile $file): string
    {
        return $this->uploadImageByType($product, $file, 'featured');
    }
    
    // Upload image using specific service type
    public function uploadImageByType(Product $product, UploadedFile $file, string $type = 'featured'): string
    {
        $uploadService = ImageUploadServiceResolver::resolve($type);
        $this->dbField = $uploadService->getDbField();
        return $uploadService->upload($product, $file);
    }
    
    // Upload featured image
    public function uploadFeaturedImage(Product $product, UploadedFile $file): string
    {
        return $this->uploadImageByType($product, $file, 'featured');
    }
    
    // Upload social media image
    public function uploadSocialImage(Product $product, UploadedFile $file): string
    {
        return $this->uploadImageByType($product, $file, 'socialmedia');
    }

    public function getDbField(): string {
        return $this->dbField ?? '';
    }
}
