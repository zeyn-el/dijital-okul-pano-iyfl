// Firebase Yapılandırması
// NOT: Bu API anahtarlarını, Firebase Console'da kendi oluşturduğunuz projeden aldığınız değerlerle değiştirmeniz gerekebilir.
// Aşağıdaki değerler sizin yüklediğiniz dosyadaki mevcut değerlerdir.


const firebaseConfig = {
  apiKey: "AIzaSyDnJnjXSF0eHexIGpVy3YxM_cijatPlFXw",
  authDomain: "okul-dijital-pano-cba18.firebaseapp.com",
  databaseURL: "https://okul-dijital-pano-cba18-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "okul-dijital-pano-cba18",
  storageBucket: "okul-dijital-pano-cba18.firebasestorage.app",
  messagingSenderId: "636596557200",
  appId: "1:636596557200:web:22e36371e09fa75af80f15"
};

// Firebase'i başlat (Kontrol ederek)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// localStorage ile Firebase arasında köprü kuran Akıllı Depolama Yapısı
const FirebaseStorage = {
    // 1. Veri Kaydetme Fonksiyonu
    async saveData(data) {
        try {
            // Önce Firebase'e kaydetmeyi dene
            await database.ref('panoData').set(data);
            console.log('✅ Veriler Firebase\'e başarıyla kaydedildi');
            
            // İnternet kesilirse diye localStorage'a da yedekle
            localStorage.setItem('panoData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('❌ Firebase kaydetme hatası:', error);
            // Hata olursa sadece localStorage'a yaz
            localStorage.setItem('panoData', JSON.stringify(data));
            return false;
        }
    },

    // 2. Veri Okuma Fonksiyonu (OTOMATİK YÜKLEME MANTIĞI BURADA)
    async loadData() {
        try {
            // Firebase'den veriyi çekmeye çalış
            const snapshot = await database.ref('panoData').once('value');
            const data = snapshot.val();

            if (data) {
                // Firebase'de veri VARSA, onu kullan ve yerel hafızayı güncelle
                console.log('✅ Veriler Firebase\'den yüklendi');
                localStorage.setItem('panoData', JSON.stringify(data));
                return data;
            } else {
                // Firebase BOŞSA (null), bu ilk kurulum demektir.
                console.log('⚠️ Firebase boş. Yerel veriler kontrol ediliyor...');
                
                // Yerel veriyi (localStorage) oku
                const localData = this.loadLocalOrDefault();
                
                // Eğer yerel veri varsa, bunu hemen Firebase'e yükle!
                if (localData) {
                    console.log('🚀 Yerel veriler Buluta (Firebase) yükleniyor...');
                    await this.saveData(localData);
                    console.log('✨ Taşıma işlemi tamamlandı!');
                }
                
                return localData;
            }
        } catch (error) {
            console.error('❌ Firebase okuma hatası (İnternet yok veya yetki sorunu):', error);
            // Bir sorun varsa mecburen yerel veriyi kullan
            return this.loadLocalOrDefault();
        }
    },

    // Yardımcı Fonksiyon: Yerel veriyi veya varsayılanı getir
    loadLocalOrDefault() {
        const localData = localStorage.getItem('panoData');
        return localData ? JSON.parse(localData) : this.getDefaultData();
    },

    // Varsayılan Boş Veri Şablonu
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

    // Kullanıcıları Kaydet (Admin Paneli İçin)
    async saveUsers(users) {
        try {
            await database.ref('adminUsers').set(users);
            localStorage.setItem('adminUsers', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Kullanıcı kaydetme hatası:', error);
            localStorage.setItem('adminUsers', JSON.stringify(users));
            return false;
        }
    },

    // Kullanıcıları Yükle
    async loadUsers() {
        try {
            const snapshot = await database.ref('adminUsers').once('value');
            const users = snapshot.val();

            if (users) {
                localStorage.setItem('adminUsers', JSON.stringify(users));
                return users;
            } else {
                // Kullanıcılar yoksa yerelden yükle ve buluta at
                const localUsers = localStorage.getItem('adminUsers');
                const usersToLoad = localUsers ? JSON.parse(localUsers) : this.getDefaultUsers();
                await this.saveUsers(usersToLoad);
                return usersToLoad;
            }
        } catch (error) {
            const localUsers = localStorage.getItem('adminUsers');
            return localUsers ? JSON.parse(localUsers) : this.getDefaultUsers();
        }
    },

    // Varsayılan Kullanıcılar
    getDefaultUsers() {
        return [
            { username: 'admin', password: 'admin123', role: 'Yönetici' },
            { username: 'rehber', password: 'rehber123', role: 'Rehber Öğretmen' },
            { username: 'idare', password: 'idare123', role: 'İdare' }
        ];
    }
};

// Eski kodlarla uyumluluk için global fonksiyonlar
async function loadData() {
    return await FirebaseStorage.loadData();
}

async function saveData(data) {
    return await FirebaseStorage.saveData(data);
}

console.log('🔥 Firebase Storage Hazır!');