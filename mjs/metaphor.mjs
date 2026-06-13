import METAPHORS from './metaphor-data.mjs';

/**
 * @param {{ id: string, title: string, description?: string }} topic
 * @param {{ definition?: string, metaphor?: object }} content
 */
export function enrichMetaphor(topic, content) {
  if (content.metaphor) return content.metaphor;
  if (METAPHORS[topic.id]) return METAPHORS[topic.id];

  const title = topic.title;
  const hint = topic.description || content.definition || title;
  return {
    hook: `${title} is like a tool in a well-organized workshop`,
    story: `Think of ${title.toLowerCase()} as a specialized tool every Java developer keeps handy. ${hint.split('.')[0]}. The metaphor helps you remember what problem it solves before you memorize syntax.`,
    mapping: [
      { code: title, real: 'A labeled tool with a specific job' },
      { code: 'Java API', real: 'The workshop shelf where tools are stored' },
      { code: 'Your code', real: 'The craftsperson choosing the right tool' },
    ],
    reminder: `When you see ${title}, ask: what everyday problem does this tool solve?`,
  };
}
