<?php

namespace App\Http\Requests;

use App\Actions\IsSameURLPath;
use Illuminate\Foundation\Http\FormRequest;

class ThankYouRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(string $previousURL = null): bool
    {
        if ($previousURL === null || !IsSameURLPath::run($previousURL)) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }
}
