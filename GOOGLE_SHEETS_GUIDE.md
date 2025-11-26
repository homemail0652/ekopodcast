# 📊 Google Sheets ile Podcast Yönetimi Rehberi

Bu rehber sayesinde, web sitenizdeki podcast'leri sadece bir Excel tablosu doldurur gibi yönetebileceksiniz. Kod yazmanıza gerek yok!

---

## 🎯 ADIM 1: Google Tablosunu Oluşturun

1.  **Google Sheets**'i açın: [sheets.google.com](https://sheets.google.com)
2.  **"Boş"** (Blank) yeni bir tablo oluşturun.
3.  **İlk satıra (1. Satır)** aşağıdaki başlıkları sırasıyla kopyalayıp yapıştırın (Hepsini küçük harfle yazın):

    | A | B | C | D | E | F | G | H | I |
    |---|---|---|---|---|---|---|---|---|
    | **id** | **title** | **description** | **category** | **duration** | **date** | **listens** | **featured** | **audioUrl** |

---

## 🎯 ADIM 2: Örnek Veri Ekleyin

Hemen altına (2. Satır) bir örnek podcast ekleyelim:

*   **id:** `1`
*   **title:** `İlk Podcast Denemesi`
*   **description:** `Bu podcast Google Sheets üzerinden eklenmiştir.`
*   **category:** `makroekonomi` *(Seçenekler: makroekonomi, piyasa, roportaj, kripto, finans, yatirim)*
*   **duration:** `45`
*   **date:** `2025-11-27`
*   **listens:** `100`
*   **featured:** `TRUE` *(Ana sayfada öne çıksın istiyorsanız TRUE, yoksa FALSE)*
*   **audioUrl:** `#` *(Ses dosyasının linki)*

---

## 🎯 ADIM 3: Tabloyu Web'de Yayınlayın (Çok Önemli!)

Sitenizin bu tabloyu okuyabilmesi için yayınlamanız gerekir:

1.  Sol üstteki **Dosya** (File) menüsüne tıklayın.
2.  **Paylaş** (Share) -> **Web'de Yayınla** (Publish to web) seçeneğine tıklayın.
3.  Açılan kutuda **"Web sayfası"** (Web page) yazan yeri **"Virgülle ayrılmış değerler (.csv)"** (Comma-separated values) olarak değiştirin.
4.  **Yayınla** (Publish) butonuna tıklayın.
5.  Size bir link verecek. **BU LİNKİ KOPYALAYIN.**

---

## 🎯 ADIM 4: Linki Siteye Ekleyin

1.  Masaüstündeki `script.js` dosyasını açın (Not Defteri ile açabilirsiniz).
2.  En üstte şu satırı bulun:
    ```javascript
    const GOOGLE_SHEET_CSV_URL = "";
    ```
3.  Tırnak işaretlerinin arasına kopyaladığınız linki yapıştırın.
    ```javascript
    const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/...../pub?output=csv";
    ```
4.  Dosyayı kaydedin.

---

## 🚀 SON ADIM: Güncelleme

1.  `script.js` dosyasını kaydettikten sonra.
2.  `index.html`, `styles.css` ve güncel `script.js` dosyasını **Netlify'a tekrar sürükleyip bırakın.**

Artık sitenizdeki podcast'ler **otomatik olarak** bu tablodan gelecek! Yeni bir bölüm eklemek istediğinizde sadece tabloya yeni satır eklemeniz yeterli. Siteniz (sayfa yenilendiğinde) otomatik güncellenecek! 🎉
