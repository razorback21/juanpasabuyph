<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductImageUploadRequest;
use App\Models\Product;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductImageController extends Controller
{

    public function __construct(protected FileUploadService $fileUploadService)
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
        $imagePath = $this->fileUploadService->uploadImageByType($product, $request->file('featured_image'),$request->input('type'));
        
        // Update product with new image path
        $product->update([
            'featured_image' => '/storage/' . $imagePath
        ]);

        return back()->with('success', 'Product featured image updated successfully!');
    }
}