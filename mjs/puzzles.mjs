/**
 * Machine-round / coding-test puzzles with line-by-line explanations.
 * Each puzzle: title, problem, code, output, lines[{n, code, text}]
 */

export function puzzle(title, problem, code, output, lines) {
  return { title, problem, code, output, lines };
}

export function L(code, text) {
  return { code, text };
}

/** @type {Record<string, import('./coding-test-enrichment.mjs').CodingPuzzle[]>} */
export const POOL = {
  overview: [
    puzzle(
      'Predict the Output',
      'What does this program print?',
      `public class Main {
    public static void main(String[] args) {
        System.out.println("A");
        System.out.print("B");
        System.out.println("C");
    }
}`,
      'A\nBC',
      [
        L('public class Main {', 'Declares a public class named Main — the JVM loads this class to start execution.'),
        L('    public static void main(String[] args) {', 'Entry point: JVM calls main with command-line arguments (unused here).'),
        L('        System.out.println("A");', 'println adds a newline after A, so the first line of output is A alone.'),
        L('        System.out.print("B");', 'print writes B without a trailing newline — output continues on the same line.'),
        L('        System.out.println("C");', 'println appends C and then a newline, producing BC on the second output line.'),
        L('    }', 'Ends the main method body.'),
        L('}', 'Ends the class declaration.'),
      ],
    ),
    puzzle(
      'Compile or Run Error?',
      'Will this compile? If it runs, what is printed?',
      `public class Demo {
    public static void main(String[] args) {
        int x = 10
        System.out.println(x);
    }
}`,
      'Compile error: \';\' expected after int x = 10',
      [
        L('public class Demo {', 'Valid class declaration.'),
        L('    public static void main(String[] args) {', 'Valid main signature.'),
        L('        int x = 10', 'Missing semicolon — Java statements must end with ; so javac fails here.'),
        L('        System.out.println(x);', 'Never reached during compilation because the prior line is invalid.'),
        L('    }', 'Closing brace for main.'),
        L('}', 'Closing brace for class.'),
      ],
    ),
  ],

  syntax: [
    puzzle(
      'Operator Precedence',
      'Predict the console output.',
      `public class Ops {
    public static void main(String[] args) {
        int a = 2 + 3 * 4;
        int b = (2 + 3) * 4;
        System.out.println(a + " " + b);
    }
}`,
      '14 20',
      [
        L('public class Ops {', 'Class container for the demo.'),
        L('    public static void main(String[] args) {', 'Program entry point.'),
        L('        int a = 2 + 3 * 4;', 'Multiplication binds tighter: 3*4=12, then 2+12 → a is 14.'),
        L('        int b = (2 + 3) * 4;', 'Parentheses first: 2+3=5, then 5*4 → b is 20.'),
        L('        System.out.println(a + " " + b);', 'String concatenation: 14 + " " + 20 prints 14 20.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Post-increment Trap',
      'What is printed?',
      `public class Inc {
    public static void main(String[] args) {
        int i = 5;
        System.out.println(i++ + ++i);
    }
}`,
      '12',
      [
        L('public class Inc {', 'Class declaration.'),
        L('    public static void main(String[] args) {', 'Entry point.'),
        L('        int i = 5;', 'i starts at 5.'),
        L('        System.out.println(i++ + ++i);', 'i++ uses 5 then becomes 6; ++i makes i 7 and contributes 7; 5+7=12 printed.'),
        L('    }', 'End main — final i is 7 but only 12 was printed.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Boolean Short-Circuit',
      'Predict output.',
      `public class Logic {
    public static void main(String[] args) {
        boolean a = false && expensive();
        boolean b = true || expensive();
        System.out.println(a + "," + b);
    }
    static boolean expensive() {
        System.out.print("X");
        return true;
    }
}`,
      'false,true',
      [
        L('public class Logic {', 'Class with a side-effect helper method.'),
        L('    public static void main(String[] args) {', 'main executes first.'),
        L('        boolean a = false && expensive();', '&& short-circuits: left is false, expensive() never runs.'),
        L('        boolean b = true || expensive();', '|| short-circuits: left is true, expensive() never runs.'),
        L('        System.out.println(a + "," + b);', 'Prints false,true — no X appears.'),
        L('    }', 'End main.'),
        L('    static boolean expensive() {', 'Would print X if invoked.'),
        L('        System.out.print("X");', 'Side effect skipped in this run.'),
        L('        return true;', 'Return value unused when short-circuited.'),
        L('    }', 'End method.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  oop: [
    puzzle(
      'Inheritance Method Call',
      'What prints?',
      `class Animal {
    void speak() { System.out.print("A"); }
}
class Dog extends Animal {
    void speak() { System.out.print("D"); }
}
public class Poly {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak();
    }
}`,
      'D',
      [
        L('class Animal {', 'Parent type with speak printing A.'),
        L('    void speak() { System.out.print("A"); }', 'Base implementation.'),
        L('}', 'End Animal.'),
        L('class Dog extends Animal {', 'Dog inherits Animal but overrides speak.'),
        L('    void speak() { System.out.print("D"); }', 'Overridden behavior used at runtime.'),
        L('}', 'End Dog.'),
        L('public class Poly {', 'Public driver class.'),
        L('    public static void main(String[] args) {', 'Entry point.'),
        L('        Animal a = new Dog();', 'Reference type Animal, actual object Dog — dynamic dispatch.'),
        L('        a.speak();', 'JVM calls Dog.speak() → prints D.'),
        L('    }', 'End main.'),
        L('}', 'End Poly.'),
      ],
    ),
    puzzle(
      'Static vs Instance',
      'Predict output.',
      `class Counter {
    static int count = 0;
    int id;
    Counter() { id = ++count; }
    static int getCount() { return count; }
}
public class Test {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        System.out.println(Counter.getCount());
    }
}`,
      '2',
      [
        L('class Counter {', 'Class with static shared state.'),
        L('    static int count = 0;', 'One count field shared by all Counter instances.'),
        L('    int id;', 'Per-instance identifier.'),
        L('    Counter() { id = ++count; }', 'Each new Counter increments shared count and assigns id.'),
        L('    static int getCount() { return count; }', 'Static accessor reads class-level count.'),
        L('}', 'End Counter.'),
        L('public class Test {', 'Driver class.'),
        L('    public static void main(String[] args) {', 'main runs.'),
        L('        new Counter();', 'count becomes 1.'),
        L('        new Counter();', 'count becomes 2.'),
        L('        System.out.println(Counter.getCount());', 'Prints 2.'),
        L('    }', 'End main.'),
        L('}', 'End Test.'),
      ],
    ),
    puzzle(
      'Constructor Chain',
      'What is the output?',
      `class Base {
    Base() { System.out.print("B"); }
}
class Derived extends Base {
    Derived() { System.out.print("D"); }
}
public class Chain {
    public static void main(String[] args) {
        new Derived();
    }
}`,
      'BD',
      [
        L('class Base {', 'Parent class constructor prints B.'),
        L('    Base() { System.out.print("B"); }', 'Runs first when Derived is constructed.'),
        L('}', 'End Base.'),
        L('class Derived extends Base {', 'Derived implicitly calls super() before its body.'),
        L('    Derived() { System.out.print("D"); }', 'Runs after Base constructor completes.'),
        L('}', 'End Derived.'),
        L('public class Chain {', 'Driver.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        new Derived();', 'Construction order: B then D on one line.'),
        L('    }', 'End main.'),
        L('}', 'End Chain.'),
      ],
    ),
  ],

  collections: [
    puzzle(
      'ArrayList remove in loop',
      'What gets printed?',
      `import java.util.*;
public class ListDemo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) == 2) list.remove(i);
        }
        System.out.println(list);
    }
}`,
      '[1, 3]',
      [
        L('import java.util.*;', 'Imports collection types.'),
        L('public class ListDemo {', 'Driver class.'),
        L('    public static void main(String[] args) {', 'Entry point.'),
        L('        List<Integer> list = new ArrayList<>(List.of(1, 2, 3));', 'Mutable list [1,2,3].'),
        L('        for (int i = 0; i < list.size(); i++) {', 'Index-based loop; size shrinks after removal.'),
        L('            if (list.get(i) == 2) list.remove(i);', 'At i=1, removes 2; list becomes [1,3]; i becomes 2, loop ends.'),
        L('        }', 'Loop skips re-checking index 1 after shift — classic pitfall.'),
        L('        System.out.println(list);', 'Prints [1, 3].'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'HashMap put behavior',
      'Predict output.',
      `import java.util.*;
public class MapDemo {
    public static void main(String[] args) {
        Map<String, Integer> m = new HashMap<>();
        m.put("a", 1);
        m.put("a", 2);
        m.put("b", 3);
        System.out.println(m.size() + " " + m.get("a"));
    }
}`,
      '2 2',
      [
        L('import java.util.*;', 'Imports Map and HashMap.'),
        L('public class MapDemo {', 'Driver.'),
        L('    public static void main(String[] args) {', 'main.'),
        L('        Map<String, Integer> m = new HashMap<>();', 'Empty hash map.'),
        L('        m.put("a", 1);', 'Inserts key a → 1.'),
        L('        m.put("a", 2);', 'Replaces value for existing key a with 2.'),
        L('        m.put("b", 3);', 'Adds second entry.'),
        L('        System.out.println(m.size() + " " + m.get("a"));', 'size=2, get("a")=2 → prints 2 2.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Set uniqueness',
      'What prints?',
      `import java.util.*;
public class SetDemo {
    public static void main(String[] args) {
        Set<String> s = new HashSet<>();
        s.add("java");
        s.add("Java");
        s.add("java");
        System.out.println(s.size());
    }
}`,
      '2',
      [
        L('import java.util.*;', 'Set and HashSet imports.'),
        L('public class SetDemo {', 'Driver.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        Set<String> s = new HashSet<>();', 'HashSet enforces uniqueness via equals/hashCode.'),
        L('        s.add("java");', 'Adds first element.'),
        L('        s.add("Java");', 'Different case → different string → second element.'),
        L('        s.add("java");', 'Duplicate of first — Set ignores it.'),
        L('        System.out.println(s.size());', 'Two distinct strings → prints 2.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  strings: [
    puzzle(
      'String immutability',
      'Predict output.',
      `public class Str {
    public static void main(String[] args) {
        String s = "hello";
        s.concat(" world");
        System.out.println(s);
    }
}`,
      'hello',
      [
        L('public class Str {', 'String immutability demo.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        String s = "hello";', 's references literal "hello".'),
        L('        s.concat(" world");', 'concat returns new String; s is never reassigned.'),
        L('        System.out.println(s);', 'Original reference unchanged → prints hello.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'String pool equality',
      'What prints?',
      `public class Pool {
    public static void main(String[] args) {
        String a = "hi";
        String b = "hi";
        String c = new String("hi");
        System.out.println((a == b) + " " + (a == c) + " " + a.equals(c));
    }
}`,
      'true false true',
      [
        L('public class Pool {', 'String pool vs heap demo.'),
        L('    public static void main(String[] args) {', 'main.'),
        L('        String a = "hi";', 'Literal interned in string pool.'),
        L('        String b = "hi";', 'Same pool reference as a.'),
        L('        String c = new String("hi");', 'New heap object, different identity.'),
        L('        System.out.println((a == b) + " " + (a == c) + " " + a.equals(c));', '== true for pool match, false for heap, equals true for same chars.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  concurrency: [
    puzzle(
      'Thread start order',
      'Possible output? (assume run() completes quickly)',
      `class Worker extends Thread {
    public void run() { System.out.print("T"); }
}
public class ThreadDemo {
    public static void main(String[] args) throws Exception {
        Worker w = new Worker();
        w.start();
        w.start();
    }
}`,
      'IllegalThreadStateException on second start()',
      [
        L('class Worker extends Thread {', 'Custom thread class.'),
        L('    public void run() { System.out.print("T"); }', 'Would print T once if started once.'),
        L('}', 'End Worker.'),
        L('public class ThreadDemo {', 'Driver.'),
        L('    public static void main(String[] args) throws Exception {', 'main may throw if second start fails.'),
        L('        Worker w = new Worker();', 'Thread instance created in NEW state.'),
        L('        w.start();', 'First start OK — may print T.'),
        L('        w.start();', 'Second start on same thread throws IllegalThreadStateException.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Synchronized counter',
      'With many threads this is unsafe; predict single-threaded output.',
      `public class Sync {
    static int n = 0;
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) n++;
        System.out.println(n);
    }
}`,
      '3',
      [
        L('public class Sync {', 'Simple increment demo (single-threaded).'),
        L('    static int n = 0;', 'Shared static counter.'),
        L('    public static void main(String[] args) {', 'Single thread runs loop.'),
        L('        for (int i = 0; i < 3; i++) n++;', 'Increments n three times.'),
        L('        System.out.println(n);', 'Prints 3.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  functional: [
    puzzle(
      'Stream pipeline',
      'What prints?',
      `import java.util.*;
import java.util.stream.*;
public class StreamDemo {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4);
        int sum = nums.stream()
            .filter(n -> n % 2 == 0)
            .mapToInt(Integer::intValue)
            .sum();
        System.out.println(sum);
    }
}`,
      '6',
      [
        L('import java.util.*;', 'List import.'),
        L('import java.util.stream.*;', 'Stream utilities.'),
        L('public class StreamDemo {', 'Driver.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        List<Integer> nums = List.of(1, 2, 3, 4);', 'Immutable list 1..4.'),
        L('        int sum = nums.stream()', 'Opens stream on list.'),
        L('            .filter(n -> n % 2 == 0)', 'Keeps 2 and 4 only.'),
        L('            .mapToInt(Integer::intValue)', 'Boxed Integer → int stream.'),
        L('            .sum();', '2+4=6 assigned to sum.'),
        L('        System.out.println(sum);', 'Prints 6.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Optional orElse',
      'Predict output.',
      `import java.util.*;
public class Opt {
    public static void main(String[] args) {
        Optional<String> empty = Optional.empty();
        String v = empty.orElse("default");
        System.out.println(v);
    }
}`,
      'default',
      [
        L('import java.util.*;', 'Optional import.'),
        L('public class Opt {', 'Driver.'),
        L('    public static void main(String[] args) {', 'main.'),
        L('        Optional<String> empty = Optional.empty();', 'No value present.'),
        L('        String v = empty.orElse("default");', 'Returns default when empty.'),
        L('        System.out.println(v);', 'Prints default.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  'error-handling': [
    puzzle(
      'Finally always runs',
      'What prints?',
      `public class FinallyDemo {
    public static void main(String[] args) {
        try {
            System.out.print("T");
            return;
        } finally {
            System.out.print("F");
        }
    }
}`,
      'TF',
      [
        L('public class FinallyDemo {', 'Finally block demo.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        try {', 'Try block starts.'),
        L('            System.out.print("T");', 'Prints T.'),
        L('            return;', 'Attempts to exit main, but finally runs first.'),
        L('        } finally {', 'Finally executes before return completes.'),
        L('            System.out.print("F");', 'Prints F after T.'),
        L('        }', 'Then method actually returns.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  generics: [
    puzzle(
      'Generic type bound',
      'Will this compile? What concept is tested?',
      `import java.util.*;
public class Bound {
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
    public static void main(String[] args) {
        System.out.println(max("a", "b"));
    }
}`,
      'b',
      [
        L('import java.util.*;', 'Imports (Comparable is java.lang, auto-imported).'),
        L('public class Bound {', 'Class with generic method.'),
        L('    public static <T extends Comparable<T>> T max(T a, T b) {', 'T must implement Comparable<T> for compareTo.'),
        L('        return a.compareTo(b) >= 0 ? a : b;', '"a".compareTo("b") < 0 so returns b.'),
        L('    }', 'End max.'),
        L('    public static void main(String[] args) {', 'main calls with Strings.'),
        L('        System.out.println(max("a", "b"));', 'Prints b.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  framework: [
    puzzle(
      'REST status mapping',
      'In a Spring @RestController, a method returns ResponseEntity.notFound() — what HTTP status?',
      `@RestController
class UserApi {
    @GetMapping("/users/{id}")
    ResponseEntity<User> get(@PathVariable Long id) {
        return userService.find(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}`,
      'HTTP 404 Not Found when user missing; 200 OK with body when found',
      [
        L('@RestController', 'Marks class as REST controller — methods return data/status directly.'),
        L('class UserApi {', 'API controller bean.'),
        L('    @GetMapping("/users/{id}")', 'Maps GET /users/{id} to this handler.'),
        L('    ResponseEntity<User> get(@PathVariable Long id) {', 'Path variable bound from URL.'),
        L('        return userService.find(id)', 'Optional<User> from service layer.'),
        L('            .map(ResponseEntity::ok)', 'Present → 200 OK with User JSON body.'),
        L('            .orElse(ResponseEntity.notFound().build());', 'Empty → 404 with no body.'),
        L('    }', 'End handler.'),
        L('}', 'End class.'),
      ],
    ),
  ],

  database: [
    puzzle(
      'JDBC try-with-resources',
      'What ensures connections close even on SQLException?',
      `try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement("SELECT id FROM users WHERE id = ?")) {
    ps.setLong(1, userId);
    try (ResultSet rs = ps.executeQuery()) {
        return rs.next() ? mapRow(rs) : Optional.empty();
    }
}`,
      'Optional<User> — resources auto-closed in reverse order (rs, ps, conn)',
      [
        L('try (Connection conn = dataSource.getConnection();', 'Connection acquired; AutoCloseable registered.'),
        L('     PreparedStatement ps = conn.prepareStatement("SELECT id FROM users WHERE id = ?")) {', 'Prepared statement created with parameterized SQL.'),
        L('    ps.setLong(1, userId);', 'Binds first ? to userId — prevents SQL injection.'),
        L('    try (ResultSet rs = ps.executeQuery()) {', 'Executes query; ResultSet also auto-closed.'),
        L('        return rs.next() ? mapRow(rs) : Optional.empty();', 'Maps row or returns empty if no match.'),
        L('    }', 'rs.close() called automatically here.'),
        L('}', 'ps.close() then conn.close() even if SQLException thrown.'),
      ],
    ),
  ],

  jvm: [
    puzzle(
      'String concatenation bytecode',
      'What does javac typically optimize this to?',
      `String msg = "Hello, " + name + "!";`,
      'StringBuilder append chain (compiler may use invokedynamic on newer JDKs)',
      [
        L('String msg = "Hello, " + name + "!";', 'Source uses + for concatenation.'),
        L('', 'javac lowers to StringBuilder: new SB, append "Hello, ", append name, append "!", toString().'),
        L('', 'At runtime JIT may further optimize; concept tested: + is not free at runtime.'),
      ],
    ),
  ],

  architecture: [
    puzzle(
      'Singleton thread safety',
      'Which lazy initialization is thread-safe without sync on every access?',
      `class Holder {
    private static class Lazy {
        static final Singleton INSTANCE = new Singleton();
    }
    static Singleton get() { return Lazy.INSTANCE; }
}`,
      'Bill Pugh holder idiom — class loads once, JVM guarantees static init is thread-safe',
      [
        L('class Holder {', 'Outer holder type.'),
        L('    private static class Lazy {', 'Nested class not loaded until referenced.'),
        L('        static final Singleton INSTANCE = new Singleton();', 'Created once when Lazy class initializes.'),
        L('    }', 'End nested class.'),
        L('    static Singleton get() { return Lazy.INSTANCE; }', 'First call triggers Lazy load → single instance.'),
        L('}', 'End Holder — no synchronized keyword needed on hot path.'),
      ],
    ),
  ],

  testing: [
    puzzle(
      'JUnit assertion',
      'What fails the test?',
      `@Test
void sum() {
    assertEquals(5, calculator.add(2, 2));
}`,
      'AssertionError: expected 5 but was 4',
      [
        L('@Test', 'Marks method as JUnit 5 test case.'),
        L('void sum() {', 'Test method name describes behavior.'),
        L('    assertEquals(5, calculator.add(2, 2));', 'Expected 5, actual 2+2=4 → test fails.'),
        L('}', 'End test — failure reported in test report.'),
      ],
    ),
  ],

  security: [
    puzzle(
      'SQL injection fix',
      'Why is the second version safe?',
      `// Unsafe
stmt.executeQuery("SELECT * FROM users WHERE name = '" + input + "'");
// Safe
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE name = ?");
ps.setString(1, input);`,
      'PreparedStatement sends SQL and data separately — input cannot alter query structure',
      [
        L('// Unsafe', 'Concatenation embeds user input in SQL text.'),
        L('stmt.executeQuery("SELECT * FROM users WHERE name = \'" + input + "\'");', 'Malicious input can inject OR 1=1 etc.'),
        L('// Safe', 'Parameterized query pattern.'),
        L('PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE name = ?");', 'SQL structure fixed at prepare time.'),
        L('ps.setString(1, input);', 'Input bound as data value, not executable SQL.'),
      ],
    ),
  ],

  devops: [
    puzzle(
      'Docker layer caching',
      'Why copy pom.xml before source in a Java Dockerfile?',
      `COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests`,
      'Dependencies download only when pom.xml changes — faster rebuilds when only source changes',
      [
        L('COPY pom.xml .', 'Only manifest copied first — small layer.'),
        L('RUN mvn dependency:go-offline', 'Downloads deps; cached if pom unchanged.'),
        L('COPY src ./src', 'Source copied in separate layer.'),
        L('RUN mvn package -DskipTests', 'Compile uses cached deps layer when possible.'),
      ],
    ),
  ],

  general: [
    puzzle(
      'Array reference vs copy',
      'What prints?',
      `public class Arr {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = a;
        b[0] = 9;
        System.out.println(a[0]);
    }
}`,
      '9',
      [
        L('public class Arr {', 'Array reference demo.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        int[] a = {1, 2};', 'a points to int array on heap.'),
        L('        int[] b = a;', 'b holds same reference — not a clone.'),
        L('        b[0] = 9;', 'Mutates shared array through b.'),
        L('        System.out.println(a[0]);', 'a[0] also 9 → prints 9.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Switch fall-through',
      'Predict output (classic switch).',
      `public class Sw {
    public static void main(String[] args) {
        int x = 2;
        switch (x) {
            case 1: System.out.print("A");
            case 2: System.out.print("B");
            case 3: System.out.print("C");
            default: System.out.print("D");
        }
    }
}`,
      'BCD',
      [
        L('public class Sw {', 'Switch fall-through demo.'),
        L('    public static void main(String[] args) {', 'main.'),
        L('        int x = 2;', 'x matches case 2.'),
        L('        switch (x) {', 'Switch on x.'),
        L('            case 1: System.out.print("A");', 'Skipped.'),
        L('            case 2: System.out.print("B");', 'Matches — prints B, no break.'),
        L('            case 3: System.out.print("C");', 'Falls through — prints C.'),
        L('            default: System.out.print("D");', 'Falls through — prints D.'),
        L('        }', 'End switch — output BCD.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
    puzzle(
      'Ternary and autoboxing',
      'What prints?',
      `public class Box {
    public static void main(String[] args) {
        Integer a = null;
        Integer b = 1;
        System.out.println(a != null ? a : b);
    }
}`,
      '1',
      [
        L('public class Box {', 'Null-safe ternary.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        Integer a = null;', 'a is null.'),
        L('        Integer b = 1;', 'b is 1.'),
        L('        System.out.println(a != null ? a : b);', 'Condition false → picks b → prints 1.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],
};

/** Topic-specific puzzles keyed by topic id */
export const TOPIC_SPECIFIC = {
  'hello-world': [
    puzzle(
      'Classic Hello World',
      'Run this program. What appears on the console?',
      `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      'Hello, World!',
      [
        L('public class HelloWorld {', 'Public class name must match filename HelloWorld.java.'),
        L('    public static void main(String[] args) {', 'JVM entry point — static so no instance needed.'),
        L('        System.out.println("Hello, World!");', 'println writes text and appends newline.'),
        L('    }', 'End main method.'),
        L('}', 'End class — compile with javac, run with java HelloWorld.'),
      ],
    ),
    puzzle(
      'Args length',
      'Run: java HelloArgs one two — what prints?',
      `public class HelloArgs {
    public static void main(String[] args) {
        System.out.println(args.length);
    }
}`,
      '2',
      [
        L('public class HelloArgs {', 'Program using command-line arguments.'),
        L('    public static void main(String[] args) {', 'args is String[] of CLI tokens.'),
        L('        System.out.println(args.length);', 'Two tokens "one" and "two" → prints 2.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],
  'inheritance': [
    puzzle(
      'super and field hiding',
      'Predict output.',
      `class Parent { int x = 10; }
class Child extends Parent { int x = 20; }
public class Hide {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x);
    }
}`,
      '10',
      [
        L('class Parent { int x = 10; }', 'Parent field x=10.'),
        L('class Child extends Parent { int x = 20; }', 'Child hides Parent.x with its own x=20.'),
        L('public class Hide {', 'Driver.'),
        L('    public static void main(String[] args) {', 'main.'),
        L('        Parent p = new Child();', 'Reference type Parent — field access uses Parent.x.'),
        L('        System.out.println(p.x);', 'Field hiding (not overriding) → prints 10.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],
  'lambda-expressions': [
    puzzle(
      'Lambda as Runnable',
      'What prints?',
      `public class Lam {
    public static void main(String[] args) {
        Runnable r = () -> System.out.print("run");
        r.run();
    }
}`,
      'run',
      [
        L('public class Lam {', 'Lambda demo.'),
        L('    public static void main(String[] args) {', 'Entry.'),
        L('        Runnable r = () -> System.out.print("run");', 'Lambda implements Runnable.run.'),
        L('        r.run();', 'Executes lambda body → prints run.'),
        L('    }', 'End main.'),
        L('}', 'End class.'),
      ],
    ),
  ],
  'virtual-threads': [
    puzzle(
      'Virtual thread start',
      'What concept does this demonstrate?',
      `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> System.out.println("lightweight"));
}`,
      'lightweight (printed on a virtual thread — cheap to create millions)',
      [
        L('try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {', 'Executor spawns new virtual thread per task.'),
        L('    executor.submit(() -> System.out.println("lightweight"));', 'Task runs on virtual thread, not platform thread.'),
        L('}', 'Executor closed — waits for submitted tasks to finish.'),
      ],
    ),
  ],
};
