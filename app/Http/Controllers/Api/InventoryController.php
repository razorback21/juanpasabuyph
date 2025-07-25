<?php

namespace App\Http\Controllers\Api;

use App\Enums\MovementTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Http\Resources\InventoryResource;
use App\Models\Product;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Product $product)
    {
        $product->load('inventory');
        return InventoryResource::collection($product->inventory);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InventoryRequest $request)
    {
        $product = Product::findOrFail(request()->input("product_id"));
        $validated = $request->validated();
        unset($validated['product_id']);
        $product->inventory()->create($validated);

        return redirect()->back()->with('message', 'Inventory updated!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
