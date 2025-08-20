<?php

namespace App\Services;

use App\Models\Visitor;

class VisitorService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getVisitorsByNumMonths($numMonths)
    {
        $subDays = [
            1 => 30,
            2 => 60,
            3 => 90
        ];
        $days = $subDays[$numMonths] ?? 1;
        return Visitor::where('created_at', '>=', now()->subDays($days))->get();
    }
}
