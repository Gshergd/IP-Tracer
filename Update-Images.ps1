$galleryPath = Join-Path $PSScriptRoot 'assets/gallery'
$manifestPath = Join-Path $PSScriptRoot 'gallery-manifest.js'
$images = @(Get-ChildItem -LiteralPath $galleryPath -File | Where-Object { $_.Extension -match '^\.(png|jpe?g|webp|gif|avif)$' } | Sort-Object Name | ForEach-Object { 'assets/gallery/' + [Uri]::EscapeDataString($_.Name) })
$manifest = 'window.TF141_GALLERY=' + (ConvertTo-Json -InputObject $images -Compress) + ';'
[IO.File]::WriteAllText($manifestPath, $manifest, [Text.UTF8Encoding]::new($false))
Write-Host "Image preset updated: $($images.Count) images. Reload the terminal."

