<?php

namespace App\Http\Controllers\Pages;

use App\Actions\HeroImage;
use App\Http\Controllers\Controller;
use App\Models\Pages\PageAsset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeAssetController extends Controller
{

    public function index()
    {
        $heroImage = HeroImage::run('home');
        return Inertia::render("PageContent/HomePage", compact('heroImage'));
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        DB::transaction(function () use ($request) {
            $asset = PageAsset::firstorNew([
                'code' => $request->code,
                'section' => $request->section,
            ]);

            $asset->save();

            $collectionCode = $request->code . '_' . $request->section;
            $asset->clearMediaCollection($collectionCode);
            $asset->addMediaFromRequest('image')->toMediaCollection($collectionCode);
        });
    }

    public function update(Request $request)
    {

    }
}
