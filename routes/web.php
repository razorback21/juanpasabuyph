<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Customer\Http\Controllers\CustomerController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


// profile
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); 
});

// Pdoucts
Route::middleware('auth')->group(function() {
    // Product management routes
    // Route::get('/products/search', [ProductController::class, 'search'])->name('products.search');
    Route::resource('products', ProductController::class);
    
    
    // Product inventory management (we'll implement these controllers later)
    // Route::post('/products/{product}/stock/add', [ProductController::class, 'addStock'])
    //     ->name('products.stock.add');
    // Route::post('/products/{product}/stock/remove', [ProductController::class, 'removeStock'])
    //     ->name('products.stock.remove');

    
    // Public product routes (no auth required)
    //Route::get('/catalog', [ProductController::class, 'catalog'])->name('products.catalog');
    //Route::get('/catalog/{product}', [ProductController::class, 'catalogShow'])->name('products.catalog.show');

    // Inventory
    Route::resource('inventory', InventoryController::class);
});


require __DIR__.'/auth.php';
