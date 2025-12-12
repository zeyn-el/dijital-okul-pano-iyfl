# 🏫 Okul Dijital Pano

Modern, dinamik ve kullanıcı dostu okul dijital pano sistemi.

## 🚀 Cloudflare Pages + Firebase Kurulum Rehberi

### 📋 Gereksinimler
- GitHub hesabı
- Cloudflare hesabı (ücretsiz)
- Firebase hesabı (ücretsiz)

---

## 1️⃣ Firebase Kurulumu

### Adım 1: Firebase Projesi Oluşturun
1. [Firebase Console](https://console.firebase.google.com) → Giriş yapın
2. **"Add project"** → Proje adı: `okul-dijital-pano`
3. Google Analytics: **Devre dışı** (opsiyonel)
4. **"Create project"**

### Adım 2: Realtime Database Oluşturun
1. Sol menüden **"Build"** → **"Realtime Database"**
2. **"Create Database"**
3. Konum: **Europe (eur3)** (Türkiye'ye en yakın)
4. Güvenlik kuralları: **"Start in test mode"** (şimdilik)
5. **"Enable"**

### Adım 3: Güvenlik Kurallarını Ayarlayın
**"Rules"** sekmesine gidin ve şunu yapıştırın:

```json
{
  "rules": {
    "panoData": {
      ".read": true,
      ".write": "auth != null"
    },
    "adminUsers": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

**"Publish"** butonuna tıklayın.

### Adım 4: Firebase Config Bilgilerini Alın
1. Sol üstteki **⚙️ (Settings)** → **"Project settings"**
2. Aşağı kaydırın → **"Your apps"** bölümü
3. **"Web"** (</> ikonu) → App nickname: `okul-pano-web`
4. **"Register app"**
5. **Firebase SDK snippet** → **"Config"** seçin
6. Kodu kopyalayın

### Adım 5: Config Bilgilerini Güncelleyin
`firebase-config.js` dosyasını açın ve kopyaladığınız bilgileri yapıştırın:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // Buraya kendi bilgilerinizi yapıştırın
  authDomain: "okul-pano.firebaseapp.com",
  databaseURL: "https://okul-pano-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "okul-pano",
  storageBucket: "okul-pano.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 2️⃣ HTML Dosyalarını Güncelleyin

### index.html, admin.html ve diğer sayfalara ekleyin:

**`<head>` bölümünün sonuna (</head>'den önce):**

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js"></script>

<!-- Firebase Config -->
<script src="firebase-config.js"></script>
```

### Güncellenmesi Gereken Dosyalar:
- ✅ `index.html`
- ✅ `admin.html`
- ✅ `login.html`
- ✅ `user-management.html`
- ✅ `schedule-management.html`

---

## 3️⃣ Cloudflare Pages Kurulumu

### Adım 1: GitHub'a Yükleyin

```bash
# Terminal'de proje klasörüne gidin
cd e:\okul-dijital-pano

# Git başlatın
git init
git add .
git commit -m "İlk commit - Firebase entegrasyonu"

# GitHub'da yeni repo oluşturun: okul-dijital-pano
# Sonra:
git remote add origin https://github.com/KULLANICI_ADINIZ/okul-dijital-pano.git
git branch -M main
git push -u origin main
```

### Adım 2: Cloudflare Pages'e Deploy Edin

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Giriş yapın
2. Sol menüden **"Workers & Pages"**
3. **"Create application"** → **"Pages"** sekmesi
4. **"Connect to Git"**
5. GitHub hesabınızı bağlayın
6. **"okul-dijital-pano"** repo'sunu seçin
7. **"Begin setup"**

**Build settings:**
- Framework preset: **None**
- Build command: (boş bırakın)
- Build output directory: `/`

8. **"Save and Deploy"**

### ✅ Tamamlandı!

Siteniz yayında: `https://okul-dijital-pano.pages.dev`

---

## 4️⃣ Özel Domain Bağlama (Opsiyonel)

### Cloudflare'de:
1. **"Custom domains"** → **"Set up a custom domain"**
2. Domain'inizi girin: `pano.okulunuz.com`
3. DNS kayıtlarını otomatik ekler
4. ✅ HTTPS otomatik aktif

---

## 📱 Smart TV'de Kullanım

### TV Tarayıcısında Açın:
```
https://okul-dijital-pano.pages.dev/index.html
```

### Tam Ekran Modu:
- **F11** (klavye varsa)
- Tarayıcı ayarlarından "Tam ekran"

### Otomatik Başlatma:
TV'nin "Başlangıç URL'si" ayarına sitenizi ekleyin.

---

## 🔒 Güvenlik

### Firebase Güvenlik Kuralları (Üretim için):

```json
{
  "rules": {
    "panoData": {
      ".read": true,
      ".write": "auth != null || 
                 request.auth.token.email.endsWith('@okulunuz.com')"
    },
    "adminUsers": {
      ".read": "auth != null",
      ".write": "auth != null && 
                 data.child(auth.uid).child('role').val() == 'Yönetici'"
    }
  }
}
```

---

## 🆘 Sorun Giderme

### localStorage Verileri Kayboldu?
✅ Firebase kullanıyorsanız sorun yok! Veriler bulutta.

### TV'de Yavaş Çalışıyor?
- Cloudflare CDN kullanıyorsanız çok hızlı olmalı
- TV'nin internet bağlantısını kontrol edin

### Firebase Bağlantı Hatası?
1. `firebase-config.js` dosyasındaki bilgileri kontrol edin
2. Firebase Console'da Database'in aktif olduğunu kontrol edin
3. Tarayıcı konsolunu açın (F12) → Hata mesajlarını kontrol edin

---

## 📞 Destek

Sorun yaşarsanız:
1. Firebase Console → Database → Data → Verileri kontrol edin
2. Cloudflare Dashboard → Analytics → Trafik kontrol edin
3. Tarayıcı konsolu (F12) → Hata mesajları

---

## 🎉 Başarılı Kurulum!

Artık uygulamanız:
- ✅ Cloudflare'de yayında (hızlı)
- ✅ Firebase'de veri saklıyor (güvenli)
- ✅ TV kapansa bile veriler korunuyor
- ✅ Her yerden erişilebilir

**Admin Paneli:** `https://okul-dijital-pano.pages.dev/login.html`
**Ana Sayfa:** `https://okul-dijital-pano.pages.dev/index.html`
