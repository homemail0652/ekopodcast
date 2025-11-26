# 📤 GitHub'a Dosya Yükleme Rehberi (Web Arayüzü)
## EkoPodcast Dosyalarını GitHub'a Yükleme - Adım Adım

---

## ✅ Hazırlık Tamamlandı!

Dosyalarınız hazır:
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `script.js`
- ✅ `ekopodcast-files.zip` (Yedek - tüm dosyalar)

Konum: `c:\Users\HP\Desktop\EkoPodcast\`

---

## 🎯 ADIM 1: GitHub Hesabı Oluşturma

### 1.1 GitHub'a Gidin
1. Tarayıcınızı açın (Microsoft Edge)
2. Şu adrese gidin: **https://github.com**

### 1.2 Hesap Oluşturun (Eğer yoksa)
1. Sağ üst köşede **"Sign up"** (Kaydol) butonuna tıklayın
2. Bilgilerinizi girin:
   - **Email**: E-posta adresiniz
   - **Password**: Güçlü bir şifre
   - **Username**: Kullanıcı adınız (örn: ekopodcast veya kendi adınız)
3. Robot doğrulamasını yapın
4. **"Create account"** butonuna tıklayın
5. E-postanıza gelen doğrulama kodunu girin

### 1.3 Giriş Yapın (Eğer hesabınız varsa)
1. Sağ üst köşede **"Sign in"** butonuna tıklayın
2. E-posta ve şifrenizi girin
3. **"Sign in"** butonuna tıklayın

---

## 🎯 ADIM 2: Yeni Repository Oluşturma

### 2.1 Repository Oluşturma Sayfasına Gidin
1. GitHub'a giriş yaptıktan sonra
2. Sağ üst köşedeki **"+"** işaretine tıklayın
3. Açılan menüden **"New repository"** seçin

   **VEYA**
   
   Doğrudan şu adrese gidin: **https://github.com/new**

### 2.2 Repository Bilgilerini Doldurun

```
┌─────────────────────────────────────────────────────┐
│ Repository name *                                    │
│ ┌─────────────────────────────────────────────┐    │
│ │ ekopodcast                                   │    │
│ └─────────────────────────────────────────────┘    │
│                                                      │
│ Description (optional)                               │
│ ┌─────────────────────────────────────────────┐    │
│ │ EkoPodcast - Ekonomi Podcast Platformu      │    │
│ └─────────────────────────────────────────────┘    │
│                                                      │
│ ○ Public  ● Private                                 │
│   (Public seçin - ücretsiz hosting için gerekli)   │
│                                                      │
│ ☐ Add a README file                                │
│   (İŞARETLEMEYİN - boş bırakın)                    │
│                                                      │
│ ☐ Add .gitignore                                   │
│   (İŞARETLEMEYİN)                                  │
│                                                      │
│ ☐ Choose a license                                 │
│   (İŞARETLEMEYİN)                                  │
│                                                      │
│         [Create repository]                         │
└─────────────────────────────────────────────────────┘
```

**Önemli Ayarlar:**
- ✅ Repository name: `ekopodcast`
- ✅ Description: `EkoPodcast - Ekonomi Podcast Platformu`
- ✅ **Public** seçeneğini işaretleyin (Netlify için gerekli)
- ❌ "Add a README file" işaretini KALDIRIN
- ❌ Diğer seçenekleri boş bırakın

### 2.3 Repository'yi Oluşturun
1. En altta **"Create repository"** yeşil butonuna tıklayın
2. Yeni repository sayfası açılacak

---

## 🎯 ADIM 3: Dosyaları Yükleme

Repository oluşturduktan sonra şöyle bir sayfa göreceksiniz:

### 3.1 Dosya Yükleme Sayfasına Gidin

Sayfada şu yazıyı göreceksiniz:
```
"Quick setup — if you've done this kind of thing before"
```

Biraz aşağıda şu link olacak:
**"uploading an existing file"** ← Bu linke tıklayın

### 3.2 Dosyaları Sürükle-Bırak ile Yükleyin

Şimdi dosya yükleme sayfasındasınız. İki yöntem var:

**YÖNTEM A: Sürükle-Bırak (Önerilen)**

1. Windows Gezgini'ni açın (Win + E)
2. `c:\Users\HP\Desktop\EkoPodcast\` klasörüne gidin
3. Şu 3 dosyayı seçin:
   - `index.html`
   - `styles.css`
   - `script.js`
4. Dosyaları seçili tutun (Ctrl tuşuna basılı tutarak 3'ünü de seçin)
5. Dosyaları GitHub sayfasındaki **"Drag files here"** alanına sürükleyin
6. Dosyalar yüklenecek (yeşil tik işareti görünecek)

**YÖNTEM B: Choose Files Butonu**

1. **"choose your files"** linkine tıklayın
2. Dosya seçim penceresi açılacak
3. `c:\Users\HP\Desktop\EkoPodcast\` klasörüne gidin
4. Ctrl tuşuna basılı tutarak 3 dosyayı da seçin:
   - `index.html`
   - `styles.css`
   - `script.js`
5. **"Aç"** veya **"Open"** butonuna tıklayın

### 3.3 Commit (Kaydet) İşlemi

Dosyalar yüklendikten sonra:

1. Sayfanın altında **"Commit changes"** bölümü var
2. **Commit message** kutusunda şu yazacak:
   ```
   Add files via upload
   ```
   (Bunu değiştirebilirsiniz, örn: "Initial commit - EkoPodcast website")

3. Yeşil **"Commit changes"** butonuna tıklayın

### 3.4 Tamamlandı! ✅

Artık dosyalarınız GitHub'da! Şöyle bir sayfa göreceksiniz:

```
ekopodcast
├── index.html
├── styles.css
└── script.js
```

---

## 🎯 ADIM 4: Repository URL'ini Kopyalayın

Netlify için ihtiyacınız olacak:

1. Repository ana sayfasında (github.com/KULLANICI_ADINIZ/ekopodcast)
2. Sağ üst köşede yeşil **"Code"** butonu var
3. URL'yi kopyalayın (örn: `https://github.com/KULLANICI_ADINIZ/ekopodcast`)

---

## ✅ Kontrol Listesi

Şunları yaptınız mı?
- [ ] GitHub hesabı oluşturuldu/giriş yapıldı
- [ ] Yeni repository oluşturuldu (isim: `ekopodcast`)
- [ ] Repository **Public** olarak ayarlandı
- [ ] 3 dosya yüklendi (index.html, styles.css, script.js)
- [ ] Commit işlemi tamamlandı
- [ ] Dosyalar repository'de görünüyor

---

## 🚀 Sonraki Adım: Netlify

Dosyalar GitHub'a yüklendikten sonra:

1. **https://www.netlify.com** adresine gidin
2. **"Sign up with GitHub"** ile giriş yapın
3. **"Add new site"** → **"Import an existing project"**
4. **"Deploy with GitHub"** seçin
5. **"ekopodcast"** repository'sini seçin
6. **"Deploy site"** butonuna tıklayın

Netlify otomatik olarak sitenizi yayınlayacak!

---

## 🆘 Sorun mu Yaşıyorsunuz?

### "Repository name already exists" hatası
- Farklı bir isim deneyin: `ekopodcast-web`, `ekopodcast-site`

### Dosyalar yüklenmiyor
- Dosya boyutlarını kontrol edin (her biri 100MB'dan küçük olmalı)
- Tarayıcınızı yenileyin (F5)
- Farklı tarayıcı deneyin

### "Public repository" seçeneği yok
- Ücretsiz GitHub hesabında Public seçeneği olmalı
- Hesabınızı doğruladığınızdan emin olun (e-posta doğrulama)

---

## 📞 Yardım

Herhangi bir adımda takılırsanız:
1. Ekran görüntüsü alın (Win + Shift + S)
2. Hangi adımda olduğunuzu belirtin
3. Hata mesajını paylaşın

---

## 🎉 Tebrikler!

GitHub'a dosya yüklemeyi başardınız! Artık Netlify'a geçebilirsiniz.

**Sonraki Rehber:** `DEPLOYMENT_GUIDE.md` dosyasındaki ADIM 2'ye geçin.

---

**Başarılar! 🚀**
