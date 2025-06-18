<?php

namespace App\Services;

use Illuminate\Http\Request;

class ProductFilterService
{
    public function filter(&$query, Request $request)
    {
        // Apply category filter
        if ($request->filled('category')) {
            $query->where('product_category_id', $request->input('category'));
        }
    }
}
