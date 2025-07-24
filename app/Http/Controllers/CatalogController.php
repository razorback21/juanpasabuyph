<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $user)
    {
        $products = Product::all();
        $products->load('category');
        $categories = ProductCategory::all();


        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function item(Request $request, $category, $slug)
    {
        $product = Product::where('slug', $slug)->first();
        $product->load('category');
        $relatedProducts = Product::get()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->random(4);

        return Inertia::render("Store/Catalog/Item", [
            'title' => $product->name,
            'product' => $product,
            'category' => $product->category->name,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
