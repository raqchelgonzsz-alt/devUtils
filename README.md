# 🛠️ Stoolzen - Developer Tools Suite

<div align="center">
  <img width="1200" alt="Stoolzen Banner" src="public/og-image.png" />
</div>

<div align="center">

[![Production Website](https://img.shields.io/badge/Production-stoolzen.com-4F46E5?style=for-the-badge&logo=google-chrome&logoColor=white)](https://stoolzen.com/)
[![React Version](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/Maintained%20with-pnpm-E2703A?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Stoolzen</b> es una suite premium de herramientas web de alto rendimiento y grado profesional para desarrolladores. Todas las operaciones de formateo, codificación y análisis se ejecutan de manera 100% segura en el lado del cliente (client-side), garantizando la total privacidad de datos sensibles, tokens y esquemas de software.
</p>

### 🔗 URL en producción: [https://stoolzen.com](https://stoolzen.com/)

</div>

---

## 🎯 Introducción

### ¿Qué problema resuelve?
Los desarrolladores interactúan a diario con utilidades web para formatear JSON, validar consultas GraphQL o decodificar JSON Web Tokens (JWT). Sin embargo, la gran mayoría de herramientas existentes en la web sufren de tres graves deficiencias:
1. **Riesgos de Privacidad:** Muchos portales envían los payloads pegados en los campos de texto hacia servidores remotos para su procesamiento, exponiendo datos de producción y secretos de negocio.
2. **Experiencia de Usuario Pobre:** Webs plagadas de anuncios intrusivos y layouts rotos que degradan la productividad y ralentizan los tiempos de carga en entornos corporativos.
3. **Falta de Fiabilidad Técnica:** Herramientas que carecen de validación de sintaxis estricta o que fallan al procesar archivos de gran tamaño.

**Stoolzen** soluciona esto combinando procesamiento client-side de nivel de sistema con una interfaz developer-first premium, rápida y altamente optimizada.

### ¿Para quién está hecho?
Diseñado para ingenieros de software, analistas de datos, DevOps, arquitectos de sistemas y desarrolladores frontend/backend que buscan un espacio unificado, confiable y seguro para depurar sus payloads diarios.

### Casos de uso reales
* **Depuración local de APIs:** Inspección rápida y formateo legible de payloads JSON antes de integrarlos en requests HTTP.
* **Validación de esquemas y queries GraphQL:** Comprobación estricta de sintaxis de consultas antes de incluirlas en clientes Apollo o Relay.
* **Inspección de credenciales y seguridad:** Decodificación de tokens de autorización JWT para verificar claims expirados o firmas criptográficas sin exponer el token a internet.
* **Codificación segura de activos:** Codificación y decodificación de tokens o imágenes a Base64 localmente.

---

## ✨ Features

* **🔒 Privacidad Garantizada (Client-Side Only):** El procesamiento se realiza a través de JavaScript local. La red no se utiliza para transmitir tus datos. Tus payloads nunca tocan un servidor externo.
* **⚡ Rendimiento Optimizado (Zero-Lag):** Tiempos de respuesta inmediatos incluso con payloads JSON masivos (probado hasta 15MB) gracias al motor de procesamiento y renderización en bloque.
* **🎨 Interfaz de Usuario de Grado Premium:**
  * Modo claro y modo oscuro real con colores HSL armonizados que reducen la fatiga visual.
  * Micro-animaciones fluidas con Framer Motion / Motion.js.
  * Tipografías optimizadas para lectura de código y layouts fluidos.
* **💻 Integración de Monaco Editor:** Integración nativa del motor que impulsa VS Code. Cuenta con resaltado de sintaxis inteligente, plegado de código (`folding`), autocompletado y validación activa con marcadores de error en rojo.
* **📢 Optimización SEO y UX para AdSense:**
  * Estructura limpia y semántica optimizada para motores de búsqueda (Metadata API avanzada).
  * Ubicaciones estratégicas de banners publicitarios que respetan las políticas de calidad de AdSense para evitar el "contenido de poco valor" y asegurar alta visibilidad de anuncios sin perturbar el espacio de trabajo del desarrollador.

---

## 💻 Demo

Puedes acceder de forma inmediata y gratuita a la suite completa de Stoolzen en:

### 👉 **[https://stoolzen.com](https://stoolzen.com/)**

---

## 📸 Screenshots

Aquí puedes ver la vista general de nuestra suite de herramientas:

<div align="center">
  <img src="public/og-image.png" alt="Stoolzen Developer Interface" width="95%" style="border-radius: 12px; border: 1px solid var(--color-outline-variant);" />
</div>

---

## 🛠️ Stack Tecnológico

El proyecto está construido siguiendo arquitecturas modernas para maximizar la velocidad, SEO y portabilidad de los componentes:

### Core Framework & Build
* **[React 19](https://react.dev/):** Utilización de las últimas APIs de componentes y mejoras en la renderización.
* **[Next.js 15 (App Router)](https://nextjs.org/):** Framework de React optimizado con renderización híbrida (SSR/SSG), optimización automática de assets y enrutamiento avanzado.
* **[TypeScript](https://www.typescriptlang.org/):** Tipado estricto en toda la suite para prevenir errores en tiempo de ejecución.

### Styling & Motion
* **[Tailwind CSS v4.0](https://tailwindcss.com/):** Estilos ultra optimizados en un motor CSS compilado nativo de alto rendimiento.
* **[Framer Motion](https://www.framer.com/motion/):** Animaciones fluidas, estados interactivos y transiciones elegantes entre componentes.

### Editor & Parser Engine
* **[Monaco Editor](https://microsoft.github.io/monaco-editor/):** Editor de código enriquecido client-side para visualización profesional de código.
* **[GraphQL Engine Parsers](https://graphql.org/):** Validación estricta bajo especificación AST de GraphQL.

### Infraestructura & SEO Stack
* **[Cloudflare Pages / Edge Network](https://pages.cloudflare.com/):** Distribución global en el borde del CDN más rápido del mercado para latencias cercanas a cero.
* **[Sitemap XML Automático](https://stoolzen.com/sitemap.xml):** Indexación estructurada y mapas web dinámicos.

---

## 🚀 Instalación y Desarrollo Local

Stoolzen utiliza **pnpm** como gestor de paquetes para garantizar descargas ultrarrápidas y una estructura de dependencias optimizada en espacio.

### 📋 Requisitos Previos
* **Node.js** v20.x o superior.
* **pnpm** v9.x o superior instalado de manera global (`npm i -g pnpm`).

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/stoolzen.git
cd stoolzen
```

### Paso 2: Instalar Dependencias
```bash
pnpm install
```

### Paso 3: Configurar Variables de Entorno
Copia el archivo de ejemplo para configurar tus variables locales:
```bash
cp .env.example .env.local
```

### Paso 4: Iniciar Servidor de Desarrollo
```bash
pnpm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000) para interactuar con la plataforma de desarrollo local.

### Paso 5: Compilación para Producción
Para compilar y verificar que no existan errores estáticos ni de TypeScript en el empaquetado final:
```bash
pnpm run build
pnpm run start
```

---

## ⚙️ Variables de Entorno

El proyecto se puede configurar fácilmente mediante el uso de variables de entorno locales:

| Variable de Entorno | Descripción | Ejemplo | Requerido |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | URL base de la aplicación (usada para canonicals y OG tags) | `https://stoolzen.com` | Sí |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Identificador de editor de Google AdSense para la monetización | `ca-pub-6484516299507438` | No |
| `NEXT_PUBLIC_ANALYTICS_ID` | ID de rastreo para análisis web respetuosos con la privacidad | `G-XXXXXXXXXX` | No |

---

## 📐 Arquitectura del Proyecto

Stoolzen sigue la arquitectura de estructura modular limpia de Next.js. El diseño está ideado para ser modular, lo que facilita la adición de nuevas herramientas de manera ágil:

```text
├── public/                 # Recursos estáticos servidos en la raíz (robots.txt, sitemap.xml, favicon)
├── src/
│   ├── components/         # Componentes transversales del sistema
│   │   ├── Layout/         # Elementos globales de interfaz (Sidebar, Nav, Footer, AdBanner)
│   │   ├── UI/             # Componentes de UI atómicos (Botones, Inputs, Modales de alta calidad)
│   │   └── SEO/            # Componente dinámico de inyección de metadatos y JSON-LD
│   ├── context/            # Contextos compartidos (Tema de Color, Cookies, Sesión)
│   ├── lib/                # Inicialización de librerías y middlewares
│   ├── pages/ (o app/)     # Rutas de la plataforma (Hub, Herramientas, Documentación, Artículos)
│   ├── utils/              # Lógica pura de algoritmos de procesamiento y helpers
│   └── styles/             # Variables de diseño HSL y estilos de Tailwind CSS
├── tsconfig.json           # Configuración avanzada de compilación estricta en TypeScript
├── package.json            # Configuración de dependencias y scripts pnpm
└── next.config.js          # Configuración del servidor y optimizadores de Next.js
```

---

## 📈 SEO y Rendimiento (Core Web Vitals)

Stoolzen ha sido auditado técnicamente para obtener puntuaciones sobresalientes en rendimiento e indexabilidad, lo que facilita la aprobación en redes de anuncios premium como AdSense y el posicionamiento orgánico en Google (SEO):

* **Renderización Híbrida Inteligente (SSG / SSR):** Las páginas base y de documentación se pre-renderizan estáticamente en tiempo de compilación (SSG) para una carga inicial instantánea y una indexabilidad perfecta del contenido técnico por parte de los rastreadores web simples.
* **Dynamic Sitemap & robots.txt:** Sitemap automatizado que actualiza las rutas activas dinámicamente y expone los enlaces a Google y Bing de manera proactiva.
* **Etiquetado Canonical y SEO Dinámico:** Cada sub-ruta inyecta su propio tag `canonical` único y dinámico, evitando penalizaciones por contenido duplicado al reutilizar vistas similares.
* **Optimización de Core Web Vitals:**
  * **LCP (Largest Contentful Paint) < 1.0s:** Carga priorizada de fuentes tipográficas y optimización de render en Monaco.
  * **CLS (Cumulative Layout Shift) = 0:** Reserva de slots dedicados para los anuncios de AdSense de tamaño responsivo para evitar saltos repentinos de pantalla cuando se cargan los scripts publicitarios.
  * **FID/INP < 50ms:** La ejecución de formateo debounces y procesadores de web worker aislados aseguran que la UI nunca se bloquee.

---

## 🧰 Herramientas Incluidas

La suite está organizada de manera estructurada en las siguientes categorías de utilidades de alto rendimiento:

### 📦 Formatters & Beautifiers
* **Formateador JSON:** Embellece, indenta y limpia cadenas de texto JSON no legibles.
* **Formateador GraphQL:** Organiza consultas, fragmentos y mutaciones con un esquema visual limpio de forma rápida.

### 🔍 Validators & Parsers
* **Validador JSON:** Comprobador sintáctico en tiempo real para encontrar comas mal posicionadas o llaves faltantes basándose en el motor Monaco.
* **Validador GraphQL:** Analiza la validez lógica de las queries antes de enviarlas al servidor.

### 🔐 Security & Decoders
* **Decodificador JWT:** Descompone tokens JWT en Header y Payload. Visualiza parámetros de expiración e inyecta secretos locales para validar la firma de forma 100% offline.

### 📝 Encoders & Converters
* **Codificador/Decodificador Base64:** Permite codificar y decodificar textos de manera fluida usando implementaciones JavaScript seguras y veloces.

---

## 🗺️ Roadmap de Desarrollo

Monitoreamos de forma activa las necesidades del ecosistema y mantenemos este roadmap para futuras implementaciones:

* [x] **Fase 1: Core Essentials** (Arquitectura base, Monaco Editor, Herramientas JSON y GraphQL).
* [x] **Fase 2: SEO Técnico & UX** (Inyección semántica de metadatos, optimización de CLS para AdSense, sitemap dinámico válido).
* [ ] **Fase 3: Expansión de Herramientas** (Generador de Mock Datos JSON, convertidor XML a JSON en tiempo real).
* [ ] **Fase 4: Ecosistema Local Avanzado** (Integración de historial offline persistente mediante IndexedDB y soporte de múltiples pestañas de trabajo).

---

## 🤝 Contribuciones y Estilo de Código

¡Las contribuciones de la comunidad de desarrolladores son inmensamente bienvenidas! Si deseas aportar código al proyecto, sigue estas buenas prácticas:

1. **Haz un Fork del repositorio** y crea una rama a partir de `main` con un nombre descriptivo: `git checkout -b feature/nueva-herramienta`.
2. **Estilo de Código Estricto:** Asegúrate de seguir las directrices de TypeScript y formatear con Prettier antes de enviar un Pull Request.
3. **Validación de Compilación:** Todo PR debe pasar la verificación estática ejecutando de forma exitosa `pnpm run lint`.

---

## 🛡️ Seguridad y Privacidad

En Stoolzen nos tomamos muy en serio la seguridad informática.
* **Responsabilidad de Datos:** Al no transmitir la información procesada a internet, puedes depurar de forma segura datos de configuración e incluso tokens de staging.
* **Reporte de Vulnerabilidades:** Si encuentras algún problema de seguridad o fuga imprevista de datos en la aplicación, por favor, notifícalo directamente de forma responsable enviando un correo a: **security@stoolzen.com**.

---

## 📄 Licencia

Este proyecto está distribuido bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles sobre el uso gratuito comercial y personal de la plataforma.

---

<div align="center">
  <h3>¿Te gusta Stoolzen? ¡Apóyanos dándonos una estrella en GitHub! ⭐</h3>
  <p>
    Tu feedback es de inmenso valor para seguir construyendo la mejor colección de utilidades web para desarrolladores.
  </p>
  <sub>Mantenido y operado con fines educativos y de productividad por el equipo técnico de <a href="https://stoolzen.com/">stoolzen.com</a>.</sub>
</div>
