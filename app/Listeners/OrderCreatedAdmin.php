<?php

namespace App\Listeners;

use App\Events\EventOrderCreatedCustomer;
use App\Mail\OrderCreated;
use App\Models\User;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class OrderCreatedAdmin implements ShouldHandleEventsAfterCommit
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
    public function handle(EventOrderCreatedCustomer $event)
    {
        $adminUser = User::where('email', config('app.admin_email'))->first();
        if ($adminUser) {
            Mail::to($adminUser->email)->send(new OrderCreated($event->order, $adminUser));
        }
    }
}
