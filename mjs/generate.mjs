import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import javaTopics from './java-topics.mjs';
import { createSiteRenderer } from './render.mjs';
import { DATA_DIR, OUT_INDEX, OUT_JAVA } from './paths.mjs';

const data = JSON.parse(readFileSync(join(DATA_DIR, 'languages.json'), 'utf8'));
const { renderHome, renderJava } = createSiteRenderer(javaTopics, data);

writeFileSync(OUT_INDEX, renderHome());
writeFileSync(OUT_JAVA, renderJava());
console.log('Generated index.html and java.html');
