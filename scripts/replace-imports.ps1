param (
    [string]$Directory
)

if (-Not (Test-Path -Path $Directory)) {
    Write-Host "Path doesn't exist"
    exit 1
}

# Windows command with -NoNewline for in-place editing without backup
Get-ChildItem $Directory -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace '@trezor/([^/]+)/src', '@trezor/$1/lib' | Set-Content $_.FullName
}

# Safety check to ensure that all occurrences of '@trezor/*/src' have been replaced
if ((Select-String -Path $Directory\* -Pattern '@trezor/[^/]+/src' -List).Count -gt 0) {
    Write-Host "Error: Some files still contain '@trezor/*/src'. Please review the replacements."
    exit 1
} else {
    Write-Host "All occurrences of '@trezor/*/src' have been successfully replaced."
}