<?php

namespace App\Enums;

enum MovementTypeEnum : string
{
    case RESERVED = 'reserved';
    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound';
    case RETURNED = 'returned';
    case ADJUSTMENT = 'adjustment';
}
