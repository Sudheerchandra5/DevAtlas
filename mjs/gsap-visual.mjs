/**
 * Routes each topic to a concept-specific GSAP visual.
 */

import { buildMemoryVisualData } from './memory-runtime.mjs';
import { buildArrayVisualData } from './visual-array.mjs';
import { buildConceptVisualData } from './concept-visual.mjs';
import { wrapVisual } from './visual-shared.mjs';

const STACK_HEAP_TOPICS = new Set(['variables-types']);

function memoryStageHtml() {
  return `<div class="pv-memory-panel">
    <div class="pv-panel-title">Stack &amp; heap</div>
    <div class="pv-memory-grid">
      <div class="pv-stack-zone">
        <div class="pv-zone-label">Stack</div>
        <div class="pv-stack-slots" data-pv-stack></div>
      </div>
      <svg class="pv-connector" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
        <path class="pv-connector-path" d="M 0 20 Q 60 20 120 20" fill="none" stroke-width="2" stroke-dasharray="6 4"/>
      </svg>
      <div class="pv-heap-zone">
        <div class="pv-zone-label">Heap</div>
        <div class="pv-heap-objects" data-pv-heap></div>
        <p class="pv-heap-hint" data-pv-hint></p>
      </div>
    </div>
  </div>`;
}

function arrayStageHtml() {
  return `<div class="pv-array-panel">
    <div class="pv-panel-title">How the array is stored</div>
    <div class="pv-array-legend" aria-hidden="false">
      <span><strong>Index</strong> = position number (first slot is 0, not 1)</span>
      <span><strong>Value</strong> = the number stored at that position</span>
    </div>
    <div class="pv-array-vars" data-pv-array-vars></div>
    <div class="pv-array-canvas" data-pv-array-canvas></div>
    <p class="pv-heap-hint" data-pv-hint></p>
  </div>`;
}

function conceptStageHtml() {
  return `<div class="pv-concept-panel">
    <div class="pv-concept-mode-badge" data-pv-mode-badge></div>
    <div class="pv-concept-canvas" data-pv-concept></div>
    <p class="pv-heap-hint" data-pv-hint></p>
  </div>`;
}

function buildMemoryVisual(topic, content) {
  const { codeLines, steps } = buildMemoryVisualData(topic, content);
  return wrapVisual(topic, {
    kind: 'memory',
    codeLines,
    steps,
    badge: 'GSAP · Stack & heap',
    intro: 'what happens in memory behind each line',
    stageHtml: memoryStageHtml(),
    scrubLabels: ['declare', 'execute', 'reference'],
  });
}

function buildArrayVisual(topic) {
  const { codeLines, steps, badge, intro } = buildArrayVisualData();
  return wrapVisual(topic, {
    kind: 'array',
    codeLines,
    steps,
    badge,
    intro,
    stageHtml: arrayStageHtml(),
    scrubLabels: ['create', 'index', 'iterate'],
  });
}

function buildConceptVisual(topic, content) {
  const { codeLines, steps, badge, intro, scrubLabels, mode } = buildConceptVisualData(topic, content);
  return wrapVisual(topic, {
    kind: 'concept',
    codeLines,
    steps,
    badge,
    intro,
    mode,
    stageHtml: conceptStageHtml(),
    scrubLabels,
  });
}

/**
 * @param {{ id: string, title: string, tags?: string[], description?: string }} topic
 * @param {{ definition?: string, syntax?: { label?: string, code: string }[] }} content
 */
export function buildGsapVisual(topic, content) {
  if (topic.id === 'arrays') return buildArrayVisual(topic);
  if (STACK_HEAP_TOPICS.has(topic.id)) return buildMemoryVisual(topic, content);
  return buildConceptVisual(topic, content);
}
