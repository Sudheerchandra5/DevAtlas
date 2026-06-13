import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import javaTopics from './java-topics.mjs';
import { createSiteRenderer } from './render.mjs';
import { DATA_DIR, OUT_INDEX, OUT_JAVA } from './paths.mjs';

const data = JSON.parse(readFileSync(join(DATA_DIR, 'languages.json'), 'utf8'));
const { renderHome, renderJava } = createSiteRenderer(javaTopics, data);

function minify(html) {
  const parts = html.split(/(<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/i);
  return parts.map((part, i) => {
    if (i % 2 === 1) return part;
    return part
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/<!--[\s\S]*?-->/g, '')
      .trim();
  }).join('');
}

writeFileSync(OUT_INDEX, minify(renderHome()));
writeFileSync(OUT_JAVA, minify(renderJava()));
console.log('Generated index.html and java.html');
