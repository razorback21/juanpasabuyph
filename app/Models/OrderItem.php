<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'quantity',
        'price',
        'net_price',
        'uom',
        'order_id',
        'product_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'price' => 'decimal:2',
        'net_price' => 'decimal:2',
    ];

    /**
     * Get the order that owns the order item.
     */
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the product that owns the order item.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the reservations for the order item.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(OrderItemReservation::class);
    }

    /**
     * Calculate the total price for this order item
     */
    public function getTotalPrice(): float
    {
        return $this->price * $this->quantity;
    }

    /**
     * Check if the order item has sufficient inventory
     */
    public function hasSufficientInventory(): bool
    {
        if (!$this->product) {
            return false;
        }

        return $this->product->getCurrentStock() >= $this->quantity;
    }
}
