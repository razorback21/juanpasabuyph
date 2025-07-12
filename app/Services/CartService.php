<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartService
{
    private const CART_SESSION_KEY = 'cart';

    public function getCart(): array
    {
        return Session::get(self::CART_SESSION_KEY, []);
    }

    public function addItem(int $productId, int $quantity = 1): void
    {
        $cart = $this->getCart();

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $cart[$productId] = [
                'product_id' => $productId,
                'quantity' => $quantity,
            ];
        }

        Session::put(self::CART_SESSION_KEY, $cart);
    }

    public function updateQuantity(int $productId, int $quantity): void
    {
        $cart = $this->getCart();

        if ($quantity <= 0) {
            unset($cart[$productId]);
        } else {
            $cart[$productId]['quantity'] = $quantity;
        }

        Session::put(self::CART_SESSION_KEY, $cart);
    }

    public function removeItem(int $productId): void
    {
        $cart = $this->getCart();
        unset($cart[$productId]);
        Session::put(self::CART_SESSION_KEY, $cart);
    }

    public function clear(): void
    {
        Session::forget(self::CART_SESSION_KEY);
    }

    public function getCartWithProducts(): array
    {
        $cart = $this->getCart();
        $productIds = array_keys($cart);

        if (empty($productIds)) {
            return [];
        }

        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        return collect($cart)->map(function ($item) use ($products) {
            $product = $products[$item['product_id']] ?? null;

            return [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'product' => $product,
                'subtotal' => $product ? $product->price * $item['quantity'] : 0,
            ];
        })->values()->toArray();
    }

    public function getTotalItems(): int
    {
        return collect($this->getCart())->sum('quantity');
    }

    public function getSubtotal(): float
    {
        $cartItems = $this->getCartWithProducts();
        return collect($cartItems)->sum('subtotal');
    }

    public function isEmpty(): bool
    {
        return empty($this->getCart());
    }
}