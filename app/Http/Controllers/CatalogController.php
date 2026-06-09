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

    public function index()
    {
        $this->defaultSeo();

        $categorySlug = request()->get('category');
        $categories = $this->getCategoriesWithCount();
        $priceRange = $this->getPriceRange($categorySlug);

        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'categories' => $categories,
            'priceRange' => $priceRange,
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
        $product->load(['groupedProducts' => function ($query) {
            $query->with('media', 'category')->where('disabled', false);
        }]);
        $category = $product->category()->with(['products' => function ($query) {
            $query->with('media');
        }])->first();
        $relatedProducts = $category->products()->with('category')->where("id", "!=", $product->id)->limit(5)->inRandomOrder()->get();

        return Inertia::render("Store/Catalog/Item", [
            'title' => $product->name,
            'product' => $product->append('gallery_images'),
            'categorySlug' => $product->category->slug,
            'category' => $product->category->name,
            'relatedProducts' => $relatedProducts,
            'groupedProducts' => $product->groupedProducts,
        ]);
    }

    private function getCategoriesWithCount()
    {
        return ProductCategory::whereHas('products', function ($query) {
            $query->where('disabled', false);
        })->withCount(['products' => function ($query) {
            $query->where('disabled', false);
        }])->get();
    }

    private function getPriceRange(?string $categorySlug = null): array
    {
        $query = Product::where('disabled', false);

        if ($categorySlug && !in_array($categorySlug, ['All', 'all'], true)) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $range = $query->selectRaw('MIN(price) as min_price, MAX(price) as max_price')->first();

        return [
            'min' => (float) ($range->min_price ?? 0),
            'max' => (float) ($range->max_price ?? 10000),
        ];
    }
}
