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
            'category' => 'nullable|string',
            'page' => 'nullable|integer|min:1',
            'search' => 'nullable|string',
        ]);

        $products = Product::where('disabled', '=', false)->with(['category', 'media']);
        if (isset($validated['search'])) {
            $products = $products->whereAny(['name', 'description'], 'like', '%' . $validated['search'] . '%');
        }
        if (isset($validated['category']) && !in_array($validated['category'], ['All', 'all'], true)) {
            $products = $products->whereHas('category', function ($query) use ($validated) {
                $query->where('slug', $validated['category']);
            });
        }

        return $products->paginate($itemPerPage)->withQueryString();
    }
}
