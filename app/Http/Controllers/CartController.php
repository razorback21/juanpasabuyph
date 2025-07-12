<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        // Save order to session ['id' =>1, 'quantity' => 10]
        $order = $request->session()->get('order', []);
        $order[$request->input('id')] = $request->input('quantity');
        $request->session()->put('order', $order);

        return redirect()->route('cart.checkout')->with('message', 'Item added to cart');
    }

    public function update(Request $request, $id)
    {
        $order = $request->session()->get('order', []);
        $order[$id] = $request->input('quantity');
        $request->session()->put('order', $order);

        return redirect()->route('cart.checkout');
    }

    public function destroy(Request $request, $id)
    {
        $order = $request->session()->get('order', []);
        unset($order[$id]);
        $request->session()->put('order', $order);

        return redirect()->route('cart.checkout')->with('message', 'Item removed from cart');
    }
}
