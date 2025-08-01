<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactFormRequest;
use App\Notifications\ContactFormNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;
use function Illuminate\Support\defer;

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

        return redirect()->back()->with('success', 'Your message has been sent.');
    }
}
