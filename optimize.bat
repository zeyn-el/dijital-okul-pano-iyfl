@echo off
echo Resimler optimize ediliyor...
echo.

cd images

for %%f in (*.png) do (
    echo Optimizing: %%f
    magick "%%f" -resize 1920x -quality 85 -strip "%%~nf-optimized.png"
)

echo.
echo Tamamlandi! Optimized dosyalari kontrol edin.
pause
