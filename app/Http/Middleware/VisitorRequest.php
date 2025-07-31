<?php

namespace App\Http\Middleware;

use App\Actions\LogVisitor;
use Closure;
use Illuminate\Http\Request;
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
    // we can moved this into a service class
    public function terminate(Request $request, Response $response)
    {
        LogVisitor::run();
    }
}
