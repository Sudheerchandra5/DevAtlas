import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, '../data/languages.json'), 'utf8'));

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function header(active) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#0f1117" />
  <meta name="description" content="DevAtlas — Learn programming languages from basics to expert level" />
  <title>DevAtlas — Learn to Code</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="layout">
    <header class="header">
      <a href="index.html" class="logo">
        <span class="logo-icon">DA</span>
        <span class="logo-text">DevAtlas</span>
      </a>
      <nav class="header-nav">
        ${active !== 'home' ? '<a href="index.html">Home</a>' : ''}
        <a href="java.html"${active === 'java' ? ' class="active"' : ''}>Java</a>
      </nav>
    </header>
    <main class="main">`;
}

function footer(active) {
  return `    </main>
    <footer class="footer">
      <p>DevAtlas — Learn on any device</p>
    </footer>
    <nav class="mobile-nav" aria-label="Mobile navigation">
      <a href="index.html" class="mobile-nav-item${active === 'home' ? ' active' : ''}">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        Home
      </a>
      <a href="java.html" class="mobile-nav-item${active === 'java' ? ' active' : ''}">
        <span class="mobile-nav-icon">☕</span>
        Java
      </a>
    </nav>
  </div>
</body>
</html>`;
}

function generateHome() {
  const java = data.languages.find((l) => l.id === 'java');
  const totalTopics = java.sections.reduce((s, sec) => s + sec.topics.length, 0);

  const html = `${header('home')}
      <section class="hero">
        <div class="hero-glow"></div>
        <div class="container">
          <span class="badge"><span class="badge-dot"></span>Structured learning paths for every level</span>
          <h1 class="hero-title">Master programming <span class="gradient-text">one language at a time</span></h1>
          <p class="hero-desc">DevAtlas provides curated, up-to-date learning roadmaps from absolute basics to expert-level concepts. Start your journey today and grow at your own pace.</p>
          <div class="hero-actions">
            <a href="java.html" class="btn btn-primary">Start with Java →</a>
            <a href="#languages" class="btn btn-secondary">Browse Languages</a>
          </div>
        </div>
      </section>

      <section class="stats">
        <div class="container stats-grid">
          <div class="stat"><p class="stat-value">1</p><p class="stat-label">Languages Available</p></div>
          <div class="stat"><p class="stat-value">${totalTopics}</p><p class="stat-label">Topics Covered</p></div>
          <div class="stat"><p class="stat-value">4</p><p class="stat-label">Difficulty Levels</p></div>
          <div class="stat"><p class="stat-value">∞</p><p class="stat-label">More Coming</p></div>
        </div>
      </section>

      <section id="languages" class="section">
        <div class="container">
          <h2 class="section-title">Choose a Language</h2>
          <p class="section-desc">Pick a language to explore its complete learning roadmap</p>
          <div class="card-grid">
            <a href="java.html" class="card card-link">
              <div class="card-icon java-icon">☕</div>
              <h3>Java</h3>
              <p class="card-tagline">Write once, run anywhere</p>
              <p class="card-desc">${esc(java.description)}</p>
              <div class="card-meta">
                <span>${totalTopics} topics</span>
                <span>4 levels</span>
                <span class="card-badge">${java.currentVersion}</span>
              </div>
              <span class="card-cta">Start Learning →</span>
            </a>
            <div class="card card-placeholder">
              <div class="card-icon">➕</div>
              <h3>More Languages</h3>
              <p class="card-desc">Python, JavaScript, TypeScript, Go, Rust, and more are on the way</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <h2 class="section-title">How DevAtlas Works</h2>
          <div class="steps-grid">
            <div class="step"><span class="step-num">01</span><h3>Pick a Language</h3><p>Choose from our growing catalog of programming languages, each with a structured curriculum.</p></div>
            <div class="step"><span class="step-num">02</span><h3>Follow the Roadmap</h3><p>Progress through Beginner → Intermediate → Advanced → Expert levels at your own pace.</p></div>
            <div class="step"><span class="step-num">03</span><h3>Master Every Concept</h3><p>Each topic covers modern, up-to-date features so you learn what the industry actually uses.</p></div>
          </div>
        </div>
      </section>
${footer('home')}`;

  writeFileSync(join(__dirname, '../index.html'), html);
}

function topicCard(topic, index, level) {
  const tags = [
    topic.javaVersion ? `<span class="tag tag-accent">Java ${esc(topic.javaVersion)}</span>` : '',
    ...(topic.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`),
  ].join('');

  return `<article class="topic-card topic-${level}">
    <span class="topic-num">${String(index).padStart(2, '0')}</span>
    <div class="topic-body">
      <h3>${esc(topic.title)}</h3>
      <p>${esc(topic.description)}</p>
      ${tags ? `<div class="topic-tags">${tags}</div>` : ''}
    </div>
  </article>`;
}

function generateJava() {
  const java = data.languages.find((l) => l.id === 'java');
  const totalTopics = java.sections.reduce((s, sec) => s + sec.topics.length, 0);

  const levelNav = java.sections
    .map(
      (sec) =>
        `<a href="#${sec.id}" class="level-tab level-${sec.id}">${sec.title} <span>(${sec.topics.length})</span></a>`,
    )
    .join('');

  const overview = java.sections
    .map((sec, i) => {
      const pct = Math.round((sec.topics.length / totalTopics) * 100);
      const colors = ['emerald', 'sky', 'violet', 'amber'];
      return `<div class="progress-row">
        <div class="progress-label"><span class="level-${sec.id}">${sec.title}</span><span class="muted">${sec.topics.length} topics</span></div>
        <span class="muted">${pct}%</span>
        <div class="progress-bar"><div class="progress-fill fill-${colors[i]}" style="width:${pct}%"></div></div>
      </div>`;
    })
    .join('');

  const sections = java.sections
    .map((sec) => {
      const topics = sec.topics
        .map((t, i) => topicCard(t, i + 1, sec.id))
        .join('\n');
      return `<section id="${sec.id}" class="level-section">
        <div class="level-header">
          <span class="level-badge level-${sec.id}">${sec.title}</span>
          <div><h2>${sec.title} Level</h2><p>${esc(sec.description)}</p></div>
        </div>
        <div class="topic-grid">${topics}</div>
      </section>`;
    })
    .join('');

  const path = java.sections
    .map(
      (sec, i) =>
        `<div class="path-item"><div class="path-circle level-${sec.id}">${i + 1}</div><div><strong class="level-${sec.id}">${sec.title}</strong><span class="muted">${sec.topics.length} topics</span></div></div>`,
    )
    .join('');

  const html = `${header('java')}
      <section class="lang-hero java-hero">
        <div class="container">
          <a href="index.html" class="back-link">← All Languages</a>
          <div class="lang-hero-content">
            <div class="lang-icon java-icon">☕</div>
            <div>
              <div class="lang-title-row">
                <h1>Java</h1>
                <span class="version-badge">${java.currentVersion}</span>
              </div>
              <p class="lang-tagline">${java.tagline}</p>
              <p class="lang-desc">${esc(java.description)}</p>
              <div class="lang-stats">
                <span><strong>${totalTopics}</strong> Topics</span>
                <span><strong>4</strong> Levels</span>
                <span>Beginner → Expert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav class="level-nav">
        <div class="level-nav-inner">${levelNav}</div>
      </nav>

      <div class="container page-content">
        <div class="overview-card">
          <h2>Curriculum Overview</h2>
          ${overview}
        </div>
        ${sections}
        <div class="path-card">
          <h2>Your Learning Path</h2>
          <div class="path-list">${path}</div>
        </div>
      </div>
${footer('java')}`;

  writeFileSync(join(__dirname, '../java.html'), html);
}

generateHome();
generateJava();
console.log('Generated index.html and java.html');
