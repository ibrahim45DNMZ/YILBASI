// ===== DOM ELEMENTS =====
const vase = document.getElementById('vase');
const bouquet = document.getElementById('bouquet');
const clickCountElement = document.getElementById('click-count');
const openTimeElement = document.getElementById('open-time');
const maxOpenElement = document.getElementById('max-open');
const messageElement = document.getElementById('message');
const messageTextElement = document.querySelector('.message-text');
const snowContainer = document.getElementById('snow-container');
const autoBtn = document.getElementById('auto-btn');
const resetBtn = document.getElementById('reset-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');

// ===== STATE VARIABLES =====
let isOpen = false;
let clickCount = 0;
let openTime = 0;
let maxOpenPercentage = 0;
let openStartTime = 0;
let snowInterval;
let openTimeInterval;
let autoInterval;
let isAutoMode = false;
let isMusicPlaying = false;

// ===== MESSAGES =====
const messages = [
    { text: "🎄 Kokina buketiniz hazır! Mutlu yıllar dileriz! 🎄", icon: "fas fa-gift" },
    { text: "✨ Yeni yılın size sağlık, mutluluk ve başarı getirmesi dileğiyle! ✨", icon: "fas fa-star" },
    { text: "❤️ Sevgi dolu, huzur dolu, sağlık dolu bir yıl olsun! ❤️", icon: "fas fa-heart" },
    { text: "🎅 Noeliniz ve yeni yılınız kutlu olsun! 🎅", icon: "fas fa-snowman" },
    { text: "🌟 Bu yeni yıl, tüm hayallerinizin gerçekleştiği bir yıl olsun! 🌟", icon: "fas fa-magic" },
    { text: "🍀 Yeni yılda şans hep yanınızda olsun! 🍀", icon: "fas fa-clover" },
    { text: "☃️ Kar taneleri gibi hafif, yıldızlar gibi parlak bir yıl dileriz! ☃️", icon: "fas fa-snowflake" },
    { text: "🎁 Yeni yıl size bol bol mutluluk ve sevgi getirsin! 🎁", icon: "fas fa-box-open" }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Başlangıç animasyonu
    setTimeout(() => {
        vase.style.animation = 'float 4s ease-in-out infinite';
        showMessage("Vazoya tıklayarak veya dokunarak kokina buketini açın!", "fas fa-mouse-pointer");
    }, 1000);
    
    // Müzik butonu durumu
    updateMusicButton();
});

// ===== VASE CLICK EVENT =====
vase.addEventListener('click', toggleBouquet);
vase.addEventListener('touchstart', function(e) {
    e.preventDefault();
    toggleBouquet();
    
    // Dokunma efekti
    this.style.transform = 'translateX(-50%) scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'translateX(-50%) scale(1)';
    }, 200);
});

// ===== TOGGLE BOUQUET FUNCTION =====
function toggleBouquet() {
    isOpen = !isOpen;
    
    if (isOpen) {
        openBouquet();
    } else {
        closeBouquet();
    }
    
    // Tıklama sayacını güncelle
    clickCount++;
    clickCountElement.textContent = clickCount;
    
    // Maksimum açıklığı güncelle
    updateMaxOpen();
}

function openBouquet() {
    // Buketi aç
    bouquet.classList.add('open');
    
    // Açılma zamanını kaydet
    openStartTime = Date.now();
    
    // Açık kalma süresi sayacını başlat
    startOpenTimeCounter();
    
    // Rastgele mesaj göster
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showMessage(randomMessage.text, randomMessage.icon);
    
    // Kar efektini başlat
    startSnowEffect();
    
    // Buket açılma ses efekti (simüle)
    playSoundEffect('open');
    
    // Vazo animasyonu
    vase.style.transform = 'translateX(-50%) scale(0.95)';
}

function closeBouquet() {
    // Buketi kapat
    bouquet.classList.remove('open');
    
    // Açık kalma süresini hesapla
    const elapsedTime = Math.floor((Date.now() - openStartTime) / 1000);
    openTime += elapsedTime;
    openTimeElement.textContent = ${openTime}sn;
    
    // Açık kalma süresi sayacını durdur
    stopOpenTimeCounter();
    
    // Kar efektini durdur
    stopSnowEffect();
    
    // Vazo animasyonu
    vase.style.transform = 'translateX(-50%) scale(1)';
    
    // Buket kapanma ses efekti (simüle)
    playSoundEffect('close');
}

// ===== OPEN TIME COUNTER =====
function startOpenTimeCounter() {
    openTimeInterval = setInterval(() => {
        const currentTime = Math.floor((Date.now()
