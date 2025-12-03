// ===================================
// ADMIN HELPER FUNCTIONS - EkoPodcast
// ===================================

// Bu dosyayı index.html'e ekleyin: <script src="admin-helpers.js"></script>

// Üye listesini göster
window.showMembersList = function () {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    if (registeredUsers.length === 0) {
        alert('❌ Henüz kayıtlı üye bulunmamaktadır.');
        console.log('👥 Kayıtlı Üye Sayısı: 0');
        return;
    }

    const membersList = registeredUsers.map((user, index) => {
        const date = new Date(user.registeredAt).toLocaleDateString('tr-TR');
        const time = new Date(user.registeredAt).toLocaleTimeString('tr-TR');
        return `${index + 1}. ${user.email} - Kayıt: ${date} ${time}`;
    }).join('\n');

    const message = `📋 KAYITLI ÜYELER (${registeredUsers.length}):\n\n${membersList}\n\n💡 Bu liste tarayıcınızda saklanmaktadır.`;

    alert(message);
    console.log('👥 Kayıtlı Üyeler:', registeredUsers);
};

// Site istatistiklerini göster
window.showSiteStats = function () {
    const siteStats = JSON.parse(localStorage.getItem('siteStats') || JSON.stringify({
        totalVisits: 0,
        totalListens: 0,
        totalComments: 0,
        lastVisit: null
    }));

    const podcasts = JSON.parse(localStorage.getItem('ekopodcast_data') || '[]');
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const stats = `📊 SİTE İSTATİSTİKLERİ

👥 Toplam Ziyaret: ${siteStats.totalVisits}
🎧 Toplam Dinleme: ${siteStats.totalListens}
💬 Toplam Yorum: ${siteStats.totalComments}
📅 Son Ziyaret: ${siteStats.lastVisit ? new Date(siteStats.lastVisit).toLocaleString('tr-TR') : 'Henüz yok'}

📚 Toplam Podcast: ${podcasts.length}
👤 Kayıtlı Üye: ${registeredUsers.length}

💡 Bu veriler tarayıcınızda saklanmaktadır.`;

    alert(stats);
    console.log('📊 Site İstatistikleri:', siteStats);
    console.log('📚 Podcast Sayısı:', podcasts.length);
    console.log('👤 Üye Sayısı:', registeredUsers.length);
};

// Tüm verileri dışa aktar
window.exportAllData = function () {
    const allData = {
        podcasts: JSON.parse(localStorage.getItem('ekopodcast_data') || '[]'),
        registeredUsers: JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
        siteStats: JSON.parse(localStorage.getItem('siteStats') || '{}'),
        comments: JSON.parse(localStorage.getItem('comments') || '{}'),
        listenedPodcasts: JSON.parse(localStorage.getItem('listenedPodcasts') || '[]'),
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ekopodcast-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    alert('✅ Tüm veriler dışa aktarıldı!\n\nDosya indirildi.');
    console.log('📦 Dışa Aktarılan Veriler:', allData);
};

// Konsol yardım mesajı
console.log('🎯 EkoPodcast Admin Komutları:');
console.log('  - showMembersList() : Üye listesini göster');
console.log('  - showSiteStats() : Site istatistiklerini göster');
console.log('  - exportAllData() : Tüm verileri dışa aktar');
