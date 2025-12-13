# EkoPodcast Email Bildirim Sistemi Kurulumu

Artık yeni podcast yüklediğinizde üyelerinize toplu email gönderebilirsiniz. Bu sistem **EmailJS** ücretsiz servisini kullanır.

## 1. EmailJS Hesabı Oluşturma (Ücretsiz)
1. [EmailJS.com](https://www.emailjs.com/) adresine gidin ve "Sign Up Free" diyerek üye olun.
2. Giriş yaptıktan sonra **"Add New Service"** butonuna tıklayın.
   - **Gmail**'i seçin (veya kullandığınız başka bir servisi).
   - "Connect Account" diyerek izin verin.
   - **Service ID**'yi not edin (Örn: `service_xyz123`).

## 2. Email Şablonu Oluşturma
1. Sol menüden **"Email Templates"** sekmesine gidin.
2. **"Create New Template"** butonuna tıklayın.
3. Şablon tasarımını yapın. Aşağıdaki değişkenleri kullanabilirsiniz:
   - `{{title}}` : Podcast Başlığı
   - `{{description}}` : Podcast Açıklaması
   - `{{link}}` : Web sitesi linki
   - `{{duration}}` : Süre
4. Örnek Şablon Konusu: `Yeni Podcast: {{title}}`
5. Örnek İçerik:
   ```text
   Merhaba,
   EkoPodcast'te yeni bir bölüm yayınlandı!
   
   Başlık: {{title}}
   Süre: {{duration}} dakika
   
   {{description}}
   
   Dinlemek için: {{link}}
   ```
6. "Save" (Kaydet) diyin ve **Template ID**'yi not edin (Örn: `template_abc456`).

## 3. Public Key Alma
1. Sol menüden **"Account"** (veya isminize tıklayın) -> **"Public Key"** bölümüne bakın.
2. **Public Key**'inizi not edin (Örn: `user_Kjsd7...`).

## 4. Yönetim Paneline Tanımlama
1. `admin-panel.html` dosyasını açın (tarayıcıda).
2. Üst menüde **"📧 Email Ayarları"** butonuna tıklayın.
3. Aldığınız bilgileri girin:
   - Public Key
   - Service ID
   - Template ID
4. **Kaydet** butonuna basın.

## 5. Abone Ekleme
1. Yine "Email Ayarları" menüsünden **"Abone Yönetimi"** kısmına gelin.
2. Üyelerinizin email adreslerini tek tek ekleyebilirsiniz.
3. Bu liste GitHub üzerinde `subscribers.json` dosyasında saklanır, yani kalıcıdır.

## 6. Kullanım
Yeni bir podcast yüklediğinizde sistem size "Bildirim göndermek ister misiniz?" diye soracaktır. Ayrıca "Bildir" butonuna tıklayarak istediğiniz zaman mail gönderebilirsiniz.

**Sınırlamalar:**
- EmailJS ücretsiz paketi aylık 200 email ile sınırlıdır.
- Eğer 50 aboneniz varsa, ayda 4 podcast bildirimi gönderebilirsiniz.
