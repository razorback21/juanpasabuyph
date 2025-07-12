<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case PLACED = 'placed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case CANCELLED = 'cancelled';

    public static function getCSVStatus(): string
    {
        return implode(',', array_column(self::cases(), 'value'));
    }

}
