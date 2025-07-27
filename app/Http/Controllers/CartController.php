<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Rules\ProductStock;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function __construct(public CartService $cartService)
    {
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => ['required', 'integer', 'min:1', new ProductStock($request->post('product_id'))],
        ]);

        $this->cartService->addItem($validated['product_id'], $validated['quantity']);

        return redirect()->back()->with('message', 'Item added to cart');
    }

    public function destroy(Request $request, $id)
    {
        $order = $request->session()->get('order', []);
        unset($order[$id]);
        $request->session()->put('order', $order);

        return redirect()->route('cart.checkout')->with('message', 'Item removed from cart');
    }
}
