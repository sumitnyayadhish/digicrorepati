# Generates public/og.png (1200x630 social preview) and PWA icons using .NET System.Drawing (Windows). ASCII-only file (PowerShell 5.1).
# Run: powershell -ExecutionPolicy Bypass -File scripts/make-images.ps1
Add-Type -AssemblyName System.Drawing
$pub = Join-Path $PSScriptRoot "..\public"

function New-GoldBrush([float]$y0, [float]$y1) {
  $b = New-Object System.Drawing.Drawing2D.LinearGradientBrush ([System.Drawing.PointF]::new(0, $y0)), ([System.Drawing.PointF]::new(0, $y1)), ([System.Drawing.Color]::FromArgb(255, 255, 246, 201)), ([System.Drawing.Color]::FromArgb(255, 179, 119, 0))
  $blend = New-Object System.Drawing.Drawing2D.ColorBlend 3
  $blend.Colors = @([System.Drawing.Color]::FromArgb(255, 255, 246, 201), [System.Drawing.Color]::FromArgb(255, 245, 197, 66), [System.Drawing.Color]::FromArgb(255, 179, 119, 0))
  $blend.Positions = @(0.0, 0.55, 1.0)
  $b.InterpolationColors = $blend
  return $b
}

function Draw-Stage($g, [int]$w, [int]$h) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddEllipse(-[int]($w * 0.3), -[int]($h * 0.6), [int]($w * 1.6), [int]($h * 1.9))
  $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush $path
  $pgb.CenterColor = [System.Drawing.Color]::FromArgb(255, 42, 31, 168)
  $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(255, 2, 4, 26))
  $pgb.CenterPoint = [System.Drawing.PointF]::new($w / 2, $h * 0.2)
  $g.FillRectangle([System.Drawing.Brushes]::Black, 0, 0, $w, $h)
  $g.FillPath($pgb, $path)
  $beam = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(22, 160, 180, 255))
  foreach ($spec in @(@(0.15, 18), @(0.5, -3), @(0.85, -18))) {
    $state = $g.Save(); $g.TranslateTransform($w * $spec[0], -20); $g.RotateTransform($spec[1])
    $g.FillRectangle($beam, -$w * 0.07, 0, $w * 0.14, $h * 1.4); $g.Restore($state)
  }
}

function Draw-Emblem($g, [float]$cx, [float]$cy, [float]$r) {
  $gold = New-GoldBrush ($cy - $r) ($cy + $r)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 7, 13, 68))), $cx - $r, $cy - $r, 2 * $r, 2 * $r)
  $g.DrawEllipse((New-Object System.Drawing.Pen ($gold, [float]($r * 0.09))), $cx - $r, $cy - $r, 2 * $r, 2 * $r)
  $f = New-Object System.Drawing.Font ("Georgia", [float]($r * 1.05), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $sf = New-Object System.Drawing.StringFormat; $sf.Alignment = "Center"; $sf.LineAlignment = "Center"
  $g.DrawString([string][char]0x20B9, $f, (New-GoldBrush ($cy - $r * 0.6) ($cy + $r * 0.6)), [System.Drawing.RectangleF]::new($cx - $r, $cy - $r * 0.92, 2 * $r, 2 * $r), $sf)
}

function New-Canvas([int]$w, [int]$h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"; $g.TextRenderingHint = "AntiAliasGridFit"; $g.InterpolationMode = "HighQualityBicubic"
  return @($bmp, $g)
}

# ---- og.png ----
$dot = [string][char]0xB7; $dash = [string][char]0x2014
$bmp, $g = New-Canvas 1200 630
Draw-Stage $g 1200 630
Draw-Emblem $g 600 165 105
$sf = New-Object System.Drawing.StringFormat; $sf.Alignment = "Center"
$g.DrawString("DigiCrorepati", (New-Object System.Drawing.Font ("Georgia", 86, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)), (New-GoldBrush 300 400), [System.Drawing.RectangleF]::new(0, 290, 1200, 110), $sf)
$g.DrawString("Digital Marketing & AI Quiz  $dot  10 Levels  $dot  1,000+ Questions", (New-Object System.Drawing.Font ("Segoe UI", 38, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)), (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 223, 228, 255))), [System.Drawing.RectangleF]::new(0, 410, 1200, 60), $sf)
$g.DrawString("English  $dot  Hinglish  $dot  " + [System.Text.Encoding]::UTF8.GetString([byte[]](0xE0,0xA4,0xAE,0xE0,0xA4,0xB0,0xE0,0xA4,0xBE,0xE0,0xA4,0xA0,0xE0,0xA5,0x80)) + "   $dash   Free", (New-Object System.Drawing.Font ("Nirmala UI", 32, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)), (New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 174, 182, 230))), [System.Drawing.RectangleF]::new(0, 480, 1200, 60), $sf)
$g.DrawString("Win the virtual " + [string][char]0x20B9 + "1 Crore", (New-Object System.Drawing.Font ("Segoe UI", 34, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)), (New-GoldBrush 540 590), [System.Drawing.RectangleF]::new(0, 540, 1200, 60), $sf)
$bmp.Save((Join-Path $pub "og.png"), [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()

# ---- icons ----
foreach ($size in 192, 512) {
  $bmp, $g = New-Canvas $size $size
  Draw-Stage $g $size $size
  Draw-Emblem $g ($size / 2) ($size / 2) ($size * 0.4)
  $bmp.Save((Join-Path $pub "icon-$size.png"), [System.Drawing.Imaging.ImageFormat]::Png); $g.Dispose(); $bmp.Dispose()
}
Write-Output "Images written: og.png, icon-192.png, icon-512.png"
