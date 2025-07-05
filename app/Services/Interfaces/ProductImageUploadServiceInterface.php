<?php

namespace App\Services\Interfaces;

use App\Models\Product;
use Illuminate\Http\UploadedFile;

interface ProductImageUploadServiceInterface
{
    public function upload(Product $product, UploadedFile $file): string;
}