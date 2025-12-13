// Firebase Yapılandırması
// NOT: Bu bilgileri Firebase Console'dan alacaksınız

const firebaseConfig = {
    apiKey: "AIzaSyCtIFXSGV_BOX1Ew3dAK-YAuCEZkR7f32U",
    authDomain: "okul-dijital-pano.firebaseapp.com",
    databaseURL: "https://okul-dijital-pano-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "okul-dijital-pano",
    storageBucket: "okul-dijital-pano.firebasestorage.app",
    messagingSenderId: "1017147130408",
    appId: "1:1017147130408:web:925fada3c9436187242b1d"
};



// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// localStorage yerine Firebase kullan
const FirebaseStorage = {
    // Veri kaydetme
    async saveData(data) {
        try {
            await database.ref('panoData').set(data);
            console.log('✅ Veriler Firebase\'e kaydedildi');
            return true;
        } catch (error) {
            console.error('❌ Firebase kaydetme hatası:', error);
            // Yedek olarak localStorage kullan
            localStorage.setItem('panoData', JSON.stringify(data));
            return false;
        }
    },

    // Veri okuma
    async loadData() {
        try {
            const snapshot = await database.ref('panoData').once('value');
            const data = snapshot.val();

            if (data) {
                console.log('✅ Veriler Firebase\'den yüklendi');
                // Yedek olarak localStorage'a da kaydet
                localStorage.setItem('panoData', JSON.stringify(data));
                return data;
            } else {
                console.log('⚠️ Firebase\'de veri yok, localStorage kontrol ediliyor');
                // Firebase'de veri yoksa localStorage'dan yükle
                const localData = localStorage.getItem('panoData');
                return localData ? JSON.parse(localData) : this.getDefaultData();
            }
        } catch (error) {
            console.error('❌ Firebase okuma hatası:', error);
            // Hata durumunda localStorage kullan
            const localData = localStorage.getItem('panoData');
            return localData ? JSON.parse(localData) : this.getDefaultData();
        }
    },

    // Varsayılan veri yapısı
    getDefaultData() {
        return {
            schoolName: "OKUL ADI GİRİNİZ",
            cards: {
                birthday: { enabled: true, title: "İyi ki doğdun!", students: [] },
                birthdays: { enabled: true, title: "İyi ki doğdun!", students: [] },
                duty: { list: [] },
                dutyByDate: { items: [] },
                yks: { enabled: true, title: "YKS'ye Kalan", date: "" },
                info: { enabled: true, items: [], sliderSpeed: 5 },
                mainMedia: { type: "slideshow", images: [], speed: 5 },
                quote: { title: "Günün Sözü", items: [], sliderEnabled: false, sliderSpeed: 5 },
                ticker: { text: "", speed: 20 },
                schedule: { items: [] },
                timePlan: { items: [] }
            }
        };
    },

    // Kullanıcı verilerini kaydet
    async saveUsers(users) {
        try {
            await database.ref('adminUsers').set(users);
            console.log('✅ Kullanıcılar Firebase\'e kaydedildi');
            // Yedek
            localStorage.setItem('adminUsers', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('❌ Kullanıcı kaydetme hatası:', error);
            localStorage.setItem('adminUsers', JSON.stringify(users));
            return false;
        }
    },

    // Kullanıcı verilerini oku
    async loadUsers() {
        try {
            const snapshot = await database.ref('adminUsers').once('value');
            const users = snapshot.val();

            if (users) {
                localStorage.setItem('adminUsers', JSON.stringify(users));
                return users;
            } else {
                const localUsers = localStorage.getItem('adminUsers');
                return localUsers ? JSON.parse(localUsers) : this.getDefaultUsers();
            }
        } catch (error) {
            console.error('❌ Kullanıcı okuma hatası:', error);
            const localUsers = localStorage.getItem('adminUsers');
            return localUsers ? JSON.parse(localUsers) : this.getDefaultUsers();
        }
    },

    // Varsayılan kullanıcılar
    getDefaultUsers() {
        return [
            { username: 'admin', password: 'admin123', role: 'Yönetici' },
            { username: 'rehber', password: 'rehber123', role: 'Rehber Öğretmen' },
            { username: 'idare', password: 'idare123', role: 'İdare' }
        ];
    }
};

// Geriye uyumluluk için eski fonksiyonları koru
async function loadData() {
    return await FirebaseStorage.loadData();
}

async function saveData(data) {
    return await FirebaseStorage.saveData(data);
}

console.log('🔥 Firebase Storage hazır!');
