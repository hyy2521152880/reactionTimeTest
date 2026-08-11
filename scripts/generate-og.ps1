Add-Type -AssemblyName System.Drawing

$width = 1200
$height = 630
$outputPath = Join-Path $PSScriptRoot "..\public\og-image.png"
$outputDirectory = Split-Path $outputPath
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$paper = [System.Drawing.ColorTranslator]::FromHtml("#f5f7f8")
$ink = [System.Drawing.ColorTranslator]::FromHtml("#111820")
$action = [System.Drawing.ColorTranslator]::FromHtml("#2864dc")
$signal = [System.Drawing.ColorTranslator]::FromHtml("#00a86b")
$caution = [System.Drawing.ColorTranslator]::FromHtml("#e1534f")
$marker = [System.Drawing.ColorTranslator]::FromHtml("#ffcc4d")
$muted = [System.Drawing.ColorTranslator]::FromHtml("#65717c")

$graphics.Clear($paper)
$gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(18, 17, 24, 32), 1)
for ($x = 0; $x -le $width; $x += 32) { $graphics.DrawLine($gridPen, $x, 0, $x, $height) }
for ($y = 0; $y -le $height; $y += 32) { $graphics.DrawLine($gridPen, 0, $y, $width, $y) }

$graphics.FillRectangle((New-Object System.Drawing.SolidBrush($ink)), 64, 56, 58, 58)
$logoFont = New-Object System.Drawing.Font("Arial", 18, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("RT", $logoFont, (New-Object System.Drawing.SolidBrush($marker)), 75, 72)
$brandFont = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("REACTION TIME", $brandFont, (New-Object System.Drawing.SolidBrush($ink)), 142, 70)

$labelFont = New-Object System.Drawing.Font("Arial", 19, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("FIVE-ROUND ONLINE TEST", $labelFont, (New-Object System.Drawing.SolidBrush($action)), 64, 225)
$titleFont = New-Object System.Drawing.Font("Arial", 58, [System.Drawing.FontStyle]::Bold)
$graphics.DrawString("Reaction Time Test", $titleFont, (New-Object System.Drawing.SolidBrush($ink)), 58, 270)
$bodyFont = New-Object System.Drawing.Font("Arial", 25, [System.Drawing.FontStyle]::Regular)
$graphics.DrawString("Measure your average and best reaction time.", $bodyFont, (New-Object System.Drawing.SolidBrush($muted)), 64, 375)

$barWidth = $width / 4
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush($caution)), 0, 614, $barWidth, 16)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush($marker)), $barWidth, 614, $barWidth, 16)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush($signal)), $barWidth * 2, 614, $barWidth, 16)
$graphics.FillRectangle((New-Object System.Drawing.SolidBrush($action)), $barWidth * 3, 614, $barWidth, 16)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$bitmap.Dispose()
Write-Output $outputPath
