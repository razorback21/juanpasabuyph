<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqsController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Faqs/Index');
    }
}
