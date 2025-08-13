<?php

namespace App\Actions\Order;

use App\Enums\OrderStatusEnum;
use App\Enums\StockReservationStatusEnum;
use App\Enums\StockReservationTypeEnum;
use App\Events\EventOrderCreatedCustomer;
use App\Models\Customer;
use App\Models\Order;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Context;
use Illuminate\Support\Facades\DB;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateOrder
{
    use AsAction;

    public function __construct(
        protected CartService $cartService,
    ) {
    }

    public function handle(array $validated, Request $request)
    {
        return DB::transaction(function () use ($validated, $request) {
            // 0. remove captcha from validated data
            unset($validated['captcha']);
            // 1. create customer
            $customer = Customer::create($validated);
            // 2. create order
            $order = Order::make([
                'customer_id' => $customer->id,
                'status' => OrderStatusEnum::PLACED->value,
                'notes' => $request->input('notes', '') ? strip_tags($request->input('notes')) : null,
            ]);
            $order->save();
            // 3. create order items
            $cartItems = $this->cartService->getCartWithProducts();
            foreach ($cartItems as $cartItem) {
                $order->items()->create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem['product_id'],
                    'quantity' => $cartItem['quantity'],
                    'cost_price' => $cartItem['product']['cost_price'],
                    'price' => $cartItem['product']['price'],
                    'uom' => $cartItem['product']['sale_uom'],
                ]);
            }

            // reserve stock
            $order->items()->each(function ($orderItem) use ($order) {
                $orderItem->product->stockReservations()->create([
                    'order_id' => $order->id,
                    'product_id' => $orderItem->product_id,
                    'quantity' => $orderItem->quantity,
                    'reservation_status' => StockReservationStatusEnum::CONFIRMED->value,
                    'reservation_type' => StockReservationTypeEnum::ORDER->value,
                    'uom' => $orderItem->uom,
                    'notes' => 'Reservation for order #' . $order->order_number,
                ]);
            });

            // 4. store order id to context
            Context::add('order_id', $order->id);

            event(new EventOrderCreatedCustomer($order));
            return $order;
        });
    }
}
