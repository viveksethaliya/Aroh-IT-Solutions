@echo off
echo Starting image compression...
cd public\services

for %%I in (*.png *.jpg *.jpeg) do (
    echo Compressing %%I ...
    cwebp -size 95000 "%%I" -o "%%~nI.webp"
)

echo.
echo Compression complete! The new compressed .webp images are in the public\services folder.
