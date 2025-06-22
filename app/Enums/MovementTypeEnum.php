<?php

namespace App\Enums;

enum MovementTypeEnum : string
{
    case RESERVED = 'reserved';
    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound'; // Use this for sales/shipped items
    case RETURNED = 'returned';
    case ADJUSTMENT = 'adjustment';
}
