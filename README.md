# DevAtlas

A professional learning platform for mastering programming languages — from absolute basics to expert-level concepts.

Built with **pure HTML and CSS** — no JavaScript framework required.

## Live site

**https://sudheerchandra5.github.io/DevAtlas/**

- Home: `index.html`
- Java: `java.html`

## Project structure

```
index.html          Home page
java.html           Java curriculum (57 topics)
css/style.css       All styles
data/languages.json Curriculum data
scripts/generate.mjs Regenerate HTML when adding languages
favicon.svg         Site icon
```

## View locally

Open `index.html` in your browser, or run a simple server:

```bash
python3 -m http.server 8080
```

Then visit **http://localhost:8080**

## Add a new language

1. Add language data to `data/languages.json`
2. Update `scripts/generate.mjs` to generate the new HTML page
3. Run `node scripts/generate.mjs`
4. Push to `main` — GitHub Actions deploys automatically

## Java curriculum

| Level | Topics | Highlights |
|-------|--------|------------|
| Beginner | 12 | Variables, control flow, methods, I/O |
| Intermediate | 15 | OOP, collections, generics, JUnit |
| Advanced | 15 | Lambdas, streams, virtual threads, Spring Boot |
| Expert | 15 | JVM tuning, design patterns, GraalVM, observability |

## License

MIT
