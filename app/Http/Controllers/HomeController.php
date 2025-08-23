<?php

namespace App\Http\Controllers;

use App\Actions\HeroImage;
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
        $this->defaultSeo();
    }

    public function index(Request $request)
    {
        $title = 'Home';
        $featuredProducts = Product::featuredProduct()->inRandomOrder()->limit(4)->get();
        $popularProducts = $this->productService->getPopularProducts()->inRandomOrder()->limit(4)->get();
        $heroImage = HeroImage::run('home');
        return Inertia::render("Store/Home/Index", compact('title', 'featuredProducts', 'popularProducts', 'heroImage'));
    }
}
