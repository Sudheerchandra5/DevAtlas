const corePart2 = {
  "encapsulation": {
    definition: "Encapsulation bundles state and behavior inside a class, using access modifiers to protect invariants.",
    syntax: [
      {
        label: "Encapsulated account class",
        code: `public class Account {
    private double balance;

    public Account(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}`
      },
      {
        label: "Validation in setter",
        code: `public void setBalance(double balance) {
    if (balance < 0) {
        throw new IllegalArgumentException("Balance cannot be negative");
    }
    this.balance = balance;
}`
      },
    ],
    interview: [
      {
        question: "What is Encapsulation in Java?",
        answer: "Encapsulation bundles state and behavior inside a class, using access modifiers to protect invariants.",
      },
      {
        question: "Why is Encapsulation important in Java development?",
        answer: "It ensures objects guard their data so callers rely on stable contracts instead of fields or internal structure.",
      },
      {
        question: "How do you implement encapsulation in practice?",
        answer: "Declare fields private, expose final getters, and validate inputs before mutating state through methods.",
        syntax: {
          label: "Encapsulated account class",
          code: `public class Account {
    private double balance;

    public Account(double balance) {
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using encapsulation?",
        answer: "Exposing mutable fields or providing setters without validation undermines the encapsulation boundary.",
      },
      {
        question: "How does encapsulation fit with adjacent concepts or best practices?",
        answer: "Combine encapsulation with immutable value objects or builders so invariants are enforced at construction time.",
      },
    ]
  },
  "inheritance": {
    definition: "Inheritance lets a subclass reuse and specialize the members of a parent class via the extends keyword.",
    syntax: [
      {
        label: "Base and derived classes",
        code: `public class Vehicle {
    public void start() {
        System.out.println("Vehicle ready");
    }
}

public class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car ready");
    }
}`
      },
      {
        label: "Protected constructor",
        code: `public class Vehicle {
    private final String type;

    protected Vehicle(String type) {
        this.type = type;
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Inheritance in Java?",
        answer: "Inheritance lets a subclass reuse and specialize the members of a parent class via the extends keyword.",
      },
      {
        question: "Why is Inheritance important in Java development?",
        answer: "It reduces duplication when there is a clear is-a relationship and promotes polymorphic behavior.",
      },
      {
        question: "How do you implement inheritance in practice?",
        answer: "Extend a base class, call super() in constructors, and override protected methods where specialization is needed.",
        syntax: {
          label: "Base and derived classes",
          code: `public class Vehicle {
    public void start() {
        System.out.println("Vehicle ready");
    }
}

public class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car ready");
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using inheritance?",
        answer: "Overloading the hierarchy or leaking implementation details can make the system fragile and hard to refactor.",
      },
      {
        question: "How does inheritance fit with adjacent concepts or best practices?",
        answer: "Favor composition, keep base classes shallow, and mark non-overridden contracts as final.",
      },
    ]
  },
  "polymorphism": {
    definition: "Polymorphism allows code to invoke the same interface on different runtime types, letting subclasses provide behavior variants.",
    syntax: [
      {
        label: "Runtime polymorphism with interface",
        code: `interface PaymentProcessor {
    void process(java.math.BigDecimal amount);
}

class CreditCardProcessor implements PaymentProcessor {
    public void process(java.math.BigDecimal amount) {
        System.out.println("Processing " + amount);
    }
}

PaymentProcessor processor = new CreditCardProcessor();
processor.process(java.math.BigDecimal.valueOf(50));`
      },
      {
        label: "Abstract handler",
        code: `abstract class Handler {
    abstract void handle(String payload);
}

class JsonHandler extends Handler {
    void handle(String payload) {
        System.out.println("JSON: " + payload);
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Polymorphism in Java?",
        answer: "Polymorphism allows code to invoke the same interface on different runtime types, letting subclasses provide behavior variants.",
      },
      {
        question: "Why is Polymorphism important in Java development?",
        answer: "It makes algorithms work over abstractions rather than concrete classes, which is essential for extensibility.",
      },
      {
        question: "How do you implement polymorphism in practice?",
        answer: "Program to interfaces or abstract classes, override methods, and assign subclass instances to base references.",
        syntax: {
          label: "Runtime polymorphism with interface",
          code: `interface PaymentProcessor {
    void process(java.math.BigDecimal amount);
}

class CreditCardProcessor implements PaymentProcessor {
    public void process(java.math.BigDecimal amount) {
        System.out.println("Processing " + amount);
    }
}

PaymentProcessor processor = new CreditCardProcessor();
processor.process(java.math.BigDecimal.valueOf(50));`
        },
      },
      {
        question: "What common pitfalls should you avoid when using polymorphism?",
        answer: "Incorrect downcasts, missing @Override, or exposing subclass-specific APIs break the abstraction.",
      },
      {
        question: "How does polymorphism fit with adjacent concepts or best practices?",
        answer: "Declare variables with the abstraction type and keep overriding methods focused on the contract, not concrete state.",
      },
    ]
  },
  "abstraction": {
    definition: "Abstraction lets you expose essential behavior while hiding internal implementation details through interfaces or abstract classes.",
    syntax: [
      {
        label: "Abstract repository",
        code: `public abstract class Repository<T> {
    public abstract void save(T item);

    public void log(String activity) {
        System.out.println(activity);
    }
}`
      },
      {
        label: "Interface-driven service",
        code: `public interface Notifier {
    void notify(String message);
}`
      },
    ],
    interview: [
      {
        question: "What is Abstraction in Java?",
        answer: "Abstraction lets you expose essential behavior while hiding internal implementation details through interfaces or abstract classes.",
      },
      {
        question: "Why is Abstraction important in Java development?",
        answer: "It keeps APIs small so callers focus on what code does rather than how it does it.",
      },
      {
        question: "How do you implement abstraction in practice?",
        answer: "Declare abstract methods, expose only the contract, and place reusable helpers in the base abstraction.",
        syntax: {
          label: "Abstract repository",
          code: `public abstract class Repository<T> {
    public abstract void save(T item);

    public void log(String activity) {
        System.out.println(activity);
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using abstraction?",
        answer: "Leaking private helpers through the public contract defeats the abstraction and couples clients to internals.",
      },
      {
        question: "How does abstraction fit with adjacent concepts or best practices?",
        answer: "Document the contract, keep implementation-specific hooks protected, and default to final methods where mutations are unwanted.",
      },
    ]
  },
  "interfaces": {
    definition: "Interfaces define contracts that multiple classes can implement, specifying methods without dictating storage.",
    syntax: [
      {
        label: "Basic interface",
        code: `public interface Flyable {
    void fly();

    default void checkStatus() {
        System.out.println("All systems go");
    }
}`
      },
      {
        label: "Multiple inheritance via interfaces",
        code: `public class Drone implements Flyable, Runnable {
    public void fly() { /* ... */ }
    public void run() { fly(); }
}`
      },
    ],
    interview: [
      {
        question: "What is Interfaces in Java?",
        answer: "Interfaces define contracts that multiple classes can implement, specifying methods without dictating storage.",
      },
      {
        question: "Why is Interfaces important in Java development?",
        answer: "They decouple clients from implementations, enabling testing through mocks or alternative strategies.",
      },
      {
        question: "How do you implement interfaces in practice?",
        answer: "Declare method signatures, use default/static helpers, and let classes implement multiple interfaces.",
        syntax: {
          label: "Basic interface",
          code: `public interface Flyable {
    void fly();

    default void checkStatus() {
        System.out.println("All systems go");
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using interfaces?",
        answer: "Adding methods without default implementations breaks existing implementations.",
      },
      {
        question: "How does interfaces fit with adjacent concepts or best practices?",
        answer: "Name interfaces after the behavior they capture and keep default implementations limited to shared utilities.",
      },
    ]
  },
  "enums": {
    definition: "Enums represent a fixed set of constants with optional behavior, making code more type safe than raw ints or strings.",
    syntax: [
      {
        label: "Enum with behavior",
        code: `public enum Status {
    NEW, PROCESSING, DONE;

    public boolean isFinal() {
        return this == DONE;
    }
}`
      },
      {
        label: "Custom fields",
        code: `public enum LogLevel {
    INFO(1), WARN(2), ERROR(3);

    private final int severity;

    private LogLevel(int severity) {
        this.severity = severity;
    }

    public int getSeverity() {
        return severity;
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Enums in Java?",
        answer: "Enums represent a fixed set of constants with optional behavior, making code more type safe than raw ints or strings.",
      },
      {
        question: "Why is Enums important in Java development?",
        answer: "They document allowed values and let you attach methods, fields, and constructor logic within the enum body.",
      },
      {
        question: "How do you implement enums in practice?",
        answer: "Declare enum constants, private fields, and helper methods to encapsulate related logic.",
        syntax: {
          label: "Enum with behavior",
          code: `public enum Status {
    NEW, PROCESSING, DONE;

    public boolean isFinal() {
        return this == DONE;
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using enums?",
        answer: "Using enums for mutable, shared state or exposing fields publicly undermines their safety.",
      },
      {
        question: "How does enums fit with adjacent concepts or best practices?",
        answer: "Add behavior for derived properties inside the enum and keep constructors private.",
      },
    ]
  },
  "static-nested": {
    definition: "Static nested classes live within another class but do not capture the outer instance, so they behave like top-level classes scoped for grouping.",
    syntax: [
      {
        label: "Static factory builder",
        code: `public class House {
    private final int rooms;

    private House(Builder builder) {
        this.rooms = builder.rooms;
    }

    public static class Builder {
        private int rooms;

        public Builder rooms(int rooms) {
            this.rooms = rooms;
            return this;
        }

        public House build() {
            return new House(this);
        }
    }
}`
      },
      {
        label: "Static nested utility",
        code: `public class Graph {
    public static class Edge {
        private final int from;
        private final int to;

        public Edge(int from, int to) {
            this.from = from;
            this.to = to;
        }
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Static nested classes in Java?",
        answer: "Static nested classes live within another class but do not capture the outer instance, so they behave like top-level classes scoped for grouping.",
      },
      {
        question: "Why is Static nested classes important in Java development?",
        answer: "They keep helper or builder classes close to the owning type without leaking API surface.",
      },
      {
        question: "How do you implement static nested classes in practice?",
        answer: "Declare the nested class static, keep constructors private, and allow fluent builder patterns through the outer class.",
        syntax: {
          label: "Static factory builder",
          code: `public class House {
    private final int rooms;

    private House(Builder builder) {
        this.rooms = builder.rooms;
    }

    public static class Builder {
        private int rooms;

        public Builder rooms(int rooms) {
            this.rooms = rooms;
            return this;
        }

        public House build() {
            return new House(this);
        }
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using static nested classes?",
        answer: "Declaring the nested class non-static when it does not need the outer instance adds unnecessary references.",
      },
      {
        question: "How does static nested classes fit with adjacent concepts or best practices?",
        answer: "Use private static nested builders for immutable types and expose only a factory method or builder entry point.",
      },
    ]
  },
  "object-class": {
    definition: "java.lang.Object is the root of the class hierarchy, providing equals, hashCode, toString, and clone contracts.",
    syntax: [
      {
        label: "Overriding equals and hashCode",
        code: `@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Person person = (Person) o;
    return Objects.equals(id, person.id);
}

@Override
public int hashCode() {
    return Objects.hash(id);
}`
      },
      {
        label: "Using Object utilities",
        code: `Object value = Objects.requireNonNull(result, "result required");
System.out.println(value.getClass().getName());`
      },
    ],
    interview: [
      {
        question: "What is java.lang.Object in Java?",
        answer: "java.lang.Object is the root of the class hierarchy, providing equals, hashCode, toString, and clone contracts.",
      },
      {
        question: "Why is java.lang.Object important in Java development?",
        answer: "All classes inherit these methods, so overriding them consistently is essential for collections and debugging.",
      },
      {
        question: "How do you implement java.lang.object in practice?",
        answer: "Override equals and hashCode together, return Objects.hash(...) for reliability, and keep toString informative.",
        syntax: {
          label: "Overriding equals and hashCode",
          code: `@Override
public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Person person = (Person) o;
    return Objects.equals(id, person.id);
}

@Override
public int hashCode() {
    return Objects.hash(id);
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using java.lang.object?",
        answer: "Using Object's default implementations on mutable data or forgetting to include all key fields in equals/hashCode.",
      },
      {
        question: "How does java.lang.object fit with adjacent concepts or best practices?",
        answer: "Use Objects.requireNonNull to validate inputs before passing them to equals/hashCode and document the semantics.",
      },
    ]
  },
  "collections": {
    definition: "The Collections framework supplies interfaces and implementations for grouping data, such as List, Set, and Map.",
    syntax: [
      {
        label: "Working with collections",
        code: `List<String> names = new ArrayList<>();
Collections.addAll(names, "Ada", "Linus", "Grace");
Set<String> unique = new HashSet<>(names);`
      },
      {
        label: "Synchronized wrapper",
        code: `List<String> safeList = Collections.synchronizedList(new ArrayList<>());`
      },
    ],
    interview: [
      {
        question: "What is Collections framework in Java?",
        answer: "The Collections framework supplies interfaces and implementations for grouping data, such as List, Set, and Map.",
      },
      {
        question: "Why is Collections framework important in Java development?",
        answer: "Using the standard APIs ensures interoperability, thread-safety wrappers, and access to Algorithms utilities.",
      },
      {
        question: "How do you implement collections framework in practice?",
        answer: "Program to interfaces like List<T> and supply concrete implementations when instantiating.",
        syntax: {
          label: "Working with collections",
          code: `List<String> names = new ArrayList<>();
Collections.addAll(names, "Ada", "Linus", "Grace");
Set<String> unique = new HashSet<>(names);`
        },
      },
      {
        question: "What common pitfalls should you avoid when using collections framework?",
        answer: "Relying on implementation-specific iteration order or mutating collections during iteration without using iterators.",
      },
      {
        question: "How does collections framework fit with adjacent concepts or best practices?",
        answer: "Return immutable views or copies, and prefer unmodifiable wrappers for public APIs.",
      },
    ]
  },
  "iterable-iterator": {
    definition: "Iterable exposes an Iterator, enabling for-each loops while Iterator handles element traversal and removal.",
    syntax: [
      {
        label: "Custom iterable",
        code: `public class Range implements Iterable<Integer> {
    private final int start;
    private final int end;

    public Range(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current < end;
            }

            @Override
            public Integer next() {
                return current++;
            }
        };
    }
}`
      },
      {
        label: "Using iterator",
        code: `Iterator<String> it = names.iterator();
while (it.hasNext()) {
    String name = it.next();
    if (name.isEmpty()) {
        it.remove();
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Iterable and Iterator in Java?",
        answer: "Iterable exposes an Iterator, enabling for-each loops while Iterator handles element traversal and removal.",
      },
      {
        question: "Why is Iterable and Iterator important in Java development?",
        answer: "Implementing Iterable lets you plug custom collections into for-each loops and APIs that accept Iterable<T>.",
      },
      {
        question: "How do you implement iterable and iterator in practice?",
        answer: "Return a fresh Iterator implementation, make hasNext/next thread-safe if needed, and support remove carefully.",
        syntax: {
          label: "Custom iterable",
          code: `public class Range implements Iterable<Integer> {
    private final int start;
    private final int end;

    public Range(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    public Iterator<Integer> iterator() {
        return new Iterator<>() {
            private int current = start;

            @Override
            public boolean hasNext() {
                return current < end;
            }

            @Override
            public Integer next() {
                return current++;
            }
        };
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using iterable and iterator?",
        answer: "Returning the same iterator instance or mutating the underlying collection outside of Iterator's remove.",
      },
      {
        question: "How does iterable and iterator fit with adjacent concepts or best practices?",
        answer: "Design iterators that throw ConcurrentModificationException when concurrent updates occur to catch bugs early.",
      },
    ]
  },
  "list-implementations": {
    definition: "ArrayList, LinkedList, and CopyOnWriteArrayList are common List implementations tuned for different use cases.",
    syntax: [
      {
        label: "ArrayList usage",
        code: `List<String> queue = new ArrayList<>(100);
queue.add("task");
String head = queue.remove(0);`
      },
      {
        label: "LinkedList as deque",
        code: `Deque<String> history = new LinkedList<>();
history.addFirst("start");
history.addLast("end");`
      },
    ],
    interview: [
      {
        question: "What is List implementations in Java?",
        answer: "ArrayList, LinkedList, and CopyOnWriteArrayList are common List implementations tuned for different use cases.",
      },
      {
        question: "Why is List implementations important in Java development?",
        answer: "Picking the right implementation avoids surprises in performance when removing, inserting, or iterating.",
      },
      {
        question: "How do you implement list implementations in practice?",
        answer: "Use ArrayList for fast random access, LinkedList for queue semantics, and CopyOnWriteArrayList for concurrent readers.",
        syntax: {
          label: "ArrayList usage",
          code: `List<String> queue = new ArrayList<>(100);
queue.add("task");
String head = queue.remove(0);`
        },
      },
      {
        question: "What common pitfalls should you avoid when using list implementations?",
        answer: "Treating LinkedList like an array-backed list for random access or ignoring thread-safety when using CopyOnWriteArrayList.",
      },
      {
        question: "How does list implementations fit with adjacent concepts or best practices?",
        answer: "Document the concurrency and performance characteristics of the list you expose; prefer immutable copies for APIs.",
      },
    ]
  },
  "map-set-internals": {
    definition: "HashMap and HashSet rely on hash buckets and chain or tree nodes to store entries, while Linked variants keep insertion order.",
    syntax: [
      {
        label: "HashMap example",
        code: `Map<String, Integer> counts = new HashMap<>();
counts.merge(key, 1, Integer::sum);`
      },
      {
        label: "LinkedHashSet order",
        code: `Set<String> visited = new LinkedHashSet<>();
visited.add("first");
visited.add("second");`
      },
    ],
    interview: [
      {
        question: "What is Map and Set internals in Java?",
        answer: "HashMap and HashSet rely on hash buckets and chain or tree nodes to store entries, while Linked variants keep insertion order.",
      },
      {
        question: "Why is Map and Set internals important in Java development?",
        answer: "Understanding internals helps you choose between predictable ordering and performance.",
      },
      {
        question: "How do you implement map and set internals in practice?",
        answer: "Provide robust equals/hashCode, choose load factor, and consider LinkedHashMap if order matters.",
        syntax: {
          label: "HashMap example",
          code: `Map<String, Integer> counts = new HashMap<>();
counts.merge(key, 1, Integer::sum);`
        },
      },
      {
        question: "What common pitfalls should you avoid when using map and set internals?",
        answer: "Using mutable keys or neglecting hashCode/equality consistency leads to lost entries and corrupted invariants.",
      },
      {
        question: "How does map and set internals fit with adjacent concepts or best practices?",
        answer: "Prefer Map.of for fixed data, protect mutable maps with unmodifiable wrappers, and document expected ordering.",
      },
    ]
  },
  "comparable-comparator": {
    definition: "Comparable defines a natural ordering via compareTo, while Comparator describes alternate orders passed into sorting routines.",
    syntax: [
      {
        label: "Comparable implementation",
        code: `class Person implements Comparable<Person> {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Person other) {
        return name.compareTo(other.name);
    }
}`
      },
      {
        label: "Comparator usage",
        code: `Comparator<Person> byAge = Comparator.comparingInt(Person::getAge);
Collections.sort(people, byAge);`
      },
    ],
    interview: [
      {
        question: "What is Comparable and Comparator in Java?",
        answer: "Comparable defines a natural ordering via compareTo, while Comparator describes alternate orders passed into sorting routines.",
      },
      {
        question: "Why is Comparable and Comparator important in Java development?",
        answer: "Collections.sort, PriorityQueue, and TreeSet rely on consistent comparisons.",
      },
      {
        question: "How do you implement comparable and comparator in practice?",
        answer: "Implement Comparable.compareTo carefully, supply Comparator via Comparator.comparing and method references for different criteria.",
        syntax: {
          label: "Comparable implementation",
          code: `class Person implements Comparable<Person> {
    private final String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public int compareTo(Person other) {
        return name.compareTo(other.name);
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using comparable and comparator?",
        answer: "Inconsistent comparison with equals or returning zero for different objects breaks sets and maps.",
      },
      {
        question: "How does comparable and comparator fit with adjacent concepts or best practices?",
        answer: "Keep comparison symmetric, transitive, and consistent with equals; use Comparator.nullsFirst for nullable fields.",
      },
    ]
  },
  "generics-basics": {
    definition: "Generics parameterize classes and methods with type variables so callers get compile-time type safety.",
    syntax: [
      {
        label: "Generic repository",
        code: `public class Repository<T> {
    public void save(T item) {
        System.out.println("Saving " + item);
    }
}`
      },
      {
        label: "Method with wildcards",
        code: `public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    dest.addAll(src);
}`
      },
    ],
    interview: [
      {
        question: "What is Generics in Java?",
        answer: "Generics parameterize classes and methods with type variables so callers get compile-time type safety.",
      },
      {
        question: "Why is Generics important in Java development?",
        answer: "They reduce casting and make APIs more expressive about the element type they consume or produce.",
      },
      {
        question: "How do you implement generics in practice?",
        answer: "Declare classes or methods with angle-bracket parameters (e.g., class Repository<T>) and use bounded wildcards to relax variance.",
        syntax: {
          label: "Generic repository",
          code: `public class Repository<T> {
    public void save(T item) {
        System.out.println("Saving " + item);
    }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using generics?",
        answer: "Using raw types or erasing generic type information in APIs defeats the purpose.",
      },
      {
        question: "How does generics fit with adjacent concepts or best practices?",
        answer: "Expose interfaces with bounded wildcards, keep implementation details hidden, and annotate helper methods with @SafeVarargs when appropriate.",
      },
    ]
  },
  "exception-handling": {
    definition: "Exception handling uses try-catch-finally or try-with-resources to tame failures without crashing the JVM.",
    syntax: [
      {
        label: "Try-with-resources",
        code: `try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
    return reader.readLine();
}`
      },
      {
        label: "Custom exception",
        code: `public class DataException extends RuntimeException {
    public DataException(String message, Throwable cause) {
        super(message, cause);
    }
}`
      },
    ],
    interview: [
      {
        question: "What is Exception handling in Java?",
        answer: "Exception handling uses try-catch-finally or try-with-resources to tame failures without crashing the JVM.",
      },
      {
        question: "Why is Exception handling important in Java development?",
        answer: "It keeps services resilient and lets you recover gracefully when dependencies misbehave.",
      },
      {
        question: "How do you implement exception handling in practice?",
        answer: "Catch only the exceptions you can handle, release resources in finally or try-with-resources, and wrap checked errors in domain-specific exceptions when surfacing them.",
        syntax: {
          label: "Try-with-resources",
          code: `try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
    return reader.readLine();
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using exception handling?",
        answer: "Catching Exception or Throwable broadly hides bugs and makes debugging harder.",
      },
      {
        question: "How does exception handling fit with adjacent concepts or best practices?",
        answer: "Document which checked exceptions a method throws and prefer unchecked wrappers for lower layers.",
      },
    ]
  },
  "file-io": {
    definition: "File I/O uses streams, readers, writers, and the java.nio.file API to move data to and from disk.",
    syntax: [
      {
        label: "Reading file with Files",
        code: `Path path = Paths.get("data.csv");
try (java.util.stream.Stream<String> lines = Files.lines(path)) {
    lines.forEach(System.out::println);
}`
      },
      {
        label: "Writing file",
        code: `Files.writeString(path, "content", StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);`
      },
    ],
    interview: [
      {
        question: "What is File I/O in Java?",
        answer: "File I/O uses streams, readers, writers, and the java.nio.file API to move data to and from disk.",
      },
      {
        question: "Why is File I/O important in Java development?",
        answer: "Efficient disk access is foundational for persistence, configuration loading, and logging.",
      },
      {
        question: "How do you implement file i/o in practice?",
        answer: "Prefer java.nio.file.Files with try-with-resources, buffer streams, and specify charset explicitly.",
        syntax: {
          label: "Reading file with Files",
          code: `Path path = Paths.get("data.csv");
try (java.util.stream.Stream<String> lines = Files.lines(path)) {
    lines.forEach(System.out::println);
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using file i/o?",
        answer: "Forgetting to close files or depending on platform-specific line endings.",
      },
      {
        question: "How does file i/o fit with adjacent concepts or best practices?",
        answer: "Use Paths and Files, minimize copying large files in memory, and log errors near the boundary.",
      },
    ]
  },
  "serialization": {
    definition: "Serialization converts object graphs into bytes for caching or transport, and deserialization rebuilds them.",
    syntax: [
      {
        label: "Serializable class",
        code: `public class User implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
    private final String name;
}`
      },
      {
        label: "Custom writeObject",
        code: `private void writeObject(java.io.ObjectOutputStream out) throws java.io.IOException {
    out.defaultWriteObject();
    out.writeLong(createdAt.toEpochMilli());
}`
      },
    ],
    interview: [
      {
        question: "What is Serialization in Java?",
        answer: "Serialization converts object graphs into bytes for caching or transport, and deserialization rebuilds them.",
      },
      {
        question: "Why is Serialization important in Java development?",
        answer: "It is useful for remote communication, persistence, and messaging when a standardized format is required.",
      },
      {
        question: "How do you implement serialization in practice?",
        answer: "Implement Serializable, declare a serialVersionUID, and customize writeObject/readObject when needed.",
        syntax: {
          label: "Serializable class",
          code: `public class User implements java.io.Serializable {
    private static final long serialVersionUID = 1L;
    private final String name;
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using serialization?",
        answer: "Omitting serialVersionUID or serializing mutable static fields can break compatibility.",
      },
      {
        question: "How does serialization fit with adjacent concepts or best practices?",
        answer: "Favor defensive copies and transient fields for sensitive data, and test compatibility across versions.",
      },
    ]
  },
  "date-time": {
    definition: "The java.time API provides immutable types like LocalDateTime and ZonedDateTime for handling time reliably.",
    syntax: [
      {
        label: "Create LocalDateTime",
        code: `LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
Duration sinceStart = Duration.between(start, now);`
      },
      {
        label: "Formatting and parsing",
        code: `DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
ZonedDateTime parsed = ZonedDateTime.parse(text, formatter);`
      },
    ],
    interview: [
      {
        question: "What is Date-Time API in Java?",
        answer: "The java.time API provides immutable types like LocalDateTime and ZonedDateTime for handling time reliably.",
      },
      {
        question: "Why is Date-Time API important in Java development?",
        answer: "It replaces legacy java.util.Date with clearer timezone and formatting semantics.",
      },
      {
        question: "How do you implement date-time api in practice?",
        answer: "Use ZoneId, DateTimeFormatter, and Duration/Period for intervals and always store instants in UTC when crossing services.",
        syntax: {
          label: "Create LocalDateTime",
          code: `LocalDateTime now = LocalDateTime.now(ZoneId.of("UTC"));
Duration sinceStart = Duration.between(start, now);`
        },
      },
      {
        question: "What common pitfalls should you avoid when using date-time api?",
        answer: "Mixing LocalDate with ZonedDateTime or relying on default time zone leads to subtle bugs.",
      },
      {
        question: "How does date-time api fit with adjacent concepts or best practices?",
        answer: "Store instants, convert at the edges, and prefer ISO format when serializing.",
      },
    ]
  },
  "packages-modules": {
    definition: "Packages group related classes, and modules define stronger encapsulation boundaries via module-info.java.",
    syntax: [
      {
        label: "Package declaration",
        code: `package com.acme.payment;

public class Processor {
    public void process() { /* ... */ }
}`
      },
      {
        label: "Module descriptor",
        code: `module com.acme.payment {
    exports com.acme.payment.api;
    requires java.logging;
}`
      },
    ],
    interview: [
      {
        question: "What is Packages and modules in Java?",
        answer: "Packages group related classes, and modules define stronger encapsulation boundaries via module-info.java.",
      },
      {
        question: "Why is Packages and modules important in Java development?",
        answer: "They keep large codebases organized and control which APIs are exposed.",
      },
      {
        question: "How do you implement packages and modules in practice?",
        answer: "Declare package statements at the top and provide module descriptors listing exports and requirements.",
        syntax: {
          label: "Package declaration",
          code: `package com.acme.payment;

public class Processor {
    public void process() { /* ... */ }
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using packages and modules?",
        answer: "Exporting implementation packages or requiring modules unnecessarily increases coupling.",
      },
      {
        question: "How does packages and modules fit with adjacent concepts or best practices?",
        answer: "Only export API packages, hide internal utilities, and document module-level contracts.",
      },
    ]
  },
  "classpath-jar": {
    definition: "The classpath instructs the JVM where to find class files, and JAR bundles package classes with metadata.",
    syntax: [
      {
        label: "Manifest snippet",
        code: `Main-Class: com.acme.Main`
      },
      {
        label: "Running a jar",
        code: `java -jar payment-service.jar`
      },
    ],
    interview: [
      {
        question: "What is Classpath and JARs in Java?",
        answer: "The classpath instructs the JVM where to find class files, and JAR bundles package classes with metadata.",
      },
      {
        question: "Why is Classpath and JARs important in Java development?",
        answer: "Correct classpath resolution prevents NoClassDefFoundError and ensures services pick up the right versions.",
      },
      {
        question: "How do you implement classpath and jars in practice?",
        answer: "List dependencies on the classpath, provide Main-Class in the manifest, and avoid duplicate classes across jars.",
        syntax: {
          label: "Manifest snippet",
          code: `Main-Class: com.acme.Main`
        },
      },
      {
        question: "What common pitfalls should you avoid when using classpath and jars?",
        answer: "Forgetting required jars or using relative paths that differ per environment causes runtime failures.",
      },
      {
        question: "How does classpath and jars fit with adjacent concepts or best practices?",
        answer: "Use build tools to manage the classpath, pin dependency versions, and run smoke tests on the assembled JAR.",
      },
    ]
  },
  "objects-utility": {
    definition: "The Objects helper class provides null-safe utilities like requireNonNull, hash, and compare.",
    syntax: [
      {
        label: "Objects helpers",
        code: `Objects.requireNonNull(value, "value required");
return Objects.hash(id, type);`
      },
      {
        label: "Objects.compare",
        code: `return Objects.compare(a, b, Comparator.nullsFirst(Comparator.naturalOrder()));`
      },
    ],
    interview: [
      {
        question: "What is Objects utility in Java?",
        answer: "The Objects helper class provides null-safe utilities like requireNonNull, hash, and compare.",
      },
      {
        question: "Why is Objects utility important in Java development?",
        answer: "It simplifies null checks and makes equals/hashCode implementations more concise.",
      },
      {
        question: "How do you implement objects utility in practice?",
        answer: "Call Objects.requireNonNull for constructor arguments and Objects.hash when combining fields.",
        syntax: {
          label: "Objects helpers",
          code: `Objects.requireNonNull(value, "value required");
return Objects.hash(id, type);`
        },
      },
      {
        question: "What common pitfalls should you avoid when using objects utility?",
        answer: "Using Objects.equals for identity comparisons or requiring non-null without descriptive messages.",
      },
      {
        question: "How does objects utility fit with adjacent concepts or best practices?",
        answer: "Pair Objects.requireNonNull with meaningful messages and use Objects.compare for consistent ordering.",
      },
    ]
  },
  "annotations": {
    definition: "Annotations attach metadata to code elements and drive compile-time or runtime behavior.",
    syntax: [
      {
        label: "Custom annotation",
        code: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Audit {
    String value();
}`
      },
      {
        label: "Applying annotation",
        code: `@Audit("payment")
public void process() {
    // implementation
}`
      },
    ],
    interview: [
      {
        question: "What is Annotations in Java?",
        answer: "Annotations attach metadata to code elements and drive compile-time or runtime behavior.",
      },
      {
        question: "Why is Annotations important in Java development?",
        answer: "Frameworks, tests, and tooling rely on annotations for configuration and introspection.",
      },
      {
        question: "How do you implement annotations in practice?",
        answer: "Define @interface, specify retention and target, and document required elements.",
        syntax: {
          label: "Custom annotation",
          code: `@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Audit {
    String value();
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using annotations?",
        answer: "Using runtime retention when compile-time would suffice or forgetting to annotate appropriate elements.",
      },
      {
        question: "How does annotations fit with adjacent concepts or best practices?",
        answer: "Keep annotation attributes explicit, provide defaults, and log when reflections fail.",
      },
    ]
  },
  "junit-basics": {
    definition: "JUnit annotations like @Test and assertion methods validate behavior in isolation.",
    syntax: [
      {
        label: "Simple test",
        code: `@Test
void calculateTotal() {
    assertEquals(50, calculator.total(List.of(20, 30)));
}`
      },
      {
        label: "Parameterized test",
        code: `@ParameterizedTest
@CsvSource({"1,2,3", "4,5,9"})
void adds(int a, int b, int sum) {
    assertEquals(sum, calculator.add(a, b));
}`
      },
    ],
    interview: [
      {
        question: "What is JUnit basics in Java?",
        answer: "JUnit annotations like @Test and assertion methods validate behavior in isolation.",
      },
      {
        question: "Why is JUnit basics important in Java development?",
        answer: "Automated tests catch regressions and speed up feedback loops for developers.",
      },
      {
        question: "How do you implement junit basics in practice?",
        answer: "Write @Test methods, use assertions from org.junit.jupiter.api.Assertions, and prefer @ParameterizedTest for data-driven cases.",
        syntax: {
          label: "Simple test",
          code: `@Test
void calculateTotal() {
    assertEquals(50, calculator.total(List.of(20, 30)));
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using junit basics?",
        answer: "Relying on shared mutable state or using Thread.sleep inside tests.",
      },
      {
        question: "How does junit basics fit with adjacent concepts or best practices?",
        answer: "Keep tests deterministic, small, and annotated with @DisplayName for documentation.",
      },
    ]
  },
  "properties-i18n": {
    definition: "Properties files store localized strings while ResourceBundle resolves the right file for a Locale.",
    syntax: [
      {
        label: "Loading ResourceBundle",
        code: `ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.ENGLISH);
String greeting = bundle.getString("welcome");`
      },
      {
        label: "Reading properties",
        code: `Properties props = new Properties();
try (InputStream in = Files.newInputStream(path)) {
    props.load(new InputStreamReader(in, StandardCharsets.UTF_8));
}`
      },
    ],
    interview: [
      {
        question: "What is Properties and i18n in Java?",
        answer: "Properties files store localized strings while ResourceBundle resolves the right file for a Locale.",
      },
      {
        question: "Why is Properties and i18n important in Java development?",
        answer: "They keep UI strings separate from code and enable running the same app in multiple languages.",
      },
      {
        question: "How do you implement properties and i18n in practice?",
        answer: "Load ResourceBundle.getBundle with the desired Locale and fall back to default bundles when keys are missing.",
        syntax: {
          label: "Loading ResourceBundle",
          code: `ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.ENGLISH);
String greeting = bundle.getString("welcome");`
        },
      },
      {
        question: "What common pitfalls should you avoid when using properties and i18n?",
        answer: "Hard-coding locale-specific text or forgetting to load UTF-8 encoded files.",
      },
      {
        question: "How does properties and i18n fit with adjacent concepts or best practices?",
        answer: "Use consistent keys, keep default bundles in English, and validate property files for duplicates.",
      },
    ]
  },
  "core-best-practices": {
    definition: "Core best practices embrace immutability, defensive coding, logging, and clear API contracts.",
    syntax: [
      {
        label: "Defensive copy",
        code: `public List<String> getTags() {
    return List.copyOf(tags);
}`
      },
      {
        label: "Logging and validation",
        code: `if (name == null) {
    throw new IllegalArgumentException("name");
}
logger.debug("Processing {}", name);`
      },
    ],
    interview: [
      {
        question: "What is Core best practices in Java?",
        answer: "Core best practices embrace immutability, defensive coding, logging, and clear API contracts.",
      },
      {
        question: "Why is Core best practices important in Java development?",
        answer: "They keep services reliable and maintainable as the codebase evolves.",
      },
      {
        question: "How do you implement core best practices in practice?",
        answer: "Return unmodifiable collections, validate inputs early, and log at the edges before propagating errors.",
        syntax: {
          label: "Defensive copy",
          code: `public List<String> getTags() {
    return List.copyOf(tags);
}`
        },
      },
      {
        question: "What common pitfalls should you avoid when using core best practices?",
        answer: "Not documenting expectations or mutating shared data leads to subtle bugs.",
      },
      {
        question: "How does core best practices fit with adjacent concepts or best practices?",
        answer: "Pair defensive copies with clear method contracts and use assertions or checks only at the API boundary.",
      },
    ]
  },
};
export default corePart2;
