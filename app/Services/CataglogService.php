<?php

namespace App\Services;

use App\Models\Product;

class CataglogService
{

    /**
     * Create a new class instance.
     */
    public function __construct()
    {

    }

    public function getPaginatedData($itemPerPage = 10)
    {
        $validated = request()->validate([
            'category' => 'nullable|string|exists:product_categories,slug',
            'page' => 'nullable|integer|min:1'
        ]);

        $products = Product::where('disabled', '=', false)->with('category');

        if (isset($validated['category'])) {
            $products = $products->whereHas('category', function ($query) use ($validated) {
                $query->where('slug', $validated['category']);
            });
        }

        return $products->paginate($itemPerPage)->withQueryString();
    }
}
