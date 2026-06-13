/**
 * Test harness: cross-checks every concept's code lines against its
 * generated visualization steps. Run with `npm test`.
 *
 * Validates two things for all 120 topics:
 *   1. Structural invariants (step/line mapping, accumulation, no template flood).
 *   2. Semantic matching (each code line maps to a visual node that describes it).
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import javaTopics from './java-topics.mjs';
import { buildConceptVisualData } from './concept-visual.mjs';
import { buildArrayVisualData } from './visual-array.mjs';
import { buildMemoryVisualData } from './memory-runtime.mjs';
import { primaryTag } from './visual-flow.mjs';
import { DATA_DIR } from './paths.mjs';

const data = JSON.parse(readFileSync(join(DATA_DIR, 'languages.json'), 'utf8'));

const SPECIAL = { 'variables-types': 'memory', arrays: 'array' };
const KNOWN_MODES = new Set([
  'journey', 'hierarchy', 'pipeline', 'flow', 'timeline', 'layers', 'storage', 'cycle', 'stack', 'shield',
]);
const ACCUMULATE_MODES = new Set(['stack', 'storage', 'hierarchy', 'layers', 'shield', 'timeline', 'cycle']);

function walkTopics() {
  const out = [];
  const java = data.languages.find((l) => l.id === 'java');
  for (const sec of java.sections) {
    for (const group of sec.groups) {
      for (const t of group.topics) out.push(t);
    }
  }
  return out;
}

/**
 * Given a raw code line, return the label we EXPECT the builder to produce
 * (or null if "any sensible non-generic label" is acceptable). This is the
 * independent source of truth the visualization is checked against.
 */
function expectedLabelFor(line, mode) {
  const t = line.trim();
  if (t.startsWith('//')) return mode === 'stack' ? 'Next example' : 'Next section';

  if (mode === 'pipeline') {
    if (/\.orElse\(|\.orElseGet\(|\.orElseThrow\(/.test(t)) return 'Default value';
    if (/\.collect\(|\.reduce\(|\.count\(|\.average\(|\.sum\(|\.min\(|\.max\(|\.findFirst\(|\.forEach\(/.test(t)) return /\.(\w+)\(/.exec(t)[1] + '()';
    if (/\.distinct\(|\.limit\(|\.skip\(/.test(t)) return 'Stateful step';
    if (/\.filter\(/.test(t)) return 'filter()';
    if (/\.flatMap\(/.test(t)) return 'flatMap()';
    if (/\.map\(/.test(t)) return 'map()';
    if (/\.sorted\(/.test(t)) return 'sorted()';
    if (/\.stream\(\)|IntStream\.|LongStream\.|DoubleStream\.|Stream\.of|Stream\.generate/.test(t)) return 'Source';
  }

  if (mode === 'stack') {
    if (/^\s*(public|private|protected|static).+\([^)]*\)\s*\{/.test(t) || /^\w[\w<>,\s]*\s+\w+\s*\([^)]*\)\s*\{/.test(t)) return null;
    if (/return\b/.test(t)) return 'Return & pop';
  }

  if (/\bclass\s+(\w+)/.test(t)) return `Class: ${/\bclass\s+(\w+)/.exec(t)[1]}`;
  if (/\binterface\s+(\w+)/.test(t)) return `Interface: ${/\binterface\s+(\w+)/.exec(t)[1]}`;
  if (/\bextends\s+(\w+)/.test(t)) return 'Inheritance';
  if (/\bimplements\s+/.test(t)) return 'Implements';
  if (/\bif\s*\(/.test(t) || /\belse\b/.test(t)) return 'Decision';
  if (/\bfor\s*\(|\bwhile\s*\(/.test(t)) return 'Loop';
  if (/\bswitch\s*\(/.test(t)) return 'Switch / match';
  if (/\btry\b/.test(t)) return 'Try block';
  if (/\bcatch\b/.test(t)) return 'Catch block';
  if (/\bthrow\b/.test(t)) return 'Throw error';
  return null; // any sensible label is fine (Execute line, Method, Store, etc.)
}

const tests = [];
function check(topicId, name, cond, detail) {
  tests.push({ topicId, name, pass: !!cond, detail: cond ? '' : detail });
}

function validateConcept(topic, content) {
  const id = topic.id;
  const built = buildConceptVisualData(topic, content);
  const { steps, codeLines, mode, badge } = built;

  check(id, 'mode-known', KNOWN_MODES.has(mode), `unknown mode "${mode}"`);
  check(id, 'has-badge', !!badge, 'missing badge');
  check(id, 'intro-step', steps[0] && steps[0].line === -1, 'first step is not intro (line=-1)');
  check(id, 'min-steps', steps.length >= 2, `only ${steps.length} steps`);

  const codeSteps = steps.filter((s) => s.line >= 0);

  // T4: one step per code line, sequential 0..n-1
  check(id, 'line-count-match', codeSteps.length === codeLines.length,
    `${codeSteps.length} code steps vs ${codeLines.length} code lines`);
  const seq = codeSteps.map((s) => s.line);
  const expectedSeq = codeLines.map((_, i) => i);
  check(id, 'line-sequence', JSON.stringify(seq) === JSON.stringify(expectedSeq),
    `line sequence ${JSON.stringify(seq)} != ${JSON.stringify(expectedSeq)}`);

  // T9: no template flood when real syntax exists
  const hasSyntax = (content.syntax || []).some((b) => (b.code || '').trim());
  if (hasSyntax) {
    const sceneOnly = steps.filter((s, i) => i > 0 && s.line < 0);
    check(id, 'no-template-flood', sceneOnly.length === 0,
      `${sceneOnly.length} template-only steps appended despite real code`);
  }

  // Per code-line checks
  let prevCount = 0;
  for (const s of codeSteps) {
    const items = s.scene?.items || [];
    const active = items.find((it) => it.id === s.scene?.activeId);
    check(id, `caption@${s.line}`, !!(s.caption && s.caption.trim()), 'empty caption');
    check(id, `scene-active@${s.line}`, !!active, `activeId "${s.scene?.activeId}" not in scene items`);

    if (ACCUMULATE_MODES.has(mode)) {
      check(id, `accumulate@${s.line}`, items.length >= prevCount && items.length <= 10,
        `item count ${items.length} (prev ${prevCount}) out of range`);
      prevCount = items.length;
    } else {
      check(id, `single-node@${s.line}`, items.length === 1,
        `non-accumulate mode has ${items.length} nodes`);
    }

    // Semantic match
    const expected = expectedLabelFor(codeLines[s.line], mode);
    if (expected !== null && active) {
      check(id, `semantics@${s.line}`, active.label === expected,
        `line "${codeLines[s.line]}" → got "${active.label}", expected "${expected}"`);
    }
    // Generic-fallthrough detection: a structural keyword (declaration / control
    // flow) was present but produced a generic label. `.class` literals and
    // method names like `orElse`/`getClass` are NOT structural keywords.
    if (active && active.label === 'Execute line') {
      const raw = codeLines[s.line];
      const meaningful = /\bclass\s+\w|\binterface\s+\w|\breturn\b|\bif\s*\(|\bfor\s*\(|\bwhile\s*\(|\btry\b|\bcatch\s*\(|\bthrow\b/.test(raw);
      check(id, `no-generic-fallthrough@${s.line}`, !meaningful,
        `generic "Execute line" for structural code: "${raw}"`);
    }
  }
}

function validateArray() {
  const built = buildArrayVisualData();
  check('arrays', 'array-has-steps', built.steps && built.steps.length >= 3, 'array steps missing');
  check('arrays', 'array-captions', built.steps.every((s) => s.caption && s.caption.trim()), 'array step missing caption');
}

function validateMemory(topic, content) {
  const built = buildMemoryVisualData(topic, content);
  check('variables-types', 'memory-has-steps', built.steps && built.steps.length >= 3, 'memory steps missing');
  check('variables-types', 'memory-captions', built.steps.every((s) => s.caption && s.caption.trim()), 'memory step missing caption');
}

// ── Run ──
const topics = walkTopics();
check('_meta', 'topic-count', topics.length === 120, `found ${topics.length} topics, expected 120`);

for (const topic of topics) {
  const content = javaTopics[topic.id] || { definition: topic.description, syntax: [] };
  if (SPECIAL[topic.id] === 'array') validateArray();
  else if (SPECIAL[topic.id] === 'memory') validateMemory(topic, content);
  else validateConcept(topic, content);
}

// ── Report ──
const failures = tests.filter((t) => !t.pass);
const byTopic = {};
for (const f of failures) (byTopic[f.topicId] ||= []).push(f);

console.log(`\nRan ${tests.length} assertions across ${topics.length} topics.`);
if (!failures.length) {
  console.log('\x1b[32m✔ ALL PASS — every concept matches its visualization.\x1b[0m');
  process.exit(0);
}

console.log(`\x1b[31mx ${failures.length} FAILURES across ${Object.keys(byTopic).length} topics:\x1b[0m\n`);
for (const [topicId, fails] of Object.entries(byTopic)) {
  console.log(`\x1b[33m${topicId}\x1b[0m (${fails.length})`);
  for (const f of fails.slice(0, 12)) console.log(`   • [${f.name}] ${f.detail}`);
  if (fails.length > 12) console.log(`   … +${fails.length - 12} more`);
}
process.exit(1);
