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
    title: 'Formateador GraphQL Online - Validar y Embellecer Consultas | Stoolzen',
    description: 'El mejor formateador de GraphQL online. Limpia, valida e indenta tus esquemas, fragmentos y queries GraphQL al instante con total privacidad.',
    keywords: 'formateador graphql, graphql beautifier online, embellecer graphql, queries graphql, indentar graphql gratis',
    h1: 'Formateador GraphQL',
    subtitle: 'Limpia, valida y embellece tus consultas y esquemas GraphQL al instante.',
    intro: 'El Formateador GraphQL de Stoolzen procesa tus consultas, mutaciones y esquemas GraphQL para darles una estructura indentada, uniforme y profesional. Al dar formato a tus queries, es mucho más sencillo depurar la jerarquía de campos, identificar variables no utilizadas y asegurar la legibilidad del código antes de enviarlo a producción o agregarlo a un repositorio.',
    example: {
      input: 'query MyQuery($limit:Int!){users(limit:$limit){id profile{firstName lastName}posts{title}}}',
      output: 'query MyQuery($limit: Int!) {\n  users(limit: $limit) {\n    id\n    profile {\n      firstName\n      lastName\n    }\n    posts {\n      title\n    }\n  }\n}',
      inputLabel: 'Consulta GraphQL Comprimida',
      outputLabel: 'Consulta GraphQL Formateada'
    },
    faqs: [
      {
        q: '¿Qué hace un formateador de GraphQL?',
        a: 'Reestructura las consultas de GraphQL agregando tabulaciones, espacios y saltos de línea estandarizados según la especificación de GraphQL, mejorando la visualización del código.'
      },
      {
        q: '¿Cómo funciona la validación del formateador?',
        a: 'Analiza el árbol de sintaxis abstracta (AST) de GraphQL. Si hay algún error sintáctico (como llaves desemparejadas o argumentos mal estructurados), te notificará la ubicación exacta en rojo.'
      },
      {
        q: '¿Tienen coste las herramientas de Stoolzen?',
        a: 'No, todas nuestras herramientas son 100% gratuitas, de código abierto conceptual, y funcionan completamente en el lado del cliente.'
      }
    ]
  },
  '/tools/graphql/validator': {
    title: 'Validador GraphQL Online Gratis - Comprobación de Sintaxis | Stoolzen',
    description: 'Valida tus consultas, esquemas y tipos GraphQL online en tiempo real. Detecta errores de sintaxis y asegura la conformidad de tus APIs.',
    keywords: 'validador graphql, graphql validator, validar schema graphql, comprobar sintaxis graphql, graphql linter',
    h1: 'Validador GraphQL Online',
    subtitle: 'Verifica la integridad de tus esquemas y consultas GraphQL en tiempo real.',
    intro: 'El Validador GraphQL de Stoolzen analiza tus queries y definiciones de esquemas (SDL) para garantizar que sigan estrictamente la sintaxis oficial. Ideal para depurar errores de compilación de servidores Apollo, GraphQL Yoga, o Hasura de forma inmediata y visual.',
    example: {
      input: 'subscription OnCommentAdded($postID: ID!) { commentAdded(postID: $postID) { id body author { name } }',
      output: 'Error de Sintaxis: Se esperaba el carácter de cierre "}" al final del bloque de selección en la línea 1.',
      inputLabel: 'GraphQL con Error',
      outputLabel: 'Diagnóstico de Sintaxis'
    },
    faqs: [
      {
        q: '¿Qué tipo de errores detecta el validador?',
        a: 'Llaves sin cerrar, argumentos de directivas incorrectos, nombres de campos no permitidos por la sintaxis base, variables mal declaradas y bloques de fragmentos incompletos.'
      },
      {
        q: '¿Es compatible con Schema Definition Language (SDL)?',
        a: 'Sí, puedes pegar la estructura de tipos de tu esquema (types, inputs, interfaces, enums) y validar que la estructura SDL sea sintácticamente válida.'
      }
    ]
  },
  '/tools/graphql/editor': {
    title: 'Editor GraphQL Online con Resaltado y Validación | Stoolzen',
    description: 'Prueba y escribe tu código GraphQL en nuestro editor interactivo con resaltado de sintaxis, autocompletado y validación automatizada al instante.',
    keywords: 'editor graphql online, graphql editor, escribir query graphql, editor schema sdl, playground graphql',
    h1: 'Editor GraphQL Online',
    subtitle: 'Un espacio de trabajo completo para tus consultas, mutaciones y esquemas.',
    intro: 'El Editor GraphQL es un playground web seguro y potente equipado con Monaco Editor (el motor detrás de VS Code). Ofrece autocompletado inteligente, plegado de código, búsqueda avanzada y diagnóstico de sintaxis en vivo sin sobrecargar la memoria de tu navegador.',
    example: {
      input: 'mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    id\n    title\n  }\n}',
      output: 'Escribe y modifica tus mutaciones de forma segura con validación estructural integrada.',
      inputLabel: 'Entorno de Edición',
      outputLabel: 'Estado del Código'
    },
    faqs: [
      {
        q: '¿Puedo usar atajos de teclado?',
        a: '¡Por supuesto! Al usar Monaco Editor, tienes acceso a los mismos comandos que en Visual Studio Code (Ctrl+F para buscar, Alt+Shift+F para formatear, etc.).'
      },
      {
        q: '¿El editor guarda mi información?',
        a: 'No. Todo el contenido se procesa de manera efímera y local. Tu privacidad es nuestra absoluta prioridad.'
      }
    ]
  },
  '/tools/graphql/beautifier': {
    title: 'GraphQL Beautifier Online - Embellecer Consultas GraphQL | Stoolzen',
    description: 'Embellece y estiliza tu código GraphQL online con un clic. Estructura fragmentos, queries y mutaciones complejas para mejorar la legibilidad.',
    keywords: 'graphql beautifier, embellecer graphql, limpiar consulta graphql, formatear graphql online, clean graphql',
    h1: 'GraphQL Beautifier',
    subtitle: 'Dale un aspecto elegante y legible a tus consultas y fragmentos GraphQL.',
    intro: 'GraphQL Beautifier es la herramienta preferida por ingenieros de software para organizar y documentar llamadas de API de forma clara. Convierte cadenas desordenadas, sin espacios o resultantes de logs de red en fragmentos estructurados con sangrado impecable.',
    example: {
      input: 'fragment UserDetails on User{id name roles{name permissions{key}}}',
      output: 'fragment UserDetails on User {\n  id\n  name\n  roles {\n    name\n    permissions {\n      key\n    }\n  }\n}',
      inputLabel: 'Fragmento Desordenado',
      outputLabel: 'Fragmento Embellecido'
    },
    faqs: [
      {
        q: '¿Cuál es la diferencia entre formatear y embellecer GraphQL?',
        a: 'Son sinónimos en el desarrollo de software. Ambos procesos buscan mejorar el aspecto estético e indentado del código sin alterar la lógica de ejecución.'
      },
      {
        q: '¿Soporta la opción de copiar al portapapeles rápidamente?',
        a: 'Sí, dispones de un botón superior con el icono de copiado que transfiere el código procesado al portapapeles con un solo toque.'
      }
    ]
  },
  '/tools/graphql/minifier': {
    title: 'GraphQL Minifier Online - Reducir Tamaño de Consultas | Stoolzen',
    description: 'Minifica tus queries GraphQL online. Elimina espacios en blanco redundantes y comentarios para acelerar las peticiones HTTP a tus APIs.',
    keywords: 'graphql minifier, comprimir graphql online, minificar query graphql, optimizar peticiones graphql, comprimir payload',
    h1: 'GraphQL Minifier',
    subtitle: 'Reduce drásticamente el peso de tus consultas para entornos de producción.',
    intro: 'GraphQL Minifier es una herramienta de optimización de red que comprime tus consultas GraphQL eliminando todos los caracteres innecesarios como saltos de línea, tabulaciones y comentarios de código. Esto reduce el consumo de ancho de banda y mejora el tiempo de respuesta en infraestructuras móviles o de alta carga.',
    example: {
      input: '# Consulta para obtener el perfil del usuario\nquery GetProfile {\n  me {\n    id\n    email\n  }\n}',
      output: 'query GetProfile{me{id email}}',
      inputLabel: 'Consulta con Comentarios y Espacios',
      outputLabel: 'Consulta Minificada'
    },
    faqs: [
      {
        q: '¿Cuánto peso se puede ahorrar al minificar GraphQL?',
        a: 'En consultas complejas o esquemas SDL extensos, se puede llegar a reducir el tamaño del payload hasta en un 60%, acelerando el tiempo de latencia de red.'
      },
      {
        q: '¿El servidor de GraphQL comprenderá la consulta comprimida?',
        a: 'Sí. La gramática de GraphQL define que los espacios en blanco y los saltos de línea son opcionales como separadores en la mayoría de sus construcciones.'
      }
    ]
  },
  '/tools/graphql/viewer': {
    title: 'Visor GraphQL Online - Inspecciona la Estructura de Queries | Stoolzen',
    description: 'Visualiza la estructura jerárquica de tus consultas y esquemas GraphQL de forma estructurada y con resaltado de color profesional.',
    keywords: 'visor graphql online, inspect graphql, render graphql syntax, ver esquema graphql online, visor queries',
    h1: 'Visor GraphQL Online',
    subtitle: 'Una vista organizada e interactiva de tus payloads y esquemas de API.',
    intro: 'El Visor GraphQL online te ayuda a inspeccionar y comprender la jerarquía interna de tus documentos GraphQL de gran tamaño. Ofrece un resaltado de sintaxis avanzado adaptado al esquema de colores de la interfaz para que asimiles de un vistazo las anidaciones de consultas.',
    example: {
      input: 'query { analytics { activeUsers stats { daily weekly monthly } } }',
      output: '• query\n  • analytics\n    - activeUsers\n    • stats\n      - daily\n      - weekly\n      - monthly',
      inputLabel: 'Payload GraphQL',
      outputLabel: 'Visualización Estructurada'
    },
    faqs: [
      {
        q: '¿Es útil para revisar esquemas anidados?',
        a: 'Es la forma óptima de depurar llamadas en capas profundas antes de implementarlas en tus clientes Apollo o Relay.'
      },
      {
        q: '¿Puedo usarlo en tablets y móviles?',
        a: 'Sí, la interfaz se adapta de manera totalmente fluida a pantallas táctiles y formatos responsive.'
      }
    ]
  },
  '/tools/graphql/checker': {
    title: 'Linter y Validador de Sintaxis GraphQL Online | Stoolzen',
    description: 'Analiza tu código GraphQL en busca de errores sintácticos comunes y desviaciones de las mejores prácticas de forma inmediata y local.',
    keywords: 'graphql checker, comprobar query graphql, depurar sintaxis graphql online, corregir graphql',
    h1: 'GraphQL Checker',
    subtitle: 'Tu asistente de calidad y depuración sintáctica para GraphQL.',
    intro: 'GraphQL Checker actúa como un analizador estático ultrarrápido que lee tus cadenas GraphQL y comprueba que no contengan llaves faltantes, directivas inválidas o variables sintácticamente incorrectas. Ideal para pruebas rápidas de integración.',
    example: {
      input: 'query { user(id: "10") { name posts(limit: 5 } }',
      output: 'Syntax Error: Expected ")", found "}" en la línea 1 columna 39.',
      inputLabel: 'Código GraphQL Erróneo',
      outputLabel: 'Resultado del Chequeo'
    },
    faqs: [
      {
        q: '¿El checker corrige errores de forma automática?',
        a: 'Indica los errores mediante el formateador automático. Si la estructura básica lo permite, el botón "Prettify" reconstruirá la consulta arreglando el espaciado.'
      },
      {
        q: '¿Es compatible con mutaciones y suscripciones?',
        a: 'Sí, soporta todas las operaciones raíz descritas por la especificación de GraphQL (Query, Mutation, Subscription).'
      }
    ]
  },
  '/tools/graphql/parser': {
    title: 'GraphQL Parser Online - Analizar Árbol de Sintaxis | Stoolzen',
    description: 'Parsea y desglosa tus consultas GraphQL en componentes estructurados legibles al instante con total seguridad.',
    keywords: 'graphql parser, parsear graphql online, parsear consulta graphql, ast graphql viewer',
    h1: 'GraphQL Parser',
    subtitle: 'Analiza la gramática de tus operaciones GraphQL de forma visual.',
    intro: 'El Parser de GraphQL te ayuda a validar y desglosar la gramática abstracta de tus operaciones. Es ideal para fines educativos o para desarrolladores que escriben herramientas personalizadas, SDKs o transformaciones de GraphQL y necesitan ver cómo se segmenta la cadena original.',
    example: {
      input: 'query GetItems { items { name price } }',
      output: '{\n  "kind": "Document",\n  "definitions": [\n    {\n      "kind": "OperationDefinition",\n      "operation": "query",\n      "name": { "kind": "Name", "value": "GetItems" },\n      ...\n    }\n  ]\n}',
      inputLabel: 'Documento GraphQL',
      outputLabel: 'AST (Abstract Syntax Tree) Simplificado'
    },
    faqs: [
      {
        q: '¿Qué es un AST en GraphQL?',
        a: 'Es la estructura en árbol que describe los elementos sintácticos de una query (campos, argumentos, selecciones) para que los servidores puedan interpretar y resolver la consulta.'
      },
      {
        q: '¿Puedo exportar el resultado parseado?',
        a: 'Sí, puedes descargarlo o copiarlo directamente usando los accesos rápidos de la herramienta.'
      }
    ]
  }
};
