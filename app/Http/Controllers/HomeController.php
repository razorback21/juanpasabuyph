<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use App\Traits\HasDefaultSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    use HasDefaultSeo;

    public function __construct(private ProductService $productService)
    {

    }

    public function index(Request $request)
    {
        $title = 'Home';
        $featuredProducts = Product::featuredProduct()->get()->random(4);
        $popularProducts = $this->productService->getPopularProducts()->get()->shuffle()->take(4);

        return Inertia::render("Store/Home/Index", compact('title', 'featuredProducts', 'popularProducts'));
    }
}
