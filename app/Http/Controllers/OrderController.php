<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::latest()->with('customer')->paginate(10);
        return Inertia::render("Order/Index", compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'customer']);
        return Inertia::render('Order/Show', compact('order'));
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Order deleted successfully');
    }

}
