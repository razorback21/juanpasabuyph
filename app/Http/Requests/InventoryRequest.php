<?php

namespace App\Http\Requests;

use App\Enums\MovementTypeEnum;
use App\Models\Product;
use App\Models\ProductStock;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class InventoryRequest extends FormRequest
{
    public function __construct(public Product $product)
    {

    }
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            "movement_type" => "required|in:" . MovementTypeEnum::getCSVOptions(),
            "uom" => "required|string",
            "quantity" => "required|numeric|min:1|max:9000",
            "notes" => "nullable|string",
            "product_id" => "required|exists:products,id",
        ];
    }

    public function isValidOutboundQuantity(): bool
    {
        $product = Product::find($this->input("product_id"));
        $movementType = $this->input('movement_type');
        $quantity = $this->input('quantity');

        if ($movementType === MovementTypeEnum::OUTBOUND->value) {
            $stock = $product->current_stock;

            return $quantity <= $stock;
        }

        return true;
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if (!$this->isValidOutboundQuantity()) {
                    $validator->errors()->add(
                        'quantity',
                        'Outbound quantity must be less than or equal to the stock quantity.'
                    );
                }
            }
        ];
    }
}
