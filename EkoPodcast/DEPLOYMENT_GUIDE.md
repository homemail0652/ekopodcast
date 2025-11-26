# 🚀 EkoPodcast Yayınlama Rehberi
## www.ekopodcast.com için Netlify + GoDaddy Kurulumu

---

## 📋 İhtiyacınız Olanlar
- ✅ GoDaddy hesabınız (alan adı: www.ekopodcast.com)
- ✅ GitHub hesabı (ücretsiz)
- ✅ Netlify hesabı (ücretsiz)
- ✅ EkoPodcast dosyaları (hazır ✓)

---

## 🎯 ADIM 1: GitHub Hesabı Oluşturma ve Repository Hazırlama

### 1.1 GitHub Hesabı Oluşturun (Eğer yoksa)
1. https://github.com adresine gidin
2. "Sign up" butonuna tıklayın
3. E-posta, şifre belirleyin ve hesabı oluşturun

### 1.2 Yeni Repository Oluşturun
1. GitHub'a giriş yapın
2. Sağ üst köşedeki **+** işaretine tıklayın
3. **"New repository"** seçin
4. Repository ayarları:
   - **Repository name**: `ekopodcast`
   - **Description**: "EkoPodcast - Ekonomi Podcast Platformu"
   - **Public** seçeneğini işaretleyin
   - **"Add a README file"** işaretini KALDIRIN
   - **Create repository** butonuna tıklayın

### 1.3 Dosyaları GitHub'a Yükleyin

**Yöntem A: GitHub Web Arayüzü ile (Kolay)**

1. Yeni oluşturduğunuz repository sayfasında **"uploading an existing file"** linkine tıklayın
2. Şu dosyaları sürükleyip bırakın:
   - `index.html`
   - `styles.css`
   - `script.js`
3. En altta **"Commit changes"** butonuna tıklayın

**Yöntem B: Git ile (Terminal - İleri Seviye)**

PowerShell'i açın ve şu komutları çalıştırın:

```powershell
cd c:\Users\HP\Desktop\EkoPodcast
git init
git add .
git commit -m "Initial commit - EkoPodcast website"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/ekopodcast.git
git push -u origin main
```

*(KULLANICI_ADINIZ yerine GitHub kullanıcı adınızı yazın)*

---

## 🎯 ADIM 2: Netlify Hesabı Oluşturma ve Site Yayınlama

### 2.1 Netlify Hesabı Oluşturun
1. https://www.netlify.com adresine gidin
2. **"Sign up"** butonuna tıklayın
3. **"Sign up with GitHub"** seçeneğini seçin (en kolay yöntem)
4. GitHub ile giriş yapın ve Netlify'a izin verin

### 2.2 Yeni Site Oluşturun
1. Netlify dashboard'unda **"Add new site"** butonuna tıklayın
2. **"Import an existing project"** seçin
3. **"Deploy with GitHub"** seçin
4. GitHub'da izin verin (gerekirse)
5. **"ekopodcast"** repository'sini seçin
6. Deploy ayarları:
   - **Branch to deploy**: `main`
   - **Build command**: (boş bırakın)
   - **Publish directory**: (boş bırakın veya `/`)
7. **"Deploy site"** butonuna tıklayın

### 2.3 Deployment Tamamlanmasını Bekleyin
- 1-2 dakika içinde siteniz yayına alınacak
- Netlify size otomatik bir URL verecek (örn: `random-name-123.netlify.app`)
- Bu URL'ye tıklayarak sitenizi test edin

---

## 🎯 ADIM 3: GoDaddy Alan Adını Netlify'a Bağlama

### 3.1 Netlify'da Custom Domain Ekleme
1. Netlify dashboard'unda sitenize tıklayın
2. **"Domain settings"** butonuna tıklayın
3. **"Add custom domain"** butonuna tıklayın
4. `www.ekopodcast.com` yazın
5. **"Verify"** butonuna tıklayın
6. "Do you own this domain?" sorusuna **"Yes, add domain"** deyin

### 3.2 DNS Kayıtlarını Kopyalayın
Netlify size DNS ayarları gösterecek. Şunları not edin:

**A Record (@ için):**
```
Type: A
Name: @
Value: 75.2.60.5
```

**CNAME Record (www için):**
```
Type: CNAME
Name: www
Value: [sizin-site-adi].netlify.app
```

### 3.3 GoDaddy DNS Ayarları

1. **GoDaddy'ye Giriş Yapın**
   - https://www.godaddy.com/tr-tr adresine gidin
   - Hesabınıza giriş yapın

2. **Domain Yönetimine Gidin**
   - "My Products" (Ürünlerim) sayfasına gidin
   - "Domains" (Alan Adları) bölümünü bulun
   - `ekopodcast.com` yanındaki **"DNS"** butonuna tıklayın

3. **DNS Kayıtlarını Düzenleyin**

   **A Record Ekleme:**
   - **"Add"** (Ekle) butonuna tıklayın
   - **Type**: A
   - **Name**: @
   - **Value**: `75.2.60.5`
   - **TTL**: 600 seconds (veya 1 hour)
   - **Save** (Kaydet)

   **CNAME Record Ekleme:**
   - **"Add"** (Ekle) butonuna tıklayın
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `[sizin-site-adi].netlify.app` (Netlify'dan aldığınız)
   - **TTL**: 600 seconds
   - **Save** (Kaydet)

4. **Eski Kayıtları Temizleyin (Önemli!)**
   - Eğer @ ve www için başka A veya CNAME kayıtları varsa, silin
   - Sadece yukarıda eklediğiniz kayıtlar kalmalı

---

## 🎯 ADIM 4: SSL Sertifikası (HTTPS) Aktifleştirme

### 4.1 Netlify'da SSL Ayarları
1. Netlify dashboard → Site settings → Domain management
2. **"HTTPS"** bölümüne gidin
3. **"Verify DNS configuration"** butonuna tıklayın
4. DNS doğrulandıktan sonra **"Provision certificate"** otomatik olarak başlayacak
5. 1-2 dakika içinde SSL sertifikanız hazır olacak

### 4.2 HTTPS Yönlendirmesini Aktifleştirin
1. Aynı HTTPS bölümünde
2. **"Force HTTPS"** seçeneğini aktifleştirin
3. Artık tüm HTTP trafiği otomatik olarak HTTPS'e yönlendirilecek

---

## ⏱️ Bekleme Süreleri

- **Netlify Deployment**: 1-2 dakika
- **DNS Yayılması**: 15 dakika - 48 saat (genellikle 1-2 saat)
- **SSL Sertifikası**: DNS doğrulandıktan sonra 1-2 dakika

---

## ✅ Test Etme

### DNS Yayılmasını Kontrol Edin
1. https://www.whatsmydns.net adresine gidin
2. `ekopodcast.com` yazın
3. A kaydını seçin
4. Dünya genelinde DNS yayılmasını görün

### Sitenizi Test Edin
1. Tarayıcınızda `https://www.ekopodcast.com` adresine gidin
2. Siteniz yüklenmeli
3. Yeşil kilit simgesini görmelisiniz (HTTPS)

---

## 🔄 Gelecekte Güncelleme Yapma

### Yöntem 1: GitHub Web Arayüzü
1. GitHub'da repository'nize gidin
2. Düzenlemek istediğiniz dosyaya tıklayın
3. Kalem ikonuna (Edit) tıklayın
4. Değişiklikleri yapın
5. **"Commit changes"** butonuna tıklayın
6. Netlify otomatik olarak yeni versiyonu yayınlar (30 saniye)

### Yöntem 2: Lokal Bilgisayardan
1. Dosyalarınızı düzenleyin
2. Git ile push edin:
```powershell
cd c:\Users\HP\Desktop\EkoPodcast
git add .
git commit -m "Güncelleme açıklaması"
git push
```
3. Netlify otomatik olarak günceller

---

## 🆘 Sorun Giderme

### "Site yüklenmiyor" hatası
- DNS yayılmasını bekleyin (48 saate kadar)
- GoDaddy DNS ayarlarını kontrol edin
- Netlify'da domain doğrulamasını kontrol edin

### "Not Secure" uyarısı
- SSL sertifikasının aktif olmasını bekleyin
- Netlify'da "Force HTTPS" aktif mi kontrol edin

### "404 Not Found" hatası
- Repository'de dosyaların doğru yüklendiğini kontrol edin
- Netlify'da build loglarını kontrol edin

---

## 📞 Destek Kaynakları

- **Netlify Docs**: https://docs.netlify.com
- **GoDaddy DNS Yardım**: https://www.godaddy.com/help/dns-management-19228
- **GitHub Docs**: https://docs.github.com

---

## 🎉 Tebrikler!

Artık profesyonel bir web siteniz var:
- ✅ Ücretsiz hosting (Netlify)
- ✅ Özel alan adı (www.ekopodcast.com)
- ✅ Ücretsiz SSL sertifikası (HTTPS)
- ✅ Otomatik deployment (GitHub push ile)
- ✅ Hızlı ve güvenilir (CDN ile)

---

**Son Kontrol Listesi:**
- [ ] GitHub hesabı oluşturuldu
- [ ] Repository oluşturuldu ve dosyalar yüklendi
- [ ] Netlify hesabı oluşturuldu
- [ ] Site Netlify'da deploy edildi
- [ ] GoDaddy DNS kayıtları güncellendi
- [ ] SSL sertifikası aktifleştirildi
- [ ] Site test edildi ve çalışıyor

**Başarılar! 🚀**
