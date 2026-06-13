/**
 * Builds Coding Test tab — diverse machine-round questions per topic.
 */

import { getCodingRounds } from './coding-rounds.mjs';

/**
 * @param {{ id: string, title: string, tags?: string[] }} topic
 * @param {{ definition?: string, syntax?: {label?: string, code: string}[] }} content
 */
export function enrichCodingTests(topic, content) {
  return getCodingRounds(topic, content);
}
