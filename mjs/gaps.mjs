/** Additional topics to close major Java coverage gaps — merged at build time */

const baseInterview = (title, definition, usage, pitfall) => [
  { question: `What is ${title} and when do you use it?`, answer: definition },
  { question: `Why does ${title} matter in production Java?`, answer: `Enterprise teams rely on it because ${usage}. Skipping this topic leaves blind spots in interviews and on the job.` },
  { question: `Show how ${title} looks in real Java code.`, answer: `Demonstrate a minimal, compilable example, explain each line, and mention JDK version requirements if any.` },
  { question: `What are common mistakes with ${title}?`, answer: `Watch for ${pitfall}. Interviewers often ask you to spot bugs or explain failure modes, not just recite definitions.` },
  { question: `How is ${title} tested and monitored?`, answer: `Use unit or integration tests, logging, and metrics appropriate to the feature. Tie answers to how your team validates behavior in CI and production.` },
  { question: `What follow-up questions appear after ${title}?`, answer: `Expect comparisons with alternatives, performance implications, thread safety, and how it fits Spring or plain Java SE projects.` },
  { question: `How would a senior engineer evaluate ${title} in architecture review?`, answer: `They assess complexity, operability, security, and long-term maintenance — not only whether the API compiles.` },
  { question: `Where does ${title} sit on the Java roadmap?`, answer: `Relate it to JDK releases, JEPs, or ecosystem libraries so you show you stay current beyond textbook definitions.` },
];

const T = (definition, syntax, usage, pitfall, title) => ({
  definition,
  syntax,
  interview: baseInterview(title, definition, usage, pitfall),
});

export default {
  "queue-deque": T(
    "Queue and Deque are Java collection interfaces for FIFO and double-ended access. ArrayDeque and PriorityQueue are the most common implementations used in algorithms, task scheduling, and BFS-style processing.",
    [
      { label: "ArrayDeque as queue", code: "Queue<String> q = new ArrayDeque<>();\nq.offer(\"first\");\nString head = q.poll();" },
      { label: "PriorityQueue ordering", code: "Queue<Integer> pq = new PriorityQueue<>();\npq.offer(30);\npq.offer(10);\nSystem.out.println(pq.poll()); // 10" },
    ],
    "it models waiting lines, schedulers, and graph traversals cleanly",
    "using LinkedList as a general-purpose queue when ArrayDeque is faster",
    "Queue & Deque",
  ),
  "concurrent-collections": T(
    "Concurrent collections in java.util.concurrent provide thread-safe List, Map, Queue, and Set implementations without locking the entire structure. ConcurrentHashMap and CopyOnWriteArrayList are staples in multi-threaded services.",
    [
      { label: "ConcurrentHashMap", code: "Map<String, Integer> counts = new ConcurrentHashMap<>();\ncounts.merge(\"hits\", 1, Integer::sum);" },
      { label: "CopyOnWriteArrayList", code: "List<String> listeners = new CopyOnWriteArrayList<>();\nlisteners.add(\"audit\");" },
    ],
    "shared mutable state in web servers and worker pools requires safe structures",
    "assuming ConcurrentHashMap makes every compound operation atomic",
    "Concurrent Collections",
  ),
  "generics-erasure": T(
    "Type erasure removes generic type parameters at compile time, replacing them with bounds or Object in bytecode. Bridge methods preserve polymorphism but can surprise developers during reflection or overload resolution.",
    [
      { label: "Generic list erasure", code: "List<String> names = new ArrayList<>();\n// bytecode treats as List" },
      { label: "Bounded type", code: "public <T extends Number> double sum(List<T> items) {\n    return items.stream().mapToDouble(Number::doubleValue).sum();\n}" },
    ],
    "understanding erasure explains ClassCastException and reflection limits",
    "using generics with primitive types or expecting runtime type tokens without reification",
    "Generics Erasure & Bridge Methods",
  ),
  "networking-httpclient": T(
    "Java networking spans java.net sockets and the modern java.net.http.HttpClient introduced in Java 11. HttpClient supports HTTP/2, asynchronous requests, and composable request/response handling.",
    [
      { label: "HttpClient GET", code: "HttpClient client = HttpClient.newHttpClient();\nHttpRequest req = HttpRequest.newBuilder(URI.create(\"https://api.example.com\")).GET().build();\nHttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());" },
      { label: "TCP socket", code: "try (Socket socket = new Socket(\"localhost\", 8080)) {\n    PrintWriter out = new PrintWriter(socket.getOutputStream(), true);\n    out.println(\"ping\");\n}" },
    ],
    "microservices and integrations constantly call remote HTTP and TCP endpoints",
    "blocking the event loop, ignoring timeouts, and leaking sockets without try-with-resources",
    "Networking & HttpClient",
  ),
  "json-jackson": T(
    "JSON is the lingua franca of REST APIs. Jackson (and Gson) map Java objects to JSON and back using annotations, modules, and ObjectMapper configuration for dates, unknown properties, and polymorphic types.",
    [
      { label: "Serialize with Jackson", code: "ObjectMapper mapper = new ObjectMapper();\nString json = mapper.writeValueAsString(new User(\"Ada\", 30));" },
      { label: "Deserialize", code: "User user = mapper.readValue(json, User.class);" },
    ],
    "almost every Spring Boot service serializes DTOs to JSON",
    "failing to configure date formats, unknown fields, or cyclic references",
    "JSON Processing with Jackson",
  ),
  "reflection-api": T(
    "Reflection lets code inspect and invoke classes, methods, and fields at runtime through java.lang.reflect and Class objects. Frameworks like Spring, JUnit, and Hibernate depend on it for dependency injection and mapping.",
    [
      { label: "Inspect methods", code: "for (Method m : MyService.class.getDeclaredMethods()) {\n    System.out.println(m.getName());\n}" },
      { label: "Invoke method", code: "Method m = MyService.class.getMethod(\"run\");\nm.invoke(myServiceInstance);" },
    ],
    "frameworks and test utilities introspect components dynamically",
    "breaking encapsulation, performance overhead, and module access restrictions in JPMS",
    "Reflection API",
  ),
  "mockito-testing": T(
    "Mockito creates test doubles that simulate collaborators so unit tests isolate the class under test. Combined with JUnit 5, it supports stubs, verifications, argument captors, and partial mocks.",
    [
      { label: "Mock and verify", code: "@Test\nvoid cachesResult() {\n    Cache cache = mock(Cache.class);\n    when(cache.get(\"k\")).thenReturn(\"v\");\n    assertEquals(\"v\", cache.get(\"k\"));\n    verify(cache).get(\"k\");\n}" },
      { label: "@Mock injection", code: "@ExtendWith(MockitoExtension.class)\nclass ServiceTest {\n    @Mock Repository repo;\n}" },
    ],
    "professional teams mock databases, HTTP clients, and clocks in unit tests",
    "over-mocking, testing implementation details, or brittle verify counts",
    "Mockito & Test Doubles",
  ),
  "var-keyword": T(
    "Local variable type inference with var lets the compiler infer types from initializers, reducing boilerplate while preserving static typing. It applies to locals, try-with-resources, and for-loop variables when the type is obvious.",
    [
      { label: "var with collections", code: "var users = new ArrayList<User>();" },
      { label: "var in try-with-resources", code: "try (var reader = Files.newBufferedReader(path)) {\n    return reader.readLine();\n}" },
    ],
    "readable code in streams and builders without repeating long generic types",
    "using var when the inferred type is unclear or initializing to null",
    "var & Local Type Inference",
  ),
  "auto-closeable": T(
    "AutoCloseable and try-with-resources guarantee close() runs even when exceptions occur. Any resource implementing AutoCloseable—files, sockets, JDBC connections—should use this pattern instead of manual finally blocks.",
    [
      { label: "try-with-resources", code: "try (Connection conn = dataSource.getConnection();\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.executeUpdate();\n}" },
      { label: "Custom resource", code: "class Temp implements AutoCloseable {\n    public void close() { /* cleanup */ }\n}" },
    ],
    "prevents connection and file descriptor leaks in production",
    "suppressing close exceptions or nesting resources incorrectly",
    "AutoCloseable & try-with-resources",
  ),
  "spi-serviceloader": T(
    "The Service Provider Interface pattern uses ServiceLoader to discover implementations of an interface at runtime from META-INF/services. JDBC drivers, logging bridges, and plugins use this JDK facility.",
    [
      { label: "Service file", code: "// META-INF/services/com.example.Plugin\n// com.example.PluginImpl" },
      { label: "Load providers", code: "ServiceLoader<Plugin> plugins = ServiceLoader.load(Plugin.class);\nfor (Plugin p : plugins) { p.run(); }" },
    ],
    "extensible libraries and JDK pluggability depend on SPI discovery",
    "classpath duplicates, module visibility, and missing provider declarations",
    "SPI & ServiceLoader",
  ),
  "assertions": T(
    "The assert keyword checks invariants during development when assertions are enabled with -ea. It complements exceptions for programmer errors that should never occur in correct code.",
    [
      { label: "assert statement", code: "assert balance >= 0 : \"balance negative: \" + balance;" },
      { label: "Enable assertions", code: "java -ea com.example.Main" },
    ],
    "documents assumptions inside algorithms and internal APIs",
    "using assert for user input validation or leaving assertions enabled blindly in production",
    "Assertions",
  ),
  "initialization-order": T(
    "Java initializes classes in a defined order: static fields and static blocks run once, then instance fields and constructors. Understanding this prevents subtle bugs with inheritance and static singletons.",
    [
      { label: "Static block", code: "class Config {\n    static { loadDefaults(); }\n}" },
      { label: "Constructor chaining", code: "class Employee extends Person {\n    Employee(String name) { super(name); }\n}" },
    ],
    "inheritance and static initialization bugs appear in senior interviews",
    "calling overridable methods from constructors or circular static dependencies",
    "Class Initialization Order",
  ),
  "locks-reentrant": T(
    "java.util.concurrent.locks provides ReentrantLock and ReadWriteLock as flexible alternatives to synchronized. They support tryLock, fairness policies, and separate read/write locking for read-heavy data.",
    [
      { label: "ReentrantLock", code: "Lock lock = new ReentrantLock();\nlock.lock();\ntry { /* critical */ } finally { lock.unlock(); }" },
      { label: "ReadWriteLock", code: "ReadWriteLock rw = new ReentrantReadWriteLock();\nrw.readLock().lock();\ntry { /* read */ } finally { rw.readLock().unlock(); }" },
    ],
    "fine-grained concurrency control in caches and registries",
    "forgetting unlock in finally or holding locks during I/O",
    "ReentrantLock & ReadWriteLock",
  ),
  "synchronizers": T(
    "Synchronizers coordinate threads: CountDownLatch waits for events, CyclicBarrier reunites parties, Semaphore limits permits, and Phaser handles phased tasks. They express coordination patterns beyond intrinsic locks.",
    [
      { label: "CountDownLatch", code: "CountDownLatch latch = new CountDownLatch(3);\n// workers call latch.countDown();\nlatch.await();" },
      { label: "Semaphore", code: "Semaphore permits = new Semaphore(5);\npermits.acquire();\ntry { /* limited work */ } finally { permits.release(); }" },
    ],
    "batch jobs, pool startup, and rate limiting use these primitives",
    "incorrect initial counts, missed countDown, or deadlock with await",
    "Synchronizers (Latch, Barrier, Semaphore)",
  ),
  "atomic-classes": T(
    "AtomicInteger, AtomicReference, and related classes use CAS operations for lock-free updates. They underpin non-blocking algorithms and high-performance counters in concurrent services.",
    [
      { label: "AtomicInteger", code: "AtomicInteger counter = new AtomicInteger();\ncounter.incrementAndGet();" },
      { label: "AtomicReference", code: "AtomicReference<Config> cfg = new AtomicReference<>(Config.defaults());\ncfg.compareAndSet(oldCfg, newCfg);" },
    ],
    "lock-free metrics and lazy initialization in multithreaded apps",
    "ABA problems, compound actions that need synchronization, and false sharing",
    "Atomic Classes & CAS",
  ),
  "blocking-queue": T(
    "BlockingQueue implementations like ArrayBlockingQueue and LinkedBlockingQueue block producers and consumers when the queue is full or empty. They are the backbone of thread pool work queues and producer-consumer pipelines.",
    [
      { label: "Producer-consumer", code: "BlockingQueue<Task> queue = new LinkedBlockingQueue<>(100);\nqueue.put(task);\nTask next = queue.take();" },
      { label: "Executor integration", code: "ThreadPoolExecutor pool = new ThreadPoolExecutor(4, 8, 60, TimeUnit.SECONDS, new ArrayBlockingQueue<>(50));" },
    ],
    "backpressure and worker pools in server applications",
    "unbounded queues causing memory issues or interrupt handling during take",
    "BlockingQueue & Producer-Consumer",
  ),
  "sequenced-collections": T(
    "Java 21 introduced SequencedCollection, SequencedSet, and SequencedMap with uniform first/last access and reversed views. LinkedHashMap, LinkedHashSet, and ArrayList now share consistent sequenced APIs.",
    [
      { label: "SequencedCollection", code: "SequencedCollection<String> seq = new ArrayList<>();\nseq.addFirst(\"head\");\nseq.addLast(\"tail\");" },
      { label: "Reversed view", code: "List<String> reversed = seq.reversed();" },
    ],
    "ordered data structures get predictable APIs without custom helpers",
    "assuming reversed views are modifiable copies when they are live views",
    "Sequenced Collections (Java 21)",
  ),
  "jdbc-transactions": T(
    "JDBC transactions group SQL statements with ACID guarantees using setAutoCommit, commit, and rollback. Understanding isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) prevents dirty reads and phantom rows.",
    [
      { label: "Manual transaction", code: "conn.setAutoCommit(false);\ntry {\n    stmt.executeUpdate(sql);\n    conn.commit();\n} catch (SQLException e) {\n    conn.rollback();\n    throw e;\n}" },
      { label: "Isolation level", code: "conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);" },
    ],
    "financial and inventory systems require correct transactional boundaries",
    "long transactions, connection pool leaks, and wrong isolation for the workload",
    "JDBC Transactions & Isolation",
  ),
  "jpa-hibernate": T(
    "JPA defines object-relational mapping standards; Hibernate is the dominant implementation mapping entities to tables with annotations, EntityManager, and JPQL. Spring Data JPA simplifies repositories on top.",
    [
      { label: "@Entity mapping", code: "@Entity\nclass Order {\n    @Id @GeneratedValue Long id;\n    private String sku;\n}" },
      { label: "Spring Data repository", code: "interface OrderRepo extends JpaRepository<Order, Long> {\n    List<Order> findBySku(String sku);\n}" },
    ],
    "most enterprise Java persists data through JPA rather than raw JDBC",
    "N+1 queries, lazy loading outside sessions, and missing transaction boundaries",
    "JPA & Hibernate Fundamentals",
  ),
  "kafka-messaging": T(
    "Apache Kafka provides durable, partitioned event streams consumed by Java clients through kafka-clients and Spring Kafka. Producers publish records; consumers process them in consumer groups with at-least-once or exactly-once semantics.",
    [
      { label: "Kafka producer", code: "ProducerRecord<String, String> record = new ProducerRecord<>(\"orders\", key, payload);\nproducer.send(record);" },
      { label: "Spring @KafkaListener", code: "@KafkaListener(topics = \"orders\")\nvoid onMessage(String payload) { /* handle */ }" },
    ],
    "event-driven microservices and audit logs rely on Kafka integrations",
    "offset management mistakes, serialization errors, and ignoring idempotency",
    "Kafka & Event Messaging",
  ),
  "grpc-protobuf": T(
    "gRPC uses Protocol Buffers for strongly typed contracts and HTTP/2 transport for efficient RPC between services. Java servers and stubs are generated from .proto files with streaming support.",
    [
      { label: "proto sketch", code: "service UserService {\n  rpc GetUser (UserRequest) returns (UserResponse);\n}" },
      { label: "Java stub call", code: "UserResponse response = stub.getUser(request);" },
    ],
    "polyglot microservices often standardize on gRPC for internal APIs",
    "proto versioning breaks, deadline propagation, and load balancing setup",
    "gRPC & Protocol Buffers",
  ),
  "websockets-java": T(
    "WebSockets provide full-duplex communication over a single TCP connection. Jakarta WebSocket and Spring WebSocket/STOMP enable push notifications, chat, and live dashboards from Java backends.",
    [
      { label: "Jakarta endpoint", code: "@ServerEndpoint(\"/live\")\npublic class LiveSocket {\n    @OnMessage\n    public void onMessage(String msg, Session session) { session.getBasicRemote().sendText(msg); }\n}" },
      { label: "Spring STOMP", code: "@MessageMapping(\"/chat\")\n@SendTo(\"/topic/messages\")\npublic ChatMessage relay(ChatMessage msg) { return msg; }" },
    ],
    "real-time UX requires push channels beyond request-response REST",
    "missing heartbeat, session cleanup, and backpressure on slow clients",
    "WebSockets in Java",
  ),
  "resilience4j": T(
    "Resilience4j implements fault-tolerance patterns—circuit breakers, rate limiters, retries, and bulkheads—for Java and Spring Boot. It prevents cascading failures when dependencies are slow or unavailable.",
    [
      { label: "Circuit breaker", code: "CircuitBreaker cb = CircuitBreaker.ofDefaults(\"payments\");\nSupplier<String> decorated = CircuitBreaker.decorateSupplier(cb, () -> callRemote());" },
      { label: "Spring annotation", code: "@CircuitBreaker(name = \"inventory\")\npublic Stock stock(String sku) { ... }" },
    ],
    "microservices must degrade gracefully when partners fail",
    "retry storms, overly aggressive open states, and missing metrics on breaker events",
    "Resilience4j & Circuit Breakers",
  ),
  "jakarta-servlet": T(
    "Jakarta Servlet is the foundation of Java web containers mapping HTTP requests to servlets and filters. Understanding servlet lifecycle, filter chains, and dispatching clarifies how Spring MVC sits on top of Tomcat or Jetty.",
    [
      { label: "Servlet mapping", code: "@WebServlet(\"/hello\")\npublic class HelloServlet extends HttpServlet {\n    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {\n        resp.getWriter().write(\"ok\");\n    }\n}" },
      { label: "Filter chain", code: "public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {\n    chain.doFilter(req, res);\n}" },
    ],
    "debugging web issues and security filters requires servlet knowledge",
    "blocking threads, session misuse, and ignoring async servlet APIs",
    "Jakarta Servlet & Filter Chain",
  ),
  "jvm-cli-tools": T(
    "JDK command-line tools diagnose live JVMs: jcmd issues commands, jstack captures thread dumps, jmap prints heap histograms, and jstat streams GC stats. They are essential during incidents without attaching a full profiler.",
    [
      { label: "Thread dump", code: "jcmd <pid> Thread.print" },
      { label: "Heap histogram", code: "jcmd <pid> GC.class_histogram" },
    ],
    "on-call engineers triage CPU spikes, deadlocks, and memory pressure with these tools",
    "running destructive commands in production without approval or misreading histograms",
    "JVM CLI Tools (jcmd, jstack, jmap)",
  ),
  "jmx-monitoring": T(
    "Java Management Extensions expose MBeans for memory, threads, GC, and application metrics. Agents and tools like VisualVM, Prometheus JMX exporter, and JDK Mission Control consume JMX to monitor running JVMs.",
    [
      { label: "MBean server", code: "MBeanServer server = ManagementFactory.getPlatformMBeanServer();" },
      { label: "Memory MXBean", code: "MemoryMXBean memory = ManagementFactory.getMemoryMXBean();\nmemory.getHeapMemoryUsage();" },
    ],
    "production observability often starts with JMX before custom metrics",
    "exposing JMX remotely without authentication or overwhelming polling frequency",
    "JMX & Runtime Monitoring",
  ),
  "jlink-runtimes": T(
    "jlink assembles custom modular runtimes containing only required JDK modules, shrinking container images and attack surface. It pairs with jdeps to analyze module dependencies before packaging.",
    [
      { label: "jlink command", code: "jlink --module-path $JAVA_HOME/jmods:mods --add-modules com.myapp --output runtime-image" },
      { label: "jdeps analysis", code: "jdeps --summary myapp.jar" },
    ],
    "cloud deployments benefit from smaller JDK footprints than full images",
    "missing modules at runtime and breaking reflective access without add-opens",
    "jlink & Custom Runtimes",
  ),
  "tls-keystore": T(
    "Java TLS configuration uses KeyStore and TrustStore files, KeyManagerFactory, and SSLContext to terminate HTTPS or mTLS. Production services load certificates from PKCS#12 or JKS stores with rotation procedures.",
    [
      { label: "SSLContext setup", code: "SSLContext ctx = SSLContext.getInstance(\"TLS\");\nctx.init(kmf.getKeyManagers(), tmf.getTrustManagers(), new SecureRandom());" },
      { label: "HttpsURLConnection", code: "HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();" },
    ],
    "every public Java API must configure TLS correctly",
    "trust-all certificates, expired certs, and weak cipher suites",
    "TLS, SSL & KeyStore",
  ),
  "netty-io": T(
    "Netty is an asynchronous event-driven network framework for high-performance protocol servers and clients. It powers many RPC systems and handles TCP backpressure with ChannelPipeline handlers.",
    [
      { label: "Bootstrap server", code: "ServerBootstrap b = new ServerBootstrap();\nb.group(bossGroup, workerGroup)\n .channel(NioServerSocketChannel.class)\n .childHandler(new ChannelInitializer<SocketChannel>() {\n     protected void initChannel(SocketChannel ch) { ch.pipeline().addLast(new MyHandler()); }\n });" },
      { label: "Write flush", code: "ctx.writeAndFlush(Unpooled.copiedBuffer(\"ok\", CharsetUtil.UTF_8));" },
    ],
    "low-latency gateways and custom protocols often choose Netty over blocking servlets",
    "handler ordering bugs, ByteBuf leaks, and missing idle heartbeats",
    "Netty & High-Performance I/O",
  ),
};
