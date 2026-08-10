const gamingText = document.querySelector('.gaming-text');
const nextBtn = document.querySelector('.next-btn');
const heroVideo = document.querySelector('.hero-video');
const controlBtn = document.querySelector('.sound-control');
const audio = document.querySelector('.bg-music');
const icon = document.querySelector('.sound-icon');
const burgerIcon = document.querySelector('.burger-icon');
const navLinks = document.querySelector('.head-right .nav-links');
const featureVideos = [...document.querySelectorAll('.card video[data-src]')];

const heroList = ['assets/videos/hero-1.mp4', 'assets/videos/hero-2.mp4', 'assets/videos/hero-3.mp4', 'assets/videos/hero-4.mp4'];
const textList = ['gaming', 'identity', 'reality', 'agentic ai'];
let index = 0;

nextBtn.addEventListener('click', () => {
    index = (index + 1) % heroList.length;
    heroVideo.src = heroList[index];
    gamingText.textContent = textList[index];
    heroVideo.play().catch(() => {});
});

controlBtn.addEventListener('click', () => {
    if (audio.paused) {
        const source = audio.querySelector('source[data-src]');
        if (source) {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            audio.load();
        }
        audio.play().then(() => {
            icon.classList.add('ri-volume-up-fill');
            icon.classList.remove('ri-volume-mute-fill');
        }).catch(() => {});
    } else {
        audio.pause();
        icon.classList.add('ri-volume-mute-fill');
        icon.classList.remove('ri-volume-up-fill');
    }
});

burgerIcon.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    burgerIcon.classList.toggle('ri-menu-line', !isOpen);
    burgerIcon.classList.toggle('ri-close-line', isOpen);
});

navLinks.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burgerIcon.classList.remove('ri-close-line');
    burgerIcon.classList.add('ri-menu-line');
});

// Fetch each background video shortly before it scrolls into view and stop its
// decoder when it leaves. Previously all five downloaded and decoded at startup.
const videoObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        const video = entry.target;
        if (entry.isIntersecting) {
            if (!video.src) {
                video.src = video.dataset.src;
                video.load();
            }
            if (!document.hidden) video.play().catch(() => {});
        } else {
            video.pause();
        }
    }
}, { rootMargin: '300px 0px', threshold: 0.01 });

let featureObserversStarted = false;
const startFeatureObservers = () => {
    if (featureObserversStarted) return;
    featureObserversStarted = true;
    for (const video of featureVideos) videoObserver.observe(video);
};

const animationObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
    }
}, { rootMargin: '100px 0px' });

const isMobile = matchMedia('(max-width: 798px)').matches;

if (isMobile) {
    const startMobileMedia = () => {
        heroVideo.play().catch(() => {});
        startFeatureObservers();
    };
    addEventListener('scroll', startMobileMedia, { once: true, passive: true });
    addEventListener('pointerdown', startMobileMedia, { once: true, passive: true });
    addEventListener('keydown', startMobileMedia, { once: true, passive: true });
    if (location.hash) startFeatureObservers();
} else {
    heroVideo.play().catch(() => {});
    startFeatureObservers();
    for (const element of document.querySelectorAll('.about-section h1, .card h1, .prologue-section h1, .intro-section h1, .contact-section h1')) {
        animationObserver.observe(element);
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        heroVideo.pause();
        for (const video of featureVideos) video.pause();
        if (!audio.paused) audio.pause();
        return;
    }
    if (!isMobile) heroVideo.play().catch(() => {});
    for (const video of featureVideos) {
        const bounds = video.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < innerHeight) video.play().catch(() => {});
    }
});
