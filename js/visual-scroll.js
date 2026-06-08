/**
 * Syncs visual scrollers with animation steps + pause/play control.
 * Supports Walkthrough and Data Journey sub-panels.
 */
(function () {
  const FADE_RATIO = 0.12;
  const state = new WeakMap();

  function isVisualsActive(stage) {
    const panel = stage.closest('.tab-panel-vis');
    if (!panel || getComputedStyle(panel).display === 'none') return false;
    const subPanel = stage.closest('.visual-sub-panel');
    if (subPanel && getComputedStyle(subPanel).display === 'none') return false;
    const topic = stage.closest('.topic-item');
    if (topic && !topic.open) return false;
    return true;
  }

  function isPaused(stage) {
    return stage.classList.contains('visual-is-paused');
  }

  function stepCount(stage) {
    const n = parseInt(stage.dataset.visualSteps || stage.style.getPropertyValue('--step-count'), 10);
    if (Number.isFinite(n) && n > 0) return n;
    if (stage.dataset.visualMode === 'ball') return stage.querySelectorAll('.ball-box').length;
    return stage.querySelectorAll('.vf-step').length;
  }

  function cycleMs(stage) {
    const fromData = parseFloat(stage.dataset.visualCycle);
    if (Number.isFinite(fromData) && fromData > 0) return fromData * 1000;
    const raw = getComputedStyle(stage).getPropertyValue('--visual-cycle').trim()
      || getComputedStyle(stage).getPropertyValue('--ball-cycle').trim();
    const sec = parseFloat(raw);
    if (Number.isFinite(sec) && sec > 0) return sec * 1000;
    return stepCount(stage) * 3000;
  }

  function animationProbe(stage) {
    if (stage.dataset.visualMode === 'ball') {
      return stage.querySelector('.ball-cap-0') || stage.querySelector('.data-ball');
    }
    return stage.querySelector('.vf-cap-0') || stage.querySelector('.vf-step-0') || stage.querySelector('.vf-step');
  }

  function getAnimTime(stage) {
    const probe = animationProbe(stage);
    if (!probe) return 0;
    const anim = probe.getAnimations({ subtree: false })[0];
    if (anim && anim.currentTime != null) return anim.currentTime;
    const s = state.get(stage);
    return s?.frozenTime ?? 0;
  }

  function activeStepIndex(stage) {
    const n = stepCount(stage);
    if (n <= 0) return 0;

    const s = state.get(stage);
    if (isPaused(stage) && s?.frozenStep != null) return s.frozenStep;

    const duration = cycleMs(stage);
    const t = getAnimTime(stage) % duration;
    const progress = t / duration;
    const slot = 1 / n;
    const fadeIn = slot * FADE_RATIO;

    let step = 0;
    for (let i = 0; i < n; i++) {
      const on = i * slot + fadeIn;
      if (progress >= on) step = i;
    }
    return step;
  }

  function scrollWalkthrough(stage, index) {
    const diagram = stage.querySelector('.vf-diagram-scroll');
    const codePanel = stage.querySelector('.visual-code-scroll');
    const stepEl = stage.querySelector(`.vf-step-${index}`);
    const codeLine = stage.querySelector(`.vf-cl-${index}`);

    if (diagram && stepEl) {
      const targetLeft = stepEl.offsetLeft - diagram.clientWidth / 2 + stepEl.offsetWidth / 2;
      diagram.scrollTo({ left: Math.max(0, targetLeft), behavior: 'auto' });
    }

    if (codePanel && codeLine) {
      const targetTop = codeLine.offsetTop - codePanel.clientHeight / 2 + codeLine.offsetHeight / 2;
      codePanel.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
    } else if (codePanel && index === 0) {
      codePanel.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  function scrollBallJourney(stage, index) {
    const arena = stage.querySelector('.ball-arena-scroll');
    const box = stage.querySelector(`.ball-box-${index}`);
    if (arena && box) {
      const targetLeft = box.offsetLeft - arena.clientWidth / 2 + box.offsetWidth / 2;
      arena.scrollTo({ left: Math.max(0, targetLeft), behavior: 'auto' });
    }
  }

  function scrollToStep(stage, index) {
    if (stage.dataset.visualMode === 'ball') {
      scrollBallJourney(stage, index);
    } else {
      scrollWalkthrough(stage, index);
    }
  }

  function updateStepIndicator(stage, step) {
    const wrap = stage.closest('.visual-wrap');
    const el = wrap?.querySelector('.visual-step-current');
    if (el) el.textContent = String(step + 1);
  }

  function animatedElements(stage) {
    if (stage.dataset.visualMode === 'ball') {
      return stage.querySelectorAll('.ball-caption, .ball-box, .data-ball');
    }
    return stage.querySelectorAll('.visual-caption, .vf-step, .vf-conn, .vf-cl, .vf-chips-panel');
  }

  function setPaused(stage, paused) {
    let s = state.get(stage);
    if (!s) {
      s = { lastStep: -1 };
      state.set(stage, s);
    }

    const wrap = stage.closest('.visual-wrap');
    const btn = wrap?.querySelector('.visual-toggle-play');
    const label = btn?.querySelector('.visual-btn-text');
    const iconPause = btn?.querySelector('.visual-icon-pause');
    const iconPlay = btn?.querySelector('.visual-icon-play');

    if (paused) {
      const step = activeStepIndex(stage);
      s.frozenStep = step;
      s.frozenTime = getAnimTime(stage);
      stage.classList.add('visual-is-paused');
      animatedElements(stage).forEach((el) => {
        el.getAnimations().forEach((a) => a.pause());
      });
      if (btn) {
        btn.setAttribute('aria-label', 'Resume animation');
        btn.setAttribute('aria-pressed', 'true');
      }
      if (label) label.textContent = 'Resume';
      if (iconPause) iconPause.hidden = true;
      if (iconPlay) iconPlay.hidden = false;
      scrollToStep(stage, step);
      updateStepIndicator(stage, step);
    } else {
      stage.classList.remove('visual-is-paused');
      animatedElements(stage).forEach((el) => {
        el.getAnimations().forEach((a) => a.play());
      });
      s.frozenStep = null;
      s.frozenTime = null;
      s.lastStep = -1;
      if (btn) {
        btn.setAttribute('aria-label', 'Pause animation');
        btn.setAttribute('aria-pressed', 'false');
      }
      if (label) label.textContent = 'Pause';
      if (iconPause) iconPause.hidden = false;
      if (iconPlay) iconPlay.hidden = true;
    }
  }

  function getActiveStage(wrap) {
    const ballSub = wrap.querySelector('.visual-sub-ball');
    if (ballSub && getComputedStyle(ballSub).display !== 'none') {
      return wrap.querySelector('.ball-journey-stage');
    }
    return wrap.querySelector('.visual-flow-stage');
  }

  function togglePause(wrap) {
    const stage = getActiveStage(wrap);
    if (stage) setPaused(stage, !isPaused(stage));
  }

  function initStage(stage) {
    if (stage.dataset.visualScrollInit) return;
    stage.dataset.visualScrollInit = '1';
    state.set(stage, { lastStep: -1 });
  }

  function tickStage(stage) {
    initStage(stage);

    if (!isVisualsActive(stage) || isPaused(stage)) return;

    const s = state.get(stage);
    const step = activeStepIndex(stage);

    if (step !== s.lastStep) {
      s.lastStep = step;
      scrollToStep(stage, step);
      updateStepIndicator(stage, step);
    }
  }

  function tick() {
    document.querySelectorAll('.visual-animated-stage').forEach(tickStage);
    requestAnimationFrame(tick);
  }

  function onViewChange() {
    document.querySelectorAll('.visual-wrap').forEach((wrap) => {
      wrap.querySelectorAll('.visual-animated-stage').forEach((stage) => {
        initStage(stage);
        const s = state.get(stage);
        if (s) s.lastStep = -1;
      });

      const stage = getActiveStage(wrap);
      if (stage && isVisualsActive(stage) && !isPaused(stage)) {
        const s = state.get(stage);
        const step = activeStepIndex(stage);
        scrollToStep(stage, step);
        updateStepIndicator(stage, step);
        if (s) s.lastStep = step;
      }
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.visual-toggle-play');
    if (!btn) return;
    const wrap = btn.closest('.visual-wrap');
    if (wrap) togglePause(wrap);
  });

  document.addEventListener('change', (e) => {
    if (e.target?.classList?.contains('tab-radio') || e.target?.classList?.contains('visual-sub-radio')) {
      requestAnimationFrame(onViewChange);
    }
  });

  document.addEventListener(
    'toggle',
    (e) => {
      if (e.target?.classList?.contains('topic-item')) {
        requestAnimationFrame(onViewChange);
      }
    },
    true,
  );

  function boot() {
    document.querySelectorAll('.visual-animated-stage').forEach(initStage);
    requestAnimationFrame(tick);
    requestAnimationFrame(onViewChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
