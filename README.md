# DevAtlas

Java learning platform — static HTML/CSS, Node build scripts, one browser script.

## Live site

**https://sudheerchandra5.github.io/DevAtlas/**

## Structure

```
index.html, java.html       Generated pages
css/style.css
data/languages.json

js/
  visual-scroll.js          Browser only (Visuals pause/scroll)

mjs/                        All build modules (flat, single folder)
  generate.mjs              Entry — npm run build
  render.mjs, paths.mjs
  java-topics.mjs, core-part1.mjs … gaps.mjs
  interview.mjs, coding-test.mjs, puzzles.mjs
  topic-visuals.mjs, visual-flow.mjs, visual-ball.mjs, visual-keyframes.mjs
```

## Build & run

```bash
npm run build
python -m http.server 8080
```

## License

MIT
