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

// This prevents the height collapse
const currentDisplay = currentWord.substring(0, charIndex);
textElement.innerHTML = currentDisplay || "&nbsp;";

if (!isDeleting && charIndex === currentWord.length) {
  isDeleting = true;
  typeSpeed = 2000; // Wait at the end
  textElement.classList.add('cursor-blink');
} else if (isDeleting && charIndex === 0) {
  isDeleting = false;
  wordIndex = (wordIndex + 1) % words.length;
  typeSpeed = 500;
  textElement.classList.add('cursor-blink');
} else {
  // Remove blink while active typing
  textElement.classList.remove('cursor-blink');
}

setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
type();
});


