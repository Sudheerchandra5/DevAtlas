/**
 * Concept-specific GSAP visuals — memory, arrays, etc.
 */
(function () {
  const GSAP_URL = 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js';
  let gsapPromise = null;

  function loadGsap() {
    if (window.gsap) return Promise.resolve(window.gsap);
    if (gsapPromise) return gsapPromise;
    gsapPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = GSAP_URL;
      s.async = true;
      s.onload = () => resolve(window.gsap);
      s.onerror = () => reject(new Error('GSAP failed to load'));
      document.head.appendChild(s);
    });
    return gsapPromise;
  }

  function isVisible(root) {
    const panel = root.closest('.tab-panel-vis');
    if (!panel || getComputedStyle(panel).display === 'none') return false;
    const topic = root.closest('.topic-item');
    if (topic && !topic.open) return false;
    return true;
  }

  function getSteps(root) {
    const el = root.querySelector('[data-visual-steps], [data-memory-steps]');
    return JSON.parse(el.textContent);
  }

  function wireControls(root, handlers) {
    root.querySelector('[data-pv-action="play"]')?.addEventListener('click', handlers.play);
    root.querySelector('[data-pv-action="prev"]')?.addEventListener('click', handlers.prev);
    root.querySelector('[data-pv-action="next"]')?.addEventListener('click', handlers.next);
    root.querySelector('[data-pv-action="restart"]')?.addEventListener('click', handlers.restart);
    root.querySelector('[data-pv-scrubber]')?.addEventListener('input', handlers.scrub);
  }

  function createTimelinePlayer(root, gsap, steps, applyStep, resetVisual) {
    const lines = [...root.querySelectorAll('.pv-line')];
    const caption = root.querySelector('[data-pv-caption]');
    const stepNum = root.querySelector('[data-pv-step-num]');
    const scrubber = root.querySelector('[data-pv-scrubber]');
    const playBtn = root.querySelector('[data-pv-action="play"]');
    const stepCount = steps.length;

    function setLineHighlight(index) {
      lines.forEach((el, i) => el.classList.toggle('pv-line-active', i === index));
    }

    let currentStep = 0;
    let playing = false;
    let master = gsap.timeline({ paused: true });

    function updateChrome(index) {
      const i = Math.max(0, Math.min(stepCount - 1, index));
      currentStep = i;
      if (stepNum) stepNum.textContent = String(i + 1);
      if (scrubber) {
        const pct = stepCount <= 1 ? 0 : Math.round((i / (stepCount - 1)) * 100);
        scrubber.value = String(pct);
      }
      if (caption) {
        caption.textContent = steps[i].caption;
        gsap.fromTo(caption, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
      }
      applyStep(steps[i], true);
      setLineHighlight(steps[i].line);
    }

    function buildMasterTimeline() {
      master.clear();
      master.eventCallback('onComplete', () => {
        playing = false;
        if (playBtn) {
          playBtn.textContent = '▶ Play';
          playBtn.setAttribute('aria-pressed', 'false');
        }
      });
      for (let idx = 0; idx < stepCount; idx += 1) {
        master.add(() => updateChrome(idx));
        master.to({}, { duration: idx === 0 ? 2.0 : 2.4 });
      }
    }

    function applyThroughStep(index) {
      const i = Math.max(0, Math.min(stepCount - 1, index));
      resetVisual();
      for (let s = 0; s <= i; s += 1) applyStep(steps[s], s === i);
      currentStep = i;
      if (stepNum) stepNum.textContent = String(i + 1);
      if (scrubber) {
        const pct = stepCount <= 1 ? 0 : Math.round((i / (stepCount - 1)) * 100);
        scrubber.value = String(pct);
      }
      if (caption) caption.textContent = steps[i].caption;
      setLineHighlight(steps[i].line);
    }

    function fullRestart() {
      master.pause(0);
      playing = false;
      if (playBtn) {
        playBtn.textContent = '▶ Play';
        playBtn.setAttribute('aria-pressed', 'false');
      }
      buildMasterTimeline();
      applyThroughStep(0);
    }

    buildMasterTimeline();
    applyThroughStep(0);

    wireControls(root, {
      play: () => {
        if (!isVisible(root)) return;
        if (playing) {
          master.pause();
          playing = false;
          if (playBtn) {
            playBtn.textContent = '▶ Play';
            playBtn.setAttribute('aria-pressed', 'false');
          }
        } else {
          if (master.progress() >= 1) fullRestart();
          master.play();
          playing = true;
          if (playBtn) {
            playBtn.textContent = '⏸ Pause';
            playBtn.setAttribute('aria-pressed', 'true');
          }
        }
      },
      prev: () => {
        master.pause();
        playing = false;
        if (playBtn) {
          playBtn.textContent = '▶ Play';
          playBtn.setAttribute('aria-pressed', 'false');
        }
        applyThroughStep(currentStep - 1);
      },
      next: () => {
        master.pause();
        playing = false;
        if (playBtn) {
          playBtn.textContent = '▶ Play';
          playBtn.setAttribute('aria-pressed', 'false');
        }
        if (currentStep < stepCount - 1) applyThroughStep(currentStep + 1);
      },
      restart: () => fullRestart(),
      scrub: () => {
        master.pause();
        playing = false;
        if (playBtn) {
          playBtn.textContent = '▶ Play';
          playBtn.setAttribute('aria-pressed', 'false');
        }
        const pct = Number(scrubber.value) / 100;
        applyThroughStep(Math.round(pct * (stepCount - 1)));
        master.progress(pct);
      },
    });

    return {
      pause: () => {
        master.pause();
        playing = false;
        if (playBtn) {
          playBtn.textContent = '▶ Play';
          playBtn.setAttribute('aria-pressed', 'false');
        }
      },
    };
  }

  function renderStack(container, slots, gsap, animate) {
    if (!slots.length) {
      container.innerHTML = '<p class="pv-empty-zone">No active frame</p>';
      return;
    }
    container.innerHTML = slots
      .map((s) => {
        if (s.frame) return `<div class="pv-frame-badge">${s.value}</div>`;
        return `<div class="pv-slot ${s.isRef ? 'pv-slot-ref' : ''} ${s.highlight ? 'pv-slot-hot' : ''}">
          <span class="pv-slot-name">${s.name}</span><span class="pv-slot-type">${s.type}</span>
          <span class="pv-slot-value ${s.isRef ? 'pv-ref-pill' : ''}">${s.value}</span>
        </div>`;
      })
      .join('');
    if (animate) {
      gsap.from(container.querySelectorAll('.pv-slot, .pv-frame-badge'), {
        opacity: 0, y: 10, duration: 0.4, stagger: 0.06, ease: 'back.out(1.4)',
      });
    }
  }

  function renderHeap(container, objects, gsap, animate) {
    if (!objects.length) {
      container.innerHTML = '<p class="pv-empty-zone">No heap objects yet</p>';
      return;
    }
    container.innerHTML = objects
      .map((o) => {
        const fields = (o.fields || [])
          .map(
            (f) => `<div class="pv-heap-field ${f.highlight ? 'pv-field-hot' : ''}">
              <span class="pv-field-access">${f.access || ''}</span>
              <span class="pv-field-name">${f.name}</span>
              <span class="pv-field-type">${f.type}</span>
              <span class="pv-field-value">${f.value ?? '—'}</span>
            </div>`,
          )
          .join('');
        return `<div class="pv-heap-object ${o.highlight ? 'pv-heap-hot' : ''}">
          <span class="pv-heap-type">${o.kind === 'class' ? 'class' : o.type} · ${o.name}</span>
          ${o.note ? `<span class="pv-heap-note">${o.note}</span>` : ''}
          ${fields}
          ${o.value && !fields ? `<span class="pv-heap-value">${o.value}</span>` : ''}
          ${o.addr ? `<span class="pv-heap-addr">${o.addr}</span>` : ''}
        </div>`;
      })
      .join('');
    if (animate) {
      gsap.from(container.querySelectorAll('.pv-heap-object'), {
        opacity: 0, scale: 0.92, duration: 0.45, stagger: 0.08, ease: 'back.out(1.5)',
      });
    }
  }

  function buildMemoryPlayer(root, gsap) {
    const steps = getSteps(root);
    const stackEl = root.querySelector('[data-pv-stack]');
    const heapEl = root.querySelector('[data-pv-heap]');
    const hintEl = root.querySelector('[data-pv-hint]');
    const connector = root.querySelector('.pv-connector-path');

    function applyStep(step, animate) {
      renderStack(stackEl, step.stack || [], gsap, animate);
      renderHeap(heapEl, step.heap || [], gsap, animate);
      if (hintEl) {
        hintEl.textContent = step.hint || '';
        gsap.to(hintEl, { opacity: step.hint ? 1 : 0, duration: 0.3 });
      }
      if (connector) {
        gsap.to(connector, {
          opacity: step.connector ? 1 : 0,
          strokeDashoffset: step.connector ? 0 : 24,
          duration: animate ? 0.5 : 0,
        });
      }
    }

    function resetVisual() {
      if (stackEl) stackEl.innerHTML = '';
      if (heapEl) heapEl.innerHTML = '';
      if (hintEl) hintEl.textContent = '';
      if (connector) gsap.set(connector, { opacity: 0, strokeDashoffset: 24 });
    }

    return createTimelinePlayer(root, gsap, steps, applyStep, resetVisual);
  }

  const SLOT_ORDINAL = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  function slotOrdinal(index) {
    return SLOT_ORDINAL[index] || `${index + 1}th`;
  }

  function typePlain(type) {
    if (type === 'int[]') return 'List of whole numbers';
    if (type === 'String[][]') return 'Table of text (2 levels)';
    if (type === 'int') return 'Whole number';
    return type;
  }

  function renderArrayCells(arr) {
    const cells = arr.cells
      .map(
        (c) => `<div class="pv-array-cell ${c.highlight ? 'pv-array-cell-hot' : ''}">
          <span class="pv-array-slot-label">${slotOrdinal(c.index)} slot</span>
          <span class="pv-array-index-hint">index ${c.index}</span>
          <span class="pv-array-val">${c.value}</span>
          <span class="pv-array-val-label">value</span>
        </div>`,
      )
      .join('');
    const lengthBadge = arr.lengthCheck
      ? `<span class="pv-array-length-check">i must stay below ${arr.length}</span>`
      : `<span class="pv-array-length">${arr.length} slots total</span>`;
    return `<div class="pv-array-object ${arr.highlight ? 'pv-array-object-hot' : ''}">
      <div class="pv-array-header">
        <span class="pv-array-title">Array named <strong>${arr.name}</strong></span>
        <span class="pv-array-subtitle">Whole numbers · ${lengthBadge}</span>
      </div>
      <div class="pv-array-cells">${cells}</div>
    </div>`;
  }

  function renderMatrix(matrix) {
    const rows = matrix.grid
      .map((row, ri) => {
        const cells = row
          .map(
            (c, ci) => `<div class="pv-array-cell ${c.highlight ? 'pv-array-cell-hot' : ''}">
              <span class="pv-array-slot-label">col ${ci + 1}</span>
              <span class="pv-array-index-hint">index ${ci}</span>
              <span class="pv-array-val pv-array-val-empty">${c.value}</span>
              <span class="pv-array-val-label">value</span>
            </div>`,
          )
          .join('');
        return `<div class="pv-matrix-row">
          <div class="pv-matrix-row-label">Row ${ri + 1} (index ${ri})</div>
          <div class="pv-array-cells">${cells}</div>
        </div>`;
      })
      .join('');
    return `<div class="pv-matrix-object ${matrix.highlight ? 'pv-array-object-hot' : ''}">
      <div class="pv-array-header">
        <span class="pv-array-title">Table named <strong>${matrix.name}</strong></span>
        <span class="pv-array-subtitle">${matrix.rows} rows · ${matrix.cols} columns per row</span>
      </div>
      <div class="pv-matrix-rows">${rows}</div>
    </div>`;
  }

  const MODE_LABELS = {
    journey: 'Step journey',
    hierarchy: 'Class & object model',
    pipeline: 'Data pipeline',
    flow: 'Control flow',
    timeline: 'Parallel tasks',
    layers: 'Layered architecture',
    storage: 'Data storage',
    cycle: 'Repeatable cycle',
    stack: 'Method call stack',
    shield: 'Security layers',
  };

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function nodeClass(item, activeId) {
    const hot = item.id === activeId;
    return `cv-node ${hot ? 'cv-hot' : 'cv-dim'}`;
  }

  function renderNode(item, activeId) {
    return `<div class="${nodeClass(item, activeId)}">
      <span class="cv-icon" aria-hidden="true">${item.icon || '💡'}</span>
      <div class="cv-body">
        <span class="cv-label">${escHtml(item.label)}</span>
        <span class="cv-sub">${escHtml(item.sub || '')}</span>
      </div>
    </div>`;
  }

  function renderJourney(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Steps appear as you walk through the code</p>';
    return `<div class="cv-journey">${items
      .map((item, i) => {
        const arrow = i < items.length - 1 ? '<span class="cv-arrow" aria-hidden="true">↓</span>' : '';
        const hot = item.id === activeId;
        return `<div class="cv-journey-step ${hot ? 'cv-hot' : 'cv-dim'}">
          <span class="cv-step-num">${i + 1}</span>
          ${renderNode(item, activeId)}
        </div>${arrow}`;
      })
      .join('')}</div>`;
  }

  function renderHierarchy(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Types and relationships build here</p>';
    return `<div class="cv-hierarchy">${items
      .map((item, i) => `<div class="cv-hier-row" style="--cv-depth:${i}">
        <span class="cv-hier-connector" aria-hidden="true">${i ? '└─' : '▣'}</span>
        ${renderNode(item, activeId)}
      </div>`)
      .join('')}</div>`;
  }

  function renderPipeline(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Pipeline stages appear in order</p>';
    return `<div class="cv-pipeline">${items
      .map((item, i) => {
        const arrow = i < items.length - 1 ? '<span class="cv-pipe-arrow" aria-hidden="true">→</span>' : '';
        return `${renderNode(item, activeId)}${arrow}`;
      })
      .join('')}</div>`;
  }

  function renderFlow(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Branches light up as conditions run</p>';
    const tryItems = items.filter((x) => x.branch === 'try');
    const catchItems = items.filter((x) => x.branch === 'catch');
    const checkItems = items.filter((x) => x.branch === 'check' || (!x.branch && !tryItems.includes(x) && !catchItems.includes(x)));
    const main = checkItems.length ? checkItems : items.filter((x) => !x.branch);
    const branches = tryItems.length || catchItems.length;
    if (!branches) {
      return `<div class="cv-flow cv-flow-linear">${main.map((item) => renderNode(item, activeId)).join('<span class="cv-flow-split" aria-hidden="true">◇</span>')}</div>`;
    }
    return `<div class="cv-flow cv-flow-branch">
      <div class="cv-flow-main">${main.map((item) => renderNode(item, activeId)).join('')}</div>
      <div class="cv-flow-paths">
        <div class="cv-flow-path cv-flow-try">${tryItems.map((item) => renderNode(item, activeId)).join('') || '<span class="cv-flow-empty">try path</span>'}</div>
        <div class="cv-flow-path cv-flow-catch">${catchItems.map((item) => renderNode(item, activeId)).join('') || '<span class="cv-flow-empty">catch path</span>'}</div>
      </div>
    </div>`;
  }

  function renderTimeline(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Tasks run side by side on a timeline</p>';
    return `<div class="cv-timeline">${items
      .map((item, i) => `<div class="cv-lane">
        <span class="cv-lane-label">Task ${i + 1}</span>
        ${renderNode(item, activeId)}
      </div>`)
      .join('')}</div>`;
  }

  function renderLayers(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Layers stack from client to data</p>';
    return `<div class="cv-layers">${items
      .map((item, i) => `<div class="cv-layer" style="--cv-layer:${items.length - i}">
        <span class="cv-layer-index">Layer ${i + 1}</span>
        ${renderNode(item, activeId)}
      </div>`)
      .join('')}</div>`;
  }

  function renderStorage(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Stored values show up as slots</p>';
    return `<div class="cv-storage">${items.map((item) => `<div class="cv-bucket">${renderNode(item, activeId)}</div>`).join('')}</div>`;
  }

  function renderCycle(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">The workflow cycle builds step by step</p>';
    return `<div class="cv-cycle">
      <div class="cv-cycle-track">${items.map((item) => renderNode(item, activeId)).join('<span class="cv-cycle-arrow" aria-hidden="true">→</span>')}</div>
      <span class="cv-cycle-loop" aria-hidden="true">↻ repeat</span>
    </div>`;
  }

  function renderStackMode(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Frames appear when methods are called</p>';
    const frames = [...items].reverse();
    return `<div class="cv-stack-mode">${frames
      .map((item, i) => `<div class="cv-frame ${item.id === activeId ? 'cv-hot' : 'cv-dim'}" style="--cv-frame:${i}">
        <span class="cv-frame-label">${i === 0 ? 'currently executing' : `caller level ${i}`}</span>
        ${renderNode(item, activeId)}
      </div>`)
      .join('')}</div>`;
  }

  function renderShield(items, activeId) {
    if (!items.length) return '<p class="pv-empty-zone">Security checks wrap each layer</p>';
    const layers = [...items].reverse();
    return `<div class="cv-shield">${layers
      .map((item, i) => `<div class="cv-shield-ring ${item.id === activeId ? 'cv-hot' : 'cv-dim'}" style="--cv-ring:${i + 1}">
        ${renderNode(item, activeId)}
      </div>`)
      .join('')}</div>`;
  }

  const SCENE_RENDERERS = {
    journey: renderJourney,
    hierarchy: renderHierarchy,
    pipeline: renderPipeline,
    flow: renderFlow,
    timeline: renderTimeline,
    layers: renderLayers,
    storage: renderStorage,
    cycle: renderCycle,
    stack: renderStackMode,
    shield: renderShield,
  };

  function renderConceptScene(stageEl, step, gsap, animate) {
    if (!stageEl) return;
    const mode = step.mode || 'journey';
    const items = step.scene?.items || [];
    const activeId = step.scene?.activeId;
    const render = SCENE_RENDERERS[mode] || renderJourney;
    stageEl.innerHTML = `<div class="cv-scene cv-mode-${mode}">${render(items, activeId)}</div>`;
    if (animate) {
      gsap.from(stageEl.querySelectorAll('.cv-hot'), {
        opacity: 0, scale: 0.94, duration: 0.4, stagger: 0.07, ease: 'back.out(1.4)',
      });
    }
  }

  function buildConceptPlayer(root, gsap) {
    const steps = getSteps(root);
    const stageEl = root.querySelector('[data-pv-concept]');
    const hintEl = root.querySelector('[data-pv-hint]');
    const badgeEl = root.querySelector('[data-pv-mode-badge]');
    const defaultMode = root.dataset.pvMode || steps[0]?.mode || 'journey';

    if (badgeEl) badgeEl.textContent = MODE_LABELS[defaultMode] || defaultMode;

    function applyStep(step, animate) {
      if (badgeEl && step.mode) badgeEl.textContent = MODE_LABELS[step.mode] || step.mode;
      renderConceptScene(stageEl, step, gsap, animate);
      if (hintEl) {
        hintEl.textContent = step.hint || '';
        gsap.to(hintEl, { opacity: step.hint ? 1 : 0, duration: 0.3 });
      }
    }

    function resetVisual() {
      if (stageEl) stageEl.innerHTML = '';
      if (hintEl) hintEl.textContent = '';
    }

    return createTimelinePlayer(root, gsap, steps, applyStep, resetVisual);
  }

  function buildArrayPlayer(root, gsap) {
    const steps = getSteps(root);
    const varsEl = root.querySelector('[data-pv-array-vars]');
    const canvasEl = root.querySelector('[data-pv-array-canvas]');
    const hintEl = root.querySelector('[data-pv-hint]');

    function applyStep(step, animate) {
      let varsHtml = '';
      if (step.ref) {
        varsHtml += `<div class="pv-array-var-card ${step.ref.highlight ? 'pv-slot-hot' : ''}">
          <div class="pv-var-row"><span class="pv-var-label">Variable</span><span class="pv-var-em">${step.ref.name}</span></div>
          <div class="pv-var-row"><span class="pv-var-label">Type</span><span class="pv-var-text">${typePlain(step.ref.type)}</span></div>
          <div class="pv-var-row"><span class="pv-var-label">Meaning</span><span class="pv-var-text">${step.ref.label || 'Points to the array'}</span></div>
        </div>`;
      }
      if (step.indexVar) {
        varsHtml += `<div class="pv-array-var-card ${step.indexVar.highlight ? 'pv-slot-hot' : ''}">
          <div class="pv-var-row"><span class="pv-var-label">Counter</span><span class="pv-var-em">${step.indexVar.name}</span></div>
          <div class="pv-var-row"><span class="pv-var-label">Current value</span><span class="pv-var-em">${step.indexVar.value}</span></div>
          <div class="pv-var-row"><span class="pv-var-label">Meaning</span><span class="pv-var-text">${step.indexVar.label || 'Which slot to read'}</span></div>
        </div>`;
      }
      if (!varsHtml) varsHtml = '<p class="pv-empty-zone">Variable labels appear when you declare an array</p>';
      varsEl.innerHTML = `<div class="pv-array-var-row">${varsHtml}</div>`;

      let canvasHtml = (step.arrays || []).map(renderArrayCells).join('');
      if (step.matrix) canvasHtml += renderMatrix(step.matrix);
      if (step.accessIndex != null) {
        const ord = slotOrdinal(step.accessIndex);
        canvasHtml += `<div class="pv-array-access">
          <span class="pv-array-access-text">When <strong>${step.indexVar?.name || 'i'}</strong> is <strong>${step.indexVar?.value ?? step.accessIndex}</strong>,
          read the <strong>${ord}</strong> slot (index ${step.accessIndex})</span>
          <span class="pv-array-access-arrow">→</span>
          <span class="pv-array-access-val">value is <strong>${step.readValue}</strong></span>
        </div>`;
      }
      if (!canvasHtml) canvasHtml = '<p class="pv-empty-zone">The slot diagram appears when you create an array</p>';
      canvasEl.innerHTML = canvasHtml;

      if (hintEl) {
        hintEl.textContent = step.hint || '';
        gsap.to(hintEl, { opacity: step.hint ? 1 : 0, duration: 0.3 });
      }

      if (animate) {
        gsap.from(canvasEl.querySelectorAll('.pv-array-cell-hot, .pv-slot-hot'), {
          scale: 1.08, duration: 0.35, yoyo: true, repeat: 1, ease: 'power2.out',
        });
      }
    }

    function resetVisual() {
      if (varsEl) varsEl.innerHTML = '';
      if (canvasEl) canvasEl.innerHTML = '';
      if (hintEl) hintEl.textContent = '';
    }

    return createTimelinePlayer(root, gsap, steps, applyStep, resetVisual);
  }

  const players = new WeakMap();

  async function initRoot(root) {
    if (players.has(root)) return;
    try {
      const gsap = await loadGsap();
      const kind = root.dataset.pvKind || 'memory';
      let player;
      if (kind === 'array') player = buildArrayPlayer(root, gsap);
      else if (kind === 'memory') player = buildMemoryPlayer(root, gsap);
      else player = buildConceptPlayer(root, gsap);
      players.set(root, player);
    } catch (e) {
      root.insertAdjacentHTML('beforeend', '<p class="pv-error">Could not load GSAP. Check your network connection.</p>');
    }
  }

  function scan() {
    document.querySelectorAll('[data-premium]:not([data-pv-ready])').forEach((root) => {
      if (!isVisible(root)) return;
      root.dataset.pvReady = '1';
      initRoot(root);
    });
  }

  function onVisChange() {
    document.querySelectorAll('[data-premium][data-pv-ready]').forEach((root) => {
      if (!isVisible(root)) players.get(root)?.pause?.();
    });
    scan();
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('.tab-btn, .topic-summary')) {
      setTimeout(onVisChange, 50);
    }
  });

  document.addEventListener('toggle', (e) => {
    if (e.target.matches('.topic-item')) setTimeout(onVisChange, 50);
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scan);
  } else {
    scan();
  }
})();
