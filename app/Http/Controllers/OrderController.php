<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::latest()->paginate(10);
        return Inertia::render("Order/Index", [
            'orders' => $orders,
        ]);
    }

    public function store(OrderRequest $request)
    {
        $validated = $request->validated();

        $order = Order::create($validated);

        return redirect()->route('orders.show', $order);
    }
}
