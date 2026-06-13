import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Repository root (parent of mjs/) */
export const ROOT = join(__dirname, '..');

export const DATA_DIR = join(ROOT, 'data');
export const OUT_INDEX = join(ROOT, 'index.html');
export const OUT_JAVA = join(ROOT, 'java.html');
