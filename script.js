/**
 * FORM HANDLING
 */
function handleSubmit(e) {
  setTimeout(() => {
    alert("Thanks for reaching out! I’ll get back to you soon.");
    e.target.reset();
  }, 500);
}

/**
 * TYPEWRITER EFFECT
 */
const textElement = document.getElementById("typewriter");
const words = ["Build.", "Train."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
  if (!textElement) return; // Exit if not on index.html

  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    typeSpeed = 80;
  } else {
    charIndex++;
    typeSpeed = 150;
  }

  const currentDisplay = currentWord.substring(0, charIndex);
  textElement.innerHTML = currentDisplay || "&nbsp;";

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

/**
 * LEADERSHIP SLIDER
 */
let currentLeaderIndex = 0;
const track = document.getElementById('leader-track');
const dots = document.querySelectorAll('.dot');
const totalLeaders = 4;
let autoSlideInterval;

function moveSlide(index) {
  if (!track) return;
  currentLeaderIndex = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.style.background = (i === index) ? 'var(--accent-blue)' : '#30363d';
    dot.style.opacity = (i === index) ? '1' : '0.5';
  });
}

function startAutoSlide() {
  if (!track) return;
  autoSlideInterval = setInterval(() => {
    currentLeaderIndex = (currentLeaderIndex + 1) % totalLeaders;
    moveSlide(currentLeaderIndex);
  }, 5000);
}

/**
 * BLOG ENGINE LOGIC
 */
const posts = [
  {
    id: 'post1',
    title: "AI Generated. Engineer Refined!",
    date: "Feb 18, 2026 | 9:00 AM",
    file: "blog/AI_Generated_Engineer_Refined.txt",
    preview: "Exploring the best practices in todays AI led software development..."
  },
//  {
//    id: 'post2',
//    title: "AI Implementation in Python",
//    date: "Feb 15, 2026 | 02:30 PM",
//    file: "ai-python.txt",
//    preview: "A deep dive into building scalable AI workflows using modern Python libraries..."
//  },
//  {
//    id: 'post2',
//    title: "AI Implementation in Python",
//    date: "Feb 15, 2026 | 02:30 PM",
//    file: "ai-python.txt",
//    preview: "A deep dive into building scalable AI workflows using modern Python libraries..."
//  },
//  {
//    id: 'post2',
//    title: "AI Implementation in Python",
//    date: "Feb 15, 2026 | 02:30 PM",
//    file: "ai-python.txt",
//    preview: "A deep dive into building scalable AI workflows using modern Python libraries..."
//  }
];

function renderBlogList() {
  const listContainer = document.getElementById('blog-list');
  if (!listContainer) return;

  listContainer.innerHTML = posts.map(post => `
    <div class="card" onclick="loadBlogPost('${post.id}')" style="padding:30px; margin-bottom:20px; cursor:pointer;">
      <div style="color:var(--accent-blue); font-size:0.8rem; font-weight:600;">${post.date}</div>
      <h3 style="color:white; margin:10px 0;">${post.title}</h3>
      <p style="color:var(--text-dim); font-size:0.95rem;">${post.preview}</p>
      <span style="color:var(--accent-blue);">Read Full Article →</span>
    </div>
  `).join('');
}

async function loadBlogPost(id) {
  const post = posts.find(p => p.id === id);
  const listView = document.getElementById('list-view');
  const postView = document.getElementById('post-view');

  try {
    const response = await fetch(post.file);
    const text = await response.text();

    document.getElementById('view-title').innerText = post.title;
    document.getElementById('view-date').innerText = post.date;
    document.getElementById('view-content').innerText = text;

    listView.style.display = 'none';
    postView.style.display = 'block';
    window.scrollTo(0, 0);
  } catch (e) {
    console.error("Error loading text file:", e);
  }
}

function showBlogList() {
  document.getElementById('list-view').style.display = 'block';
  document.getElementById('post-view').style.display = 'none';
}

/**
 * INITIALIZATION
 */
document.addEventListener("DOMContentLoaded", () => {
  // Start Typewriter
  type();

  // Start Slider
  if (track) {
    startAutoSlide();
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);
  }

  // Start Blog (if on blog page)
  renderBlogList();
});