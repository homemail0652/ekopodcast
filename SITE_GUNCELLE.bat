@echo off
echo ==========================================
echo EkoPodcast Guncelleme Araci
echo ==========================================
echo.
echo Dosyalar GitHub'a yukleniyor...
echo.

git add .
git commit -m "Site guncellemesi: Kategori isimleri, Admin gizleme ve Email sistemi"
git push origin main

echo.
echo ==========================================
echo ISLEM TAMAMLANDI!
echo 1-2 dakika icinde site guncellenecektir.
echo ==========================================
pause
