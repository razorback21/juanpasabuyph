<?php

use App\Enums\OrderStatusEnum;
use App\Enums\ProductUOMEnum;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DisabledProductController;
use App\Http\Controllers\FaqsController;
use App\Http\Controllers\FeaturedProductController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OrderStatusTimelineController;
use App\Http\Controllers\OutOfStockController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteMapController;
use App\Http\Controllers\TrackController;
use App\Models\Customer;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\Product;
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

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
// Checkout
Route::get("/checkout", [CheckoutController::class, 'index'])->name('checkout');
Route::post("/checkout", [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/thank-you/{order_id}', [CheckoutController::class, 'thankYou'])->name('checkout.thank-you');

Route::middleware('visitor.request')->group(function () {
    Route::get("/", [HomeController::class, 'index'])->name('home');
    Route::get("/catalog", [CatalogController::class, 'index'])->name('catalog');
    Route::get("/catalog/{category}/{slug}/", [CatalogController::class, 'item'])->name('catalog.item');
    Route::get("/faqs", [FaqsController::class, 'index'])->name('faqs');
    Route::get("/about", [AboutController::class, 'index'])->name('about');
    Route::get("/contact", [ContactController::class, 'index'])->name('contact');
    // Cart
    Route::put('/cart/update', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/remove/{product_id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/cart/clear', [CartController::class, 'clear'])->name('cart.clear');
    Route::put('/cart/increment', [CartController::class, 'increment'])->name('cart.increment');
    Route::put('/cart/decrement', [CartController::class, 'decrement'])->name('cart.decrement');
    // Contact
    Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
    Route::get('/contact/thank-you', [ContactController::class, 'thankYou'])->name('contact.thank-you')->middleware('throttle:10,1');
    Route::post('/contact', [ContactController::class, 'store'])->name('contact.store')->middleware('throttle:10,1');
    Route::get('/captcha/api/math', [ContactController::class, 'captcha'])->name('captcha.api');
    Route::post('/contact/validate', [ContactController::class, 'validate'])->name('contact.validate');
    // Order
    Route::get('/track/{order_id}', [TrackController::class, 'track'])->name('track')->middleware('throttle:20,1');
});
// Admin
Route::middleware(['auth'])->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Product 
    Route::resource('products', ProductController::class);
    Route::post('/productimages/upload/{id}/{type}', [ProductImageController::class, 'upload']);
    // Product category
    Route::resource('product-categories', ProductCategoryController::class);
    // Inventory
    Route::resource('inventory', InventoryController::class);
    // Orders
    Route::resource('orders', OrderController::class);
    Route::put('/orders/{order}/update-estimated-delivery-date', [OrderController::class, 'updateEstimatedDeliveryDate'])->name('orders.update-estimated-delivery-date');
    // Order Item
    Route::resource('order-items', OrderItemController::class);
    // Order Status Timeline
    Route::resource('order-status-timelines', OrderStatusTimelineController::class);
    // Featured Product
    Route::get('/featured-products', [FeaturedProductController::class, 'index'])->name('featured-products.index');
    Route::put('/featured-products/{product}', [FeaturedProductController::class, 'update'])->name('featured-products.update');
    // Disabled Product
    Route::get('/disabled-products', [DisabledProductController::class, 'index'])->name('disabled-products.index');
    Route::put('/disabled-products/{product}', [DisabledProductController::class, 'update'])->name('disabled-products.update');
    // Out of Stock
    Route::get('/out-of-stock', [OutOfStockController::class, 'index'])->name('out-of-stock.index');
});
// Sitemap route
Route::get('/sitemap.xml', SiteMapController::class)->name('sitemap');

// test
Route::get('/test', function () {
    $OrderCount = Order::where('status', '=', 'placed')->count();
    dd($OrderCount);
});

require __DIR__ . '/auth.php';
