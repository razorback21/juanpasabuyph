<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'phone',
        'address',
    ];

    /**
     * Get the customer's full name.
     */
    public function fullName(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => "{$attributes['firstname']} {$attributes['lastname']}"
        );
    }

    /**
     * Get the orders for the customer.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the total amount spent by the customer
     */
    public function getTotalSpent(): float
    {
        return $this->orders()
            ->where('status', '!=', OrderStatusEnum::CANCELLED)
            ->get()
            ->sum(function ($order) {
                return $order->getTotalAmount();
            });
    }

    /**
     * Get the last order of the customer
     */
    public function getLastOrder(): ?Order
    {
        return $this->orders()->latest()->first();
    }

    /**
     * Get the count of completed orders
     */
    public function getCompletedOrdersCount(): int
    {
        return $this->orders()
            ->where('status', OrderStatusEnum::SHIPPED)
            ->count();
    }

    /**
     * Scope a query to only include customers with orders.
     */
    public function scopeHasOrders($query)
    {
        return $query->whereHas('orders');
    }

    /**
     * Scope a query to only include customers with active orders.
     */
    public function scopeWithActiveOrders($query)
    {
        return $query->whereHas('orders', function ($query) {
            $query->whereIn('status', [
                OrderStatusEnum::PLACED,
                OrderStatusEnum::PROCESSING
            ]);
        });
    }
}
