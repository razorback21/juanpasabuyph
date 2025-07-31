<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;

class VisitorRequest
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }

    // run only after the response is sent
    public function terminate(Request $request, Response $response)
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
