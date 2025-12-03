// ===================================
// FIREBASE FUNCTIONS - EkoPodcast
// ===================================

// ===================================
// PODCAST İŞLEMLERİ
// ===================================

// Tüm podcastleri getir
async function loadPodcastsFromFirebase() {
    try {
        const snapshot = await podcastsCollection.orderBy('date', 'desc').get();
        const podcasts = [];

        snapshot.forEach(doc => {
            podcasts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`✅ ${podcasts.length} podcast Firebase'den yüklendi`);
        return podcasts;
    } catch (error) {
        console.error('❌ Podcast yükleme hatası:', error);
        return [];
    }
}

// Yeni podcast ekle
async function addPodcastToFirebase(podcastData) {
    try {
        const docRef = await podcastsCollection.add({
            ...podcastData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            listens: 0
        });

        console.log('✅ Podcast Firebase\'e eklendi:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Podcast ekleme hatası:', error);
        return null;
    }
}

// Dinleme sayısını artır
async function incrementListenCount(podcastId) {
    try {
        await podcastsCollection.doc(podcastId).update({
            listens: firebase.firestore.FieldValue.increment(1),
            lastListened: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('✅ Dinleme sayısı artırıldı:', podcastId);

        // Site istatistiklerini de güncelle
        await incrementSiteStat('totalListens');

        return true;
    } catch (error) {
        console.error('❌ Dinleme sayısı artırma hatası:', error);
        return false;
    }
}

// ===================================
// ÜYE İŞLEMLERİ
// ===================================

// Yeni üye kaydet
async function registerUserToFirebase(email) {
    try {
        const docRef = await usersCollection.add({
            email: email,
            registeredAt: firebase.firestore.FieldValue.serverTimestamp(),
            notificationsEnabled: true
        });

        console.log('✅ Üye Firebase\'e kaydedildi:', email);
        return docRef.id;
    } catch (error) {
        console.error('❌ Üye kayıt hatası:', error);
        return null;
    }
}

// Tüm üyeleri getir
async function getUsersFromFirebase() {
    try {
        const snapshot = await usersCollection.orderBy('registeredAt', 'desc').get();
        const users = [];

        snapshot.forEach(doc => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`✅ ${users.length} üye Firebase'den yüklendi`);
        return users;
    } catch (error) {
        console.error('❌ Üye yükleme hatası:', error);
        return [];
    }
}

// ===================================
// İSTATİSTİK İŞLEMLERİ
// ===================================

// Site istatistiklerini getir
async function getSiteStatsFromFirebase() {
    try {
        const doc = await statsCollection.doc('global').get();

        if (doc.exists) {
            console.log('✅ Site istatistikleri yüklendi');
            return doc.data();
        } else {
            // İlk kez oluştur
            const initialStats = {
                totalVisits: 0,
                totalListens: 0,
                totalComments: 0,
                totalUsers: 0,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            };

            await statsCollection.doc('global').set(initialStats);
            return initialStats;
        }
    } catch (error) {
        console.error('❌ İstatistik yükleme hatası:', error);
        return null;
    }
}

// İstatistik değerini artır
async function incrementSiteStat(statName) {
    try {
        await statsCollection.doc('global').update({
            [statName]: firebase.firestore.FieldValue.increment(1),
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log(`✅ ${statName} artırıldı`);
        return true;
    } catch (error) {
        console.error(`❌ ${statName} artırma hatası:`, error);
        return false;
    }
}

// Ziyaret sayısını artır
async function trackVisit() {
    await incrementSiteStat('totalVisits');
}

// ===================================
// YORUM İŞLEMLERİ
// ===================================

// Yorum ekle
async function addCommentToFirebase(podcastId, commentData) {
    try {
        await podcastsCollection.doc(podcastId).collection('comments').add({
            ...commentData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log('✅ Yorum eklendi');
        await incrementSiteStat('totalComments');
        return true;
    } catch (error) {
        console.error('❌ Yorum ekleme hatası:', error);
        return false;
    }
}

// Podcast yorumlarını getir
async function getCommentsFromFirebase(podcastId) {
    try {
        const snapshot = await podcastsCollection.doc(podcastId)
            .collection('comments')
            .orderBy('createdAt', 'desc')
            .get();

        const comments = [];
        snapshot.forEach(doc => {
            comments.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return comments;
    } catch (error) {
        console.error('❌ Yorum yükleme hatası:', error);
        return [];
    }
}

// ===================================
// GERÇEK ZAMANLI DİNLEME
// ===================================

// Podcastleri gerçek zamanlı dinle
function listenToPodcasts(callback) {
    return podcastsCollection.orderBy('date', 'desc').onSnapshot(snapshot => {
        const podcasts = [];
        snapshot.forEach(doc => {
            podcasts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log('🔄 Podcastler güncellendi (gerçek zamanlı)');
        callback(podcasts);
    }, error => {
        console.error('❌ Gerçek zamanlı dinleme hatası:', error);
    });
}

// Site istatistiklerini gerçek zamanlı dinle
function listenToStats(callback) {
    return statsCollection.doc('global').onSnapshot(doc => {
        if (doc.exists) {
            console.log('🔄 İstatistikler güncellendi (gerçek zamanlı)');
            callback(doc.data());
        }
    }, error => {
        console.error('❌ İstatistik dinleme hatası:', error);
    });
}

// ===================================
// YARDIMCI FONKSİYONLAR
// ===================================

// Timestamp'i tarihe çevir
function timestampToDate(timestamp) {
    if (!timestamp) return null;
    return timestamp.toDate();
}

// Tüm verileri senkronize et
async function syncAllData() {
    console.log('🔄 Tüm veriler senkronize ediliyor...');

    try {
        const [podcasts, users, stats] = await Promise.all([
            loadPodcastsFromFirebase(),
            getUsersFromFirebase(),
            getSiteStatsFromFirebase()
        ]);

        console.log('✅ Senkronizasyon tamamlandı!');
        return { podcasts, users, stats };
    } catch (error) {
        console.error('❌ Senkronizasyon hatası:', error);
        return null;
    }
}

console.log('🔥 Firebase fonksiyonları yüklendi!');
