<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {   
        return Inertia::render('Dashboard',[
            'products' => Product::latest()->paginate(3),
        ]);
    }
}
