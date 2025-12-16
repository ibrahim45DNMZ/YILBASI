// Etkileşim eklemek için
document.querySelectorAll('.berry').forEach(berry => {
    berry.addEventListener('click', function() {
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 300);
    });
});

// Sayfa yüklendiğinde animasyon
window.addEventListener('load', () => {
    console.log('Kokina buketi hazır! 🎄');
});
