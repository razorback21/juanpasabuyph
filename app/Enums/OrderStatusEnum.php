<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case PLACED = 'placed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case CANCELLED = 'cancelled';
}
