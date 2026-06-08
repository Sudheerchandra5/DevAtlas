export default {
  "what-is-java": {
    definition: "Java is a class-based, object-oriented language that compiles source code to JVM bytecode for cross-platform execution. It emphasizes a managed runtime with automatic memory management, a strong static type system, and a standardized core library. The language prioritizes backward compatibility so developers can rely on stable APIs and gradual enhancements.",
    syntax: [
      { label: "Compile step", code: "javac HelloWorld.java" },
      { label: "Class template", code: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Java\");\n    }\n}" }
    ],
    interview: [
      { question: "What distinguishes Java from other programming languages?", answer: "Java distinguishes itself by compiling to bytecode that runs on the JVM, which abstracts away the underlying hardware. Its static type checks, built-in concurrency primitives, and large standard library keep enterprise systems maintainable." },
      { question: "How does the JVM strengthen Java's portability?", answer: "The JVM interprets bytecode and enforces runtime safety checks so the same .class files run on Windows, Linux, or macOS without recompilation. This write-once-run-anywhere guarantee also allows vendors to optimize JIT compilation for each platform." },
      { question: "How do you demonstrate the Java compile-and-run cycle?", answer: "You run `javac HelloWorld.java` to emit bytecode and then execute `java HelloWorld` so the JVM loads the class and invokes `main`. This separation keeps compilation errors visible before runtime and isolates class loading concerns.", syntax: "javac HelloWorld.java" },
      { question: "Why are packages important in Java?", answer: "Packages organize classes into namespaces that prevent name collisions and support access controls with public and package-private visibility. They also make module boundaries explicit when you export APIs or restrict internal helpers." },
      { question: "What are common challenges when learning Java?", answer: "Beginners often struggle with checked exceptions and the verbosity of explicit type declarations, which feel heavy compared to scripting languages. Mastering the standard library and garbage collection behavior is what separates novice code from production-ready code." }
    ]
  },
  "setup-environment": {
    definition: "Setting up the Java environment means installing the JDK, configuring PATH, and verifying the runtime so your toolchain can compile and execute classes. It often involves selecting a consistent JDK version, setting JAVA_HOME, and ensuring build tools like Maven or Gradle pick the same runtime. Solid environment setup makes reproduction on team machines and CI easier.",
    syntax: [
      { label: "Install JDK", code: "winget install --id Oracle.JavaRuntime -e --source winget" },
      { label: "Configure variables", code: "setx JAVA_HOME \"C:\\Program Files\\Java\\jdk-21\"\nsetx PATH \"%JAVA_HOME%\\bin;%PATH%\"" }
    ],
    interview: [
      { question: "What does Java environment setup involve?", answer: "Java environment setup involves downloading a JDK, extracting it, and pointing JAVA_HOME plus PATH entries at its bin directory. The process also includes verifying java -version and javac -version so the CLI uses the intended compiler and runtime." },
      { question: "Why keep the environment consistent across machines?", answer: "Consistency avoids \"works on my machine\" failures because mismatched JDK versions or PATH entries change bytecode behavior and available APIs. CI servers, developers, and containers must reference the same runtime to prevent classfile incompatibilities." },
      { question: "How do you verify installation from the command line?", answer: "Running `java -version` and `javac -version` confirms that the PATH points to the selected JDK and that the compiler and runtime match. These commands also reveal the vendor and build flags needed for release builds.", syntax: "java -version" },
      { question: "What are common setup pitfalls?", answer: "Common pitfalls include leaving an outdated JRE ahead of the JDK on PATH, which hides the compiler, or forgetting to restart the shell after setx. Another issue is mixing 32-bit and 64-bit runtimes, which causes JNI failures when native libraries load." },
      { question: "How does environment setup affect build tools?", answer: "Build tools like Maven and Gradle respect JAVA_HOME or ToolchainManager settings to compile with a specific JDK, so the environment feeds into their execution. Providing an explicit `java.toolchain` configuration removes ambiguity when multiple JDKs are installed." }
    ]
  },
  "hello-world": {
    definition: "The Hello World program is the canonical first example that declares a class, defines `main`, and prints to the console. It teaches how to structure a Java source file, compile it, and inspect output from the runtime. The program also demonstrates the end-to-end workflow from text editor to executed bytecode.",
    syntax: [
      { label: "Hello World class", code: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}" },
      { label: "Compile and run", code: "javac HelloWorld.java\njava HelloWorld" }
    ],
    interview: [
      { question: "What does the Hello World program teach for Java learners?", answer: "It teaches the class structure, `main` signature, and how to print output for beginners. Seeing the console message confirms the JDK and editor are wired together." },
      { question: "Why is it still relevant today?", answer: "Because it isolates basic syntax from frameworks so you focus on class files, visibility, and statement order. It also verifies that tooling such as `javac` and `java` are functional before adding complexity." },
      { question: "How is Hello World implemented?", answer: "A simple class with `public static void main` prints to the console via `System.out.println`, showing how the JVM executes statements in order. It also introduces string literals, method invocation, and braces that delimit blocks.", syntax: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}" },
      { question: "What variations illustrate additional features?", answer: "Another variation passes `args` to print dynamic text or uses `System.out.printf` to format values, showing method overloading even in small programs. You can also extend Hello World with command-line arguments to demonstrate parsing before framework code exists." },
      { question: "How does Hello World help with debugging?", answer: "If Hello World fails, the errors direct you to `javac` output rather than business logic, which builds confidence in reading stack traces. The program also shows how to interpret compile-time versus runtime errors before working on logic flows." }
    ]
  },
  "comments-docs": {
    definition: "Comments and documentation describe intent without affecting execution, covering inline notes, block comments, and Javadoc for API surfaces. They reduce cognitive load for reviewers and generate reference materials developers consult when reusing code. Consistent documentation keeps teams aligned on behavior and expectations.",
    syntax: [
      { label: "Inline and block", code: "// Single line note\n/*\n * Multi-line note block\n */" },
      { label: "Javadoc example", code: "/**\n * Adds two numbers.\n * @param a first addend\n * @param b second addend\n * @return sum of a and b\n */\npublic int add(int a, int b) {\n    return a + b;\n}" }
    ],
    interview: [
      { question: "What comment styles does Java support?", answer: "Java supports single-line `//` comments, block `/* */` comments, and Javadoc `/** */` comments for API surfaces. Each style serves a different purpose, from quick reminders to machine-readable documentation." },
      { question: "Why invest in Javadoc comments?", answer: "Javadoc comments can be processed by the `javadoc` tool to generate HTML reference manuals that other developers rely on. They also tie directly to IDE tooltips so callers understand parameters, return values, and exceptions." },
      { question: "How do you document a method with Javadoc?", answer: "You place a Javadoc block before the method, describe the behavior, and annotate parameters with `@param` plus the return value with `@return`. This makes behavior explicit for consumers while keeping the method signature concise.", syntax: "/**\n * Computes the average.\n * @param values array of doubles\n * @return average value\n */\npublic double average(double[] values) {\n    return Arrays.stream(values).average().orElse(0);\n}" },
      { question: "When should comments change?", answer: "Comments should be updated whenever behavior changes so that they do not become misleading. If you rewrite a method, clean up or remove stale comments instead of letting them contradict the code." },
      { question: "How can documentation complement README and tests?", answer: "Documentation in-line clarifies implementation details while higher-level README files explain system goals and architecture. Tests serve as living proof of behavior, and comments can link to those tests or describe why a specific assertion exists." }
    ]
  },
  "syntax-rules": {
    definition: "Syntax rules govern package declarations, imports, class bodies, and the statements that live inside methods. The compiler expects complete statements to end with semicolons, control structures to provide braces, and expressions to remain unambiguous so parsing succeeds. Consistent syntax makes reading nested blocks or chained calls far easier while preventing trivial compile-time failures.",
    syntax: [
      { label: "Structured example", code: "package com.example;\npublic class SyntaxDemo {\n    void run(boolean enabled) {\n        if (enabled) {\n            System.out.println(\"running\");\n        } else {\n            System.out.println(\"idle\");\n        }\n    }\n}" },
      { label: "Statement focus", code: "int total = 0;\ntotal += 5;\nSystem.out.println(total);" }
    ],
    interview: [
      { question: "What are the core syntax rules in Java?", answer: "Core rules require that source files begin with optional package statements followed by classes, imports, and member declarations. Every executable statement ends with a semicolon, while control structures like `if` or `for` use braces to delimit blocks." },
      { question: "How do braces and indentation affect code?", answer: "Braces define the lexical scope for methods, loops, and conditionals, which the compiler enforces regardless of indentation. Well-structured indentation helps humans see where braces open and close, reducing the risk of logical errors." },
      { question: "How do you avoid syntax errors during development?", answer: "Let the compiler flag missing semicolons or parentheses, and read the error line to track down unmatched braces. Consistent formatting also keeps nested statements clear so you do not accidentally place code outside of the intended block.", syntax: "package com.example;\npublic class SyntaxDemo {\n    void run(boolean enabled) {\n        if (enabled) {\n            System.out.println(\"running\");\n        } else {\n            System.out.println(\"idle\");\n        }\n    }\n}" },
      { question: "What is the difference between statements and expressions?", answer: "Expressions produce values and can appear inside statements, while statements such as `if`, `for`, or assignment drive control flow. Understanding the distinction keeps you from misusing keywords or returning a value from a void method." },
      { question: "How does consistent formatting reduce mistakes?", answer: "Consistent formatting such as aligning braces and spacing operators reveals structure at a glance, preventing errors like executing the wrong block. Tools like formatter plugins can enforce these habits automatically." }
    ]
  },
  "naming-conventions": {
    definition: "Naming conventions divide responsibilities: packages stay lowercase, classes use PascalCase, methods and variables use camelCase, and constants stay uppercase with underscores. Clear names tell readers whether a symbol is a type, behavior, or fixed value before they inspect the implementation. Teams usually document these conventions and apply linters so large codebases stay uniform.",
    syntax: [
      { label: "Class, method, constant", code: "public class SessionManager {\n    private static final int MAX_SESSIONS = 100;\n    private int activeSessions;\n    public void startSession() {\n        activeSessions++;\n    }\n}" },
      { label: "Package and variable", code: "package com.example.network;\nString clientId = \"node-1\";\nboolean connectionActive = false;" }
    ],
    interview: [
      { question: "Why enforce naming conventions?", answer: "Naming conventions improve readability by signaling the role of each symbol at a glance. When every developer follows the same style, searching and reviewing code becomes predictable." },
      { question: "Which conventions apply to classes, methods, and packages?", answer: "Classes and interfaces use PascalCase, methods and variables use camelCase, and packages use dotted lowercase to avoid collisions. Following these rules aligns with the Java language specification and ecosystem expectations." },
      { question: "How are constants named in Java?", answer: "Constants typically use uppercase letters separated by underscores, e.g., `MAX_CONNECTIONS`, often paired with `static final`. This immediately distinguishes them from mutable fields.", syntax: "public static final int MAX_CONNECTIONS = 100;" },
      { question: "How do conventions help during refactors?", answer: "Refactors become safer when renaming tools assume standard styles, and reviewers can see intent without deciphering terse names. Automated checks also flag deviations so you can correct them before merging." },
      { question: "What tools enforce naming rules?", answer: "Linters like Checkstyle or Spotless can enforce naming patterns and fail builds on violations. IDE inspections also prompt you to rename symbols that do not follow the shared conventions." }
    ]
  },
  "variables-types": {
    definition: "Variables store data, and their declared types define the operations you can perform on them. Java is strongly typed, so the compiler ensures that each variable retains its declared type while allowing some convenience features like `var` inference in local scopes. Primitive types live on the stack or in registers for speed, while reference types point to heap objects and track dynamic data.",
    syntax: [
      { label: "Primitives", code: "int age = 30;\ndouble price = 19.99;\nboolean active = true;" },
      { label: "References", code: "String name = \"Ada\";\nList<String> tags = new ArrayList<>();" }
    ],
    interview: [
      { question: "What types of variables does Java have?", answer: "Java has local variables, instance fields, static fields, and method parameters, each with its own lifecycle. Fields default to zero, null, or false when not explicitly initialized, while locals must be initialized before use." },
      { question: "How does Java enforce type safety?", answer: "The compiler requires each variable declaration to specify a type or use `var` for local inference, preventing invalid operations. It also catches incompatible assignments at compile time and disallows mixing primitives with incompatible references without casts." },
      { question: "What distinguishes primitives and references?", answer: "Primitives such as `int` or `boolean` store their value directly, while references like `String` point to objects on the heap. This difference affects default values, equality semantics, and memory layout." },
      { question: "What best practices exist for choosing types?", answer: "Pick the narrowest data type that safely holds the values and wrap domain rules in dedicated classes when behavior matters. Avoid overloading variables with multiple responsibilities and prefer explicit types in APIs for clarity." },
      { question: "How does autoboxing interact with types?", answer: "Autoboxing automatically converts primitives to their wrapper classes when needed, such as storing `int` values in a `List<Integer>`. Be mindful of unnecessary boxing when collections operate on primitives because it can introduce performance overhead and nullability concerns." }
    ]
  },
  "constants-final": {
    definition: "Constants are declared with `final` so their values cannot change after initialization, and they often pair with `static` to share across instances. Final variables can be initialized where they are declared or inside every constructor, guaranteeing consistent state for each object. Standards also reserve uppercase with underscores for constants so readers know they represent immutable data.",
    syntax: [
      { label: "Final field", code: "public final int maxRetries = 5;" },
      { label: "Static final", code: "public static final String VERSION = \"1.0\";" }
    ],
    interview: [
      { question: "What makes a constant in Java?", answer: "A constant is a variable marked with `final`, which prevents reassignment after the initial value. It can also be `static` so the same value is shared across all instances." },
      { question: "How does `final` apply to variables, methods, and classes?", answer: "`final` on a variable means it cannot be reassigned, on a method it forbids overriding, and on a class it prevents subclassing. Using the keyword communicates intent and allows safer APIs." },
      { question: "When do constructors initialize final fields?", answer: "Constructors provide one-time opportunities to set final instance fields when their values depend on parameters. You must assign every final field before the constructor completes, otherwise the compiler reports an error." },
      { question: "Why use `static final` for shared constants?", answer: "`static final` moves the constant into the class level so it is loaded once and can be referenced without creating objects. It also ensures the value remains immutable for all callers." },
      { question: "What caution exists when final references point to mutable objects?", answer: "`final` protects the reference, not the object, so you still need defensive copies or `Collections.unmodifiableList`. Otherwise, callers could mutate the underlying object even though the field is final." }
    ]
  },
  "operators": {
    definition: "Operators manipulate values through arithmetic, relational, logical, bitwise, and assignment expressions that form the vocabulary of computations. Operator precedence and associativity determine the evaluation order, but parentheses can override defaults when needed. Understanding short-circuiting and compound assignments prevents subtle bugs where side effects sneak into complex expressions.",
    syntax: [
      { label: "Arithmetic", code: "int sum = 5 + 7;\nint product = 2 * sum;\nint remainder = sum % 4;" },
      { label: "Logical", code: "boolean valid = flag1 && flag2 || !flag3;" }
    ],
    interview: [
      { question: "What operator categories exist in Java?", answer: "Java supports arithmetic, relational, logical, bitwise, and assignment operators, plus the ternary `?:`. Each category has its own precedence rules and valid operand types." },
      { question: "How does precedence influence evaluation?", answer: "Multiplication, division, and modulus evaluate before addition and subtraction unless parentheses change the order. Understanding precedence prevents mistakes where expressions compute elements in an unexpected sequence." },
      { question: "How do logical operators short-circuit?", answer: "Logical `&&` stops evaluating as soon as it finds `false`, and `||` stops when it finds `true`, which preserves performance and avoids unnecessary side effects. This behavior lets you hydrate expressions like `value != null && value.isValid()` safely.", syntax: "boolean valid = flag1 && flag2 || !flag3;" },
      { question: "What are compound assignments?", answer: "Compound assignments such as `+=`, `-=`, `*=`, and `|=` combine an operation with assignment for brevity. They also perform the type conversion that the full expression would, so you need to understand the promoted type." },
      { question: "What are bitwise operators used for?", answer: "Bitwise operators like `&`, `|`, `^`, and shifts manipulate individual bits, which is helpful for masks, flags, or low-level protocols. They run faster for certain bit manipulations than using arithmetic or boolean logic." }
    ]
  },
  "type-casting": {
    definition: "Type casting is converting values between compatible types, which Java enforces explicitly for narrowing conversions. Widening conversions happen automatically while narrowing conversions require an explicit cast to communicate potential loss of precision. Casting also applies to reference types when you move between supertypes and subtypes, so you must ensure the runtime object matches the declared type.",
    syntax: [
      { label: "Widening cast", code: "int count = 5;\ndouble ratio = count;" },
      { label: "Narrowing cast", code: "double value = 9.78;\nint truncated = (int) value;\nSystem.out.println(truncated);" }
    ],
    interview: [
      { question: "What is type casting in Java?", answer: "Type casting moves a value from one compatible type to another, such as converting an `int` to a `double`. Java requires explicit casts for narrowing conversions to signal that data loss is intentional." },
      { question: "When is explicit casting required?", answer: "Explicit casting is required when the target type has less precision or a smaller range, for example casting a `double` to an `int`. Without the cast, the compiler will refuse the assignment to prevent accidental truncation." },
      { question: "How does the compiler differentiate widening from narrowing?", answer: "Widening conversions such as `int` to `long` happen implicitly because no information is lost, while narrowing conversions require parentheses and a cast. Reference casts, like converting `Object` to `String`, also run-time check that the object matches the desired type.", syntax: "double value = 9.78;\nint truncated = (int) value;\nSystem.out.println(truncated);" },
      { question: "What best practices exist for casting?", answer: "Limit casts to well-understood scenarios and add comments if the conversion seems nonobvious. When casting references, use `instanceof` or modern pattern matching to guard against `ClassCastException`." },
      { question: "How do you safely cast reference types?", answer: "Check the actual runtime type before casting, either with `instanceof` or by using pattern matching in `switch` statements. This prevents runtime failures when the object is not an instance of the target class." }
    ]
  },
  "variable-scope": {
    definition: "Variable scope defines where a name is visible: local variables live inside methods or blocks, instance fields belong to objects, and static fields belong to the class. The JVM enforces these scopes so locals cannot leak outside their block and fields can be shadowed using `this`. Keeping scope tight prevents unintended aliasing and simplifies reasoning about garbage collection because unreachable locals are eligible for collection sooner.",
    syntax: [
      { label: "Block vs field", code: "class ScopeDemo {\n    int field;\n    void method() {\n        int local = 0;\n        {\n            int inner = 5;\n        }\n    }\n}" },
      { label: "Static and instance", code: "static int counter;\nint instanceId;\nvoid setup() {\n    counter++;\n    instanceId = counter;\n}" }
    ],
    interview: [
      { question: "What scopes exist for variables in Java?", answer: "Java scopes include block scope for variables declared inside braces, method scope for parameters and locals, instance scope for fields, and class scope for static members. Each scope determines when the variable becomes reachable and how long it stays alive." },
      { question: "How do fields differ from locals?", answer: "Fields live with the object (or class for static fields) and default to zero, null, or false if not assigned, whereas locals must be explicitly initialized before use. Fields remain accessible until the object is collected, while locals vanish when the method returns." },
      { question: "Why pass parameters instead of relying on global state?", answer: "Parameters keep a method self-contained so dependencies are explicit and thread-safe, while relying on global or static state introduces hidden coupling. Passing parameters also helps with unit testing because you can control inputs precisely.", syntax: "static int counter;\nint instanceId;\nvoid setup() {\n    counter++;\n    instanceId = counter;\n}" },
      { question: "How does scope affect garbage collection?", answer: "Objects referenced only by locals become eligible for garbage collection as soon as the method returns, while fields keep objects reachable until the parent object is collected. Tight scopes help the GC reclaim memory sooner." },
      { question: "How do you avoid name shadowing?", answer: "Avoid declaring locals or parameters with the same names as fields, and if necessary use `this.fieldName` to disambiguate. Shadowing tends to mislead readers, so prefer clear, distinct names." }
    ]
  },
  "unicode-char": {
    definition: "Java `char` values are UTF-16 code units, which enables direct representation of most Unicode characters and access to higher code points via surrogate pairs. Strings store sequences of `char`, but when working with emojis or rare glyphs you need to handle code points explicitly. Understanding Unicode escapes and the difference between code units and code points prevents garbled output and off-by-one errors when iterating text.",
    syntax: [
      { label: "Char literal", code: "char letter = 'A';\nchar heart = '\\u2764';" },
      { label: "Code point handling", code: "String symbol = \"\\u2764\";\nint codePoint = symbol.codePointAt(0);\nSystem.out.println(Character.toChars(codePoint));" }
    ],
    interview: [
      { question: "How does Java support Unicode?", answer: "Java uses UTF-16 for `char` and `String`, covering the Basic Multilingual Plane by default while representing supplementary characters with surrogate pairs. This allows you to work with many human languages without custom encodings." },
      { question: "What are Unicode escape sequences?", answer: "Unicode escape sequences such as `\\u0041` allow you to embed characters using their code points, which is useful for ASCII-only source files. The compiler translates these escapes before parsing, so they behave like literal characters." },
      { question: "How do you print extended characters?", answer: "Use `String` methods like `codePointAt` and `Character.toChars` to handle code points outside the Basic Multilingual Plane and avoid splitting surrogate pairs. This ensures your output matches the intended glyphs, even for emoji or ancient scripts.", syntax: "String symbol = \"\\u2764\";\nint codePoint = symbol.codePointAt(0);\nSystem.out.println(Character.toChars(codePoint));" },
      { question: "What should you watch when iterating strings?", answer: "Iterating by `char` can break supplementary characters, so use `codePoints()` or `Character.offsetByCodePoints` when your input may contain emoji. Otherwise you risk splitting a single user-visible glyph into two separate values." },
      { question: "How do `char` and `String` differ in encoding?", answer: "`char` holds a single UTF-16 code unit, while `String` stores a sequence and keeps track of its length. Strings also cache hash codes and provide rich APIs for normalization, whereas `char` is a primitive for simple data." }
    ]
  },
  "wrapper-classes": {
    definition: "Wrapper classes like `Integer`, `Double`, and `Boolean` wrap primitives so they can participate in generics, collections, and APIs that expect objects. They offer utility methods such as `parseInt`, `valueOf`, and `compareTo` while still interoperating with primitives through autoboxing. These classes also provide nullability, which can represent the absence of a value more explicitly than primitive defaults.",
    syntax: [
      { label: "Parse and value", code: "Integer count = Integer.valueOf(\"42\");\nint primitive = count.intValue();" },
      { label: "Autoboxing", code: "List<Double> scores = new ArrayList<>();\nscores.add(98.5);" }
    ],
    interview: [
      { question: "Why do wrapper classes exist?", answer: "Wrappers let primitives be used where objects are required, such as in collections or reflection APIs. They also provide helper methods for parsing, formatting, and comparing values." },
      { question: "How does autoboxing work?", answer: "Autoboxing automatically wraps a primitive in its corresponding wrapper when assigned to an object reference and unboxes when needed back to a primitive. The compiler inserts the conversion so you write cleaner code, but it pays attention to nulls to avoid `NullPointerException`." },
      { question: "What dangers come with wrapper classes?", answer: "Wrappers can be null, so dereferencing them without checks triggers `NullPointerException`. In addition, comparing wrappers with `==` may fail because it compares references, so you should use `equals` or compare primitives directly.", syntax: "Integer count = Integer.valueOf(\"42\");\nint primitive = count.intValue();" },
      { question: "How do you compare wrapper instances?", answer: "Use `.equals()` or `.compareTo()` to compare values, or unbox to primitives for relational operators. The cached range for some wrappers means identity comparisons may sometimes appear to work, but you should not rely on that behavior." },
      { question: "How do you parse strings into wrappers?", answer: "Use static methods like `Integer.parseInt` or `Double.parseDouble` to convert numeric text into primitives, or `Boolean.parseBoolean` for booleans. These methods throw `NumberFormatException` if the string is invalid, so wrap them in try/catch when user input is involved." }
    ]
  },
  "bigdecimal": {
    definition: "BigDecimal handles arbitrary-precision decimal arithmetic, which avoids the rounding issues common with floating-point primitives. It stores a scale and unscaled value, allowing you to control how many digits appear after the decimal point. Finance and scientific code rely on `BigDecimal` because it represents currency exactly and lets you specify rounding strategies explicitly.",
    syntax: [
      { label: "Addition", code: "BigDecimal price = new BigDecimal(\"19.99\");\nBigDecimal tax = new BigDecimal(\"0.07\");\nBigDecimal total = price.add(tax);" },
      { label: "Scale and rounding", code: "BigDecimal result = price.divide(new BigDecimal(\"3\"), 2, RoundingMode.HALF_UP);" }
    ],
    interview: [
      { question: "Why use BigDecimal instead of double?", answer: "BigDecimal avoids the binary rounding errors that double suffers from when representing base-10 decimals. It also lets you specify the scale and rounding mode so financial calculations remain deterministic." },
      { question: "How do you create BigDecimal reliably?", answer: "Construct `BigDecimal` instances from strings or `BigInteger` values instead of floats to avoid inheriting their rounding errors. The string literal gives you exact digits, and you can set a `MathContext` for precision." },
      { question: "What does scale mean in BigDecimal?", answer: "Scale is the number of digits to the right of the decimal point, and you can adjust it with `setScale` or when dividing. Choosing the correct scale ensures consistent formatting and comparison behavior.", syntax: "BigDecimal result = price.divide(new BigDecimal(\"3\"), 2, RoundingMode.HALF_UP);" },
      { question: "How do rounding modes affect results?", answer: "`RoundingMode` controls whether values round up, down, or to the nearest neighbor, so you pick the mode that matches legal or accounting expectations. Using the wrong mode can cause off-by-one-cent errors in ledgers." },
      { question: "How do you use BigDecimal in financial calculations?", answer: "Keep a fixed `MathContext` or scale to avoid creeping precision changes across operations and use `compareTo` instead of `equals` to ignore scale differences. Document rounding rules clearly so downstream code knows what to expect." }
    ]
  },
  "control-flow": {
    definition: "Control flow constructs like `if`, `switch`, `for`, and `while` govern which statements execute based on conditions. They enable the program to branch, loop, or bail out early, and they also interact with exception handling to recover from unexpected states. Mastering control flow ensures your business rules execute the right branches without redundant checks.",
    syntax: [
      { label: "If and switch", code: "int value = 2;\nif (value > 0) {\n    System.out.println(\"positive\");\n} else {\n    System.out.println(\"non-positive\");\n}\nswitch (value) {\n    case 0 -> System.out.println(\"zero\");\n    default -> System.out.println(\"other\");\n}" },
      { label: "Guard clause", code: "boolean ready = true;\nif (!ready) {\n    return;\n}\nSystem.out.println(\"processing\");" }
    ],
    interview: [
      { question: "What constructs control execution flow in Java?", answer: "Branching constructs such as `if`, `else`, and `switch`, along with loops like `for` and `while`, determine which statements run. Control flow also spans exception handling with `try`, `catch`, and `finally` to manage abnormal paths." },
      { question: "How does `switch` differ from `if`?", answer: "`switch` provides a multi-way branch that is more readable than chained `if-else` chains when matching discrete values. Modern `switch` expressions also return values and support arrow syntax for concise branches." },
      { question: "How do guard clauses simplify logic?", answer: "Guard clauses allow early returns when preconditions fail, keeping the main path less nested and easier to follow. This pattern also pairs well with validation checks at the top of methods.", syntax: "boolean ready = true;\nif (!ready) {\n    return;\n}\nSystem.out.println(\"processing\");" },
      { question: "What should you consider with nested `if` statements?", answer: "Nested `if`s become hard to read, so consider flattening them with `else if`, helper methods, or `switch` expressions. Keeping each branch focused avoids deep indentation that obscures the main logic." },
      { question: "How does control flow interact with exceptions?", answer: "Exceptions break the regular flow and jump to the nearest enclosing `catch` block, so you need to manage finally blocks appropriately. Use try-with-resources or explicit `throw` statements to ensure resources close regardless of control flow." }
    ]
  },
  "loops": {
    definition: "Loops repeat statements until a condition changes, which is useful for processing collections, retrying operations, or accumulating results. Java provides `for`, `while`, `do-while`, and enhanced `for` loops, plus stream-based iterations for more declarative code. Understanding loop termination and avoiding off-by-one mistakes keeps loops efficient and bug-free.",
    syntax: [
      { label: "Indexed for loop", code: "for (int i = 0; i < list.size(); i++) {\n    System.out.println(list.get(i));\n}" },
      { label: "Enhanced for loop", code: "for (String item : items) {\n    System.out.println(item);\n}" }
    ],
    interview: [
      { question: "What loop forms does Java offer?", answer: "Java offers the classic `for`, `while`, and `do-while` loops plus the enhanced `for` loop that works with arrays and `Iterable` instances. Streams add another flavor of iteration for functional-style processing." },
      { question: "When might you use an infinite loop?", answer: "An infinite loop such as `while (true)` suits long-running services that rely on shutdown hooks or break statements to exit. Always include a safe exit condition or use interrupts so the loop does not hang." },
      { question: "How do enhanced for loops work?", answer: "Enhanced `for` loops iterate over each element of an array or `Iterable`, hiding the iterator boilerplate for readability. They are excellent for read-only access but do not allow you to modify the underlying collection structurally.", syntax: "for (String item : items) {\n    System.out.println(item);\n}" },
      { question: "What about `forEach` with lambdas?", answer: "`forEach` accepts a lambda or method reference and executes it for each element, which feels declarative and is often used with streams. However, you should avoid side effects in those lambdas to preserve functional clarity." },
      { question: "How do you avoid off-by-one errors?", answer: "Pay attention to inclusive versus exclusive bounds, and prefer `i < list.size()` rather than `<=` when iterating zero-based arrays. Using helper methods or `IntStream.range` can also keep boundaries explicit." }
    ]
  },
  "arrays": {
    definition: "Arrays hold fixed-size sequences of elements and represent contiguous storage that is efficient for index-based access. They remain zero-indexed, and multi-dimensional arrays are simply arrays of arrays with their own lengths per dimension. While arrays are lightweight, they require manual bounds checking and resizing is not supported, so many programs wrap them behind collection APIs when flexibility is needed.",
    syntax: [
      { label: "Declaration", code: "int[] numbers = {1, 2, 3};\nString[][] matrix = new String[2][3];" },
      { label: "Iteration", code: "for (int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}" }
    ],
    interview: [
      { question: "What are arrays in Java?", answer: "Arrays are fixed-size containers that store primitives or references in contiguous memory, offering constant-time access by index. They expose a `.length` property and enforce zero-based indexing." },
      { question: "How do you declare and initialize arrays?", answer: "You can declare arrays with square brackets and initialize them inline, e.g., `int[] numbers = {1, 2, 3};`, or with `new` followed by the size. For multidimensional arrays, you nest brackets and optionally specify each dimension separately." },
      { question: "How do you iterate over arrays?", answer: "Use `for` loops, enhanced `for` loops, or `Arrays.stream` to process elements while managing boundaries carefully. Libraries such as `Arrays` also provide utility methods like `sort` and `copyOf` for bulk operations.", syntax: "for (int i = 0; i < numbers.length; i++) {\n    System.out.println(numbers[i]);\n}" },
      { question: "What about multi-dimensional arrays?", answer: "Multi-dimensional arrays are arrays of arrays, so each row can have a different length and you must iterate nested loops. Passing them to methods typically uses `int[][]` or `String[][]` signatures." },
      { question: "How do arrays differ from collections?", answer: "Arrays have fixed size and can store primitives directly, whereas collections grow dynamically and only hold references. Collections also offer more convenience methods, but arrays are more efficient when performance matters." }
    ]
  },
  "methods": {
    definition: "Methods encapsulate reusable behavior with a signature that defines the access modifier, return type, name, and parameters. They keep logic organized and enable testing, overriding, and polymorphism when combined with interfaces or inheritance. Effective methods are short, focused, and express intent through their names and parameter lists.",
    syntax: [
      { label: "Definition", code: "public int sum(int x, int y) {\n    return x + y;\n}" },
      { label: "Invocation", code: "Calculator calculator = new Calculator();\nint total = calculator.sum(4, 5);\nSystem.out.println(total);" }
    ],
    interview: [
      { question: "What role do methods play in Java?", answer: "Methods group statements that perform a cohesive task and can be invoked from other classes or objects. They hide implementation details and expose intent through descriptive names." },
      { question: "How do you design method signatures?", answer: "Choose parameter lists that cover only the needed inputs and return a type that reflects the outcome, using void when no result is required. Prefer overloaded methods for optional behavior and document side effects." },
      { question: "How do you call methods?", answer: "Instance methods require an object reference, while static methods are invoked on the class itself, e.g., `Math.max(a, b)`. This distinction clarifies whether the method relies on instance state.", syntax: "Calculator calculator = new Calculator();\nint total = calculator.sum(4, 5);\nSystem.out.println(total);" },
      { question: "What about method overloading?", answer: "Overloading allows multiple methods with the same name but different parameter lists, letting you offer flexible APIs. The compiler resolves the correct overload at compile time based on the argument types." },
      { question: "How do you keep methods focused?", answer: "Limit each method to a single responsibility and break complex logic into helper methods, which makes testing and maintenance easier. Long methods often indicate missing abstractions or too many responsibilities." }
    ]
  },
  "strings": {
    definition: "The `String` class represents immutable sequences of characters, so every modification creates a new object. Java caches string literals in the pool, and the `String` API offers methods such as `substring`, `replace`, `split`, and `trim` for manipulation. When performance matters, `StringBuilder` or `StringBuffer` provide mutable alternatives that accumulate characters more efficiently.",
    syntax: [
      { label: "Concatenation", code: "String first = \"Hello\";\nString second = \"World\";\nString combined = first + \", \" + second;" },
      { label: "Builder", code: "StringBuilder builder = new StringBuilder();\nbuilder.append(\"Hello\");\nbuilder.append(' ');\nbuilder.append(\"World\");\nString message = builder.toString();" }
    ],
    interview: [
      { question: "What is special about Strings in Java?", answer: "`String` is immutable, so once created its contents cannot change, which makes it thread-safe. Literal strings are interned, so identical literals share the same memory reference." },
      { question: "How do you mutate string-like data?", answer: "Use `StringBuilder` or `StringBuffer` when you need to append or modify characters frequently, then convert to a `String` at the end. This avoids creating many intermediate immutable strings." },
      { question: "What methods help manipulate strings?", answer: "Methods like `substring`, `replace`, `split`, and `trim` cover common transformation needs, while `formatted` or `String.format` handle templating. Unicode and locale support also exist through `toUpperCase(Locale)` and `collator` helpers." },
      { question: "How should you compare strings?", answer: "Use `.equals()` or `.equalsIgnoreCase()` to compare content, not `==`, which only checks reference identity. The string pool can make `==` accidentally appear to work for literals but never rely on it." },
      { question: "What should you know about encoding?", answer: "Strings use UTF-16 internally, so converting to bytes requires specifying a charset like `StandardCharsets.UTF_8`. Always define the charset when reading or writing to prevent platform-dependent behavior." }
    ]
  },
  "string-pool": {
    definition: "The string pool is a special area of the JVM heap that interns string literals so identical text shares a single object. When you write the same literal twice, the compiler ensures both references point to the pooled instance, reducing memory usage. Calling `String.intern()` lets you add runtime-built strings to the pool, though you should do so judiciously to avoid unnecessary retention.",
    syntax: [
      { label: "Literal sharing", code: "String a = \"java\";\nString b = \"java\";\nSystem.out.println(a == b);" },
      { label: "Intern method", code: "String literal = \"java\";\nString created = new String(\"java\");\nString pooled = created.intern();\nSystem.out.println(pooled == literal);" }
    ],
    interview: [
      { question: "What is the string pool?", answer: "The string pool keeps a single instance of each literal or interned string so memory is not wasted on duplicates. The JVM automatically interns literal strings loaded from class files." },
      { question: "How does interning affect memory?", answer: "Interning prevents multiple identical strings from occupying separate objects and can reduce garbage collection pressure for repeated values. However, interning too many unique strings can keep them alive for the life of the class loader." },
      { question: "When should you call `intern()`?", answer: "Call `intern()` when you have many identical strings built at runtime and you want them to share identity for faster comparisons or reduced memory. Be careful because the pool now holds those strings until the class loader unloads.", syntax: "String literal = \"java\";\nString created = new String(\"java\");\nString pooled = created.intern();\nSystem.out.println(pooled == literal);" },
      { question: "What pitfalls exist with the pool?", answer: "Interned strings stay in memory until the class loader is collected, so interning large dynamic input can cause leaks. Avoid interning user-generated content unless you have a clear reason." },
      { question: "How do you compare interned strings?", answer: "You can reliably use `==` for interned strings because they reference the same object. Still prefer `.equals()` when you are unsure whether both operands share the pool." }
    ]
  },
  "input-output": {
    definition: "Java provides rich input/output APIs through `java.io` and `java.nio` for reading and writing files, sockets, and consoles. Streams and readers wrap low-level byte channels so you can process text, binary data, or serialized objects while handling buffering and character sets. Proper resource management with try-with-resources keeps file handles and streams from leaking.",
    syntax: [
      { label: "BufferedReader", code: "try (BufferedReader reader = Files.newBufferedReader(Path.of(\"data.txt\"))) {\n    String line;\n    while ((line = reader.readLine()) != null) {\n        System.out.println(line);\n    }\n}" },
      { label: "PrintWriter", code: "try (PrintWriter writer = new PrintWriter(\"out.txt\")) {\n    writer.println(\"ready\");\n}" }
    ],
    interview: [
      { question: "What APIs handle input and output in Java?", answer: "Java's `java.io` package centers on streams and readers, while `java.nio` introduces channels, buffers, and file utilities. The `Files` helper class provides convenient methods to read, write, and copy files." },
      { question: "How do you read files with NIO?", answer: "Use `Files.newBufferedReader(Path)` or `Files.readAllLines(Path)` to treat files as sequences of characters, specifying the charset when needed. These methods throw `IOException`, so wrap them in try-with-resources for safety." },
      { question: "How do you write files?", answer: "Classes like `PrintWriter`, `BufferedWriter`, and `Files.writeString` let you emit text or bytes while buffering for performance. Always wrap these resources in try-with-resources so they close even if writing fails.", syntax: "try (PrintWriter writer = new PrintWriter(\"out.txt\")) {\n    writer.println(\"ready\");\n}" },
      { question: "How do you manage resources safely?", answer: "Try-with-resources ensures streams close automatically by implementing `AutoCloseable`, so you do not forget to release OS resources. If you cannot use that syntax, call `close()` in a finally block." },
      { question: "How do you read console input?", answer: "The `Scanner` class wraps `System.in` and provides methods such as `nextLine` or `nextInt` for parsing tokens. Remember to call `scanner.close()` or use try-with-resources when the scanner is no longer needed." }
    ]
  },
  "reading-errors": {
    definition: "Reading errors refer to the exceptions that occur when consuming external data, such as `IOException` or `FileNotFoundException`. Java forces you to handle these checked exceptions so callers acknowledge the risk of missing files, network failures, or permissions issues. Proper error handling lets you log, recover, or rethrow the problem with context for calling components.",
    syntax: [
      { label: "Try-with-resources", code: "try (BufferedReader reader = Files.newBufferedReader(Path.of(\"data.txt\"))) {\n    System.out.println(reader.readLine());\n} catch (IOException e) {\n    e.printStackTrace();\n}" },
      { label: "Specific catches", code: "try {\n    // reading logic\n} catch (FileNotFoundException e) {\n    System.err.println(\"Missing file\");\n} catch (IOException e) {\n    throw new UncheckedIOException(e);\n}" }
    ],
    interview: [
      { question: "What exceptions occur when reading data?", answer: "Reading operations commonly throw `IOException` and more specific subclasses like `FileNotFoundException` or `SocketException`. Because they are checked, the compiler requires you to handle or declare them." },
      { question: "Why is handling checked IO errors important?", answer: "Unchecked failures where you ignore IO exceptions lead to crashes or silent data loss, so handling them keeps your application resilient. Explicit handling also lets you provide user-friendly messages or fallback resources." },
      { question: "How do you recover from read failures?", answer: "You can retry the operation with backoff, fall back to cached data, or escalate the issue to higher layers after logging the context. The recovery strategy should match your application's tolerance for stale or missing input." },
      { question: "What pattern centralizes error handling?", answer: "Create utility methods that wrap IO calls and translate checked exceptions into domain-specific exceptions, logging as needed. This prevents repeated catch blocks littered across business logic." },
      { question: "How do you propagate errors to callers?", answer: "Declare `throws IOException` on your method signature, letting callers decide how to handle them. When you rethrow, wrap the exception in a descriptive one that keeps the original stack trace." }
    ]
  },
  "regex": {
    definition: "Regular expressions let you describe text patterns using `Pattern` and `Matcher`, which are part of `java.util.regex`. Compile the pattern once and reuse it to avoid the cost of reparsing, and choose the appropriate flags for case sensitivity or multiline input. Regex shines for validation, parsing, and simple replacements when string methods alone are not expressive enough.",
    syntax: [
      { label: "Pattern match", code: "Pattern pattern = Pattern.compile(\"\\\\\\d+\");\nMatcher matcher = pattern.matcher(input);\nif (matcher.find()) {\n    System.out.println(matcher.group());\n}" },
      { label: "Replace all", code: "String normalized = input.replaceAll(\"\\\\\\s+\", \" \");" }
    ],
    interview: [
      { question: "How do regex work in Java?", answer: "You compile a regex string into a `Pattern`, create a `Matcher` with the target text, and then query matches with `find`, `matches`, or `lookingAt`. The `Matcher` also lets you extract capture groups." },
      { question: "How do you compile regex efficiently?", answer: "Compile a `Pattern` once and reuse it because compiling involves parsing the expression, which can be expensive in loops. Store the compiled pattern in a static final field when the regex does not change." },
      { question: "How do you replace text with regex?", answer: "`String.replaceAll` and `Matcher.replaceAll` apply regex to produce a new string with replacements, using capture groups if needed. Remember to escape backslashes twice in Java literals so the regex sees the intended metacharacters.", syntax: "String normalized = input.replaceAll(\"\\\\\\s+\", \" \");" },
      { question: "How do you validate user input with regex?", answer: "Use `matcher.matches()` to assert the entire string fits the pattern, which is stricter than `find`. Keep the regex readable and document what each part validates." },
      { question: "How do you escape special characters?", answer: "You escape metacharacters like `.`, `*`, `?`, and `\` with backslashes, but in Java literals you must double the backslash, e.g., `\\\\.` for a literal dot. Libraries like `Pattern.quote` also help when you need a literal match." }
    ]
  },
  "oop-intro": {
    definition: "Object-oriented programming (OOP) models systems with classes, objects, encapsulation, inheritance, and polymorphism. Each class bundles data and behavior, and encapsulation keeps fields private while exposing interactions through methods. Inheritance and interfaces enable polymorphism, letting callers treat instances uniformly and plug in new behaviors without rewriting callers.",
    syntax: [
      { label: "Class definition", code: "public class Animal {\n    protected String name;\n    public Animal(String name) {\n        this.name = name;\n    }\n    public void speak() {\n        System.out.println(name + \" makes a sound\");\n    }\n}" },
      { label: "Inheritance", code: "public class Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    @Override\n    public void speak() {\n        System.out.println(name + \" barks\");\n    }\n}" }
    ],
    interview: [
      { question: "What are the core principles of OOP?", answer: "Encapsulation hides internal state behind methods, inheritance lets classes reuse and extend behavior, abstraction focuses on the essential features, and polymorphism allows multiple implementations to share the same interface. Together they help build modular, reusable, and testable systems." },
      { question: "How does encapsulation help developers?", answer: "Encapsulation keeps fields private and exposes behavior through getters, setters, or business methods, which protects invariants. It also allows you to change the internal implementation without affecting callers." },
      { question: "What is inheritance and how do you use it?", answer: "Inheritance uses the `extends` keyword to create specialized subclasses that reuse code from a superclass, and you can override methods to provide custom behavior. Use it when there is a clear specialization relationship to avoid duplication.", syntax: "public class Dog extends Animal {\n    public Dog(String name) {\n        super(name);\n    }\n    @Override\n    public void speak() {\n        System.out.println(name + \" barks\");\n    }\n}" },
      { question: "How does polymorphism appear in Java?", answer: "Polymorphism happens when you invoke a method on a superclass reference but the runtime object is a subclass, which executes the overriding method. Interfaces also provide polymorphic contracts that any implementing class can fulfill." },
      { question: "Why design code around interfaces?", answer: "Interfaces declare behavior without tying you to a concrete class, so you can swap implementations without changing consumers. They also let you leverage default and static methods to share reusable logic while keeping the API contract clear." }
    ]
  },
};
