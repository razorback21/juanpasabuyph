<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class IsSameURLPath
{
    use AsAction;

    public function handle(string $routeName)
    {
        $bool = url()->previousPath() === parse_url(route($routeName), PHP_URL_PATH);
        return !$bool ? abort(403) : true;
    }
}
