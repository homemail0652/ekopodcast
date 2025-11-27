# 🎙️ EkoPodcast - Kolay Kullanım Rehberi

## 📤 Ses Dosyası Yükleme (Süper Basit Yöntem)

### Adım 1: Ses Dosyasını Hazırlayın
- Podcast ses dosyanızı hazırlayın (MP3 formatı önerilir)
- Dosya adını basit yapın: `podcast1.mp3`, `ekonomi-analizi.mp3` gibi
- Türkçe karakter kullanmayın, boşluk yerine `-` kullanın

### Adım 2: GitHub'a Yükleyin
1. GitHub repository'nize gidin: https://github.com/KULLANICI_ADINIZ/ekopodcast
2. `uploads` klasörüne tıklayın
3. "Add file" → "Upload files" butonuna tıklayın
4. Ses dosyanızı sürükleyip bırakın
5. "Commit changes" butonuna tıklayın

### Adım 3: Dosya URL'sini Alın
Yüklediğiniz dosyanın URL'si otomatik olarak şu formatta olacak:

```
https://raw.githubusercontent.com/KULLANICI_ADINIZ/ekopodcast/main/uploads/DOSYA_ADI.mp3
```

**Örnek:**
```
https://raw.githubusercontent.com/scorpionsss/ekopodcast/main/uploads/podcast1.mp3
```

### Adım 4: Admin Panelinde Kullanın
- `admin-simple.html` dosyasını açın
- "Ses Dosyası URL" alanına yukarıdaki URL'yi yapıştırın
- Diğer bilgileri doldurun
- "Podcast Ekle" butonuna tıklayın

---

## 🚀 Daha da Kolay: Otomatik URL Oluşturma

Yönetim panelini güncelledim. Artık sadece dosya adını yazmanız yeterli!

**Örnek:**
- Ses dosyası adı: `podcast1.mp3`
- Panel'de yazın: `podcast1.mp3`
- URL otomatik oluşturulacak!

---

## 💡 İpuçları

### Ses Dosyası Boyutu
- GitHub'da dosya başına maksimum 100MB
- Podcast'ler genelde 20-50MB arası
- Eğer dosya çok büyükse, ses kalitesini düşürebilirsiniz

### Dosya Adı Örnekleri
✅ İyi: `turkiye-ekonomisi-2024.mp3`
✅ İyi: `kripto-analiz-1.mp3`
❌ Kötü: `Türkiye Ekonomisi (2024).mp3`
❌ Kötü: `podcast #1.mp3`

### Hızlı Test
1. Ses dosyasını GitHub'a yükleyin
2. URL'yi tarayıcıya yapıştırın
3. Ses dosyası çalıyorsa, doğru URL'dir!

---

## 🎯 Özet: 3 Basit Adım

1. **Ses dosyasını GitHub'a yükle** (uploads klasörüne)
2. **Admin panelini aç** (admin-simple.html)
3. **Sadece dosya adını yaz** (örn: podcast1.mp3)

Hepsi bu kadar! 🎉
