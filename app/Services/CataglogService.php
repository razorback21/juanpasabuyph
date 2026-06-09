<?php

namespace App\Services;

use App\Models\Product;

class CataglogService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public function getPaginatedData($itemPerPage = 10)
    {
        $validated = request()->validate([
            'category' => 'nullable|string',
            'page' => 'nullable|integer|min:1',
            'search' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
        ]);

        \Log::info('CataglogService request', ['validated' => $validated]);

        $products = Product::where('disabled', '=', false)->with(['category', 'media']);
        if (isset($validated['search'])) {
            $products = $products->whereAny(['name', 'description'], 'like', '%'.$validated['search'].'%');
        }
        if (isset($validated['category']) && ! in_array($validated['category'], ['All', 'all'], true)) {
            $products = $products->whereHas('category', function ($query) use ($validated) {
                $query->where('slug', $validated['category']);
            });
        }
        if (isset($validated['min_price'])) {
            $products = $products->where('price', '>=', $validated['min_price']);
        }
        if (isset($validated['max_price'])) {
            $products = $products->where('price', '<=', $validated['max_price']);
        }

        $priceRange = [
            'min' => (float) $products->min('price'),
            'max' => (float) $products->max('price'),
        ];

        $result = $products->orderBy('price', 'asc')->paginate($itemPerPage)->withQueryString();
        $result->priceRange = $priceRange;

        \Log::info('CataglogService response', ['total' => $result->total(), 'count' => $result->count()]);

        return $result;
    }
}
