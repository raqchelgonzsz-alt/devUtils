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
    title: 'Formateador JSON Online - Embellecer y Validar JSON | Stoolzen',
    description: 'El mejor formateador de JSON online. Valida, embellece y minifica tus cadenas JSON al instante. Herramienta gratuita para desarrolladores.',
    keywords: 'formateador json, json beautifier, validar json, beautify json online, depurar json, dev tools',
    h1: 'Formateador JSON',
    subtitle: 'Formatea, valida y embellece tus cadenas JSON de forma segura.',
    intro: 'Un formateador JSON (o JSON Beautifier) es una herramienta indispensable para desarrolladores que convierte estructuras JSON compactas o mal indentadas en código limpio, jerárquico y altamente legible. Esto facilita enormemente la depuración de respuestas de APIs, archivos de configuración de sistemas y webhooks.',
    example: {
      input: '{"user":{"id":1,"name":"Alice","roles":["admin"],"active":true}}',
      output: '{\n  "user": {\n    "id": 1,\n    "name": "Alice",\n    "roles": [\n      "admin"\n    ],\n    "active": true\n  }\n}',
      inputLabel: 'JSON Compacto',
      outputLabel: 'JSON Formateado'
    },
    faqs: [
      { q: '¿Qué hace exactamente este formateador?', a: 'Parsea y re-estructura tu objeto JSON aplicando sangrado (indentación) consistente para hacerlo fácilmente legible por humanos.' },
      { q: '¿Es seguro procesar datos sensibles aquí?', a: 'Sí. Todo el procesamiento se realiza localmente en tu navegador. Ningún dato se transmite a nuestros servidores.' },
      { q: '¿Por qué mi JSON se muestra como inválido?', a: 'Suele deberse a comas de más, falta de comillas dobles en las llaves o valores incorrectos como "undefined".' }
    ]
  },
  '/tools/json/validator': {
    title: 'Validador JSON Online Gratis - Verifica tu JSON al Instante | Stoolzen',
    description: 'Valida tu JSON online de forma gratuita. Detecta errores de sintaxis y verifica la estructura de tus datos JSON al instante.',
    keywords: 'validador json, json validator online, verificar json, json syntax checker, json error checker',
    h1: 'Validador JSON Online',
    subtitle: 'Comprueba si tu JSON es válido y detecta errores de sintaxis al instante.',
    intro: 'El Validador de JSON comprueba si tu cadena de texto cumple estrictamente la especificación RFC 8259 del formato JSON. Analiza la sintaxis en tiempo real señalándote la línea y columna exacta del primer error sintáctico.',
    example: {
      input: '{"key": "value",}',
      output: 'Error: Trailing comma at line 1 column 17',
      inputLabel: 'JSON con error sintáctico',
      outputLabel: 'Análisis de error'
    },
    faqs: [
      { q: '¿Qué es una coma final o trailing comma?', a: 'Es una coma colocada al final del último elemento en un objeto o array. No está permitida según la especificación estricta de JSON.' },
      { q: '¿El validador muestra la ubicación del error?', a: 'Sí, el editor Monaco integrado resalta en rojo la zona con error y te describe la causa precisa al pasar el cursor por encima.' }
    ]
  },
  '/tools/json/editor': {
    title: 'Editor JSON Online con Resaltado de Sintaxis | Stoolzen',
    description: 'Editor JSON online con resaltado de sintaxis, autocompletado y validación en tiempo real. La herramienta definitiva para editar JSON.',
    keywords: 'editor json online, json editor, editar json, json syntax highlight, json online editor',
    h1: 'Editor JSON Online',
    subtitle: 'Edita tu JSON con resaltado de sintaxis y validación en tiempo real.',
    intro: 'El Editor de JSON de Stoolzen ofrece un entorno interactivo enriquecido para modificar objetos estructurados de forma rápida y segura. Cuenta con las funcionalidades típicas de un IDE moderno directamente en tu web.',
    example: {
      input: '{\n  "version": "1.0.0",\n  "dependencies": {}\n}',
      output: '{\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^19.0.0"\n  }\n}',
      inputLabel: 'JSON Original',
      outputLabel: 'JSON Modificado'
    },
    faqs: [
      { q: '¿Cuenta con autocompletado de llaves?', a: 'Sí, el editor añade y cierra automáticamente llaves, corchetes y comillas a medida que escribes.' },
      { q: '¿Puedo copiar el contenido completo fácilmente?', a: 'Sí, dispones de un botón rápido "Copy" para copiar al portapapeles con un solo clic.' }
    ]
  },
  '/tools/json/pretty-print': {
    title: 'JSON Pretty Print Online - Indentar y Embellecer JSON | Stoolzen',
    description: 'Aplica pretty print a tu JSON online. Indenta y embellece cualquier cadena JSON comprimida para hacerla legible al instante.',
    keywords: 'json pretty print, json indent online, embellecer json, json beautify, json format online, pretty print json',
    h1: 'JSON Pretty Print',
    subtitle: 'Indenta y embellece cualquier cadena JSON comprimida al instante.',
    intro: 'Pretty Print añade espaciado y saltos de línea estratégicos a tu documento JSON para dotarlo de una presentación atractiva. Puedes personalizar la indentación a 2 espacios, 4 espacios o tabulaciones según tus estándares de diseño de código.',
    example: {
      input: '{"project":"Stoolzen","awesome":true}',
      output: '{\n    "project": "Stoolzen",\n    "awesome": true\n}',
      inputLabel: 'String sin formato',
      outputLabel: 'Pretty-Print (4 espacios)'
    },
    faqs: [
      { q: '¿Qué opciones de espaciado existen?', a: 'Soportamos 2 espacios, 4 espacios y tabuladores clásicos en el selector de formato.' },
      { q: '¿Afecta la legibilidad del archivo en producción?', a: 'No, los espacios en blanco no alteran la estructura semántica de los datos serializados.' }
    ]
  },
  '/tools/json/viewer': {
    title: 'Visor JSON Online - Explorar JSON en Vista de Árbol | Stoolzen',
    description: 'Visualiza y explora tu JSON online con vista de árbol interactiva. Navega por estructuras JSON complejas fácilmente.',
    keywords: 'visor json, json viewer online, explorar json, json tree view, visualizar json, json browser',
    h1: 'Visor JSON Online',
    subtitle: 'Explora y navega por tus datos JSON con una vista de árbol interactiva.',
    intro: 'Navega por documentos masivos expandiendo y colapsando nodos interactivos mediante la vista en árbol (tree view). Ideal para explorar payloads de APIs anidadas complejas sin perderse en el código plano.',
    example: {
      input: '{"users":[{"name":"Bob","age":28},{"name":"Alice","age":30}]}',
      output: '▶ Object { users: Array[2] }\n  ▼ users: Array[2]\n    ▶ 0: Object { name: "Bob", age: 28 }\n    ▶ 1: Object { name: "Alice", age: 30 }',
      inputLabel: 'Código plano',
      outputLabel: 'Visualización interactiva'
    },
    faqs: [
      { q: '¿Se puede colapsar todo a la vez?', a: 'Sí, contamos con un botón rápido para colapsar o expandir de forma recursiva toda la estructura en un clic.' },
      { q: '¿Puedo copiar solo un sub-nodo específico?', a: 'Sí, la vista en árbol permite copiar ramas concretas al portapapeles de manera selectiva.' }
    ]
  },
  '/tools/json/parser': {
    title: 'JSON Parser Online - Parsear y Analizar JSON | Stoolzen',
    description: 'Parsea y analiza tu JSON online. Convierte cadenas JSON en estructuras de datos legibles y válidas al instante.',
    keywords: 'json parser online, parsear json, analizar json, json decode, json parse online, json analyzer',
    h1: 'JSON Parser Online',
    subtitle: 'Parsea y analiza tus cadenas JSON para detectar su estructura al instante.',
    intro: 'El Parser de JSON toma una cadena de caracteres cruda y la deserializa para verificar que cumpla rigurosamente con los tipos de datos válidos (cadenas, números, booleanos, nulls, arrays u objetos).',
    example: {
      input: '{"active": true, "timestamp": 1715694212}',
      output: 'Tipo: Object\nPropiedades:\n - active (Boolean): true\n - timestamp (Number): 1715694212',
      inputLabel: 'String JSON',
      outputLabel: 'Análisis de Estructura'
    },
    faqs: [
      { q: '¿Qué pasa si mi string contiene caracteres Unicode?', a: 'El parser los decodifica perfectamente de forma nativa en cumplimiento con el estándar UTF-8.' },
      { q: '¿Qué ocurre con comentarios en mi JSON?', a: 'El estándar JSON oficial no soporta comentarios (líneas con // o /* */), por lo que el parser lanzará un error si los detecta.' }
    ]
  },
  '/tools/json/minify': {
    title: 'JSON Minifier Online - Comprimir y Minificar JSON | Stoolzen',
    description: 'Minifica y comprime tu JSON online al instante. Reduce el tamaño de tus payloads JSON para optimizar el rendimiento de tu API.',
    keywords: 'json minifier, minificar json, comprimir json, json compress online, json minify, reducir json',
    h1: 'JSON Minifier Online',
    subtitle: 'Comprime y minifica tu JSON para reducir su tamaño al máximo.',
    intro: 'La minificación elimina todo carácter innecesario para la computación (espacios, saltos de línea, retornos de carro) de tu JSON. Es un paso crítico para optimizar el consumo de red en payloads HTTP POST en entornos de alta concurrencia.',
    example: {
      input: '{\n  "status": "success",\n  "code": 200\n}',
      output: '{"status":"success","code":200}',
      inputLabel: 'JSON con espacios',
      outputLabel: 'JSON Minificado'
    },
    faqs: [
      { q: '¿Cuánto peso se puede ahorrar minificando?', a: 'Normalmente se logra reducir el tamaño del payload entre un 20% y un 45%, dependiendo del nivel de anidamiento y formateo original.' },
      { q: '¿Cambia la lógica o los valores de los datos?', a: 'En absoluto, el minificador solo elimina espacios en blanco decorativos sin tocar las claves ni los valores.' }
    ]
  },
  '/tools/json/reader': {
    title: 'JSON Reader Online - Leer y Visualizar JSON | Stoolzen',
    description: 'Lee y visualiza ficheros o cadenas JSON online con facilidad. Herramienta gratuita para leer JSON de forma clara y estructurada.',
    keywords: 'json reader, leer json online, json file reader, visualizar json, abrir json online',
    h1: 'JSON Reader Online',
    subtitle: 'Lee y visualiza tus datos JSON de forma clara y estructurada.',
    intro: 'Diseñado específicamente para leer documentos JSON masivos con un scroll sumamente ligero y fluidez total. Ideal para revisar archivos de logs o exportaciones de bases de datos.',
    example: {
      input: '[{"id":1,"event":"click"},{"id":2,"event":"hover"}]',
      output: 'Documento JSON cargado correctamente. 2 registros encontrados en la raíz del array.',
      inputLabel: 'Fichero cargado',
      outputLabel: 'Lectura estructurada'
    },
    faqs: [
      { q: '¿Puedo subir archivos .json grandes?', a: 'Sí, la herramienta soporta la subida local de archivos de gran tamaño mediante drag and drop o selector de ficheros.' },
      { q: '¿Se envía mi archivo a vuestro hosting?', a: 'No, el archivo se lee directamente en tu navegador usando la File API local de HTML5.' }
    ]
  },
  '/tools/json/stringify': {
    title: 'JSON Stringify Online - Convertir Objetos a Cadenas JSON | Stoolzen',
    description: 'Convierte objetos y estructuras de datos a cadenas JSON serializadas online. Equivalente a JSON.stringify con formato personalizable.',
    keywords: 'json stringify online, json serialize, convertir a json string, json serialization, json to string',
    h1: 'JSON Stringify Online',
    subtitle: 'Serializa y convierte estructuras de datos a cadenas JSON al instante.',
    intro: 'Convierte cualquier estructura de datos u objeto pegado a una cadena JSON serializada de forma robusta. Permite establecer sangrados definidos, simulando el comportamiento del método nativo `JSON.stringify(obj, null, space)`.',
    example: {
      input: 'Object { name: "Alice", active: true }',
      output: '{\n  "name": "Alice",\n  "active": true\n}',
      inputLabel: 'Objeto JS de entrada',
      outputLabel: 'Cadena JSON serializada'
    },
    faqs: [
      { q: '¿Soporta referencias circulares?', a: 'Lanza una advertencia sintáctica en caso de que existan referencias circulares en el objeto de entrada para evitar bucles infinitos.' },
      { q: '¿Qué tipos de datos serializa?', a: 'Serializa cadenas, números, booleanos, arrays y sub-objetos legibles.' }
    ]
  },
  '/tools/json/sorter': {
    title: 'JSON Sorter Online - Ordenar Claves JSON Alfabéticamente | Stoolzen',
    description: 'Ordenar las claves de tu JSON online de forma alfabética o personalizada. Normaliza la estructura de tus datos JSON al instante.',
    keywords: 'json sorter, ordenar json, json sort keys, json alphabetical order, ordenar claves json',
    h1: 'JSON Sorter Online',
    subtitle: 'Ordena las claves de tu JSON de forma alfabética e instantánea.',
    intro: 'Normaliza la presentación de tus objetos JSON reordenando todas las claves alfabéticamente de forma recursiva. Es sumamente práctico para realizar comparaciones de diferencia (diffs) coherentes entre dos archivos.',
    example: {
      input: '{"z": 10, "a": 5, "b": {"y": 3, "x": 1}}',
      output: '{\n  "a": 5,\n  "b": {\n    "x": 1,\n    "y": 3\n  },\n  "z": 10\n}',
      inputLabel: 'JSON Desordenado',
      outputLabel: 'JSON Ordenado alfabéticamente'
    },
    faqs: [
      { q: '¿El ordenamiento altera el significado de los datos?', a: 'Según la especificación RFC 8259, un objeto JSON es un conjunto no ordenado de pares clave/valor, por lo que reordenar las llaves no rompe la validez del dato y facilita su comparación.' },
      { q: '¿Es recursivo el ordenamiento?', a: 'Sí, ordena tanto las claves principales como las de cualquier sub-objeto anidado a cualquier nivel.' }
    ]
  },
  '/tools/json/compare': {
    title: 'JSON Compare Online - Comparar Diferencias entre JSONs | Stoolzen',
    description: 'Compara dos JSONs online y encuentra sus diferencias al instante. Herramienta gratuita para identificar cambios entre payloads JSON.',
    keywords: 'json compare, comparar json, json diff online, json differences, comparar dos json',
    h1: 'JSON Compare Online',
    subtitle: 'Compara dos JSONs y detecta sus diferencias al instante.',
    intro: 'Identifica rápidamente diferencias, adiciones o eliminaciones entre dos objetos JSON estructurados. La herramienta ideal para depurar versiones de payloads de webhooks o configuraciones.',
    example: {
      input: 'JSON A: {"name": "Alice", "role": "admin"}\nJSON B: {"name": "Alice", "role": "user", "age": 30}',
      output: 'Modificado: "role" ("admin" -> "user")\nAgregado: "age" (30)',
      inputLabel: 'JSONs de Entrada',
      outputLabel: 'Diferencias encontradas'
    },
    faqs: [
      { q: '¿Cómo funciona la comparación?', a: 'Analiza recursivamente ambos objetos y resalta visualmente las claves eliminadas, modificadas o añadidas.' },
      { q: '¿Es recomendable ordenar las claves antes de comparar?', a: 'Sí, ordenar las claves alfabéticamente ayuda a evitar falsos positivos de diferencia por simple posicionamiento.' }
    ]
  },
  '/tools/json/escape': {
    title: 'JSON Escape Online - Escapar Caracteres en JSON | Stoolzen',
    description: 'Escapa caracteres especiales en cadenas JSON online. Convierte caracteres reservados para uso seguro en strings JSON.',
    keywords: 'json escape, escapar json, json string escape, json encode, escape json online',
    h1: 'JSON Escape Online',
    subtitle: 'Escapa caracteres especiales en tus strings JSON al instante.',
    intro: 'Convierte caracteres que tienen significados reservados en JSON (como comillas dobles, barras diagonales inversas y saltos de línea) en sus secuencias de escape válidas (`\\\"`, `\\\\`, `\\n`).',
    example: {
      input: 'Texto con "comillas" y\nsaltos de línea.',
      output: '"Texto con \\"comillas\\" y\\nsaltos de línea."',
      inputLabel: 'Texto crudo',
      outputLabel: 'String JSON escapada'
    },
    faqs: [
      { q: '¿Por qué es necesario escapar caracteres?', a: 'Para poder anidar strings o almacenar bloques de texto de forma segura dentro de una propiedad JSON sin romper la sintaxis del parser.' },
      { q: '¿Qué caracteres se escapan?', a: 'Principalmente comillas dobles (`"`), barras inversas (`\\`), tabuladores (`\\t`) y saltos de línea (`\\n`).' }
    ]
  },
  '/tools/json/unescape': {
    title: 'JSON Unescape Online - Desescapar Cadenas JSON | Stoolzen',
    description: 'Desescapa cadenas JSON online con un clic. Convierte secuencias de escape JSON en su representación original legible.',
    keywords: 'json unescape, desescapar json, json decode string, json unescape online, json string decode',
    h1: 'JSON Unescape Online',
    subtitle: 'Desescapa y decodifica cadenas JSON al instante.',
    intro: 'Realiza el proceso inverso de escape: toma una cadena con secuencias de escape codificadas y las traduce a su formato de texto humano original y legible.',
    example: {
      input: '"Hola \\"Mundo\\"\\nLínea 2."',
      output: 'Hola "Mundo"\nLínea 2.',
      inputLabel: 'String escapada',
      outputLabel: 'Texto desescapado'
    },
    faqs: [
      { q: '¿Qué secuencias decodifica?', a: 'Decodifica secuencias estándares como `\\\"`, `\\\\`, `\\/`, `\\n`, `\\r`, `\\t` y códigos unicode `\\uXXXX`.' },
      { q: '¿Lanza error si el texto no está correctamente escapado?', a: 'Si detecta una secuencia de escape inválida o trunca, te alertará para que puedas corregirla.' }
    ]
  },
  '/tools/json/path-explorer': {
    title: 'JSONPath Explorer Online - Explorar Rutas en JSON | Stoolzen',
    description: 'Explora y prueba expresiones JSONPath en tus datos online. El JSONPath Explorer más potente y visual para desarrolladores.',
    keywords: 'jsonpath explorer, jsonpath online, json path tester, explorar json path, json query online',
    h1: 'JSONPath Explorer Online',
    subtitle: 'Explora y prueba expresiones JSONPath en tus datos de forma visual.',
    intro: 'Filtra y extrae partes específicas de un JSON masivo utilizando expresiones JSONPath (el equivalente a XPath para XML). Muy útil para probar consultas complejas antes de implementarlas en tu código de backend.',
    example: {
      input: 'JSON: {"store":{"book":[{"title":"Sayings"},{"title":"Sword"}]}}\nConsulta: $.store.book[*].title',
      output: '[\n  "Sayings",\n  "Sword"\n]',
      inputLabel: 'JSON y Expresión de Entrada',
      outputLabel: 'Resultados filtrados'
    },
    faqs: [
      { q: '¿Qué es JSONPath?', a: 'Es un lenguaje de consulta para JSON desarrollado por Stefan Gössner, que permite navegar por objetos JSON de forma similar a como XPath navega en XML.' },
      { q: '¿Cuál es la sintaxis para buscar recursivamente?', a: 'Se utiliza el operador de descenso profundo `..` (por ejemplo, `$..title` buscará todas las propiedades "title" en cualquier profundidad del JSON).' }
    ]
  },
  '/tools/json/diff': {
    title: 'JSON Diff Online - Diferencias entre Documentos JSON | Stoolzen',
    description: 'Compara y resalta las diferencias entre dos documentos JSON online. Visualiza los cambios con un diff visual claro e intuitivo.',
    keywords: 'json diff, diferencias json, json diff online, comparar json, json delta, json changes',
    h1: 'JSON Diff Online',
    subtitle: 'Visualiza las diferencias entre dos documentos JSON con un diff interactivo.',
    intro: 'Un diff visual premium para archivos JSON. Compara línea por línea, identifica adiciones, cambios de valores de propiedades y eliminaciones de campos de forma sumamente gráfica e interactiva.',
    example: {
      input: 'JSON A: {"name": "Alice"}\nJSON B: {"name": "Bob"}',
      output: '- "name": "Alice"\n+ "name": "Bob"',
      inputLabel: 'Documentos a comparar',
      outputLabel: 'Resultado visual diff'
    },
    faqs: [
      { q: '¿Qué indican los colores en el resultado?', a: 'El color verde indica líneas añadidas, el rojo señala elementos eliminados y el amarillo o azul destaca las propiedades modificadas.' },
      { q: '¿El diff funciona de manera local?', a: 'Sí, la comparación se ejecuta íntegramente en tu navegador sin enviar datos a la red.' }
    ]
  }
};
