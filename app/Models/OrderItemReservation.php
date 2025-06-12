<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderItemReservation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'inventory_id',
        'order_item_id',
    ];

    /**
     * Get the inventory that owns the reservation.
     */
    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class);
    }

    /**
     * Get the order item that owns the reservation.
     */
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }

    /**
     * Get the product through the order item
     */
    public function product()
    {
        return $this->orderItem->product();
    }

    /**
     * Get the order through the order item
     */
    public function order()
    {
        return $this->orderItem->order();
    }

    /**
     * Release the reservation (delete it)
     */
    public function release(): bool
    {
        return $this->delete();
    }

    /**
     * Scope a query to only include reservations for a specific product.
     */
    public function scopeForProduct($query, int $productId)
     {
         return $query->whereHas('orderItem', function ($query) use ($productId) {
             $query->where('product_id', $productId);
         });
     }

    /**
     * Scope a query to only include reservations for active orders.
     */
    public function scopeForActiveOrders($query)
    {
        return $query->whereHas('orderItem.order', function ($query) {
            $query->whereIn('status', [
                OrderStatusEnum::PLACED,
                OrderStatusEnum::PROCESSING
            ]);
        });
    }
}
