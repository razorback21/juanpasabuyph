<?php

namespace App\Http\Controllers;

use App\Enums\MovementTypeEnum;
use App\Enums\ProductUOMEnum;
use App\Exceptions\CannotDeleteProductException;
use App\Http\Requests\Product\ProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Services\ProductDeleteService;
use App\Services\ProductFilterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request)
    {
        $filter = new ProductFilterService($request);

        $products = $filter->getQuery()->with(['category', 'media'])->paginate(10)
            ->withQueryString()
            ->through(function ($product) {
                return [
                    ...$product->toArray(),
                    'description' => Str::limit($product->description, 100),
                ];
            });

        $categories = ProductCategory::all();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'active_category' => $request->query('active_category') ?? 'All',
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => ProductCategory::all()->toArray(),
            'uoms' => ProductUOMEnum::getOptions(),
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(ProductRequest $request)
    {
        $validated = $request->validated();

        $product = Product::create($validated);

        return redirect(route('products.show', $product))
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load([
            'media',
            'inventory' => function ($query) {
                $query->oldest();
            }
        ]);

        $product->load('groupedProducts.media', 'groupedProducts.category');

        $allProducts = Product::where('id', '!=', $product->id)
            ->select('id', 'name', 'slug', 'price')
            ->with('media')
            ->get()
            ->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'thumbnail_url' => $p->thumbnail_url,
            ]);

        return Inertia::render('Products/Show', [
            'product' => $product->append('gallery_images'),
            'movementTypes' => MovementTypeEnum::getOptions(),
            'allProducts' => $allProducts,
        ]);
    }

    public function updateGroupings(Request $request, Product $product)
    {
        $validated = $request->validate([
            'grouped_product_ids' => 'required|array',
            'grouped_product_ids.*' => 'exists:products,id',
        ]);

        $ids = array_values(array_filter($validated['grouped_product_ids'], fn ($id) => $id != $product->id));
        $groupMembers = array_unique(array_merge([$product->id], $ids));

        DB::table('product_groupings')
            ->whereIn('product_id', $groupMembers)
            ->orWhereIn('grouped_product_id', $groupMembers)
            ->delete();

        foreach ($groupMembers as $memberId) {
            $others = array_values(array_diff($groupMembers, [$memberId]));
            $member = Product::find($memberId);
            $member->groupedProducts()->sync($others);
        }

        return to_route('products.show', $product)
            ->with('success', 'Product groupings updated successfully.');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'categories' => ProductCategory::all()->toArray(),
            'product' => $product->load('media'),
            'from' => request()->query('from'),
            'uoms' => ProductUOMEnum::getOptions(),
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        $product->update($validated);

        return to_route('products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        // clear media first before deleting the product model
        $product->clearMediaCollection('product_feature_image');
        $product->delete();

        return redirect()
            ->route('products.index', request()->query())
            ->with('success', 'Product deleted successfully.');
    }
}
