# EkoPodcast - Ekonomi Podcast Platformu

## 📋 Proje Hakkında

EkoPodcast, Türkiye ve Dünya'daki ekonomik gelişmeleri, derinlemesine araştırma yazılarını ve uzman söyleşilerini barındıran profesyonel bir podcast yayın platformudur.

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Ana Renkler**: Koyu gri, antrasit, lacivert, siyah
- **Vurgu Renkleri**: Koyu altın sarısı (#d4af37), metalik gümüş, neon mavi
- **Tasarım Felsefesi**: Minimalist, sade, flat/clean design

### Logo ve Amblem
- SVG tabanlı, ölçeklenebilir logo tasarımı
- Ekonomi simgesi: Yükselen bar grafik
- Podcast simgesi: Ses dalgaları ve mikrofon
- Animasyonlu logo elementleri

## 🚀 Özellikler

### 1. Kullanıcı Deneyimi (UX)
- ✅ Tek tıkla erişilebilirlik
- ✅ Ana sayfada en yeni, en çok dinlenen ve öne çıkan podcastler
- ✅ Responsive tasarım (mobil, tablet, desktop)
- ✅ Smooth animasyonlar ve hover efektleri

### 2. Podcast Yönetimi
- ✅ Sezgisel yönetim paneli
- ✅ Podcast yükleme formu
- ✅ Kategori bazlı filtreleme (Makroekonomi, Piyasa Analizi, Röportaj, vb.)
- ✅ Tarih ve süre bilgileri
- ✅ Dinlenme sayısı takibi

### 3. Üyelik Sistemi
- ✅ Sadece e-posta ile hızlı üyelik
- ✅ Basit giriş/çıkış akışı
- ✅ LocalStorage ile oturum yönetimi

### 4. İçerik Kısıtlaması
- ✅ Üye olmayanlar için 1 kez dinleme hakkı
- ✅ Tekrar dinleme için üyelik zorunluluğu
- ✅ Yorum yapma sadece üyeler için

### 5. Özellikli Alanlar
- ✅ "En Çok Dinlenenler" öne çıkan bölümü
- ✅ Üyelere özel yorum sistemi
- ✅ Podcast detay sayfası ve oynatıcı
- ✅ Kategori bazlı listeleme

### 6. Reklam Alanları
- ✅ Üst banner alanı (970x90)
- ✅ Sidebar reklam alanı (300x600)
- ✅ Estetik bütünlüğü bozmayan tasarım

## 📁 Dosya Yapısı

```
EkoPodcast/
├── index.html          # Ana HTML dosyası
├── styles.css          # Tüm CSS stilleri
├── script.js           # JavaScript fonksiyonları
└── README.md           # Bu dosya
```

## 🌐 Web Sitesini Görüntüleme

### Yöntem 1: Doğrudan Tarayıcıda Açma
1. `index.html` dosyasına çift tıklayın
2. Varsayılan tarayıcınızda açılacaktır

### Yöntem 2: Live Server ile (Önerilen)
1. Visual Studio Code'u açın
2. EkoPodcast klasörünü açın
3. "Live Server" eklentisini yükleyin (eğer yoksa)
4. `index.html` dosyasına sağ tıklayın
5. "Open with Live Server" seçeneğini seçin

### Yöntem 3: Python HTTP Server
```bash
cd c:\Users\HP\Desktop\EkoPodcast
python -m http.server 8000
```
Ardından tarayıcınızda `http://localhost:8000` adresine gidin

## 🎯 Kullanım Kılavuzu

### Podcast Dinleme
1. Ana sayfada podcast kartlarına tıklayın
2. Podcast detay sayfası açılır
3. Ses oynatıcıyı kullanarak dinleyin
4. **Önemli**: Üye olmayanlar her podcast'i sadece 1 kez dinleyebilir

### Üye Olma
1. Sağ üst köşedeki "Üye Ol" butonuna tıklayın
2. E-posta adresinizi girin
3. "Üye Ol" butonuna tıklayın
4. Artık sınırsız dinleme ve yorum yapma hakkınız var

### Yorum Yapma
1. Bir podcast'i açın
2. Üye olarak giriş yapın
3. Sayfa altındaki yorum formunu doldurun
4. "Yorum Gönder" butonuna tıklayın

### Podcast Yükleme (Yönetim Paneli)
1. Üst menüden "Yönetim Paneli"ne tıklayın
2. Podcast bilgilerini doldurun:
   - Başlık
   - Açıklama
   - Kategori
   - Süre (dakika)
   - Ses dosyası URL'i
3. "Podcast Yükle" butonuna tıklayın

### Kategori Filtreleme
1. Sidebar'daki kategori listesinden seçim yapın
2. Veya üst menüden "Kategoriler" sayfasına gidin
3. İstediğiniz kategoriye tıklayın

## 🎨 Kategoriler

- **Makroekonomi**: Genel ekonomi, enflasyon, büyüme
- **Piyasa Analizi**: Borsa, hisse senetleri, piyasa değerlendirmeleri
- **Röportaj**: Uzman söyleşileri ve röportajlar
- **Kripto Para**: Bitcoin, Ethereum, kripto piyasaları
- **Kişisel Finans**: Tasarruf, bütçe yönetimi
- **Yatırım Stratejileri**: Portföy yönetimi, yatırım araçları

## 💾 Veri Saklama

Proje, aşağıdaki verileri tarayıcının LocalStorage'ında saklar:
- Kullanıcı oturum bilgileri
- Dinlenen podcast'ler (üye olmayanlar için)
- Yorumlar

## 🎨 Tasarım Detayları

### Animasyonlar
- Logo elementlerinde pulse animasyonları
- Hover efektleri ile interaktif kartlar
- Smooth scroll ve geçişler
- Grid pattern arka plan animasyonu

### Tipografi
- **Ana Font**: Inter (Google Fonts)
- **Başlık Font**: Outfit (Google Fonts)
- Modern, okunabilir font seçimi

### Responsive Breakpoints
- **Desktop**: 1024px ve üzeri
- **Tablet**: 768px - 1023px
- **Mobile**: 767px ve altı

## 🔧 Özelleştirme

### Renkleri Değiştirme
`styles.css` dosyasındaki CSS değişkenlerini düzenleyin:
```css
:root {
    --color-accent-gold: #d4af37;
    --color-accent-silver: #c0c0c0;
    --color-accent-blue: #00d9ff;
    /* ... diğer renkler */
}
```

### Podcast Ekleme
`script.js` dosyasındaki `podcasts` dizisine yeni objeler ekleyin:
```javascript
{
    id: 10,
    title: "Yeni Podcast Başlığı",
    description: "Açıklama",
    category: "makroekonomi",
    duration: 45,
    date: "2025-11-26",
    listens: 0,
    featured: false,
    audioUrl: "ses-dosyasi-url.mp3"
}
```

## 📱 Tarayıcı Desteği

- ✅ Chrome/Edge (önerilen)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## 🚀 Gelecek Geliştirmeler

- [ ] Backend entegrasyonu
- [ ] Gerçek ses dosyası yükleme
- [ ] Kullanıcı profil sayfaları
- [ ] Podcast arama fonksiyonu
- [ ] Playlist oluşturma
- [ ] Sosyal medya paylaşım butonları
- [ ] Podcast indirme özelliği
- [ ] İstatistik ve analitik paneli

## 📄 Lisans

Bu proje eğitim ve demo amaçlı oluşturulmuştur.

## 👨‍💻 Geliştirici Notları

- Tüm veriler client-side'da saklanır (LocalStorage)
- Gerçek bir üretim ortamı için backend gereklidir
- Ses dosyaları şu anda placeholder URL'lerdir
- Reklam alanları statik placeholder'lardır

---

**EkoPodcast** - Ekonominin Nabzını Dinleyin 🎙️📈
