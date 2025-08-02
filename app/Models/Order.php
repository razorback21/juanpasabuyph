<?php

namespace App\Models;

use App\Enums\OrderStatusEnum;
use App\Models\OrderStatusTimeline;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'status' => OrderStatusEnum::class,
    ];

    protected $appends = [
        'total'
    ];

    /**
     * Get the customer that owns the order.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Get the items for the order.
     */
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function timeline(): HasMany
    {
        return $this->hasMany(OrderStatusTimeline::class);
    }

    /**
     * Get all Stock Order reservations records
     */
    public function stockReservations(): HasMany
    {
        return $this->hasMany(StockReservation::class);
    }

    /**
     * Scope a query to only include orders with specific status.
     */
    public function scopeWithStatus($query, OrderStatusEnum $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Check if order can be cancelled
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->status, [OrderStatusEnum::PLACED, OrderStatusEnum::PROCESSING]);
    }

    /**
     * Cancel the order
     */
    public function cancel(): bool
    {
        if (!$this->canBeCancelled()) {
            return false;
        }

        $this->status = OrderStatusEnum::CANCELLED;
        return $this->save();
    }

    public function total(): float
    {   // TODO: this query is slow since its calculating based on items in the memory using collection
        return $this->items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
    }

    public function getTotalAttribute()
    {
        return $this->total();
    }
}
