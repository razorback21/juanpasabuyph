<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatusTimeline extends Model
{
    protected $fillable = [
        'status',
        'status_at',
        'description',
    ];

    protected $casts = [
        'status_at' => 'datetime',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
