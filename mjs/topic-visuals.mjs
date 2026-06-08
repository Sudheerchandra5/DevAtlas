/**
 * Visual explanations for every topic — optional overrides + generated flow animations.
 */

import { buildFlowVisual } from './visual-flow.mjs';

/** Hand-crafted HTML overrides keyed by topic id (empty unless you add one). */
const CUSTOM_VISUALS = {};

/**
 * @param {{ id: string, title: string, tags?: string[], description?: string }} topic
 * @param {{ definition?: string, syntax?: { label?: string, code: string }[] }} content
 * @returns {string}
 */
export function getTopicVisual(topic, content) {
  if (CUSTOM_VISUALS[topic.id]) {
    return CUSTOM_VISUALS[topic.id];
  }
  return buildFlowVisual(topic, content);
}

export function hasTopicVisual() {
  return true;
}
