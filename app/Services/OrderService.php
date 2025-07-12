<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
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
}
