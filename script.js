// ===================================
// DATA MANAGEMENT
// ===================================

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

// Category names in Turkish
const categoryNames = {
    'makroekonomi': 'Makroekonomi',
    'piyasa': 'Piyasa Analizi',
    'roportaj': 'Röportaj',
    'kripto': 'Kripto Para',
    'finans': 'Kişisel Finans',
    'yatirim': 'Yatırım Stratejileri'
};

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', async function () {
    await loadPodcastsFromSheet(); // Google Sheets'ten verileri çek
    checkUserSession();
});

// Veri Çekme Fonksiyonu (Önce JSON, sonra Google Sheets, en son varsayılan)
async function loadPodcastsFromSheet() {
    // 1. Yöntem: data.json dosyasını dene (CMS'ten gelen veriler)
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            const jsonData = await response.json();
            if (jsonData && jsonData.podcasts && jsonData.podcasts.length > 0) {
                podcasts = jsonData.podcasts;
                console.log("data.json'dan veriler başarıyla çekildi:", podcasts);
                loadPodcasts();
                return;
            }
        }
    } catch (error) {
        console.log("data.json okunamadı, Google Sheets deneniyor...");
    }

    // 2. Yöntem: Google Sheets CSV
    if (GOOGLE_SHEET_CSV_URL) {
        try {
            const response = await fetch(GOOGLE_SHEET_CSV_URL);
            const data = await response.text();
            const parsedPodcasts = parseCSV(data);

            if (parsedPodcasts && parsedPodcasts.length > 0) {
                podcasts = parsedPodcasts;
                console.log("Google Sheets'ten veriler başarıyla çekildi:", podcasts);
                loadPodcasts();
                return;
            }
        } catch (error) {
            console.error("Google Sheets verisi çekilemedi:", error);
        }
    }

    // 3. Yöntem: Varsayılan veriler (Hiçbir şey çalışmazsa)
    console.log("Harici veri kaynağı bulunamadı, varsayılan veriler kullanılıyor.");
    loadPodcasts();
}

// CSV Formatını JSON'a Çevirme (Basit Parser)
function parseCSV(csvText) {
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
            <div class="podcast-info">
                <span class="podcast-category">${categoryName}</span>
                <h3 class="podcast-title">${podcast.title}</h3>
                <p class="podcast-description">${podcast.description}</p>
                <div class="podcast-meta">
                    <div class="podcast-meta-item">
                        <svg class="podcast-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke-width="2"/>
                            <polyline points="12 6 12 12 16 14" stroke-width="2"/>
                        </svg>
                        <span>${podcast.duration} dk</span>
                    </div>
                    <div class="podcast-meta-item">
                        <svg class="podcast-meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                            <circle cx="12" cy="12" r="3" stroke-width="2"/>
                        </svg>
                        <span>${podcast.listens}</span>
                    </div>
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

    playerContent.innerHTML = `
        <div class="player-container">
            ${warningHtml}
            <div class="player-header">
                <div class="player-thumbnail">
                    <svg style="width: 100%; height: 100%; opacity: 0.2;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke-width="2"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke-width="2"/>
                        <line x1="12" y1="19" x2="12" y2="22" stroke-width="2"/>
                    </svg>
                </div>
                <div class="player-details">
                    <span class="player-category">${categoryName}</span>
                    <h2 class="player-title">${podcast.title}</h2>
                    <p class="player-description">${podcast.description}</p>
                    <div class="player-meta">
                        <span>⏱️ ${podcast.duration} dakika</span>
                        <span>👁️ ${podcast.listens} dinlenme</span>
                        <span>📅 ${new Date(podcast.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
            </div>
            <div class="player-audio">
                <audio controls>
                    <source src="${podcast.audioUrl}" type="audio/mpeg">
                    Tarayıcınız ses dosyasını desteklemiyor.
                </audio>
            </div>
            <div class="comments-section">
                <h3 class="comments-title">Yorumlar (${podcastComments.length})</h3>
                ${commentFormHtml}
                <div class="comment-list">
                    ${commentsHtml}
                </div>
            </div>
        </div>
    `;

    showModal('playerModal');
}

function closePlayerModal() {
    closeModal('playerModal');
}

// ===================================
// COMMENTS
// ===================================

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

function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;

    currentUser = { email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeModal('registerModal');
    updateAuthUI();
    alert('Başarıyla üye oldunuz!');
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
        id: podcasts.length + 1,
        title: document.getElementById('podcastTitle').value,
        description: document.getElementById('podcastDescription').value,
        category: document.getElementById('podcastCategory').value,
        duration: parseInt(document.getElementById('podcastDuration').value),
        date: new Date().toISOString().split('T')[0],
        listens: 0,
        featured: false,
        audioUrl: document.getElementById('podcastAudio').value
    };

    podcasts.unshift(newPodcast);

    closeModal('adminModal');
    loadPodcasts();

    alert('Podcast başarıyla yüklendi!');
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
