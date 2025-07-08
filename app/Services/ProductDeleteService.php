<?php

namespace App\Services;

use App\Models\Product;
use App\Exceptions\CannotDeleteProductException;


class ProductDeleteService
{
    public function canDelete(Product $product): bool
    {
        if ($product->inventory()->count() > 0) {
            throw new CannotDeleteProductException("Cannot delete product with existing inventory record.",403);
        }

        if ($product->orderItems()->count() > 0) {
            throw new CannotDeleteProductException("Cannot delete product with existing order items.", 403);
        }

        return true;
    }
}
