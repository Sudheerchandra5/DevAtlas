/**
 * Visual explanations — concept-specific GSAP animations per topic.
 */

import { buildGsapVisual } from './gsap-visual.mjs';

/**
 * @param {{ id: string, title: string, tags?: string[], description?: string }} topic
 * @param {{ definition?: string, syntax?: { label?: string, code: string }[] }} content
 * @returns {string}
 */
export function getTopicVisual(topic, content) {
  return buildGsapVisual(topic, content);
}
