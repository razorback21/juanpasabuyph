<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function track(Request $request, $order_id)
    {
        $order = Order::with('customer', 'items.product', 'timeline')
            ->whereLike('order_number', "%{$order_id}%")
            ->first();
        if (!$order) {
            return Inertia::render('Store/Track/NotFound');
        }
        return Inertia::render('Store/Track/Track', compact('order'));
    }

}
