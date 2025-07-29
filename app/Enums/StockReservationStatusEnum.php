<?php

namespace App\Enums;

enum StockReservationStatusEnum: string
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case CANCELLED = 'cancelled';
    case RELEASED = 'released';
    case EXPIRED = 'expired';

}
