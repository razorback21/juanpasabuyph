<?php

namespace App\Http\Controllers;


use App\Http\Requests\CartRequest;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    private $cartSessionKey;
    public function __construct(public CartService $cartService)
    {
        $this->cartSessionKey = config('constants.CART_SESSION_KEY');
    }

    public function update(CartRequest $request)
    {
        $validated = $request->validated();

        $this->cartService->addItem($validated['product_id'], $validated['quantity']);

        return redirect()->back()->with('message', 'Item added to cart');
    }

    public function destroy(Request $request, $id)
    {
        $cart = $request->session()->get($this->cartSessionKey, []);
        unset($cart[$id]);
        $request->session()->put($this->cartSessionKey, $cart);

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

    public function remove(Request $request, $product_id)
    {
        $cart = $request->session()->get($this->cartSessionKey, []);
        unset($cart[$product_id]);
        $request->session()->put($this->cartSessionKey, $cart);
        return redirect()->back()->with('message', 'Item removed from cart');
    }
}
