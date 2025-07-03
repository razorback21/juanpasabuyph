<?php

namespace App\Service;

use App\Models\Product;
use App\Exceptions\CannotDeleteProductException;


class ProductDeleteService
{
    public function canDelete(Product $product): bool
    {
        if ($product->inventory()->count() > 0) {
            throw new CannotDeleteProductException("Cannot delete product with existing inventory.");
        }

        if ($product->orderItems()->count() > 0) {
            throw new CannotDeleteProductException("Cannot delete product with existing order items.");
        }

        return true;
    }
}
