<?php

namespace App\Services;

use Buglinjo\LaravelWebp\Facades\Webp;

class ConventToWebp
{
    public function convert($file, $storage_folder = "", $quality = 70)
    {
        $path = "{$storage_folder}/" . pathinfo($file->hashName(), PATHINFO_FILENAME) . ".webp";
        $fileName = public_path("/storage/".$path);
        if (Webp::make($file)->save($fileName, $quality)) {
            return "{$path}";
        } else {
            throw new \Exception("Failed to upload image");
        }
    }
}
