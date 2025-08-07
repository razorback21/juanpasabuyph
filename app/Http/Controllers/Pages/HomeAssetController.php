<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeAssetController extends Controller
{
    public function create()
    {

    }

    public function store(Request $request)
    {
        $asset = PageAsset::firstorNew([
            'code' => $request->code,
            'section' => $request->section,
        ]);

        $asset->save();

        $collectionCode = $request->code . '_' . $request->section;

        $asset->addMediaFromRequest('file')->toMediaCollection($collectionCode);

    }

    public function update(Request $request)
    {

    }
}
