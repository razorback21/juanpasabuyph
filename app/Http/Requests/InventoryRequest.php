<?php

namespace App\Http\Requests;

use App\Enums\MovementTypeEnum;
use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "movement_type" => "required|in:" . MovementTypeEnum::getPipeOptions(),
            "uom" => "required|string",
            "quantity" => "required|numeric",
            "notes" => "nullable|string",
            "product_id" => "required|exists:products,id",
        ];
    }
}
