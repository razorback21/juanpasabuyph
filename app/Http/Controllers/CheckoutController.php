<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Requests\CheckoutFormRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\Request;
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
        // 1. create customer
        $customer = Customer::create($validated);
        // 2. create order
        $order = Order::make([
            'customer_id' => $customer->id,
            'status' => OrderStatusEnum::PLACED->value,
            'notes' => $request->input('notes', '') ? strip_tags($request->input('notes')) : null,
        ]);
        $order->save();

        return redirect(201)->back()->with('message', 'success');
    }
}
