<?php

namespace App\Http\Controllers;

use App\Actions\Order\CreateOrder;
use App\Http\Requests\CheckoutFormRequest;
use App\Services\CartService;
use Inertia\Inertia;

class CheckoutController extends Controller
{

    public function __construct(public CartService $cartService)
    {

    }

    public function index()
    {
        $cartItems = $this->cartService->getCartWithProducts();
        $cartTotal = number_format($this->cartService->getGrandTotal(), 2, '.');
        return Inertia::render('Store/Checkout/Index', compact('cartItems', 'cartTotal'));
    }

    public function store(CheckoutFormRequest $request)
    {
        $validated = $request->validated();
        CreateOrder::run($validated, $request);
        return back()->with('message', 'success');
    }
}
