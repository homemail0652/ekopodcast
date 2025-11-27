# 🔧 Sorun Çözümleri

## ❌ Sorun 1: Google Drive Linki Çalışmıyor

### Google Drive linkini düzeltmeniz gerekiyor:

**Aldığınız link:**
```
https://drive.google.com/file/d/1ABC123XYZ456/view?usp=sharing
```

**Şuna çevirin:**
```
https://drive.google.com/uc?export=download&id=1ABC123XYZ456
```

### Nasıl Yapılır?

1. Google Drive linkinizdeki **ID kısmını** bulun (örn: `1ABC123XYZ456`)
2. Şu formata yapıştırın:
   ```
   https://drive.google.com/uc?export=download&id=BURAYA_ID_YAPIŞTIRIN
   ```

### Örnek:

**Orijinal:**
```
https://drive.google.com/file/d/1qwerty12345/view?usp=sharing
```

**Düzeltilmiş:**
```
https://drive.google.com/uc?export=download&id=1qwerty12345
```

Bu düzeltilmiş linki **Yönetim Paneli**'ndeki forma yapıştırın!

---

## ❌ Sorun 2: Podcast'ler Kaybolması

### Çözüm: data.json Dosyasını Kullanın

Podcast eklediğinizde otomatik olarak `data.json` dosyası indirilecek. Bu dosyayı şu şekilde kullanın:

### Yöntem 1: Dosyayı Aynı Klasöre Koyun
1. İndirilen `data.json` dosyasını alın
2. `index.html` dosyasının olduğu klasöre kopyalayın
3. Artık her açtığınızda podcast'leriniz orada olacak!

### Yöntem 2: GitHub'a Yükleyin (Kalıcı Çözüm)
1. İndirilen `data.json` dosyasını alın
2. GitHub repository'nizin ana dizinine yükleyin
3. Netlify otomatik güncelleyecek
4. Artık her yerden erişebilirsiniz!

---

## 🎵 M4A Dosyası İçin Özel Çözüm

M4A dosyaları bazı tarayıcılarda çalışmayabilir. İki seçenek:

### Seçenek 1: MP3'e Çevirin (ÖNERİLİR)
1. https://cloudconvert.com/m4a-to-mp3 adresine gidin
2. M4A dosyanızı yükleyin
3. "Convert" butonuna tıklayın
4. MP3 dosyasını indirin
5. MP3'ü Google Drive'a yükleyin

### Seçenek 2: M4A'yı Olduğu Gibi Kullanın
- Google Drive'a yükleyin
- Linki düzeltin (yukarıdaki formata göre)
- Çoğu modern tarayıcı çalıştırır

---

## ✅ ÖZET: Sorunları Çözmek İçin

### 1. Google Drive Linkini Düzeltin
```
https://drive.google.com/uc?export=download&id=DOSYA_ID
```

### 2. data.json Dosyasını Kaydedin
- İndirilen dosyayı `index.html` ile aynı klasöre koyun
- VEYA GitHub'a yükleyin

### 3. M4A Yerine MP3 Kullanın
- CloudConvert ile çevirin
- Daha uyumlu olur

---

## 🚀 Hızlı Test

1. Podcast ekleyin
2. `data.json` dosyası indirilecek
3. Bu dosyayı `index.html` ile aynı klasöre kopyalayın
4. Sayfayı yenileyin (F5)
5. Podcast'iniz orada olmalı!

---

## 💡 İpucu

Her podcast eklediğinizde `data.json` dosyası yeniden indirilir. 
Bu dosyayı **yedek olarak saklayın** veya **GitHub'a yükleyin**.

Böylece podcast'lerinizi asla kaybetmezsiniz! 🎉
