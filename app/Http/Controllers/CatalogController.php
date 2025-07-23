<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $user)
    {
        $products = Product::all();
        $products->load('category');

        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'products' => $products
        ]);
    }

    public function item(Request $request, $category, $slug)
    {
        $product = Product::where('slug', $slug)->first();
        $product->load('category');

        return Inertia::render("Store/Catalog/Item", [
            'title' => $product->name,
            'product' => $product,
            'category' => $product->category->name
        ]);
    }
}
