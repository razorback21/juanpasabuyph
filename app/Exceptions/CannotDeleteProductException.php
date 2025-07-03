<?php

namespace App\Exceptions;

class CannotDeleteProductException extends \Exception
{
    public function __construct(string $message = "", int $code = 0)
    {   
        parent::__construct($message, $code);
        $this->message = $message;
        $this->code = $code;
    }
}
