const gamingText = document.querySelector('.gaming-text');
const nextBtn = document.querySelector('.next-btn');
const video = document.querySelector('.hero-video');
const controlBtn = document.querySelector('.sound-control');
const audio = document.querySelector('.bg-music');
const icon = document.querySelector('.sound-icon');
const burgerIcon = document.querySelector('.burger-icon');
const navLinks = document.querySelector('.head-right .nav-links');

const heroList = ["/assets/videos/hero-1.mp4", "/assets/videos/hero-2.mp4", "/assets/videos/hero-3.mp4", "/assets/videos/hero-4.mp4",];
const textList = ["gaming", "identity", "reality", "agentic ai"];

let index = 0;

nextBtn.addEventListener("click", function () {
    index += 1;
    video.src = heroList[index]
    gamingText.innerHTML = textList[index]

    if (index === 3) {
        index = -1
    }
});

controlBtn.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
        icon.classList.add("ri-volume-up-fill")
        icon.classList.remove("ri-volume-mute-fill")
    } else {
        audio.pause();
        icon.classList.add("ri-volume-mute-fill")
        icon.classList.remove("ri-volume-up-fill")
    }
})



burgerIcon.addEventListener('click', function () {
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
        burgerIcon.classList.remove('ri-menu-line');
        burgerIcon.classList.add('ri-close-line');
    } else {
        burgerIcon.classList.remove('ri-close-line');
        burgerIcon.classList.add('ri-menu-line');
    }
});

navLinks.addEventListener("click", function () {
    navLinks.classList.remove("active")
    burgerIcon.classList.remove('ri-close-line');
    burgerIcon.classList.add('ri-menu-line');
})
