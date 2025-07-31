<?php

namespace App\Traits\Enum;

trait HasEnumOptions
{
    public static function getOptions(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [
                $case->value => strtoupper($case->value)
            ])
            ->toArray();
    }

    public static function getCSVOptions(): string
    {
        return implode(',', array_keys(self::getOptions()));
    }
}
