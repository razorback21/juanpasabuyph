<?php

namespace App\Http\Controllers;

use App\Actions\IsSameURLPath;
use App\Actions\Order\CreateOrder;
use App\Http\Requests\CheckoutFormRequest;
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
        $order = CreateOrder::run($validated, $request);
        // clear cart items
        $this->cartService->clear();
        return redirect()->route('checkout.thank-you', ['order_id' => $order->id]);
    }

    public function thankYou(Request $request, $order_id)
    {
        IsSameURLPath::run('checkout');
        $order = Order::with(['items.product'])->find($order_id);
        if (!$order) {
            return abort(404, 'Order not found');
        }
        return Inertia::render('Store/Checkout/ThankYou', compact('order'));
    }
}
