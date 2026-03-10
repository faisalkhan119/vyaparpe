$cssFiles = Get-ChildItem -Path "src" -Recurse -Include "*.css"
foreach ($file in $cssFiles) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # Replace color: white with var(--text-main) — EXCEPT inside button backgrounds where white on colored bg is correct
    $content = $content -replace 'color:\s*white;', 'color: var(--text-main);'

    # Replace dark rgba backgrounds
    $content = $content -replace 'background:\s*rgba\(15,\s*23,\s*42[^)]*\);', 'background: var(--bg-card);'
    $content = $content -replace 'background:\s*rgba\(15,\s*15,\s*35[^)]*\);', 'background: var(--bg-card);'
    $content = $content -replace 'background:\s*rgba\(0,\s*0,\s*0,\s*0\.[2-5]\d*\);', 'background: var(--bg-darker);'

    # Replace transparent white backgrounds
    $content = $content -replace 'background:\s*rgba\(255,\s*255,\s*255,\s*0\.0[1-4]\d*\);', 'background: var(--bg-dark);'
    $content = $content -replace 'background:\s*rgba\(255,\s*255,\s*255,\s*0\.0[5-9]\d*\);', 'background: var(--bg-card);'
    $content = $content -replace 'background:\s*rgba\(255,\s*255,\s*255,\s*0\.1\d*\);', 'background: var(--bg-dark);'

    # Replace border-color with transparent whites
    $content = $content -replace 'border-color:\s*rgba\(255,\s*255,\s*255[^)]*\);', 'border-color: var(--border-color);'

    # Replace border with inline rgba whites
    $content = $content -replace 'border:\s*1px solid rgba\(255,\s*255,\s*255[^)]*\);', 'border: 1px solid var(--border-color);'

    # Replace color: rgba(255,255,255,...) with var(--text-muted) or var(--text-main)
    $content = $content -replace 'color:\s*rgba\(255,\s*255,\s*255,\s*0\.[3-6]\d*\);', 'color: var(--text-muted);'

    if ($content -ne $original) {
        Set-Content $file.FullName $content -NoNewline
        Write-Host ("UPDATED: " + $file.FullName)
    }
}
Write-Host "Done!"
