/**
 * METAPHOR-DATA.MJS
 * Metaphor mappings for all Java topics
 * Each metaphor connects technical concepts to everyday real-world analogies
 */

const METAPHORS = {
  "what-is-java": {
    hook: "Java is a universal power adapter for programs",
    story: "Like how a universal adapter lets you plug your phone charger into outlets worldwide, Java lets your program run on any device. You write once, and the Java Virtual Machine (JVM) acts as the adapter, translating your program for Windows, Mac, or Linux. No need to rewrite for each system.",
    mapping: [
      { code: "Java program", real: "Your phone charger" },
      { code: "JVM", real: "Universal power adapter" },
      { code: "Different operating systems", real: "Different country outlets" },
      { code: "Write once, run anywhere", real: "One charger works everywhere with adapter" }
    ],
    reminder: "Java's JVM lets the same code run on any platform without changes."
  },

  "setup-environment": {
    hook: "Setting up your environment is organizing a woodshop",
    story: "Before building furniture, a carpenter sets up their shop with the right tools in the right places. Similarly, you need to install the JDK (your toolbox), set PATH variables (tool locations), and configure an IDE (your workbench). Once organized, you can start building efficiently without hunting for tools.",
    mapping: [
      { code: "JDK installation", real: "Getting your complete toolbox" },
      { code: "PATH variable", real: "Labels telling you where each tool is stored" },
      { code: "IDE (IntelliJ, Eclipse)", real: "Organized workbench with everything in reach" },
      { code: "Compiler (javac)", real: "Power saw that transforms raw wood" }
    ],
    reminder: "Proper setup once saves hours of frustration later."
  },

  "hello-world": {
    hook: "Hello World is your first words as a baby",
    story: "Just like a baby's first words prove they can communicate, Hello World proves your development environment works. It's the simplest possible program: a class with a main method that prints text. This tiny program tests that your compiler, runtime, and output all work together before you attempt anything complex.",
    mapping: [
      { code: "public class", real: "Your identity as a communicator" },
      { code: "main method", real: "The moment you open your mouth to speak" },
      { code: "System.out.println", real: "Actually saying the words out loud" },
      { code: "\"Hello World\"", real: "The specific first words you say" }
    ],
    reminder: "If Hello World runs, your entire Java toolchain is working."
  },

  "comments-docs": {
    hook: "Comments are sticky notes on your code",
    story: "Imagine leaving your kitchen mid-recipe and returning weeks later. Without notes, you'd forget why you used that odd technique. Comments are sticky notes for your future self or teammates, explaining the 'why' behind tricky code. Javadoc comments go further, generating formal documentation like a cookbook for your code library.",
    mapping: [
      { code: "// single-line comment", real: "Quick sticky note in margin" },
      { code: "/* multi-line comment */", real: "Longer note on separate paper" },
      { code: "/** Javadoc */", real: "Professional cookbook entry with ingredients and instructions" },
      { code: "Undocumented code", real: "Recipe with no notes or measurements" }
    ],
    reminder: "Comments explain why, not what—the code already shows what."
  },

  "syntax-rules": {
    hook: "Syntax rules are grammar and punctuation for code",
    story: "Just as English requires periods at sentence ends and commas for pauses, Java demands semicolons after statements and braces around code blocks. Miss a semicolon, and Java won't understand you—like reading a paragraph with no periods. These rules seem picky but make code clear and unambiguous for the compiler.",
    mapping: [
      { code: "Semicolon ;", real: "Period at end of sentence" },
      { code: "Curly braces { }", real: "Parentheses grouping related ideas" },
      { code: "Code block", real: "Paragraph of related sentences" },
      { code: "Syntax error", real: "Grammar mistake that makes text unreadable" }
    ],
    reminder: "Every semicolon and brace tells the compiler where one thought ends and another begins."
  },

  "naming-conventions": {
    hook: "Naming conventions are the dress code of code",
    story: "Just as offices have dress codes (formal, business casual), Java has naming standards. Classes wear CapitalCase like formal suits, variables wear camelCase like smart casual, and CONSTANTS wear ALL_CAPS like uniforms. Following these conventions instantly signals to other developers what each name represents, making code readable at a glance.",
    mapping: [
      { code: "ClassName (PascalCase)", real: "Formal suit for important people (classes)" },
      { code: "variableName (camelCase)", real: "Business casual for everyday workers (variables)" },
      { code: "CONSTANT_NAME (SCREAMING_SNAKE)", real: "Uniform that never changes (constants)" },
      { code: "methodName (camelCase)", real: "Work attire for actions (methods)" }
    ],
    reminder: "Consistent naming is like a shared language—everyone immediately understands."
  },

  "variables-types": {
    hook: "Variables are labeled storage containers",
    story: "Think of variables as kitchen containers. Some hold integers (whole tomatoes), others hold doubles (olive oil measured precisely), and some hold text (recipe cards). Each container is labeled with a name (int, double, String) so you know what fits inside. You can change contents, but the container type stays the same.",
    mapping: [
      { code: "int age", real: "Container labeled 'whole numbers' holding your age" },
      { code: "double price", real: "Measuring cup for precise decimal amounts" },
      { code: "String name", real: "Recipe card holder for text" },
      { code: "Type safety", real: "You can't put soup in a recipe card holder" }
    ],
    reminder: "Types are promises about what kind of data a variable holds."
  },

  "constants-final": {
    hook: "final is a lock on a value",
    story: "When you mark something final, you're welding it shut like a time capsule. The value can't change for the life of the program. This is perfect for things that should never vary: pi is always 3.14159, maximum_users might be 100, or tax_rate is set at launch. Final prevents accidental changes and signals intent to other developers.",
    mapping: [
      { code: "final variable", real: "Engraved stone plaque (permanent)" },
      { code: "Regular variable", real: "Whiteboard writing (erasable)" },
      { code: "final int MAX_SPEED = 120", real: "Speed limit sign that never changes" },
      { code: "Reassignment error", real: "Trying to edit an engraved stone" }
    ],
    reminder: "Use final when a value should never change after initialization."
  },

  "operators": {
    hook: "Operators are the verbs of your code",
    story: "If variables are nouns (things), operators are verbs (actions). You can add (+), subtract (-), compare (==, >), or combine (&&) values. Each operator is a tiny function: + takes two numbers and produces their sum. Chaining operators creates expressions, like sentences combining verbs: if (age >= 18 && hasLicense) describes a complex check.",
    mapping: [
      { code: "+ - * /", real: "Basic math actions: add, subtract, multiply, divide" },
      { code: "== != > <", real: "Comparison questions: equal? greater than?" },
      { code: "&& || !", real: "Logic words: 'and', 'or', 'not'" },
      { code: "Expression", real: "Complete sentence with actions" }
    ],
    reminder: "Operators transform and compare data, building logic from simple actions."
  },

  "type-casting": {
    hook: "Type casting is resizing containers",
    story: "Imagine pouring from a gallon jug (long) into a cup (int). If it fits, great—that's narrowing. Going from a cup to a jug (widening) always works safely. Java automatically widens but makes you explicitly cast when narrowing, forcing you to acknowledge potential data loss, like overflow when the gallon doesn't fit in the cup.",
    mapping: [
      { code: "int to long (widening)", real: "Pouring cup into jug (always fits)" },
      { code: "long to int (narrowing)", real: "Pouring jug into cup (may overflow)" },
      { code: "(int) cast", real: "Acknowledging 'I know I might spill'" },
      { code: "Data loss", real: "Liquid that doesn't fit, lost on the floor" }
    ],
    reminder: "Widening is safe and automatic; narrowing requires explicit casting and risks loss."
  },

  "variable-scope": {
    hook: "Scope is a variable's home neighborhood",
    story: "Variables live in specific neighborhoods: local variables stay inside their method (like your house), instance variables live in the whole class (your town), and class variables are accessible everywhere (your country). Once you leave a method, its local variables disappear like houses you pass driving away. Scope prevents naming collisions and controls visibility.",
    mapping: [
      { code: "Local variable", real: "Items in your house (only you access)" },
      { code: "Instance variable", real: "Town library (all residents access)" },
      { code: "Class/static variable", real: "National museum (everyone can visit)" },
      { code: "Variable out of scope", real: "House you drove past—can't go back" }
    ],
    reminder: "Scope defines where a variable exists and who can access it."
  },

  "unicode-char": {
    hook: "char is a single slot for one character",
    story: "Think of char as a single-letter tile in Scrabble. It holds exactly one character—a letter, number, symbol, or even emoji—represented as a Unicode number. byte is a tiny number box (−128 to 127), useful for flags or small values. Together they handle text and tiny data efficiently.",
    mapping: [
      { code: "char letter = 'A'", real: "One Scrabble tile showing 'A'" },
      { code: "Unicode number", real: "Number printed on back of tile" },
      { code: "byte flag", real: "Tiny sticky note with values -128 to 127" },
      { code: "String", real: "Whole word made of multiple tiles" }
    ],
    reminder: "char holds one character; byte holds one tiny number."
  },

  "wrapper-classes": {
    hook: "Wrapper classes dress primitives in object clothing",
    story: "Primitives (int, double) are like loose coins—fast but can't fit into collections that require objects. Wrapper classes (Integer, Double) put coins in labeled envelopes, making them objects. Autoboxing automatically wraps coins when needed; unboxing opens the envelope. This lets primitives join object-only parties like ArrayList.",
    mapping: [
      { code: "int primitive", real: "Loose coin (fast, compact)" },
      { code: "Integer wrapper", real: "Coin in labeled envelope (object)" },
      { code: "Autoboxing", real: "Automatically sealing coin in envelope" },
      { code: "Unboxing", real: "Opening envelope to get coin back" }
    ],
    reminder: "Wrappers let primitives act as objects when needed, with automatic boxing."
  },

  "bigdecimal": {
    hook: "BigDecimal is a precision scale for money",
    story: "Using double for money is like weighing gold on a bathroom scale—close but not exact. Floating-point math has tiny errors: 0.1 + 0.2 doesn't exactly equal 0.3. BigDecimal is a jeweler's scale, tracking every decimal place precisely. It's slower but essential for financial calculations where $0.01 errors multiply into lawsuits.",
    mapping: [
      { code: "double price", real: "Bathroom scale (fast, slightly inaccurate)" },
      { code: "BigDecimal money", real: "Jeweler's scale (slow, perfectly accurate)" },
      { code: "Rounding errors", real: "Scale showing 10.0001 lbs instead of 10" },
      { code: "Financial calculation", real: "Weighing gold—accuracy critical" }
    ],
    reminder: "Use BigDecimal for money and precision; never use double for currency."
  },

  "control-flow": {
    hook: "Control flow is a choose-your-own-adventure book",
    story: "Programs don't always run line-by-line top to bottom. Control flow statements (if, else, switch) let your code make decisions, like pages in a choose-your-own-adventure: 'If dragon appears, turn to page 45; else turn to page 12.' Each condition branches the story in different directions.",
    mapping: [
      { code: "if statement", real: "'If hungry, go to page with kitchen scene'" },
      { code: "else", real: "'Otherwise, go to page with bedroom scene'" },
      { code: "switch", real: "Menu of choices, pick one path" },
      { code: "Sequential code", real: "Regular book read page-by-page" }
    ],
    reminder: "Control flow lets programs make decisions and branch to different code paths."
  },

  "loops": {
    hook: "Loops are running laps around a track",
    story: "Instead of writing 'print name' 100 times, loops let you say 'run this lap 100 times.' for loops are like knowing exactly how many laps (10 laps), while loops are 'keep running until tired' (condition-based), and do-while ensures you run at least one lap before checking if you're tired.",
    mapping: [
      { code: "for loop", real: "Coach says: 'Run exactly 10 laps'" },
      { code: "while loop", real: "'Keep running while you have energy'" },
      { code: "do-while loop", real: "'Run one lap, then check if you can continue'" },
      { code: "Loop body", real: "One lap around the track" }
    ],
    reminder: "Loops repeat code efficiently instead of copy-pasting."
  },

  "arrays": {
    hook: "Arrays are numbered parking spaces in a garage",
    story: "An array is a row of parking spots, each numbered (indexed) starting at 0. You declare how many spots you need upfront, and each spot holds one item of the same type (all cars, no motorcycles mixed in). Spot 0 is the first car, spot 1 is the second. Fixed size means you can't add more spots once built.",
    mapping: [
      { code: "int[] numbers", real: "Row of numbered parking spots" },
      { code: "numbers[0]", real: "Car in spot #0 (first spot)" },
      { code: "Array length", real: "Total number of parking spots" },
      { code: "Fixed size", real: "Can't build more spots after garage is built" }
    ],
    reminder: "Arrays are fixed-size, indexed collections of the same type."
  },

  "methods": {
    hook: "Methods are recipes you can reuse",
    story: "Instead of writing 'crack egg, whisk, heat pan, pour, flip' every time you make pancakes, you create a method: makePancakes(). Call that method whenever hungry. Methods take ingredients (parameters), follow steps (body), and return a result (pancakes). They eliminate repetition and break big programs into manageable chunks.",
    mapping: [
      { code: "Method definition", real: "Writing the recipe once" },
      { code: "Parameters", real: "Ingredients you provide (eggs, milk)" },
      { code: "Method body", real: "Step-by-step cooking instructions" },
      { code: "Return value", real: "Finished pancakes you get back" }
    ],
    reminder: "Methods package reusable logic with inputs and outputs."
  },

  "strings": {
    hook: "Strings are chains of characters",
    story: "A String is a sequence of characters linked together like a chain: 'Hello' is five links (H-e-l-l-o). Unlike char (single letter), Strings handle entire texts. They're immutable: you can't change a letter in place. Instead, operations like substring or concat create new chains. Java optimizes Strings heavily because programs use them constantly.",
    mapping: [
      { code: "String text", real: "Chain with letters as links" },
      { code: "char", real: "Single link in the chain" },
      { code: "Immutability", real: "Chain welded shut—can't change, only make new one" },
      { code: "String methods", real: "Tools to cut, combine, or inspect chains" }
    ],
    reminder: "Strings are immutable sequences of characters, optimized for text."
  },

  "string-pool": {
    hook: "String pool is a shared library of books",
    story: "When you write \"Hello\" in multiple places, Java doesn't create multiple copies. It stores one \"Hello\" in the string pool (library) and gives everyone a reference (library card) to that same copy. This saves massive memory. Using new String() bypasses the pool, like buying your own book instead of borrowing. intern() adds strings to the pool later.",
    mapping: [
      { code: "String pool", real: "Shared public library" },
      { code: "String literal \"Hi\"", real: "Library card pointing to shared book" },
      { code: "new String()", real: "Buying your own copy of the book" },
      { code: "intern()", real: "Donating your book to library for sharing" }
    ],
    reminder: "The string pool saves memory by sharing identical string literals."
  },

  "input-output": {
    hook: "Input/Output is a conversation with the user",
    story: "Programs need to talk to users and the outside world. Scanner is your ears (reading user input), System.out is your mouth (printing to console). Reading input is asking a question and waiting for an answer; printing output is telling the user something. This back-and-forth makes programs interactive instead of silent.",
    mapping: [
      { code: "Scanner", real: "Your ears listening to user speak" },
      { code: "System.out.println", real: "Your mouth speaking to user" },
      { code: "Input", real: "User's questions or data" },
      { code: "Output", real: "Program's responses or results" }
    ],
    reminder: "I/O lets programs communicate with users and external systems."
  },

  "reading-errors": {
    hook: "Error messages are GPS rerouting instructions",
    story: "When your code breaks, Java doesn't just say 'something's wrong.' It gives detailed error messages: which file, which line, what type of error. Think of it like GPS rerouting: 'You missed the turn at Main St (line 42), make a U-turn (NullPointerException).' Stack traces show your wrong-turn journey. Learning to read these saves hours of guessing.",
    mapping: [
      { code: "Error message", real: "GPS alert: 'Wrong turn ahead'" },
      { code: "Line number", real: "Exact street where you went wrong" },
      { code: "Exception type", real: "Nature of error (missed turn, road closed)" },
      { code: "Stack trace", real: "Your route history showing how you got lost" }
    ],
    reminder: "Error messages are detailed maps to bugs—read them carefully."
  },

  "regex": {
    hook: "Regex is a search pattern template",
    story: "Regular expressions are like search patterns using wildcards on steroids. Instead of finding 'hello', you can find 'any word starting with h, followed by three vowels, ending with o.' Pattern compiles your template, Matcher applies it to text. It's perfect for validation (is this an email?), extraction (grab all phone numbers), and replacement.",
    mapping: [
      { code: "Pattern", real: "Template stencil with holes (any letter, any digit)" },
      { code: "Matcher", real: "Laying stencil over text to find matches" },
      { code: "Regex \\d{3}-\\d{4}", real: "Phone pattern: 3 digits, dash, 4 digits" },
      { code: "Match found", real: "Part of text that fits the stencil" }
    ],
    reminder: "Regex defines flexible search patterns for finding and validating text."
  },

  "oop-intro": {
    hook: "OOP is building with Lego blueprints",
    story: "Object-Oriented Programming groups related data and behavior into objects, like Lego sets. A Car class is the blueprint (instructions), each Car object is a built model. Objects contain state (color, speed) and behavior (drive, brake). This models real-world things naturally and keeps code organized: car logic lives in Car, not scattered everywhere.",
    mapping: [
      { code: "Class", real: "Lego instruction booklet (blueprint)" },
      { code: "Object/instance", real: "Completed Lego model built from instructions" },
      { code: "Fields/state", real: "Physical properties of the model (color, size)" },
      { code: "Methods/behavior", real: "What the model can do (roll, transform)" }
    ],
    reminder: "OOP organizes code into objects that bundle data and behavior."
  },

  "encapsulation": {
    hook: "Encapsulation is a capsule hiding internals",
    story: "Encapsulation hides an object's inner workings behind a clean interface, like how a car capsule hides the engine complexity. You mark fields private (locked inside) and provide public getters/setters (dashboard controls) to access them safely. Users drive the car without touching spark plugs directly. This prevents misuse and allows internal changes without breaking external code.",
    mapping: [
      { code: "private fields", real: "Engine parts under locked hood" },
      { code: "public methods", real: "Steering wheel and pedals (interface)" },
      { code: "Getter/setter", real: "Dashboard controls to check/adjust safely" },
      { code: "Encapsulation", real: "Driving without knowing engine details" }
    ],
    reminder: "Encapsulation hides internals and exposes only what's needed."
  },

  "inheritance": {
    hook: "Inheritance is a family tree of traits",
    story: "Inheritance lets classes form a family tree where children inherit parents' features. A Dog class extends Animal, automatically getting Animal's fields (age) and methods (eat). Dog adds its own features (bark). This eliminates repetition: shared traits live in the parent. Subclasses specialize, like how golden retrievers are dogs with golden fur.",
    mapping: [
      { code: "Parent class (Animal)", real: "Parent with genes (eye color, height)" },
      { code: "Child class (Dog extends Animal)", real: "Child inheriting parent traits" },
      { code: "Inherited methods", real: "Skills passed down (walking, breathing)" },
      { code: "Overriding", real: "Child doing inherited action differently" }
    ],
    reminder: "Inheritance lets classes inherit and extend parent functionality."
  },

  "polymorphism": {
    hook: "Polymorphism is actors playing different roles",
    story: "Polymorphism means 'many forms': one reference type can point to many object types. An Animal reference can hold Dog, Cat, or Bird objects—like one actor playing multiple roles. When you call speak(), each animal uses its version (bark, meow, chirp). The correct method runs based on actual object type, not reference type.",
    mapping: [
      { code: "Animal reference", real: "Actor in costume" },
      { code: "Dog, Cat, Bird objects", real: "Different roles actor plays" },
      { code: "Method call animal.speak()", real: "Actor performing (plays role correctly)" },
      { code: "Runtime polymorphism", real: "Correct role chosen when curtain rises" }
    ],
    reminder: "Polymorphism lets one interface represent multiple types dynamically."
  },

  "abstraction": {
    hook: "Abstraction is a TV remote's simple interface",
    story: "Abstraction shows only essential details, hiding complexity. A TV remote has simple buttons (on, volume, channel) but hides circuit complexity inside. Abstract classes and interfaces define what must exist (every remote needs 'power' button) without specifying how. Subclasses implement the details (infrared vs Bluetooth), but users see the same simple interface.",
    mapping: [
      { code: "Abstract class/interface", real: "Remote button layout (what must exist)" },
      { code: "Abstract methods", real: "Buttons that must be on every remote" },
      { code: "Concrete implementation", real: "How each remote's internals actually work" },
      { code: "User code", real: "Person just pressing buttons, not wiring circuits" }
    ],
    reminder: "Abstraction defines what must exist without specifying how."
  },

  "interfaces": {
    hook: "Interfaces are contracts of promises",
    story: "An interface is a contract: 'Any class implementing Flyable promises to have a fly() method.' It's pure capability definition with no implementation. A Bird and Airplane both implement Flyable, promising they can fly, but each flies differently. Functional interfaces have exactly one abstract method, perfect for lambdas. Interfaces enable multiple contracts (Java doesn't allow multiple inheritance of classes).",
    mapping: [
      { code: "Interface Flyable", real: "Contract: 'I promise I can fly'" },
      { code: "fly() method", real: "Specific promise in the contract" },
      { code: "Bird implements Flyable", real: "Bird signs contract, must fulfill promise" },
      { code: "Multiple interfaces", real: "Signing multiple contracts (fly, swim)" }
    ],
    reminder: "Interfaces are contracts defining capabilities without implementation."
  },

  "enums": {
    hook: "Enums are a fixed set of options",
    story: "Enums represent fixed choices, like days of the week or card suits. Instead of error-prone strings ('monday' vs 'Monday'), enums give you type-safe constants: Day.MONDAY. Java enums are powerful classes: they can have fields, methods, and constructors. Think of them as multiple-choice questions where the answers are predefined and unchangeable.",
    mapping: [
      { code: "enum Day", real: "Days-of-week calendar boxes (fixed set)" },
      { code: "Day.MONDAY", real: "Pointing to Monday's box specifically" },
      { code: "Enum with fields", real: "Each box having notes (opening hours)" },
      { code: "Switch on enum", real: "Different actions for each day" }
    ],
    reminder: "Enums provide type-safe, fixed sets of named constants."
  },

  "static-nested": {
    hook: "Static and nested classes are rooms in a house",
    story: "Static members belong to the class itself (blueprint), not instances (built houses). A static method is like a public utility room anyone can use without owning a house. Inner classes are private rooms inside a house, accessing the house's stuff. Nested static classes are separate apartments in the building, independent but nearby.",
    mapping: [
      { code: "Static method/field", real: "Public utility room (mailboxes) shared by all" },
      { code: "Instance method/field", real: "Private room in your specific house" },
      { code: "Inner class", real: "Room inside house, accessing house's stuff" },
      { code: "Static nested class", real: "Separate apartment in same building" }
    ],
    reminder: "Static belongs to the class; inner classes live inside instances."
  },

  "object-class": {
    hook: "Object class is the ancestor of all objects",
    story: "Every class extends Object, making it the universal ancestor. Object provides essential methods: equals() compares objects (are these two pencils identical?), hashCode() generates ID numbers for fast lookups (library catalog number), toString() describes objects as text (pencil's label). Override these to define how your class behaves in comparisons, collections, and debugging.",
    mapping: [
      { code: "Object class", real: "Universal ancestor (all humans are primates)" },
      { code: "equals()", real: "Checking if two items are identical twins" },
      { code: "hashCode()", real: "Library catalog number for fast lookup" },
      { code: "toString()", real: "Name tag describing the object" }
    ],
    reminder: "Override equals, hashCode, and toString for proper object behavior."
  },

  "collections": {
    hook: "Collections Framework is a toolkit of containers",
    story: "The Collections Framework provides ready-made data structures for storing groups of objects. List is a numbered sequence (playlist), Set is unique items (lottery balls, no duplicates), Map is key-value pairs (dictionary). Each has trade-offs: ArrayList fast access, LinkedList fast insertion. You pick the right tool for the job instead of building from scratch.",
    mapping: [
      { code: "List (ArrayList)", real: "Numbered playlist of songs" },
      { code: "Set (HashSet)", real: "Lottery drum (unique balls, no duplicates)" },
      { code: "Map (HashMap)", real: "Dictionary (word → definition)" },
      { code: "Collection interface", real: "Abstract 'container' concept" }
    ],
    reminder: "Collections Framework provides optimized data structures for common needs."
  },

  "iterable-iterator": {
    hook: "Iterator is a bookmark moving through pages",
    story: "Iterable means 'you can loop through this.' Iterator is the bookmark that tracks your position as you read page by page. hasNext() checks if more pages remain, next() turns the page and returns it. Enhanced for-each (for (Item i : list)) uses iterators behind the scenes, simplifying the syntax. Iterators let you traverse any collection uniformly.",
    mapping: [
      { code: "Iterable collection", real: "Book you can read cover to cover" },
      { code: "Iterator", real: "Bookmark tracking your page" },
      { code: "hasNext()", real: "Checking if pages remain" },
      { code: "next()", real: "Turning page and reading it" }
    ],
    reminder: "Iterators traverse collections one element at a time with consistent API."
  },

  "list-implementations": {
    hook: "List implementations are different notebook styles",
    story: "ArrayList is a spiral notebook: fast random access (flip to page 50 instantly) but slow insertion (squeezing in new pages). LinkedList is a binder with tabs: slow random access (flip through tabs) but fast insertion/deletion (just move tabs). Vector is an old locked notebook (synchronized, slower). Choose based on access patterns: lots of gets? ArrayList. Lots of insertions? LinkedList.",
    mapping: [
      { code: "ArrayList", real: "Spiral notebook (fast page jumps, hard to insert)" },
      { code: "LinkedList", real: "Ring binder (easy tab insertion, slow page jumps)" },
      { code: "Random access get(50)", real: "Jumping directly to page 50" },
      { code: "Insertion add(5, item)", real: "Squeezing new page into middle" }
    ],
    reminder: "ArrayList for fast access, LinkedList for fast insertion/deletion."
  },

  "map-set-internals": {
    hook: "HashMap is a post office with sorting bins",
    story: "HashMap uses hashing: it calculates each key's hashCode (address) to determine which bin (bucket) to store it in. Retrieval is fast because it checks only one bin, not all items. HashSet is a HashMap where values don't matter (set of keys only). TreeMap keeps keys sorted like alphabetized files, while LinkedHashMap remembers insertion order like a timeline.",
    mapping: [
      { code: "HashMap", real: "Post office bins sorted by ZIP code" },
      { code: "hashCode()", real: "ZIP code determining which bin" },
      { code: "HashSet", real: "Bins of unique items (no duplicates)" },
      { code: "TreeMap", real: "Alphabetized filing cabinet (sorted keys)" }
    ],
    reminder: "HashMap uses hashing for fast lookup; TreeMap keeps keys sorted."
  },

  "comparable-comparator": {
    hook: "Comparable and Comparator define sorting rules",
    story: "Comparable is a class saying 'I know how to compare myself to others,' like people knowing their height order. Comparator is an external judge defining custom rules: 'sort people by age, not height.' Comparable is the natural order (alphabetical for strings), Comparator provides alternative orders. Collections.sort() uses these to organize lists.",
    mapping: [
      { code: "Comparable (natural order)", real: "People naturally comparing heights" },
      { code: "compareTo() method", real: "'Am I taller, shorter, or same?'" },
      { code: "Comparator (custom order)", real: "Judge sorting by different rule (age)" },
      { code: "Collections.sort(list, comparator)", real: "Sorting with external judge's rules" }
    ],
    reminder: "Comparable for natural order, Comparator for custom sorting rules."
  },

  "generics-basics": {
    hook: "Generics are adjustable container templates",
    story: "Generics let you create type-safe containers without specifying the exact type upfront. List<String> is a list holding only strings, List<Integer> only integers. The <T> is a placeholder: 'this works for any type T.' Generics catch errors at compile-time instead of runtime and eliminate casting. It's like a factory machine adjustable to stamp different shapes.",
    mapping: [
      { code: "List<String>", real: "Box labeled 'only strings allowed'" },
      { code: "<T> type parameter", real: "Adjustable mold for any type" },
      { code: "Type safety", real: "Machine rejects wrong-shaped items" },
      { code: "No casting needed", real: "Items come out already the right shape" }
    ],
    reminder: "Generics provide compile-time type safety for collections and classes."
  },

  "queue-deque": {
    hook: "Queue is a line at a coffee shop",
    story: "Queue is first-in-first-out (FIFO): the first customer in line is served first. offer() adds to back of line, poll() removes from front. PriorityQueue is a VIP system: important customers skip ahead based on priority. Deque (double-ended queue) lets you add/remove from both ends—like a line where workers can enter from back door or front door.",
    mapping: [
      { code: "Queue", real: "Coffee shop line (first in, first served)" },
      { code: "offer()/add()", real: "Person joining back of line" },
      { code: "poll()/remove()", real: "Barista serving front person" },
      { code: "PriorityQueue", real: "VIP system (priority skips ahead)" }
    ],
    reminder: "Queue is FIFO; PriorityQueue orders by priority; Deque allows both ends."
  },

  "concurrent-collections": {
    hook: "Concurrent collections are thread-safe vaults",
    story: "Regular collections break when multiple threads access them simultaneously (data corruption). Concurrent collections like ConcurrentHashMap use clever locking (fine-grained locks on sections) so multiple threads can work safely without waiting. It's like a bank vault with multiple private rooms: people can access their boxes simultaneously without blocking each other.",
    mapping: [
      { code: "Regular HashMap", real: "Single-user notebook (breaks if shared)" },
      { code: "ConcurrentHashMap", real: "Bank vault with private lockboxes (multi-user safe)" },
      { code: "Fine-grained locking", real: "Locking individual boxes, not entire vault" },
      { code: "CopyOnWriteArrayList", real: "Making copies so readers never wait" }
    ],
    reminder: "Concurrent collections enable safe multi-threaded access with smart locking."
  },

  "generics-erasure": {
    hook: "Generics erasure is removing training wheels at runtime",
    story: "Java erases generic type information at runtime for backward compatibility. List<String> and List<Integer> both become raw List in bytecode—the type checking happened at compile-time then disappeared. This means you can't check instanceof with generics or create arrays of them. Bridge methods patch overriding issues caused by erasure.",
    mapping: [
      { code: "List<String> at compile-time", real: "Bicycle with training wheels (type-safe)" },
      { code: "List at runtime", real: "Training wheels removed (raw type)" },
      { code: "Type erasure", real: "Removing wheels after learning to ride" },
      { code: "Bridge method", real: "Hidden adapter to make pedals match" }
    ],
    reminder: "Generics exist at compile-time but are erased at runtime for compatibility."
  },

  "exception-handling": {
    hook: "Exceptions are fire alarms for errors",
    story: "When something goes wrong (file not found, division by zero), Java throws an exception—an alarm signaling trouble. try-catch blocks are your response plan: try risky code, catch handles specific alarms (FileNotFoundException), finally always runs (cleanup). Uncaught exceptions crash your program like unhandled fires burning down the building. Checked exceptions force you to plan; unchecked ones are optional.",
    mapping: [
      { code: "try block", real: "Kitchen where fire might start" },
      { code: "throw exception", real: "Fire alarm going off" },
      { code: "catch block", real: "Firefighter response plan" },
      { code: "finally block", real: "Cleanup crew that always shows up" }
    ],
    reminder: "Exceptions signal errors; catch them to prevent crashes."
  },

  "file-io": {
    hook: "File I/O is reading and writing letters",
    story: "File I/O lets programs read data from files (letters you receive) and write data to files (letters you send). Files class manages file paths and metadata, Path represents locations, Files class has utility methods. Streams let you read/write byte-by-byte (for binaries) or line-by-line (for text). It's persistent storage: data survives program restarts.",
    mapping: [
      { code: "Reading file", real: "Opening envelope and reading letter" },
      { code: "Writing file", real: "Writing letter and sealing in envelope" },
      { code: "Path", real: "Mailing address on envelope" },
      { code: "InputStream/OutputStream", real: "Reading/writing one word at a time" }
    ],
    reminder: "File I/O reads and writes persistent data using streams."
  },

  "serialization": {
    hook: "Serialization is freeze-drying objects",
    story: "Serialization converts objects into byte streams for storage or network transfer—like freeze-drying food for shipping. Deserialization rehydrates bytes back into objects. Mark classes Serializable to enable this. It preserves object state: fields, values, structure. Useful for saving game state, caching objects, or sending over network. transient fields skip serialization.",
    mapping: [
      { code: "Serialization", real: "Freeze-drying fruit (object → bytes)" },
      { code: "Deserialization", real: "Rehydrating back to fruit (bytes → object)" },
      { code: "Serializable interface", real: "Label: 'freeze-dry safe'" },
      { code: "transient field", real: "Part that can't be preserved (water content)" }
    ],
    reminder: "Serialization converts objects to bytes for storage or transfer."
  },

  "date-time": {
    hook: "Date-Time API is a digital calendar and clock",
    story: "Old Date class was buggy; modern java.time API is robust. LocalDate is calendar date (birthday), LocalTime is clock time (meeting at 3 PM), LocalDateTime combines both, ZonedDateTime adds timezone. Period is duration in days/months (3 months later), Duration is precise time span (2 hours 30 minutes). Immutable and thread-safe, it handles timezone chaos elegantly.",
    mapping: [
      { code: "LocalDate", real: "Calendar page showing date (no time)" },
      { code: "LocalTime", real: "Wall clock showing time (no date)" },
      { code: "ZonedDateTime", real: "World clock with timezone (complete moment)" },
      { code: "Period / Duration", real: "Measuring time spans (3 days, 2 hours)" }
    ],
    reminder: "Use java.time API for robust, immutable date and time handling."
  },

  "packages-modules": {
    hook: "Packages are folders organizing files",
    story: "Packages organize classes into namespaces, preventing name collisions. com.example.util is a folder path (com/example/util) grouping related classes. Like organizing books into library sections (fiction, science), packages group classes by purpose. Modules (JPMS) are bigger: collections of packages with explicit dependencies. They're like library wings declaring what they contain and need.",
    mapping: [
      { code: "Package", real: "Folder organizing related files" },
      { code: "com.example.app", real: "Nested folder path: com/example/app" },
      { code: "import statement", real: "Asking librarian for book from specific section" },
      { code: "Module", real: "Library wing declaring contents and needs" }
    ],
    reminder: "Packages organize classes into namespaces; modules group packages."
  },

  "classpath-jar": {
    hook: "Classpath is a search path for classes",
    story: "Classpath tells Java where to find classes, like PATH for executables. It's a list of directories and JAR files. JAR (Java ARchive) is a ZIP file bundling compiled classes, resources, and metadata—like a suitcase packing your program for distribution. When running, JVM searches classpath locations to load classes. Misconfigured classpath = ClassNotFoundException.",
    mapping: [
      { code: "Classpath", real: "List of streets where Java looks for houses (classes)" },
      { code: "JAR file", real: "Suitcase packing program for travel" },
      { code: "JAR contents", real: "Clothes, toiletries (classes, resources)" },
      { code: "ClassNotFoundException", real: "Can't find house because street not on list" }
    ],
    reminder: "Classpath defines where Java finds classes; JARs bundle them."
  },

  "objects-utility": {
    hook: "Objects utility is a toolbox for null safety",
    story: "java.util.Objects provides helper methods for common operations. Objects.equals(a, b) safely compares even if a or b is null (no NullPointerException), Objects.requireNonNull() validates arguments, Objects.hash() generates hashCode easily. It's like a carpenter's safety toolbox with built-in protections against common mistakes.",
    mapping: [
      { code: "Objects.equals()", real: "Tool that compares safely even if one is broken (null)" },
      { code: "Objects.requireNonNull()", real: "Clamp checking material isn't missing before starting" },
      { code: "Objects.hash()", real: "Quick ID stamper for multiple items" },
      { code: "NullPointerException avoided", real: "Safety guard preventing hand injury" }
    ],
    reminder: "Objects utility provides null-safe operations and conveniences."
  },

  "networking-httpclient": {
    hook: "HttpClient is a messenger sending letters",
    story: "HttpClient sends HTTP requests (letters) and receives responses (replies) from web servers. You build a request (writing letter), send it, and await response. It supports sync/async calls, various HTTP methods (GET fetches, POST submits), headers (envelope metadata), and handles timeouts. It's Java's modern way to communicate with web APIs.",
    mapping: [
      { code: "HttpClient", real: "Messenger service" },
      { code: "HttpRequest", real: "Letter you're sending" },
      { code: "send()", real: "Messenger delivering letter" },
      { code: "HttpResponse", real: "Reply letter you receive" }
    ],
    reminder: "HttpClient sends HTTP requests and receives responses from servers."
  },

  "json-jackson": {
    hook: "Jackson translates objects to JSON and back",
    story: "Jackson is a translator between Java objects and JSON (JavaScript Object Notation). ObjectMapper converts objects to JSON strings (serialization) for APIs, and parses JSON back into objects (deserialization). It's like a bilingual interpreter at the border: your Java objects speak to JavaScript/APIs through Jackson's translation.",
    mapping: [
      { code: "ObjectMapper", real: "Bilingual translator at border" },
      { code: "writeValue() serialization", real: "Translating Java to JSON for export" },
      { code: "readValue() deserialization", real: "Translating JSON to Java for import" },
      { code: "JSON string", real: "Common language both sides understand" }
    ],
    reminder: "Jackson converts Java objects to JSON and vice versa."
  },

  "locks-reentrant": {
    hook: "ReentrantLock is a key you can borrow repeatedly",
    story: "ReentrantLock is an explicit lock giving fine control over synchronization. A thread can lock(), enter critical section (room), then unlock(). 'Reentrant' means the same thread can lock multiple times (borrow key repeatedly) without deadlocking itself. ReadWriteLock separates: multiple readers share read-lock (viewing room), one writer gets write-lock (exclusive editing).",
    mapping: [
      { code: "ReentrantLock", real: "Room key you can borrow multiple times" },
      { code: "lock()", real: "Locking door to enter room" },
      { code: "unlock()", real: "Unlocking when leaving room" },
      { code: "ReadWriteLock", real: "Different keys: many viewers, one editor" }
    ],
    reminder: "ReentrantLock provides explicit locking; ReadWriteLock separates read/write access."
  },

  "synchronizers": {
    hook: "Synchronizers coordinate thread teamwork",
    story: "Synchronizers help threads coordinate complex workflows. CountDownLatch is a countdown: threads wait until count reaches zero (waiting for all teammates to arrive). CyclicBarrier is a meeting point: threads pause until all arrive, then proceed together (synchronized start). Semaphore limits access: only N threads enter at once (restaurant capacity limit).",
    mapping: [
      { code: "CountDownLatch", real: "Countdown to rocket launch (wait for zero)" },
      { code: "CyclicBarrier", real: "Meeting point—wait for all teammates before starting" },
      { code: "Semaphore", real: "Restaurant capacity limit (only N diners)" },
      { code: "await()/release()", real: "Waiting at gate, then gate opens" }
    ],
    reminder: "Synchronizers coordinate threads with latches, barriers, and semaphores."
  },

  "atomic-classes": {
    hook: "Atomic classes are uninterruptible operations",
    story: "Atomic operations happen completely or not at all—no half-finished states. AtomicInteger uses CPU-level compare-and-swap (CAS) for lock-free thread-safe counters. It's faster than synchronized because no lock waiting. Think of it like an ATM withdrawal: money deducts fully or not at all, never half-deducted. Perfect for counters, flags, and references updated by many threads.",
    mapping: [
      { code: "AtomicInteger counter", real: "ATM machine (transaction completes fully)" },
      { code: "incrementAndGet()", real: "Withdraw that finishes or fails entirely" },
      { code: "compareAndSet()", real: "Check balance then withdraw atomically" },
      { code: "Lock-free", real: "No waiting in line (faster)" }
    ],
    reminder: "Atomic classes provide lock-free, thread-safe operations using CAS."
  },

  "blocking-queue": {
    hook: "BlockingQueue is a conveyor belt with limits",
    story: "BlockingQueue is a thread-safe queue where producers add items and consumers remove them—a classic producer-consumer pattern. If queue is full, producers wait (block) until space opens. If empty, consumers wait until items arrive. It's like a factory conveyor belt: workers add items at one end, other workers take from other end, and it handles coordination automatically.",
    mapping: [
      { code: "BlockingQueue", real: "Factory conveyor belt between stations" },
      { code: "put() producer", real: "Worker placing item on belt (waits if full)" },
      { code: "take() consumer", real: "Worker grabbing item from belt (waits if empty)" },
      { code: "Bounded capacity", real: "Belt has max capacity before jammed" }
    ],
    reminder: "BlockingQueue coordinates producer-consumer with automatic blocking."
  },

  "annotations": {
    hook: "Annotations are sticky note metadata",
    story: "Annotations add metadata to code without changing logic. @Override tells compiler 'this overrides parent method, warn me if wrong.' @Deprecated marks old code as 'don't use this anymore.' Frameworks read annotations at runtime (reflection) or compile-time to generate code, configure behavior, or validate. They're sticky notes giving instructions to tools, not to the JVM directly.",
    mapping: [
      { code: "@Override", real: "Sticky note: 'Check this matches parent method'" },
      { code: "@Deprecated", real: "Warning sticker: 'Old, use alternative instead'" },
      { code: "Custom annotation", real: "Your own colored sticky note system" },
      { code: "Annotation processing", real: "Assistant reading notes and taking action" }
    ],
    reminder: "Annotations add metadata for tools, frameworks, and compilers."
  },

  "junit-basics": {
    hook: "JUnit is a safety inspector for code",
    story: "JUnit lets you write tests—code that checks if other code works correctly. Each @Test method is a test case: does this method return expected result? assertEquals() checks results, assertTrue() validates conditions. Tests act as safety inspectors catching bugs early. Run tests frequently to ensure changes don't break existing functionality (regression).",
    mapping: [
      { code: "@Test method", real: "Inspector checking one specific safety rule" },
      { code: "assertEquals()", real: "Measuring if output matches blueprint" },
      { code: "Test suite", real: "Complete inspection checklist" },
      { code: "Green tests pass", real: "Building passes inspection" }
    ],
    reminder: "JUnit tests verify code correctness automatically and repeatedly."
  },

  "properties-i18n": {
    hook: "Properties files are translation dictionaries",
    story: "Properties files store key-value pairs for configuration or internationalization (i18n). greeting=Hello in English file, greeting=Hola in Spanish file. ResourceBundle loads the right file based on user's locale, enabling your app to speak multiple languages. It's like having translation dictionaries: code uses keys, file provides translated text.",
    mapping: [
      { code: "Properties file", real: "Translation dictionary for one language" },
      { code: "key=value", real: "English word → French translation" },
      { code: "ResourceBundle", real: "Librarian fetching correct dictionary by country" },
      { code: "Locale", real: "User's language/country setting" }
    ],
    reminder: "Properties files externalize config and translations for internationalization."
  },

  "core-best-practices": {
    hook: "Best practices are the road rules of coding",
    story: "Professional Java follows established patterns: null-check parameters, close resources in finally/try-with-resources, prefer immutability, avoid raw types, use meaningful names. These aren't arbitrary; they prevent common bugs and make code maintainable. Think of them as road rules: driving on the right side, signaling turns. Following them keeps your codebase safe and navigable.",
    mapping: [
      { code: "Null checks", real: "Checking blind spots before turning" },
      { code: "Close resources", real: "Turning off engine when parked" },
      { code: "Immutable objects", real: "Sealed packages (can't tamper)" },
      { code: "Meaningful names", real: "Clear road signs, not cryptic codes" }
    ],
    reminder: "Best practices prevent bugs and improve code maintainability."
  },

  "reflection-api": {
    hook: "Reflection is X-ray vision for code",
    story: "Reflection lets you inspect and modify classes at runtime—like X-ray vision seeing internals. You can discover methods, fields, constructors, invoke private methods, create instances dynamically. Frameworks use it heavily (Spring, Hibernate). But it's slow, breaks encapsulation, and bypasses compile-time checks. Use sparingly: powerful but dangerous, like X-rays—useful but with side effects.",
    mapping: [
      { code: "Class.forName()", real: "Looking up blueprint in library" },
      { code: "getDeclaredMethods()", real: "X-ray listing all methods" },
      { code: "setAccessible(true)", real: "Bypassing locked door (security risk)" },
      { code: "invoke() method", real: "Remote-controlling object actions" }
    ],
    reminder: "Reflection inspects/modifies code at runtime—powerful but costly."
  },

  "mockito-testing": {
    hook: "Mockito creates stand-in actors for tests",
    story: "Testing often requires isolating code from dependencies (databases, APIs). Mockito creates mock objects—stand-in actors that pretend to be real dependencies. You control their responses: when(service.getUser()).thenReturn(fakeUser). This lets you test your code in isolation without real databases or networks, making tests fast, reliable, and repeatable.",
    mapping: [
      { code: "Mock object", real: "Stand-in actor in rehearsal (not real actor)" },
      { code: "when().thenReturn()", real: "Director: 'when asked, say this line'" },
      { code: "verify()", real: "Checking actor said their lines correctly" },
      { code: "Real dependency", real: "Actual expensive actor (not available for practice)" }
    ],
    reminder: "Mockito creates fake dependencies for fast, isolated unit tests."
  },

  "var-keyword": {
    hook: "var is auto-fill for obvious types",
    story: "var lets the compiler infer types from the right-hand side, reducing verbosity. Instead of Map<String, List<Integer>> map = new HashMap<>(), write var map = new HashMap<String, List<Integer>>(). Type is still determined at compile-time (not dynamic). It's like auto-fill in forms: you provide the data, computer fills the label. Readability over brevity—only use when type is obvious.",
    mapping: [
      { code: "var list = new ArrayList<String>()", real: "Auto-fill guesses 'ArrayList' from context" },
      { code: "Type inference", real: "Computer reads your data, fills form label" },
      { code: "Compile-time type", real: "Label filled once, permanent on form" },
      { code: "Reduced verbosity", real: "Less repetitive writing by hand" }
    ],
    reminder: "var infers types at compile-time for less verbose code."
  },

  "auto-closeable": {
    hook: "AutoCloseable is self-closing doors",
    story: "Resources like files, connections need closing after use to avoid leaks. AutoCloseable + try-with-resources guarantees cleanup: resources declared in try() auto-close when block exits, even if exceptions occur. It's like self-closing doors: you walk through, door closes behind you automatically. No forgetting to close, no finally blocks cluttering code.",
    mapping: [
      { code: "AutoCloseable resource", real: "Self-closing door" },
      { code: "try-with-resources", real: "Walking through door (auto-closes behind)" },
      { code: "close() method", real: "Door closing mechanism" },
      { code: "Resource leak avoided", real: "No doors left open wasting energy" }
    ],
    reminder: "AutoCloseable + try-with-resources ensures resources close automatically."
  },

  "spi-serviceloader": {
    hook: "ServiceLoader is a plugin system",
    story: "Service Provider Interface (SPI) lets you define interfaces and load implementations at runtime—a plugin architecture. ServiceLoader discovers implementations via META-INF/services files. It's like a universal remote with plugin slots: you define remote interface, manufacturers provide implementations (Sony plugin, LG plugin), ServiceLoader detects and loads them without hardcoding.",
    mapping: [
      { code: "Service interface", real: "Universal remote button layout" },
      { code: "Service provider", real: "Brand-specific plugin (Sony, LG)" },
      { code: "ServiceLoader", real: "Remote detecting and loading plugins" },
      { code: "META-INF/services file", real: "List of available plugins" }
    ],
    reminder: "SPI + ServiceLoader enables runtime plugin discovery and loading."
  },

  "assertions": {
    hook: "Assertions are developer safety checks",
    story: "Assertions (assert condition) verify assumptions during development. They're like smoke alarms: if condition is false, program fails fast with AssertionError. Disabled by default in production for performance. Use them to catch impossible states, documenting assumptions. Unlike exceptions, assertions are for bugs (logic errors), not expected failures (file not found).",
    mapping: [
      { code: "assert x > 0", real: "Smoke detector checking 'no fire here'" },
      { code: "AssertionError", real: "Alarm blaring (impossible state detected)" },
      { code: "Disabled in production", real: "Alarms off in final building (performance)" },
      { code: "Development check", real: "Safety inspection during construction" }
    ],
    reminder: "Assertions catch impossible states in development; disabled in production."
  },

  "initialization-order": {
    hook: "Initialization order is a building construction sequence",
    story: "Java initializes classes in strict order: static blocks run once when class loads (foundation), then instance blocks run per object (framing), then constructors (finishing). Understanding this prevents bugs: accessing uninitialized fields crashes. Initialization order is like building a house: foundation before walls, walls before roof. Skip steps, house collapses.",
    mapping: [
      { code: "Static block", real: "Pouring foundation (once per building)" },
      { code: "Instance block", real: "Framing walls (per apartment)" },
      { code: "Constructor", real: "Finishing interior (per resident's customization)" },
      { code: "Field initialization", real: "Installing fixtures before residents arrive" }
    ],
    reminder: "Initialization follows strict order: static → instance → constructor."
  },

  "lambda-expressions": {
    hook: "Lambdas are shorthand for tiny functions",
    story: "Lambdas are anonymous functions—code blocks passed as arguments. Instead of creating a full class, (x, y) -> x + y defines add function inline. They're concise expressions for functional interfaces (one abstract method). Perfect for callbacks, filters, and streams. Think of them as recipe cards: small, self-contained instructions you hand to someone.",
    mapping: [
      { code: "(x, y) -> x + y", real: "Recipe card: 'add ingredients'" },
      { code: "Functional interface", real: "Card holder accepting one recipe type" },
      { code: "Lambda expression", real: "Handwritten shorthand recipe" },
      { code: "Anonymous function", real: "Recipe with no title, just steps" }
    ],
    reminder: "Lambdas are concise anonymous functions for functional interfaces."
  },

  "method-references": {
    hook: "Method references are shortcuts to existing recipes",
    story: "Method references (::) are even shorter than lambdas: instead of x -> System.out.println(x), write System.out::println. They point to existing methods by name. It's like referencing a published cookbook recipe by page number instead of rewriting it. Use when lambda just calls an existing method—why rewrite when you can reference?",
    mapping: [
      { code: "System.out::println", real: "Page reference: 'see cookbook page 42'" },
      { code: "Class::method", real: "Author name and recipe title" },
      { code: "Lambda x -> method(x)", real: "Rewriting the recipe by hand" },
      { code: "Method reference shortcut", real: "Just citing existing recipe (faster)" }
    ],
    reminder: "Method references (::) point to existing methods, shorter than lambdas."
  },

  "stream-api": {
    hook: "Streams are assembly lines for data",
    story: "Stream API processes collections like assembly lines: each element flows through operations (filter, map, sort), transformed step-by-step. It's declarative: you describe what, not how. stream().filter(x -> x > 10).map(x -> x * 2) means 'keep items > 10, double them.' Lazy evaluation: operations don't run until terminal operation (collect, forEach). Efficient and readable.",
    mapping: [
      { code: "stream()", real: "Starting assembly line belt" },
      { code: "filter()", real: "Quality inspector removing defects" },
      { code: "map()", real: "Worker transforming each item" },
      { code: "collect()", real: "Boxing finished products at end" }
    ],
    reminder: "Streams process collections declaratively with chained operations."
  },

  "stream-advanced": {
    hook: "Advanced streams are sorting and packaging plants",
    story: "Collectors package stream results into complex structures. Collectors.groupingBy() sorts items into categories (group students by grade), Collectors.partitioningBy() splits into two groups (pass/fail), Collectors.joining() concatenates strings. It's like a packaging plant: items arrive, machines sort by criteria, results box into specified containers (List, Map, String).",
    mapping: [
      { code: "Collectors.groupingBy()", real: "Sorting machine grouping by category" },
      { code: "Collectors.partitioningBy()", real: "Splitter: pass to left, fail to right" },
      { code: "Collectors.toMap()", real: "Packaging into labeled bins (dictionary)" },
      { code: "Collectors.joining()", real: "Stringing items together with glue" }
    ],
    reminder: "Collectors transform stream results into collections, strings, and maps."
  },

  "optional": {
    hook: "Optional is a box that might be empty",
    story: "Optional<T> is a container that either holds a value or is empty—explicit null handling. Instead of returning null (crashes if unchecked), return Optional.empty(). Caller must handle absence via isPresent(), orElse(), or ifPresent(). It's like a delivery box: might contain package (value) or be empty. You check before assuming contents.",
    mapping: [
      { code: "Optional<String>", real: "Delivery box (may contain item or be empty)" },
      { code: "Optional.of(value)", real: "Sealed box with package inside" },
      { code: "Optional.empty()", real: "Empty box delivered" },
      { code: "orElse(default)", real: "Use backup item if box empty" }
    ],
    reminder: "Optional explicitly handles presence/absence, avoiding null crashes."
  },

  "records": {
    hook: "Records are pre-printed data forms",
    story: "Records are immutable data carriers with concise syntax. record Person(String name, int age) auto-generates constructor, getters, equals, hashCode, toString. They're boilerplate-free data classes. Think of them as pre-printed forms: you just fill in fields, Java handles the rest. Perfect for DTOs (data transfer objects), value objects, and simple data holders.",
    mapping: [
      { code: "record Person(name, age)", real: "Pre-printed form with name and age blanks" },
      { code: "Auto-generated methods", real: "Form with built-in calculations and labels" },
      { code: "Immutability", real: "Form written in permanent ink" },
      { code: "Concise syntax", real: "One-line form instead of multi-page document" }
    ],
    reminder: "Records are immutable data classes with automatic boilerplate."
  },

  "sealed-classes": {
    hook: "Sealed classes are exclusive clubs with guest lists",
    story: "Sealed classes restrict which classes can extend them—an explicit, limited hierarchy. sealed class Shape permits Circle, Square means only Circle and Square can extend Shape. It's an exclusive club with a guest list. This enables exhaustive pattern matching (compiler knows all possible subtypes) and communicates design intent: these are all the shapes, no more.",
    mapping: [
      { code: "sealed class Shape", real: "Exclusive club with membership rules" },
      { code: "permits Circle, Square", real: "Guest list: only these allowed" },
      { code: "Subclasses", real: "Members on the guest list" },
      { code: "Exhaustive matching", real: "Knowing exact guest list for planning" }
    ],
    reminder: "Sealed classes restrict subclasses to a known, limited set."
  },

  "pattern-matching": {
    hook: "Pattern matching is x-ray vision + smart casting",
    story: "Pattern matching combines type-checking and casting in one step. if (obj instanceof String s) checks type and casts to s automatically—no manual cast needed. Switch pattern matching extends this: switch on types, patterns, even deconstruct records. It's x-ray vision: 'if this is a String, I can now see it as String and use String methods immediately.'",
    mapping: [
      { code: "instanceof String s", real: "X-ray identifies as String, extracts it ready-to-use" },
      { code: "Pattern variable s", real: "Extracted item labeled and ready" },
      { code: "Type test + cast", real: "Old way: check, then manually unpack" },
      { code: "Switch pattern", real: "X-ray sorting machine by type" }
    ],
    reminder: "Pattern matching combines type-checking and casting into one step."
  },

  "sequenced-collections": {
    hook: "Sequenced collections have first and last exits",
    story: "Java 21 adds SequencedCollection interface unifying order-aware collections. Methods like getFirst(), getLast(), reversed() work uniformly on List, Deque, LinkedHashSet. It's like buildings with standardized first/last exits: regardless of building type (office, library), you know where first and last doors are. Simplifies working with ordered data.",
    mapping: [
      { code: "SequencedCollection", real: "Building with first and last marked exits" },
      { code: "getFirst()", real: "Using first exit door" },
      { code: "getLast()", real: "Using last exit door" },
      { code: "reversed()", real: "Walking through building backwards" }
    ],
    reminder: "SequencedCollection provides uniform first/last access for ordered collections."
  },

  "concurrency-basics": {
    hook: "Concurrency is a kitchen with multiple cooks",
    story: "Concurrency means multiple threads (cooks) working simultaneously. Threads share memory (kitchen counters), creating coordination challenges: two cooks grabbing the same knife (race condition), one waiting for other to finish cutting (blocking). Proper coordination (locks, synchronization) prevents chaos. Concurrency enables parallelism (faster cooking) but requires careful choreography.",
    mapping: [
      { code: "Thread", real: "Individual cook in kitchen" },
      { code: "Shared memory", real: "Shared counters and ingredients" },
      { code: "Race condition", real: "Two cooks grabbing same knife" },
      { code: "Synchronization", real: "Taking turns, coordinated choreography" }
    ],
    reminder: "Concurrency enables parallelism but requires coordination to avoid conflicts."
  },

  "java-memory-model": {
    hook: "Memory model is the postal delivery rules",
    story: "Java Memory Model (JMM) defines when writes by one thread become visible to others—like postal delivery rules. Happens-before relationships guarantee ordering: synchronized block entry happens-before exit, volatile write happens-before read. Without these guarantees, CPUs might reorder or cache operations, causing one thread to see stale data. JMM ensures predictable multi-threaded behavior.",
    mapping: [
      { code: "Happens-before relationship", real: "Mail sent Monday guaranteed delivered before Thursday" },
      { code: "volatile variable", real: "Express mail (immediate visibility)" },
      { code: "Synchronized block", real: "Registered mail with delivery confirmation" },
      { code: "Memory visibility", real: "When recipient actually sees the letter" }
    ],
    reminder: "JMM guarantees when thread writes become visible to other threads."
  },

  "threadlocal-pitfalls": {
    hook: "ThreadLocal is a personal locker per thread",
    story: "ThreadLocal gives each thread its own copy of a variable—personal lockers in a gym. Thread A's value doesn't affect Thread B's. Useful for user context or transaction state. Pitfall: thread pools reuse threads, so stale values leak between requests if not cleared. Always remove() after use, or you'll find someone else's gym clothes in your locker.",
    mapping: [
      { code: "ThreadLocal variable", real: "Personal locker per gym member" },
      { code: "get()/set()", real: "Opening your locker, storing items" },
      { code: "Thread reuse", real: "Locker reassigned to new member" },
      { code: "remove() cleanup", real: "Emptying locker when leaving gym" }
    ],
    reminder: "ThreadLocal stores per-thread data; always clean up to avoid leaks."
  },

  "fork-join": {
    hook: "Fork/Join is divide-and-conquer teamwork",
    story: "Fork/Join Framework splits big tasks into smaller subtasks (fork), processes them in parallel, then combines results (join). Like cleaning a house: fork into rooms, each person cleans one room (parallel), then join when all done. Work-stealing: idle threads steal tasks from busy threads, balancing load. Recursive divide-and-conquer made efficient.",
    mapping: [
      { code: "Fork", real: "Dividing house into rooms, assigning people" },
      { code: "Subtasks", real: "Individual rooms to clean" },
      { code: "Join", real: "Everyone meeting when all rooms done" },
      { code: "Work-stealing", real: "Idle cleaner helping busy cleaner" }
    ],
    reminder: "Fork/Join divides tasks recursively, processes in parallel, combines results."
  },

  "virtual-threads": {
    hook: "Virtual threads are lightweight phone lines",
    story: "Virtual threads (Project Loom) are ultra-lightweight: millions fit in memory vs. thousands of platform threads. Each virtual thread is a cheap phone line; platform threads are expensive cellular towers. Virtual threads block without wasting OS threads—when waiting, they park, freeing underlying resources. Perfect for high-concurrency I/O (thousands of connections), making concurrent code simple and scalable.",
    mapping: [
      { code: "Platform thread", real: "Expensive cellular tower (limited number)" },
      { code: "Virtual thread", real: "Cheap VoIP line (millions possible)" },
      { code: "Blocking", real: "Phone on hold (doesn't block tower)" },
      { code: "High concurrency", real: "Millions of concurrent calls" }
    ],
    reminder: "Virtual threads are cheap, allowing millions of concurrent tasks easily."
  },

  "completable-future": {
    hook: "CompletableFuture is a restaurant pager",
    story: "CompletableFuture represents async computation result—a pager buzzing when food's ready. You submit task (order food), continue doing other things (shopping), then retrieve result when ready (pick up food). Supports chaining: thenApply() transforms result, thenCompose() chains dependent async tasks. Combines multiple futures, handles exceptions, enables reactive-style programming without blocking.",
    mapping: [
      { code: "CompletableFuture<T>", real: "Restaurant pager (buzzes when ready)" },
      { code: "supplyAsync()", real: "Placing food order (async task)" },
      { code: "thenApply()", real: "Processing food when ready (add sauce)" },
      { code: "get()", real: "Picking up food (blocks until ready)" }
    ],
    reminder: "CompletableFuture enables async programming with chaining and composition."
  },

  "structured-concurrency": {
    hook: "Structured concurrency is a family road trip plan",
    story: "Structured concurrency ensures all subtasks complete (or fail) together—no orphaned threads. StructuredTaskScope groups related tasks: if one fails, cancel others. It's like a family road trip: if one car breaks down, everyone stops together, no one drives on alone. Subtasks live within parent scope, lifecycle bound. Prevents resource leaks and simplifies error handling.",
    mapping: [
      { code: "StructuredTaskScope", real: "Family road trip plan (everyone travels together)" },
      { code: "fork() subtasks", real: "Each car in convoy (subtasks)" },
      { code: "join()", real: "Meeting at destination or stopping if one breaks down" },
      { code: "Scope lifecycle", real: "Trip starts and ends together" }
    ],
    reminder: "Structured concurrency groups tasks with shared lifecycle and failure handling."
  },

  "jdbc": {
    hook: "JDBC is a universal translator for databases",
    story: "JDBC (Java Database Connectivity) lets Java talk to databases like a universal translator. DriverManager connects (opening translator booth), Connection creates statements (asking questions), ResultSet returns answers (translated data). SQL queries in Java strings send commands; JDBC drivers translate to database-specific protocol. One API works across PostgreSQL, MySQL, Oracle.",
    mapping: [
      { code: "DriverManager", real: "Finding right translator for language" },
      { code: "Connection", real: "Opening communication channel" },
      { code: "Statement/PreparedStatement", real: "Asking questions in database language" },
      { code: "ResultSet", real: "Receiving translated answers" }
    ],
    reminder: "JDBC provides uniform API for connecting and querying databases."
  },

  "logging": {
    hook: "Logging is a flight recorder for programs",
    story: "Logging frameworks (SLF4J, Logback, Log4j) record program events like airplane black boxes. Different levels (DEBUG, INFO, WARN, ERROR) categorize severity. Logs help debug production issues, audit activity, monitor health. Loggers are organized hierarchically (com.app.service), and appenders direct output (console, file, remote). Use logging instead of println for production code.",
    mapping: [
      { code: "Logger", real: "Flight recorder in cockpit" },
      { code: "Log levels", real: "Event severity (routine, warning, critical)" },
      { code: "Appenders", real: "Recording destinations (black box, radio, paper log)" },
      { code: "Log messages", real: "Timestamped event records" }
    ],
    reminder: "Logging frameworks record program events for debugging and monitoring."
  },

  "build-tools": {
    hook: "Build tools are automated assembly factories",
    story: "Maven and Gradle automate building Java projects—assembly factories. They manage dependencies (ordering parts), compile code (assembly line), run tests (quality control), package (boxing product). pom.xml (Maven) or build.gradle (Gradle) are blueprints defining project structure and dependencies. These tools fetch libraries from repositories (warehouses), ensuring repeatable builds.",
    mapping: [
      { code: "Maven/Gradle", real: "Automated assembly factory" },
      { code: "Dependencies", real: "Ordering parts from suppliers" },
      { code: "Compile", real: "Assembly line building product" },
      { code: "Repository (Maven Central)", real: "Parts warehouse" }
    ],
    reminder: "Build tools automate dependency management, compilation, testing, and packaging."
  },

  "nio-channels": {
    hook: "NIO channels are multi-lane highways",
    story: "NIO.2 (New I/O) uses channels and buffers for scalable I/O. Channels are bidirectional pipes (multi-lane highways), buffers are temporary parking areas for data. Non-blocking I/O lets one thread handle multiple channels (traffic cop managing many lanes). Selectors monitor many channels, reacting when ready. Faster than traditional blocking I/O for high-concurrency network apps.",
    mapping: [
      { code: "Channel", real: "Multi-lane highway (bidirectional)" },
      { code: "Buffer", real: "Parking area for loading/unloading data" },
      { code: "Selector", real: "Traffic cop monitoring many lanes" },
      { code: "Non-blocking", real: "Checking lanes without waiting at each" }
    ],
    reminder: "NIO channels and selectors enable scalable, non-blocking I/O."
  },

  "jpms-deep": {
    hook: "JPMS is building security zones",
    story: "Java Platform Module System (JPMS) groups packages into modules with explicit dependencies and encapsulation. module-info.java declares exports (what's public) and requires (dependencies). It's like building security zones: modules have controlled entry points, internal packages stay hidden. Strong encapsulation prevents accidental dependencies, improving maintainability and security. Modular JDK benefits from this too.",
    mapping: [
      { code: "Module", real: "Security zone in building" },
      { code: "exports package", real: "Public lobby areas accessible to visitors" },
      { code: "requires module", real: "Security badge granting access to other zones" },
      { code: "Encapsulation", real: "Internal rooms hidden from public" }
    ],
    reminder: "JPMS modules provide strong encapsulation and explicit dependencies."
  },

  "jdbc-transactions": {
    hook: "Transactions are all-or-nothing contracts",
    story: "Transactions ensure database operations succeed together or fail together—atomic units. Transfer money: debit account A, credit account B. Both must complete or neither (rollback). ACID properties guarantee consistency. Isolation levels control how transactions see each other's changes—like conference rooms with varying soundproofing. commit() saves changes, rollback() undoes them.",
    mapping: [
      { code: "Transaction", real: "All-or-nothing contract (both signatures or neither)" },
      { code: "commit()", real: "Finalizing contract (signatures valid)" },
      { code: "rollback()", real: "Tearing up contract (reset to before)" },
      { code: "Isolation level", real: "Soundproofing between conference rooms" }
    ],
    reminder: "Transactions ensure atomic, consistent operations with commit/rollback."
  },

  "jpa-hibernate": {
    hook: "JPA/Hibernate is an object-database translator",
    story: "JPA (Java Persistence API) and Hibernate map Java objects to database tables—ORM (Object-Relational Mapping). Entities are classes representing tables, fields are columns. Hibernate translates: save(user) generates INSERT SQL. No manual SQL writing for CRUD. Relationships (@OneToMany, @ManyToOne) map foreign keys. It's a translator converting between object world and relational database world.",
    mapping: [
      { code: "Entity class", real: "Blueprint for database table" },
      { code: "@Id, @Column", real: "Marking which fields are columns/keys" },
      { code: "EntityManager.persist()", real: "Translator saying 'INSERT' to database" },
      { code: "JPQL query", real: "Asking in object language, translated to SQL" }
    ],
    reminder: "JPA/Hibernate maps objects to database tables, handling SQL automatically."
  },

  "kafka-messaging": {
    hook: "Kafka is a high-speed message highway",
    story: "Kafka is a distributed messaging system—a highway for events/messages. Producers publish messages to topics (highways), consumers subscribe and read. Messages are durable, replicated logs. Multiple consumers can read independently (like cars on highway). Perfect for event-driven architectures, real-time data pipelines, decoupling services. Scales to millions of messages per second.",
    mapping: [
      { code: "Kafka topic", real: "Highway lane for specific message type" },
      { code: "Producer", real: "Car entering highway (sending messages)" },
      { code: "Consumer", real: "Car exiting highway (reading messages)" },
      { code: "Message log", real: "Highway traffic recorded in order" }
    ],
    reminder: "Kafka streams durable messages between producers and consumers at scale."
  },

  "grpc-protobuf": {
    hook: "gRPC is a direct phone line between services",
    story: "gRPC uses Protocol Buffers (protobuf) for fast, compact RPC (Remote Procedure Calls). You define service methods in .proto files (contract), gRPC generates client/server code. Calls feel local but execute remotely. Protobuf serializes data efficiently (binary, not JSON). It's like a direct phone line between services: clear contract, fast calls, efficient encoding.",
    mapping: [
      { code: ".proto file", real: "Phone protocol (how to dial, format messages)" },
      { code: "gRPC service", real: "Direct dedicated phone line" },
      { code: "Protobuf serialization", real: "Efficient shorthand encoding messages" },
      { code: "RPC call", real: "Making phone call (feels local)" }
    ],
    reminder: "gRPC provides fast, contract-based RPC using Protocol Buffers."
  },

  "websockets-java": {
    hook: "WebSockets are two-way walkie-talkies",
    story: "WebSockets provide full-duplex communication—persistent two-way connection between client and server, unlike HTTP's request-response. Server can push updates without client asking. Perfect for chat apps, live dashboards, gaming. It's like walkie-talkies: both sides talk anytime, connection stays open. Java supports WebSockets via Jakarta EE or libraries like Tyrus.",
    mapping: [
      { code: "WebSocket connection", real: "Open walkie-talkie channel" },
      { code: "onMessage()", real: "Hearing message from other side" },
      { code: "send()", real: "Speaking into walkie-talkie" },
      { code: "Full-duplex", real: "Both sides can talk simultaneously" }
    ],
    reminder: "WebSockets enable persistent, two-way communication between client and server."
  },

  "resilience4j": {
    hook: "Resilience4j is a circuit breaker panel",
    story: "Resilience4j provides fault tolerance patterns. Circuit Breaker stops calling failing services (like electrical breaker tripping), preventing cascading failures. Retry retries failed calls, RateLimiter throttles requests (traffic cop), Bulkhead isolates resources (compartments on ship). These patterns make systems resilient to failures, gracefully degrading instead of crashing.",
    mapping: [
      { code: "Circuit Breaker", real: "Electrical breaker tripping to prevent fire" },
      { code: "Open state", real: "Breaker tripped, no power flowing" },
      { code: "Half-open state", real: "Testing if problem fixed (test power)" },
      { code: "Retry policy", real: "Trying light switch multiple times" }
    ],
    reminder: "Resilience4j provides circuit breakers and fault tolerance patterns."
  },

  "spring-boot": {
    hook: "Spring Boot is a pre-furnished apartment",
    story: "Spring Boot simplifies Spring setup with sensible defaults and auto-configuration—a pre-furnished apartment vs. empty room. @SpringBootApplication starts app, embedded Tomcat runs server, starter dependencies bundle common libraries. Convention over configuration: things work out-of-box. You customize only what's needed. Focus on business logic, not wiring infrastructure.",
    mapping: [
      { code: "Spring Boot", real: "Pre-furnished apartment (move in ready)" },
      { code: "@SpringBootApplication", real: "Key to apartment (starts everything)" },
      { code: "Auto-configuration", real: "Furniture and appliances pre-installed" },
      { code: "Starter dependencies", real: "Bundled furniture sets (kitchen, bedroom)" }
    ],
    reminder: "Spring Boot provides auto-configured, production-ready Spring apps quickly."
  },

  "rest-apis": {
    hook: "REST APIs are restaurant menus",
    story: "REST (Representational State Transfer) APIs expose resources via HTTP. URLs are menu items (GET /users/1 is 'get user 1 dish'), HTTP methods are actions (GET read, POST create, PUT update, DELETE remove). JSON typically represents data. Stateless: each request independent (no memory of previous orders). Standard, scalable, simple architecture for web services.",
    mapping: [
      { code: "REST endpoint", real: "Menu item (dish you can order)" },
      { code: "GET", real: "Reading menu or tasting dish" },
      { code: "POST", real: "Ordering new dish (create)" },
      { code: "PUT/DELETE", real: "Changing or canceling order" }
    ],
    reminder: "REST APIs expose resources via HTTP methods with stateless operations."
  },

  "reactive-java": {
    hook: "Reactive programming is a spreadsheet with formulas",
    story: "Reactive programming handles async data streams—values changing over time. Like spreadsheet formulas: when cell A changes, cells depending on A auto-update (reactive). Publishers emit data (streams), Subscribers react. Backpressure handles fast producers/slow consumers. Frameworks like Project Reactor enable non-blocking, event-driven apps. Perfect for high-concurrency, real-time systems.",
    mapping: [
      { code: "Publisher", real: "Cell producing values" },
      { code: "Subscriber", real: "Cells with formulas reacting to changes" },
      { code: "Data stream", real: "Sequence of changing values over time" },
      { code: "Backpressure", real: "Slow formula pausing fast data entry" }
    ],
    reminder: "Reactive programming handles async data streams with automatic propagation."
  },

  "spring-advanced": {
    hook: "Spring Advanced is a smart assistant network",
    story: "Advanced Spring includes AOP (Aspect-Oriented Programming, cross-cutting concerns like logging), transaction management (automatic commit/rollback), caching, messaging, scheduling. Spring context is a smart assistant network: beans collaborate, aspects weave in extra behavior, proxies intercept calls. SpEL (Spring Expression Language) is scripting for configuration. Powerful enterprise features for complex apps.",
    mapping: [
      { code: "AOP aspect", real: "Assistant logging all phone calls (cross-cutting)" },
      { code: "@Transactional", real: "Assistant ensuring all-or-nothing task completion" },
      { code: "Proxy", real: "Secretary intercepting calls before forwarding" },
      { code: "SpEL", real: "Shorthand instructions for assistants" }
    ],
    reminder: "Advanced Spring provides AOP, transactions, caching, and enterprise features."
  },

  "spring-security": {
    hook: "Spring Security is a building security system",
    story: "Spring Security handles authentication (who you are) and authorization (what you can do). Filters intercept requests (security checkpoints), checking credentials. Roles and authorities define permissions (visitor, employee, admin badges). Supports multiple auth methods (form login, OAuth, JWT). It's a complete security system: guards, badges, access logs, intrusion detection.",
    mapping: [
      { code: "Authentication", real: "Showing ID at security checkpoint" },
      { code: "Authorization", real: "Badge granting access to specific floors" },
      { code: "Security filter chain", real: "Series of checkpoints before entry" },
      { code: "Roles/Authorities", real: "Employee badges (visitor, staff, admin)" }
    ],
    reminder: "Spring Security handles authentication and authorization for applications."
  },

  "jakarta-servlet": {
    hook: "Servlets are web request handlers",
    story: "Servlets handle HTTP requests in Java web apps. HttpServlet receives requests (GET, POST), processes them (business logic), sends responses (HTML, JSON). Servlet containers (Tomcat) manage servlet lifecycle. Filters intercept requests before servlets (security checks, logging)—middleware. Servlets are foundational for Java web: Spring MVC and JAX-RS build on them.",
    mapping: [
      { code: "HttpServlet", real: "Clerk handling customer requests at desk" },
      { code: "doGet()/doPost()", real: "Clerk processing different request types" },
      { code: "Filter", real: "Security guard checking IDs before clerk" },
      { code: "Servlet container", real: "Office managing clerks' desks and schedules" }
    ],
    reminder: "Servlets handle HTTP requests; filters provide middleware capabilities."
  },

  "jvm-architecture": {
    hook: "JVM is a translator with a warehouse",
    story: "JVM (Java Virtual Machine) executes bytecode—intermediate language. Class Loader loads classes (bringing goods into warehouse), JIT (Just-In-Time) compiler translates hot code to native machine code (optimizing popular items), execution engine runs code. Memory areas: heap (object storage), stack (method calls), metaspace (class metadata). JVM abstracts hardware, enabling 'write once, run anywhere.'",
    mapping: [
      { code: "Class Loader", real: "Loading dock bringing goods into warehouse" },
      { code: "JIT Compiler", real: "Express lane for popular items (optimizing)" },
      { code: "Heap", real: "Main warehouse storage for goods (objects)" },
      { code: "Stack", real: "Loading dock work queues (method calls)" }
    ],
    reminder: "JVM loads, verifies, and executes bytecode with memory management."
  },

  "garbage-collection": {
    hook: "Garbage Collection is an automated cleanup crew",
    story: "Garbage Collection (GC) automatically reclaims unused memory—cleanup crew. Young generation holds new objects (recent trash), old generation holds long-lived objects (permanent storage). Minor GC cleans young gen frequently, major GC cleans old gen occasionally. GC algorithms (G1, ZGC, Shenandoah) balance throughput, latency, and pause times. Tuning flags optimize for specific workloads.",
    mapping: [
      { code: "Garbage Collector", real: "Automated cleanup crew" },
      { code: "Young generation", real: "Daily trash bins (frequently emptied)" },
      { code: "Old generation", real: "Storage unit (rarely sorted)" },
      { code: "GC pause", real: "Stopping work while crew cleans up" }
    ],
    reminder: "GC automatically reclaims unused memory; tuning optimizes performance."
  },

  "memory-management": {
    hook: "Memory management is a warehouse inventory system",
    story: "Memory management tracks object lifecycles. Heap stores objects (inventory items), stack stores method frames (work orders). Memory leaks occur when objects referenced but unused (items forgotten in warehouse, never removed). Profilers (VisualVM, JProfiler) identify leaks and hotspots. OutOfMemoryError happens when heap is full (warehouse overflowing). Proper management prevents crashes and slowdowns.",
    mapping: [
      { code: "Heap", real: "Warehouse storing inventory (objects)" },
      { code: "Memory leak", real: "Items forgotten in corner, never removed" },
      { code: "OutOfMemoryError", real: "Warehouse full, no space for new items" },
      { code: "Profiler", real: "Inventory audit finding forgotten items" }
    ],
    reminder: "Proper memory management prevents leaks and OutOfMemoryErrors."
  },

  "jvm-performance": {
    hook: "JVM performance tuning is engine optimization",
    story: "JVM performance tuning adjusts flags for speed and efficiency—engine optimization. Heap size (-Xmx/-Xms) controls memory (engine capacity), GC choice affects pause times (engine type), JIT compilation levels balance warmup vs. peak speed. Monitoring tools (JMX, JFR) measure performance (dashboard). Profiling identifies bottlenecks (dyno testing). Tuning is iterative: measure, adjust, repeat.",
    mapping: [
      { code: "Heap size flags", real: "Engine displacement (capacity)" },
      { code: "GC algorithm", real: "Engine type (turbo, supercharged)" },
      { code: "JIT compilation", real: "Engine warmup vs. peak performance" },
      { code: "Profiling", real: "Dyno testing to find weak points" }
    ],
    reminder: "JVM tuning adjusts memory, GC, and compilation for optimal performance."
  },

  "bytecode-asm": {
    hook: "Bytecode is assembly language for JVM",
    story: "Bytecode is JVM's instruction set—assembly language. Java compiles to bytecode (.class files), which JVM executes. ASM library lets you read/write bytecode directly (manipulating assembly). Useful for code generation, instrumentation, AOP. It's low-level: manipulating machine instructions instead of high-level Java. Powerful but intricate—most developers never touch it.",
    mapping: [
      { code: "Bytecode", real: "Assembly language instructions for machine" },
      { code: ".class file", real: "Compiled assembly program" },
      { code: "ASM library", real: "Tool editing assembly directly" },
      { code: "Instrumentation", real: "Inserting extra instructions into program" }
    ],
    reminder: "Bytecode is JVM assembly; ASM manipulates it for code generation."
  },

  "graalvm-native": {
    hook: "GraalVM Native Image is instant-on packaging",
    story: "GraalVM compiles Java to native executables—instant-on binaries. Traditional JVM has startup time (loading, JIT warmup); native images start instantly (pre-compiled to machine code). Smaller footprint, faster startup, but loses some JVM features (reflection limited). Perfect for CLI tools, serverless functions, microservices where fast startup matters.",
    mapping: [
      { code: "Native Image", real: "Pre-cooked meal (instant, ready to eat)" },
      { code: "Traditional JVM", real: "Raw ingredients needing cooking (warmup)" },
      { code: "Ahead-of-time compilation", real: "Cooking meal in advance" },
      { code: "Fast startup", real: "Meal ready immediately from fridge" }
    ],
    reminder: "GraalVM Native Image compiles Java to fast-starting native executables."
  },

  "foreign-memory": {
    hook: "Foreign Function & Memory API is crossing the border",
    story: "Foreign Function & Memory API (Project Panama) lets Java safely call native code (C libraries) and manage off-heap memory—crossing the border to other languages. It replaces JNI (complicated, unsafe) with safer, modern API. MemorySegment manages native memory, linker calls native functions. Like a border checkpoint: controlled, safe passage between Java and native worlds.",
    mapping: [
      { code: "Foreign function", real: "Visiting neighboring country (calling C code)" },
      { code: "MemorySegment", real: "Secure luggage for carrying data across border" },
      { code: "Linker", real: "Border checkpoint managing safe passage" },
      { code: "Off-heap memory", real: "Resources outside your home country (Java heap)" }
    ],
    reminder: "Foreign API enables safe Java-to-native calls and off-heap memory access."
  },

  "jvm-cli-tools": {
    hook: "JVM CLI tools are diagnostic instruments",
    story: "JVM CLI tools diagnose running apps. jcmd sends commands (master control), jstack prints thread dumps (snapshot of all threads), jmap dumps heap (memory contents), jstat monitors GC (live stats). They're diagnostic instruments: thermometer, blood pressure cuff, X-ray. Use them to investigate slowdowns, deadlocks, memory issues—essential for production troubleshooting.",
    mapping: [
      { code: "jcmd", real: "Doctor's master tool (general diagnostic)" },
      { code: "jstack", real: "X-ray of all threads (what's stuck?)" },
      { code: "jmap", real: "MRI of memory (what's consuming space?)" },
      { code: "jstat", real: "Heart rate monitor (live GC stats)" }
    ],
    reminder: "JVM CLI tools diagnose threads, memory, and GC in running applications."
  },

  "jmx-monitoring": {
    hook: "JMX is a dashboard with live gauges",
    story: "JMX (Java Management Extensions) exposes runtime metrics and management operations—live dashboard. MBeans (Managed Beans) represent resources (memory, threads, app-specific). Tools like JConsole or VisualVM connect remotely, displaying metrics (gauges), invoking operations (buttons). Monitor production apps, tune performance, trigger actions—all without restarting. Essential for observability.",
    mapping: [
      { code: "JMX", real: "Car dashboard with live gauges" },
      { code: "MBean", real: "Individual gauge (speedometer, fuel, temp)" },
      { code: "JConsole/VisualVM", real: "Viewing dashboard remotely" },
      { code: "Attributes/operations", real: "Reading gauge or pressing dashboard button" }
    ],
    reminder: "JMX exposes runtime metrics and management via MBeans for monitoring."
  },

  "jlink-runtimes": {
    hook: "jlink is packing a custom travel kit",
    story: "jlink creates custom Java runtimes with only needed modules—packing travel kit with exact toiletries, not entire bathroom. Standard JDK has all modules; jlink strips unused ones, creating smaller, faster runtime. Perfect for Docker images or embedded systems where size matters. Distribute your app with minimal JRE, reducing footprint dramatically.",
    mapping: [
      { code: "jlink", real: "Packing custom travel kit (only what you need)" },
      { code: "Standard JDK", real: "Entire bathroom cabinet (everything)" },
      { code: "Custom runtime", real: "Small toiletry bag (minimal essentials)" },
      { code: "Smaller footprint", real: "Lighter luggage for travel" }
    ],
    reminder: "jlink creates custom Java runtimes with only needed modules."
  },

  "design-patterns": {
    hook: "Design patterns are architectural blueprints",
    story: "Design patterns are proven solutions to common problems—architectural blueprints. Singleton ensures one instance (single president), Factory creates objects (assembly line), Observer notifies subscribers (newspaper subscriptions), Strategy encapsulates algorithms (payment methods). They're communication tools: saying 'use Observer' conveys entire design instantly. Learn patterns to build robust, maintainable systems.",
    mapping: [
      { code: "Singleton pattern", real: "Country having one president" },
      { code: "Factory pattern", real: "Assembly line producing different car models" },
      { code: "Observer pattern", real: "Newspaper subscribers getting updates" },
      { code: "Strategy pattern", real: "Different payment methods (cash, card, crypto)" }
    ],
    reminder: "Design patterns are reusable solutions to common design problems."
  },

  "solid-principles": {
    hook: "SOLID principles are building code that lasts",
    story: "SOLID principles guide maintainable OOP design. Single Responsibility: class does one thing (chef vs. dishwasher). Open/Closed: extend without modifying (plugins). Liskov Substitution: subclasses replace parents seamlessly (any car fits parking spot). Interface Segregation: small interfaces (specific tools, not Swiss army knife). Dependency Inversion: depend on abstractions (contract, not specific vendor).",
    mapping: [
      { code: "Single Responsibility", real: "Chef cooks, dishwasher cleans (one job each)" },
      { code: "Open/Closed", real: "Plugin system (extend without changing core)" },
      { code: "Liskov Substitution", real: "Any car fits standard parking spot" },
      { code: "Dependency Inversion", real: "Depending on contract, not specific vendor" }
    ],
    reminder: "SOLID principles create flexible, maintainable object-oriented designs."
  },

  "microservices": {
    hook: "Microservices are independent food trucks",
    story: "Microservices architecture splits apps into small, independent services—food trucks instead of mega-restaurant. Each service owns one business capability (payment service, user service), deploys independently, scales independently. Communicate via APIs (customers ordering from different trucks). Decoupled: one truck closing doesn't shut down others. Complex coordination but flexible and scalable.",
    mapping: [
      { code: "Microservice", real: "Independent food truck (one specialty)" },
      { code: "Monolith", real: "Mega-restaurant (everything under one roof)" },
      { code: "API communication", real: "Customers ordering from different trucks" },
      { code: "Independent deployment", real: "One truck renovates without closing others" }
    ],
    reminder: "Microservices are small, independent services communicating via APIs."
  },

  "distributed-systems": {
    hook: "Distributed systems are coordinating branch offices",
    story: "Distributed systems run across multiple machines—coordinating branch offices. Challenges: network partitions (office loses phone connection), eventual consistency (branches syncing ledgers), distributed transactions (multi-office deal). Patterns: leader election (choosing manager), consensus (offices agreeing), circuit breakers (isolating failing office). CAP theorem: choose two of Consistency, Availability, Partition-tolerance.",
    mapping: [
      { code: "Distributed system", real: "Company with multiple branch offices" },
      { code: "Network partition", real: "Branch losing phone connection" },
      { code: "Eventual consistency", real: "Branches syncing ledgers overnight" },
      { code: "Consensus", real: "All offices agreeing on decision" }
    ],
    reminder: "Distributed systems coordinate multiple machines with network challenges."
  },

  "security": {
    hook: "Java security is a layered defense system",
    story: "Security best practices protect against threats. Validate inputs (bouncer checking IDs), parameterized queries prevent SQL injection (no forged tickets), encrypt sensitive data (lock valuables in safe), use HTTPS (armored transport), follow least privilege (limited access badges). Layers of defense: one breach doesn't collapse everything. Security is ongoing vigilance, not one-time setup.",
    mapping: [
      { code: "Input validation", real: "Bouncer checking IDs at door" },
      { code: "SQL injection prevention", real: "No forged tickets accepted" },
      { code: "Encryption", real: "Locking valuables in safe" },
      { code: "Least privilege", real: "Access badges limited to needed areas" }
    ],
    reminder: "Security requires layered defenses: validation, encryption, least privilege."
  },

  "caching": {
    hook: "Caching is keeping frequently-used items on the counter",
    story: "Caching stores frequently-accessed data in fast storage—keeping ingredients on counter instead of fetching from basement pantry each time. Reduces latency and load. Strategies: cache-aside (check cache first, load on miss), write-through (update cache and DB), TTL (time-to-live expiring stale items). Trade-offs: speed vs. staleness. Distributed caches (Redis) share across servers.",
    mapping: [
      { code: "Cache", real: "Counter with frequently-used ingredients" },
      { code: "Cache miss", real: "Item not on counter, fetch from pantry (slow)" },
      { code: "Cache hit", real: "Item on counter, grab immediately (fast)" },
      { code: "TTL expiration", real: "Throwing out old ingredients after date" }
    ],
    reminder: "Caching speeds access by storing frequently-used data in fast storage."
  },

  "testing-advanced": {
    hook: "Advanced testing is a multi-stage inspection factory",
    story: "Advanced testing includes integration tests (testing assembled modules), contract testing (API agreements between services), performance testing (load/stress), mutation testing (injecting bugs to test test quality). Each stage catches different issues: unit tests catch logic bugs, integration tests catch interface issues, performance tests catch slowness. Comprehensive testing ensures quality.",
    mapping: [
      { code: "Integration test", real: "Testing assembled components together" },
      { code: "Contract test", real: "Verifying supplier parts match spec" },
      { code: "Performance test", real: "Stress-testing under heavy load" },
      { code: "Mutation test", real: "Sabotaging product to test inspectors" }
    ],
    reminder: "Advanced testing includes integration, contract, performance, and mutation tests."
  },

  "observability": {
    hook: "Observability is a hospital monitoring system",
    story: "Observability means understanding system internals from external outputs—hospital monitoring patient vitals. Three pillars: metrics (heart rate), logs (doctor's notes), traces (patient journey through departments). Tools (Prometheus, Grafana, Jaeger) collect and visualize. Observability enables diagnosing production issues, detecting anomalies, understanding behavior. It's proactive: see problems before users complain.",
    mapping: [
      { code: "Metrics", real: "Vital signs monitor (heart rate, BP)" },
      { code: "Logs", real: "Doctor's timestamped notes" },
      { code: "Traces", real: "Patient journey through departments" },
      { code: "Dashboards", real: "Nurse's station monitoring all patients" }
    ],
    reminder: "Observability uses metrics, logs, and traces to understand system health."
  },

  "cicd-containers": {
    hook: "CI/CD is an automated delivery pipeline",
    story: "CI/CD automates building, testing, and deploying—automated factory pipeline. Continuous Integration (CI) merges code frequently, running tests (quality checks on assembly line). Continuous Deployment (CD) automatically deploys passing builds (shipping finished products). Containers (Docker) package apps with dependencies (shipping containers). Pipeline tools (Jenkins, GitHub Actions) orchestrate steps.",
    mapping: [
      { code: "CI (Continuous Integration)", real: "Assembly line merging parts, testing" },
      { code: "CD (Continuous Deployment)", real: "Automated shipping of finished products" },
      { code: "Docker container", real: "Shipping container with everything needed" },
      { code: "Pipeline", real: "Conveyor belt from factory to warehouse to store" }
    ],
    reminder: "CI/CD automates testing and deployment; containers package apps."
  },

  "java-roadmap": {
    hook: "Java roadmap is the highway ahead",
    story: "Java evolves with regular releases every six months—highway extending ahead. LTS (Long-Term Support) versions are rest stops (Java 11, 17, 21), supported for years. Non-LTS versions are milestones, introducing features incubated as previews. Project Loom (virtual threads), Panama (native interop), Valhalla (value types) are major initiatives. Roadmap shows where Java is heading.",
    mapping: [
      { code: "LTS version", real: "Rest stop with full services (Java 17, 21)" },
      { code: "Six-month release", real: "Highway milestone marker" },
      { code: "Preview feature", real: "Exit ramp under construction (try but not final)" },
      { code: "Major project", real: "Highway expansion project (Loom, Panama)" }
    ],
    reminder: "Java releases every six months; LTS versions are long-term stable."
  },

  "tls-keystore": {
    hook: "TLS and KeyStore are secure mail with seals",
    story: "TLS (Transport Layer Security) encrypts network traffic—sealing letters in tamper-proof envelopes. Certificates prove identity (notarized ID). KeyStore stores keys and certificates (locked vault). SSL/TLS handshake establishes secure channel (exchanging keys before encrypting messages). Prevents eavesdropping and tampering. Essential for HTTPS, secure APIs, database connections.",
    mapping: [
      { code: "TLS encryption", real: "Tamper-proof envelope sealing letter" },
      { code: "Certificate", real: "Notarized ID proving identity" },
      { code: "KeyStore", real: "Locked vault storing keys and IDs" },
      { code: "Handshake", real: "Exchanging keys before encrypting messages" }
    ],
    reminder: "TLS encrypts traffic; KeyStore manages keys and certificates."
  },

  "netty-io": {
    hook: "Netty is a high-speed assembly line for network data",
    story: "Netty is an async, event-driven network framework—high-speed assembly line for data. ChannelPipeline chains handlers (assembly stations), processing data as it flows. Non-blocking I/O handles thousands of connections (many assembly lines in parallel). Netty is foundation for protocols (HTTP, WebSockets), used by frameworks (gRPC, Play). Low-level but extremely performant for network-heavy apps.",
    mapping: [
      { code: "Netty framework", real: "High-speed assembly factory" },
      { code: "ChannelPipeline", real: "Assembly line with processing stations" },
      { code: "Event loop", real: "Conveyor belt moving data through" },
      { code: "Non-blocking I/O", real: "Multiple assembly lines running in parallel" }
    ],
    reminder: "Netty provides high-performance, async network I/O with pipelines."
  }
};

export default METAPHORS;
