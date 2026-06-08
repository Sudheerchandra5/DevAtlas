/**
 * Data Journey — start with initial state x, show how x changes in each box.
 */

import { stepMarker } from './visual-keyframes.mjs';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clip(s, max = 48) {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

const BALL_COLORS = ['#3b82f6', '#0d9488', '#7c3aed', '#ea580c', '#db2777', '#0891b2', '#65a30d'];

/** @type {Record<string, { initial: { state: string, note: string }, hops: { box: string, state: string, note: string, morph: string }[] }>} */
const TOPIC_CHAINS = {
  'variables-types': {
    initial: { state: 'x = ?', note: 'No value yet — stack slot empty' },
    hops: [
      { box: 'Declare int', state: 'x = 25', note: 'Primitive written directly on stack', morph: 'scale(1)' },
      { box: 'Reassign', state: 'x = 30', note: 'Same variable name, value replaced', morph: 'scale(1.2)' },
      { box: 'As double', state: 'x = 19.99', note: 'Wider type — fractional value stored', morph: 'scale(0.95)' },
      { box: 'String ref', state: 'x → ref', note: 'x holds heap address, not characters', morph: 'scale(1.1)' },
      { box: 'On heap', state: 'x = "Ada"', note: 'Referenced object lives off-stack', morph: 'scale(1.15)' },
      { box: 'Autobox', state: 'x = Integer(42)', note: 'Primitive wrapped as heap object', morph: 'scale(1.25)' },
    ],
  },
  'operators': {
    initial: { state: 'a=2, b=3', note: 'Two values ready for math' },
    hops: [
      { box: 'Add', state: 'x = 5', note: '2 + 3 evaluated into x', morph: 'scale(1.1)' },
      { box: 'Multiply', state: 'x = 14', note: 'Precedence: 3×4 first, then +2', morph: 'scale(1.2)' },
      { box: 'Compare', state: 'x = true', note: 'Relational → boolean', morph: 'scale(0.9)' },
      { box: 'Logic', state: 'x = false', note: '&& short-circuit changed result', morph: 'scale(1)' },
    ],
  },
  'inheritance': {
    initial: { state: 'Animal ref', note: 'Reference type only — no object yet' },
    hops: [
      { box: 'extends', state: 'Dog IS-A Animal', note: 'Child inherits parent fields', morph: 'scale(1.05)' },
      { box: 'super()', state: 'Parent ctor runs', note: 'Base part built first', morph: 'scale(1)' },
      { box: 'Override', state: 'speak() → "Woof"', note: 'Same method name, new behavior', morph: 'scale(1.2)' },
      { box: 'Dispatch', state: 'Animal a = new Dog()', note: 'Runtime picks Dog.speak()', morph: 'scale(1.15)' },
    ],
  },
  'stream-api': {
    initial: { state: 'list = [1,2,3,4]', note: 'Source collection in memory' },
    hops: [
      { box: 'stream()', state: 'pipeline open', note: 'Lazy — nothing runs yet', morph: 'scale(1)' },
      { box: 'filter', state: '[2, 4]', note: 'Odd numbers removed', morph: 'scale(0.9)' },
      { box: 'map', state: '["2","4"]', note: 'Each element transformed', morph: 'scale(1.1)' },
      { box: 'collect', state: 'new List', note: 'Terminal op materializes result', morph: 'scale(1.25)' },
    ],
  },
  'spring-boot': {
    initial: { state: 'main(args)', note: 'JVM starts — empty context' },
    hops: [
      { box: 'Scan', state: 'beans found', note: '@Component classes discovered', morph: 'scale(1)' },
      { box: 'Create', state: 'UserService bean', note: 'Spring instantiates objects', morph: 'scale(1.1)' },
      { box: 'Inject', state: 'repo wired in', note: 'Constructor receives dependency', morph: 'scale(1.15)' },
      { box: 'Listen', state: 'port 8080', note: 'Embedded server ready', morph: 'scale(1.2)' },
      { box: 'Request', state: 'GET /api → JSON', note: 'HTTP handled end-to-end', morph: 'scale(1.3)' },
    ],
  },
  'exception-handling': {
    initial: { state: 'x = a / b', note: 'Normal execution path' },
    hops: [
      { box: 'Risk', state: 'b = 0', note: 'Division becomes invalid', morph: 'scale(1)' },
      { box: 'throw', state: 'ArithmeticEx', note: 'JVM creates exception object', morph: 'scale(1.2)' },
      { box: 'catch', state: 'handled', note: 'Matching handler absorbs error', morph: 'scale(0.95)' },
      { box: 'finally', state: 'cleanup done', note: 'Resources closed regardless', morph: 'scale(1)' },
    ],
  },
  'collections': {
    initial: { state: 'x = empty', note: 'No elements stored' },
    hops: [
      { box: 'add', state: 'x = [A]', note: 'First element inserted', morph: 'scale(1)' },
      { box: 'add', state: 'x = [A,B]', note: 'List grows at end', morph: 'scale(1.1)' },
      { box: 'get(0)', state: 'x → A', note: 'Index lookup by position', morph: 'scale(1)' },
      { box: 'Map put', state: 'key→value', note: 'Hash determines bucket', morph: 'scale(1.15)' },
    ],
  },
};

const MORPH_DEFAULTS = ['scale(1)', 'scale(1.12)', 'scale(0.92)', 'scale(1.2)', 'scale(1.05)', 'scale(1.18)', 'scale(0.88)'];

/** Equal-width flex boxes — center of box i across full track width */
function boxCenterPercent(i, n) {
  return ((i + 0.5) / n) * 100;
}

function extractAssign(code) {
  if (!code || code.startsWith('//')) return null;
  const line = code.split('\n').find((l) => l.trim() && !l.trim().startsWith('//'))?.trim();
  if (!line) return null;
  const m = line.match(/(\w+)\s*=\s*(.+)/);
  if (m) return `${m[1]} = ${clip(m[2].replace(/;$/, ''), 16)}`;
  return clip(line, 20);
}

function nextState(prev, step, index) {
  const assign = extractAssign(step.code);
  if (assign && assign !== prev) return assign;

  const effect = clip(step.detail, 28);
  if (effect && effect !== prev) return effect;

  const label = clip(step.label, 20);
  if (label && label !== prev) return `${label} ✓`;

  return `x${index + 1}`;
}

function pickDistinctHops(steps, initialState, max = 6) {
  const hops = [];
  const seenLabels = new Set();
  const seenStates = new Set([initialState]);
  let prev = initialState;

  for (const step of steps) {
    const labelKey = step.label.toLowerCase();
    if (seenLabels.has(labelKey)) continue;
    if (hops.length > 0 && step.code?.startsWith('//') && !step.code.includes('=')) continue;

    let state = nextState(prev, step, hops.length);
    if (seenStates.has(state)) {
      state = `${clip(step.label, 14)} → ${hops.length + 1}`;
    }
    if (seenStates.has(state)) continue;

    seenLabels.add(labelKey);
    seenStates.add(state);
    hops.push({
      box: clip(step.label, 22),
      state,
      note: clip(step.detail, 72),
      morph: MORPH_DEFAULTS[hops.length % MORPH_DEFAULTS.length],
    });
    prev = state;
    if (hops.length >= max) break;
  }
  return hops;
}

function attachBeforeChain(initial, hops) {
  let prev = initial.state;
  return hops.map((h, i) => {
    const hop = { ...h, before: prev };
    prev = h.state;
    if (!hop.morph) hop.morph = MORPH_DEFAULTS[i % MORPH_DEFAULTS.length];
    return hop;
  });
}

function buildChain(topic, steps) {
  if (TOPIC_CHAINS[topic.id]) {
    return {
      initial: TOPIC_CHAINS[topic.id].initial,
      hops: attachBeforeChain(TOPIC_CHAINS[topic.id].initial, TOPIC_CHAINS[topic.id].hops),
    };
  }

  const initial = { state: 'x = input', note: `Starting point for ${clip(topic.title, 36)}` };

  let hops = pickDistinctHops(steps, initial.state, 6);
  if (hops.length === 0) {
    hops = steps.slice(0, 5).map((s, i) => ({
      box: clip(s.label, 22),
      state: nextState(i === 0 ? initial.state : `x${i}`, s, i),
      note: clip(s.detail, 72),
      morph: MORPH_DEFAULTS[i % MORPH_DEFAULTS.length],
    }));
  }

  return { initial, hops: attachBeforeChain(initial, hops) };
}

function ballClass(topicId) {
  return `ball-journey-${topicId.replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

function generateBallStyles(uid, chain, cycleSec) {
  const hops = chain.hops;
  const n = hops.length;
  const slot = 100 / n;
  const fade = slot * 0.12;
  let css = `.${uid} { --ball-cycle: ${cycleSec}s; }\n`;

  let moveKf = `@keyframes ${uid}-ball-pos {\n`;
  let morphKf = `@keyframes ${uid}-ball-morph {\n`;
  let labelKf = `@keyframes ${uid}-ball-label {\n`;

  for (let i = 0; i < n; i++) {
    const start = i * slot;
    const on = start + fade;
    const off = start + slot - fade;
    const end = start + slot;
    const pos = boxCenterPercent(i, n);
    const color = BALL_COLORS[i % BALL_COLORS.length];
    const hop = hops[i];

    moveKf += `  ${on.toFixed(2)}%, ${off.toFixed(2)}% { left: ${pos.toFixed(2)}%; }\n`;
    morphKf += `  ${on.toFixed(2)}%, ${off.toFixed(2)}% { transform: translateX(-50%) ${hop.morph}; background: ${color}; }\n`;

    css += `@keyframes ${uid}-box-${i} {
  0%, ${start.toFixed(2)}% { border-color: var(--border); background: var(--surface); }
  ${on.toFixed(2)}%, ${off.toFixed(2)}% { border-color: ${color}; background: ${color}18; box-shadow: 0 4px 16px ${color}40; }
  ${end.toFixed(2)}%, 100% { border-color: var(--border); background: var(--surface); }
}
.${uid} .ball-box-${i} { animation: ${uid}-box-${i} var(--ball-cycle) linear infinite; }
`;

    css += `@keyframes ${uid}-bcap-${i} {
  0%, ${start.toFixed(2)}% { opacity: 0; }
  ${on.toFixed(2)}%, ${off.toFixed(2)}% { opacity: 1; }
  ${end.toFixed(2)}%, 100% { opacity: 0; }
}
.${uid} .ball-cap-${i} { animation: ${uid}-bcap-${i} var(--ball-cycle) linear infinite; }
`;
  }

  moveKf += '}\n';
  morphKf += '}\n';
  labelKf += '}\n';

  css += moveKf + morphKf;
  css += `.${uid} .data-ball {
  animation: ${uid}-ball-pos var(--ball-cycle) linear infinite, ${uid}-ball-morph var(--ball-cycle) linear infinite;
}
.${uid} .ball-caption { animation-duration: var(--ball-cycle); animation-timing-function: linear; animation-iteration-count: infinite; }
`;

  return css;
}

/**
 * @param {{ id: string, title: string }} topic
 * @param {{ label: string, detail: string, code: string }[]} steps
 * @param {number} cycleSec
 */
export function buildBallVisual(topic, steps, cycleSec) {
  const chain = buildChain(topic, steps);
  const hops = chain.hops;
  const n = hops.length;
  const uid = ballClass(topic.id);
  const ballCycle = Math.max(12, n * 4);
  const css = generateBallStyles(uid, chain, ballCycle);

  const boxes = hops
    .map((h, i) => {
      const color = BALL_COLORS[i % BALL_COLORS.length];
      return `<div class="ball-box ball-box-${i}">
        <div class="ball-box-inner" style="--box-accent: ${color}">
          <div class="ball-box-slot"><span class="ball-x-state">${esc(h.state)}</span></div>
          <span class="ball-box-title">${esc(h.box)}</span>
          <span class="ball-box-transform"><span class="ball-x-before">${esc(h.before || chain.initial.state)}</span><span class="ball-x-arrow">→</span><span class="ball-x-after">${esc(h.state)}</span></span>
        </div>
      </div>`;
    })
    .join('');

  const captions = hops
    .map((h, i) => {
      const marker = stepMarker(i);
      return `<span class="ball-caption ball-cap-${i}">${marker} <strong>${esc(h.box)}</strong>: x was <code>${esc(h.before || chain.initial.state)}</code> → now <code>${esc(h.state)}</code> — ${esc(h.note)}</span>`;
    })
    .join('');

  const chainTrail = [chain.initial.state, ...hops.map((h) => h.state)]
    .map((s, i) => `<span class="ball-chain-node" style="--node-color: ${BALL_COLORS[i % BALL_COLORS.length]}">${esc(s)}</span>`)
    .join('<span class="ball-chain-arrow">→</span>');

  return `<div class="ball-journey-stage visual-stage visual-animated-stage ${uid}" style="--ball-cycle: ${ballCycle}s; --step-count: ${n}" data-visual-steps="${n}" data-visual-cycle="${ballCycle}" data-visual-mode="ball" aria-label="${esc(topic.title)} data state journey">
  <style>${css}</style>
  <div class="ball-caption-bar">${captions}</div>
  <div class="ball-journey-grid">
    <div class="ball-arena-wrap">
      <div class="ball-arena ball-arena-scroll">
        <div class="ball-track">
          <div class="data-ball" aria-hidden="true"><span class="data-ball-core"></span></div>
          ${boxes}
        </div>
      </div>
    </div>
    <aside class="ball-journey-aside">
      <div class="ball-origin">
        <span class="ball-origin-tag">Initial state</span>
        <span class="ball-origin-state">${esc(chain.initial.state)}</span>
        <span class="ball-origin-note">${esc(chain.initial.note)}</span>
      </div>
      <div class="ball-state-chain">
        <span class="ball-chain-label">State trail</span>
        <div class="ball-chain-trail">${chainTrail}</div>
      </div>
    </aside>
  </div>
</div>`;
}
