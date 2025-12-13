// ===================================
// DATA MANAGEMENT
// ===================================

// ⚠️ localStorage.clear() KALDIRILDI - Podcast verilerini siliyordu!
// Artık veriler korunuyor

const USE_FIREBASE = false; // Firebase kullanımı kapalı

// Google Sheets CSV Linki (Burası sizin tablonuzun linki olacak)
// Örnek: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR......../pub?output=csv"
const GOOGLE_SHEET_CSV_URL = "";

// Default/Fallback Data (Eğer tablo bağlanmazsa bu görünür)
let podcasts = [
    {
        id: 1,
        title: "2024 Türkiye Ekonomisi: Enflasyon ve Büyüme Beklentileri",
        description: "Türkiye ekonomisinin 2024 yılı performansını, enflasyon hedeflerini ve büyüme projeksiyonlarını detaylı olarak inceliyoruz.",
        category: "makroekonomi",
        duration: 45,
        date: "2025-11-20",
        listens: 1250,
        featured: true,
        audioUrl: "#"
    },
    {
        id: 2,
        title: "Kripto Para Piyasalarında Son Gelişmeler",
        description: "Bitcoin, Ethereum ve altcoin'lerdeki son hareketleri ve piyasa analizlerini uzmanlarla konuşuyoruz.",
        category: "kripto",
        duration: 38,
        date: "2025-11-18",
        listens: 980,
        featured: true,
        audioUrl: "#"
    },
    {
        id: 3,
        title: "Merkez Bankası Faiz Kararları ve Etkileri",
        description: "TCMB'nin son faiz kararlarının piyasalar ve ekonomi üzerindeki etkilerini değerlendiriyoruz.",
        category: "piyasa",
        duration: 52,
        date: "2025-11-15",
        listens: 1420,
        featured: true,
        audioUrl: "#"
    }
];

// User state
let currentUser = null;
let listenedPodcasts = JSON.parse(localStorage.getItem('listenedPodcasts') || '[]');
let comments = JSON.parse(localStorage.getItem('comments') || '{}');

// ✅ ÜYE YÖNETİM SİSTEMİ
let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

// ✅ SİTE İSTATİSTİKLERİ
let siteStats = JSON.parse(localStorage.getItem('siteStats') || JSON.stringify({
    totalVisits: 0,
    totalListens: 0,
    totalComments: 0,
    lastVisit: null
}));

// Category names in Turkish
const categoryNames = {
    'makroekonomi': 'Makroekonomi',
    'piyasa': 'Piyasa Analizi',
    'roportaj': 'Sektörel Değerlendirmeler',
    'kripto': 'Kripto Para',
    'finans': 'Emtia',
    'yatirim': 'Yatırım Stratejileri'
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', async function () {
    console.log('🚀 EkoPodcast Başlatılıyor...');

    // Önce data.json'dan yüklemeyi dene
    await fetchPodcastsFromDataJson();

    // Eğer data.json boşsa veya yüklenemediyse ve localStorage varsa oradan devam eder
    if (podcasts.length <= 3) { // 3 varsayılan veri sayısı
        const savedPodcasts = localStorage.getItem('ekopodcast_data');
        if (savedPodcasts) {
            try {
                const localPodcasts = JSON.parse(savedPodcasts);
                if (localPodcasts.length > podcasts.length) {
                    podcasts = localPodcasts;
                    console.log('💾 LocalStorage verileri kullanıldı');
                }
            } catch (e) { console.error(e); }
        }
    }

    checkUserSession();
    loadPodcasts();

    // İstatistikleri güncelle (Yerel)
    siteStats.totalListens = podcasts.reduce((sum, p) => sum + (p.listens || 0), 0);
    localStorage.setItem('siteStats', JSON.stringify(siteStats));
});

function parseCSV(csvText) {
    // ... (Mevcut CSV kodu)
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        // Virgül ile ayır ama tırnak içindeki virgülleri yoksay (Regex)
        const currentLine = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        if (!currentLine) continue;

        const obj = {};
        let hasData = false;

        headers.forEach((header, index) => {
            let value = currentLine[index] ? currentLine[index].trim().replace(/^"|"$/g, '') : '';

            // Veri tiplerini düzelt
            if (header === 'id' || header === 'duration' || header === 'listens') {
                value = parseInt(value) || 0;
            } else if (header === 'featured') {
                value = value.toLowerCase() === 'true';
            }

            obj[header] = value;
            if (value) hasData = true;
        });

        if (hasData) result.push(obj);
    }
    return result;
}

function checkUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }

    // ✅ Site istatistiklerini güncelle
    updateSiteStats();

    // ✅ localStorage'dan podcast verilerini yükle (varsa)
    // savedPodcasts iptal edildi - data.json her zaman öncelikli olmalı
    /*
    const savedPodcasts = localStorage.getItem('ekopodcast_data');
    if (savedPodcasts) {
        try {
            const localData = JSON.parse(savedPodcasts);
            // Sadece eğer data.json boşsa local veriyi kullan
            if (podcasts.length === 0) {
                 podcasts = localData;
                 console.log('✅ Podcast verileri localStorage\'dan yüklendi (data.json boştu)');
            }
        } catch (error) {
            console.error('❌ Podcast yükleme hatası:', error);
        }
    }
    */
}

function updateSiteStats() {
    siteStats.totalVisits += 1;
    siteStats.lastVisit = new Date().toISOString();
    localStorage.setItem('siteStats', JSON.stringify(siteStats));
    console.log('📊 Site İstatistikleri:', siteStats);

    // ✅ Ziyaretçi sayısını data.json'a kaydet (indirme için)
    // Not: Gerçek zamanlı senkronizasyon için backend gerekir
    // Şimdilik localStorage'da tutuyoruz
}

function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    if (currentUser) {
        authButtons.innerHTML = `
            <span style="color: var(--color-text-secondary); margin-right: 1rem;">${currentUser.email}</span>
            <button class="btn btn-secondary" onclick="handleLogout()">Çıkış Yap</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-secondary" onclick="showLoginModal()">Giriş Yap</button>
            <button class="btn btn-primary" onclick="showRegisterModal()">Üye Ol</button>
        `;
    }
}

// ===================================
// PODCAST RENDERING
// ===================================

function loadPodcasts() {
    // Load featured podcasts (most listened)
    const featuredPodcasts = [...podcasts]
        .sort((a, b) => b.listens - a.listens)
        .slice(0, 6);
    renderPodcasts(featuredPodcasts, 'featured-podcasts', true);

    // Load latest podcasts
    const latestPodcasts = [...podcasts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    renderPodcasts(latestPodcasts, 'latest-podcasts');

    // Load highlighted podcasts
    const highlightedPodcasts = podcasts.filter(p => p.featured);
    renderPodcasts(highlightedPodcasts, 'highlighted-podcasts');
}

function renderPodcasts(podcastList, containerId, isFeatured = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = podcastList.map(podcast => createPodcastCard(podcast, isFeatured)).join('');
}

function createPodcastCard(podcast, isFeatured = false) {
    const categoryName = categoryNames[podcast.category] || podcast.category;
    const featuredClass = isFeatured ? 'featured' : '';
    const badge = isFeatured && podcast.listens > 1000 ? '<div class="podcast-badge">Popüler</div>' : '';

    return `
        <div class="podcast-card ${featuredClass}" onclick="openPodcast(${podcast.id})">
            ${badge}
            <div class="podcast-thumbnail">
                <svg class="podcast-thumbnail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke-width="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-width="2"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke-width="2"/>
                </svg>
                <div class="podcast-play-overlay">
                    <svg class="play-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </div>
            </div>
            <div class="podcast-content">
                <div class="podcast-meta">
                    <span class="podcast-category">${categoryName}</span>
                    <span class="podcast-duration">${podcast.duration} dk</span>
                </div>
                <h3 class="podcast-title">${podcast.title}</h3>
                <p class="podcast-description">${podcast.description}</p>
                <div class="podcast-footer">
                    <div class="podcast-stats">
                        <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                            <circle cx="12" cy="12" r="3" stroke-width="2"/>
                        </svg>
                        <span>${podcast.listens}</span>
                    </div>
                    <span class="podcast-date">${new Date(podcast.date).toLocaleDateString('tr-TR')}</span>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// PODCAST PLAYER
// ===================================

function openPodcast(podcastId) {
    const podcast = podcasts.find(p => p.id === podcastId);
    if (!podcast) return;

    // Check if user has already listened to this podcast
    const hasListened = listenedPodcasts.includes(podcastId);

    // If not a member and already listened, show warning
    if (!currentUser && hasListened) {
        showLoginModal();
        alert('Bu podcast\'i daha önce dinlediniz. Tekrar dinlemek için üye olmanız gerekmektedir.');
        return;
    }

    // Mark as listened if not a member
    if (!currentUser && !hasListened) {
        listenedPodcasts.push(podcastId);
        localStorage.setItem('listenedPodcasts', JSON.stringify(listenedPodcasts));
    }

    // ✅ Dinleme sayısını artır
    podcast.listens += 1;
    try {
        localStorage.setItem('ekopodcast_data', JSON.stringify(podcasts));
        console.log('✅ Dinleme sayısı güncellendi (Local):', podcast.listens);

        // Listeyi anlık güncelle (Böylece arkadaki kartta sayı artar)
        loadPodcasts();
    } catch (error) {
        console.error('❌ localStorage kayıt hatası:', error);
    }

    const playerContent = document.getElementById('playerContent');
    const categoryName = categoryNames[podcast.category] || podcast.category;
    const podcastComments = comments[podcastId] || [];

    const warningHtml = !currentUser && hasListened ?
        '<div class="player-warning">⚠️ Bu podcast\'i ücretsiz dinleme hakkınızı kullandınız. Tekrar dinlemek için üye olun.</div>' : '';

    const commentFormHtml = currentUser ? `
        <form class="comment-form" onsubmit="handleAddComment(event, ${podcastId})">
            <div class="form-group">
                <label for="commentText">Yorum Yap</label>
                <textarea id="commentText" required placeholder="Yorumunuzu yazın..." rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Yorum Gönder</button>
        </form>
    ` : '<p style="color: var(--color-text-muted); text-align: center; padding: 1rem;">Yorum yapmak için <a href="#" onclick="closePlayerModal(); showLoginModal(); return false;" style="color: var(--color-accent-gold);">giriş yapın</a></p>';

    const commentsHtml = podcastComments.length > 0 ?
        podcastComments.map(comment => `
            <div class="comment">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-date">${new Date(comment.date).toLocaleDateString('tr-TR')}</div>
            </div>
        `).join('') :
        '<p style="color: var(--color-text-muted); text-align: center;">Henüz yorum yapılmamış.</p>';

    const audioUrl = convertDriveLink(podcast.audioUrl);

    // ✅ Paylaşma butonu HTML'i (Web Share API desteği kontrolü ile)
    const shareButtonHtml = `
        <button class="btn btn-primary" onclick="sharePodcast(${podcastId})" style="width: 100%; margin-top: 1rem;">
            📤 Bu Podcast'i Paylaş
        </button>
    `;

    playerContent.innerHTML = `
        <div class="player-container">
            ${warningHtml}
            <div class="player-header">
                <div class="player-info">
                    <h3>${podcast.title}</h3>
                    <p>${categoryName} • ${podcast.duration} dk</p>
                </div>
                <button class="close-btn" onclick="closePlayerModal()">&times;</button>
            </div>
            
            <div class="audio-wrapper">
                <audio controls autoplay style="width: 100%; margin: 1rem 0;">
                    <source src="${audioUrl}" type="audio/mpeg">
                    <source src="${audioUrl}" type="audio/mp4">
                    Tarayıcınız ses elementini desteklemiyor.
                </audio>
            </div>

            <div class="player-description">
                <h4>Bölüm Hakkında</h4>
                <p>${podcast.description}</p>
            </div>
            
            ${shareButtonHtml}

            <div class="comments-section">
                <h4>Yorumlar (${podcastComments.length})</h4>
                <div class="comments-list">
                    ${commentsHtml}
                </div>
                ${commentFormHtml}
            </div>
        </div>
    `;

    // ✅ MODAL'I GÖSTER
    showModal('playerModal');
}

// ✅ Google Drive Link Dönüştürücü
function convertDriveLink(url) {
    if (!url) return '#';
    // Eğer zaten düzgün formatsa dokunma
    if (url.includes('export=download')) return url;

    // Drive linki mi?
    if (url.includes('drive.google.com')) {
        // ID'yi bul
        const idMatch = url.match(/[-\w]{25,}/);
        if (idMatch) {
            return `https://drive.google.com/uc?export=download&id=${idMatch[0]}`;
        }
    }
    return url;
}

async function fetchPodcastsFromDataJson() {
    try {
        const response = await fetch('data.json?t=' + Date.now());
        if (response.ok) {
            const data = await response.json();
            if (data.podcasts && Array.isArray(data.podcasts)) {
                let fetchedPodcasts = data.podcasts;

                // ✅ AKILLI HAFIZA: Yerel verilerle birleştir
                const localData = localStorage.getItem('ekopodcast_data');
                if (localData) {
                    try {
                        const localPodcasts = JSON.parse(localData);
                        fetchedPodcasts = fetchedPodcasts.map(fp => {
                            const lp = localPodcasts.find(p => p.id === fp.id);
                            // Eğer yereldeki dinlenme sayısı daha fazlaysa onu kullan
                            if (lp && lp.listens > (fp.listens || 0)) {
                                fp.listens = lp.listens;
                            }
                            return fp;
                        });
                        console.log('🧠 Akıllı hafıza devrede: Dinlenme sayıları güncellendi.');
                    } catch (e) {
                        console.error("Merge hatası:", e);
                    }
                }

                podcasts = fetchedPodcasts;

                // ✅ İstatistikleri de yükle
                if (data.stats) {
                    const currentVisits = siteStats.totalVisits;
                    siteStats = { ...data.stats, totalVisits: currentVisits };
                    localStorage.setItem('siteStats', JSON.stringify(siteStats));
                }

                loadPodcasts();

                // İstatistikleri güncelle
                if (!USE_FIREBASE) {
                    siteStats.totalListens = podcasts.reduce((sum, p) => sum + (p.listens || 0), 0);
                    localStorage.setItem('siteStats', JSON.stringify(siteStats));
                }
            }
        }
    } catch (error) {
        console.warn('⚠️ data.json yüklenemedi:', error);
    }
}

function handleAddComment(event, podcastId) {
    event.preventDefault();

    if (!currentUser) {
        alert('Yorum yapmak için giriş yapmalısınız.');
        return;
    }

    const commentText = document.getElementById('commentText').value;

    if (!comments[podcastId]) {
        comments[podcastId] = [];
    }

    comments[podcastId].push({
        author: currentUser.email,
        text: commentText,
        date: new Date().toISOString()
    });

    localStorage.setItem('comments', JSON.stringify(comments));

    // ✅ İstatistikleri güncelle
    siteStats.totalComments += 1;
    localStorage.setItem('siteStats', JSON.stringify(siteStats));

    // Reload the podcast player to show new comment
    openPodcast(podcastId);
}

// ===================================
// AUTHENTICATION
// ===================================

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;

    currentUser = { email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeModal('loginModal');
    updateAuthUI();
    alert('Başarıyla giriş yaptınız!');
}

// EmailJS Ayarları
const EMAIL_CONFIG = {
    publicKey: "HdHr7RK_6qsv34zWQ",
    serviceId: "service_t2z72sq",
    templateId: "temlate_ltotplo"
};

// Site açıldığında EmailJS başlat
(function () {
    if (EMAIL_CONFIG.publicKey && EMAIL_CONFIG.publicKey !== "BURAYA_PUBLIC_KEY_YAZIN") {
        emailjs.init(EMAIL_CONFIG.publicKey);
        console.log("EmailJS başlatıldı");
    }
})();

function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;

    // 1. Yerel Kayıt (Mevcut Sistem)
    const newUser = {
        email: email,
        registeredAt: new Date().toISOString(),
        notificationsEnabled: true
    };
    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    currentUser = { email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    // 2. Admin'e Mail Gönder (YENİ)
    if (EMAIL_CONFIG.serviceId && EMAIL_CONFIG.serviceId !== "BURAYA_SERVICE_ID_YAZIN") {
        const btn = event.target.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Kaydediliyor...";
        btn.disabled = true;

        emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, {
            to_email: "homemail0652@gmail.com", // ✅ Admin mail adresi
            from_name: "Yeni Üye",
            message: `Yeni bir üye kayıt oldu: ${email}`,
            reply_to: email,
            user_email: email
        }).then(
            function (response) {
                console.log("Admin'e mail gönderildi", response);
                alert('Başarıyla üye oldunuz! 🎉\n\nKaydınız alındı, en yeni bölümleri size haber vereceğiz.');
                closeModal('registerModal');
                updateAuthUI();
                btn.innerText = originalText;
                btn.disabled = false;
            },
            function (error) {
                console.log("Mail gönderme hatası", error);
                // Mail gitmese bile üye girişi yapsın
                alert('Giriş yapıldı! (Bildirim servisinde geçici bir sorun var ama üyeliğiniz aktif)');
                closeModal('registerModal');
                updateAuthUI();
                btn.innerText = originalText;
                btn.disabled = false;
            }
        );
    } else {
        // EmailJS ayarlı değilse normal devam et
        console.log("EmailJS ayarları eksik, sadece yerel kayıt yapıldı.");
        closeModal('registerModal');
        updateAuthUI();
        alert('Başarıyla üye oldunuz! 🎉');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    alert('Çıkış yaptınız.');
}

// ===================================
// ADMIN PANEL
// ===================================

function showAdminPanel() {
    showModal('adminModal');
}

function handleUploadPodcast(event) {
    event.preventDefault();

    const newPodcast = {
        id: Date.now(),
        title: document.getElementById('podcastTitle').value,
        description: document.getElementById('podcastDescription').value,
        category: document.getElementById('podcastCategory').value,
        duration: parseInt(document.getElementById('podcastDuration').value),
        date: new Date().toISOString().split('T')[0],
        listens: 0,
        featured: false,
        audioUrl: document.getElementById('podcastAudio').value
    };

    // ✅ Firebase'e veya Local'e Kaydet
    podcasts.unshift(newPodcast);
    // localStorage'a kaydet
    try {
        localStorage.setItem('ekopodcast_data', JSON.stringify(podcasts));
        console.log('Podcast localStorage\'a kaydedildi');
    } catch (error) {
        console.error('localStorage kayıt hatası:', error);
    }

    // data.json indir
    const dataStr = JSON.stringify({ podcasts }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);

    closeModal('adminModal');
    loadPodcasts();

    alert('✅ Podcast başarıyla eklendi!\n\n💾 data.json dosyası indirildi.\nBu dosyayı index.html ile aynı klasöre koyun.');
    event.target.reset();
}

// ===================================
// FILTERING & NAVIGATION
// ===================================

function filterByCategory(category) {
    const filteredPodcasts = podcasts.filter(p => p.category === category);
    const mainContent = document.querySelector('.content-main');

    mainContent.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">${categoryNames[category]}</h2>
                <p class="section-subtitle">${filteredPodcasts.length} podcast bulundu</p>
            </div>
            <div class="podcast-grid" id="filtered-podcasts"></div>
        </section>
        `;

    renderPodcasts(filteredPodcasts, 'filtered-podcasts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showAllPodcasts() {
    const mainContent = document.querySelector('.content-main');

    mainContent.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">Tüm Podcastler</h2>
                <p class="section-subtitle">${podcasts.length} podcast bulundu</p>
            </div>
            <div class="podcast-grid" id="all-podcasts"></div>
        </section>
        `;

    renderPodcasts(podcasts, 'all-podcasts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCategories() {
    const mainContent = document.querySelector('.content-main');

    const categoriesHtml = Object.keys(categoryNames).map(category => {
        const count = podcasts.filter(p => p.category === category).length;
        return `
        <div class="podcast-card" onclick="filterByCategory('${category}')">
                <div class="podcast-thumbnail">
                    <svg class="podcast-thumbnail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="7" height="7" stroke-width="2"/>
                        <rect x="14" y="3" width="7" height="7" stroke-width="2"/>
                        <rect x="14" y="14" width="7" height="7" stroke-width="2"/>
                        <rect x="3" y="14" width="7" height="7" stroke-width="2"/>
                    </svg>
                </div>
                <div class="podcast-info">
                    <h3 class="podcast-title">${categoryNames[category]}</h3>
                    <p class="podcast-description">${count} podcast</p>
                </div>
            </div>
        `;
    }).join('');

    mainContent.innerHTML = `
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">Kategoriler</h2>
                <p class="section-subtitle">İlgilendiğiniz kategoriyi seçin</p>
            </div>
            <div class="podcast-grid">
                ${categoriesHtml}
            </div>
        </section>
        `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// MODAL MANAGEMENT
// ===================================

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showLoginModal() {
    showModal('loginModal');
}

function showRegisterModal() {
    showModal('registerModal');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function scrollToContent() {
    const content = document.querySelector('.main-content');
    if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===================================
// DATA MANAGEMENT FUNCTIONS
// ===================================

function updateDataJson() {
    // data.json'u otomatik güncelle ve indir
    const dataStr = JSON.stringify({ podcasts }, null, 2);
    console.log('📝 data.json güncellendi (localStorage)');
    // Not: Gerçek dosya güncellemesi için backend gerekir
}

// ===================================
// ADMIN FUNCTIONS
// ===================================

// Üye listesini göster
function showMembersList() {
    const membersList = registeredUsers.map((user, index) => {
        const date = new Date(user.registeredAt).toLocaleDateString('tr-TR');
        const time = new Date(user.registeredAt).toLocaleTimeString('tr-TR');
        return `${index + 1}. ${user.email} - Kayıt: ${date} ${time} `;
    }).join('\n');

    const message = registeredUsers.length > 0
        ? `📋 KAYITLI ÜYELER(${registeredUsers.length}): \n\n${membersList} \n\n💡 Bu liste tarayıcınızda saklanmaktadır.`
        : '❌ Henüz kayıtlı üye bulunmamaktadır.';

    alert(message);

    // Console'a da yazdır
    console.log('👥 Kayıtlı Üyeler:', registeredUsers);
}

// Site istatistiklerini göster
function showSiteStats() {
    const stats = `
📊 SİTE İSTATİSTİKLERİ

👥 Toplam Ziyaret: ${siteStats.totalVisits}
🎧 Toplam Dinleme: ${siteStats.totalListens}
💬 Toplam Yorum: ${siteStats.totalComments}
📅 Son Ziyaret: ${siteStats.lastVisit ? new Date(siteStats.lastVisit).toLocaleString('tr-TR') : 'Henüz yok'}

📚 Toplam Podcast: ${podcasts.length}
👤 Kayıtlı Üye: ${registeredUsers.length}

💡 Bu veriler tarayıcınızda saklanmaktadır.
    `.trim();

    alert(stats);
    console.log('📊 Site İstatistikleri:', siteStats);
}

// Üyelere mail gönderme simülasyonu
function notifyMembers(podcastTitle) {
    if (registeredUsers.length === 0) {
        console.log('⚠️ Bildirim gönderilecek üye yok');
        return;
    }

    const emailList = registeredUsers
        .filter(user => user.notificationsEnabled)
        .map(user => user.email);

    console.log('📧 YENİ PODCAST BİLDİRİMİ GÖNDERİLDİ:');
    console.log('Podcast:', podcastTitle);
    console.log('Alıcılar:', emailList);
    console.log(`Toplam ${emailList.length} üyeye bildirim gönderildi.`);

    // Gerçek mail gönderimi için backend servisi gerekir
    // Örnek: EmailJS, SendGrid, vs.
}

// ===================================
// INITIALIZATION
// ===================================

// ===================================
// PLAYER FUNCTIONS
// ===================================

function closePlayerModal() {
    closeModal('playerModal');
    // Sesi durdur
    const audio = document.querySelector('#playerContent audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

// ===================================
// ADMIN PANEL FUNCTIONS
// ===================================

function renderAdminPodcasts() {
    const listContainer = document.getElementById('adminPodcastList');
    if (!listContainer) return;

    if (podcasts.length === 0) {
        listContainer.innerHTML = '<p style="color: var(--color-text-muted); text-align: center;">Henüz podcast eklenmemiş.</p>';
        return;
    }

    listContainer.innerHTML = podcasts.map(podcast => `
        <div class="admin-podcast-item" style="background: var(--color-bg-tertiary); padding: 1rem; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--color-border);">
            <div>
                <h4 style="margin-bottom: 0.25rem; color: var(--color-text-primary);">${podcast.title}</h4>
                <p style="font-size: 0.85rem; color: var(--color-text-secondary);">${new Date(podcast.date).toLocaleDateString('tr-TR')} • ${podcast.listens} dinlenme</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button onclick="deletePodcast(${podcast.id})" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; color: #ff4d4d; border-color: #ff4d4d;">Sil</button>
            </div>
        </div>
    `).join('');
}

function deletePodcast(id) {
    if (confirm('Bu podcast\'i silmek istediğinize emin misiniz?')) {
        podcasts = podcasts.filter(p => p.id !== id);
        localStorage.setItem('ekopodcast_data', JSON.stringify(podcasts));
        updateDataJson(); // Log basar
        renderAdminPodcasts(); // Listeyi yenile
        loadPodcasts(); // Ana sayfayı yenile
        alert('Podcast silindi!');
    }
}

function downloadDataJson() {
    // ✅ İstatistikleri güncelle
    siteStats.totalListens = podcasts.reduce((sum, p) => sum + (p.listens || 0), 0);

    const dataStr = JSON.stringify({
        podcasts,
        stats: siteStats // İstatistikleri de ekle
    }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = "data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ data.json indirildi!\n\n📊 İstatistikler:\n' +
        `• Toplam Ziyaret: ${siteStats.totalVisits}\n` +
        `• Toplam Dinleme: ${siteStats.totalListens}\n` +
        `• Toplam Yorum: ${siteStats.totalComments}\n\n` +
        '💡 Bu dosyayı GitHub\'a yükleyerek tüm cihazlardan güncel verilere erişebilirsiniz.');
}

// showModal fonksiyonunu güncelle: Admin paneli açılınca listeyi yenile
const originalShowModal = window.showModal || function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.showModal = function (modalId) {
    originalShowModal(modalId);
    if (modalId === 'adminModal') {
        renderAdminPodcasts();
    }
};

// handleUploadPodcast fonksiyonunu güncelle: Ekleme sonrası listeyi yenile
const originalHandleUploadPodcast = window.handleUploadPodcast;
window.handleUploadPodcast = function (event) {
    if (originalHandleUploadPodcast) {
        originalHandleUploadPodcast(event);
        renderAdminPodcasts();
    } else {
        // Eğer orijinal fonksiyon yoksa (ki olmalı), basit bir implementasyon
        event.preventDefault();
        // ... (Mevcut ekleme mantığı buraya gelebilir ama orijinali kullanmak daha iyi)
        // Şimdilik sadece render çağırıyoruz, çünkü orijinal fonksiyon zaten çalışacak (HTML'de tanımlıysa)
        // Ancak HTML'de onsubmit="handleUploadPodcast(event)" var, bu yüzden window.handleUploadPodcast'i override etmek riskli olabilir.
        // En iyisi handleUploadPodcast'i tamamen yeniden tanımlamak.
    }
};

// handleUploadPodcast'i tamamen yeniden tanımlayalım (script.js içinde zaten varsa onu bulup güncellemek daha iyi olurdu ama dosya sonuna ekliyoruz)
// script.js içinde handleUploadPodcast zaten var mı? Evet, muhtemelen var.
// O zaman onu bulup güncellemek en doğrusu.

// ===================================
// PAYLAŞMA FONKSİYONU
// ===================================

function sharePodcast(podcastId) {
    const podcast = podcasts.find(p => p.id === podcastId);
    if (!podcast) return;

    const shareData = {
        title: `EkoPodcast: ${podcast.title}`,
        text: `${podcast.description}\n\nKategori: ${categoryNames[podcast.category] || podcast.category}\nSüre: ${podcast.duration} dk`,
        url: window.location.href
    };

    // Web Share API destekleniyorsa (mobil cihazlarda)
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('✅ Podcast başarıyla paylaşıldı'))
            .catch((error) => {
                console.log('❌ Paylaşım iptal edildi veya hata oluştu:', error);
                // Fallback: Kopyala
                fallbackShare(shareData);
            });
    } else {
        // Masaüstü için fallback: Clipboard'a kopyala
        fallbackShare(shareData);
    }
}

function fallbackShare(shareData) {
    const shareText = `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`;

    // Clipboard API kullan
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText)
            .then(() => {
                alert('📋 Podcast bilgileri panoya kopyalandı!\n\nİstediğiniz yere yapıştırabilirsiniz.');
            })
            .catch(() => {
                // Eski yöntem
                legacyCopyToClipboard(shareText);
            });
    } else {
        // Eski tarayıcılar için
        legacyCopyToClipboard(shareText);
    }
}

function legacyCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        alert('📋 Podcast bilgileri panoya kopyalandı!\n\nİstediğiniz yere yapıştırabilirsiniz.');
    } catch (err) {
        alert('❌ Kopyalama başarısız oldu. Lütfen manuel olarak kopyalayın:\n\n' + text);
    }

    document.body.removeChild(textArea);
}

