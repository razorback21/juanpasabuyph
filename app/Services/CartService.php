<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartService
{
    private $cartWithtotalsResult = [];
    private $cartSessionKey;
    public function __construct()
    {
        $this->cartSessionKey = config('constants.CART_SESSION_KEY');
    }

    public function getCart(): array
    {
        return Session::get($this->cartSessionKey, []);
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

        Session::put($this->cartSessionKey, $cart);
    }

    public function updateQuantity(int $productId, int $quantity): void
    {
        $cart = $this->getCart();

        if ($quantity <= 0) {
            unset($cart[$productId]);
        } else {
            $cart[$productId]['quantity'] = $quantity;
        }

        Session::put($this->cartSessionKey, $cart);
    }

    public function removeItem(int $productId): void
    {
        $cart = $this->getCart();
        unset($cart[$productId]);
        Session::put($this->cartSessionKey, $cart);
    }

    public function clear(): void
    {
        Session::forget($this->cartSessionKey);
    }

    public function getCartWithProducts(): array
    {
        $cart = $this->getCart();
        $productIds = array_keys($cart);

        if (empty($productIds)) {
            return [];
        }

        $products = Product::whereIn('id', $productIds)->get()->keyBy('id');

        $cartWithtotalsResult = collect($cart)->map(function ($item) use ($products) {
            $product = $products[$item['product_id']] ?? null;

            return [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'product' => $product,
                'subtotal' => $product ? $product->price * $item['quantity'] : 0,
            ];
        })->values()->toArray();

        $this->cartWithtotalsResult = $cartWithtotalsResult;
        return $cartWithtotalsResult;
    }

    public function getCartCount(): int
    {
        return count($this->getCart());
    }

    public function getTotalItems(): int
    {
        return collect($this->getCart())->sum('quantity');
    }

    public function getSubtotal(): float
    {
        $cartItems = count($this->cartWithtotalsResult) ? $this->cartWithtotalsResult : $this->getCartWithProducts();
        $result = collect($cartItems)->sum('subtotal');

        return floatval($result);
    }

    public function isEmpty(): bool
    {
        return empty($this->getCart());
    }

    public function getCartItem(int $productId): null|array
    {
        $cart = $this->getCart();
        return $cart[$productId] ?? null;
    }

    public function getGrandTotal(): float
    {
        $subTotal = $this->getSubtotal();
        return floatval($subTotal);
    }
}