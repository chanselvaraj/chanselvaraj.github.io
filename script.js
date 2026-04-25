/* =============================================================
   FORM
   ============================================================= */
function handleSubmit(e) {
  setTimeout(() => {
    alert("Thanks for reaching out! We'll get back to you within 48 hours.");
    e.target.reset();
  }, 500);
}

/* =============================================================
   TYPEWRITER
   ============================================================= */
const textElement = document.getElementById('typewriter');
const words = ['Build.', 'Train.', 'Deploy.', 'Scale.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function type() {
  if (!textElement) return;
  const currentWord = words[wordIndex];

  charIndex += isDeleting ? -1 : 1;
  typeSpeed = isDeleting ? 70 : 130;
  textElement.textContent = currentWord.substring(0, charIndex) || ' ';

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 2200;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 480;
  }

  setTimeout(type, typeSpeed);
}

/* =============================================================
   CAROUSEL
   Buttons use data-target="<scroll-container-id>"
   Disabled state is recalculated on every scroll event.
   ============================================================= */
function scrollCarousel(el, direction) {
  const card = el.firstElementChild;
  const cardWidth = card ? card.offsetWidth + 20 : 400;
  el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

function updateCarouselButtons(el) {
  const wrap = el.closest('.carousel-wrap');
  if (!wrap) return;
  wrap.querySelector('.carousel-btn-prev').disabled = el.scrollLeft <= 2;
  wrap.querySelector('.carousel-btn-next').disabled =
    el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
}

function initCarousel(id) {
  const el = document.getElementById(id);
  if (!el) return;

  // Wire arrow buttons via JS — no onclick attributes in HTML
  const wrap = el.closest('.carousel-wrap');
  wrap.querySelector('.carousel-btn-prev').addEventListener('click', () => scrollCarousel(el, -1));
  wrap.querySelector('.carousel-btn-next').addEventListener('click', () => scrollCarousel(el, 1));

  el.addEventListener('scroll', () => updateCarouselButtons(el), { passive: true });
  updateCarouselButtons(el); // set initial disabled state
}

/* =============================================================
   TEAM PHOTO BACKGROUND SCROLL
   Add image paths to teamImages whenever you drop a photo into
   images/team/. The strip will auto-loop seamlessly.
   ============================================================= */
const teamImages = [
   'images/team/sample.jpg',
   'images/team/sample1.jpg',
   'images/team/sample2.jpg',
   'images/team/sample3.jpg',
];

function initTeamPhotoScroll() {
  const strip = document.getElementById('team-photo-scroll');
  if (!strip || teamImages.length === 0) return;

  // Duplicate images so the strip loops seamlessly
  [...teamImages, ...teamImages].forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    strip.appendChild(img);
  });

  // Calculate scroll duration once the first image has loaded
  strip.firstElementChild.addEventListener('load', () => {
    const halfWidth = strip.scrollWidth / 2;
    strip.style.setProperty('--scroll-width', `-${halfWidth}px`);
    strip.style.animation = `team-scroll ${halfWidth / 40}s linear infinite`;
  }, { once: true });
}

/* =============================================================
   BLOG DATA
   To add a post: add an entry below and drop the file in blog/.
   Shareable URL format: blog.html?post=<id>
   ============================================================= */
const posts = [
  {
    id: 'AI_Generated_Engineer_Refined',
    title: 'AI Generated. Engineer Refined!',
    date: 'Feb 18, 2026',
    file: 'blog/AI_Generated_Engineer_Refined.txt',
    preview: "Exploring the best practices in today's AI-led software development and how engineers are evolving.",
  },
  {
    id: 'cloud_hopper_manual',
    title: "The 'Cloud-Hopper' Manual",
    date: 'Feb 20, 2026',
    file: 'blog/cloud_hopper_manual',
    preview: 'A deep dive into digitizing assets and building portable architectures that survive multi-cloud migrations.',
  },
  {
    id: 'Building_Virtual_Developer_with_MCP',
    title: 'Building a Virtual Developer with MCP',
    date: 'Mar 19, 2026',
    file: 'blog/Building_Virtual_Developer_with_MCP',
    preview: 'How Model Context Protocol unlocks autonomous AI agents that connect directly to your databases and tools.',
  },
  {
    id: 'AI_First_Thinking',
    title: 'Why AI-First Thinking Is No Longer Optional — And How to Start Without Burning Budget',
    date: 'Apr 25, 2026',
    file: 'blog/AI_First_Thinking',
    preview: 'Why AI-First Thinking Is No Longer Optional — And How to Start Without Burning Budget.',
  },
];

/* =============================================================
   BLOG — list view (blog.html)
   ============================================================= */
function renderBlogList() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  container.innerHTML = posts.map(post => `
    <div class="card" onclick="loadBlogPost('${post.id}')"
         style="padding:32px; margin-bottom:18px; cursor:pointer;">
      <div style="color:var(--accent-blue); font-size:0.75rem; font-weight:700; margin-bottom:10px;">${post.date}</div>
      <h3 style="color:var(--text-main); margin:0 0 10px; font-size:1.1rem;">${post.title}</h3>
      <p style="color:var(--text-dim); font-size:0.88rem; margin-bottom:18px;">${post.preview}</p>
      <span style="color:var(--accent-blue); font-size:0.82rem; font-weight:700;">Read Article &rarr;</span>
    </div>
  `).join('');
}

/* =============================================================
   BLOG — post view (blog.html)
   Switches view first so the click always feels instant,
   then fetches content asynchronously.
   ============================================================= */
async function loadBlogPost(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const listView = document.getElementById('list-view');
  const postView = document.getElementById('post-view');
  if (!listView || !postView) return;

  // Show the post frame immediately — don't wait for the fetch
  document.getElementById('view-title').innerText = post.title;
  document.getElementById('view-date').innerText = post.date;
  document.getElementById('view-content').innerText = 'Loading…';
  listView.style.display = 'none';
  postView.style.display = 'block';
  globalThis.scrollTo(0, 0);

  // Update URL so this post is directly shareable
  const url = new URL(globalThis.location.href);
  url.searchParams.set('post', id);
  history.pushState({ postId: id }, post.title, url.toString());
  document.title = `${post.title} | KovaiLabs`;

  try {
    const response = await fetch(post.file);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    document.getElementById('view-content').innerText = await response.text();
  } catch {
    document.getElementById('view-content').innerText =
      'Could not load this article. Please visit the live site at kovailabs.online to read it.';
  }
}

function showBlogList() {
  const listView = document.getElementById('list-view');
  const postView = document.getElementById('post-view');
  if (!listView || !postView) return;

  listView.style.display = 'block';
  postView.style.display = 'none';

  const url = new URL(globalThis.location.href);
  url.searchParams.delete('post');
  history.pushState({}, 'Blog | KovaiLabs', url.toString());
  document.title = 'Blog | KovaiLabs';
}

/* =============================================================
   BLOG — homepage preview grid (index.html)
   ============================================================= */
function renderHomeBlogGrid() {
  const grid = document.getElementById('home-blog-grid');
  if (!grid) return;

  grid.innerHTML = posts.map(post => `
    <a class="blog-card" href="blog.html?post=${post.id}">
      <div class="blog-date">${post.date}</div>
      <h3>${post.title}</h3>
      <p>${post.preview}</p>
      <span class="read-more">Read Article &rarr;</span>
    </a>
  `).join('');
}

/* =============================================================
   SCROLL REVEAL
   Animates .reveal elements into view as they enter the viewport.
   ============================================================= */
function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* =============================================================
   BROWSER BACK / FORWARD on blog page
   ============================================================= */
globalThis.addEventListener('popstate', (e) => {
  if (!document.getElementById('list-view')) return;
  e.state?.postId ? loadBlogPost(e.state.postId) : showBlogList();
});

/* =============================================================
   INIT
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  type();
  initCarousel('domain-grid');
  initCarousel('team-grid');
  initTeamPhotoScroll();
  renderBlogList();
  renderHomeBlogGrid();
  initReveal();

  // Deep-link: open a specific post if ?post= is present in the URL
  const postId = new URLSearchParams(globalThis.location.search).get('post');
  if (postId) loadBlogPost(postId);
});
