# 🏫 Okul Dijital Pano

Firebase entegrasyonlu, gerçek zamanlı dijital okul panosu.

## 🌐 Canlı Demo
**Ana Pano:** https://zeyn-el.github.io/dijital-okul-pano-iyfl/index.html  
**Admin Paneli:** https://zeyn-el.github.io/dijital-okul-pano-iyfl/admin.html

## ✨ Özellikler

- 📅 **Ders Programı** - Günlük ders programını otomatik gösterir
- 🎂 **Doğum Günleri** - Öğrenci doğum günlerini takip eder
- 👮 **Nöbetçi Öğretmenler** - Günlük nöbetçi öğretmen listesi
- 📢 **Duyurular** - Kayan yazı ile duyurular
- ⏳ **YKS Sayacı** - YKS'ye kalan gün sayısı
- 🏆 **Bilgi Kartı** - Başarılar ve duyurular
- 🎬 **Medya Merkezi** - Resim slideshow, video veya web sayfası gösterimi
- 💬 **Günün Sözü** - İlham verici sözler
- 🔥 **Firebase Senkronizasyonu** - Gerçek zamanlı veri senkronizasyonu

## 🚀 Kurulum

### 1. Firebase Yapılandırması

`firebase-config.js` dosyasını kendi Firebase projenizle güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 2. Firebase Rules

Firebase Console'da Realtime Database rules'u açın:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### 3. Kullanım

1. `index.html` - Ana pano görünümü
2. `admin.html` - Yönetim paneli (giriş gerekli)
3. `login.html` - Giriş sayfası

## 🔐 Varsayılan Giriş Bilgileri

- **Kullanıcı:** admin
- **Şifre:** admin123

⚠️ **Güvenlik:** Üretim ortamında mutlaka şifreleri değiştirin!

## 📝 Veri Yönetimi

### LocalStorage'dan Firebase'e Aktarım

Eğer mevcut verileriniz varsa:

1. `localstorage-import.html` sayfasını açın
2. `localstorage.txt` dosyanızdaki verileri yapıştırın
3. "LocalStorage'a Aktar" butonuna tıklayın
4. Admin panelinden "Firebase'e Aktar" butonuna tıklayın

### Veri Yapısı

```javascript
{
  schoolName: "Okul Adı",
  cards: {
    birthdays: { enabled: true, title: "...", students: [] },
    duty: { list: [] },
    dutyByDate: { items: [] },
    yks: { enabled: true, title: "...", date: "..." },
    info: { enabled: true, items: [], sliderSpeed: 5 },
    mediaCenter: { type: "slideshow", images: [], speed: 5 },
    quotes: { title: "...", items: [], enableSlider: false },
    ticker: { text: "...", speed: 20 },
    schedule: { items: [] },
    timePlan: { items: [] }
  }
}
```

## 🔧 Geliştirme

### Yerel Sunucu

```bash
# Node.js http-server ile
npx http-server -p 8000

# Python ile
python -m http.server 8000
```

Sonra tarayıcıda: `http://localhost:8000`

### Git İşlemleri

```bash
# Değişiklikleri ekle
git add .

# Commit yap
git commit -m "Değişiklik açıklaması"

# GitHub'a yükle
git push origin main
```

## 🐛 Sorun Giderme

### Veriler Görünmüyor
1. Firebase config'in doğru olduğundan emin olun
2. Firebase Rules'un açık olduğunu kontrol edin
3. Tarayıcı konsolunu kontrol edin (F12)
4. LocalStorage'ı temizleyin ve sayfayı yenileyin

### Firebase Permission Denied
1. Firebase Console > Realtime Database > Rules
2. `.read` ve `.write` değerlerini `true` yapın
3. Publish butonuna tıklayın
4. 1-2 dakika bekleyin

### Resimlerin Yavaş Yüklenmesi
1. Resimleri optimize edin (TinyPNG.com)
2. Maksimum boyut: 300 KB
3. Önerilen format: WebP veya optimize edilmiş PNG

## 📱 Tarayıcı Desteği

- ✅ Chrome/Edge (Önerilen)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (Desteklenmiyor)

## 📄 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Commit yapın (`git commit -m 'Yeni özellik eklendi'`)
4. Push yapın (`git push origin feature/YeniOzellik`)
5. Pull Request açın

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**Not:** Firebase config dosyanızı `.gitignore`'a eklemeyi unutmayın (hassas bilgiler içeriyorsa).
