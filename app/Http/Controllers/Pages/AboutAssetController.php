<?php

namespace App\Http\Controllers\Pages;

use App\Actions\HeroImage;
use App\Actions\StoreHeroImage;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutAssetController extends Controller
{

    public function index()
    {
        $heroImage = HeroImage::run('about');
        return Inertia::render("PageContent/AboutPage", compact('heroImage'));
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        StoreHeroImage::run('about', 'hero');
    }

    public function update(Request $request)
    {

    }
}
