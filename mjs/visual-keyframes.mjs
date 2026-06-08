/**
 * Generates per-topic scoped CSS keyframes for N-step visual animations.
 */

const STEP_COLORS = [
  '#3b82f6',
  '#0d9488',
  '#7c3aed',
  '#ea580c',
  '#db2777',
  '#0891b2',
  '#65a30d',
  '#ca8a04',
  '#dc2626',
  '#6366f1',
  '#14b8a6',
  '#f97316',
  '#8b5cf6',
  '#059669',
  '#e11d48',
];

const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '⑪', '⑫', '⑬', '⑭', '⑮'];

export function stepMarker(i) {
  return CIRCLED[i] ?? `${i + 1}.`;
}

export function topicVisualClass(topicId) {
  return `vf-topic-${topicId.replace(/[^a-zA-Z0-9-]/g, '-')}`;
}

/**
 * @param {string} topicId
 * @param {number} stepCount
 * @returns {{ className: string, css: string, cycleSec: number }}
 */
export function generateVisualStyles(topicId, stepCount) {
  const n = Math.max(2, stepCount);
  const className = topicVisualClass(topicId);
  const cycleSec = Math.max(12, n * 3);
  const slot = 100 / n;
  const fadeIn = slot * 0.12;
  const fadeOut = slot * 0.12;
  const uid = className;

  let css = '';

  for (let i = 0; i < n; i++) {
    const start = i * slot;
    const on = start + fadeIn;
    const off = start + slot - fadeOut;
    const end = start + slot;
    const color = STEP_COLORS[i % STEP_COLORS.length];

    css += `@keyframes ${uid}-cap-${i} {
  0%, ${start.toFixed(2)}% { opacity: 0; transform: translateY(6px); }
  ${on.toFixed(2)}%, ${off.toFixed(2)}% { opacity: 1; transform: translateY(0); }
  ${end.toFixed(2)}%, 100% { opacity: 0; transform: translateY(-4px); }
}
`;

    css += `@keyframes ${uid}-hi-${i} {
  0%, ${start.toFixed(2)}% { opacity: 0.38; transform: scale(0.94); border-color: var(--border); box-shadow: none; }
  ${on.toFixed(2)}%, ${off.toFixed(2)}% { opacity: 1; transform: scale(1.04); border-color: ${color}; box-shadow: 0 4px 14px ${color}33; }
  ${end.toFixed(2)}%, 100% { opacity: 0.38; transform: scale(0.94); border-color: var(--border); box-shadow: none; }
}
`;

    css += `@keyframes ${uid}-code-${i} {
  0%, ${start.toFixed(2)}% { opacity: 0.32; background: transparent; }
  ${on.toFixed(2)}%, ${off.toFixed(2)}% { opacity: 1; background: ${color}22; }
  ${end.toFixed(2)}%, 100% { opacity: 0.32; background: transparent; }
}
`;

    if (i < n - 1) {
      const nextStart = (i + 1) * slot;
      css += `@keyframes ${uid}-conn-${i} {
  0%, ${off.toFixed(2)}% { opacity: 0.25; color: var(--text-muted); }
  ${on.toFixed(2)}%, ${nextStart.toFixed(2)}% { opacity: 1; color: ${STEP_COLORS[(i + 1) % STEP_COLORS.length]}; }
  ${(nextStart + fadeIn).toFixed(2)}%, 100% { opacity: 0.25; color: var(--text-muted); }
}
`;
    }

    css += `.${className} .vf-cap-${i} { animation-name: ${uid}-cap-${i}; }
.${className} .vf-step-${i} { animation-name: ${uid}-hi-${i}; }
.${className} .vf-cl-${i} { animation-name: ${uid}-code-${i}; }
`;
    if (i < n - 1) {
      css += `.${className} .vf-conn-${i} { animation-name: ${uid}-conn-${i}; }
`;
    }
  }

  const lastStart = (n - 1) * slot;
  css += `@keyframes ${uid}-chips {
  0%, ${(lastStart + slot * 0.5).toFixed(2)}% { opacity: 0; transform: translateY(10px); }
  ${(lastStart + slot * 0.65).toFixed(2)}%, 96% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(10px); }
}
.${className} .vf-chips-panel { animation-name: ${uid}-chips; }
`;

  css += `.${className} .vf-cap,
.${className} .vf-step,
.${className} .vf-conn,
.${className} .vf-cl,
.${className} .vf-chips-panel {
  animation-duration: var(--visual-cycle);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
`;

  return { className, css, cycleSec };
}
