// ===================================
// GERÇEK ZAMANLI ZİYARETÇİ SAYACI
// ===================================

// CountAPI.xyz - Ücretsiz sayaç servisi
const COUNTER_NAMESPACE = 'ekopodcast';
const COUNTER_KEY = 'site-visits';
const COUNTER_API = `https://api.countapi.xyz`;

// Sayfa yüklendiğinde ziyaretçi sayısını artır
async function incrementVisitorCount() {
    try {
        const response = await fetch(`${COUNTER_API}/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
        const data = await response.json();

        if (data.value) {
            console.log('✅ Ziyaretçi sayısı güncellendi:', data.value);

            // localStorage'a da kaydet (yedek)
            siteStats.totalVisits = data.value;
            localStorage.setItem('siteStats', JSON.stringify(siteStats));

            // Sayfada göster (varsa)
            updateVisitorDisplay(data.value);
        }
    } catch (error) {
        console.warn('⚠️ Ziyaretçi sayacı güncellenemedi:', error);
        // Hata durumunda localStorage kullan
        siteStats.totalVisits += 1;
        localStorage.setItem('siteStats', JSON.stringify(siteStats));
    }
}

// Mevcut ziyaretçi sayısını al (göstermek için)
async function getVisitorCount() {
    try {
        const response = await fetch(`${COUNTER_API}/get/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
        const data = await response.json();

        if (data.value) {
            console.log('📊 Toplam ziyaretçi:', data.value);
            updateVisitorDisplay(data.value);
            return data.value;
        }
    } catch (error) {
        console.warn('⚠️ Ziyaretçi sayısı alınamadı:', error);
        return siteStats.totalVisits;
    }
}

// Sayacı sıfırla (sadece admin için)
async function resetVisitorCount() {
    if (!confirm('Ziyaretçi sayacını sıfırlamak istediğinize emin misiniz?')) {
        return;
    }

    try {
        const response = await fetch(`${COUNTER_API}/set/${COUNTER_NAMESPACE}/${COUNTER_KEY}?value=0`);
        const data = await response.json();

        if (data.value !== undefined) {
            alert('✅ Ziyaretçi sayacı sıfırlandı!');
            updateVisitorDisplay(0);
        }
    } catch (error) {
        alert('❌ Sayaç sıfırlanamadı: ' + error.message);
    }
}

// Ziyaretçi sayısını sayfada göster
function updateVisitorDisplay(count) {
    // Footer'a ziyaretçi sayısı ekle
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom && count) {
        const visitorText = ` • 👥 ${count.toLocaleString('tr-TR')} ziyaretçi`;
        if (!footerBottom.textContent.includes('ziyaretçi')) {
            footerBottom.textContent += visitorText;
        }
    }
}

// Sayfa yüklendiğinde çalıştır
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        // Ziyaretçi sayısını artır
        incrementVisitorCount();
    });
}
