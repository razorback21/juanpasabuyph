<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $featuredProducts = Product::where('is_featured', true)->get()->random(4);
        // todo: replace with best products
        $bestProducts = Product::where('is_featured', true)->get()->random(4);

        return Inertia::render("Store/Home/Index", [
            'title' => "Juanpasabuy Store",
            'featuredProducts' => $featuredProducts,
            'bestProducts' => $bestProducts,
        ]);
    }
}
