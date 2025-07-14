<?php

namespace App\Console\Commands;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Testing\Fakes\Fake;

class CreateOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-order';

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

        $customer = Customer::create([
            'firstname' => fake()->firstName(),
            'lastname' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
        ]);

        // Order number and status are generated during creating lifecycle
        $order = Order::create([
            'customer_id' => $customer->id,
            'notes' => fake()->sentence(),
        ]);

        $cartItems = [[22, 4, 100], [23, 5, 100]];
        foreach ($cartItems as $cartItem) {
            $order->items()->create([
                'order_id' => $order->id,
                'product_id' => $cartItem[0],
                'quantity' => $cartItem[1],
                'price' => $cartItem[2],
                'uom' => 'pc'
            ]);
        }
    }
}
