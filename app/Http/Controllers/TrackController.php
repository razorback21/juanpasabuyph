<?php

namespace App\Http\Controllers;

use App\Actions\LastOrderNumber;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function track(Request $request, $order_id)
    {
        $orderNumber = LastOrderNumber::run($order_id);
        $order = Order::with('customer', 'items.product', 'timeline')
            ->whereLike('order_number', "ORD-________-{$orderNumber}")
            ->first();

        if (!$order) {
            return Inertia::render('Store/Track/NotFound');
        }

        return Inertia::render('Store/Track/Track', compact('order'));
    }


}
