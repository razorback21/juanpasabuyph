<?php

namespace App\Services;

use App\Models\Product;
use App\Services\Interfaces\ProductImageUploadServiceInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Contracts\Container\Container;

class ProductFileUploadService
{
    protected $container;
    protected $dbField;
    
    public function __construct(Container $container) {
       $this->container = $container;
    }

    // Upload image using default service (featured image)
    public function uploadImage(Product $product, UploadedFile $file): string
    {
        $uploadService = $this->container->make(ProductImageUploadServiceInterface::class);
        return $uploadService->upload($product, $file);
    }
    
    // Upload image using specific service type
    public function uploadImageByType(Product $product, UploadedFile $file, string $type = 'featured'): string
    {
        $serviceKey = "upload.{$type}";
        $uploadService = $this->container->make($serviceKey);
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
