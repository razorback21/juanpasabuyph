<?php

namespace App\Actions\Order;

use App\Models\Order;
use Illuminate\Support\Facades\Cache;
use Lorisleiva\Actions\Concerns\AsAction;

class GenerateOrderNumberAction
{
    use AsAction;

    public function handle()
    {
        return Cache::lock('order-number-generation', 10)->block(5, function () {
            do {
                $orderNumber = $this->generateOrderNumber();
            } while (Order::where('order_number', $orderNumber)->exists());

            return $orderNumber;
        });
    }


    public function generateOrderNumber(): string
    {
        // More sophisticated generation logic
        $prefix = config('app.order_prefix');
        $date = now()->format('Ymd');
        $random = strtoupper(substr(uniqid(), -6));

        return "{$prefix}-{$date}-{$random}";
    }
}