/**
 * Turn dense definition prose into a scannable view:
 * quick answer → bullet points → optional deep dive.
 */

function splitSentences(text) {
  if (!text?.trim()) return [];
  const normalized = text.replace(/\s+/g, ' ').trim();
  const parts = normalized.match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g);
  return parts?.map((s) => s.trim()).filter(Boolean) ?? [normalized];
}

/**
 * @param {{ description?: string }} topic
 * @param {{ definition?: string, oneLiner?: string, points?: string[] }} content
 */
export function buildDefinitionView(topic, content) {
  const definition = content.definition?.trim() || '';
  const sentences = splitSentences(definition);

  const quick =
    content.oneLiner?.trim() ||
    topic.description?.trim() ||
    sentences[0] ||
    '';

  let points = content.points?.filter(Boolean);
  if (!points?.length) {
    if (topic.description?.trim() || content.oneLiner?.trim()) {
      points = sentences;
    } else {
      points = sentences.slice(1);
    }
  }

  const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
  points = points.filter((p) => norm(p) !== norm(quick));

  const showDeepDive =
    definition.length > 0 &&
    norm(quick) !== norm(definition) &&
    points.map(norm).join(' ') !== norm(definition);

  return {
    quick,
    points,
    deepDive: showDeepDive ? definition : null,
  };
}
