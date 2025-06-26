<?php

namespace App\Models;

use App\Enums\MovementTypeEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        'description',
        'price',
        'product_category_id',
        'featured_image,',
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
    protected $appends = ['product_category'];

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


    protected static function boot()
    {
        parent::boot();
    }

    /**
     * Get the current stock quantity
     */
    public function getCurrentStock(): int
    {
        return $this->inventory()
            ->selectRaw('SUM(CASE 
                WHEN movement_type IN (?, ?) THEN quantity 
                WHEN movement_type IN (?, ?, ?) THEN -quantity 
                ELSE 0 
            END) as stock', [
                // Plus
                MovementTypeEnum::INBOUND,
                MovementTypeEnum::RETURNED,
                // Minus
                MovementTypeEnum::OUTBOUND,
                MovementTypeEnum::ADJUSTMENT,
                MovementTypeEnum::RESERVED
            ])
            ->value('stock') ?? 0;
    }

    // Add this method to the Product model
    public function productCategory(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->category ? ucwords($this->category->name) : null,
        );
    }
}
