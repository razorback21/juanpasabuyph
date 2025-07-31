<?php

namespace App\Enums;

use App\Traits\Enum\HasEnumOptions;

enum ProductUOMEnum: string
{
    use HasEnumOptions;

    case PC = 'pc';
    case SET = 'set';
    case BOX = 'box';
    case BAG = 'bag';
    case SHEET = 'sheet';
}
