const buildInterview = (title, definition, benefit, usage, pitfall) => [
  {
    question: "What does " + title + " cover in advanced Java?",
    answer: definition,
  },
  {
    question: "Why do teams invest in " + title + "?",
    answer: "It " + benefit + ". Teams adopt it when the productivity, performance, or maintainability gains outweigh the learning curve and operational complexity.",
  },
  {
    question: "How should you demonstrate " + title + " during a coding challenge?",
    answer: usage,
  },
  {
    question: "What traps should you mention about " + title + "?",
    answer: "Beware of " + pitfall + ". Interviewers reward candidates who name concrete failure modes and how they detect them in logs, tests, or profilers.",
  },
  {
    question: "How do you compare " + title + " with the traditional imperative approach?",
    answer: "Contrast readability, performance characteristics, debugging difficulty, and team familiarity. The best answer explains when " + title + " is the right default and when to stay imperative.",
  },
  {
    question: "What JDK or ecosystem knowledge is expected for " + title + "?",
    answer: "Know the minimum JDK version, key API classes, common libraries that build on it, and any preview or incubator status. Mention how you track changes through release notes and JEPs.",
  },
  {
    question: "How would you test code that uses " + title + "?",
    answer: "Use unit tests for pure logic, integration tests for framework wiring, and stress tests when concurrency or I/O is involved. Mock external systems and assert both happy paths and failure handling.",
  },
  {
    question: "What production incident patterns relate to " + title + "?",
    answer: "Discuss timeouts, resource exhaustion, misconfiguration, version skew, and observability gaps. Strong answers tie " + title + " to metrics, logs, and runbooks used during on-call response.",
  },
  {
    question: "How do you mentor a junior developer learning " + title + "?",
    answer: "Start with a minimal working example, explain vocabulary, pair on a small feature, and review their code for safety and clarity. Encourage reading official documentation before Stack Overflow shortcuts.",
  },
  {
    question: "What architecture-level decisions involve " + title + "?",
    answer: "Cover service boundaries, dependency choices, deployment model, and how the decision affects scalability and operability. " + title + " should fit the system's reliability and team skill profile.",
  },
];

const topics = [
  {
    id: "lambda-expressions",
    title: "Lambda Expressions",
    definition:
      "Lambda expressions provide inline behavior for functional interfaces, letting you treat callbacks and collection transforms as compact expressions instead of anonymous classes.",
    syntax: [
      {
        label: "Comparator lambda",
        code: `Comparator<String> cmp = (a, b) -> Integer.compare(a.length(), b.length());`,
      },
      {
        label: "Runnable block",
        code: `Runnable notifier = () -> {
    System.out.println("Completed");
};`,
      },
    ],
    benefit: "reduces boilerplate by keeping behavior adjacent to the call site for stream operations and callbacks",
    usage:
      "Pair the comparator lambda with Collections.sort or Stream.sorted to demonstrate deferred execution and type inference.",
    pitfall: "capturing mutable outer variables or assuming a lambda runs on a new thread",
  },
  {
    id: "method-references",
    title: "Method References",
    definition:
      "Method references reuse existing methods as implementations for functional interfaces, improving readability when the target already matches the expected signature.",
    syntax: [
      {
        label: "Static method reference",
        code: `Predicate<String> blank = String::isBlank;`,
      },
      {
        label: "Constructor reference",
        code: `Supplier<List<String>> listFactory = ArrayList::new;`,
      },
    ],
    benefit: "conveys intent cleanly by handing named methods to streams and executors",
    usage:
      "Showcase Stream.of(...).map(String::trim) or list.forEach(System.out::println) to demonstrate direct method wiring.",
    pitfall: "overusing method references when a lambda expresses intent more clearly or when signatures diverge",
  },
  {
    id: "stream-api",
    title: "Stream API",
    definition:
      "The Stream API provides a fluent pipeline for filtering, mapping, and collecting data from collections and I/O sources in a declarative style.",
    syntax: [
      {
        label: "Pipeline with filter and map",
        code: `List<String> vip = users.stream()
    .filter(User::isActive)
    .map(User::getEmail)
    .collect(Collectors.toList());`,
      },
      {
        label: "Primitive stream average",
        code: `double average = IntStream.rangeClosed(1, 10)
    .average()
    .orElse(0);`,
      },
    ],
    benefit: "lets you replace imperative loops with chained operations that describe transformation intent",
    usage:
      "Combine filtering, mapping, and collectors in a single pipeline to highlight lazy evaluation.",
    pitfall: "holding references to the source while streaming, which blocks parallelization and increases memory",
  },
  {
    id: "stream-advanced",
    title: "Stream Advanced Features",
    definition:
      "Advanced stream usage explores parallel streams, custom collectors, spliterators, and bridging to reactive boundaries.",
    syntax: [
      {
        label: "Custom collector example",
        code: `Collector<Transaction, ?, Map<Boolean, List<Transaction>>> partition =
    Collectors.partitioningBy(t -> t.isDebit());`,
      },
      {
        label: "Parallel stream with ordered output",
        code: `transactions.parallelStream().forEachOrdered(this::process);`,
      },
    ],
    benefit: "scales declarative workflows to multiple cores while letting you specialize accumulation logic",
    usage:
      "Mention constructing a custom Collector.of and pairing it with parallelStream while enforcing deterministic results.",
    pitfall: "assuming parallel streams always improve throughput and sharing mutable collectors between threads",
  },
  {
    id: "optional",
    title: "Optional",
    definition:
      "Optional models presence or absence explicitly, encouraging fluent fallback handling rather than scattered null checks.",
    syntax: [
      {
        label: "Mapping optional value",
        code: `Optional<User> active = userRepository.findById(id)
    .filter(User::isActive);
active.map(User::getEmail).ifPresent(System.out::println);`,
      },
      {
        label: "Providing defaults",
        code: `String safeName = Optional.ofNullable(user.getName()).orElse("Anonymous");`,
      },
    ],
    benefit: "makes nullability explicit and composes fallback logic in one chained expression",
    usage:
      "Fetch an entity, chain map, and finish with orElseThrow to highlight clear branching.",
    pitfall: "serializing Optional fields or wrapping Optional into another Optional unnecessarily",
  },
  {
    id: "records",
    title: "Records",
    definition:
      "Records are concise, immutable data carriers that automatically generate constructors, accessors, equals, hashCode, and toString.",
    syntax: [
      {
        label: "Minimal record",
        code: `public record Point(int x, int y) {}`,
      },
      {
        label: "Record with derived method",
        code: `public record User(String name, String email) {
    public boolean isVerified() {
        return email.endsWith("@company.com");
    }
}`,
      },
    ],
    benefit: "reduces ceremony for value objects while keeping state immutable by default",
    usage: "Use records for DTOs and combine them with pattern matching in switches.",
    pitfall: "trying to extend records or embedding mutable fields inside them",
  },
  {
    id: "sealed-classes",
    title: "Sealed Classes",
    definition:
      "Sealed classes and interfaces restrict their permitted implementations, which supports exhaustive switches and tight hierarchies.",
    syntax: [
      {
        label: "Sealed interface structure",
        code: `public sealed interface Shape permits Circle, Rectangle {}
final class Circle implements Shape { ... }`,
      },
      {
        label: "Exhaustive switch",
        code: `return switch (shape) {
    case Circle c -> circleArea(c);
    case Rectangle r -> r.width() * r.height();
};`,
      },
    ],
    benefit: "safeguards hierarchies and keeps pattern matching exhaustive by design",
    usage:
      "Walk through a sealed command hierarchy and show the compiler error when a subclass is missing from the switch.",
    pitfall: "listing too many permits or forgetting to update the clause after refactors",
  },
  {
    id: "pattern-matching",
    title: "Pattern Matching",
    definition:
      "Pattern matching extends instanceof and switch to destructure objects, eliminating boilerplate casts.",
    syntax: [
      {
        label: "Instanceof pattern binding",
        code: `if (obj instanceof String s) {
    System.out.println(s.length());
}`,
      },
      {
        label: "Switch pattern",
        code: `return switch (message) {
    case Error e -> handleError(e);
    case Warning w -> logWarning(w);
};`,
      },
    ],
    benefit: "clears casting noise and clarifies branch intent with structured patterns",
    usage: "Show switch expressions that bind record components or handle sealed types.",
    pitfall: "mixing pattern matching with raw legacy APIs or ignoring exhaustive coverage",
  },
  {
    id: "concurrency-basics",
    title: "Concurrency Basics",
    definition:
      "Concurrency basics cover threads, executors, synchronization, and volatile semantics to coordinate multiple workers safely.",
    syntax: [
      {
        label: "Executor service usage",
        code: `ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> runTask());`,
      },
      {
        label: "Synchronized increment",
        code: `synchronized (lock) {
    sharedCounter++;
}`,
      },
    ],
    benefit: "lets you parallelize CPU-bound tasks while guarding shared state",
    usage:
      "Pair an executor with futures or CountDownLatch to describe structured coordination.",
    pitfall: "overlocking or forgetting to shut down executors before application exit",
  },
  {
    id: "java-memory-model",
    title: "Java Memory Model",
    definition:
      "The Java Memory Model defines happens-before relationships, volatile guarantees, and atomicity for thread interactions.",
    syntax: [
      {
        label: "Volatile flag",
        code: `private volatile boolean running;
public void stop() { running = false; }`,
      },
      {
        label: "Atomic integer",
        code: `AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet();`,
      },
    ],
    benefit: "provides predictable visibility across cores without manual fences",
    usage:
      "Explain how volatile and synchronized establish happens-before edges using the running flag.",
    pitfall: "assuming volatile makes compound actions atomic or mixing it with unsynchronized updates",
  },
  {
    id: "threadlocal-pitfalls",
    title: "ThreadLocal Pitfalls",
    definition:
      "ThreadLocal pitfalls highlight leaks, missing removal, and context propagation when threads are pooled.",
    syntax: [
      {
        label: "ThreadLocal formatter",
        code: `private static final ThreadLocal<SimpleDateFormat> formatter =
    ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));`,
      },
      {
        label: "Cleanup",
        code: `try {
    ...
} finally {
    formatter.remove();
}`,
      },
    ],
    benefit: "simplifies per-thread context while avoiding synchronization overhead",
    usage: "Show storing request IDs and cleaning them in a finally block.",
    pitfall: "forgetting to clear the value and leaking large objects in thread pools",
  },
  {
    id: "fork-join",
    title: "Fork/Join",
    definition:
      "Fork/Join splits tasks recursively to exploit work-stealing pools for divide-and-conquer algorithms.",
    syntax: [
      {
        label: "Recursive task",
        code: `class SumTask extends RecursiveTask<Integer> {
    protected Integer compute() {
        if (data.length < threshold) {
            return sequentialSum();
        }
        SumTask left = new SumTask(...);
        SumTask right = new SumTask(...);
        left.fork();
        return right.compute() + left.join();
    }
}`,
      },
      {
        label: "Pool invocation",
        code: `int result = ForkJoinPool.commonPool().invoke(new SumTask(data));`,
      },
    ],
    benefit: "delivers performance for naturally parallel divide-and-conquer workloads",
    usage: "Walk through fork()/join() balance and show how splitting arrays reduces latency.",
    pitfall: "mixing blocking I/O inside tasks or oversubscribing the common pool",
  },
  {
    id: "virtual-threads",
    title: "Virtual Threads",
    definition:
      "Virtual threads provide lightweight fibers scheduled by the carrier system, lowering memory per thread.",
    syntax: [
      {
        label: "Start virtual thread",
        code: `Thread.startVirtualThread(() -> handleRequest());`,
      },
      {
        label: "Structured scope",
        code: `try (var scope = StructuredTaskScope.ofPlatform()) {
    scope.fork(() -> fetchA());
    scope.join();
}`,
      },
    ],
    benefit: "lets you handle thousands of I/O-bound tasks with blocking-style code",
    usage: "Contrast a blocking socket accept loop on virtual threads with traditional thread pools.",
    pitfall: "ignoring blocking operations that still block carrier threads or leaking fibers across requests",
  },
  {
    id: "completable-future",
    title: "CompletableFuture",
    definition:
      "CompletableFuture composes async pipelines with callbacks, combining, and exception handling without manual thread juggling.",
    syntax: [
      {
        label: "Async chain",
        code: `CompletableFuture.supplyAsync(this::fetch)
    .thenApply(this::transform)
    .thenAccept(System.out::println);`,
      },
      {
        label: "Combine results",
        code: `CompletableFuture.allOf(f1, f2).thenRun(this::merge);`,
      },
    ],
    benefit: "composes async flows declaratively and integrates with executor pools",
    usage: "Demonstrate supplyAsync plus thenCompose to flatten nested futures.",
    pitfall: "forgetting exception handling or calling blocking join prematurely",
  },
  {
    id: "structured-concurrency",
    title: "Structured Concurrency",
    definition:
      "Structured concurrency organizes concurrent tasks hierarchically so children finish before parents and cancellation is scoped.",
    syntax: [
      {
        label: "Structured scope",
        code: `try (var scope = StructuredTaskScope.ofShutdownOnFailure()) {
    scope.fork(() -> callA());
    scope.join();
}`,
      },
      {
        label: "Cancel scope",
        code: `scope.cancel();`,
      },
    ],
    benefit: "prevents runaway tasks and mirrors request lifecycles",
    usage: "Describe StructuredTaskScope with fork/join and failure propagation.",
    pitfall: "mixing structured scopes with ad-hoc futures or leaking scopes",
  },
  {
    id: "jdbc",
    title: "JDBC",
    definition:
      "JDBC is the core API for executing SQL, managing transactions, and handling result sets with resource safety.",
    syntax: [
      {
        label: "Try-with-resources query",
        code: `try (Connection c = ds.getConnection(); PreparedStatement ps = c.prepareStatement("INSERT ...")) {
    ps.executeUpdate();
}`,
      },
      {
        label: "Batch update",
        code: `for (Order o : orders) {
    ps.setInt(1, o.getQty());
    ps.addBatch();
}
ps.executeBatch();`,
      },
    ],
    benefit: "gives precise control over batching, auto-commit, and transaction boundaries",
    usage: "Stress connection pooling, setAutoCommit(false), and explicit rollbacks.",
    pitfall: "leaving statements open or using string concatenation for SQL",
  },
  {
    id: "logging",
    title: "Logging",
    definition:
      "Logging strategy covers frameworks like SLF4J/Logback, context propagation via MDC, and choosing appropriate levels.",
    syntax: [
      {
        label: "Logger usage",
        code: `private static final Logger log = LoggerFactory.getLogger(Service.class);
log.debug("Processing {}", requestId);`,
      },
      {
        label: "Structured logging",
        code: `log.atInfo().addKeyValue("user", userId).log("Request completed");`,
      },
    ],
    benefit: "captures actionable diagnostics without hurting throughput",
    usage: "Show MDC population and parameterized logging to avoid string concatenation.",
    pitfall: "logging sensitive data or using error for expected flow-control",
  },
  {
    id: "build-tools",
    title: "Build Tools",
    definition:
      "Build tools such as Maven and Gradle orchestrate dependency resolution, compilation, testing, and packaging.",
    syntax: [
      {
        label: "Gradle task",
        code: `tasks.register("stage") {
    dependsOn("clean", "build")
}`,
      },
      {
        label: "Maven profile",
        code: `<profile>
  <id>integration</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>
</profile>`,
      },
    ],
    benefit: "encapsulates lifecycle, plugin wiring, and multi-module builds",
    usage:
      "Describe customizing build.gradle.kts for annotation processors or configuring Maven Surefire.",
    pitfall: "mixing build tool idioms or leaving plugin versions floating",
  },
  {
    id: "nio-channels",
    title: "NIO Channels",
    definition:
      "NIO channels and selectors provide non-blocking access to files and sockets with explicit buffer management.",
    syntax: [
      {
        label: "Asynchronous socket channel",
        code: `AsynchronousSocketChannel channel = AsynchronousSocketChannel.open();`,
      },
      {
        label: "File channel transfer",
        code: `try (FileChannel in = FileChannel.open(src);
FileChannel out = FileChannel.open(dst, StandardOpenOption.WRITE)) {
    in.transferTo(0, in.size(), out);
}`,
      },
    ],
    benefit: "supports high-throughput I/O while the runtime manages readiness",
    usage:
      "Explain registering interest ops with a Selector or using AsynchronousFileChannel to avoid blocking.",
    pitfall: "forgetting to flip buffers or mishandling selector wake-ups",
  },
  {
    id: "jpms-deep",
    title: "JPMS Deep Dive",
    definition:
      "A JPMS deep dive covers modules, exports, requires, services, and runtime encapsulation beyond packages.",
    syntax: [
      {
        label: "module-info",
        code: `module com.app {
    requires java.sql;
    exports com.app.api;
}`,
      },
      {
        label: "Service loader",
        code: `uses PaymentProvider.class;
provides PaymentProvider with StripeProvider.class;`,
      },
    ],
    benefit: "enforces module boundaries and reduces accidental access",
    usage: "Discuss layering API and impl modules plus service declarations.",
    pitfall: "overmodularizing small projects or forgetting to open packages for reflection",
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    definition:
      "Spring Boot accelerates Java delivery with auto-configuration, starters, and embedded containers for production-ready apps.",
    syntax: [
      {
        label: "Main application",
        code: `@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}`,
      },
      {
        label: "REST controller",
        code: `@RestController
class HelloController {
    @GetMapping("/hello")
    String hello() { return "Hello"; }
}`,
      },
    ],
    benefit: "lets you focus on business logic while starters wire databases, messaging, and metrics",
    usage:
      "Mention customizing application.yml, @ConfigurationProperties, and health indicators.",
    pitfall: "hiding performance issues behind auto-config and neglecting startup profiling",
  },
  {
    id: "rest-apis",
    title: "REST APIs",
    definition:
      "REST APIs cover controllers, DTOs, HATEOAS, content negotiation, and versioning best practices.",
    syntax: [
      {
        label: "Request mapping",
        code: `@PostMapping(path = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
ResponseEntity<User> create(@RequestBody User user) { ... }`,
      },
      {
        label: "Link building",
        code: `Link self = WebMvcLinkBuilder.linkTo(methodOn(UserController.class).fetch(id)).withSelfRel();`,
      },
    ],
    benefit: "delivers predictable contracts with standard verbs and statuses",
    usage: "Explain returning ResponseEntity with status codes and DTO payloads.",
    pitfall: "overloading URI semantics or disregarding HTTP caching headers",
  },
  {
    id: "reactive-java",
    title: "Reactive Java",
    definition:
      "Reactive Java uses Project Reactor or RxJava to handle backpressure, non-blocking data flows, and asynchronous streams.",
    syntax: [
      {
        label: "Flux pipeline",
        code: `Flux.range(1, 10)
    .filter(i -> i % 2 == 0)
    .subscribe(System.out::println);`,
      },
      {
        label: "Mono web client",
        code: `Mono<ClientResponse> response = WebClient.create()
    .get()
    .uri("/api")
    .retrieve()
    .toBodilessEntity();`,
      },
    ],
    benefit: "stays responsive under load by streaming data reactively instead of blocking threads",
    usage: "Contrast Flux with Stream and mention delayElements to simulate backpressure.",
    pitfall: "blocking inside subscribe or treating reactive code as imperative",
  },
  {
    id: "spring-advanced",
    title: "Spring Advanced",
    definition:
      "Spring advanced topics include AOP, custom scopes, conditional beans, and context startup tuning.",
    syntax: [
      {
        label: "Custom qualifier",
        code: `@Qualifier("calculator")
@Inject
Calculator calculator;`,
      },
      {
        label: "Aspect definition",
        code: `@Aspect
@Component
class LoggingAspect {
    @Around("execution(* com.app..*(..))")
    public Object log(ProceedingJoinPoint p) throws Throwable {
        ...
    }
}`,
      },
    ],
    benefit: "lets you orchestrate bean lifecycles, cross-cutting concerns, and profiles precisely",
    usage:
      "Discuss @ConditionalOnProperty, @EventListener, and @Import for flexible wiring.",
    pitfall: "overusing proxies or scattering @Profile annotations without documentation",
  },
  {
    id: "spring-security",
    title: "Spring Security",
    definition:
      "Spring Security enforces authentication, authorization, CSRF, and integrates with OAuth2 or LDAP providers.",
    syntax: [
      {
        label: "Security filter chain",
        code: `@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(r -> r.anyRequest().authenticated())
        .build();
}`,
      },
      {
        label: "Method security",
        code: `@PreAuthorize("hasRole('ADMIN')")
void approve() { ... }`,
      },
    ],
    benefit: "protects endpoints and beans with fine-grained rules",
    usage: "Explain customizing UserDetailsService and adding JWT filters.",
    pitfall: "misconfiguring CORS or leaving default credentials enabled",
  },
  {
    id: "jvm-architecture",
    title: "JVM Architecture",
    definition:
      "JVM architecture studies class loading, bytecode verification, JIT compilation, and native interface boundaries.",
    syntax: [
      {
        label: "Runtime MXBean",
        code: `RuntimeMXBean runtime = ManagementFactory.getRuntimeMXBean();`,
      },
      {
        label: "Unsafe allocation",
        code: `long address = Unsafe.getUnsafe().allocateMemory(1024);`,
      },
    ],
    benefit: "understanding internals helps tune performance and troubleshoot native issues",
    usage: "Reference JVM TI or JOL to inspect layouts and mention GC log flags.",
    pitfall: "tuning heuristics without workload data or relying on Unsafe in production",
  },
  {
    id: "garbage-collection",
    title: "Garbage Collection",
    definition:
      "Garbage collection covers collectors like G1 and ZGC, ergonomics, reachability, and tuning heuristics.",
    syntax: [
      {
        label: "GC logging flag",
        code: `-Xlog:gc*`,
      },
      {
        label: "Soft reference caching",
        code: `SoftReference<Image> cache = new SoftReference<>(image);`,
      },
    ],
    benefit: "automates cleanup while letting you shape pause and throughput goals",
    usage: "Discuss GC threads, pause vs throughput, and how -XX:+UseG1GC applies.",
    pitfall: "ignoring promotion failure warnings or forcing full GC manually",
  },
  {
    id: "memory-management",
    title: "Memory Management",
    definition:
      "Memory management examines heap regions, metaspace, stack frames, and diagnosing leaks.",
    syntax: [
      {
        label: "Heap dump command",
        code: `jmap -dump:live,file=heap.hprof <pid>`,
      },
      {
        label: "WeakHashMap cache",
        code: `Map<String, Value> cache = new WeakHashMap<>();`,
      },
    ],
    benefit: "keeps Java's footprint predictable and responds quickly to leak signals",
    usage: "Mention VisualVM heapsnapshot and Flight Recorder allocation tracking.",
    pitfall: "confusing GC churn with NPEs or relying solely on GC logs",
  },
  {
    id: "jvm-performance",
    title: "JVM Performance",
    definition:
      "JVM performance tuning focuses on JIT tiers, inlining, escape analysis, and runtime metrics.",
    syntax: [
      {
        label: "JFR recording",
        code: `jfr start -n app -d 5m`,
      },
      {
        label: "Compiler directive",
        code: `@ForceInline
public int add(int a, int b) { return a + b; }`,
      },
    ],
    benefit: "provides precise hotspot metrics and knobs for latency-sensitive workloads",
    usage: "Contrast -client vs -server, inspect JFR logs, and mention C2 compile times.",
    pitfall: "optimizing without profiling or disabling escape analysis heuristics",
  },
  {
    id: "bytecode-asm",
    title: "Bytecode and ASM",
    definition:
      "Bytecode mastery covers generating, transforming, and verifying class files with ASM or similar tooling.",
    syntax: [
      {
        label: "ASM visitor",
        code: `ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
MethodVisitor mv = writer.visitMethod(...);`,
      },
      {
        label: "Opcode emit",
        code: `mv.visitInsn(Opcodes.RETURN);`,
      },
    ],
    benefit: "enables instrumentation, weaving, and runtime proxies without source changes",
    usage: "Explain adding profiling hooks via AdviceAdapter intercepting method entry.",
    pitfall: "producing invalid stack frames or ignoring class version dependencies",
  },
  {
    id: "graalvm-native",
    title: "GraalVM Native",
    definition:
      "GraalVM native image compiles Java ahead-of-time into a binary with closed-world analysis.",
    syntax: [
      {
        label: "Native build",
        code: `native-image --no-fallback -jar app.jar`,
      },
      {
        label: "Reflection config",
        code: `{
  "name": "com.app.Model",
  "allDeclaredConstructors": true
}`,
      },
    ],
    benefit: "starts fast with small memory footprints ideal for CLI tools and microservices",
    usage:
      "Mention restricting reflection, registering proxies, and verifying image size.",
    pitfall: "treating native images like JVM runs without registering reflection/configuration",
  },
  {
    id: "foreign-memory",
    title: "Foreign Memory",
    definition:
      "The Foreign Memory Access API lets Java interact with native memory safely outside the heap.",
    syntax: [
      {
        label: "Allocate native buffer",
        code: `MemorySegment segment = MemorySegment.allocateNative(1024);`,
      },
      {
        label: "Access via VarHandle",
        code: `VarHandle VH = MemoryLayout.ofSequence(256, ValueLayout.JAVA_INT).varHandle(long.class, MemoryLayout.PathElement.sequenceElement());`,
      },
    ],
    benefit: "supports high-performance native interactions while keeping safety checks",
    usage: "Illustrate copying a C array by mapping a segment and using a VarHandle.",
    pitfall: "forgetting to close the segment or mishandling alignment",
  },
  {
    id: "design-patterns",
    title: "Design Patterns",
    definition:
      "Design patterns (Factory, Strategy, Observer) describe reusable object-oriented collaborations.",
    syntax: [
      {
        label: "Strategy usage",
        code: `PaymentStrategy strategy = new CreditCardStrategy();
strategy.pay(amount);`,
      },
      {
        label: "Builder pattern",
        code: `Order order = Order.builder().item("Book").qty(2).build();`,
      },
    ],
    benefit: "documents proven collaboration models and decouples behavior",
    usage: "Reference DI wiring a strategy and showing an Observer with PropertyChangeSupport.",
    pitfall: "overusing patterns without clear motivation or forcing patterns on simple code",
  },
  {
    id: "solid-principles",
    title: "SOLID Principles",
    definition:
      "SOLID guidelines (Single Responsibility, Open/Closed, etc.) steer maintainable, testable design.",
    syntax: [
      {
        label: "Interface segregation",
        code: `interface Printer { void print(); }
interface Scanner { void scan(); }`,
      },
      {
        label: "Dependency inversion",
        code: `public class Controller {
    private final Repository repo;
    public Controller(Repository repo) {
        this.repo = repo;
    }
}`,
      },
    ],
    benefit: "keeps modules loosely coupled and easier to evolve",
    usage: "Explain how interface segregation separates duties and DIP invites constructor injection.",
    pitfall: "splitting classes too finely or ignoring the pragmatic cost of extra indirection",
  },
  {
    id: "microservices",
    title: "Microservices",
    definition:
      "Microservices architecture splits systems into autonomous services communicating through APIs.",
    syntax: [
      {
        label: "Discovery client",
        code: `@EnableDiscoveryClient
@SpringBootApplication
class ServiceApp {}`,
      },
      {
        label: "Feign interface",
        code: `@FeignClient("orders")
interface OrderClient {
    @GetMapping("/orders")
    List<Order> list();
}`,
      },
    ],
    benefit: "enables independent deployment, scaling, and bounded contexts",
    usage: "Talk about contracts, circuit breakers, tracing, and service meshes.",
    pitfall: "handling data consistency and avoiding chatty communication",
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    definition:
      "Distributed systems focus on consensus, eventual consistency, partition tolerance, and resilience.",
    syntax: [
      {
        label: "Retry policy",
        code: `RetryPolicy policy = new RetryPolicy().withMaxRetries(3);`,
      },
      {
        label: "Leader election",
        code: `LeaderLatch latch = new LeaderLatch(curator, path);`,
      },
    ],
    benefit: "decouples services across failures while enabling graceful degradation",
    usage: "Describe idempotent retries, consensus algorithms, and designing for partial failures.",
    pitfall: "treating distributed systems like single-node apps and ignoring partitions",
  },
  {
    id: "security",
    title: "Security",
    definition:
      "Security covers authentication, authorization, encryption, secrets management, and secure defaults.",
    syntax: [
      {
        label: "Password encoder",
        code: `PasswordEncoder encoder = new BCryptPasswordEncoder();`,
      },
      {
        label: "HTTPS enforcement",
        code: `http.requiresChannel().anyRequest().requiresSecure();`,
      },
    ],
    benefit: "protects data and trust in hostile environments",
    usage: "Explain key rotation, JWT verification, and vault-backed secrets.",
    pitfall: "hardcoding credentials or using weak cryptography",
  },
  {
    id: "caching",
    title: "Caching",
    definition:
      "Caching strategies (in-memory, distributed, TTL) balance latency and consistency for hot data.",
    syntax: [
      {
        label: "Caffeine cache",
        code: `CacheLoader<String, User> loader = key -> userRepo.find(key);
Cache<String, User> cache = Caffeine.newBuilder().expireAfterWrite(5, MINUTES).build(loader);`,
      },
      {
        label: "Redis interaction",
        code: `try (Jedis j = jedisPool.getResource()) {
    j.set("user:1", mapper.writeValueAsString(user));
}`,
      },
    ],
    benefit: "reduces upstream load and keeps response times predictable",
    usage: "Discuss invalidation, cache stampede prevention, and warming strategies.",
    pitfall: "returning stale data or bypassing caches for every call",
  },
  {
    id: "testing-advanced",
    title: "Advanced Testing",
    definition:
      "Advanced testing uses integration suites, virtualization, property tests, and performance guards.",
    syntax: [
      {
        label: "Testcontainers",
        code: `@Testcontainers
class DbTest {
    @Container
    PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>();
}`,
      },
      {
        label: "Property test",
        code: `@Property
void roundTrip(@ForAll @AlphaChars String value) { ... }`,
      },
    ],
    benefit: "gives confidence in distributed interactions and boundary conditions",
    usage: "Mention combining contract tests, embedded servers, and CI gating.",
    pitfall: "letting integration suites mask flakiness or ignoring non-functional regression",
  },
  {
    id: "observability",
    title: "Observability",
    definition:
      "Observability ties logs, metrics, and traces together to expose system behavior.",
    syntax: [
      {
        label: "Micrometer meter",
        code: `MeterRegistry registry = new SimpleMeterRegistry();
Counter counter = registry.counter("requests");`,
      },
      {
        label: "OpenTelemetry span",
        code: `Span span = tracer.spanBuilder("process").startSpan();`,
      },
    ],
    benefit: "helps detect regressions without reproducing issues",
    usage: "Show @Timed metrics or manual span instrumentation feeding dashboards.",
    pitfall: "collecting too much data or skipping consistent tagging",
  },
  {
    id: "cicd-containers",
    title: "CI/CD and Containers",
    definition:
      "CI/CD with containers automates builds, tests, and deployments inside reproducible images.",
    syntax: [
      {
        label: "GitHub Actions job",
        code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3`,
      },
      {
        label: "Dockerfile snippet",
        code: `FROM eclipse-temurin:17-jdk
COPY target/app.jar /app.jar
CMD ["java", "-jar", "/app.jar"]`,
      },
    ],
    benefit: "keeps delivery predictable and aligns environments from dev to prod",
    usage: "Describe binding Maven build to Action workflow and pushing artifacts.",
    pitfall: "ignoring layer caching or skipping security scans",
  },
  {
    id: "java-roadmap",
    title: "Java Roadmap",
    definition:
      "A Java roadmap outlines mastering core syntax, concurrency, tooling, frameworks, and maintenance habits.",
    syntax: [
      {
        label: "Learning plan",
        code: `List<String> plan = List.of("Core", "Concurrency", "Frameworks", "Performance");`,
      },
      {
        label: "Checklist state",
        code: `Map<String, Boolean> status = new LinkedHashMap<>();
status.put("Streams", true);`,
      },
    ],
    benefit: "keeps upskilling structured and communicable across teams",
    usage: "Talk about pairing projects with RFC reading, benchmarking, and open-source contributions.",
    pitfall: "chasing every new feature without mastering fundamentals",
  },
];

const advancedTopics = Object.fromEntries(
  topics.map(({ id, title, definition, syntax, benefit, usage, pitfall }) => [
    id,
    {
      definition,
      syntax,
      interview: buildInterview(title, definition, benefit, usage, pitfall),
    },
  ])
);

export default advancedTopics;
