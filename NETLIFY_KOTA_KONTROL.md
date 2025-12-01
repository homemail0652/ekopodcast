# 🔍 Netlify Kota Kontrolü ve Çözüm Rehberi
**Tarih: 1 Aralık 2025**

---

## ✅ ADIM 1: Netlify Dashboard'a Giriş

1. **Netlify'a giriş yapın:**
   - https://app.netlify.com adresine gidin
   - GitHub hesabınızla giriş yapın

2. **EkoPodcast sitesini seçin:**
   - Ana sayfada "ekopodcast" sitesini bulun
   - Site kartına tıklayın

---

## 📊 ADIM 2: Kullanım Durumunu Kontrol Edin

### Site Durumu Kontrolü:
1. Dashboard'da sitenizin durumunu kontrol edin
2. Üstte **yeşil "Published"** yazıyorsa → Site aktif ✅
3. **"Paused"** veya kırmızı uyarı varsa → Sorun var ❌

### Bandwidth Kontrolü:
1. Sol menüden **"Site settings"** → **"Usage and billing"** bölümüne gidin
2. **"Bandwidth"** kullanımınızı kontrol edin:
   - **Ücretsiz Plan Limiti:** 100 GB/ay
   - **Kullanılan:** ? GB
   - **Kalan:** ? GB

3. **Build Minutes** kontrolü:
   - **Ücretsiz Plan Limiti:** 300 dakika/ay
   - **Kullanılan:** ? dakika

---

## 🔄 ADIM 3: Site Yeniden Aktifleştirme (Gerekirse)

### Eğer site hala "Paused" durumundaysa:

**Seçenek A: Otomatik Yenilenme Bekleyin**
- Netlify kotaları her ayın 1'inde sıfırlanır
- Bugün 1 Aralık olduğu için kota yenilenmiş olmalı
- Bazen birkaç saat gecikme olabilir

**Seçenek B: Manuel Aktifleştirme**
1. Site settings → General
2. **"Resume site"** veya **"Unpause site"** butonuna tıklayın
3. Onaylayın

**Seçenek C: Yeniden Deploy**
1. Ana dashboard'da **"Deploys"** sekmesine gidin
2. Sağ üstte **"Trigger deploy"** → **"Deploy site"** tıklayın
3. 1-2 dakika bekleyin

---

## 🚨 ADIM 4: Sorun Devam Ediyorsa

### Kota Hala Doluysa:

**Çözüm 1: Bandwidth Optimizasyonu**
```
Ses dosyalarınız çok fazla bandwidth tüketiyor olabilir.
Çözüm: Ses dosyalarını Google Drive'a taşıyın
```

**Çözüm 2: Pro Plan'a Geçiş**
- Aylık $19
- 1 TB bandwidth
- Sınırsız build minutes
- Daha hızlı support

**Çözüm 3: Alternatif Hosting**
- Vercel (100 GB ücretsiz)
- Cloudflare Pages (sınırsız)
- GitHub Pages (sınırsız)

---

## 📈 Bandwidth Tüketimini Azaltma İpuçları

### 1. Ses Dosyalarını Harici Servise Taşıyın
```javascript
// Şu anki durum (script.js içinde):
audioUrl: "Podcast1.m4a"  // ❌ Netlify'dan servis ediliyor

// Önerilen:
audioUrl: "https://drive.google.com/uc?id=DOSYA_ID"  // ✅ Google Drive'dan
```

### 2. Cloudflare CDN Kullanın
- Netlify'ın önüne Cloudflare CDN koyun
- Bandwidth tüketimini %70 azaltır
- Ücretsiz

### 3. Cache Ayarlarını Optimize Edin
`netlify.toml` dosyası oluşturun:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

---

## 🎯 Hızlı Kontrol Listesi

Şu adımları sırayla yapın:

- [ ] **1.** www.ekopodcast.com adresini tarayıcıda açın
- [ ] **2.** Site açılıyor mu kontrol edin
- [ ] **3.** Netlify dashboard'a giriş yapın
- [ ] **4.** Site durumunu kontrol edin (Published/Paused)
- [ ] **5.** Bandwidth kullanımını kontrol edin
- [ ] **6.** Gerekirse "Trigger deploy" yapın
- [ ] **7.** 5 dakika bekleyip tekrar kontrol edin

---

## 📞 Sonuç Bildirimi

Kontrolleri yaptıktan sonra bana şunları bildirin:

1. **Site durumu:** Açılıyor / Açılmıyor
2. **Netlify durumu:** Published / Paused / Diğer
3. **Bandwidth kullanımı:** ? GB / 100 GB
4. **Hata mesajı (varsa):** ?

Bu bilgilerle size tam çözüm sunacağım! 🚀

---

## 💡 Önemli Notlar

- ✅ Bugün 1 Aralık, kotalar yenilenmiş olmalı
- ⏰ Bazen yenilenme birkaç saat sürebilir
- 🔄 Manuel "Trigger deploy" genellikle sorunu çözer
- 📊 Bandwidth tüketimi genellikle ses dosyalarından kaynaklanır

**Başarılar!** 🎉
