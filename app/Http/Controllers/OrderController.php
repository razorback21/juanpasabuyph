<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = Order::select('*')
            ->selectRaw('ROW_NUMBER() OVER (PARTITION BY status ORDER BY created_at DESC) as status_rank')
            ->with('customer')
            ->latest()
            ->paginate(10);
        return Inertia::render("Order/Index", compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'customer']);
        $orderService = new OrderService();
        $statusOptions = $orderService->orderStatusOptions($order);
        $statusCantBeDeleted = $orderService->statusCantBeDeleted();
        $readOnlyStatus = $orderService->readOnlyStatus($order);
        return Inertia::render('Order/Show', compact('order', 'statusOptions', 'statusCantBeDeleted', 'readOnlyStatus'));
    }

    public function destroy(Order $order)
    {
        if (!(new OrderService())->canBeDeleted($order)) {
            return redirect()->route('orders.show', $order)->with('message', 'Order cannot be deleted');
        }

        $order->delete();
        return redirect()->route('orders.index')->with('success', 'Order deleted successfully');
    }

}
