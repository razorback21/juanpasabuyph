<?php

namespace App\Enums;

enum StockReservationTypeEnum: string
{
    case ORDER = 'order';
    case ADMIN_HOLD = 'admin_hold';
}
