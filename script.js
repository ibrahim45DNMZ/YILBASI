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
        const currentTime = Math.floor((Date.now() - openStartTime) / 1000);
        document.getElementById('open-time').textContent = ${openTime + currentTime}sn;
    }, 1000);
}

function stopOpenTimeCounter() {
    clearInterval(openTimeInterval);
}

// ===== MAX OPEN CALCULATION =====
function updateMaxOpen() {
    // Buket elemanlarını say
    const totalElements = document.querySelectorAll('.bouquet > *').length;
    const visibleElements = document.querySelectorAll('.bouquet.open > *').length;
    
    // Görünür yüzdeyi hesapla
    const openPercentage = isOpen ? Math.round((visibleElements / totalElements) * 100) : 0;
    
    // Maksimumu güncelle
    if (openPercentage > maxOpenPercentage) {
        maxOpenPercentage = openPercentage;
        maxOpenElement.textContent = ${maxOpenPercentage}%;
    }
}



// ===== SNOW EFFECT =====
function startSnowEffect() {
    // Önceki kar tanelerini temizle
    snowContainer.innerHTML = '';
    
    // İlk kar tanelerini oluştur
    for (let i = 0; i < 30; i++) {
        createSnowflake(true);
    }
    
    // Yeni kar taneleri oluştur
    snowInterval = setInterval(() => {
        createSnowflake();
    }, 150);
}

function stopSnowEffect() {
    clearInterval(snowInterval);
    
    // Kar tanelerini yavaşça temizle
    const snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(flake => {
        flake.style.transition = 'opacity 1s ease';
        flake.style.opacity = '0';
        
        setTimeout(() => {
            if (flake.parentNode) {
                flake.parentNode.removeChild(flake);
            }
        }, 1000);
    });
}

function createSnowflake(initial = false) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Rastgele boyut (3-10px arası)
    const size = Math.random() * 7 + 3;
    snowflake.style.width = ${size}px;
    snowflake.style.height = ${size}px;
    
    // Rastgele pozisyon
    const startLeft = initial ? Math.random() * 100 : Math.random() * 100;
    snowflake.style.left = ${startLeft}%;
    snowflake.style.top = initial ? ${Math.random() * 100}% : '-10px';
    
    // Rastgele opaklık
    snowflake.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Rastgele düşme süresi
    const duration = Math.random() * 4 + 3;
    
    // Animasyon
    snowflake.animate(
        [
            { 
                transform: translate(0, 0) rotate(0deg), 
                opacity: snowflake.style.opacity 
            },
            { 
                transform: translate(${Math.random() * 50 - 25}px, 100vh) rotate(${Math.random() * 360}deg), 
                opacity: 0 
            }
        ],
        {
            duration: duration * 1000,
            easing: 'linear'
        }
    );
    
    snowContainer.appendChild(snowflake);
    
    // Animasyon bitince sil
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, duration * 1000);
}

// ===== CONTROL BUTTONS =====
// Otomatik Aç/Kapat butonu
autoBtn.addEventListener('click', () => {
    isAutoMode = !isAutoMode;
    
    if (isAutoMode) {
        autoBtn.innerHTML = '<i class="fas fa-pause"></i> Otomatik Durdur';
        autoBtn.style.background = 'linear-gradient(45deg, #e63946, #9d0208)';
        
        // Otomatik mod mesajı
        showMessage("Otomatik mod açıldı! Buket 5 saniyede bir açılıp kapanacak.", "fas fa-robot");
        
        // İlk değişiklik
        setTimeout(() => {
            if (!isOpen) toggleBouquet();
        }, 1000);
        
        // Interval başlat
        autoInterval = setInterval(() => {
            toggleBouquet();
        }, 5000);
        
    } else {
        autoBtn.innerHTML = '<i class="fas fa-play"></i> Otomatik Aç/Kapat';
        autoBtn.style.background = 'linear-gradient(45deg, #457b9d, #1d3557)';
        
        // Interval durdur
        clearInterval(autoInterval);
        
        // Eğer açıksa kapat
        if (isOpen) {
            setTimeout(() => {
                toggleBouquet();
            }, 1000);
        }
    }
});

// Sıfırla butonu
resetBtn.addEventListener('click', () => {
    // Tüm istatistikleri sıfırla
    clickCount = 0;
    openTime = 0;
    maxOpenPercentage = 0;
    
    clickCountElement.textContent = '0';
    openTimeElement.textContent = '0sn';
    maxOpenElement.textContent = '0%';
    
    // Buketi kapat
    if (isOpen) {
        bouquet.classList.remove('open');
        isOpen = false;
        stopSnowEffect();
        stopOpenTimeCounter();
    }
    
    // Otomatik modu kapat
    if (isAutoMode) {
        clearInterval(autoInterval);
        isAutoMode = false;
        autoBtn.innerHTML = '<i class="fas fa-play"></i> Otomatik Aç/Kapat';
        autoBtn.style.background = 'linear-gradient(45deg, #457b9d, #1d3557)';
    }
    
    // Mesaj göster
    showMessage("Tüm istatistikler sıfırlandı! Yeni bir başlangıç yapın.", "fas fa-redo");
    
    // Vazo animasyonu
    vase.style.transform = 'translateX(-50%) scale(1)';
    vase.style.animation = 'float 4s ease-in-out infinite';
});

// Müzik butonu
musicBtn.addEventListener('click', toggleMusic);

function toggleMusic() {
    isMusicPlaying = !isMusicPlaying;
    
    if (isMusicPlaying) {
        // Müziği başlat
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => {
            console.log("Müzik çalınamadı:", e);
            isMusicPlaying = false;
            updateMusicButton();
        });
        
        // Başarı mesajı
        showMessage("🎵 Yeni yıl müziği başladı! 🎵", "fas fa-music");
    } else {
        // Müziği durdur
        bgMusic.pause();
        bgMusic.currentTime = 0;
        
        // Mesaj
        showMessage("Müzik durduruldu.", "fas fa-volume-mute");
    }
    
    updateMusicButton();
}

function updateMusicButton() {
    if (isMusicPlaying) {
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Müziği Kapat';
        musicBtn.style.background = 'linear-gradient(45deg, #52b788, #2d6a4f)';
    } else {
        musicBtn.innerHTML = '<i class="fas fa-music"></i> Müzik Aç';
        musicBtn.style.background = 'linear-gradient(45deg, #457b9d, #1d3557)';
    }
}

// ===== SOUND EFFECTS =====
function playSoundEffect(type) {
    // Basit ses efektleri (tarayıcı API'si kullanarak)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'open') {
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.5); // C6
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (type === 'close') {
            oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime); // C6
            oscillator.frequency.exponentialRampToValueAtTime(523.25, audioContext.currentTime + 0.3); // C5
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
        }
    } catch (e) {
        console.log("Ses efekti çalınamadı:", e);
    }
}

// ===== MOUSE INTERACTION =====
document.addEventListener('mousemove', (e) => {
    if (isOpen) {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        // Buketi hafifçe hareket ettir
        bouquet.style.transform = translateX(-50%) scale(1) translate(${x * 15}px, ${y * 15}px);
        
        // Işıkları hareket ettir
        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            sparkle.style.transform = translate(${x * 10}px, ${y * 10}px);
        });
    }
});

// ===== RESPONSIVE ADJUSTMENTS =====
window.addEventListener('resize', () => {
    // Buket konumunu yeniden hesapla
    if (isOpen) {
        bouquet.style.left = '50%';
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
        case 'Enter':
            // Space veya Enter ile buketi aç/kapat
            e.preventDefault();
            toggleBouquet();
            break;
        case 'a':
        case 'A':
            // A ile otomatik mod
            autoBtn.click();
            break;
        case 'r':
        case 'R':
            // R ile sıfırla
            resetBtn.click();
            break;
        case 'm':
        case 'M':
            // M ile müzik
            musicBtn.click();
            break;
    }
});

// ===== EXPORT FUNCTION (debug için) =====
window.getBouquetStats = function() {
    return {
        clickCount,
        openTime,
        maxOpenPercentage,
        isOpen,
        isAutoMode,
        isMusicPlaying
    };
};
