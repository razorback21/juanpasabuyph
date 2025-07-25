<?php

namespace App\Http\Controllers;

use App\Enums\MovementTypeEnum;
use App\Exceptions\CannotDeleteProductException;
use App\Http\Requests\Product\ProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Services\ProductDeleteService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => ProductCategory::all()->toArray(),
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
            'inventory' => function ($query) {
                $query->oldest();
            }
        ]);

        return Inertia::render('Products/Show', [
            'product' => $product,
            'movementTypes' => MovementTypeEnum::getOptions(),
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'categories' => ProductCategory::all()->toArray(),
            'product' => $product,
            'from' => request()->query('from'),
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

        $product->delete();

        return redirect()
            ->route('dashboard', request()->query())
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Search products based on criteria.
     */
    // public function search(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'query' => 'nullable|string|max:255',
    //         'min_price' => 'nullable|numeric|min:0',
    //         'max_price' => 'nullable|numeric|min:0',
    //         'in_stock' => 'nullable|boolean',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $query = Product::query()
    //         ->withCount([
    //             'inventory as stock' => function ($query) {
    //                 $query->selectRaw('COALESCE(SUM(CASE WHEN movement_type = "in" THEN quantity ELSE -quantity END), 0)');
    //             }
    //         ]);

    //     // Apply search filters
    //     if ($request->filled('query')) {
    //         $searchQuery = $request->input('query');
    //         $query->where(function ($q) use ($searchQuery) {
    //             $q->where('name', 'like', "%{$searchQuery}%")
    //                 ->orWhere('description', 'like', "%{$searchQuery}%");
    //         });
    //     }

    //     if ($request->filled('min_price')) {
    //         $query->where('price', '>=', (float) $request->input('min_price'));
    //     }

    //     if ($request->filled('max_price')) {
    //         $query->where('price', '<=', (float) $request->input('max_price'));
    //     }

    //     if ($request->boolean('in_stock')) {
    //         $query->whereHas('inventory', function ($q) {
    //             $q->selectRaw('product_id, SUM(CASE WHEN movement_type = "in" THEN quantity ELSE -quantity END) as stock')
    //                 ->groupBy('product_id')
    //                 ->havingRaw('stock > 0');
    //         });
    //     }

    //     $products = $query->latest()->paginate(10);

    //     return response()->json($products);
    // }
}
