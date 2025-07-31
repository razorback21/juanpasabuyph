<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteMapController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $sitemapPath = public_path('sitemap.xml');

        if (!file_exists($sitemapPath)) {
            abort(404, 'Sitemap not found.');
        }

        return response()->file($sitemapPath, [
            'Content-Type' => 'application/xml'
        ]);
    }
}
