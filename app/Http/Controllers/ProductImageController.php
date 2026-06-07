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
use Illuminate\Http\JsonResponse;

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

    public function uploadGallery(ProductGalleryUploadRequest $request, Product $product): JsonResponse
    {
        foreach ($request->file('images', []) as $file) {
            StoreProductGalleryImage::run($product, $file);
        }

        $product->refresh();

        return response()->json([
            'gallery_images' => $product->gallery_images,
            'featured_media_id' => $product->featured_media_id,
        ]);
    }

    public function deleteImage(Product $product, int $mediaId): JsonResponse
    {
        DeleteProductGalleryImage::run($product, $mediaId);
        $product->refresh();

        return response()->json([
            'gallery_images' => $product->gallery_images,
            'featured_media_id' => $product->featured_media_id,
        ]);
    }

    public function setFeatured(Product $product, int $mediaId): JsonResponse
    {
        SetProductFeaturedImage::run($product, $mediaId);
        $product->refresh();

        return response()->json([
            'featured_media_id' => $product->featured_media_id,
            'featured_image_url' => $product->featured_image_url,
        ]);
    }
}
