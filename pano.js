// LOCALSTORAGE → GLOBAL SETTINGS + CARDS
function loadData() {
    return JSON.parse(localStorage.getItem("panoData") || "{}");
}
function saveData(obj) {
    localStorage.setItem("panoData", JSON.stringify(obj));
}

let data = loadData();

// DEFAULT STRUCTURE IF EMPTY
if (!data.schoolName) data.schoolName = "İsmet Yılmaz Fen Lisesi";

if (!data.cards) data.cards = {
    birthday: {
        title: "İyi ki doğdun!",
        name: "Elif ASYA",
        note: "Bugün Elif'in doğum günü 🎂"
    },
    duty: {
        list: [
            { place: "Zemin Kat", teacher: "Ahmet Yılmaz" },
            { place: "1. Kat", teacher: "Ayşe Demir" },
            { place: "2. Kat", teacher: "Mehmet Kaya" },
            { place: "Bahçe", teacher: "Zeynep Çelik" }
        ]
    },
    yks: {
        date: "2025-06-15"
    },
    mainMedia: {
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYwEA7WSASJOV5xUWJ8A2_IJ_WDguuB9ERHcZYVeo_xkGwRcuX71r_PjXtC1Rxn7m-tIb6VBKphyBjg1Fv8qHmNFVMjDbIR99q5GpGhYxeHkjV-eqv00AxvL5OJCl6inZC7NX7ZtHKODNIMLgF3KNJeICND60czXX00ApIxheouYseHABSD3poeGgpeyvJK--WrzHMpOSJ9H7fbKAwOAss7kKkqgY3tx2xDOpBHR8EHTZSFAdWveN-tjtQDFB_WlPTlI1HK-Qlcft5",
        tag: "DUYURU",
        title: "Okulumuz TÜBİTAK 4006 Bilim Fuarı Başvuruları Başladı",
        desc: "Son başvuru tarihi 15 Ocak. Detaylar için okul web sitesini ziyaret ediniz."
    },
    schedule: {
        items: [
            { cls: "9-A", title: "Türk Dili ve Ed.", teacher: "Zeynel BOZKALE", time: "08:30-09:10" },
            { cls: "9-B", title: "Tarih", teacher: "Abdullah PAŞA", time: "08:30-09:10" },
            { cls: "9-C", title: "Matematik", teacher: "Kübra YILDIZ", time: "08:30-09:10" },
            { cls: "10-A", title: "Fizik", teacher: "Mehmet KAYA", time: "08:30-09:10" },
            { cls: "10-B", title: "Kimya", teacher: "Ayşe DEMİR", time: "08:30-09:10" },
            { cls: "11-A", title: "Biyoloji", teacher: "Fatma YILMAZ", time: "08:30-09:10" },
            { cls: "11-B", title: "Edebiyat", teacher: "Ali ÇELIK", time: "08:30-09:10" },
            { cls: "12-A", title: "Geometri", teacher: "Zeynep ARSLAN", time: "08:30-09:10" }
        ]
    },
    quote: {
        text: "Hayatta en hakiki mürşit ilimdir.",
        author: "M. Kemal Atatürk"
    },
    ticker: {
        text: "📢 Yarın yapılacak olan Okul Aile Birliği toplantısı saat 17:00'ye ertelenmiştir. • 🏆 Voleybol takımımız ilçe finaline yükselmiştir, tebrik ederiz! • 📚 Kütüphane haftası etkinlikleri kapsamında yarın kitap okuma saati yapılacaktır. • ⚠️ Lütfen okul kıyafet kurallarına uyalım."
    }
};

// Veriyi kaydet (ilk yüklemede)
saveData(data);

// SCHEDULE SLIDER VARIABLES
let currentScheduleSlide = 0;
let scheduleInterval = null;

// APPLY DATA TO PAGE
window.addEventListener("DOMContentLoaded", () => {

    // SCHOOL NAME
    const schoolNameEl = document.getElementById("school-name");
    if (schoolNameEl) schoolNameEl.textContent = data.schoolName;

    // CLOCK & DATE
    function updateClock() {
        const now = new Date();
        const timeEl = document.getElementById("current-time");
        const dateEl = document.getElementById("current-date");

        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
        }
        if (dateEl) {
            dateEl.textContent = now.toLocaleDateString("tr-TR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
        }
    }
    updateClock();
    setInterval(updateClock, 30000);

    // BIRTHDAY CARD
    const birthdayTitle = document.getElementById("birthday-title");
    const birthdayName = document.getElementById("birthday-name");
    const birthdayText = document.getElementById("birthday-text");

    if (birthdayTitle) birthdayTitle.textContent = data.cards.birthday.title;
    if (birthdayName) birthdayName.textContent = data.cards.birthday.name;
    if (birthdayText) birthdayText.textContent = data.cards.birthday.note;

    // DUTY LIST
    const dutyList = document.getElementById("duty-list");
    if (dutyList) {
        dutyList.innerHTML = "";
        data.cards.duty.list.forEach((x, idx) => {
            const isLast = idx === data.cards.duty.list.length - 1;
            dutyList.innerHTML += `
            <div class="flex items-center justify-between ${!isLast ? 'border-b border-dashed border-slate-200 pb-2' : ''}">
                <span class="text-text-secondary font-medium">${x.place}</span>
                <span class="font-bold text-text-dark">${x.teacher}</span>
            </div>`;
        });
    }

    // YKS COUNTDOWN
    const yksEl = document.getElementById("yks-days");
    if (yksEl) {
        const exam = new Date(data.cards.yks.date);
        const diff = Math.ceil((exam - new Date()) / 86400000);
        yksEl.textContent = diff > 0 ? diff : 0;
    }

    // MAIN MEDIA
    const mediaImg = document.getElementById("main-media-img");
    const mediaBadge = document.getElementById("main-media-badge");
    const mediaTitle = document.getElementById("main-media-title");
    const mediaText = document.getElementById("main-media-text");

    if (mediaImg) mediaImg.src = data.cards.mainMedia.image;
    if (mediaBadge) mediaBadge.textContent = data.cards.mainMedia.tag;
    if (mediaTitle) mediaTitle.textContent = data.cards.mainMedia.title;
    if (mediaText) mediaText.textContent = data.cards.mainMedia.desc;

    // SCHEDULE SLIDER (5 items per slide, auto-rotate every 5 seconds)
    function renderScheduleSlide() {
        const scheduleContent = document.getElementById("schedule-content");
        const scheduleIndicators = document.getElementById("schedule-indicators");

        if (!scheduleContent || !data.cards.schedule.items.length) return;

        const items = data.cards.schedule.items;
        const itemsPerSlide = 5;
        const totalSlides = Math.ceil(items.length / itemsPerSlide);

        // Calculate current slide items
        const startIdx = currentScheduleSlide * itemsPerSlide;
        const endIdx = Math.min(startIdx + itemsPerSlide, items.length);
        const slideItems = items.slice(startIdx, endIdx);

        // Render schedule items
        scheduleContent.innerHTML = '<div class="space-y-3">';
        slideItems.forEach((item, idx) => {
            const opacity = idx === 0 ? '' : (idx === 1 ? 'opacity-80' : (idx === 2 ? 'opacity-60' : 'opacity-40'));
            const bgClass = idx === 0 ? 'bg-primary/5 border-primary/10' : 'bg-white border-slate-100';
            const badgeBg = idx === 0 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500';
            const textColor = idx === 0 ? 'text-primary' : 'text-slate-500';

            scheduleContent.innerHTML += `
            <div class="flex items-center gap-3 p-3 rounded-xl ${bgClass} border ${opacity}">
                <div class="${badgeBg} w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm">
                    ${item.cls}
                </div>
                <div class="flex flex-col flex-1">
                    <span class="text-xs font-bold ${textColor} uppercase tracking-wider">${item.title}</span>
                    <span class="text-sm font-bold ${idx === 0 ? 'text-text-dark' : 'text-slate-700'}">${item.teacher}</span>
                </div>
                <div class="text-right">
                    <span class="text-xs font-semibold ${textColor}">${item.time || ''}</span>
                </div>
            </div>`;
        });
        scheduleContent.innerHTML += '</div>';

        // Render indicators
        if (scheduleIndicators && totalSlides > 1) {
            scheduleIndicators.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const active = i === currentScheduleSlide ? 'bg-primary' : 'bg-primary/30';
                scheduleIndicators.innerHTML += `<div class="w-2 h-2 rounded-full ${active}"></div>`;
            }
        }

        // Move to next slide
        currentScheduleSlide = (currentScheduleSlide + 1) % totalSlides;
    }

    // Initial render
    renderScheduleSlide();

    // Auto-rotate every 5 seconds
    if (data.cards.schedule.items.length > 5) {
        scheduleInterval = setInterval(renderScheduleSlide, 5000);
    }

    // QUOTE
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    if (quoteText) quoteText.textContent = `"${data.cards.quote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = data.cards.quote.author;

    // TICKER (Footer)
    const tickerContent = document.getElementById("ticker-content");
    if (tickerContent) {
        tickerContent.innerHTML = data.cards.ticker.text;
    }

});
