<?php

namespace App\Enums;

enum MovementTypeEnum: string
{
    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound'; // Use this for sales/shipped items
    case RETURNED = 'returned';
    case DAMAGE = 'damage';
    case ADJUSTMENT_UP = 'adjustment_up';
    case ADJUSTMENT_DOWN = 'adjustment_down';

    public static function getOptions(): array
    {
        return [
            self::INBOUND->value => '[ + ] Inbound',
            self::RETURNED->value => '[ + ] Returned',
            self::ADJUSTMENT_UP->value => '[ + ] Adjustment Up',
            self::ADJUSTMENT_DOWN->value => '[ - ] Adjustment Down',
            self::OUTBOUND->value => '[ - ] Outbound',
            self::DAMAGE->value => '[ - ] Damage',
        ];
    }

    public static function getCSVOptions(): string
    {
        return implode(',', array_keys(self::getOptions()));
    }
}
