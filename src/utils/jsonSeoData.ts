export interface JSONSeoConfig {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  intro: string;
  example: {
    input: string;
    output: string;
    inputLabel?: string;
    outputLabel?: string;
  };
  faqs: { q: string; a: string }[];
}

export const JSON_SEO_MAP: Record<string, JSONSeoConfig> = {
  '/tools/json/formatter': {
    title: 'JSON Formatter Online - Beautify and Validate JSON | Stoolzen',
    description: 'The best online JSON formatter. Validate, beautify, and minify your JSON strings instantly. Free tool for developers.',
    keywords: 'json formatter, json beautifier, validate json, beautify json online, debug json, dev tools',
    h1: 'JSON Formatter',
    subtitle: 'Format, validate, and beautify your JSON strings safely.',
    intro: 'A JSON Formatter (or JSON Beautifier) is an indispensable tool for developers that converts compact or poorly indented JSON structures into clean, hierarchical, and highly readable code. This makes debugging API responses, system configuration files, and webhooks infinitely easier.',
    example: {
      input: '{"user":{"id":1,"name":"Alice","roles":["admin"],"active":true}}',
      output: '{\n  "user": {\n    "id": 1,\n    "name": "Alice",\n    "roles": [\n      "admin"\n    ],\n    "active": true\n  }\n}',
      inputLabel: 'Compact JSON',
      outputLabel: 'Formatted JSON'
    },
    faqs: [
      { q: 'What exactly does this formatter do?', a: 'It parses and restructures your JSON object, applying consistent indentation to make it easily readable by humans.' },
      { q: 'Is it safe to process sensitive data here?', a: 'Yes. All processing is done locally in your browser. No data is transmitted to our servers.' },
      { q: 'Why is my JSON showing up as invalid?', a: 'This is usually due to trailing commas, missing double quotes on keys, or invalid values like "undefined".' }
    ]
  },
  '/tools/json/validator': {
    title: 'Free Online JSON Validator - Check JSON Instantly | Stoolzen',
    description: 'Validate your JSON online for free. Detect syntax errors and verify the structure of your JSON data instantly.',
    keywords: 'json validator, json validator online, check json, json syntax checker, json error checker',
    h1: 'Online JSON Validator',
    subtitle: 'Check if your JSON is valid and detect syntax errors instantly.',
    intro: 'The JSON Validator checks whether your text string strictly complies with the RFC 8259 JSON format specification. It analyzes syntax in real-time, pointing out the exact line and column of the first syntax error.',
    example: {
      input: '{"key": "value",}',
      output: 'Error: Trailing comma at line 1 column 17',
      inputLabel: 'JSON with syntax error',
      outputLabel: 'Error Analysis'
    },
    faqs: [
      { q: 'What is a trailing comma?', a: 'It is a comma placed at the end of the last element in an object or array. It is not allowed according to the strict JSON specification.' },
      { q: 'Does the validator show the error location?', a: 'Yes, the integrated Monaco Editor highlights the error zone in red and describes the exact cause when you hover over it.' }
    ]
  },
  '/tools/json/editor': {
    title: 'Online JSON Editor with Syntax Highlighting | Stoolzen',
    description: 'Online JSON editor with syntax highlighting, auto-completion, and real-time validation. The ultimate tool for editing JSON.',
    keywords: 'online json editor, json editor, edit json, json syntax highlight, json online editor',
    h1: 'Online JSON Editor',
    subtitle: 'Edit your JSON with syntax highlighting and real-time validation.',
    intro: 'The Stoolzen JSON Editor offers a rich interactive environment to quickly and safely modify structured objects. It features typical modern IDE functionalities right in your browser.',
    example: {
      input: '{\n  "version": "1.0.0",\n  "dependencies": {}\n}',
      output: '{\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^19.0.0"\n  }\n}',
      inputLabel: 'Original JSON',
      outputLabel: 'Modified JSON'
    },
    faqs: [
      { q: 'Does it have bracket auto-completion?', a: 'Yes, the editor automatically adds and closes brackets, braces, and quotes as you type.' },
      { q: 'Can I copy the entire content easily?', a: 'Yes, there is a quick "Copy" button to copy everything to your clipboard with a single click.' }
    ]
  },
  '/tools/json/pretty-print': {
    title: 'JSON Pretty Print Online - Indent and Beautify JSON | Stoolzen',
    description: 'Apply pretty print to your JSON online. Indent and beautify any compressed JSON string to make it instantly readable.',
    keywords: 'json pretty print, json indent online, beautify json, json beautify, json format online, pretty print json',
    h1: 'JSON Pretty Print',
    subtitle: 'Indent and beautify any compressed JSON string instantly.',
    intro: 'Pretty Print adds strategic spacing and line breaks to your JSON document to give it an attractive presentation. You can customize the indentation to 2 spaces, 4 spaces, or tabs according to your code design standards.',
    example: {
      input: '{"project":"Stoolzen","awesome":true}',
      output: '{\n    "project": "Stoolzen",\n    "awesome": true\n}',
      inputLabel: 'Unformatted string',
      outputLabel: 'Pretty-Print (4 spaces)'
    },
    faqs: [
      { q: 'What spacing options are available?', a: 'We support 2 spaces, 4 spaces, and classic tabs in the format selector.' },
      { q: 'Does it affect file readability in production?', a: 'No, whitespace does not alter the semantic structure of serialized data.' }
    ]
  },
  '/tools/json/viewer': {
    title: 'Online JSON Viewer - Explore JSON in Tree View | Stoolzen',
    description: 'View and explore your JSON online with an interactive tree view. Navigate through complex JSON structures easily.',
    keywords: 'json viewer, json viewer online, explore json, json tree view, visualize json, json browser',
    h1: 'Online JSON Viewer',
    subtitle: 'Explore and navigate your JSON data with an interactive tree view.',
    intro: 'Navigate massive documents by expanding and collapsing interactive nodes using the tree view. Ideal for exploring deeply nested API payloads without getting lost in flat code.',
    example: {
      input: '{"users":[{"name":"Bob","age":28},{"name":"Alice","age":30}]}',
      output: '▶ Object { users: Array[2] }\n  ▼ users: Array[2]\n    ▶ 0: Object { name: "Bob", age: 28 }\n    ▶ 1: Object { name: "Alice", age: 30 }',
      inputLabel: 'Flat code',
      outputLabel: 'Interactive visualization'
    },
    faqs: [
      { q: 'Can everything be collapsed at once?', a: 'Yes, we have a quick button to recursively collapse or expand the entire structure in one click.' },
      { q: 'Can I copy just a specific sub-node?', a: 'Yes, the tree view allows you to selectively copy specific branches to the clipboard.' }
    ]
  },
  '/tools/json/parser': {
    title: 'JSON Parser Online - Parse and Analyze JSON | Stoolzen',
    description: 'Parse and analyze your JSON online. Convert JSON strings into readable and valid data structures instantly.',
    keywords: 'json parser online, parse json, analyze json, json decode, json parse online, json analyzer',
    h1: 'Online JSON Parser',
    subtitle: 'Parse and analyze your JSON strings to detect their structure instantly.',
    intro: 'The JSON Parser takes a raw character string and deserializes it to verify that it strictly complies with valid data types (strings, numbers, booleans, nulls, arrays, or objects).',
    example: {
      input: '{"active": true, "timestamp": 1715694212}',
      output: 'Type: Object\nProperties:\n - active (Boolean): true\n - timestamp (Number): 1715694212',
      inputLabel: 'JSON String',
      outputLabel: 'Structure Analysis'
    },
    faqs: [
      { q: 'What if my string contains Unicode characters?', a: 'The parser natively decodes them perfectly in compliance with the UTF-8 standard.' },
      { q: 'What about comments in my JSON?', a: 'The official JSON standard does not support comments (lines with // or /* */), so the parser will throw an error if it detects them.' }
    ]
  },
  '/tools/json/minify': {
    title: 'JSON Minifier Online - Compress and Minify JSON | Stoolzen',
    description: 'Minify and compress your JSON online instantly. Reduce the size of your JSON payloads to optimize API performance.',
    keywords: 'json minifier, minify json, compress json, json compress online, json minify, reduce json',
    h1: 'Online JSON Minifier',
    subtitle: 'Compress and minify your JSON to reduce its size as much as possible.',
    intro: 'Minification removes all characters unnecessary for computation (spaces, line breaks, carriage returns) from your JSON. It is a critical step to optimize network consumption in HTTP POST payloads in high-concurrency environments.',
    example: {
      input: '{\n  "status": "success",\n  "code": 200\n}',
      output: '{"status":"success","code":200}',
      inputLabel: 'JSON with spaces',
      outputLabel: 'Minified JSON'
    },
    faqs: [
      { q: 'How much weight can be saved by minifying?', a: 'Normally, you can reduce payload size between 20% and 45%, depending on the original nesting and formatting level.' },
      { q: 'Does it change the logic or data values?', a: 'Not at all, the minifier only removes decorative whitespace without touching keys or values.' }
    ]
  },
  '/tools/json/reader': {
    title: 'JSON Reader Online - Read and View JSON | Stoolzen',
    description: 'Read and view JSON files or strings online with ease. Free tool to read JSON clearly and structured.',
    keywords: 'json reader, read json online, json file reader, view json, open json online',
    h1: 'Online JSON Reader',
    subtitle: 'Read and view your JSON data clearly and structured.',
    intro: 'Specifically designed to read massive JSON documents with extremely light scrolling and total fluidity. Ideal for reviewing log files or database exports.',
    example: {
      input: '[{"id":1,"event":"click"},{"id":2,"event":"hover"}]',
      output: 'JSON document loaded successfully. 2 records found at the root array.',
      inputLabel: 'Uploaded file',
      outputLabel: 'Structured reading'
    },
    faqs: [
      { q: 'Can I upload large .json files?', a: 'Yes, the tool supports local uploads of large files via drag and drop or file selector.' },
      { q: 'Is my file sent to your hosting?', a: 'No, the file is read directly in your browser using the local HTML5 File API.' }
    ]
  },
  '/tools/json/stringify': {
    title: 'JSON Stringify Online - Convert Objects to JSON Strings | Stoolzen',
    description: 'Convert objects and data structures to serialized JSON strings online. Equivalent to JSON.stringify with customizable formatting.',
    keywords: 'json stringify online, json serialize, convert to json string, json serialization, json to string',
    h1: 'Online JSON Stringify',
    subtitle: 'Serialize and convert data structures to JSON strings instantly.',
    intro: 'Convert any pasted data structure or object into a serialized JSON string robustly. Allows setting defined indents, simulating the behavior of the native `JSON.stringify(obj, null, space)` method.',
    example: {
      input: 'Object { name: "Alice", active: true }',
      output: '{\n  "name": "Alice",\n  "active": true\n}',
      inputLabel: 'Input JS Object',
      outputLabel: 'Serialized JSON string'
    },
    faqs: [
      { q: 'Does it support circular references?', a: 'It throws a syntax warning if circular references exist in the input object to prevent infinite loops.' },
      { q: 'What data types does it serialize?', a: 'It serializes strings, numbers, booleans, arrays, and readable sub-objects.' }
    ]
  },
  '/tools/json/sorter': {
    title: 'JSON Sorter Online - Sort JSON Keys Alphabetically | Stoolzen',
    description: 'Sort your JSON keys online alphabetically or custom. Normalize your JSON data structure instantly.',
    keywords: 'json sorter, sort json, json sort keys, json alphabetical order, sort json keys',
    h1: 'Online JSON Sorter',
    subtitle: 'Sort your JSON keys alphabetically and instantly.',
    intro: 'Normalize the presentation of your JSON objects by reordering all keys alphabetically recursively. It is extremely practical for making coherent diff comparisons between two files.',
    example: {
      input: '{"z": 10, "a": 5, "b": {"y": 3, "x": 1}}',
      output: '{\n  "a": 5,\n  "b": {\n    "x": 1,\n    "y": 3\n  },\n  "z": 10\n}',
      inputLabel: 'Unsorted JSON',
      outputLabel: 'Alphabetically Sorted JSON'
    },
    faqs: [
      { q: 'Does sorting alter the meaning of the data?', a: 'According to the RFC 8259 specification, a JSON object is an unordered collection of key/value pairs, so reordering keys does not break data validity and makes comparison easier.' },
      { q: 'Is the sorting recursive?', a: 'Yes, it sorts both top-level keys and those of any nested sub-objects at any level.' }
    ]
  },
  '/tools/json/compare': {
    title: 'JSON Compare Online - Compare Differences Between JSONs | Stoolzen',
    description: 'Compare two JSONs online and find their differences instantly. Free tool to identify changes between JSON payloads.',
    keywords: 'json compare, compare json, json diff online, json differences, compare two json',
    h1: 'Online JSON Compare',
    subtitle: 'Compare two JSONs and detect their differences instantly.',
    intro: 'Quickly identify differences, additions, or deletions between two structured JSON objects. The ideal tool for debugging webhook payload versions or configurations.',
    example: {
      input: 'JSON A: {"name": "Alice", "role": "admin"}\nJSON B: {"name": "Alice", "role": "user", "age": 30}',
      output: 'Modified: "role" ("admin" -> "user")\nAdded: "age" (30)',
      inputLabel: 'Input JSONs',
      outputLabel: 'Found differences'
    },
    faqs: [
      { q: 'How does the comparison work?', a: 'It recursively analyzes both objects and visually highlights deleted, modified, or added keys.' },
      { q: 'Is it recommended to sort keys before comparing?', a: 'Yes, sorting keys alphabetically helps avoid false positive differences due to simple positioning.' }
    ]
  },
  '/tools/json/escape': {
    title: 'JSON Escape Online - Escape Characters in JSON | Stoolzen',
    description: 'Escape special characters in JSON strings online. Convert reserved characters for safe use in JSON strings.',
    keywords: 'json escape, escape json, json string escape, json encode, escape json online',
    h1: 'Online JSON Escape',
    subtitle: 'Escape special characters in your JSON strings instantly.',
    intro: 'Convert characters that have reserved meanings in JSON (like double quotes, backslashes, and line breaks) into their valid escape sequences (`\\\"`, `\\\\`, `\\n`).',
    example: {
      input: 'Text with "quotes" and\nline breaks.',
      output: '"Text with \\"quotes\\" and\\nline breaks."',
      inputLabel: 'Raw text',
      outputLabel: 'Escaped JSON string'
    },
    faqs: [
      { q: 'Why is it necessary to escape characters?', a: 'To safely nest strings or store text blocks inside a JSON property without breaking the parser\'s syntax.' },
      { q: 'Which characters are escaped?', a: 'Mainly double quotes (`"`), backslashes (`\\`), tabs (`\\t`), and line breaks (`\\n`).' }
    ]
  },
  '/tools/json/unescape': {
    title: 'JSON Unescape Online - Unescape JSON Strings | Stoolzen',
    description: 'Unescape JSON strings online with one click. Convert JSON escape sequences into their original readable representation.',
    keywords: 'json unescape, unescape json, json decode string, json unescape online, json string decode',
    h1: 'Online JSON Unescape',
    subtitle: 'Unescape and decode JSON strings instantly.',
    intro: 'Performs the reverse escape process: takes a string with encoded escape sequences and translates them to their original, readable human text format.',
    example: {
      input: '"Hello \\"World\\"\\nLine 2."',
      output: 'Hello "World"\nLine 2.',
      inputLabel: 'Escaped string',
      outputLabel: 'Unescaped text'
    },
    faqs: [
      { q: 'Which sequences does it decode?', a: 'It decodes standard sequences like `\\\"`, `\\\\`, `\\/`, `\\n`, `\\r`, `\\t` and unicode codes `\\uXXXX`.' },
      { q: 'Does it throw an error if the text is not correctly escaped?', a: 'If it detects an invalid or truncated escape sequence, it will alert you so you can fix it.' }
    ]
  },
  '/tools/json/path-explorer': {
    title: 'JSONPath Explorer Online - Explore JSON Paths | Stoolzen',
    description: 'Explore and test JSONPath expressions on your data online. The most powerful and visual JSONPath Explorer for developers.',
    keywords: 'jsonpath explorer, jsonpath online, json path tester, explore json path, json query online',
    h1: 'Online JSONPath Explorer',
    subtitle: 'Explore and test JSONPath expressions on your data visually.',
    intro: 'Filter and extract specific parts of a massive JSON using JSONPath expressions (the equivalent of XPath for XML). Very useful for testing complex queries before implementing them in your backend code.',
    example: {
      input: 'JSON: {"store":{"book":[{"title":"Sayings"},{"title":"Sword"}]}}\nQuery: $.store.book[*].title',
      output: '[\n  "Sayings",\n  "Sword"\n]',
      inputLabel: 'Input JSON and Expression',
      outputLabel: 'Filtered results'
    },
    faqs: [
      { q: 'What is JSONPath?', a: 'It is a query language for JSON developed by Stefan Gössner, allowing navigation through JSON objects similarly to how XPath navigates XML.' },
      { q: 'What is the syntax to search recursively?', a: 'Use the deep descent operator `..` (e.g., `$..title` will find all "title" properties at any depth in the JSON).' }
    ]
  },
  '/tools/json/diff': {
    title: 'JSON Diff Online - Differences Between JSON Documents | Stoolzen',
    description: 'Compare and highlight differences between two JSON documents online. View changes with a clear and intuitive visual diff.',
    keywords: 'json diff, json differences, json diff online, compare json, json delta, json changes',
    h1: 'Online JSON Diff',
    subtitle: 'Visualize differences between two JSON documents with an interactive diff.',
    intro: 'A premium visual diff for JSON files. Compare line by line, identify additions, property value changes, and field deletions in a highly graphical and interactive way.',
    example: {
      input: 'JSON A: {"name": "Alice"}\nJSON B: {"name": "Bob"}',
      output: '- "name": "Alice"\n+ "name": "Bob"',
      inputLabel: 'Documents to compare',
      outputLabel: 'Visual diff result'
    },
    faqs: [
      { q: 'What do the colors in the result indicate?', a: 'Green indicates added lines, red points out deleted elements, and yellow or blue highlights modified properties.' },
      { q: 'Does the diff work locally?', a: 'Yes, the comparison runs entirely in your browser without sending data to the network.' }
    ]
  }
};
