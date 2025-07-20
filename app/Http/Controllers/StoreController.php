<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        return Inertia::render("Store/Index", [
            'title' => "Juanpasabuy Store"
        ]);
    }
}
