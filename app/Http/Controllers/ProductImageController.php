<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductImageController extends Controller
{
    
    public function uploadFeaturedImage(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'featured_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $product = Product::findOrFail($id);
        
        // Delete old image if exists
        if ($product->featured_image) {
            Storage::disk('public')->delete($product->featured_image);
        }
        
        // Store new image
        $imagePath = $request->file('featured_image')->store('products', 'public');
        
        // Update product with new image path
        $product->update([
            'featured_image' => '/storage/' . $imagePath
        ]);
        
        return back()->with('success', 'Product image updated successfully!');
    }
}