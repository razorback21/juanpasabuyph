<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Traits\HasDefaultSeo;

class FaqsController extends Controller
{
    use HasDefaultSeo;
    public function index()
    {
        $this->defaultSeo();
        return Inertia::render('Store/Faqs/Index');
    }
}
