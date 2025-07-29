<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $title = "Juanpasabuy Store";
        $featuredProducts = Product::featuredProduct()->get()->random(4);
        // todo: replace with best products
        $bestProducts = Product::bestSeller()->get()->random(4);

        return Inertia::render("Store/Home/Index", compact('title', 'featuredProducts', 'bestProducts'));
    }
}
