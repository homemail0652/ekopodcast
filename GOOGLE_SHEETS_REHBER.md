# 🎙️ EkoPodcast - Google Sheets ile Kolay Yönetim

## 📊 EN BASIT YÖNTEM: Google Sheets

Podcast'lerinizi Excel gibi bir tabloda yönetin!

### 1️⃣ Google Sheets Tablosu Oluşturun

1. Google Sheets'e gidin: https://sheets.google.com
2. Yeni bir tablo oluşturun
3. İlk satıra şu başlıkları yazın:

| id | title | description | category | duration | date | listens | featured | audioUrl |
|----|-------|-------------|----------|----------|------|---------|----------|----------|

### 2️⃣ Podcast Ekleyin

Her satıra bir podcast ekleyin:

**Örnek:**
| id | title | description | category | duration | date | listens | featured | audioUrl |
|----|-------|-------------|----------|----------|------|---------|----------|----------|
| 1 | 2024 Türkiye Ekonomisi | Enflasyon analizi | makroekonomi | 45 | 2025-11-27 | 0 | true | https://link.com/podcast1.mp3 |
| 2 | Kripto Para Analizi | Bitcoin ve Ethereum | kripto | 30 | 2025-11-26 | 0 | false | https://link.com/podcast2.mp3 |

### 3️⃣ Tabloyu Yayınlayın

1. **Dosya** → **Paylaş** → **Web'de yayınla**
2. **Bağlantı** sekmesine tıklayın
3. Format: **Virgülle ayrılmış değerler (.csv)** seçin
4. **Yayınla** butonuna tıklayın
5. Çıkan URL'yi kopyalayın

### 4️⃣ URL'yi Siteye Ekleyin

`script.js` dosyasını açın ve 7. satıra URL'yi yapıştırın:

```javascript
const GOOGLE_SHEET_CSV_URL = "BURAYA_URL_YAPIŞTIRIN";
```

### ✅ TAMAMLANDI!

Artık Google Sheets'te yaptığınız her değişiklik otomatik olarak sitenize yansıyacak!

---

## 🎵 Ses Dosyası Linkleri Nereden Alınır?

### Seçenek 1: YouTube (EN KOLAY)
1. Podcast'i YouTube'a yükleyin (unlisted olarak)
2. https://ytmp3.nu gibi bir siteden MP3 linkini alın

### Seçenek 2: Google Drive
1. Ses dosyasını Drive'a yükleyin
2. Sağ tık → Paylaş → "Bağlantıya sahip olan herkes görüntüleyebilir"
3. Linki kopyalayın

### Seçenek 3: SoundCloud
1. SoundCloud'a yükleyin
2. Share → Embed → Link'i kopyalayın

---

## 💡 Kategoriler

- `makroekonomi` - Makroekonomi
- `piyasa` - Piyasa Analizi
- `roportaj` - Röportaj
- `kripto` - Kripto Para
- `finans` - Kişisel Finans
- `yatirim` - Yatırım Stratejileri

---

## 🎯 Özet: 4 Basit Adım

1. **Google Sheets'te tablo oluştur**
2. **Podcast'leri tabloya ekle**
3. **Tabloyu web'de yayınla**
4. **URL'yi script.js'e yapıştır**

Hepsi bu kadar! Excel gibi kullanın! 🚀
