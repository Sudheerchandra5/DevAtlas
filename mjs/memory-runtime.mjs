/**
 * Derives per-line stack/heap runtime states from Java syntax for GSAP visuals.
 */

function clip(s, max = 72) {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

function extractSyntaxLines(code) {
  return (code || '')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => {
      if (!l || l === '{' || l === '}') return false;
      if (l.startsWith('/*') || l.startsWith('*') || l.endsWith('*/')) return false;
      return true;
    });
}

function collectCodeLines(content) {
  const lines = [];
  for (const block of content.syntax || []) {
    const extracted = extractSyntaxLines(block.code);
    if (!extracted.length) continue;
    if (lines.length) lines.push(`// — ${block.label || 'Example'} —`);
    lines.push(...extracted);
  }
  return lines.slice(0, 20);
}

function createContext() {
  return {
    className: null,
    fields: [],
    instance: false,
    instanceAddr: '@0x1a4f',
    frame: null,
    params: [],
    locals: [],
    heapObjects: [],
  };
}

function parseParams(sig) {
  if (!sig?.trim()) return [];
  return sig.split(',').map((p) => {
    const parts = p.trim().split(/\s+/);
    const name = parts.pop() || 'arg';
    const type = parts.join(' ') || 'Object';
    return { name, type, value: sampleValue(type), isRef: !isPrimitive(type) };
  });
}

function isPrimitive(type) {
  return /^(int|long|double|float|boolean|char|byte|short)$/.test(type.replace(/\s/g, ''));
}

function sampleValue(type) {
  const t = type.replace(/\s/g, '');
  if (t === 'int' || t === 'long') return '0';
  if (t === 'double' || t === 'float') return '0.0';
  if (t === 'boolean') return 'false';
  if (t === 'char') return "'a'";
  if (t === 'String') return '"..."';
  return 'ref →';
}

function fieldAccess(mod) {
  return mod || 'package';
}

function heapClassObject(ctx, highlight = false) {
  if (!ctx.className) return [];
  const fields = ctx.fields.map((f) => ({
    name: f.name,
    type: f.type,
    access: f.access,
    value: f.value ?? (ctx.instance ? '—' : 'declared'),
    highlight: highlight && f._hot,
  }));
  if (ctx.instance) {
    return [{
      kind: 'instance',
      name: ctx.className,
      type: ctx.className,
      addr: ctx.instanceAddr,
      fields,
      highlight,
    }];
  }
  return [{
    kind: 'class',
    name: ctx.className,
    type: 'class',
    fields,
    highlight,
    note: 'Class blueprint (Metaspace)',
  }];
}

function stackSlots(ctx, highlightNames = []) {
  const slots = [];
  if (ctx.frame) {
    slots.push({
      name: 'frame',
      type: 'call',
      value: ctx.frame,
      isRef: false,
      highlight: false,
      frame: true,
    });
  }
  if (ctx.instance && ctx.frame) {
    slots.push({
      name: 'this',
      type: ctx.className,
      value: 'ref →',
      isRef: true,
      highlight: highlightNames.includes('this'),
    });
  }
  for (const p of ctx.params) {
    slots.push({
      ...p,
      highlight: highlightNames.includes(p.name),
    });
  }
  for (const l of ctx.locals) {
    slots.push({
      ...l,
      highlight: highlightNames.includes(l.name),
    });
  }
  return slots;
}

function analyzeLine(line, ctx) {
  const t = line.trim();
  const next = { ...ctx, fields: [...ctx.fields], params: [...ctx.params], locals: [...ctx.locals] };

  // Class declaration
  const classMatch = t.match(/^(?:public\s+|private\s+|protected\s+)?(?:abstract\s+|final\s+)?class\s+(\w+)/);
  if (classMatch) {
    next.className = classMatch[1];
    return {
      caption: `JVM loads class blueprint "${next.className}" into Metaspace — defines fields & methods, no instance yet.`,
      hint: 'Classes describe object shape. Instances are created later with new.',
      stack: [],
      heap: [{ kind: 'class', name: next.className, type: 'class', fields: [], highlight: true, note: 'Metaspace' }],
      connector: false,
      ctx: next,
    };
  }

  // Field declaration
  const fieldMatch = t.match(/^(private|public|protected)\s+([\w.<>,\[\]]+)\s+(\w+)\s*;/);
  if (fieldMatch && next.className) {
    const access = fieldAccess(fieldMatch[1]);
    const type = fieldMatch[2];
    const name = fieldMatch[3];
    next.fields.push({ name, type, access, value: null });
    return {
      caption: `Field "${name}" added to object layout — ${access} so only class methods touch it directly (encapsulation).`,
      hint: 'Fields live inside each heap object, not on the external stack.',
      stack: [],
      heap: heapClassObject(next, true),
      connector: false,
      ctx: next,
    };
  }

  // Constructor
  const ctorMatch = t.match(/^(public|private|protected)\s+(\w+)\s*\(([^)]*)\)\s*\{?/);
  if (ctorMatch && next.className && ctorMatch[2] === next.className) {
    const params = parseParams(ctorMatch[3]);
    next.frame = `${next.className}(...)`;
    next.params = params;
    next.instance = true;
    next.fields = next.fields.map((f) => ({ ...f, value: '—' }));
    const paramDesc = params.map((p) => p.name).join(', ') || 'none';
    return {
      caption: `Constructor runs — new stack frame, parameters (${paramDesc}) copied to locals; new ${next.className} instance allocated on heap.`,
      hint: 'new allocates heap memory; constructor initializes internal fields.',
      stack: stackSlots(next, params.map((p) => p.name)),
      heap: [{
        kind: 'instance',
        name: next.className,
        type: next.className,
        addr: next.instanceAddr,
        fields: next.fields.map((f) => ({ ...f, value: '—' })),
        highlight: true,
      }],
      connector: true,
      ctx: next,
    };
  }

  // Method signature (single line)
  const methodMatch = t.match(/^(public|private|protected)\s+(?:static\s+)?([\w.<>,\[\]]+)\s+(\w+)\s*\(([^)]*)\)\s*\{?/);
  if (methodMatch && next.className) {
    const name = methodMatch[3];
    const params = parseParams(methodMatch[4]);
    const isCtor = false;
    next.frame = `${name}(...)`;
    next.params = params;
    if (!next.instance && (name === 'deposit' || name === 'getBalance' || name === 'setBalance')) {
      next.instance = true;
    }
    const paramDesc = params.map((p) => p.name).join(', ') || 'none';
    return {
      caption: `Method "${name}" invoked — stack frame pushed; parameters (${paramDesc}) available as locals${next.instance ? '; this points at heap object' : ''}.`,
      hint: 'Each call gets its own frame on the stack.',
      stack: stackSlots(next, params.map((p) => p.name)),
      heap: heapClassObject(next, false),
      connector: next.instance,
      ctx: next,
    };
  }

  // this.field = value
  const thisAssign = t.match(/^this\.(\w+)\s*=\s*(\w+)\s*;?/);
  if (thisAssign) {
    const field = thisAssign[1];
    const src = thisAssign[2];
    next.fields = next.fields.map((f) =>
      f.name === field ? { ...f, value: src === 'balance' ? '100.0' : sampleFromParam(next, src), _hot: true } : f,
    );
    return {
      caption: `Parameter "${src}" on stack copied into heap field "${field}" via hidden this reference.`,
      hint: 'this points at the current object on the heap — how methods reach private fields.',
      stack: stackSlots(next, [src, 'this']),
      heap: heapClassObject(next, true),
      connector: true,
      ctx: next,
    };
  }

  // return field
  const retField = t.match(/^return\s+(\w+)\s*;?/);
  if (retField) {
    const name = retField[1];
    const field = next.fields.find((f) => f.name === name);
    const val = field?.value ?? 'value';
    return {
      caption: `Getter reads heap field "${name}" (${val}) and places return value on stack for the caller.`,
      hint: 'External code never touches the field — only the returned copy/value.',
      stack: [...stackSlots(next, ['this']), { name: 'return', type: field?.type || 'value', value: String(val), isRef: false, highlight: true }],
      heap: heapClassObject(next, true),
      connector: true,
      ctx: next,
    };
  }

  // if condition
  const ifMatch = t.match(/^if\s*\((.+)\)\s*\{?/);
  if (ifMatch) {
    const cond = ifMatch[1].trim();
    const vars = cond.match(/\b([a-z][a-zA-Z0-9]*)\b/g) || [];
    return {
      caption: `JVM evaluates "${cond}" using stack locals — result decides which bytecode branch runs next.`,
      hint: 'Conditions read stack slots only; no heap access unless a field is referenced.',
      stack: stackSlots(next, vars),
      heap: next.instance ? heapClassObject(next) : heapClassObject(next),
      connector: next.instance,
      ctx: next,
    };
  }

  // field mutation: balance += amount
  const mutMatch = t.match(/^(\w+)\s*\+=\s*(\w+)\s*;?/) || t.match(/^(\w+)\s*=\s*\1\s*\+\s*(\w+)\s*;?/);
  if (mutMatch) {
    const field = mutMatch[1];
    const src = mutMatch[2];
    const oldVal = next.fields.find((f) => f.name === field)?.value ?? '0';
    const newVal = typeof oldVal === 'number' || /^\d/.test(String(oldVal))
      ? `${oldVal} + ${sampleFromParam(next, src)}`
      : 'updated';
    next.fields = next.fields.map((f) =>
      f.name === field ? { ...f, value: newVal, _hot: true } : f,
    );
    return {
      caption: `Heap field "${field}" mutated in place — stack parameter "${src}" added; encapsulation forces callers through this method.`,
      hint: 'State changes happen on the heap object, not in caller variables.',
      stack: stackSlots(next, [src, 'this']),
      heap: heapClassObject(next, true),
      connector: true,
      ctx: next,
    };
  }

  // Primitive declaration
  const primMatch = t.match(/^(int|long|double|float|boolean|char|byte|short)\s+(\w+)\s*=\s*(.+);/);
  if (primMatch) {
    const type = primMatch[1];
    const name = primMatch[2];
    const val = primMatch[3];
    next.locals.push({ name, type, value: val, isRef: false });
    return {
      caption: `Primitive ${type} "${name}" = ${val} stored directly on the stack frame.`,
      hint: 'Primitives hold the actual value — no heap object involved.',
      stack: stackSlots(next, [name]),
      heap: next.instance ? heapClassObject(next) : [],
      connector: false,
      ctx: next,
    };
  }

  // String reference
  const strMatch = t.match(/^String\s+(\w+)\s*=\s*(".*"|".*");/);
  if (strMatch) {
    const name = strMatch[1];
    const val = strMatch[2];
    next.locals.push({ name, type: 'String', value: 'ref →', isRef: true });
    return {
      caption: `Variable "${name}" on stack holds a reference; character data lives in a String object on the heap.`,
      hint: 'Stack slot = address arrow; heap = actual object bytes.',
      stack: stackSlots(next, [name]),
      heap: [{ kind: 'instance', name: 'String', type: 'String', value: val, addr: '@0x7f3a', fields: [], highlight: true }],
      connector: true,
      ctx: next,
    };
  }

  // new Object()
  const newMatch = t.match(/^(\w+)\s+(\w+)\s*=\s*new\s+(\w+)\s*\(([^)]*)\)\s*;?/);
  if (newMatch) {
    const type = newMatch[1];
    const name = newMatch[2];
    const cls = newMatch[3];
    next.locals.push({ name, type: cls, value: 'ref →', isRef: true });
    if (cls === next.className) next.instance = true;
    return {
      caption: `new ${cls}() allocates heap memory; stack variable "${name}" stores the reference (not the object itself).`,
      hint: 'The object outlives the method — reference can escape the stack.',
      stack: stackSlots(next, [name]),
      heap: [{
        kind: 'instance',
        name: cls,
        type: cls,
        addr: next.instanceAddr,
        fields: next.fields.map((f) => ({ ...f, value: '—' })),
        highlight: true,
      }],
      connector: true,
      ctx: next,
    };
  }

  // throw
  if (t.includes('throw new')) {
    return {
      caption: 'Exception object allocated on heap; stack frames unwind until a matching catch block.',
      hint: 'Errors propagate up the call stack — locals in this frame are discarded.',
      stack: stackSlots(next),
      heap: [{ kind: 'instance', name: 'Exception', type: 'Throwable', value: t.match(/new\s+(\w+)/)?.[1] || 'Error', addr: '@0xe01', fields: [], highlight: true }],
      connector: false,
      ctx: next,
    };
  }

  // System.out.println
  if (t.includes('System.out')) {
    return {
      caption: 'I/O call — JVM reads values from stack, writes to OS stdout (side effect outside heap model).',
      hint: 'Printing does not change object state; it serializes values for display.',
      stack: stackSlots(next),
      heap: next.instance ? heapClassObject(next) : [],
      connector: false,
      ctx: next,
    };
  }

  // Setter validation
  const setterMatch = t.match(/^if\s*\((\w+)\s*<\s*0\)/);
  if (setterMatch) {
    return {
      caption: `Guard checks stack parameter "${setterMatch[1]}" before allowing heap mutation — invariant protection.`,
      hint: 'Encapsulation + validation reject illegal state before fields change.',
      stack: stackSlots(next, [setterMatch[1]]),
      heap: heapClassObject(next, true),
      connector: next.instance,
      ctx: next,
    };
  }

  // Comment / section divider
  if (t.startsWith('//')) {
    return {
      caption: 'Next code section — runtime state carries over from previous lines.',
      hint: '',
      stack: stackSlots(next),
      heap: heapClassObject(next),
      connector: next.instance,
      ctx: next,
    };
  }

  // Default
  return {
    caption: `JVM executes: ${clip(t, 60)} — bytecode step in current stack frame.`,
    hint: next.instance ? 'Active object state persists on the heap between lines.' : 'No instance yet — only class metadata or stack locals.',
    stack: stackSlots(next),
    heap: heapClassObject(next),
    connector: next.instance,
    ctx: next,
  };
}

function sampleFromParam(ctx, name) {
  const p = ctx.params.find((x) => x.name === name);
  if (p) return p.value;
  const l = ctx.locals.find((x) => x.name === name);
  if (l) return l.value;
  if (name === 'amount') return '50.0';
  if (name === 'balance') return '100.0';
  return '…';
}

/** Hand-tuned variables lesson — same quality as original demo. */
const VARIABLES_PRESET = {
  codeLines: [
    'int age = 25;',
    'age = 30;',
    'double price = 19.99;',
    'boolean active = true;',
    'String name = "Ada";',
  ],
  steps: [
    {
      line: -1,
      caption: 'A variable is a named slot in memory. Java is strongly typed — each slot has a fixed type.',
      hint: 'Primitives sit on the stack; objects live on the heap.',
      stack: [],
      heap: [],
      connector: false,
    },
    {
      line: 0,
      caption: 'int age = 25 — primitive int stored directly on the stack (the value itself, not a reference).',
      hint: '',
      stack: [{ name: 'age', type: 'int', value: '25', isRef: false, highlight: true }],
      heap: [],
      connector: false,
    },
    {
      line: 1,
      caption: 'age = 30 — reassignment overwrites the same stack slot; no new memory allocated.',
      hint: '',
      stack: [{ name: 'age', type: 'int', value: '30', isRef: false, highlight: true }],
      heap: [],
      connector: false,
    },
    {
      line: 2,
      caption: 'double price = 19.99 — another primitive slot on the stack alongside age.',
      hint: '',
      stack: [
        { name: 'age', type: 'int', value: '30', isRef: false, highlight: false },
        { name: 'price', type: 'double', value: '19.99', isRef: false, highlight: true },
      ],
      heap: [],
      connector: false,
    },
    {
      line: 3,
      caption: 'boolean active = true — primitives include true/false; still direct stack values.',
      hint: '',
      stack: [
        { name: 'age', type: 'int', value: '30', isRef: false, highlight: false },
        { name: 'price', type: 'double', value: '19.99', isRef: false, highlight: false },
        { name: 'active', type: 'boolean', value: 'true', isRef: false, highlight: true },
      ],
      heap: [],
      connector: false,
    },
    {
      line: 4,
      caption: 'String name = "Ada" — stack holds a reference; character data lives in a heap String object.',
      hint: 'Objects live here — variables hold references, not the text itself.',
      stack: [
        { name: 'age', type: 'int', value: '30', isRef: false, highlight: false },
        { name: 'price', type: 'double', value: '19.99', isRef: false, highlight: false },
        { name: 'active', type: 'boolean', value: 'true', isRef: false, highlight: false },
        { name: 'name', type: 'String', value: 'ref →', isRef: true, highlight: true },
      ],
      heap: [{ kind: 'instance', name: 'String', type: 'String', value: '"Ada"', addr: '@0x7f3a', fields: [], highlight: true }],
      connector: true,
    },
    {
      line: -1,
      caption: 'Remember: primitives = value in the box on stack. References = arrow to heap object.',
      hint: 'Stack is fast and per-frame; heap objects can be shared and outlive methods.',
      stack: [
        { name: 'age', type: 'int', value: '30', isRef: false, highlight: false },
        { name: 'price', type: 'double', value: '19.99', isRef: false, highlight: false },
        { name: 'active', type: 'boolean', value: 'true', isRef: false, highlight: false },
        { name: 'name', type: 'String', value: 'ref →', isRef: true, highlight: false },
      ],
      heap: [{ kind: 'instance', name: 'String', type: 'String', value: '"Ada"', addr: '@0x7f3a', fields: [], highlight: true }],
      connector: true,
    },
  ],
};

/**
 * @param {{ id: string, title: string }} topic
 * @param {{ syntax?: { label?: string, code: string }[] }} content
 */
export function buildMemoryVisualData(topic, content) {
  if (topic.id === 'variables-types') return VARIABLES_PRESET;

  let codeLines = collectCodeLines(content);
  if (!codeLines.length) {
    codeLines = [
      `// ${topic.title}`,
      'public class Example {',
      '    private int state;',
      '    public void run() { state++; }',
      '}',
    ];
  }

  let ctx = createContext();
  const steps = [{
    line: -1,
    caption: `Watch what the JVM does in memory as each line of ${topic.title} executes — stack frames hold locals; objects live on the heap.`,
    hint: 'Step through the code on the left; memory updates on the right.',
    stack: [],
    heap: [],
    connector: false,
  }];

  for (let i = 0; i < codeLines.length; i += 1) {
    const result = analyzeLine(codeLines[i], ctx);
    ctx = result.ctx;
    steps.push({
      line: i,
      caption: result.caption,
      hint: result.hint,
      stack: result.stack,
      heap: result.heap,
      connector: result.connector,
    });
  }

  return { codeLines, steps };
}
