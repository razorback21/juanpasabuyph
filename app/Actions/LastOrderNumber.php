<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class LastOrderNumber
{
    use AsAction;

    public function handle($order_number)
    {
        if (empty($order_number)) {
            return null;
        }
        $parts = explode('-', $order_number);

        if (count($parts) == 1) {
            return $order_number;
        }

        return array_pop($parts);
    }
}
