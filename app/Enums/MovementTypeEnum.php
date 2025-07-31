<?php

namespace App\Enums;

use App\Traits\Enum\HasEnumOptions;

enum MovementTypeEnum: string
{

    use HasEnumOptions;

    case INBOUND = 'inbound';
    case OUTBOUND = 'outbound'; // Use this for sales/shipped items
    case RETURNED = 'returned';
    case DAMAGE = 'damage';
    case ADJUSTMENT_UP = 'adjustment_up';
    case ADJUSTMENT_DOWN = 'adjustment_down';

    public static function getOptions(): array
    {
        $up = ['inbound', 'adjustment_up', 'returned'];
        $options = [];

        foreach (self::cases() as $case) {
            if (in_array($case->value, $up)) {
                $label = ucwords(str_replace('_', ' ', $case->value));
                $options[$case->value] = "[ + ] $label";
            }
        }

        foreach (self::cases() as $case) {
            if (!in_array($case->value, $up)) {
                $label = ucwords(str_replace('_', ' ', $case->value));
                $options[$case->value] = "[ - ] $label";
            }
        }

        return $options;
    }
}
