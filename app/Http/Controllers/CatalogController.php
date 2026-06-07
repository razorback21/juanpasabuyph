<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Services\CataglogService;
use App\Services\ProductService;
use App\Traits\HasDefaultSeo;
use App\Traits\HasProductSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    use HasDefaultSeo, HasProductSeo;

    public function index()
    {
        $this->defaultSeo();
        $categories = ProductCategory::whereHas('products')->get();
        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'categories' => $categories,
        ]);
    }

    public function paginate()
    {
        $paginatedProducts = (new CataglogService())->getPaginatedData(15);
        return response()->json($paginatedProducts);
    }

    public function item(Request $request, $category, $slug)
    {
        $product = Product::where("disabled", false)->where("slug", $slug)->firstOrFail();
        $product->load(['category', 'media']);
        $category = $product->category()->with(['products' => function ($query) {
            $query->with('media');
        }])->first();
        $relatedProducts = $category->products()->with('category')->where("id", "!=", $product->id)->limit(4)->inRandomOrder()->get();

        return Inertia::render("Store/Catalog/Item", [
            'title' => $product->name,
            'product' => $product->append('gallery_images'),
            'categorySlug' => $product->category->slug,
            'category' => $product->category->name,
            'relatedProducts' => $relatedProducts
        ]);
    }
}
