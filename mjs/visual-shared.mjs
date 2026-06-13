/**
 * Shared HTML helpers for GSAP topic visuals.
 */

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function highlightCode(line) {
  return esc(line)
    .replace(/\b(public|private|protected|class|interface|extends|implements|static|final|void|int|long|double|float|boolean|char|byte|short|String|new|return|if|else|for|while|switch|case|try|catch|finally|throw|this)\b/g, '<span class="pv-kw">$1</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="pv-num">$1</span>')
    .replace(/(&quot;[^&]*&quot;)/g, '<span class="pv-str">$1</span>');
}

export function toolbar(stepTotal) {
  return `<div class="pv-toolbar">
    <div class="pv-controls">
      <button type="button" class="pv-btn" data-pv-action="prev" aria-label="Previous step">◀</button>
      <button type="button" class="pv-btn pv-btn-primary" data-pv-action="play" aria-label="Play" aria-pressed="false">▶ Play</button>
      <button type="button" class="pv-btn" data-pv-action="next" aria-label="Next step">▶</button>
      <button type="button" class="pv-btn" data-pv-action="restart" aria-label="Restart">↺</button>
    </div>
    <div class="pv-step-readout">
      <span class="pv-step-label">Step</span>
      <strong class="pv-step-num" data-pv-step-num>1</strong>
      <span class="pv-step-of">/ <span data-pv-step-total>${stepTotal}</span></span>
    </div>
  </div>`;
}

export function scrubber(labels) {
  const spans = labels.map((l) => `<span>${esc(l)}</span>`).join('');
  return `<div class="pv-scrub-wrap">
    <input type="range" class="pv-scrubber" data-pv-scrubber min="0" max="100" value="0" aria-label="Animation timeline" />
    <div class="pv-scrub-labels">${spans}</div>
  </div>`;
}

export function codePanel(codeLines) {
  const codeHtml = codeLines
    .map((line, i) => `<span class="pv-line" data-pv-line="${i}">${highlightCode(line)}</span>`)
    .join('\n');
  return `<div class="pv-code-panel">
    <div class="pv-panel-title">Code</div>
    <pre class="pv-code"><code>${codeHtml}</code></pre>
  </div>`;
}

export function wrapVisual(topic, opts) {
  const { kind, steps, codeLines, badge, intro, stageHtml, scrubLabels, mode } = opts;
  const n = steps.length;
  const json = JSON.stringify(steps).replace(/</g, '\\u003c');
  const labels = scrubLabels || ['start', 'end'];
  const modeAttr = mode ? ` data-pv-mode="${esc(mode)}"` : '';

  return `<div class="premium-visual ${kind}-visual" data-premium="${esc(topic.id)}" data-pv-kind="${kind}"${modeAttr} data-pv-steps="${n}" aria-label="${esc(topic.title)} visual walkthrough">
  <script type="application/json" data-visual-steps>${json}</script>
  <div class="pv-badge">${esc(badge)}</div>
  <p class="gsap-intro"><strong>${esc(topic.title)}</strong> · <span class="gsap-step-count">${codeLines.length} lines</span> · ${esc(intro)}</p>
  ${toolbar(n)}
  <div class="pv-stage">
    ${codePanel(codeLines)}
    ${stageHtml}
  </div>
  <div class="pv-caption-bar"><p class="pv-caption" data-pv-caption>${esc(steps[0].caption)}</p></div>
  ${scrubber(labels)}
</div>`;
}
