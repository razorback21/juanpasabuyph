<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisabledProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disabledProducts = Product::disabledProducts()->with(['category', 'media'])->get();
        return Inertia::render('DisabledProduct/Index', compact('disabledProducts'));
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'disabled' => 'required|boolean',
        ]);

        $product->update([
            'disabled' => $validated['disabled'],
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
        ]);
    }
}
