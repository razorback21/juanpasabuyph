<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeaturedProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $featuredProducts = Product::featuredProduct()->get();
        return Inertia::render('FeaturedProduct/Index', compact('featuredProducts'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'is_featured' => 'required|boolean',
        ]);

        $product->update([
            'is_featured' => $request->input('is_featured'),
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }
}
