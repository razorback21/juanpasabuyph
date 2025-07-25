<?php

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OrderStatusTimelineController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProfileController;
use App\Models\Customer;
use GuzzleHttp\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get("/", [HomeController::class, 'index'])->name('home');
Route::get("/catalog", [CatalogController::class, 'index'])->name('catalog');
Route::get("/catalog/{category}/{slug}/", [CatalogController::class, 'item'])->name('catalog.item');
Route::get("/faqs", [FaqsController::class, 'index'])->name('faqs');
Route::get("/about", [FaqsController::class, 'about'])->name('about');
Route::get("/contact", [ContactController::class, 'index'])->name('contact');
Route::get("/cart", [CartController::class, 'index'])->name('cart');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


// profile
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Products
Route::middleware('auth')->group(function () {
    // Product 
    Route::resource('products', ProductController::class);
    Route::post('/productimages/upload/{id}/{type}', [ProductImageController::class, 'upload']);

    // Product category
    Route::resource('product-categories', ProductCategoryController::class);

    // Inventory
    Route::resource('inventory', InventoryController::class);
});

// Orders
Route::middleware('auth')->group(function () {
    Route::resource('orders', OrderController::class);
});

// Order Item
Route::middleware('auth')->group(function () {
    Route::resource('order-items', OrderItemController::class);
});

// Order Status Timeline
Route::middleware('auth')->group(function () {
    Route::resource('order-status-timelines', OrderStatusTimelineController::class);
});

Route::get('/test', function () {

    $user = Customer::orderBy()->get();
    dd($user->toArray());
});

require __DIR__ . '/auth.php';
