import { enrichInterview } from './interview.mjs';
import { enrichCodingTests } from './coding-test.mjs';
import { getTopicVisual } from './topic-visuals.mjs';
import { buildDefinitionView } from './definition-format.mjs';
import { enrichMetaphor } from './metaphor.mjs';

const SECTION_META = {
  'core-java': { range: 'Fundamentals to professional core' },
  'advanced-java': { range: 'Modern features to production systems' },
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escCode(s) {
  return esc(s).replace(/^\s+/gm, (m) => m);
}

function renderDefinitionPanel(topic, content) {
  const { quick, points, deepDive } = buildDefinitionView(topic, content);

  const bullets =
    points.length > 0
      ? `<ul class="definition-points">${points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>`
      : '';

  const deep =
    deepDive
      ? `<details class="definition-more">
      <summary>Full definition</summary>
      <p class="definition-deep">${esc(deepDive)}</p>
    </details>`
      : '';

  return `<div class="definition-card">
    <p class="definition-quick">${esc(quick)}</p>
    ${bullets ? `<div class="definition-section"><span class="definition-label">Key points</span>${bullets}</div>` : ''}
    ${deep}
  </div>`;
}

function renderMetaphorPanel(metaphor) {
  if (!metaphor) {
    return '<p class="tab-empty">A metaphor for this topic is being prepared.</p>';
  }

  const rows = metaphor.mapping
    .map(
      (row) => `<div class="metaphor-map-row">
      <span class="metaphor-map-code">${esc(row.code)}</span>
      <span class="metaphor-map-arrow" aria-hidden="true">→</span>
      <span class="metaphor-map-real">${esc(row.real)}</span>
    </div>`,
    )
    .join('');

  return `<div class="metaphor-card">
    <p class="metaphor-hook">${esc(metaphor.hook)}</p>
    <p class="metaphor-story">${esc(metaphor.story)}</p>
    <div class="metaphor-section">
      <span class="metaphor-label">How it maps</span>
      <div class="metaphor-map">${rows}</div>
    </div>
    <p class="metaphor-reminder"><strong>Remember:</strong> ${esc(metaphor.reminder)}</p>
  </div>`;
}

function renderSyntaxPanel(syntaxList) {
  if (!syntaxList?.length) {
    return '<p class="tab-empty">Syntax examples for this topic are being prepared.</p>';
  }
  return syntaxList
    .map(
      (block) => `<div class="code-block">
      ${block.label ? `<div class="code-label">${esc(block.label)}</div>` : ''}
      <pre><code>${escCode(block.code)}</code></pre>
    </div>`,
    )
    .join('');
}

function renderCodingTestPanel(codingList) {
  if (!codingList?.length) {
    return '<p class="tab-empty">Coding test questions for this topic are being prepared.</p>';
  }
  const items = codingList
    .map(
      (item, i) => `<details class="coding-item">
      <summary class="coding-question"><span class="coding-q-num">T${i + 1}</span><span class="coding-q-title">${esc(item.title)}</span></summary>
      <div class="coding-body">
        <p class="coding-problem">${esc(item.problem)}</p>
        <div class="code-block">
          <div class="code-label">Code</div>
          <pre class="coding-code"><code>${escCode(item.code)}</code></pre>
        </div>
        <p class="coding-hint">Try solving it yourself before revealing the answer.</p>
        <details class="coding-reveal">
          <summary class="coding-reveal-btn">View Answer &amp; Explanation</summary>
          <div class="coding-solution">
            <div class="coding-output-block">
              <div class="code-label">Answer / Output</div>
              <pre class="coding-output"><code>${escCode(item.output)}</code></pre>
            </div>
            <div class="coding-explanation">
              <div class="code-label">Line-by-line explanation</div>
              <ol class="line-explain-list">
                ${item.lines
                  .map(
                    (line) => `<li class="line-explain-item">
                    <span class="line-num">${line.n}</span>
                    <code class="line-code">${esc(line.code || ' ')}</code>
                    <span class="line-text">${esc(line.text)}</span>
                  </li>`,
                  )
                  .join('')}
              </ol>
            </div>
          </div>
        </details>
      </div>
    </details>`,
    )
    .join('');
  const count = codingList.length;
  return `<p class="coding-intro">${count} coding test / machine-round questions — solve each problem first, then expand <strong>View Answer &amp; Explanation</strong> to check your result.</p>
    <div class="coding-list">${items}</div>`;
}

function renderInterviewPanel(interviewList) {
  if (!interviewList?.length) {
    return '<p class="tab-empty">Interview questions for this topic are being prepared.</p>';
  }
  const items = interviewList
    .map(
      (item, i) => `<details class="interview-item">
      <summary class="interview-question"><span class="interview-q-num">Q${i + 1}</span>${esc(item.question)}</summary>
      <div class="interview-answer">
        <p>${esc(item.answer)}</p>
        ${item.syntax ? `<pre class="interview-code"><code>${escCode(item.syntax)}</code></pre>` : ''}
      </div>
    </details>`,
    )
    .join('');
  const count = interviewList.length;
  return `<p class="interview-intro">${count} interview questions for this topic — from fundamentals to senior-level follow-ups, with explanations and code where relevant.</p>
    <div class="interview-list">${items}</div>`;
}

function renderTopicTabs(topic, content) {
  const base = `tab-${topic.id}`;
  const defId = `${base}-def`;
  const synId = `${base}-syn`;
  const metId = `${base}-met`;
  const visId = `${base}-vis`;
  const intId = `${base}-int`;
  const codId = `${base}-cod`;

  return `<div class="topic-tabs">
    <input type="radio" name="${base}" id="${defId}" class="tab-radio" checked />
    <input type="radio" name="${base}" id="${synId}" class="tab-radio" />
    <input type="radio" name="${base}" id="${metId}" class="tab-radio" />
    <input type="radio" name="${base}" id="${visId}" class="tab-radio" />
    <input type="radio" name="${base}" id="${intId}" class="tab-radio" />
    <input type="radio" name="${base}" id="${codId}" class="tab-radio" />
    <nav class="tab-nav" role="tablist" aria-label="Topic sections">
      <label for="${defId}" class="tab-btn" role="tab"><span class="tab-label-long">Definition</span><span class="tab-label-short">Def</span></label>
      <label for="${synId}" class="tab-btn" role="tab"><span class="tab-label-long">Syntax &amp; Examples</span><span class="tab-label-short">Syntax</span></label>
      <label for="${metId}" class="tab-btn" role="tab"><span class="tab-label-long">Metaphor</span><span class="tab-label-short">Meta</span></label>
      <label for="${visId}" class="tab-btn" role="tab"><span class="tab-label-long">Visuals</span><span class="tab-label-short">Visual</span></label>
      <label for="${intId}" class="tab-btn" role="tab"><span class="tab-label-long">Interview Questions</span><span class="tab-label-short">Interview</span></label>
      <label for="${codId}" class="tab-btn" role="tab"><span class="tab-label-long">Coding Test</span><span class="tab-label-short">Code</span></label>
    </nav>
    <div class="tab-panel tab-panel-def" role="tabpanel">
      ${renderDefinitionPanel(topic, content)}
    </div>
    <div class="tab-panel tab-panel-syn" role="tabpanel">
      ${renderSyntaxPanel(content.syntax)}
    </div>
    <div class="tab-panel tab-panel-met" role="tabpanel">
      ${renderMetaphorPanel(content.metaphor)}
    </div>
    <div class="tab-panel tab-panel-vis" role="tabpanel">
      ${getTopicVisual(topic, content)}
    </div>
    <div class="tab-panel tab-panel-int" role="tabpanel">
      ${renderInterviewPanel(content.interview)}
    </div>
    <div class="tab-panel tab-panel-cod" role="tabpanel">
      ${renderCodingTestPanel(content.codingTest)}
    </div>
  </div>`;
}

function head(title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#f8fafc" />
  <meta name="description" content="${esc(desc)}" />
  <title>${esc(title)}</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
</head>`;
}

function header(active) {
  return `${head(
    active === 'java' ? 'Java Learning Roadmap — DevAtlas' : 'DevAtlas — Java Learning Platform',
    'DevAtlas — Structured Core Java and Advanced Java curriculum from fundamentals to professional level.',
  )}
<body>
  <div class="layout">
    <header class="header">
      <a href="index.html" class="logo">
        <span class="logo-icon">DA</span>
        <span class="logo-text">DevAtlas</span>
      </a>
      <nav class="header-nav">
        ${active !== 'home' ? '<a href="index.html">Home</a>' : ''}
        <a href="java.html"${active === 'java' ? ' class="active"' : ''}>Java Roadmap</a>
      </nav>
    </header>
    <main class="main">`;
}

function footer(opts = {}) {
  const script = opts.visualScript
    ? '\n  <script src="js/visual-premium.js" defer></script>'
    : '';
  return `    </main>
  </div>${script}
</body>
</html>`;
}

function spectrum(sections) {
  const segments = sections
    .map(
      (sec) =>
        `<div class="spectrum-segment seg-${sec.id}">
        <div class="spectrum-label">${sec.title}</div>
        <div class="spectrum-range">${SECTION_META[sec.id].range}</div>
      </div>`,
    )
    .join('');
  return `<section class="spectrum"><div class="spectrum-track spectrum-track-2">${segments}</div></section>`;
}

function sectionTopicCount(sec) {
  return sec.groups.reduce((s, g) => s + g.topics.length, 0);
}

/**
 * @param {Record<string, object>} topicContent
 */
export function createSiteRenderer(topicContent, data) {
  function getTopicContent(topic) {
    const content = topicContent[topic.id];
    if (!content) {
      const fallback = { definition: topic.description, syntax: [], interview: [] };
      return {
        definition: topic.description,
        syntax: [],
        metaphor: enrichMetaphor(topic, fallback),
        interview: enrichInterview(topic, { ...fallback, interview: [] }),
        codingTest: enrichCodingTests(topic, { ...fallback, interview: [] }),
      };
    }
    return {
      ...content,
      metaphor: enrichMetaphor(topic, content),
      interview: enrichInterview(topic, content),
      codingTest: enrichCodingTests(topic, content),
    };
  }

  function topicItem(topic, index, sectionId) {
    const content = getTopicContent(topic);
    const tags = [
      topic.javaVersion ? `<span class="tag tag-accent">JDK ${esc(topic.javaVersion)}</span>` : '',
      ...(topic.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`),
    ].join('');

    return `<details class="topic-item topic-${sectionId}" id="${esc(topic.id)}">
    <summary class="topic-summary">
      <span class="topic-num">${index}</span>
      <span class="topic-title">${esc(topic.title)}</span>
      <span class="topic-chevron" aria-hidden="true"></span>
    </summary>
    <div class="topic-content">
      ${renderTopicTabs(topic, content)}
      ${tags ? `<div class="topic-tags">${tags}</div>` : ''}
    </div>
  </details>`;
  }

  function renderHome() {
    const java = data.languages.find((l) => l.id === 'java');
    const totalTopics = java.sections.reduce((s, sec) => s + sectionTopicCount(sec), 0);
    const coreCount = sectionTopicCount(java.sections.find((s) => s.id === 'core-java'));
    const advCount = sectionTopicCount(java.sections.find((s) => s.id === 'advanced-java'));

    const sectionCards = java.sections
      .map((sec) => {
        const count = sectionTopicCount(sec);
        const groupCount = sec.groups.length;
        return `<a href="java.html#${sec.id}" class="track-card track-${sec.id}">
          <span class="track-label">${sec.title}</span>
          <span class="track-count">${count} topics · ${groupCount} modules</span>
          <p class="track-desc">${esc(sec.description)}</p>
          <span class="track-cta">View ${sec.title} →</span>
        </a>`;
      })
      .join('');

    return `${header('home')}
      <section class="hero">
        <div class="container">
          <span class="hero-label">Java Learning Platform</span>
          <h1 class="hero-title">
            Master Java with
            <span class="highlight">Core &amp; Advanced</span>
            <span class="sub-line">A structured curriculum from first principles to professional-level concepts.</span>
          </h1>
          <p class="hero-desc"><strong>DevAtlas</strong> maps Java into two tracks — <strong>Core Java</strong> (${coreCount} topics) and <strong>Advanced Java</strong> (${advCount} topics) — ${totalTopics} concepts total with definitions, syntax, interview prep, and coding test / machine-round practice. Java is vast; this roadmap covers the professional path from first syntax through production systems.</p>
          <div class="hero-actions">
            <a href="java.html" class="btn btn-primary">View full roadmap</a>
            <a href="java.html#core-java" class="btn btn-secondary">Start with Core Java</a>
          </div>
        </div>
      </section>

      ${spectrum(java.sections)}

      <section class="stats">
        <div class="container stats-grid">
          <div class="stat"><p class="stat-value">${totalTopics}</p><p class="stat-label">Total topics</p></div>
          <div class="stat"><p class="stat-value">${coreCount}</p><p class="stat-label">Core Java</p></div>
          <div class="stat"><p class="stat-value">${advCount}</p><p class="stat-label">Advanced Java</p></div>
          <div class="stat"><p class="stat-value">21</p><p class="stat-label">JDK LTS</p></div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Curriculum</span>
            <h2 class="section-title">Two structured learning tracks</h2>
            <p class="section-desc">Each track progresses from foundational concepts to professional-level topics. Begin with Core Java, then advance when you're ready for concurrency, frameworks, and systems design.</p>
          </div>
          <div class="track-grid">${sectionCards}</div>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <div class="section-head">
            <span class="section-tag">Why DevAtlas</span>
            <h2 class="section-title">Complete coverage, clearly organized</h2>
          </div>
          <div class="pillars">
            <div class="pillar">
              <div class="pillar-num">01 — Core Java</div>
              <h3>Foundations to professional core</h3>
              <p>Variables, OOP, collections, generics, I/O, testing, and the practices every Java developer needs in day-to-day work.</p>
            </div>
            <div class="pillar">
              <div class="pillar-num">02 — Advanced Java</div>
              <h3>Modern Java to production</h3>
              <p>Lambdas, virtual threads, Spring, JVM tuning, microservices, security, and observability for senior-level work.</p>
            </div>
            <div class="pillar">
              <div class="pillar-num">03 — Accessible</div>
              <h3>Free and self-paced</h3>
              <p>No sign-up required. Learn at your own pace on any device, anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>
${footer()}`;
  }

  function renderJava() {
    const java = data.languages.find((l) => l.id === 'java');

    const levelNav = java.sections
      .map(
        (sec) =>
          `<a href="#${sec.id}" class="level-tab level-${sec.id}">${sec.title} <span>(${sectionTopicCount(sec)})</span></a>`,
      )
      .join('');

    let stepIndex = 0;

    const sections = java.sections
      .map((sec) => {
        const groups = sec.groups
          .map((group, groupIdx) => {
            const startNum = stepIndex + 1;
            const topics = group.topics
              .map((t) => {
                stepIndex += 1;
                return topicItem(t, stepIndex, sec.id);
              })
              .join('\n');
            const endNum = stepIndex;
            const rangeLabel =
              startNum === endNum ? `Step ${startNum}` : `Steps ${startNum}–${endNum}`;
            return `<details class="topic-module topic-module-${sec.id}" id="${group.id}"${groupIdx === 0 ? ' open' : ''}>
            <summary class="module-summary">
              <span class="module-step">${rangeLabel}</span>
              <span class="module-title">${esc(group.title)}</span>
              <span class="module-count">${group.topics.length} topics</span>
              <span class="module-chevron" aria-hidden="true"></span>
            </summary>
            <p class="module-desc">${esc(group.description)}</p>
            <div class="topic-list">${topics}</div>
          </details>`;
          })
          .join('');

        return `<section id="${sec.id}" class="level-section section-${sec.id}">
        ${groups}
      </section>`;
      })
      .join('');

    return `${header('java')}
      <nav class="level-nav">
        <div class="level-nav-inner">${levelNav}</div>
      </nav>

      <div class="container page-content">
        ${sections}
      </div>
${footer({ visualScript: true })}`;
  }

  return { renderHome, renderJava };
}
