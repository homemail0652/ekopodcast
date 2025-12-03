// ===================================
// FIREBASE CONFIGURATION
// ===================================

const firebaseConfig = {
    apiKey: "AIzaSyAbSKa0feKGspNyxvbtF9g4v8vl9OVEVsw",
    authDomain: "ekopodcast-a191b.firebaseapp.com",
    projectId: "ekopodcast-a191b",
    storageBucket: "ekopodcast-a191b.firebasestorage.app",
    messagingSenderId: "504922912224",
    appId: "1:504922912224:web:f126ed14efbca70e0e2785",
    measurementId: "G-1QDRZ008S6"
};

// Firebase'i başlat (Compat modu)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firestore referansı
const db = firebase.firestore();

// Koleksiyon referansları
const podcastsCollection = db.collection('podcasts');
const usersCollection = db.collection('users');
const statsCollection = db.collection('stats');

console.log('🔥 Firebase başarıyla yapılandırıldı ve başlatıldı!');
