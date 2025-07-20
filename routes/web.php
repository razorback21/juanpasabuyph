<?php

use App\Enums\OrderStatusEnum;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OrderStatusTimelineController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\OrderService;
use App\Services\ReservedItem;
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

Route::get("/", [StoreController::class, 'index']);

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
    $timelimeStatus = Order::find(130);
    $orderStatus = OrderStatusEnum::from('processing');
    dd($orderStatus);

});

require __DIR__ . '/auth.php';
