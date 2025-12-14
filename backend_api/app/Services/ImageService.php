<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function upload(?UploadedFile $file, string $path, ?string $oldFile = null): ?string
    {
        if (!$file) {
            return $oldFile;
        }

        if ($oldFile) {
            Storage::disk('public')->delete($oldFile);
        }

        return $file->store($path, 'public');
    }
}
