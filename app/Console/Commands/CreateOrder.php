<?php

namespace App\Console\Commands;

use App\Events\EventOrderCreatedAdmin;
use App\Events\EventOrderCreatedCustomer;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;


class CreateOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-order  {--quantity1=2} {--quantity2=4}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'create order';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('create order');

        DB::transaction(function () {
            // Create customer
            $customer = Customer::create([
                'firstname' => fake()->firstName(),
                'lastname' => fake()->lastName(),
                'email' => fake()->unique()->safeEmail(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->address(),
            ]);

            // Create new order
            // Order number and status are generated during creating lifecycle
            $order = Order::create([
                'customer_id' => $customer->id,
                'notes' => fake()->sentence(),
            ]);

            // Attached order items from cart
            $cartItems = [[22, $this->option('quantity1'), 100], [23, $this->option('quantity2'), 100]];
            foreach ($cartItems as $cartItem) {
                $order->items()->create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem[0],
                    'quantity' => $cartItem[1],
                    'price' => $cartItem[2],
                    'uom' => 'pc'
                ]);
            }


            event(new EventOrderCreatedCustomer($order));
        });

    }
}
