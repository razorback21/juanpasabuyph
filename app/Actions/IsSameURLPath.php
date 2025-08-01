<?php

namespace App\Actions;

use Lorisleiva\Actions\Concerns\AsAction;

class IsSameURLPath
{
    use AsAction;

    public function handle($route)
    {
        return url()->previousPath() === parse_url(route($route), PHP_URL_PATH);
    }
}
