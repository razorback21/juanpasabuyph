<?php

namespace App\Enums;

enum MovementTypeEnum: string
{
    case RESERVED = 'reserved';
    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound'; // Use this for sales/shipped items
    case RETURNED = 'returned';
    case ADJUSTMENT = 'adjustment';

    public static function getOptions(): array
    {
        return [
            self::INBOUND->value => '[ + ] Inbound',
            self::RETURNED->value => '[ + ] Returned',
            self::RESERVED->value => '[ - ] Reserved',
            self::OUTBOUND->value => '[ - ] Outbound',
            //self::ADJUSTMENT->value => '[ - ] Adjustment',
        ];
    }

    public static function getCSVOptions() : string {
        return implode(',', array_keys(self::getOptions()));
    }
}
