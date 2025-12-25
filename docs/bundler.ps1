$baseDir = "C:\Users\SrRomer0\.gemini\antigravity\scratch\carta_navidad_amor"

function Get-Base64Image {
    param (
        [string]$path
    )
    $bytes = [IO.File]::ReadAllBytes($path)
    return [Convert]::ToBase64String($bytes)
}

$indexHtml = Get-Content -Path "$baseDir\index.html" -Raw -Encoding UTF8
$styleCss = Get-Content -Path "$baseDir\style.css" -Raw -Encoding UTF8
$scriptJs = Get-Content -Path "$baseDir\script.js" -Raw -Encoding UTF8

# Define images and their mime types
$images = @{
    "assets/tree.png" = "image/png"
    "assets/snowman.png" = "image/png"
    "assets/fondo.jpg" = "image/jpeg"
}

# Embed images
foreach ($img in $images.GetEnumerator()) {
    $path = $img.Key
    $mime = $img.Value
    $fullPath = Join-Path $baseDir $path
    
    if (Test-Path $fullPath) {
        $b64 = Get-Base64Image $fullPath
        $dataUri = "data:$mime;base64,$b64"
        
        # Replace in HTML
        $indexHtml = $indexHtml.Replace($path, $dataUri)
        
        # Replace in CSS
        $styleCss = $styleCss.Replace($path, $dataUri)
        
        Write-Host "Embedded $path"
    } else {
        Write-Warning "Could not find $path"
    }
}

# Inject CSS
$indexHtml = $indexHtml.Replace('<link rel="stylesheet" href="style.css">', "<style>$styleCss</style>")

# Inject JS
$indexHtml = $indexHtml.Replace('<script src="script.js"></script>', "<script>$scriptJs</script>")

# Write output
$outputPath = "$baseDir\carta_para_enviar.html"
$indexHtml | Set-Content -Path $outputPath -Encoding UTF8

Write-Host "Successfully created $outputPath"
