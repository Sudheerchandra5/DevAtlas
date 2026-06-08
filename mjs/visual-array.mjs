/**
 * Arrays — beginner-friendly contiguous slots & indexing visual.
 */

export function buildArrayVisualData() {
  const codeLines = [
    'int[] numbers = {1, 2, 3};',
    'String[][] matrix = new String[2][3];',
    '// — Iteration —',
    'for (int i = 0; i < numbers.length; i++) {',
    '    System.out.println(numbers[i]);',
    '}',
  ];

  const steps = [
    {
      line: -1,
      caption: 'An array is a row of fixed slots. Each slot has a position number (index) and a value inside.',
      hint: 'Indexes always start at 0 — the first item is index 0, not 1.',
      ref: null,
      indexVar: null,
      arrays: [],
      matrix: null,
    },
    {
      line: 0,
      caption: 'You create an array named numbers with three whole numbers: 1, 2, and 3.',
      hint: 'The variable numbers does not hold 1, 2, 3 directly — it points to this 3-slot list.',
      ref: { name: 'numbers', type: 'int[]', label: 'Points to the 3-slot list below', highlight: true },
      indexVar: null,
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: true },
          { index: 1, value: '2', highlight: false },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: true,
      }],
      matrix: null,
    },
    {
      line: 1,
      caption: 'A 2D array is a list of rows. matrix has 2 rows; each row has 3 empty text slots (not filled yet).',
      hint: 'Think of it like 2 rows in a table, 3 columns each — cells start empty.',
      ref: { name: 'matrix', type: 'String[][]', label: 'Points to a 2-row table below', highlight: true },
      indexVar: null,
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: false },
          { index: 1, value: '2', highlight: false },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: false,
      }],
      matrix: {
        name: 'matrix',
        elementType: 'String',
        rows: 2,
        cols: 3,
        grid: [
          [{ value: 'empty', highlight: false }, { value: 'empty', highlight: false }, { value: 'empty', highlight: false }],
          [{ value: 'empty', highlight: false }, { value: 'empty', highlight: false }, { value: 'empty', highlight: false }],
        ],
        highlight: true,
      },
    },
    {
      line: 3,
      caption: 'The loop uses i as a counter. It starts at 0 and must stay less than 3 (the array size).',
      hint: 'i = 0 means “look at the first slot”. i = 1 means “second slot”, and so on.',
      ref: { name: 'numbers', type: 'int[]', label: 'Still points to the same list', highlight: false },
      indexVar: { name: 'i', type: 'int', value: '0', label: 'Counter — which slot to read', highlight: true },
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: false },
          { index: 1, value: '2', highlight: false },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: true,
        lengthCheck: true,
      }],
      matrix: null,
    },
    {
      line: 4,
      caption: 'numbers[i] when i is 0 → read the first slot → the value is 1.',
      hint: 'numbers[0] is how you write “give me the item at index 0” in code.',
      ref: { name: 'numbers', type: 'int[]', label: 'Points to the list', highlight: false },
      indexVar: { name: 'i', type: 'int', value: '0', label: 'Counter = 0 (first slot)', highlight: true },
      accessIndex: 0,
      readValue: '1',
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: true },
          { index: 1, value: '2', highlight: false },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: true,
      }],
      matrix: null,
    },
    {
      line: 4,
      caption: 'Next loop turn: i becomes 1 → read the second slot → the value is 2.',
      hint: 'If i ever reached 3, that would be past the end — Java would throw an error.',
      ref: { name: 'numbers', type: 'int[]', label: 'Points to the list', highlight: false },
      indexVar: { name: 'i', type: 'int', value: '1', label: 'Counter = 1 (second slot)', highlight: true },
      accessIndex: 1,
      readValue: '2',
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: false },
          { index: 1, value: '2', highlight: true },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: true,
      }],
      matrix: null,
    },
    {
      line: -1,
      caption: 'Remember: index = which slot (starts at 0). Value = what is stored in that slot. Size never changes.',
      hint: 'Need a list that can grow? Use ArrayList instead of a plain array.',
      ref: { name: 'numbers', type: 'int[]', label: 'Points to the list', highlight: false },
      indexVar: null,
      arrays: [{
        name: 'numbers',
        elementType: 'int',
        length: 3,
        cells: [
          { index: 0, value: '1', highlight: false },
          { index: 1, value: '2', highlight: false },
          { index: 2, value: '3', highlight: false },
        ],
        highlight: true,
      }],
      matrix: null,
    },
  ];

  return {
    codeLines,
    steps,
    badge: 'GSAP · Array slots explained',
    intro: 'plain labels · index starts at 0 · value in each slot',
  };
}
