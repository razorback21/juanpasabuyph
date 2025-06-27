<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
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
        $products = Product::query()
            ->withCount(['inventory as stock' => function ($query) {
                $query->selectRaw('COALESCE(SUM(CASE WHEN movement_type = "in" THEN quantity ELSE -quantity END), 0)');
            }])
            ->latest()
            ->paginate(10);

        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Products/Create',[
             'categories' => ProductCategory::all()->toArray(),
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'product_category_id' => 'required',
            'is_featured' => 'nullable|boolean',
        ]);

        $product = Product::create($validated);

        return redirect(route('products.show', $product))
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        $product->load(['inventory' => function ($query) {
            $query->latest();
        }]);

        $currentStock = $product->getCurrentStock();

        return Inertia::render('Products/Show', [
            'product' => $product,
            'currentStock' => $currentStock,
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
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'product_category_id' => 'required',
        ]);

        $product->update($validated);

        return to_route('dashboard')
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
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'nullable|string|max:255',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'in_stock' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $query = Product::query()
            ->withCount(['inventory as stock' => function ($query) {
                $query->selectRaw('COALESCE(SUM(CASE WHEN movement_type = "in" THEN quantity ELSE -quantity END), 0)');
            }]);

        // Apply search filters
        if ($request->filled('query')) {
            $searchQuery = $request->input('query');
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'like', "%{$searchQuery}%")
                    ->orWhere('description', 'like', "%{$searchQuery}%");
            });
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', (float)$request->input('min_price'));
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float)$request->input('max_price'));
        }

        if ($request->boolean('in_stock')) {
            $query->whereHas('inventory', function ($q) {
                $q->selectRaw('product_id, SUM(CASE WHEN movement_type = "in" THEN quantity ELSE -quantity END) as stock')
                    ->groupBy('product_id')
                    ->havingRaw('stock > 0');
            });
        }

        $products = $query->latest()->paginate(10);

        return response()->json($products);
    }
}
