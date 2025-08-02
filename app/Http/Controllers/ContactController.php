<?php

namespace App\Http\Controllers;

use App\Actions\IsSameURLPath;
use App\Http\Requests\ContactFormRequest;
use App\Http\Requests\ThankYouRequest;
use App\Notifications\ContactFormNotification;
use function Illuminate\Support\defer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Store/Contact/Index');
    }

    public function store(ContactFormRequest $request)
    {
        $validated = $request->validated();
        defer(function () use ($validated) {
            Notification::route('mail', config('app.admin_email'))->notify(new ContactFormNotification($validated));
        });

        return to_route('contact.thank-you')->with('success', 'Your message has been sent.');
    }

    public function thankYou(ThankYouRequest $request)
    {
        $request->authorize('contact.index');
        return Inertia::render('Store/Contact/ThankYou');
    }
}
