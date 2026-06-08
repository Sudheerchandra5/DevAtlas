/**
 * Expands interview question banks beyond the initial 5 per topic.
 * Merges existing curated questions with additional professional Q&As.
 */

const RELATED = {
  overview: 'general programming concepts',
  syntax: 'Java syntax fundamentals',
  setup: 'development environment tooling',
  tools: 'build and IDE tooling',
  debugging: 'debugging and error handling',
  oop: 'object-oriented design',
  collections: 'the Java Collections Framework',
  generics: 'Java generics and type safety',
  io: 'Java I/O APIs',
  concurrency: 'multithreading and concurrency',
  functional: 'functional programming in Java',
  modern: 'modern JDK language features',
  jvm: 'JVM internals and bytecode',
  performance: 'performance tuning',
  framework: 'application frameworks like Spring',
  web: 'web and REST API development',
  database: 'database access patterns',
  architecture: 'software architecture',
  security: 'application security',
  testing: 'automated testing strategies',
  devops: 'deployment and observability',
  cloud: 'cloud-native Java',
  reactive: 'reactive programming',
  professional: 'production engineering practices',
  'best-practices': 'clean code conventions',
  'error-handling': 'exception design',
  api: 'standard Java APIs',
};

function pickRelated(tags = []) {
  for (const tag of tags) {
    if (RELATED[tag]) return RELATED[tag];
  }
  return 'related Java fundamentals';
}

function firstSyntax(content) {
  return content.syntax?.[0]?.code || null;
}

function buildSupplemental(topic, content) {
  const title = topic.title;
  const tags = topic.tags || [];
  const related = pickRelated(tags);
  const def = content.definition;
  const code = firstSyntax(content);
  const tagHint = tags.length ? `Topics like ${tags.join(', ')} often appear alongside this in interviews.` : '';

  const extras = [
    {
      question: `How would you explain ${title} in a 30-second elevator pitch?`,
      answer: `${def.split('.')[0]}. In interviews, lead with the business or technical problem it solves, then mention one concrete Java example. ${tagHint}`.trim(),
      syntax: code || undefined,
    },
    {
      question: `What is the relationship between ${title} and ${related}?`,
      answer: `${title} builds on ${related} by giving you a focused tool or pattern for production code. Interviewers expect you to connect the concept to where it sits in the Java stack — language, library, runtime, or framework — not treat it in isolation.`,
    },
    {
      question: `When should you avoid or limit the use of ${title}?`,
      answer: `Avoid ${title} when a simpler built-in alternative exists, when it adds complexity without measurable benefit, or when team standards forbid the pattern for safety reasons. Strong candidates explain trade-offs rather than recommending it for every scenario.`,
    },
    {
      question: `What are production best practices for ${title}?`,
      answer: `Follow team conventions, write tests that cover typical and edge cases, document assumptions, and prefer readable code over clever tricks. For ${title}, align with JDK guidance, static analysis rules, and code review checklists used in enterprise Java teams.`,
    },
    {
      question: `How do you debug or troubleshoot issues involving ${title}?`,
      answer: `Start by reproducing the failure with a minimal example, read stack traces carefully, use the debugger or logging to inspect state, and verify environment settings such as JDK version and classpath. For ${title}, isolate whether the root cause is syntax, API misuse, configuration, or runtime behavior.`,
      syntax: code || undefined,
    },
    {
      question: `What follow-up questions do interviewers commonly ask after ${title}?`,
      answer: `Expect deeper probes: "What happens under the hood?", "How would you test this?", "What changed in recent JDK versions?", and "How would you refactor legacy code to use this?" Prepare one layer of detail beyond the basic definition.`,
    },
    {
      question: `How would a senior engineer discuss ${title} in a system design interview?`,
      answer: `Senior answers connect ${title} to scalability, maintainability, security, and operability. Discuss how the choice affects deployment, monitoring, team onboarding, and long-term refactoring — not only the local code snippet.`,
    },
    {
      question: `What mistakes do candidates make when answering ${title} questions?`,
      answer: `Common mistakes include giving textbook definitions without examples, ignoring edge cases, confusing similar APIs, and overstating benefits without mentioning costs. Anchor answers in real Java code or project experience whenever possible.`,
    },
    {
      question: `Give a real-world scenario where ${title} matters on the job.`,
      answer: `Production Java teams rely on ${title} when building services, batch jobs, integrations, or libraries consumed by other teams. Mention a scenario such as onboarding a feature, fixing an incident, or passing a code review that required solid understanding of this concept.`,
      syntax: code || undefined,
    },
    {
      question: `How does ${title} appear in code reviews or technical assessments?`,
      answer: `Reviewers look for correct API usage, readable naming, test coverage, and adherence to project standards. In assessments you may be asked to spot bugs, refactor code, or explain output — demonstrate ${title} with clear reasoning step by step.`,
    },
  ];

  return extras;
}

export function enrichInterview(topic, content) {
  const existing = content.interview || [];
  const existingQuestions = new Set(existing.map((q) => q.question.toLowerCase().trim()));

  const supplemental = buildSupplemental(topic, content).filter(
    (q) => !existingQuestions.has(q.question.toLowerCase().trim()),
  );

  const merged = [...existing, ...supplemental];

  // Remove syntax key when undefined for cleaner JSON output in memory
  return merged.map((q) => {
    const item = { question: q.question, answer: q.answer };
    if (q.syntax) item.syntax = q.syntax;
    return item;
  });
}
