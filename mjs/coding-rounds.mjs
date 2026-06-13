/**
 * Per-topic coding round questions — diverse machine-round styles, not generic "What prints?".
 * Types: implement, bug-hunt, trace, compile-fix, design/LLD, refactor, test, API/security.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { puzzle, L } from './puzzles.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const langData = JSON.parse(readFileSync(join(__dirname, '../data/languages.json'), 'utf8'));

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function allTopics() {
  const topics = [];
  const java = langData.languages.find((l) => l.id === 'java');
  for (const sec of java.sections) {
    for (const g of sec.groups) {
      for (const t of g.topics) topics.push(t);
    }
  }
  return topics;
}

function primaryTag(topic) {
  const order = [
    'framework', 'database', 'concurrency', 'collections', 'oop', 'functional',
    'web', 'jvm', 'architecture', 'security', 'testing', 'devops', 'modern',
    'generics', 'io', 'syntax', 'error-handling', 'performance', 'cloud',
    'reactive', 'messaging', 'api', 'tools', 'debugging', 'best-practices',
    'professional', 'overview', 'setup',
  ];
  const tags = topic.tags || [];
  return order.find((t) => tags.includes(t)) || tags[0] || 'syntax';
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function normalizeLines(lines) {
  return lines.map((item, i) => ({ n: i + 1, code: item.code, text: item.text }));
}

/** Hand-crafted overrides — highest quality rounds */
const OVERRIDES = {
  'inheritance': [
    puzzle(
      'Implement: method overriding check',
      'Machine round — complete `describe` so it returns whether Child overrides Parent.speak().',
      `class Parent { void speak() {} }
class Child extends Parent {
    @Override void speak() {}
}
// Complete this utility:
boolean overridesSpeak(Class<?> child) {
    // TODO: use getDeclaredMethod / getMethod
    return false;
}`,
      'Use child.getMethod("speak").getDeclaringClass() != Parent.class → true for Child',
      normalizeLines([
        L('class Parent { void speak() {} }', 'Base method — not overridden in Parent itself.'),
        L('class Child extends Parent {', 'Subtype relationship established.'),
        L('@Override void speak() {}', 'Child provides its own speak implementation.'),
        L('boolean overridesSpeak(Class<?> child) {', 'Reflection compares declaring class of speak on Child.'),
        L('    return false; // TODO', 'Correct: Child.class.getMethod("speak").getDeclaringClass() == Child.class.'),
      ]),
    ),
    puzzle(
      'Bug hunt: field hiding vs override',
      'This compiles but surprises candidates — explain the printed value.',
      `class Parent { int x = 10; }
class Child extends Parent { int x = 20; }
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x);
    }
}`,
      '10 — field access uses reference type (Parent), not runtime type',
      normalizeLines([
        L('Parent p = new Child();', 'Dynamic type Child, static type Parent for field lookup.'),
        L('System.out.println(p.x);', 'Fields are not polymorphic — Parent.x is 10.'),
      ]),
    ),
    puzzle(
      'Design: extend a shape hierarchy',
      'LLD snippet — add `Circle` without breaking Liskov. What must `area()` return?',
      `abstract class Shape {
    abstract double area();
}
class Rectangle extends Shape {
    double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    double area() { return w * h; }
}
// TODO: class Circle extends Shape { ... }`,
      'Circle.area() = Math.PI * r * r; constructor must call super()',
      normalizeLines([
        L('abstract class Shape', 'Common abstraction — open for extension.'),
        L('class Rectangle extends Shape', 'Concrete subtype implements area.'),
        L('// TODO: class Circle', 'Add radius field; area uses πr²; no narrowing preconditions.'),
      ]),
    ),
    puzzle(
      'Refactor: extract super call',
      'Fix constructor so parent initialization always runs.',
      `class Animal {
    Animal(String name) { this.name = name; }
    String name;
}
class Dog extends Animal {
    Dog() { } // BUG
}`,
      'Add Dog() { super("unknown"); } — implicit super() only works if Parent has no-arg ctor',
      normalizeLines([
        L('class Dog extends Animal {', 'Compiler error: no default constructor in Animal.'),
        L('    Dog() { }', 'Must explicitly call super(...) matching Animal(String).'),
      ]),
    ),
  ],

  'collections': [
    puzzle(
      'Implement: first non-repeating character',
      'Classic machine round — complete the method using a Map.',
      `import java.util.*;
public class FirstUnique {
    public static Character firstNonRepeating(String s) {
        // TODO: count frequencies, second pass find first count==1
        return null;
    }
    public static void main(String[] args) {
        System.out.println(firstNonRepeating("aabbcde"));
    }
}`,
      'c',
      normalizeLines([
        L('Map<Character,Integer> freq = new LinkedHashMap<>();', 'LinkedHashMap preserves insertion order for second pass.'),
        L('for (char c : s.toCharArray()) freq.merge(c, 1, Integer::sum);', 'Count occurrences.'),
        L('return freq.entrySet().stream()...findFirst char with value 1', 'First unique in iteration order → c.'),
      ]),
    ),
    puzzle(
      'Bug hunt: ConcurrentModificationException',
      'Find why this fails at runtime.',
      `List<String> items = new ArrayList<>(List.of("a", "b", "c"));
for (String x : items) {
    if (x.equals("b")) items.remove(x);
}`,
      'ConcurrentModificationException — cannot structurally modify list during enhanced for',
      normalizeLines([
        L('for (String x : items)', 'Iterator tracks expected modCount.'),
        L('items.remove(x)', 'Direct remove invalidates iterator → CME.'),
        L('// Fix: items.removeIf(s -> s.equals("b"));', 'Or use Iterator.remove().'),
      ]),
    ),
    puzzle(
      'Choose structure: LRU cache',
      'Which JDK type gives O(1) get/put with access-order eviction?',
      `// Need: max 100 entries, evict least recently used
// Option A: HashMap
// Option B: LinkedHashMap(accessOrder=true) + removeEldestEntry
// Option C: TreeMap`,
      'LinkedHashMap with removeEldestEntry override (or Caffeine in production)',
      normalizeLines([
        L('HashMap', 'No ordering — cannot know LRU.'),
        L('LinkedHashMap(true)', 'Access-order linked list + hash buckets.'),
        L('removeEldestEntry', 'Override to remove oldest when size > 100.'),
      ]),
    ),
    puzzle(
      'Implement: group by frequency',
      'Complete stream collector logic mentally — what map for "aabbc"?',
      `import java.util.*;
import java.util.stream.*;
String s = "aabbc";
Map<Character, Long> freq = s.chars()
    .mapToObj(c -> (char) c)
    .collect(Collectors.groupingBy(c -> c, Collectors.counting()));
System.out.println(freq.get('a'));`,
      '2',
      normalizeLines([
        L('groupingBy(c -> c, counting())', 'Produces {a=2, b=2, c=1}.'),
        L('freq.get(\'a\')', 'Returns 2.'),
      ]),
    ),
  ],

  'stream-api': [
    puzzle(
      'Implement: top N salaries',
      'Complete the stream pipeline.',
      `import java.util.*;
import java.util.stream.*;
record Emp(String name, int salary) {}
List<Emp> team = List.of(new Emp("A", 90), new Emp("B", 120), new Emp("C", 110));
List<String> top2 = team.stream()
    // TODO: sort by salary desc, limit 2, map name
    .toList();
System.out.println(top2);`,
      '[B, C]',
      normalizeLines([
        L('.sorted(Comparator.comparingInt(Emp::salary).reversed())', 'Highest salaries first.'),
        L('.limit(2)', 'Take two.'),
        L('.map(Emp::name).toList()', 'Names B and C.'),
      ]),
    ),
    puzzle(
      'Bug hunt: primitive stream boxed',
      'Why might this be inefficient in hot loops?',
      `IntStream.range(0, 1_000_000)
    .boxed()
    .mapToInt(i -> i * 2)
    .sum();`,
      'Unnecessary boxing/unboxing — use .map(i -> i * 2) on IntStream directly',
      normalizeLines([
        L('.boxed()', 'Creates 1M Integer objects on heap.'),
        L('.mapToInt', 'Unboxes immediately — wasted allocation.'),
      ]),
    ),
    puzzle(
      'Trace: lazy intermediate ops',
      'When does filter actually run?',
      `List<Integer> data = List.of(1, 2, 3);
Stream<Integer> s = data.stream().filter(n -> { System.out.print(n); return n > 1; });
System.out.print("|");
long c = s.count();`,
      'Prints 1| then 23 during terminal count — intermediates are lazy',
      normalizeLines([
        L('Stream s = ...filter...', 'Pipeline built, no execution yet.'),
        L('System.out.print("|");', 'Prints | before terminal op.'),
        L('s.count()', 'Now filter runs — prints each element as evaluated.'),
      ]),
    ),
    puzzle(
      'Design: pipeline for report',
      'Sketch stream stages: read CSV lines → parse → filter active → group by dept → sum salary.',
      `// stages:
// 1. Files.lines(path)
// 2. map(CsvParser::parse)
// 3. filter(Emp::active)
// 4. collect(groupingBy(Emp::dept, summingInt(Emp::salary)))`,
      'Map<String,Integer> deptTotals — single sequential pipeline, consider parallel only for huge files',
      normalizeLines([
        L('Files.lines', 'Stream of lines — remember close stream (try-with-resources).'),
        L('groupingBy + summingInt', 'Downstream collector aggregates per department.'),
      ]),
    ),
  ],

  'spring-boot': [
    puzzle(
      'Implement: REST controller method',
      'Complete the endpoint returning 201 Created with Location header.',
      `@RestController
@RequestMapping("/orders")
class OrderApi {
    private final OrderService service;
    OrderApi(OrderService service) { this.service = service; }

    @PostMapping
    ResponseEntity<Order> create(@RequestBody @Valid CreateOrderRequest req) {
        // TODO: save, return 201 + Location
    }
}`,
      'Order o = service.create(req); return ResponseEntity.created(URI.create("/orders/"+o.id())).body(o);',
      normalizeLines([
        L('@PostMapping', 'HTTP POST /orders — body deserialized to CreateOrderRequest.'),
        L('@Valid', 'Triggers Bean Validation on request DTO.'),
        L('ResponseEntity.created(uri)', 'Sets 201 status and Location header.'),
      ]),
    ),
    puzzle(
      'Bug hunt: missing @Transactional',
      'Service saves Order + Payment but partial commit on failure — fix?',
      `@Service
class CheckoutService {
    void checkout(Order o) {
        orderRepo.save(o);
        paymentRepo.charge(o); // may throw
    }
}`,
      'Add @Transactional on checkout — rolls back order if payment fails',
      normalizeLines([
        L('orderRepo.save(o)', 'Without transaction, may persist before charge.'),
        L('paymentRepo.charge(o)', 'Exception leaves orphan order row.'),
        L('@Transactional', 'Both operations share one DB transaction.'),
      ]),
    ),
    puzzle(
      'Design: layered architecture',
      'Name three layers and what belongs in each for a User signup feature.',
      `// Controller: HTTP, validation, DTO mapping
// Service: business rules, transaction boundary
// Repository: JPA/ JDBC persistence`,
      'Controller never calls repository directly — keeps web concerns separate',
      normalizeLines([
        L('Controller layer', 'Maps JSON ↔ DTO, returns ResponseEntity.'),
        L('Service layer', 'Password hashing, duplicate email check.'),
        L('Repository layer', 'save(User entity).'),
      ]),
    ),
    puzzle(
      'Test: @WebMvcTest slice',
      'What does @WebMvcTest load vs full @SpringBootTest?',
      `@WebMvcTest(OrderApi.class)
class OrderApiTest {
    @Autowired MockMvc mvc;
    @MockBean OrderService orders;
}`,
      'Loads web layer + OrderApi only; mocks OrderService — fast, no full context',
      normalizeLines([
        L('@WebMvcTest', 'Slices MVC — no DataSource unless @Import added.'),
        L('@MockBean OrderService', 'Replaces real bean in test context.'),
        L('MockMvc', 'Simulates HTTP without starting embedded server on random port.'),
      ]),
    ),
  ],

  'exception-handling': [
    puzzle(
      'Implement: try-with-resources',
      'Complete safe file read — one line missing.',
      `import java.nio.file.*;
public class ReadSafe {
    static String read(String path) throws Exception {
        try (var lines = Files.lines(Path.of(path))) {
            return lines.findFirst().orElse("");
        }
    }
}`,
      'Stream from Files.lines must be closed — try-with-resources handles it',
      normalizeLines([
        L('try (var lines = Files.lines(...))', 'AutoCloseable closes stream even on exception.'),
        L('findFirst().orElse("")', 'Returns first line or empty string.'),
      ]),
    ),
    puzzle(
      'Bug hunt: swallowed exception',
      'Why is debugging hard here?',
      `try {
    process();
} catch (Exception e) {
    // TODO: log
}`,
      'Empty catch hides failures — at minimum log and rethrow or wrap',
      normalizeLines([
        L('catch (Exception e) { }', 'Silent failure — callers think success.'),
        L('// Fix: log.error("...", e); throw new ServiceException(e);', 'Preserve stack trace.'),
      ]),
    ),
    puzzle(
      'Trace: finally vs return',
      'Execution order?',
      `int f() {
    try { return 1; }
    finally { System.out.print("F"); }
}`,
      'Prints F, still returns 1 — finally runs before return completes',
      normalizeLines([
        L('return 1 in try', 'Return value 1 prepared.'),
        L('finally prints F', 'Runs before method actually returns.'),
      ]),
    ),
    puzzle(
      'Design: exception hierarchy',
      'When to use checked vs unchecked for a payment API?',
      `// CardDeclinedException extends Exception (checked)
// vs extends RuntimeException (unchecked)`,
      'Unchecked for business flow (declined card); checked for unrecoverable infra errors',
      normalizeLines([
        L('Checked', 'Forces callers to handle — clutters REST controllers.'),
        L('RuntimeException + @ControllerAdvice', 'Map to HTTP 402/400 with body.'),
      ]),
    ),
  ],

  'concurrency-basics': [
    puzzle(
      'Implement: thread-safe counter',
      'Complete increment using AtomicInteger.',
      `import java.util.concurrent.atomic.*;
class Metrics {
    private final AtomicInteger count = new AtomicInteger();
    void hit() {
        // TODO
    }
    int get() { return count.get(); }
}`,
      'count.incrementAndGet(); or count.addAndGet(1);',
      normalizeLines([
        L('AtomicInteger', 'Lock-free CAS on single variable.'),
        L('incrementAndGet()', 'Atomic read-modify-write — safe across threads.'),
      ]),
    ),
    puzzle(
      'Bug hunt: double-checked locking (broken)',
      'Classic interview trap — what is wrong pre-Java 5 memory model fix?',
      `class Singleton {
    private static Singleton instance;
    static Singleton get() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) instance = new Singleton();
            }
        }
        return instance;
    }
}`,
      'Without volatile on instance, another thread may see partially constructed object',
      normalizeLines([
        L('if (instance == null)', 'Outer check avoids lock after init.'),
        L('instance = new Singleton()', 'Not atomic — assign reference before ctor finishes.'),
        L('private static volatile Singleton instance', 'volatile publishes fully constructed object.'),
      ]),
    ),
    puzzle(
      'Trace: happens-before',
      'Does thread B always see x=1?',
      `int x = 0;
Thread t1 = new Thread(() -> { x = 1; });
Thread t2 = new Thread(() -> { System.out.println(x); });
t1.start(); t2.start();`,
      'No guarantee without synchronization — may print 0',
      normalizeLines([
        L('x = 1 in t1', 'No happens-before edge to t2 read.'),
        L('println(x) in t2', 'Data race — undefined behavior for non-volatile int.'),
      ]),
    ),
    puzzle(
      'Fix: executor shutdown',
      'Complete graceful shutdown pattern.',
      `ExecutorService pool = Executors.newFixedThreadPool(4);
// submit tasks...
// TODO: shutdown gracefully`,
      'pool.shutdown(); pool.awaitTermination(30, SECONDS); pool.shutdownNow() if timeout',
      normalizeLines([
        L('shutdown()', 'No new tasks accepted.'),
        L('awaitTermination', 'Waits for running tasks to finish.'),
        L('shutdownNow()', 'Cancel pending, interrupt workers.'),
      ]),
    ),
  ],

  'junit-basics': [
    puzzle(
      'Implement: parameterized test',
      'Complete @CsvSource test for isEven.',
      `import org.junit.jupiter.params.*;
import org.junit.jupiter.params.provider.*;
class MathTest {
    @ParameterizedTest
    @CsvSource({"2,true", "3,false"})
    void isEven(int n, boolean expected) {
        // assertEquals(expected, MathUtils.isEven(n));
    }
}`,
      'One test method runs twice with different inputs — reduces duplication',
      normalizeLines([
        L('@ParameterizedTest', 'JUnit 5 repeated execution.'),
        L('@CsvSource', 'Inline data sets — good for small cases.'),
      ]),
    ),
    puzzle(
      'Bug hunt: test order dependency',
      'Why is this bad?',
      `@Test void createUser() { repo.save(user); }
@Test void deleteUser() { repo.delete(user); }`,
      'Tests must be independent — order not guaranteed; use @BeforeEach setup',
      normalizeLines([
        L('createUser saves', 'Leaves state for next test.'),
        L('deleteUser assumes exists', 'Fails if run alone or order changes.'),
      ]),
    ),
    puzzle(
      'Write: assertThrows',
      'Complete test expecting IllegalArgumentException.',
      `@Test
void rejectsNegative() {
    // assertThrows(IllegalArgumentException.class, () -> service.deposit(-1));
}`,
      'assertThrows verifies exception type and that lambda executes',
      normalizeLines([
        L('assertThrows', 'JUnit 5 API — returns thrown exception for further asserts.'),
      ]),
    ),
    puzzle(
      'Design: test pyramid for service',
      'What three test types for OrderService?',
      `// Unit: mock repository, test business rules
// Integration: @DataJpaTest with real H2
// E2E: @SpringBootTest + MockMvc`,
      'Most tests unit (fast); few integration; minimal E2E',
      normalizeLines([
        L('Unit tests', 'Majority — milliseconds each.'),
        L('Integration', 'Repository + DB schema validation.'),
      ]),
    ),
  ],

  'polymorphism': [
    puzzle(
      'Implement: runtime dispatch',
      'Complete `printSpeak` so it calls the overridden method on the runtime type.',
      `interface Speaker { String speak(); }
class Cat implements Speaker { public String speak() { return "meow"; } }
class Dog implements Speaker { public String speak() { return "bark"; } }
void printSpeak(Speaker s) {
    // TODO: one line — which method runs?
    System.out.println(???);
}`,
      'System.out.println(s.speak()); — virtual method dispatch uses runtime type (Dog/Cat)',
      normalizeLines([
        L('Speaker s', 'Reference type is interface; runtime type is Cat or Dog.'),
        L('s.speak()', 'JVM looks up actual class vtable — polymorphic call.'),
      ]),
    ),
    puzzle(
      'Bug hunt: overload vs override',
      'Why does this print "Parent" not "Child"?',
      `class Parent { void show(Parent p) { System.out.println("Parent"); } }
class Child extends Parent {
    void show(Child c) { System.out.println("Child"); }
}
public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.show(new Child());
    }
}`,
      'Parent — overload resolution uses compile-time type (Parent); show(Child) is not an override of show(Parent)',
      normalizeLines([
        L('p.show(new Child())', 'Argument is Child but reference p is Parent.'),
        L('show(Parent p) vs show(Child c)', 'Different signatures = overload, not override.'),
      ]),
    ),
    puzzle(
      'Design: payment strategy',
      'LLD — add UPI without changing CheckoutService callers.',
      `interface PaymentStrategy { void pay(BigDecimal amount); }
class CheckoutService {
    private final PaymentStrategy strategy;
    void checkout(Order o) { strategy.pay(o.total()); }
}`,
      'Strategy pattern: inject new UPIPayment implements PaymentStrategy; constructor injection',
      normalizeLines([
        L('PaymentStrategy', 'Abstraction — open/closed principle.'),
        L('CheckoutService depends on interface', 'Polymorphism at wiring time (Spring @Bean).'),
      ]),
    ),
    puzzle(
      'Refactor: instanceof chain to polymorphism',
      'Replace switch on type with polymorphic design.',
      `double area(Object shape) {
    if (shape instanceof Circle c) return Math.PI * c.r() * c.r();
    if (shape instanceof Square s) return s.side() * s.side();
    throw new IllegalArgumentException();
}`,
      'interface Shape { double area(); } — Circle/Square implement; caller uses Shape',
      normalizeLines([
        L('instanceof chain', 'Grows with every new shape — violates OCP.'),
        L('Shape.area()', 'Each class owns its formula — classic polymorphism.'),
      ]),
    ),
  ],

  'arrays': [
    puzzle(
      'Implement: two-sum indices',
      'Return indices of two numbers that add to target (one solution exists).',
      `int[] twoSum(int[] nums, int target) {
    Map<Integer,Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        // TODO: complement lookup or store nums[i] -> i
    }
    return new int[]{};
}`,
      'if (seen.containsKey(target - nums[i])) return new int[]{seen.get(...), i}; else seen.put(nums[i], i)',
      normalizeLines([
        L('HashMap complement', 'O(n) — classic FAANG warm-up.'),
        L('store index not value', 'Return original positions.'),
      ]),
    ),
    puzzle(
      'Bug hunt: off-by-one in binary search',
      'Find the bug.',
      `int binarySearch(int[] a, int key) {
    int lo = 0, hi = a.length;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] < key) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}`,
      'hi = a.length is wrong for inclusive upper bound — use a.length - 1 OR keep half-open consistently',
      normalizeLines([
        L('hi = a.length', 'With lo < hi half-open, OK; with inclusive hi must be length-1.'),
        L('mid overflow', 'Bonus: use lo + (hi-lo)/2 on large arrays.'),
      ]),
    ),
    puzzle(
      'Implement: kadane max subarray',
      'Complete O(n) maximum contiguous sum.',
      `int maxSubArray(int[] nums) {
    int best = nums[0], cur = nums[0];
    for (int i = 1; i < nums.length; i++) {
        // TODO: extend or restart at nums[i]
    }
    return best;
}`,
      'cur = Math.max(nums[i], cur + nums[i]); best = Math.max(best, cur);',
      normalizeLines([
        L('cur + nums[i] vs nums[i]', 'Drop negative prefix — Kadane.'),
        L('best tracks global max', 'Single pass O(n).'),
      ]),
    ),
    puzzle(
      'Trace: array reference vs copy',
      'Step through — what is printed for a[0] after mutating b?',
      `int[] a = {1,2,3};
int[] b = a;
b[0] = 9;
System.out.println(a[0]);`,
      '9 — b and a reference same array object',
      normalizeLines([
        L('b = a', 'Copies reference, not elements.'),
        L('b[0] = 9', 'Mutates shared heap array.'),
      ]),
    ),
  ],

  'strings': [
    puzzle(
      'Implement: valid anagram',
      'Complete without sorting (O(n) char counts).',
      `boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] freq = new int[26];
    for (int i = 0; i < s.length(); i++) {
        // TODO: freq[s.charAt(i)-\'a\']++ and t--
    }
    return true;
}`,
      'Increment for s, decrement for t; check all freq[i]==0',
      normalizeLines([
        L('freq array', 'Assumes lowercase a-z — clarify in interview.'),
        L('O(n) time O(1) space', '26 slots constant.'),
      ]),
    ),
    puzzle(
      'Bug hunt: String == comparison',
      'Why does this fail?',
      `String a = new String("java");
String b = "java";
System.out.println(a == b);`,
      'false — == compares references; use a.equals(b)',
      normalizeLines([
        L('new String("java")', 'Heap object outside string pool.'),
        L('"java" literal', 'Pooled — different reference from a.'),
      ]),
    ),
    puzzle(
      'Implement: reverse words in sentence',
      'Reverse word order, preserve single spaces between words.',
      `String reverseWords(String s) {
    String[] parts = s.trim().split("\\s+");
    // TODO: reverse parts array, join with space
    return "";
}`,
      'Collections.reverse(Arrays.asList(parts)); return String.join(" ", parts);',
      normalizeLines([
        L('trim + split', 'Handles leading/trailing spaces.'),
        L('String.join', 'Cleaner than manual StringBuilder loop.'),
      ]),
    ),
    puzzle(
      'Refactor: StringBuilder in loop',
      'Fix performance anti-pattern.',
      `String result = "";
for (String w : words) result += w;`,
      'String is immutable — each += allocates new String; use StringBuilder append',
      normalizeLines([
        L('result += w', 'O(n²) copies for n words.'),
        L('StringBuilder', 'Amortized O(n) append.'),
      ]),
    ),
  ],

  'methods': [
    puzzle(
      'Implement: binary search recursive',
      'Complete recursive search on sorted array.',
      `int search(int[] a, int key, int lo, int hi) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (a[mid] == key) return mid;
    // TODO: left or right half
    return -1;
}`,
      'if (key < a[mid]) return search(a,key,lo,mid-1); else return search(a,key,mid+1,hi);',
      normalizeLines([
        L('base case lo > hi', 'Empty range — not found.'),
        L('mid partition', 'Classic divide and conquer.'),
      ]),
    ),
    puzzle(
      'Bug hunt: pass-by-value',
      'Why does swap not work?',
      `static void swap(int a, int b) {
    int tmp = a; a = b; b = tmp;
}
public static void main(String[] args) {
    int x = 1, y = 2;
    swap(x, y);
    System.out.println(x + " " + y);
}`,
      '1 2 — Java passes int copies; reassigning a,b does not affect x,y',
      normalizeLines([
        L('swap(int a, int b)', 'Parameters are copies of x and y.'),
        L('Need int[] or holder', 'Or return new pair — no true pass-by-reference for primitives.'),
      ]),
    ),
    puzzle(
      'Design: method overload resolution',
      'Which method is called?',
      `void print(Number n) { System.out.println("Number"); }
void print(Integer n) { System.out.println("Integer"); }
void print(Object n) { System.out.println("Object"); }
// call: print(null);`,
      'Ambiguous — both Integer and Object match null; compile error without cast',
      normalizeLines([
        L('null matches reference types', 'Most specific applicable method wins when unambiguous.'),
        L('print((Integer)null)', 'Cast fixes ambiguity.'),
      ]),
    ),
    puzzle(
      'Implement: varargs sum',
      'Complete safe sum with overflow check optional.',
      `static long sum(int... values) {
    long total = 0;
    for (int v : values) {
        // TODO
    }
    return total;
}`,
      'total += v; use long to reduce overflow vs int accumulator',
      normalizeLines([
        L('int... values', 'Treated as int[] inside method.'),
        L('long total', 'Wider accumulator for many ints.'),
      ]),
    ),
  ],

  'lambda-expressions': [
    puzzle(
      'Implement: Comparator with lambda',
      'Sort employees by salary descending, then name ascending.',
      `record Employee(String name, int salary) {}
List<Employee> team = new ArrayList<>();
// TODO: team.sort(???);`,
      'team.sort(Comparator.comparingInt(Employee::salary).reversed().thenComparing(Employee::name));',
      normalizeLines([
        L('comparingInt + reversed', 'Primary sort key descending.'),
        L('thenComparing', 'Stable tie-break by name.'),
      ]),
    ),
    puzzle(
      'Bug hunt: effectively final capture',
      'Why compile error?',
      `int factor = 2;
factor = 3;
Runnable r = () -> System.out.println(factor);`,
      'factor reassigned — not effectively final; lambda cannot capture',
      normalizeLines([
        L('factor = 3', 'Mutation after lambda would observe changing value — forbidden.'),
        L('final int factor = 2', 'Or use separate final copy.'),
      ]),
    ),
    puzzle(
      'Refactor: anonymous class to lambda',
      'Replace Runnable anonymous class.',
      `new Thread(new Runnable() {
    public void run() { System.out.println("hi"); }
}).start();`,
      'new Thread(() -> System.out.println("hi")).start();',
      normalizeLines([
        L('Single abstract method', 'Runnable qualifies for lambda.'),
        L('() ->', 'Parameter list omitted when none.'),
      ]),
    ),
    puzzle(
      'Trace: lazy lambda in stream',
      'How many times is length() called?',
      `List<String> xs = List.of("a", "bb", "ccc");
long n = xs.stream().filter(s -> { System.out.print("f"); return s.length() > 1; }).count();`,
      'Prints fff once each — terminal count() drives full pipeline; short-circuit not used',
      normalizeLines([
        L('filter side effect', 'Shows each element visited.'),
        L('count()', 'Terminal op — must process entire stream.'),
      ]),
    ),
  ],

  'optional': [
    puzzle(
      'Implement: chain Optional',
      'Return uppercased city or "UNKNOWN" without nested ifs.',
      `Optional<String> city(User u) {
    return Optional.ofNullable(u)
        // TODO: map getAddress, map getCity, map String::toUpperCase
        ;
}
String label(User u) {
    return city(u).orElse("UNKNOWN");
}`,
      '.map(User::getAddress).map(Address::getCity).map(String::toUpperCase)',
      normalizeLines([
        L('ofNullable', 'Safe entry when u or fields null.'),
        L('map chain', 'Any empty step yields empty Optional.'),
      ]),
    ),
    puzzle(
      'Bug hunt: Optional.get()',
      'What happens at runtime?',
      `Optional<String> o = Optional.empty();
System.out.println(o.get());`,
      'NoSuchElementException — use orElse/orElseThrow/ifPresent',
      normalizeLines([
        L('Optional.empty()', 'No value present.'),
        L('get() without isPresent', 'Anti-pattern since Java 10+ — prefer functional API.'),
      ]),
    ),
    puzzle(
      'Refactor: null checks to Optional',
      'Improve API returning absent profile.',
      `Profile find(String id) {
    if (id == null) return null;
    Profile p = repo.find(id);
    if (p == null) return null;
    return p;
}`,
      'return Optional.ofNullable(id).flatMap(repo::find); — caller forced to handle empty',
      normalizeLines([
        L('return null', 'Callers forget checks — NPE risk.'),
        L('Optional<Profile>', 'Explicit absence in type system.'),
      ]),
    ),
    puzzle(
      'Design: Optional as field',
      'Should entity have Optional<String> middleName?',
      `class Person {
    Optional<String> middleName; // good or bad?
}`,
      'Bad for fields/JSON — use null internally; Optional only for return types',
      normalizeLines([
        L('Optional not Serializable-friendly', 'Jackson/Hibernate awkward.'),
        L('Return type only', 'Joshua Bloch / API design consensus.'),
      ]),
    ),
  ],

  'map-set-internals': [
    puzzle(
      'Implement: LRU cache (LinkedHashMap)',
      'Complete access-order cache with max size 3.',
      `Map<Integer,Integer> cache = new LinkedHashMap<>(16, 0.75f, true) {
    protected boolean removeEldestEntry(Map.Entry<Integer,Integer> e) {
        // TODO
    }
};`,
      'return size() > 3; — eldest evicted after put when over capacity',
      normalizeLines([
        L('accessOrder true', 'get/put moves entry to tail.'),
        L('removeEldestEntry', 'Called after insertion — classic LRU hook.'),
      ]),
    ),
    puzzle(
      'Bug hunt: mutable key in HashMap',
      'Why might get return null after put?',
      `class Key { int id; Key(int id){this.id=id;} }
Map<Key,String> m = new HashMap<>();
Key k = new Key(1);
m.put(k, "A");
k.id = 2;
System.out.println(m.get(k));`,
      'null — hash bucket computed at put; mutating key changes hashCode',
      normalizeLines([
        L('Key without equals/hashCode', 'Uses identity hash — still breaks if hashCode uses id.'),
        L('Immutable keys', 'String/Integer safe; custom keys must be immutable.'),
      ]),
    ),
    puzzle(
      'Implement: top K frequent elements',
      'Use HashMap count + min-heap of size k.',
      `int[] topKFrequent(int[] nums, int k) {
    Map<Integer,Integer> freq = new HashMap<>();
    for (int n : nums) freq.merge(n, 1, Integer::sum);
    // TODO: PriorityQueue by frequency, keep size k
}`,
      'Min-heap on frequency; poll when size>k; extract keys',
      normalizeLines([
        L('freq.merge', 'Count occurrences O(n).'),
        L('PriorityQueue size k', 'O(n log k) — common follow-up.'),
      ]),
    ),
    puzzle(
      'Trace: HashSet add duplicate',
      'What is set.size() after?',
      `Set<String> set = new HashSet<>();
set.add(new String("hi"));
set.add(new String("hi"));
System.out.println(set.size());`,
      '1 — equals/hashCode match; second add returns false',
      normalizeLines([
        L('new String each time', 'Different references, same content.'),
        L('equals/hashCode contract', 'Set deduplicates by value.'),
      ]),
    ),
  ],

  'jdbc': [
    puzzle(
      'Implement: PreparedStatement query',
      'Complete safe parameterized lookup by email.',
      `String sql = "SELECT id, name FROM users WHERE email = ?";
try (PreparedStatement ps = conn.prepareStatement(sql)) {
    // TODO: setString(1, email); executeQuery; map ResultSet
}`,
      'ps.setString(1, email); try (ResultSet rs = ps.executeQuery()) { while(rs.next()) {...} }',
      normalizeLines([
        L('? placeholder', 'Binds user input — prevents SQL injection.'),
        L('try-with-resources', 'Close rs and ps automatically.'),
      ]),
    ),
    puzzle(
      'Bug hunt: connection leak',
      'What is wrong?',
      `Connection conn = dataSource.getConnection();
PreparedStatement ps = conn.prepareStatement(sql);
ResultSet rs = ps.executeQuery();
// process rs — no close in finally`,
      'Leak — always try-with-resources on Connection/Statement/ResultSet',
      normalizeLines([
        L('getConnection without close', 'Pool exhausts under load.'),
        L('try (Connection c = ...)', 'Closes even on exception.'),
      ]),
    ),
    puzzle(
      'Design: transaction rollback',
      'Outline steps for transfer between accounts.',
      `conn.setAutoCommit(false);
try {
    debit(from, amount);
    credit(to, amount);
    conn.commit();
} catch (SQLException e) {
    conn.rollback();
    throw e;
}`,
      'setAutoCommit false; both DML in same connection; rollback on any failure; restore autoCommit in finally',
      normalizeLines([
        L('commit', 'Atomic unit — both or neither.'),
        L('rollback in catch', 'Recover consistent state.'),
      ]),
    ),
    puzzle(
      'Implement: batch insert',
      'Complete addBatch / executeBatch for 1000 rows.',
      `PreparedStatement ps = conn.prepareStatement(
    "INSERT INTO log(msg) VALUES (?)");
for (String msg : messages) {
    // TODO
}
ps.executeBatch();`,
      'ps.setString(1, msg); ps.addBatch(); — single round-trip for batch',
      normalizeLines([
        L('addBatch', 'Buffers statements client-side.'),
        L('executeBatch', 'Returns update counts array.'),
      ]),
    ),
  ],

  'rest-apis': [
    puzzle(
      'Implement: REST controller',
      'GET /users/{id} returns 404 when missing, 200 with JSON body.',
      `@GetMapping("/users/{id}")
ResponseEntity<UserDto> get(@PathVariable Long id) {
    return userService.find(id)
        // TODO: map to ResponseEntity
        ;
}`,
      '.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());',
      normalizeLines([
        L('@PathVariable', 'Binds URI segment to Long id.'),
        L('ResponseEntity.notFound', '404 without exception for expected miss.'),
      ]),
    ),
    puzzle(
      'Bug hunt: wrong HTTP status on create',
      'What should POST /users return on success?',
      `@PostMapping("/users")
User create(@RequestBody User u) {
    return repo.save(u); // returns 200 by default
}`,
      '201 Created + Location header — use ResponseEntity.created(uri).body(saved)',
      normalizeLines([
        L('200 on create', 'Common mistake — REST convention is 201.'),
        L('Location: /users/{id}', 'Client discovers new resource URI.'),
      ]),
    ),
    puzzle(
      'Design: idempotent PUT vs PATCH',
      'Client updates only user email — which verb and why?',
      `// Full User JSON vs {"email":"new@x.com"}`,
      'PATCH partial with merge semantics, or PUT requires full representation — document contract',
      normalizeLines([
        L('PATCH', 'Partial update — only changed fields.'),
        L('PUT', 'Replace entire resource — omitting fields may null them.'),
      ]),
    ),
    puzzle(
      'Security: validate @RequestBody',
      'Complete validation for signup endpoint.',
      `@PostMapping("/signup")
ResponseEntity<?> signup(@Valid @RequestBody SignupRequest req) {
    // Bean Validation runs before method body
}`,
      '@NotBlank email, @Size password, @Email — failures → 400 via MethodArgumentNotValidException',
      normalizeLines([
        L('@Valid', 'Triggers Jakarta validation on request DTO.'),
        L('@ControllerAdvice', 'Maps violations to ProblemDetail JSON.'),
      ]),
    ),
  ],
};

/** Tag-based round factories — each returns a puzzle personalized to topic */
const TAG_FACTORY = {
  syntax: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: ${topic.title} utility`,
        `Machine round — complete the TODO method demonstrating ${topic.title}.`,
        `public class Solution {
    static boolean apply(int value) {
        // TODO: ${topic.title} logic
        return false;
    }
    public static void main(String[] args) {
        System.out.println(apply(42));
    }
}`,
        'Implement correct logic per problem statement; compile and run to verify.',
        normalizeLines([
          L('static boolean apply(int value)', 'Core method under test.'),
          L('// TODO', 'Replace with real ${topic.title} implementation.'),
          L('main calls apply(42)', 'Driver proves behavior with sample input.'),
        ]),
      ),
      () => puzzle(
        'Compile-time error hunt',
        `Will this ${topic.title} code compile? If not, fix the first error.`,
        `public class Demo {
    public static void main(String[] args) {
        int x = 10
        System.out.println(x);
    }
}`,
        'Compile error: \';\' expected after int x = 10',
        normalizeLines([
          L('int x = 10', 'Missing semicolon — javac fails before main runs.'),
        ]),
      ),
      () => puzzle(
        `Trace: ${topic.title} execution`,
        `Step through this ${topic.title} snippet. Predict exact output.`,
        `public class Trace {
    public static void main(String[] args) {
        int a = 5, b = 2;
        System.out.println(a / b + " rem " + a % b);
    }
}`,
        '2 rem 1',
        normalizeLines([
          L('a / b', 'Integer division 5/2 = 2.'),
          L('a % b', 'Remainder 1.'),
        ]),
      ),
      () => puzzle(
        `Refactor: ${topic.title} clarity`,
        'Improve readability without changing behavior.',
        `if (age > 18) { if (hasLicense) { if (!suspended) allow(); } }`,
        'Flatten: if (age > 18 && hasLicense && !suspended) allow();',
        normalizeLines([
          L('Nested ifs', 'Hard to read — combine conditions with &&.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  oop: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: equals for ${topic.title}`,
        'Complete equals() following symmetry and transitivity contract.',
        `class Point {
    final int x, y;
    Point(int x, int y) { this.x = x; this.y = y; }
    @Override public boolean equals(Object o) {
        // TODO: null check, getClass, compare x,y
        return false;
    }
}`,
        'if (o == null || getClass() != o.getClass()) return false; Point p = (Point)o; return x==p.x && y==p.y;',
        normalizeLines([
          L('getClass() != o.getClass()', 'Reject subclasses — or use instanceof pattern consistently.'),
          L('compare x and y', 'Value equality for all fields.'),
        ]),
      ),
      () => puzzle(
        'Bug hunt: broken polymorphism',
        `Why doesn't this print "Dog" for ${topic.title}?`,
        `class Animal { String speak() { return "Animal"; } }
class Dog extends Animal {}
public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        System.out.println(a.speak());
    }
}`,
        'Animal — speak not overridden in Dog',
        normalizeLines([
          L('Animal a = new Dog()', 'Runtime type Dog but no override.'),
          L('a.speak()', 'Uses Animal.speak() — need @Override in Dog.'),
        ]),
      ),
      () => puzzle(
        `Design: ${topic.title} class diagram`,
        'List entities and relationships for a tiny library system.',
        `// Book, Member, Loan
// Loan links Book + Member + dueDate
// Member has many Loans`,
        'Identify nouns → classes; verbs → methods; apply encapsulation',
        normalizeLines([
          L('Book, Member, Loan', 'Core entities with private fields.'),
          L('Loan association', 'Composition or separate aggregate root.'),
        ]),
      ),
      () => puzzle(
        'SOLID: single responsibility',
        'Split this god class — what two classes?',
        `class UserManager {
    void saveToDb(User u) {}
    void sendEmail(User u) {}
    String toJson(User u) { return ""; }
}`,
        'UserRepository (persistence), NotificationService (email), UserDtoMapper (JSON)',
        normalizeLines([
          L('saveToDb', 'Persistence concern — Repository.'),
          L('sendEmail', 'Notification concern — separate service.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  framework: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: ${topic.title} bean`,
        'Complete @Service with constructor injection.',
        `@Service
class OrderService {
    // TODO: final field + constructor
    Order create(CreateOrderRequest req) { return null; }
}`,
        'private final OrderRepository repo; constructor assigns repo — Spring injects',
        normalizeLines([
          L('@Service', 'Stereotype — component-scanned bean.'),
          L('constructor injection', 'Preferred over @Autowired field injection.'),
        ]),
      ),
      () => puzzle(
        'Bug hunt: wrong scope',
        '@Singleton service holds mutable List<Order> orders — problem in multi-threaded server?',
        `@Service
class Store {
    List<Order> cache = new ArrayList<>();
}`,
        'Shared mutable state across requests — use request scope or thread-safe store',
        normalizeLines([
          L('Singleton + ArrayList', 'All HTTP threads mutate same list.'),
          L('Fix: ConcurrentHashMap or @RequestScope', 'Isolate per-request data.'),
        ]),
      ),
      () => puzzle(
        `API design: ${topic.title}`,
        'Which HTTP method + path for idempotent update?',
        `// PUT /users/{id}  vs  PATCH /users/{id}  vs  POST /users/{id}`,
        'PUT replaces full resource; PATCH partial; POST creates (not idempotent)',
        normalizeLines([
          L('PUT', 'Idempotent full replacement.'),
          L('PATCH', 'Partial update — document merge semantics.'),
        ]),
      ),
      () => puzzle(
        'Test: MockMvc status',
        'What status when validation fails on @Valid body?',
        `mockMvc.perform(post("/users").contentType(APPLICATION_JSON).content("{}"))
    .andExpect(status().isBadRequest());`,
        '400 Bad Request — MethodArgumentNotValidException handled by @ControllerAdvice',
        normalizeLines([
          L('@Valid on request body', 'Blank required fields fail validation.'),
          L('isBadRequest()', '400 returned to client.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  concurrency: (topic, seed) => {
    if (OVERRIDES['concurrency-basics']) return OVERRIDES['concurrency-basics'][seed % 4];
    return TAG_FACTORY.syntax(topic, seed);
  },

  functional: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: stream pipeline for ${topic.title}`,
        'Complete filter + map + collect.',
        `import java.util.*;
import java.util.stream.*;
List<String> names = List.of("amy", "bob", "ava");
List<String> result = names.stream()
    // TODO: length > 3, uppercase, toList()
    .toList();`,
        '[AMY, AVA] — bob length 3 excluded if filter is >3',
        normalizeLines([
          L('.filter(s -> s.length() > 3)', 'Keeps amy and ava.'),
          L('.map(String::toUpperCase)', 'Uppercase mapping.'),
        ]),
      ),
      () => puzzle(
        'Bug hunt: Stream reused',
        'Second terminal op fails — why?',
        `Stream<Integer> s = Stream.of(1, 2, 3);
s.count();
s.sum();`,
        'IllegalStateException — stream already consumed',
        normalizeLines([
          L('s.count()', 'Terminal op closes stream.'),
          L('s.sum()', 'Cannot reuse same stream instance.'),
        ]),
      ),
      () => puzzle(
        `Lambda: ${topic.title} capture`,
        'Why compile error?',
        `int factor = 2;
Runnable r = () -> { factor = 3; };
`,
        'Local variables used in lambdas must be effectively final',
        normalizeLines([
          L('factor = 3 inside lambda', 'Mutating captured local — not allowed.'),
        ]),
      ),
      () => puzzle(
        'Optional anti-pattern',
        'Refactor: avoid Optional.get() without check.',
        `Optional<User> u = findUser(id);
return u.get().getName();`,
        'return u.map(User::getName).orElse("guest");',
        normalizeLines([
          L('u.get()', 'Throws NoSuchElementException if empty.'),
          L('map + orElse', 'Safe chain.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  architecture: (topic, seed) => {
    const sets = [
      () => puzzle(
        `LLD: ${topic.title} — core classes`,
        'Design parking lot (single level). List 4 classes and 2 methods each.',
        `// ParkingLot, Slot, Vehicle, Ticket
// enter(Vehicle) -> Ticket, exit(Ticket) -> fee`,
        'Separate concerns: lot manages slots; vehicle is enum CAR/BIKE',
        normalizeLines([
          L('ParkingLot', 'Orchestrates allocate/release slot.'),
          L('Ticket', 'Immutable record of entry time + slot id.'),
        ]),
      ),
      () => puzzle(
        'Pattern: Strategy',
        `Which pattern fits multiple payment types in ${topic.title}?`,
        `interface PaymentStrategy { void pay(Money amount); }
class CreditCard implements PaymentStrategy { ... }
class Upi implements PaymentStrategy { ... }`,
        'Strategy — inject PaymentStrategy at runtime, Open/Closed principle',
        normalizeLines([
          L('PaymentStrategy interface', 'Encapsulates varying algorithm.'),
          L('Inject at checkout', 'Avoid switch-on-type in business logic.'),
        ]),
      ),
      () => puzzle(
        'Microservice boundary',
        'Monolith has User + Order + Payment — split how?',
        `// User Service owns identity
// Order Service owns orders (calls User by id)
// Payment Service handles charges`,
        'Each service own DB; communicate via events or REST; no shared tables',
        normalizeLines([
          L('Bounded context', 'Align service to business capability.'),
          L('No shared DB', 'Prevents tight coupling.'),
        ]),
      ),
      () => puzzle(
        'SOLID: dependency inversion',
        'High-level CheckoutService should depend on what?',
        `class CheckoutService {
    private final PaymentGateway gateway; // interface
}`,
        'Abstraction (interface), not concrete StripeClient',
        normalizeLines([
          L('PaymentGateway interface', 'High-level module defines contract.'),
          L('Impl wired at runtime', 'Spring @Bean or constructor injection.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  database: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: JDBC query for ${topic.title}`,
        'Complete PreparedStatement usage.',
        `try (Connection c = ds.getConnection();
     PreparedStatement ps = c.prepareStatement("SELECT name FROM users WHERE id = ?")) {
    ps.setLong(1, userId);
    // TODO: executeQuery + map row
}`,
        'try (ResultSet rs = ps.executeQuery()) { if (rs.next()) return rs.getString("name"); }',
        normalizeLines([
          L('PreparedStatement ?', 'Parameter binding prevents SQL injection.'),
          L('try-with-resources', 'Closes Connection, PS, RS.'),
        ]),
      ),
      () => puzzle(
        'Bug hunt: SQL injection',
        'Fix the unsafe query.',
        `String q = "SELECT * FROM users WHERE email = '" + email + "'";`,
        'Use PreparedStatement with setString(1, email)',
        normalizeLines([
          L('String concat', 'Attacker can inject OR 1=1.'),
          L('Parameterized query', 'Separates SQL structure from data.'),
        ]),
      ),
      () => puzzle(
        'Transaction isolation',
        'Two transfers read same balance — what anomaly?',
        `// Tx1: read balance 100, subtract 50
// Tx2: read balance 100, subtract 50
// Both commit — balance -50 instead of 0`,
        'Lost update — fix with SELECT FOR UPDATE or optimistic locking (@Version)',
        normalizeLines([
          L('Concurrent read-modify-write', 'Classic lost update.'),
          L('@Version on entity', 'Optimistic lock detects conflict.'),
        ]),
      ),
      () => puzzle(
        'JPA N+1 problem',
        'findAll Orders then order.getCustomer() in loop — issue?',
        `@Query("SELECT o FROM Order o")
List<Order> findAll();
// for (Order o : orders) o.getCustomer().getName();`,
        'N+1 queries — fix with JOIN FETCH or @EntityGraph',
        normalizeLines([
          L('1 query orders + N customer queries', 'Performance killer.'),
          L('JOIN FETCH o.customer', 'Single query with join.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  jvm: (topic, seed) => TAG_FACTORY.architecture(topic, seed),

  security: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Fix: ${topic.title} — password storage`,
        'Never store plain text — complete hashing approach.',
        `// String hash = md5(password);  // BAD
// Use: BCryptPasswordEncoder.encode(password)`,
        'BCrypt with per-user salt — slow by design against brute force',
        normalizeLines([
          L('md5(password)', 'Fast, unsalted — rainbow tables break it.'),
          L('BCryptPasswordEncoder', 'Spring Security standard.'),
        ]),
      ),
      () => puzzle(
        'JWT validation',
        'What must you verify on every request?',
        `// 1. Signature with secret/public key
// 2. exp not passed
// 3. iss/aud if used`,
        'All three — never trust claims without cryptographic verify',
        normalizeLines([
          L('Signature', 'Detects tampering.'),
          L('exp claim', 'Reject expired tokens.'),
        ]),
      ),
      () => puzzle(
        'CSRF vs stateless API',
        'When is CSRF protection required?',
        `// Browser cookie session → CSRF token needed
// Bearer JWT in Authorization header → CSRF N/A`,
        'CSRF targets cookie-based auth; header tokens not auto-sent by browser',
        normalizeLines([
          L('Cookie session', 'Browser sends cookie automatically — CSRF risk.'),
          L('Authorization header', 'Attacker site cannot set custom header cross-origin.'),
        ]),
      ),
      () => puzzle(
        'Input validation',
        'Complete @Size and @Email on signup DTO.',
        `record SignupRequest(
    @Email String email,
    @Size(min = 8) String password
) {}`,
        'Validation at boundary — fail fast before service layer',
        normalizeLines([
          L('@Email', 'RFC-ish format check.'),
          L('@Size(min=8)', 'Password policy at API layer.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  testing: (topic, seed) => TAG_FACTORY.syntax(topic, seed),

  devops: (topic, seed) => TAG_FACTORY.architecture(topic, seed),

  web: (topic, seed) => TAG_FACTORY.framework(topic, seed),

  io: (topic, seed) => TAG_FACTORY.syntax(topic, seed),

  modern: (topic, seed) => {
    const sets = [
      () => puzzle(
        `Implement: ${topic.title} with record`,
        'Convert class to record — what is generated?',
        `// class Point { final int x,y; ctor, getters, equals, hashCode }
record Point(int x, int y) {}`,
        'Canonical ctor, accessors x(), equals/hashCode/toString — immutable',
        normalizeLines([
          L('record Point(int x, int y)', 'Compact data carrier.'),
          L('Immutable by default', 'Cannot extend other classes.'),
        ]),
      ),
      () => puzzle(
        'Pattern matching switch',
        'Complete switch on Object shape.',
        `static String describe(Object o) {
    return switch (o) {
        case Integer i -> "int " + i;
        case String s -> "str " + s;
        default -> "?";
    };
}`,
        'Exhaustive with sealed types; compiler checks coverage',
        normalizeLines([
          L('case Integer i', 'Type pattern binds variable.'),
          L('default', 'Required for non-sealed Object.'),
        ]),
      ),
      () => puzzle(
        'Sealed hierarchy',
        'Why seal Payment permits Card, Upi?',
        `sealed interface Payment permits Card, Upi {}
record Card(String last4) implements Payment {}
record Upi(String vpa) implements Payment {}`,
        'Compiler knows all subtypes — exhaustive switch without default',
        normalizeLines([
          L('sealed interface Payment', 'Closed set of implementors.'),
          L('permits Card, Upi', 'Only these records allowed.'),
        ]),
      ),
      () => puzzle(
        'var inference limits',
        'Where is var NOT allowed?',
        `// var x = 1;        // OK field? NO — not for fields
// var in lambda param? NO`,
        'var only for local variables with initializer; not fields/parameters',
        normalizeLines([
          L('local with initializer', 'Compiler infers type.'),
          L('not for fields', 'Explicit type required for instance fields.'),
        ]),
      ),
    ];
    return sets[seed % sets.length]();
  },

  professional: (topic, seed) => TAG_FACTORY.architecture(topic, seed),

  overview: (topic, seed) => TAG_FACTORY.syntax(topic, seed),

  setup: (topic, seed) => puzzle(
    `Setup task: ${topic.title}`,
    'Machine round — what commands verify JDK and project build?',
    `java -version
javac Hello.java
java Hello`,
    'java -version shows runtime; javac compiles; java runs bytecode',
    normalizeLines([
      L('java -version', 'Confirms JAVA_HOME / PATH.'),
      L('javac / java', 'Compile-then-run workflow.'),
    ]),
  ),

  tools: (topic, seed) => TAG_FACTORY.devops(topic, seed),

  debugging: (topic, seed) => puzzle(
    'Debug: read stack trace',
    `Exception in thread "main" java.lang.NullPointerException
    at com.app.Service.run(Service.java:42)`,
    'NPE at Service.java line 42 — start debugging at Service.run',
    normalizeLines([
      L('NullPointerException', 'Dereference on null reference.'),
      L('at Service.run:42', 'First application frame — inspect variables at line 42.'),
    ]),
  ),

  performance: (topic, seed) => TAG_FACTORY.jvm(topic, seed),

  cloud: (topic, seed) => TAG_FACTORY.devops(topic, seed),

  reactive: (topic, seed) => TAG_FACTORY.functional(topic, seed),

  messaging: (topic, seed) => TAG_FACTORY.architecture(topic, seed),

  api: (topic, seed) => TAG_FACTORY.syntax(topic, seed),

  generics: (topic, seed) => TAG_FACTORY.oop(topic, seed),

  'error-handling': (topic, seed) => OVERRIDES['exception-handling']?.[seed % 4] || TAG_FACTORY.syntax(topic, seed),

  'best-practices': (topic, seed) => TAG_FACTORY.architecture(topic, seed),
};

TAG_FACTORY.collections = (topic, seed) => {
  if (OVERRIDES.collections) return OVERRIDES.collections[seed % OVERRIDES.collections.length];
  const sets = [
    () => puzzle(
      `Implement: frequency map for ${topic.title}`,
      'Complete using HashMap merge or getOrDefault.',
      `Map<Character,Integer> freq = new HashMap<>();
for (char c : "hello".toCharArray()) {
    // TODO: increment freq[c]
}`,
      'freq.merge(c, 1, Integer::sum) or getOrDefault(c,0)+1',
      normalizeLines([L('freq.merge', 'Idiomatic increment in Java 8+.')]),
    ),
    () => TAG_FACTORY.oop(topic, seed + 1),
    () => TAG_FACTORY.syntax(topic, seed + 2),
    () => TAG_FACTORY.architecture(topic, seed + 3),
  ];
  return sets[seed % sets.length]();
};

function factoryFor(tag) {
  return TAG_FACTORY[tag] || TAG_FACTORY.syntax;
}

function buildFourRounds(topic) {
  if (OVERRIDES[topic.id]?.length >= 4) {
    return OVERRIDES[topic.id].slice(0, 4);
  }

  const tag = primaryTag(topic);
  const factory = factoryFor(tag);
  const seed = hashStr(topic.id);
  const rounds = [];

  if (OVERRIDES[topic.id]) {
    rounds.push(...OVERRIDES[topic.id]);
  }

  for (let i = 0; rounds.length < 4; i++) {
    const r = factory(topic, seed + i * 7);
    const key = r.title + '|' + r.code.slice(0, 60);
    if (!rounds.some((x) => x.title + '|' + x.code.slice(0, 60) === key)) {
      rounds.push(r);
    }
    if (i > 12) break;
  }

  while (rounds.length < 4) {
    rounds.push(factory(topic, seed + rounds.length * 13));
  }

  return rounds.slice(0, 4);
}

const BANK = Object.fromEntries(allTopics().map((t) => [t.id, buildFourRounds(t)]));

/**
 * @param {{ id: string, title: string, tags?: string[] }} topic
 * @param {object} _content
 * @returns {import('./puzzles.mjs').puzzle[]}
 */
export function getCodingRounds(topic, _content) {
  return (BANK[topic.id] || buildFourRounds(topic)).map((p) => ({
    title: p.title,
    problem: p.problem,
    code: p.code,
    output: p.output,
    lines: normalizeLines(p.lines || []),
  }));
}
