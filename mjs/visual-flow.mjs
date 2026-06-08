/**
 * Generates dynamic N-step CSS-animated visuals for any topic.
 */

import { generateVisualStyles, stepMarker } from './visual-keyframes.mjs';
import { buildBallVisual } from './visual-ball.mjs';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escCode(s) {
  return esc(s);
}

function clip(s, max = 72) {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

const TAG_PRIORITY = [
  'oop', 'collections', 'generics', 'concurrency', 'functional', 'modern', 'reactive',
  'io', 'web', 'framework', 'database', 'jvm', 'performance', 'architecture', 'security',
  'testing', 'devops', 'cloud', 'error-handling', 'debugging', 'tools', 'setup', 'syntax',
  'api', 'professional', 'best-practices', 'overview',
];

function primaryTag(tags = []) {
  for (const t of TAG_PRIORITY) {
    if (tags.includes(t)) return t;
  }
  return tags[0] || 'overview';
}

/** @type {Record<string, { icon: string, legend: string, scenes: { label: string, detail: string, icon?: string }[] }>} */
const TEMPLATES = {
  overview: {
    icon: '💡',
    legend: 'Programming = precise instructions + data + control flow',
    scenes: [
      { label: 'Problem', detail: 'Real-world task needs automation' },
      { label: 'Decompose', detail: 'Break into smaller sub-tasks' },
      { label: 'Algorithm', detail: 'Ordered steps solve the problem' },
      { label: 'Code', detail: 'Write instructions the machine executes' },
      { label: 'Verify', detail: 'Test output matches expectation' },
    ],
  },
  syntax: {
    icon: '📝',
    legend: 'Syntax rules tell the compiler how to parse your code',
    scenes: [
      { label: 'Declare', detail: 'Name and type your data' },
      { label: 'Initialize', detail: 'Assign starting value' },
      { label: 'Operate', detail: 'Apply operators and expressions' },
      { label: 'Branch', detail: 'Control flow changes path' },
      { label: 'Output', detail: 'Return or print the result' },
    ],
  },
  oop: {
    icon: '🧩',
    legend: 'OOP bundles data and behavior into reusable types',
    scenes: [
      { label: 'Class', detail: 'Blueprint with fields and methods' },
      { label: 'Constructor', detail: 'Initialize object state' },
      { label: 'Object', detail: 'Instance lives on the heap' },
      { label: 'Encapsulate', detail: 'Hide fields behind methods' },
      { label: 'Inherit', detail: 'Reuse and extend parent types' },
      { label: 'Polymorph', detail: 'Override behavior at runtime' },
    ],
  },
  collections: {
    icon: '📦',
    legend: 'Collections organize multiple values with standard APIs',
    scenes: [
      { label: 'Interface', detail: 'List, Set, Map, Queue contract' },
      { label: 'Implementation', detail: 'ArrayList, HashMap, etc.' },
      { label: 'Add', detail: 'Insert elements' },
      { label: 'Lookup', detail: 'Get by index or key' },
      { label: 'Iterate', detail: 'Walk with Iterator or for-each' },
      { label: 'Mutate', detail: 'Remove, replace, or sort' },
    ],
  },
  concurrency: {
    icon: '⚡',
    legend: 'Concurrency runs work in parallel — coordinate shared state carefully',
    scenes: [
      { label: 'Task', detail: 'Unit of work to run' },
      { label: 'Thread', detail: 'OS or virtual execution path' },
      { label: 'Submit', detail: 'Executor or start()' },
      { label: 'Synchronize', detail: 'Lock, volatile, or atomic' },
      { label: 'Communicate', detail: 'Queue, Future, or callback' },
      { label: 'Complete', detail: 'join() or get() for result' },
    ],
  },
  functional: {
    icon: '〰️',
    legend: 'Functional style describes what to compute, not how to loop',
    scenes: [
      { label: 'Source', detail: 'Collection or generator' },
      { label: 'Stream', detail: 'Open lazy pipeline' },
      { label: 'Intermediate', detail: 'filter, map, flatMap, sorted' },
      { label: 'Stateful', detail: 'distinct, limit, skip' },
      { label: 'Terminal', detail: 'collect, reduce, forEach, count' },
      { label: 'Result', detail: 'Materialized output value' },
    ],
  },
  framework: {
    icon: '🏗️',
    legend: 'Frameworks handle plumbing so you focus on business logic',
    scenes: [
      { label: 'Bootstrap', detail: 'Application entry point starts' },
      { label: 'Scan', detail: 'Classpath and annotations discovered' },
      { label: 'Config', detail: 'Auto-configuration applies beans' },
      { label: 'Wire', detail: 'Dependency injection connects parts' },
      { label: 'Expose', detail: 'Controllers or endpoints register' },
      { label: 'Serve', detail: 'Handle requests at runtime' },
    ],
  },
  web: {
    icon: '🌐',
    legend: 'Web layers separate transport, logic, and persistence',
    scenes: [
      { label: 'Client', detail: 'Browser or app initiates request' },
      { label: 'DNS / TLS', detail: 'Resolve host and secure channel' },
      { label: 'HTTP', detail: 'Method, path, headers, body' },
      { label: 'Handler', detail: 'Servlet filter or controller' },
      { label: 'Service', detail: 'Business rules execute' },
      { label: 'Response', detail: 'Status, headers, JSON/HTML body' },
    ],
  },
  database: {
    icon: '🗄️',
    legend: 'Database access layers isolate SQL from domain code',
    scenes: [
      { label: 'Pool', detail: 'Borrow connection from DataSource' },
      { label: 'SQL / JPQL', detail: 'Parameterized query prepared' },
      { label: 'Execute', detail: 'Statement runs against DB' },
      { label: 'Map', detail: 'Rows become entities or DTOs' },
      { label: 'Transaction', detail: 'commit or rollback changes' },
      { label: 'Release', detail: 'Connection returns to pool' },
    ],
  },
  jvm: {
    icon: '☕',
    legend: 'JVM abstracts hardware and manages memory automatically',
    scenes: [
      { label: 'Source', detail: '.java human-readable code' },
      { label: 'Compile', detail: 'javac emits bytecode' },
      { label: 'Load', detail: 'ClassLoader reads .class' },
      { label: 'Verify', detail: 'Bytecode safety checks' },
      { label: 'Execute', detail: 'Interpreter then JIT optimizes' },
      { label: 'GC', detail: 'Reclaim unreachable objects' },
    ],
  },
  io: {
    icon: '📁',
    legend: 'I/O moves data between your program and the outside world',
    scenes: [
      { label: 'Open', detail: 'Acquire stream, reader, or channel' },
      { label: 'Buffer', detail: 'Chunk bytes or chars for efficiency' },
      { label: 'Read / Write', detail: 'Transfer data in or out' },
      { label: 'Flush', detail: 'Push buffered bytes to destination' },
      { label: 'Close', detail: 'Release handle (try-with-resources)' },
    ],
  },
  'error-handling': {
    icon: '⚠️',
    legend: 'Exceptions separate normal flow from error paths',
    scenes: [
      { label: 'Risky code', detail: 'Operation may fail' },
      { label: 'try', detail: 'Guard the dangerous block' },
      { label: 'throw', detail: 'Signal failure with exception object' },
      { label: 'catch', detail: 'Handle matching exception type' },
      { label: 'finally', detail: 'Cleanup always runs' },
      { label: 'Recover', detail: 'Log, retry, or map to response' },
    ],
  },
  testing: {
    icon: '✅',
    legend: 'Automated tests catch regressions before production',
    scenes: [
      { label: 'Arrange', detail: 'Mocks, data, and context' },
      { label: 'Act', detail: 'Invoke code under test' },
      { label: 'Assert', detail: 'Check expected outcome' },
      { label: 'Isolate', detail: 'Unit vs integration scope' },
      { label: 'Report', detail: 'CI shows pass / fail' },
    ],
  },
  security: {
    icon: '🔒',
    legend: 'Security layers: authenticate, authorize, validate all input',
    scenes: [
      { label: 'Threat', detail: 'Untrusted input or actor' },
      { label: 'Validate', detail: 'Sanitize and verify format' },
      { label: 'Authenticate', detail: 'Prove identity' },
      { label: 'Authorize', detail: 'Check roles and permissions' },
      { label: 'Encrypt', detail: 'Protect data in transit and at rest' },
      { label: 'Audit', detail: 'Log security-relevant events' },
    ],
  },
  architecture: {
    icon: '🏛️',
    legend: 'Good architecture trades coupling for clarity and evolution',
    scenes: [
      { label: 'Requirement', detail: 'Business or quality goal' },
      { label: 'Boundary', detail: 'Split into components' },
      { label: 'Contract', detail: 'API or event interface' },
      { label: 'Integrate', detail: 'HTTP, messaging, or events' },
      { label: 'Observe', detail: 'Metrics, logs, traces' },
      { label: 'Evolve', detail: 'Deploy and scale independently' },
    ],
  },
  devops: {
    icon: '🔄',
    legend: 'CI/CD automates quality gates and repeatable deployments',
    scenes: [
      { label: 'Commit', detail: 'Push to version control' },
      { label: 'Build', detail: 'Compile and package artifact' },
      { label: 'Test', detail: 'Unit and integration gates' },
      { label: 'Scan', detail: 'Security and quality checks' },
      { label: 'Image', detail: 'Container with JRE' },
      { label: 'Deploy', detail: 'Roll out to environment' },
    ],
  },
  tools: {
    icon: '🔧',
    legend: 'Build tools automate compile, test, and package',
    scenes: [
      { label: 'POM / build.gradle', detail: 'Declare project metadata' },
      { label: 'Dependencies', detail: 'Resolve libraries from repos' },
      { label: 'Compile', detail: 'javac via plugin' },
      { label: 'Test', detail: 'Surefire runs JUnit' },
      { label: 'Package', detail: 'JAR or WAR artifact' },
    ],
  },
  setup: {
    icon: '⚙️',
    legend: 'Consistent toolchain prevents works-on-my-machine issues',
    scenes: [
      { label: 'Download JDK', detail: 'Install JDK 21 LTS' },
      { label: 'JAVA_HOME', detail: 'Point to JDK root' },
      { label: 'PATH', detail: 'Expose java and javac' },
      { label: 'IDE', detail: 'Import project and SDK' },
      { label: 'Verify', detail: 'java -version succeeds' },
    ],
  },
  modern: { icon: '✨', legend: 'Modern Java features reduce boilerplate while keeping type safety', scenes: [
    { label: 'Legacy style', detail: 'Verbose older pattern' },
    { label: 'New syntax', detail: 'JDK language or API feature' },
    { label: 'Benefit', detail: 'Less code, clearer intent' },
    { label: 'Requirement', detail: 'Minimum JDK version' },
    { label: 'Migrate', detail: 'Adopt incrementally in codebase' },
  ]},
  reactive: { icon: '🔁', legend: 'Reactive pipelines handle async streams of data', scenes: [
    { label: 'Publisher', detail: 'Source of events' },
    { label: 'Subscribe', detail: 'Consumer attaches' },
    { label: 'Operator', detail: 'map, filter, flatMap' },
    { label: 'Scheduler', detail: 'Thread hop if needed' },
    { label: 'Backpressure', detail: 'Slow consumer signals upstream' },
    { label: 'Complete', detail: 'Terminal event or error' },
  ]},
  generics: { icon: '🔷', legend: 'Generics add compile-time type safety', scenes: [
    { label: 'Raw type', detail: 'No type parameter' },
    { label: 'Parameterize', detail: 'Add &lt;T&gt; or bounded type' },
    { label: 'Compile check', detail: 'Wrong types rejected' },
    { label: 'Erasure', detail: 'Generics removed in bytecode' },
    { label: 'Bridge methods', detail: 'Preserve polymorphism' },
  ]},
  performance: { icon: '🚀', legend: 'Optimize only after measuring', scenes: [
    { label: 'Baseline', detail: 'Measure current latency/throughput' },
    { label: 'Profile', detail: 'CPU, allocation, lock contention' },
    { label: 'Hypothesis', detail: 'Identify likely bottleneck' },
    { label: 'Tune', detail: 'Algorithm, cache, GC, or config' },
    { label: 'Validate', detail: 'Benchmark proves improvement' },
  ]},
  cloud: { icon: '☁️', legend: 'Cloud-native Java runs in containers with health checks', scenes: [
    { label: 'Build', detail: 'Fat JAR or native image' },
    { label: 'Containerize', detail: 'Dockerfile with JRE' },
    { label: 'Orchestrate', detail: 'Kubernetes deployment' },
    { label: 'Scale', detail: 'Replicas and HPA' },
    { label: 'Health', detail: 'Liveness and readiness probes' },
  ]},
  debugging: { icon: '🐛', legend: 'Systematic debugging: reproduce, isolate, fix, verify', scenes: [
    { label: 'Symptom', detail: 'Failure or wrong output' },
    { label: 'Reproduce', detail: 'Minimal failing case' },
    { label: 'Stack trace', detail: 'Read cause and frames' },
    { label: 'Breakpoint', detail: 'Inspect live state' },
    { label: 'Fix', detail: 'Correct root cause' },
    { label: 'Regression test', detail: 'Prevent recurrence' },
  ]},
  api: { icon: '📚', legend: 'JDK APIs follow conventions — read Javadoc before use', scenes: [
    { label: 'Discover', detail: 'Find class in java.* package' },
    { label: 'Factory', detail: 'Static of(), valueOf(), or builder' },
    { label: 'Configure', detail: 'Set options or format' },
    { label: 'Invoke', detail: 'Call API methods' },
    { label: 'Consume', detail: 'Use immutable result' },
  ]},
  professional: { icon: '👔', legend: 'Professional Java balances readability, safety, and operability', scenes: [
    { label: 'Requirement', detail: 'Production constraint' },
    { label: 'Design', detail: 'Choose pattern or library' },
    { label: 'Implement', detail: 'Clean tested code' },
    { label: 'Review', detail: 'Peer validation' },
    { label: 'Operate', detail: 'Monitor in production' },
  ]},
  'best-practices': { icon: '⭐', legend: 'Conventions reduce cognitive load for every developer', scenes: [
    { label: 'Standard', detail: 'Team or Java convention' },
    { label: 'Apply', detail: 'Use in daily work' },
    { label: 'Enforce', detail: 'Lint and code review' },
    { label: 'Document', detail: 'README and examples' },
    { label: 'Maintain', detail: 'Consistent over time' },
  ]},
};

/** Rich multi-step overrides — used as base then merged with syntax */
const TOPIC_STEPS = {
  'variables-types': [
    { label: 'Primitive int', detail: 'int age = 25 stores value directly on stack', code: 'int age = 25;', icon: '🔢' },
    { label: 'Reassign', detail: 'Same variable slot, new value 30', code: 'age = 30;', icon: '🔁' },
    { label: 'double & boolean', detail: 'Other primitives store raw values too', code: 'double price = 9.99;', icon: '🔢' },
    { label: 'Reference type', detail: 'String name holds address, not characters', code: 'String name = "Ada";', icon: '🔗' },
    { label: 'Heap object', detail: 'Actual string chars live in heap memory', code: '// name → heap "Ada"', icon: '🗄️' },
    { label: 'Wrapper classes', detail: 'Integer boxes int for collections', code: 'Integer boxed = 42;', icon: '📦' },
    { label: 'var inference', detail: 'Compiler infers type from initializer', code: 'var list = new ArrayList<>();', icon: '✨' },
    { label: '8 primitives', detail: 'byte, short, int, long, float, double, char, boolean', code: 'boolean active = true;', icon: '📋' },
  ],
  'spring-boot': [
    { label: '@SpringBootApplication', detail: 'Enables auto-config, component scan, config class', code: '@SpringBootApplication', icon: '🚀' },
    { label: 'main()', detail: 'SpringApplication.run bootstraps context', code: 'SpringApplication.run(App.class, args);', icon: '▶️' },
    { label: 'Component scan', detail: 'Finds @Service, @Repository, @Controller', code: '@Component', icon: '🔍' },
    { label: 'Auto-config', detail: 'Classpath conditions create default beans', code: '@ConditionalOnClass', icon: '⚙️' },
    { label: 'Dependency injection', detail: 'Constructor injects collaborators', code: 'public OrderService(Repo r) { }', icon: '💉' },
    { label: '@RestController', detail: 'Maps HTTP to handler methods', code: '@GetMapping("/api")', icon: '🌐' },
    { label: 'Embedded Tomcat', detail: 'Server starts on configured port', code: 'server.port=8080', icon: '🖥️' },
    { label: 'Actuator', detail: 'Health and metrics endpoints', code: '/actuator/health', icon: '❤️' },
  ],
  'stream-api': [
    { label: 'Source', detail: 'Collection or array provides elements', code: 'list.stream()', icon: '📥' },
    { label: 'filter', detail: 'Keep elements matching predicate', code: '.filter(x -> x > 0)', icon: '🔽' },
    { label: 'map', detail: 'Transform each element', code: '.map(String::toUpperCase)', icon: '🔄' },
    { label: 'sorted', detail: 'Order elements', code: '.sorted()', icon: '📶' },
    { label: 'distinct', detail: 'Remove duplicates', code: '.distinct()', icon: '✨' },
    { label: 'collect', detail: 'Terminal — build List, Set, or Map', code: '.collect(Collectors.toList())', icon: '📤' },
    { label: 'Lazy', detail: 'Intermediates run only at terminal op', code: '// pipeline not executed yet', icon: '⏳' },
    { label: 'Parallel', detail: 'parallelStream() uses ForkJoinPool', code: '.parallel()', icon: '⚡' },
  ],
  'inheritance': [
    { label: 'extends', detail: 'Child class inherits parent members', code: 'class Dog extends Animal { }', icon: '🧬' },
    { label: 'super()', detail: 'Parent constructor runs first', code: 'super(name);', icon: '⬆️' },
    { label: 'Override', detail: 'Replace parent method behavior', code: '@Override void speak() { }', icon: '🔁' },
    { label: 'Dynamic dispatch', detail: 'JVM calls actual object type method', code: 'Animal a = new Dog();', icon: '🎯' },
    { label: 'protected', detail: 'Subclass accesses parent protected fields', code: 'protected int legs;', icon: '🔓' },
    { label: 'final class', detail: 'Cannot be extended further', code: 'final class Utility { }', icon: '🚫' },
  ],
  'exception-handling': [
    { label: 'Normal flow', detail: 'Statements execute sequentially', code: 'int r = a / b;', icon: '➡️' },
    { label: 'Risk', detail: 'Division by zero throws ArithmeticException', code: 'int b = 0;', icon: '⚠️' },
    { label: 'try', detail: 'Wrap code that may throw', code: 'try { ... }', icon: '🛡️' },
    { label: 'catch', detail: 'Handle specific exception type', code: 'catch (ArithmeticException e)', icon: '🤲' },
    { label: 'finally', detail: 'Always executes for cleanup', code: 'finally { close(); }', icon: '🧹' },
    { label: 'throw', detail: 'Explicitly signal an error', code: 'throw new IllegalArgumentException();', icon: '🚨' },
    { label: 'throws', detail: 'Declare checked exceptions on method', code: 'void read() throws IOException', icon: '📜' },
  ],
  'kafka-messaging': [
    { label: 'Producer', detail: 'Publishes records to a topic', code: 'producer.send(record);', icon: '📤' },
    { label: 'Topic', detail: 'Named log partitioned for scale', code: 'orders-events', icon: '📋' },
    { label: 'Partition', detail: 'Ordered sequence within partition', code: 'key → partition', icon: '📊' },
    { label: 'Broker', detail: 'Kafka server stores and replicates', code: 'broker-1:9092', icon: '🖥️' },
    { label: 'Consumer group', detail: 'Consumers share partition assignment', code: 'group.id=billing', icon: '👥' },
    { label: 'Offset', detail: 'Track read position per partition', code: 'commitSync()', icon: '📍' },
    { label: 'Replay', detail: 'Reset offset to reprocess events', icon: '🔁' },
  ],
  'garbage-collection': [
    { label: 'Allocate', detail: 'new creates objects on heap', code: 'new byte[1024];', icon: '📦' },
    { label: 'Live refs', detail: 'Reachable objects stay alive', code: 'Object o = new Object();', icon: '🔗' },
    { label: 'Mark', detail: 'GC traces reachable graph', icon: '🔍' },
    { label: 'Sweep', detail: 'Unreachable objects reclaimed', icon: '🧹' },
    { label: 'Young gen', detail: 'Eden + Survivor for new objects', icon: '🌱' },
    { label: 'Old gen', detail: 'Long-lived objects promoted', icon: '🌳' },
    { label: 'Pause', detail: 'Stop-the-world or concurrent phases', icon: '⏸️' },
    { label: 'Tune', detail: '-Xmx, G1, ZGC collector flags', icon: '⚙️' },
  ],
};

function describeCodeLine(line) {
  const t = line.trim();
  if (t.startsWith('@')) return `Annotation: ${clip(t, 50)}`;
  if (t.includes('public class') || t.includes('class ')) return 'Define a class or type';
  if (t.includes('interface ')) return 'Declare an interface contract';
  if (t.includes('extends ')) return 'Inheritance — extend parent class';
  if (t.includes('implements ')) return 'Implement interface methods';
  if (t.includes('main(')) return 'JVM entry point — program starts here';
  if (t.includes('new ')) return 'Create instance on the heap';
  if (t.includes('return ')) return 'Return value to caller';
  if (t.includes('throw ')) return 'Throw an exception';
  if (t.includes('catch')) return 'Handle caught exception';
  if (t.includes('try')) return 'Guard risky operations';
  if (t.includes('import ')) return 'Import external type';
  if (t.includes('package ')) return 'Declare package namespace';
  if (t.includes('if ') || t.startsWith('if(')) return 'Conditional branch';
  if (t.includes('for ') || t.includes('while ')) return 'Loop over data';
  if (t.includes('System.out')) return 'Print to console';
  return clip(t, 65);
}

function labelFromCode(line) {
  const t = line.trim();
  if (t.startsWith('@')) return clip(t.split('(')[0].replace('@', ''), 20);
  if (t.startsWith('setx ') || t.startsWith('winget ')) return 'Setup';
  if (t.startsWith('javac ') || t.startsWith('java ')) return 'Run';
  const m = t.match(/(?:public|private|protected)?\s*(?:static)?\s*(\w+)/);
  return m ? clip(m[1], 18) : clip(t.split(/[\s(=]/)[0], 18);
}

function labelFromSentence(sentence, index) {
  const s = sentence.trim();
  const patterns = [
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/,
    /^([A-Za-z]+(?:\s+[a-z]+){1,4})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m?.[1] && m[1].length > 4) return clip(m[1], 28);
  }
  return clip(s.split(/\s+/).slice(0, 4).join(' '), 28) || `Insight ${index}`;
}

/** @type {Record<string, string>} */
const SCENE_CODE = {
  Problem: '// Identify the real-world task to automate',
  Algorithm: '// Plan ordered steps before writing code',
  Program: 'public class Solution {\n    // implementation\n}',
  Outcome: 'System.out.println("Task complete");',
  Declare: 'int count = 0;',
  Initialize: 'String name = "value";',
  Assign: 'count = 42;',
  Operate: 'int result = a + b * c;',
  Branch: 'if (valid) { proceed(); }',
  Output: 'System.out.println(result);',
  Class: 'public class Example {\n    private int id;\n}',
  Object: 'Example obj = new Example();',
  Constructor: 'public Example(int id) { this.id = id; }',
  Config: '@Configuration\npublic class AppConfig { }',
  Bean: '@Bean\npublic Service service() { return new Service(); }',
  Inject: 'public Controller(Service svc) { this.svc = svc; }',
  Wire: '@Autowired private Repository repo;',
  Run: 'SpringApplication.run(App.class, args);',
  Client: '// HTTP client sends GET /api/resource',
  Endpoint: '@GetMapping("/api/items")',
  Process: 'return service.findAll();',
  Response: 'return ResponseEntity.ok(data);',
  Connect: 'Connection conn = dataSource.getConnection();',
  Query: 'PreparedStatement ps = conn.prepareStatement(sql);',
  Commit: 'conn.commit();',
  Thread: 'Thread t = Thread.ofVirtual().start(task);',
  Start: 'executor.submit(() -> doWork());',
  Source: 'list.stream()',
  Stream: '.stream().filter(x -> x > 0)',
  Transform: '.map(Item::getName)',
  Terminal: '.collect(Collectors.toList());',
  Try: 'try { risky(); }',
  Catch: 'catch (IOException e) { log(e); }',
  Finally: 'finally { resource.close(); }',
  Arrange: '@BeforeEach void setup() { }',
  Act: 'service.process(input);',
  Assert: 'assertEquals(expected, actual);',
};

function sceneToCode(scene, topic) {
  if (SCENE_CODE[scene.label]) return SCENE_CODE[scene.label];
  return `// ${scene.label}: ${clip(scene.detail, 58)}`;
}

function insightToCode(label, detail) {
  const d = detail.trim();
  if (d.includes('`')) {
    const tick = d.match(/`([^`]+)`/);
    if (tick) return tick[1];
  }
  if (/^(javac|java|mvn|gradle|setx|winget)\b/i.test(d)) return d.split(/\s+/).slice(0, 4).join(' ');
  return `// ${clip(label, 24)}: ${clip(d.replace(/\.$/, ''), 52)}`;
}

function meaningfulCode(label, detail, code, topic) {
  if (code && code.trim()) return code.trim();
  if (SCENE_CODE[label]) return SCENE_CODE[label];
  return insightToCode(label, detail);
}

function extractSyntaxLines(code) {
  return (code || '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => {
      if (!l || l === '{' || l === '}') return false;
      if (l.startsWith('/*') || l.startsWith('*') || l.endsWith('*/')) return false;
      if (l.startsWith('//') && l.length < 12) return false;
      return true;
    });
}

/**
 * @returns {{ label: string, detail: string, code: string, icon: string }[]}
 */
function buildSteps(topic, content) {
  const tag = primaryTag(topic.tags);
  const tmpl = TEMPLATES[tag] || TEMPLATES.overview;
  const steps = [];
  const seen = new Set();
  const seenLabels = new Set();

  const add = (label, detail, code = null, icon = tmpl.icon) => {
    const key = `${label}|${detail}`.toLowerCase();
    if (!detail || seen.has(key)) return;
    seen.add(key);
    seenLabels.add(label.toLowerCase());
    steps.push({
      label: clip(label, 28),
      detail: clip(detail, 90),
      code: meaningfulCode(label, detail, code, topic),
      icon,
    });
  };

  if (TOPIC_STEPS[topic.id]) {
    for (const s of TOPIC_STEPS[topic.id]) {
      add(s.label, s.detail, s.code ?? null, s.icon ?? tmpl.icon);
    }
  }

  for (const block of content.syntax || []) {
    const blockLabel = block.label || 'Syntax';
    const lines = extractSyntaxLines(block.code);

    if (lines.length === 0) {
      add(blockLabel, block.label || topic.title, `// ${blockLabel}`, '📝');
      continue;
    }

    if (lines.length === 1) {
      add(blockLabel, describeCodeLine(lines[0]), lines[0], '📝');
      continue;
    }

    lines.forEach((line) => {
      const lbl = `${blockLabel} · ${labelFromCode(line)}`;
      add(lbl, describeCodeLine(line), line, '📝');
    });
  }

  for (const scene of tmpl.scenes) {
    if (seenLabels.has(scene.label.toLowerCase())) continue;
    add(scene.label, scene.detail, sceneToCode(scene, topic), scene.icon ?? tmpl.icon);
  }

  const def = content.definition || topic.description || '';
  const maxInsights = steps.length >= 6 ? 2 : 4;
  const sentences = def
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30)
    .slice(0, maxInsights);

  sentences.forEach((sentence, i) => {
    const label = labelFromSentence(sentence, i + 1);
    if (seenLabels.has(label.toLowerCase())) return;
    const alreadyCovered = steps.some(
      (st) =>
        st.detail.toLowerCase().includes(sentence.slice(0, 22).toLowerCase()) ||
        sentence.toLowerCase().includes(st.label.toLowerCase()),
    );
    if (alreadyCovered) return;
    add(label, sentence, insightToCode(label, sentence), '💡');
  });

  if (steps.length < 2) {
    add(topic.title, def || topic.title, `// ${clip(topic.title, 40)}`, tmpl.icon);
  }

  return steps;
}

function stepCaption(step, i) {
  const marker = stepMarker(i);
  const codePart = step.code.startsWith('//')
    ? ''
    : ` — <code>${escCode(clip(step.code.replace(/\n/g, ' '), 52))}</code>`;
  return `${marker} <strong>${esc(step.label)}</strong>${codePart} · ${esc(step.detail)}`;
}

/**
 * @param {{ id: string, title: string, tags?: string[], description?: string }} topic
 * @param {{ definition?: string, syntax?: { label?: string, code: string }[] }} content
 */
export function buildFlowVisual(topic, content) {
  const tag = primaryTag(topic.tags);
  const tmpl = TEMPLATES[tag] || TEMPLATES.overview;
  const steps = buildSteps(topic, content);
  const n = steps.length;
  const { className, css, cycleSec } = generateVisualStyles(topic.id, n);

  const diagramParts = [];
  steps.forEach((s, i) => {
    diagramParts.push(`<div class="vf-step vf-step-${i}">
      <div class="vf-step-icon">${s.icon}</div>
      <div class="vf-step-num">${i + 1}</div>
      <div class="vf-step-label">${esc(s.label)}</div>
      <div class="vf-step-detail">${esc(s.detail)}</div>
    </div>`);
    if (i < n - 1) {
      diagramParts.push(`<div class="vf-connector vf-conn-${i}" aria-hidden="true">→</div>`);
    }
  });

  const codeStrip = steps
    .map((s, i) => {
      const ln = s.code;
      return `<div class="visual-code-line vf-cl vf-cl-${i}"><span class="visual-ln">${i + 1}</span><code>${escCode(ln)}</code></div>`;
    })
    .join('');

  const capHtml = steps.map((s, i) => `<span class="visual-caption vf-cap vf-cap-${i}">${stepCaption(s, i)}</span>`).join('');

  const chipHtml = steps
    .map((s) => `<span class="vf-chip" title="${esc(s.detail)}">${esc(s.label)}</span>`)
    .join('');

  const gradient = steps
    .map((_, i) => {
      const colors = ['#3b82f6', '#0d9488', '#7c3aed', '#ea580c', '#db2777', '#0891b2'];
      return colors[i % colors.length];
    })
    .join(', ');

  const subBase = `vis-sub-${topic.id}`;
  const walkId = `${subBase}-walk`;
  const ballId = `${subBase}-ball`;
  const ballHtml = buildBallVisual(topic, steps, cycleSec);

  const walkthroughPanel = `<div class="visual-stage visual-flow-stage visual-animated-stage ${className}" style="--visual-cycle: ${cycleSec}s; --step-count: ${n}" data-visual-steps="${n}" data-visual-cycle="${cycleSec}" data-visual-mode="walk" aria-label="${esc(topic.title)} walkthrough">
    <div class="visual-caption-bar">${capHtml}</div>
    <div class="visual-flow-grid">
      <div class="vf-diagram vf-diagram-scroll">${diagramParts.join('')}</div>
      <div class="visual-flow-aside">
        <div class="visual-code-strip visual-code-scroll">${codeStrip}</div>
      </div>
    </div>
    <div class="visual-chips-wrap"><div class="vf-chips vf-chips-panel">${chipHtml}</div></div>
  </div>
  <div class="visual-legend">
    <div class="visual-legend-item"><span class="visual-legend-swatch vf-swatch-flow" style="background: linear-gradient(90deg, ${gradient})"></span>${esc(tmpl.legend)}</div>
  </div>`;

  return `<div class="visual-wrap visual-flow" data-topic-id="${esc(topic.id)}">
  <style>${css}</style>
  <div class="visual-header">
    <p class="visual-intro"><strong>${esc(topic.title)}</strong> · <span class="visual-step-count">${n} steps</span> · ${cycleSec}s per loop</p>
    <div class="visual-toolbar">
      <button type="button" class="visual-ctrl-btn visual-toggle-play" aria-label="Pause animation" aria-pressed="false">
        <span class="visual-icon-pause" aria-hidden="true">⏸</span>
        <span class="visual-icon-play" aria-hidden="true" hidden>▶</span>
        <span class="visual-btn-text">Pause</span>
      </button>
      <span class="visual-step-status">Step <strong class="visual-step-current">1</strong> of ${n}</span>
    </div>
  </div>
  <div class="visual-subtabs">
    <input type="radio" name="${subBase}" id="${walkId}" class="visual-sub-radio" checked />
    <input type="radio" name="${subBase}" id="${ballId}" class="visual-sub-radio" />
    <nav class="visual-sub-nav" role="tablist" aria-label="Visual modes">
      <label for="${walkId}" class="visual-sub-btn" role="tab"><span class="tab-label-long">Walkthrough</span><span class="tab-label-short">Walk</span></label>
      <label for="${ballId}" class="visual-sub-btn" role="tab"><span class="tab-label-long">Data Journey</span><span class="tab-label-short">Journey</span></label>
    </nav>
    <div class="visual-sub-panel visual-sub-walk" role="tabpanel">${walkthroughPanel}</div>
    <div class="visual-sub-panel visual-sub-ball" role="tabpanel">${ballHtml}</div>
  </div>
</div>`;
}
