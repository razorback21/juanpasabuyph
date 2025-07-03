<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpFoundation\Request;


class ProductFilterService
{
    private Builder $query;

    public function __construct(Request $request)
    {
        $this->query = Product::query();

        // Apply category filter
        if ($request->filled('category')) {
            $this->query->where('product_category_id', $request->input('category'));
        }
    }

    public function getQuery(): Builder
    {
        return $this->query;
    }

}
