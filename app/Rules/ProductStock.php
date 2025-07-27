<?php

namespace App\Rules;

use App\Models\Product;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ProductStock implements ValidationRule
{
    protected Product $product;

    public function __construct(protected int $product_id)
    {
        $this->product = Product::find($this->product_id);
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // check if product is out of stock and return false
        if ($this->product->current_stock == 0) {
            $fail('Product is out of stock.');
            return;
        }

        // check if entered quantity is more than available stock and return false
        if ($value > $this->product->current_stock) {
            $fail('Entered quantity is more than available stock.');
            return;
        }
    }
}
