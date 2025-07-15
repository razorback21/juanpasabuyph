<?php

namespace App\Providers;

use App\Events\EventOrderCreatedAdmin;
use App\Events\EventOrderCreatedCustomer;
use App\Events\OrderCreated;
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
        Event::listen(
            EventOrderCreatedCustomer::class,
            [OrderCreatedCustomer::class, 'handle']
        );

        Event::listen(
            EventOrderCreatedAdmin::class,
            [OrderCreatedAdmin::class, 'handle']
        );
    }
}
