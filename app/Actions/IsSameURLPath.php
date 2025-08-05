<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class IsSameURLPath
{
    use AsAction;

    public function handle(string $routeName)
    {
        try {
            $routeUrl = route($routeName);
        } catch (\Exception $e) {
            abort(404, 'Route not found');
        }

        $routePath = parse_url($routeUrl, PHP_URL_PATH);

        if ($routePath === false || $routePath === null) {
            abort(500, 'Invalid route URL');
        }

        $previousPath = url()->previousPath();

        if ($previousPath !== $routePath) {
            abort(403);
        }

        return true;
    }
}
