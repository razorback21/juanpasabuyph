<?php

namespace App\Http\Controllers\Pages;

use App\Actions\HeroImage;
use App\Actions\StoreHeroImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeAssetController extends Controller
{

    public function index()
    {
        $heroImage = HeroImage::run('home');
        return Inertia::render("PageContent/HomePage", compact('heroImage'));
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        StoreHeroImage::run('home', 'hero');
    }

    public function update(Request $request)
    {

    }
}
