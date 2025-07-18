<?php

namespace App\Http\Controllers;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Models\OrderStatusTimeline;
use Illuminate\Http\Request;
use Symfony\Component\Clock\now;

class OrderStatusTimelineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = $request->input('order');

        request()->merge([
            'status_at' => now()
        ]);

        $validated = $request->validate([
            'status' => 'required',
            'status_at' => 'required',
            'description' => 'string|nullable',
        ]);
        $order = Order::find($order['id']);
        $order->timeline()->create($validated);

        return redirect()->route('orders.show', $order)->with('success', 'Order status updated');
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderStatusTimeline $orderStatusTimeline)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderStatusTimeline $orderStatusTimeline)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderStatusTimeline $orderStatusTimeline)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderStatusTimeline $orderStatusTimeline)
    {
        //
    }
}
