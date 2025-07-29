<?php

namespace App\Enums;

enum ReservationTypeEnum: string
{
    case ORDER = 'order';
    case ADMIN_HOLD = 'admin_hold';
}
