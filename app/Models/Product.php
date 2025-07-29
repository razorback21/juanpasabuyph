<?php

namespace App\Models;

use App\Enums\MovementTypeEnum;
use App\Enums\StockReservationStatusEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'product_category_id',
        'featured_image',
        'is_featured',
        'socialmedia_image',
        'disabled',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
    ];

    // append mutated attribute to arraay or json response
    protected $appends = [
        'product_category',
        'featured_image_url',
        'available_stock',
        'current_stock',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    /**
     * Get the inventory records for the product.
     */
    public function inventory(): HasMany
    {
        return $this->hasMany(Inventory::class);
    }

    /**
     * Get the order items for the product.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function stockReservations(): HasMany
    {
        return $this->hasMany(StockReservation::class);
    }

    public function getCurrentStockAttribute()
    {
        $stock = $this->inventory()
            ->selectRaw('SUM(CASE 
                WHEN movement_type IN (?, ?, ?) THEN quantity 
                WHEN movement_type IN (?, ?, ?) THEN -quantity 
                ELSE 0 
            END) as stock', [
                    // Plus
                MovementTypeEnum::INBOUND,
                MovementTypeEnum::RETURNED,
                MovementTypeEnum::ADJUSTMENT_UP,
                    // Minus
                MovementTypeEnum::OUTBOUND,
                MovementTypeEnum::DAMAGE,
                MovementTypeEnum::ADJUSTMENT_DOWN
            ])
            ->value('stock');

        return $stock > 0 ? $stock : 0;
    }

    /**
     * Get inventory available stock
     */
    public function getAvailableStockAttribute(): int
    {
        // available stock is current stock minus reserved stock
        return $this->current_stock - $this->stockReservations()->whereIn('reservation_status', [
            StockReservationStatusEnum::CONFIRMED->value,
            StockReservationStatusEnum::RELEASED->value
        ])->sum('quantity');
    }

    // Add this method to the Product model
    public function productCategory(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->category ? ucwords($this->category->name) : null,
        );
    }

    public function getFeaturedImageUrlAttribute()
    {
        return str_contains($this->featured_image, 'picsum.photos') ? $this->featured_image : Storage::disk('public')->url($this->featured_image);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Retrieve the model for a bound value.
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('slug', $value)->firstOrFail();
    }

    public function scopeFeaturedProduct($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeBestSeller($query)
    {
        return $query->withCount('orderItems')
            ->orderBy('order_items_count', 'desc');
    }

}
