<?php

namespace App\Providers;

use App\Events\EventOrderCreatedAdmin;
use App\Events\EventOrderCreatedCustomer;
use App\Listeners\OrderCreatedAdmin;
use App\Listeners\OrderCreatedCustomer;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class EventServiceProvider extends ServiceProvider
{



    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Events in laravel 12 are auto discovered in the app/Events folder
        // Do not register it here it will trigger twice
    }
}
