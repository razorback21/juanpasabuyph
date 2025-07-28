<?php

namespace App\Http\Controllers;

use App\Http\Requests\CartRequest;
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

    public function update(CartRequest $request)
    {
        $validated = $request->validated();

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

    public function increment(CartRequest $request)
    {
        $validated = $request->validated();
        $this->cartService->updateQuantity($validated['product_id'], $validated['quantity']);

        return redirect()->back()->with('message', 'Item quantity incremented');
    }

    public function decrement(CartRequest $request)
    {
        $validated = $request->validated();

        // get cart item and check if quantity is 1
        $cartItem = $this->cartService->getCartItem($validated['product_id']);

        if ($cartItem['quantity'] <= 1) {
            return redirect()->back()->with('message', 'Item quantity cannot be decremented');
        }

        $this->cartService->updateQuantity($validated['product_id'], $validated['quantity']);

        return redirect()->back()->with('message', 'Item quantity decremented');
    }
}
