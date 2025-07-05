<?php

namespace App\Http\Controllers;

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
        $fileUploadService = new ProductFileUploadService();

        // Auto-resolve upload service based on type parameter
        $imagePath = $fileUploadService->uploadImageByType($product, $request->file('image'), $type);

        // Update product with new image path
        $product->update([
            $fileUploadService->getDbField() => '/storage/' . $imagePath
        ]);

        return back()->with('success', 'Product image updated successfully!');
    }
}