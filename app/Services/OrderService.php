<?php

namespace App\Services;

use App\Enums\OrderStatusEnum;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class OrderService extends Model
{
    public function createOrder($validated)
    {
        return DB::transaction(function () use ($validated) {
            $order = Order::create($validated);
            $cart_items = []; //cart items are coming from session
            if (empty($cart_items)) {
                throw new \Exception("Order failed: Cart is empty");
            }
            $this->createOrderItems($order, $cart_items);
            return $order;

            // send order confirmation to customer and admin
        });
    }

    public function createOrderItems($order, $order_items = [])
    {
        $product = Product::findOrFail(isset($order_items[0]) ? $order_items[0]->product_id : 0);
        foreach ($order_items as $item) {
            // This will also create inventory records set to reserved via OrderItemObserver
            $order->items()->create([
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'price' => $product->price
            ]);

        }
    }

    public function orderStatusOptions(Order $order)
    {
        $order->load('timeline');
        $timelimeStatus = $order->timeline->pluck('status')->toArray();
        $enumesStatus = OrderStatusEnum::getOptions();
        return array_diff($enumesStatus, $timelimeStatus);
    }

    public function canBeDeleted(Order $order)
    {
        return !in_array($order->status->value, $this->statusCantBeDeleted());
    }

    // Status that cannot be deleted
    public function statusCantBeDeleted()
    {
        return [OrderStatusEnum::SHIPPED->value, OrderStatusEnum::PROCESSING->value];
    }

    // Status that cannot be updated. Also use to controll UI read only status
    public function readOnlyStatus(Order $order)
    {
        return in_array($order->status->value, [OrderStatusEnum::CANCELLED->value, OrderStatusEnum::SHIPPED->value]);
    }

    public function paginatedOrdersQuery(Request $request)
    {
        return DB::table('orders')
            ->select(
                'orders.*',
                DB::raw("(customers.firstname || ' ' || customers.lastname) as fullname"),
                DB::raw('ROW_NUMBER() OVER (PARTITION BY status ORDER BY orders.created_at DESC) as status_rank'),
                DB::raw("CASE status
                    WHEN 'placed' THEN 1
                    WHEN 'processing' THEN 2
                    WHEN 'shipped' THEN 3
                ELSE 4
            END as status_order"),
            )
            ->join('customers', 'customers.id', '=', 'orders.customer_id')
            ->whereAny([
                'orders.order_number',
                'orders.status',
                'orders.notes',
                DB::raw("(customers.firstname || ' ' || customers.lastname)"),
                DB::raw("strftime('%m/%d/%Y', orders.created_at)"),
            ], 'like', '%' . $request->query('query') . '%')
            ->orderBy('status_order', 'asc')
            ->paginate(10)->withQueryString();
    }

}
