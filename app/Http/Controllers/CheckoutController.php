<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Http\Requests\CheckouRequest;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function store(CheckouRequest $request)
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

        return redirect()->route('orders.show', $order);
    }
}
