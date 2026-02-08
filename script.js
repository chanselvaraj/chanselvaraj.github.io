function handleSubmit(e) {
  setTimeout(() => {
    alert("Thanks for reaching out! I’ll get back to you soon.");
    e.target.reset();
  }, 500);
}


const textElement = document.getElementById("typewriter");
const words = ["Build.", "Train."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
const currentWord = words[wordIndex];

if (isDeleting) {
  charIndex--;
  typeSpeed = 80;
} else {
  charIndex++;
  typeSpeed = 150;
}

// Keep the &nbsp; to prevent the "line jumping up" issue
const currentDisplay = currentWord.substring(0, charIndex);
textElement.innerHTML = currentDisplay || "&nbsp;";

if (!isDeleting && charIndex === currentWord.length) {
  isDeleting = true;
  typeSpeed = 2000;
  textElement.classList.add('cursor-blink');
} else if (isDeleting && charIndex === 0) {
  isDeleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  typeSpeed = 500;
  textElement.classList.add('cursor-blink');
} else {
  textElement.classList.remove('cursor-blink');
}

setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);

let currentLeaderIndex = 0;
const track = document.getElementById('leader-track');
const dots = document.querySelectorAll('.dot');
const totalLeaders = 3;

let autoSlideInterval;

function moveSlide(index) {
  currentLeaderIndex = index;

  // Move the track
  track.style.transform = `translateX(-${index * 100}%)`;

  // Update dots
  dots.forEach((dot, i) => {
    dot.style.background = (i === index) ? 'var(--accent-blue)' : '#30363d';
    dot.style.opacity = (i === index) ? '1' : '0.5';
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentLeaderIndex = (currentLeaderIndex + 1) % totalLeaders;
    moveSlide(currentLeaderIndex);
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start auto-slide initially
startAutoSlide();

// Pause on hover (hover the whole slider box)
track.addEventListener('mouseenter', stopAutoSlide);
track.addEventListener('mouseleave', startAutoSlide);

