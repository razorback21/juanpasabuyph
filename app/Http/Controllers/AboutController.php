<?php

namespace App\Http\Controllers;

use App\Traits\HasDefaultSeo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    use HasDefaultSeo;
    public function index()
    {
        $this->defaultSeo();
        $heroImage = HeroImage::run('about');
        return Inertia::render('Store/About/Index', compact('heroImage'));
    }
}
