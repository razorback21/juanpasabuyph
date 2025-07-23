<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index(Request $user)
    {
        $products = Product::query()
            ->with('productCategory')
            ->get();
        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'products' => $products
        ]);
    }
}
