<?php

use App\Http\Controllers\Api\InventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    Route::get('products/{product}/inventory', [InventoryController::class, 'index'])->name('api.products.inventory');
});