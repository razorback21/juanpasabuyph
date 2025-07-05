<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductImageUploadRequest;
use App\Models\Product;
use App\Services\ProductFileUploadService;


class ProductImageController extends Controller
{

    public function __construct(protected ProductFileUploadService $fileUploadService)
    {

    }

    public function upload(ProductImageUploadRequest $request, $id)
    {
        $validator = $request->validated();
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $product = Product::findOrFail($id);

        // Method 1: Using the specific featured image method
        $type = $request->input('type');
        $imagePath = $this->fileUploadService->uploadImageByType($product, $request->file($type), $type);

        // Update product with new image path
        $product->update([
            $this->fileUploadService->getDBField() => '/storage/' . $imagePath
        ]);

        return back()->with('success', 'Product featured image updated successfully!');
    }
}