<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Services\CataglogService;
use App\Traits\HasDefaultSeo;
use App\Traits\HasProductSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    use HasDefaultSeo, HasProductSeo;
    public function index(Request $request)
    {
        $this->defaultSeo();
        $categories = ProductCategory::all();
        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'categories' => $categories,
        ]);
    }

    public function paginate(Request $request)
    {
        $paginatedProducts = (new CataglogService())->getPaginatedData(15);
        return response()->json($paginatedProducts);
    }

    public function item(Request $request, $category, $slug)
    {

        $product = Product::where('slug', $slug)->first();
        $this->productSeo($product);
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
