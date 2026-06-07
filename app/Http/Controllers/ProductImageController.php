<?php

namespace App\Http\Controllers;

use App\Actions\DeleteProductGalleryImage;
use App\Actions\SetProductFeaturedImage;
use App\Actions\StoreProductGalleryImage;
use App\Actions\StoreProductImage;
use App\Http\Requests\ProductGalleryUploadRequest;
use App\Http\Requests\ProductImageUploadRequest;
use App\Models\Product;
use App\Services\ProductFileUploadService;

class ProductImageController extends Controller
{
    public function upload(ProductImageUploadRequest $request, $id, $type)
    {
        $validator = $request->validated();
        if (!$validator) {
            return back()->withErrors($validator)->withInput();
        }

        $product = Product::findOrFail($id);
        StoreProductImage::run($product);

        return back()->with('success', 'Product image updated successfully!');
    }

    public function uploadGallery(ProductGalleryUploadRequest $request, Product $product)
    {
        foreach ($request->file('images', []) as $file) {
            StoreProductGalleryImage::run($product, $file);
        }

        return back()->with('success', 'Gallery images uploaded!');
    }

    public function deleteImage(Product $product, int $mediaId)
    {
        DeleteProductGalleryImage::run($product, $mediaId);

        return back()->with('success', 'Image deleted!');
    }

    public function setFeatured(Product $product, int $mediaId)
    {
        SetProductFeaturedImage::run($product, $mediaId);

        return back()->with('success', 'Featured image updated!');
    }
}
