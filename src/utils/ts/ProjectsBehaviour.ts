// Simple Carousel Logic
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const slides = document.querySelectorAll(".project-slide");
let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index: number) {
    slides.forEach((slide, i) => {
        const el = slide as HTMLElement;
        if (i === index) {
            el.style.opacity = "1";
            el.style.zIndex = "10";
            el.style.visibility = "visible";
        } else {
            el.style.opacity = "0";
            el.style.zIndex = "0";
            el.style.visibility = "hidden";
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
}

if (prevBtn && nextBtn && totalSlides > 0) {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
}