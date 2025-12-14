<?php
// Simple directory listing endpoint for the `downloads/` folder.
// Returns JSON array of files (name, size, mtime). Designed for local testing on XAMPP.

$dir = __DIR__; // this file is placed inside downloads/
$files = [];
if (is_dir($dir)) {
    $handle = opendir($dir);
    if ($handle) {
        while (($entry = readdir($handle)) !== false) {
            if ($entry === '.' || $entry === '..') continue;
            // skip this script
            if ($entry === basename(__FILE__)) continue;

            $path = $dir . DIRECTORY_SEPARATOR . $entry;
            if (is_file($path)) {
                // Only include safe file types (txt, pdf, docx, md, csv)
                $ext = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
                $allowed = ['txt','pdf','docx','md','csv','json'];
                if (!in_array($ext, $allowed)) continue;

                $files[] = [
                    'name' => $entry,
                    'size' => filesize($path),
                    'mtime' => filemtime($path)
                ];
            }
        }
        closedir($handle);
    }
}

// Sort by mtime descending
usort($files, function($a,$b){return $b['mtime'] - $a['mtime'];});

header('Content-Type: application/json; charset=utf-8');
echo json_encode($files);
