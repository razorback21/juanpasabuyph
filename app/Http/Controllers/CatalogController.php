<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    public function index(Request $user)
    {
        $products = Product::all();

        return Inertia::render("Store/Catalog/Index", [
            'title' => "Catalog",
            'products' => $products
        ]);
    }
}
