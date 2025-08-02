<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class OrderController extends Controller
{

    public function __construct(public OrderService $orderService)
    {
    }

    public function index(Request $request)
    {
        $orders = $this->orderService->paginatedOrdersQuery($request);

        return Inertia::render("Order/Index", compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load(['items.product', 'customer']);
        $orderService = $this->orderService;
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

    public function updateEstimatedDeliveryDate(Request $request, Order $order)
    {
        $validated = $request->validate([
            'date' => 'required',
        ]);

        $order->update([
            'estimated_delivery_date' => $validated['date'],
        ]);

        return back()->with('success', 'Estimated delivery date updated successfully');
    }

}
