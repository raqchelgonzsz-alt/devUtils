export interface GraphQLSeoConfig {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  subtitle: string;
  intro: string;
  example?: {
    input: string;
    output: string;
    inputLabel?: string;
    outputLabel?: string;
  };
  faqs: { q: string; a: string }[];
}

export const GRAPHQL_SEO_MAP: Record<string, GraphQLSeoConfig> = {
  '/tools/graphql/formatter': {
    title: 'GraphQL Formatter Online - Validate and Beautify Queries | Stoolzen',
    description: 'The best online GraphQL formatter. Clean, validate, and indent your schemas, fragments, and queries instantly with total privacy.',
    keywords: 'graphql formatter, graphql beautifier online, beautify graphql, graphql queries, indent graphql free',
    h1: 'GraphQL Formatter',
    subtitle: 'Clean, validate, and beautify your GraphQL queries and schemas instantly.',
    intro: 'The Stoolzen GraphQL Formatter processes your GraphQL queries, mutations, and schemas to give them an indented, uniform, and professional structure. Formatting your queries makes it much easier to debug the field hierarchy, identify unused variables, and ensure code readability before shipping to production or committing to a repository.',
    example: {
      input: 'query MyQuery($limit:Int!){users(limit:$limit){id profile{firstName lastName}posts{title}}}',
      output: 'query MyQuery($limit: Int!) {\n  users(limit: $limit) {\n    id\n    profile {\n      firstName\n      lastName\n    }\n    posts {\n      title\n    }\n  }\n}',
      inputLabel: 'Compressed GraphQL Query',
      outputLabel: 'Formatted GraphQL Query'
    },
    faqs: [
      {
        q: 'What does a GraphQL formatter do?',
        a: 'It restructures GraphQL queries by adding standardized tabs, spaces, and line breaks according to the GraphQL specification, improving code readability.'
      },
      {
        q: 'How does the formatter validation work?',
        a: 'It parses the abstract syntax tree (AST) of GraphQL. If there is a syntax error (like mismatched brackets or improperly structured arguments), it will highlight the exact location in red.'
      },
      {
        q: 'Are Stoolzen tools free?',
        a: 'Yes, all our tools are 100% free, conceptually open-source, and run entirely on the client-side.'
      }
    ]
  },
  '/tools/graphql/validator': {
    title: 'Free Online GraphQL Validator - Syntax Check | Stoolzen',
    description: 'Validate your GraphQL queries, schemas, and types online in real-time. Detect syntax errors and ensure your APIs are compliant.',
    keywords: 'graphql validator, validate graphql schema, check graphql syntax, graphql linter',
    h1: 'Online GraphQL Validator',
    subtitle: 'Verify the integrity of your GraphQL schemas and queries in real-time.',
    intro: 'The Stoolzen GraphQL Validator analyzes your queries and Schema Definition Language (SDL) to ensure they strictly follow the official syntax. Ideal for debugging compile errors from Apollo, GraphQL Yoga, or Hasura servers immediately and visually.',
    example: {
      input: 'subscription OnCommentAdded($postID: ID!) { commentAdded(postID: $postID) { id body author { name } }',
      output: 'Syntax Error: Expected Name, found <EOF>.',
      inputLabel: 'GraphQL with Error',
      outputLabel: 'Syntax Diagnostic'
    },
    faqs: [
      {
        q: 'What kind of errors does the validator detect?',
        a: 'Unclosed brackets, incorrect directive arguments, field names not allowed by the base syntax, improperly declared variables, and incomplete fragment blocks.'
      },
      {
        q: 'Is it compatible with Schema Definition Language (SDL)?',
        a: 'Yes, you can paste the type structure of your schema (types, inputs, interfaces, enums) and validate that the SDL structure is syntactically valid.'
      }
    ]
  },
  '/tools/graphql/editor': {
    title: 'Online GraphQL Editor with Highlighting and Validation | Stoolzen',
    description: 'Test and write your GraphQL code in our interactive editor with syntax highlighting, auto-completion, and instant automated validation.',
    keywords: 'online graphql editor, graphql editor, write graphql query, schema sdl editor, graphql playground',
    h1: 'Online GraphQL Editor',
    subtitle: 'A complete workspace for your queries, mutations, and schemas.',
    intro: 'The GraphQL Editor is a secure and powerful web playground powered by Monaco Editor (the engine behind VS Code). It offers smart auto-completion, code folding, advanced search, and live syntax diagnostics without overloading your browser memory.',
    example: {
      input: 'mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n  }\n}',
      output: 'Write and modify your mutations safely with built-in structural validation.',
      inputLabel: 'Editing Environment',
      outputLabel: 'Code Status'
    },
    faqs: [
      {
        q: 'Can I use keyboard shortcuts?',
        a: 'Absolutely! By using Monaco Editor, you have access to the same commands as in Visual Studio Code (Ctrl+F to search, Alt+Shift+F to format, etc.).'
      },
      {
        q: 'Does the editor save my data?',
        a: 'No. All content is processed ephemerally and locally. Your privacy is our absolute priority.'
      }
    ]
  },
  '/tools/graphql/beautifier': {
    title: 'GraphQL Beautifier Online - Beautify GraphQL Queries | Stoolzen',
    description: 'Beautify and style your GraphQL code online with one click. Structure complex fragments, queries, and mutations to improve readability.',
    keywords: 'graphql beautifier, beautify graphql, clean graphql query, format graphql online, clean graphql',
    h1: 'GraphQL Beautifier',
    subtitle: 'Give your GraphQL queries and fragments an elegant and readable look.',
    intro: 'GraphQL Beautifier is the preferred tool for software engineers to organize and document API calls clearly. It converts messy, unspaced strings or network logs into structured fragments with flawless indentation.',
    example: {
      input: 'fragment UserDetails on User{id name roles{name permissions{key}}}',
      output: 'fragment UserDetails on User {\n  id\n  name\n  roles {\n    name\n    permissions {\n      key\n    }\n  }\n}',
      inputLabel: 'Messy Fragment',
      outputLabel: 'Beautified Fragment'
    },
    faqs: [
      {
        q: 'What is the difference between formatting and beautifying GraphQL?',
        a: 'They are synonymous in software development. Both processes aim to improve the aesthetic and indented appearance of the code without altering its execution logic.'
      },
      {
        q: 'Does it support quick clipboard copying?',
        a: 'Yes, there is a top button with a copy icon that transfers the processed code to your clipboard with a single tap.'
      }
    ]
  },
  '/tools/graphql/minifier': {
    title: 'GraphQL Minifier Online - Reduce Query Size | Stoolzen',
    description: 'Minify your GraphQL queries online. Remove redundant whitespace and comments to speed up HTTP requests to your APIs.',
    keywords: 'graphql minifier, compress graphql online, minify graphql query, optimize graphql requests, compress payload',
    h1: 'GraphQL Minifier',
    subtitle: 'Drastically reduce the weight of your queries for production environments.',
    intro: 'GraphQL Minifier is a network optimization tool that compresses your GraphQL queries by removing all unnecessary characters such as line breaks, tabs, and code comments. This reduces bandwidth consumption and improves response time in mobile or high-load infrastructures.',
    example: {
      input: '# Query to get user profile\nquery GetProfile {\n  me {\n    id\n    email\n  }\n}',
      output: 'query GetProfile{me{id email}}',
      inputLabel: 'Query with Comments and Spaces',
      outputLabel: 'Minified Query'
    },
    faqs: [
      {
        q: 'How much weight can be saved by minifying GraphQL?',
        a: 'In complex queries or extensive SDL schemas, you can reduce the payload size by up to 60%, accelerating network latency.'
      },
      {
        q: 'Will the GraphQL server understand the compressed query?',
        a: 'Yes. The GraphQL grammar defines whitespace and line breaks as optional separators in most of its constructs.'
      }
    ]
  },
  '/tools/graphql/viewer': {
    title: 'Online GraphQL Viewer - Inspect Query Structure | Stoolzen',
    description: 'Visualize the hierarchical structure of your GraphQL queries and schemas in a structured way with professional color highlighting.',
    keywords: 'graphql viewer online, inspect graphql, render graphql syntax, view graphql schema online, query viewer',
    h1: 'Online GraphQL Viewer',
    subtitle: 'An organized and interactive view of your API payloads and schemas.',
    intro: 'The online GraphQL Viewer helps you inspect and understand the internal hierarchy of your large GraphQL documents. It offers advanced syntax highlighting adapted to the interface color scheme so you can grasp query nesting at a glance.',
    example: {
      input: 'query { analytics { activeUsers stats { daily weekly monthly } } }',
      output: '• query\n  • analytics\n    - activeUsers\n    • stats\n      - daily\n      - weekly\n      - monthly',
      inputLabel: 'GraphQL Payload',
      outputLabel: 'Structured Visualization'
    },
    faqs: [
      {
        q: 'Is it useful for reviewing nested schemas?',
        a: 'It is the optimal way to debug deep-layer calls before implementing them in your Apollo or Relay clients.'
      },
      {
        q: 'Can I use it on tablets and mobiles?',
        a: 'Yes, the interface adapts completely fluidly to touch screens and responsive formats.'
      }
    ]
  },
  '/tools/graphql/checker': {
    title: 'Online GraphQL Linter and Syntax Validator | Stoolzen',
    description: 'Analyze your GraphQL code for common syntax errors and deviations from best practices immediately and locally.',
    keywords: 'graphql checker, check graphql query, debug graphql syntax online, fix graphql',
    h1: 'GraphQL Checker',
    subtitle: 'Your quality and syntax debugging assistant for GraphQL.',
    intro: 'GraphQL Checker acts as an ultra-fast static analyzer that reads your GraphQL strings and checks them for missing brackets, invalid directives, or syntactically incorrect variables. Ideal for quick integration testing.',
    example: {
      input: 'query { user(id: "10") { name posts(limit: 5 } }',
      output: 'Syntax Error: Expected ")", found "}"',
      inputLabel: 'Faulty GraphQL Code',
      outputLabel: 'Check Result'
    },
    faqs: [
      {
        q: 'Does the checker fix errors automatically?',
        a: 'It indicates errors through the auto-formatter. If the basic structure allows, the "Prettify" button will rebuild the query, fixing the spacing.'
      },
      {
        q: 'Is it compatible with mutations and subscriptions?',
        a: 'Yes, it supports all root operations described by the GraphQL specification (Query, Mutation, Subscription).'
      }
    ]
  },
  '/tools/graphql/parser': {
    title: 'GraphQL Parser Online - Analyze Syntax Tree | Stoolzen',
    description: 'Parse and breakdown your GraphQL queries into readable structured components instantly with total security.',
    keywords: 'graphql parser, parse graphql online, parse graphql query, ast graphql viewer',
    h1: 'GraphQL Parser',
    subtitle: 'Analyze the grammar of your GraphQL operations visually.',
    intro: 'The GraphQL Parser helps you validate and break down the abstract grammar of your operations. It is ideal for educational purposes or for developers writing custom tools, SDKs, or GraphQL transformations who need to see how the original string is segmented.',
    example: {
      input: 'query GetItems { items { name price } }',
      output: '{\n  "kind": "Document",\n  "definitions": [\n    {\n      "kind": "OperationDefinition",\n      "operation": "query",\n      "name": { "kind": "Name", "value": "GetItems" },\n      ...\n    }\n  ]\n}',
      inputLabel: 'GraphQL Document',
      outputLabel: 'Simplified AST (Abstract Syntax Tree)'
    },
    faqs: [
      {
        q: 'What is an AST in GraphQL?',
        a: 'It is the tree structure that describes the syntactic elements of a query (fields, arguments, selections) so that servers can interpret and resolve the query.'
      },
      {
        q: 'Can I export the parsed result?',
        a: 'Yes, you can download or copy it directly using the tool\'s quick shortcuts.'
      }
    ]
  }
};
