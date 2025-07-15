<?php

namespace App\Listeners;

use App\Events\EventOrderCreatedAdmin;
use App\Models\User;
use App\Notifications\OrderCreatedAdminNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class OrderCreatedAdmin
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(EventOrderCreatedAdmin $event): bool
    {
        $adminUser = User::where('email', config('app.admin_email'))->first();
        if ($adminUser) {
            $adminUser->notify(new OrderCreatedAdminNotification($event->order));
        }
        return false;
    }
}
