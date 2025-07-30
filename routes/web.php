<?php

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
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
use App\Services\CartService;
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

// Store Front
Route::get("/", [HomeController::class, 'index'])->name('home');
Route::get("/catalog", [CatalogController::class, 'index'])->name('catalog');
Route::get("/catalog/{category}/{slug}/", [CatalogController::class, 'item'])->name('catalog.item');
Route::get("/faqs", [FaqsController::class, 'index'])->name('faqs');
Route::get("/about", [AboutController::class, 'index'])->name('about');
Route::get("/contact", [ContactController::class, 'index'])->name('contact');
Route::get("/checkout", [CheckoutController::class, 'index'])->name('checkout');
Route::post("/checkout", [CheckoutController::class, 'store'])->name('checkout.store');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');


// profile
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    // Product 
    Route::resource('products', ProductController::class);
    Route::post('/productimages/upload/{id}/{type}', [ProductImageController::class, 'upload']);

    // Product category
    Route::resource('product-categories', ProductCategoryController::class);

    // Inventory
    Route::resource('inventory', InventoryController::class);

    // Orders
    Route::resource('orders', OrderController::class);

    // Order Item
    Route::resource('order-items', OrderItemController::class);

    // Order Status Timeline
    Route::resource('order-status-timelines', OrderStatusTimelineController::class);

});

Route::put('/cart/update', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/remove/{product_id}', [CartController::class, 'remove'])->name('cart.remove');
Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
Route::put('/cart/increment', [CartController::class, 'increment'])->name('cart.increment');
Route::put('/cart/decrement', [CartController::class, 'decrement'])->name('cart.decrement');

// Sitemap route
Route::get('/sitemap.xml', function () {
    $sitemapPath = public_path('sitemap.xml');

    if (!file_exists($sitemapPath)) {
        abort(404, 'Sitemap not found.');
    }

    return response()->file($sitemapPath, [
        'Content-Type' => 'application/xml'
    ]);
})->name('sitemap');

Route::get('/test', function () {
    $cart = app(CartService::class);
    dd($cart->getCart());
});

require __DIR__ . '/auth.php';
