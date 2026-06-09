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
        $featuredProducts = Product::featuredProducts()->with(['category', 'media'])->limit(5)->inRandomOrder()->get();
        $popularProducts = $this->productService->getPopularProducts()->with(['category', 'media'])->inRandomOrder()->limit(5)->get();
        $heroImage = HeroImage::run('home');
        return Inertia::render("Store/Home/Index", compact('title', 'featuredProducts', 'popularProducts', 'heroImage'));
    }
}
