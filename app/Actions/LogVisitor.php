<?php

namespace App\Actions;

use App\Models\Visitor;
use Jenssegers\Agent\Agent;
use Lorisleiva\Actions\Concerns\AsAction;

class LogVisitor
{
    use AsAction;

    public function handle()
    {
        $date = date('Y-m-d');
        $visitor = Visitor::firstOrNew(['date' => $date]);

        $agent = new Agent();

        if ($agent->isDesktop()) {
            $visitor->desktop++;
        } else if ($agent->isMobile()) {
            $visitor->mobile++;
        }

        $agentAllowed = false;
        if ($agent->isDesktop() || $agent->isMobile()) {
            $agentAllowed = true;
        }

        if ($agentAllowed) {
            if (!session()->has('visitor_date')) {
                $visitor->save();
                session()->put('visitor_date', $date);
                session()->save(); // Force save the session immediately
            }
        }
    }
}
