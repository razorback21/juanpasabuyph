<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderStatusTimeline extends Model
{
    protected $fillable = [
        'status',
        'status_at',
    ];

    protected $casts = [
        'status_at' => 'datetime',
    ];
}
