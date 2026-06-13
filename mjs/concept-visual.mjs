/**
 * Concept-based visuals for every topic — mode driven by tag + topic id.
 */

import { primaryTag, TEMPLATES } from './visual-flow.mjs';

const TAG_MODE = {
  oop: 'hierarchy',
  collections: 'storage',
  generics: 'pipeline',
  concurrency: 'timeline',
  functional: 'pipeline',
  modern: 'pipeline',
  reactive: 'pipeline',
  io: 'journey',
  web: 'layers',
  framework: 'layers',
  database: 'storage',
  jvm: 'journey',
  performance: 'journey',
  architecture: 'layers',
  security: 'shield',
  testing: 'cycle',
  devops: 'cycle',
  cloud: 'cycle',
  'error-handling': 'flow',
  debugging: 'journey',
  tools: 'journey',
  setup: 'journey',
  syntax: 'journey',
  api: 'journey',
  professional: 'journey',
  'best-practices': 'journey',
  overview: 'journey',
};

/** Topic-level overrides — only `methods` uses true call-stack visuals. */
const TOPIC_MODE = {
  methods: 'stack',
  operators: 'flow',
  'control-flow': 'flow',
  loops: 'flow',
  'exception-handling': 'flow',
  'reading-errors': 'flow',
  'pattern-matching': 'flow',
  'auto-closeable': 'flow',
  'jdbc-transactions': 'flow',
  strings: 'storage',
  'string-pool': 'storage',
  encapsulation: 'hierarchy',
  inheritance: 'hierarchy',
  polymorphism: 'hierarchy',
  abstraction: 'hierarchy',
  interfaces: 'hierarchy',
  'oop-intro': 'hierarchy',
  'initialization-order': 'hierarchy',
  'stream-api': 'pipeline',
  'stream-advanced': 'pipeline',
  'lambda-expressions': 'pipeline',
  'method-references': 'pipeline',
  optional: 'pipeline',
  records: 'pipeline',
  'sealed-classes': 'pipeline',
  'reactive-java': 'pipeline',
  'concurrency-basics': 'timeline',
  'virtual-threads': 'timeline',
  'completable-future': 'timeline',
  'fork-join': 'timeline',
  'structured-concurrency': 'timeline',
  'java-memory-model': 'timeline',
  'threadlocal-pitfalls': 'timeline',
  'spring-boot': 'layers',
  'spring-advanced': 'layers',
  'spring-security': 'layers',
  'rest-apis': 'layers',
  'jpa-hibernate': 'layers',
  jdbc: 'storage',
  'what-is-java': 'layers',
  'jvm-architecture': 'layers',
  'garbage-collection': 'cycle',
  'memory-management': 'storage',
  'bytecode-asm': 'pipeline',
  'jvm-cli-tools': 'journey',
  'jmx-monitoring': 'journey',
  'jlink-runtimes': 'cycle',
  'foreign-memory': 'layers',
  observability: 'layers',
  security: 'shield',
  'tls-keystore': 'shield',
  'junit-basics': 'cycle',
  'mockito-testing': 'cycle',
  'testing-advanced': 'cycle',
  'build-tools': 'cycle',
  'cicd-containers': 'cycle',
  'graalvm-native': 'cycle',
  logging: 'journey',
  'java-roadmap': 'journey',
};

const MODE_META = {
  journey: { badge: 'GSAP · Step journey', intro: 'follow each stage in order', scrub: ['start', 'middle', 'done'] },
  hierarchy: { badge: 'GSAP · Class & object model', intro: 'types, fields, and relationships', scrub: ['class', 'fields', 'behavior'] },
  pipeline: { badge: 'GSAP · Data pipeline', intro: 'data flows through stages', scrub: ['source', 'transform', 'result'] },
  flow: { badge: 'GSAP · Control flow', intro: 'which path the program takes', scrub: ['check', 'branch', 'outcome'] },
  timeline: { badge: 'GSAP · Parallel execution', intro: 'tasks running alongside each other', scrub: ['start', 'run', 'sync'] },
  layers: { badge: 'GSAP · Layered architecture', intro: 'each layer has a specific job', scrub: ['client', 'logic', 'data'] },
  storage: { badge: 'GSAP · Data storage', intro: 'how values are kept and retrieved', scrub: ['add', 'lookup', 'update'] },
  cycle: { badge: 'GSAP · Repeatable process', intro: 'steps that loop in a workflow', scrub: ['build', 'test', 'ship'] },
  stack: { badge: 'GSAP · Method call stack', intro: 'method calls push and pop stack frames', scrub: ['caller', 'current', 'return'] },
  shield: { badge: 'GSAP · Security layers', intro: 'protecting data step by step', scrub: ['input', 'check', 'safe'] },
};

const MODE_INTRO = {
  journey: 'Follow each stage in order as the concept unfolds.',
  hierarchy: 'Types, fields, and relationships build an object model.',
  pipeline: 'Data passes through transformation stages one by one.',
  flow: 'Conditions and branches decide which execution path runs.',
  timeline: 'Tasks run in parallel — watch how they coordinate.',
  layers: 'Each layer has a distinct job in the overall system.',
  storage: 'Values are stored, looked up, and updated over time.',
  cycle: 'Steps repeat in a workflow that loops until done.',
  stack: 'Method calls push frames onto the stack; return pops back to the caller.',
  shield: 'Security checks wrap the system to keep data safe.',
};

const STACK_SCENES = [
  { label: 'Caller', detail: 'The method that makes the call', icon: '📞' },
  { label: 'Push frame', detail: 'Callee starts — locals allocated on stack', icon: '📥' },
  { label: 'Execute body', detail: 'Statements run inside this frame', icon: '⚙️' },
  { label: 'Return value', detail: 'Result sent back to caller', icon: '↩️' },
  { label: 'Pop frame', detail: 'Frame removed — control returns up', icon: '📤' },
];

const JVM_LAYER_SCENES = [
  { label: 'Class loaders', detail: 'Load .class bytecode into JVM' },
  { label: 'Verifier', detail: 'Bytecode safety checks before run' },
  { label: 'Interpreter / JIT', detail: 'Execute then optimize hot code' },
  { label: 'Heap & stack', detail: 'Object heap and per-thread stacks' },
  { label: 'GC', detail: 'Reclaim unreachable objects' },
];

const GC_CYCLE_SCENES = [
  { label: 'Allocate', detail: 'New objects created on heap' },
  { label: 'Mark', detail: 'Find all reachable objects' },
  { label: 'Sweep', detail: 'Free unreachable memory' },
  { label: 'Tune flags', detail: 'Adjust GC for your workload' },
];

const MEMORY_SCENES = [
  { label: 'Strong ref', detail: 'Object stays while referenced' },
  { label: 'Soft / weak', detail: 'Collected under memory pressure' },
  { label: 'Leak risk', detail: 'Forgotten references keep objects alive' },
  { label: 'Heap dump', detail: 'Analyze what still occupies memory' },
  { label: 'Fix', detail: 'Close resources and clear caches' },
];

const PLATFORM_SCENES = [
  { label: 'JDK', detail: 'Compiler and developer tools' },
  { label: 'JRE / runtime', detail: 'Libraries to run bytecode' },
  { label: 'JVM', detail: 'Executes bytecode on any platform' },
  { label: 'Bytecode', detail: 'Write once, run anywhere' },
];

const TOPIC_SCENES = {
  'memory-management': MEMORY_SCENES,
  'jvm-architecture': JVM_LAYER_SCENES,
  'garbage-collection': GC_CYCLE_SCENES,
  'what-is-java': PLATFORM_SCENES,
};

function extractCodeLines(content) {
  const lines = [];
  for (const block of content.syntax || []) {
    const blockLines = (block.code || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && l !== '{' && l !== '}');
    if (!blockLines.length) continue;
    if (lines.length) lines.push(`// ${block.label || 'Example'}`);
    lines.push(...blockLines);
  }
  return lines.slice(0, 14);
}

function resolveMode(topic) {
  if (TOPIC_MODE[topic.id]) return TOPIC_MODE[topic.id];
  return TAG_MODE[primaryTag(topic.tags)] || 'journey';
}

function scenesFor(topic, tag, mode) {
  if (TOPIC_SCENES[topic.id]) return TOPIC_SCENES[topic.id];
  if (mode === 'stack') return STACK_SCENES;
  if (mode === 'layers' && tag === 'jvm') return JVM_LAYER_SCENES;
  if (mode === 'cycle' && (tag === 'jvm' || topic.id === 'jlink-runtimes')) return GC_CYCLE_SCENES;
  return (TEMPLATES[tag] || TEMPLATES.overview).scenes;
}

function uid(prefix, n) {
  return `${prefix}-${n}`;
}

function itemFromLine(line, mode, n) {
  const t = line.trim();

  if (mode === 'stack') {
    if (t.startsWith('//')) {
      return { id: uid('sec', n), label: 'Next example', sub: t.replace(/^\/\/\s*/, ''), icon: '📌', highlight: true };
    }
    if (/^\s*(public|private|protected|static).+\([^)]*\)\s*\{/.test(t) || /^\w[\w<>,\s]*\s+\w+\s*\([^)]*\)\s*\{/.test(t)) {
      const name = t.match(/(\w+)\s*\(/)?.[1] || 'method';
      return { id: uid('push', n), label: `Push: ${name}()`, sub: 'New stack frame — locals created here', icon: '📥', highlight: true };
    }
    if (/return\b/.test(t)) {
      return { id: uid('pop', n), label: 'Return & pop', sub: 'Send value back and remove this frame', icon: '📤', highlight: true };
    }
    if (/\w+\s*\([^)]*\)\s*;/.test(t) && !/^(if|for|while|switch|new)\b/.test(t)) {
      const name = t.match(/(\w+)\s*\(/)?.[1] || 'method';
      return { id: uid('call', n), label: `Call ${name}()`, sub: 'Pushes another frame on top', icon: '📞', highlight: true };
    }
  }

  if (t.startsWith('//')) {
    return { id: uid('sec', n), label: 'Next section', sub: t.replace(/^\/\/\s*/, ''), icon: '📌', highlight: true };
  }
  if (/\bclass\s+(\w+)/.test(t)) {
    const m = t.match(/\bclass\s+(\w+)/);
    return { id: uid('class', n), label: `Class: ${m[1]}`, sub: 'Blueprint for objects', icon: '🧩', highlight: true };
  }
  if (/\binterface\s+(\w+)/.test(t)) {
    const m = t.match(/\binterface\s+(\w+)/);
    return { id: uid('iface', n), label: `Interface: ${m[1]}`, sub: 'Contract to implement', icon: '📜', highlight: true };
  }
  if (/\bextends\s+(\w+)/.test(t)) {
    const m = t.match(/\bextends\s+(\w+)/);
    return { id: uid('ext', n), label: 'Inheritance', sub: `Extends ${m[1]}`, icon: '🔗', highlight: true };
  }
  if (/\bimplements\s+/.test(t)) {
    return { id: uid('impl', n), label: 'Implements', sub: 'Fulfills interface contract', icon: '✅', highlight: true };
  }
  if (/\bprivate\s+/.test(t)) {
    return { id: uid('field', n), label: 'Private field', sub: 'Hidden inside the object', icon: '🔒', highlight: true };
  }
  if (/\bpublic\s+\w+\s*\(/.test(t) && !/\bclass\b/.test(t)) {
    return { id: uid('method', n), label: 'Method', sub: 'Behavior callers can invoke', icon: '⚙️', highlight: true };
  }
  if (/\bif\s*\(/.test(t) || /\belse\b/.test(t)) {
    return { id: uid('branch', n), label: 'Decision', sub: 'Condition picks a path', icon: '🔀', highlight: true, branch: 'check' };
  }
  if (/\bfor\s*\(|\bwhile\s*\(/.test(t)) {
    return { id: uid('loop', n), label: 'Loop', sub: 'Repeat until condition ends', icon: '🔁', highlight: true };
  }
  if (/\bswitch\s*\(/.test(t)) {
    return { id: uid('switch', n), label: 'Switch / match', sub: 'Match value to a case or pattern', icon: '🎚️', highlight: true };
  }
  if (/\btry\b/.test(t)) {
    return { id: uid('try', n), label: 'Try block', sub: 'Run risky code safely', icon: '🛡️', highlight: true, branch: 'try' };
  }
  if (/\bcatch\s*\(/.test(t)) {
    return { id: uid('catch', n), label: 'Catch block', sub: 'Handle the error', icon: '⚠️', highlight: true, branch: 'catch' };
  }
  if (/\bthrow\b/.test(t)) {
    return { id: uid('throw', n), label: 'Throw error', sub: 'Signal something went wrong', icon: '💥', highlight: true };
  }
  if (mode === 'pipeline') {
    if (/\.orElse\(|\.orElseGet\(|\.orElseThrow\(/.test(t)) {
      return { id: uid('result', n), label: 'Default value', sub: 'Fallback when the optional result is empty', icon: '↩️', highlight: true };
    }
    if (/\.collect\(|\.reduce\(|\.count\(|\.average\(|\.sum\(|\.min\(|\.max\(|\.findFirst\(|\.forEach\(/.test(t)) {
      const op = t.match(/\.(\w+)\(/)?.[1] || 'terminal';
      return { id: uid('term', n), label: `${op}()`, sub: 'Terminal — produces the final stream result', icon: '🎯', highlight: true };
    }
    if (/\.distinct\(|\.limit\(|\.skip\(/.test(t)) {
      return { id: uid('state', n), label: 'Stateful step', sub: 'Remembers state across elements (distinct / limit / skip)', icon: '📌', highlight: true };
    }
    if (/\.filter\(/.test(t)) {
      return { id: uid('filt', n), label: 'filter()', sub: 'Keep only elements that match the predicate', icon: '🔍', highlight: true };
    }
    if (/\.flatMap\(/.test(t)) {
      return { id: uid('flat', n), label: 'flatMap()', sub: 'Transform each element into a stream and flatten', icon: '🔄', highlight: true };
    }
    if (/\.map\(/.test(t)) {
      return { id: uid('map', n), label: 'map()', sub: 'Transform each element to a new value', icon: '🔄', highlight: true };
    }
    if (/\.sorted\(/.test(t)) {
      return { id: uid('sort', n), label: 'sorted()', sub: 'Reorder elements before the next step', icon: '📊', highlight: true };
    }
    if (/\.stream\(\)|IntStream\.|LongStream\.|DoubleStream\.|Stream\.of|Stream\.generate/.test(t)) {
      return { id: uid('src', n), label: 'Source', sub: 'Open a stream from a collection or range', icon: '📥', highlight: true };
    }
  }
  if (/new\s+(\w+)/.test(t)) {
    const m = t.match(/new\s+(\w+)/);
    return { id: uid('new', n), label: 'Create object', sub: `Allocate ${m[1]}`, icon: '✨', highlight: true };
  }
  if (/Thread|Executor|submit|start\(\)/.test(t)) {
    return { id: uid('thread', n), label: 'Thread task', sub: 'Runs alongside other work', icon: '⚡', highlight: true };
  }
  if (/@\w+/.test(t)) {
    return { id: uid('anno', n), label: 'Annotation', sub: 'Metadata for framework/tools', icon: '🏷️', highlight: true };
  }
  if (/System\.out/.test(t)) {
    return { id: uid('out', n), label: 'Print output', sub: 'Show result in console', icon: '🖨️', highlight: true };
  }
  if (/return\b/.test(t)) {
    return { id: uid('ret', n), label: 'Return', sub: 'Send value back to caller', icon: '↩️', highlight: true };
  }
  if (mode === 'storage' && /\[|List|Map|Set|Hash|Array|Weak|Soft|Reference/.test(t)) {
    return { id: uid('store', n), label: 'Store / reference', sub: 'Data kept in memory or collection', icon: '📦', highlight: true };
  }
  if (mode === 'layers' && /@|Controller|Service|Repository|GetMapping|PostMapping|MXBean|Segment|Arena/.test(t)) {
    return { id: uid('layer', n), label: 'Layer piece', sub: 'Part of the layered system', icon: '🏗️', highlight: true };
  }
  if (mode === 'cycle' && /-X|gc|GC|jlink|jdeps/.test(t)) {
    return { id: uid('cycle', n), label: 'GC / build step', sub: 'Part of a repeating runtime cycle', icon: '🔄', highlight: true };
  }
  const short = t.length > 48 ? `${t.slice(0, 47)}…` : t;
  return { id: uid('line', n), label: 'Execute line', sub: short, icon: '▶️', highlight: true };
}

function itemFromScene(scene, mode, n) {
  return {
    id: uid('scene', n),
    label: scene.label,
    sub: scene.detail,
    icon: scene.icon || MODE_ICON[mode] || '💡',
    highlight: true,
  };
}

const MODE_ICON = {
  journey: '🚶', hierarchy: '🧩', pipeline: '〰️', flow: '🔀', timeline: '⚡',
  layers: '🏗️', storage: '📦', cycle: '🔄', stack: '📚', shield: '🔒',
};

function buildScene(items, mode, activeId) {
  const list = items.map((it) => ({ ...it, highlight: it.id === activeId }));
  return { mode, items: list, activeId };
}

/** Modes where the scene grows over time (call stack, collections, layer cake). */
const ACCUMULATE_MODES = new Set(['stack', 'storage', 'hierarchy', 'layers', 'shield', 'timeline', 'cycle']);

function mergeItem(state, item) {
  const idx = state.items.findIndex((x) => x.label === item.label);
  if (idx >= 0) {
    state.items[idx] = { ...state.items[idx], ...item, highlight: true };
  } else {
    state.items.forEach((x) => { x.highlight = false; });
    state.items.push({ ...item, highlight: true });
  }
  if (state.items.length > 10) state.items = state.items.slice(-10);
}

function sceneItemsForStep(mode, state, item) {
  if (ACCUMULATE_MODES.has(mode)) return [...state.items];
  return [item];
}

/**
 * @param {{ id: string, title: string, tags?: string[] }} topic
 * @param {{ syntax?: { label?: string, code: string }[] }} content
 */
export function buildConceptVisualData(topic, content) {
  const mode = resolveMode(topic);
  const meta = MODE_META[mode] || MODE_META.journey;
  const tag = primaryTag(topic.tags);
  const tmpl = TEMPLATES[tag] || TEMPLATES.overview;
  const extraScenes = scenesFor(topic, tag, mode);
  let codeLines = extractCodeLines(content);

  const state = { items: [] };
  const steps = [];
  let counter = 0;

  steps.push({
    line: -1,
    caption: MODE_INTRO[mode] || tmpl.legend,
    hint: `Visual: ${meta.badge.replace('GSAP · ', '')}`,
    mode,
    scene: buildScene([], mode, null),
  });

  if (!codeLines.length) {
    codeLines = extraScenes.slice(0, 6).map((s) => `// ${s.label}: ${s.detail}`);
  }

  const hasSyntax = (content.syntax || []).some((b) => (b.code || '').trim());

  codeLines.forEach((line, i) => {
    const item = itemFromLine(line, mode, counter++);
    mergeItem(state, item);
    steps.push({
      line: i,
      caption: `${item.label} — ${item.sub}`,
      hint: '',
      mode,
      scene: buildScene(sceneItemsForStep(mode, state, item), mode, item.id),
    });
  });

  if (!hasSyntax) {
    const seen = new Set(state.items.map((x) => x.label.toLowerCase()));
    for (const scene of extraScenes) {
      if (seen.has(scene.label.toLowerCase())) continue;
      if (steps.length >= 16) break;
      const item = itemFromScene(scene, mode, counter++);
      mergeItem(state, item);
      seen.add(scene.label.toLowerCase());
      steps.push({
        line: -1,
        caption: `${scene.label} — ${scene.detail}`,
        hint: '',
        mode,
        scene: buildScene(sceneItemsForStep(mode, state, item), mode, item.id),
      });
    }
  }

  if (steps.length < 3) {
    steps.push({
      line: -1,
      caption: `${topic.title} — key ideas from this topic.`,
      hint: '',
      mode,
      scene: buildScene(state.items, mode, state.items[0]?.id),
    });
  }

  return {
    codeLines,
    steps,
    mode,
    badge: meta.badge,
    intro: meta.intro,
    scrubLabels: meta.scrub,
  };
}
