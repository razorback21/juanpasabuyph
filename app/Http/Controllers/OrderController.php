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
        $orders = DB::table('orders')
            ->select('orders.*')
            ->selectRaw('ROW_NUMBER() OVER (PARTITION BY status ORDER BY orders.created_at DESC) as status_rank')
            ->selectRaw("CASE status
                WHEN 'placed' THEN 1
                WHEN 'processing' THEN 2
                WHEN 'shipped' THEN 3
                ELSE 4
            END as status_order")
            ->join('customers', 'customers.id', '=', 'orders.customer_id')

            ->whereAny([
                'orders.order_number',
                'orders.status',
                'orders.notes',
                DB::raw("(customers.firstname || ' ' || customers.lastname)"),
            ], 'like', '%' . $request->query('query') . '%')
            ->orderBy('status_order', 'asc')
            ->paginate(10);

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

}
