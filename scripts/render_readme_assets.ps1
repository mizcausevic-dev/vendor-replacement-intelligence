$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7,10,15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233,243,255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186,200,218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55,255,139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,199,255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Vendor Replacement Intelligence", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Replacement score at a glance" -Subtitle "Savings, blocked exits, renewal cliffs, and overlap-tax candidates stay visible in one executive surface." -Bullets @(
  "Replacement score keeps the board focused on exit readiness, not only contract frustration.",
  "Ready exits and blocked exits stay separated so savings claims stay honest.",
  "Modeled savings sit beside dependency and renewal risk before they harden into board language."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Replacement lane stays executive-readable" -Subtitle "AI, identity, GTM, workflow, and CRM exits stay separate so the wrong replacement story does not spill across the whole estate." -Bullets @(
  "Hard blocked exits stay visible before the next renewal cycle.",
  "Overlap-tax wins are easy to take without pretending the hardest migrations are solved.",
  "Lane owners and next actions make the board story fundable instead of hand-wavy."
) -OutputPath (Join-Path $screenshots "02-replacement-lane-proof.png")

New-ProofImage -Title "Switching risks surface first" -Subtitle "The biggest migration blockers and savings overclaims sort to the top with clear owners and vendor names." -Bullets @(
  "Migration blockers move ahead of medium overlap findings.",
  "Renewal cliffs and hidden dependencies keep the exit story grounded.",
  "The surface is built to stop procurement optimism from turning into board fiction."
) -OutputPath (Join-Path $screenshots "03-switching-risks-proof.png")

New-ProofImage -Title "Savings narrative resolves into board packets" -Subtitle "Every major replacement theme becomes a memo-ready packet with timing, blocker, and confidence level." -Bullets @(
  "Easy overlap retirements prove savings discipline early.",
  "Hard AI, identity, and CRM exits stay red until the evidence improves.",
  "The board memo can reuse the same packets instead of inventing unsupported numbers."
) -OutputPath (Join-Path $screenshots "04-savings-narrative-proof.png")
