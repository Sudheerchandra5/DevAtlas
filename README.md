# DevAtlas

Java learning platform — static HTML/CSS, Node build scripts, GSAP visuals.

## Live site

**https://sudheerchandra5.github.io/DevAtlas/**

## Structure

```
index.html, java.html       Generated pages
css/style.css
data/languages.json

js/
  visual-premium.js         GSAP animation player (browser)

mjs/                        Build modules
  generate.mjs              Entry — npm run build
  render.mjs, paths.mjs
  java-topics.mjs, core-part1.mjs … gaps.mjs
  interview.mjs, coding-test.mjs, puzzles.mjs
  topic-visuals.mjs, gsap-visual.mjs, visual-flow.mjs
```

## Build & run

```bash
npm run build
python -m http.server 8080
```

## License

MIT
