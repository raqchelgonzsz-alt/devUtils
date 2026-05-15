import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { ToolsHub } from './pages/ToolsHub';
import { JSONFormatter } from './pages/JSONFormatter';
import { GraphQLFormatter } from './pages/GraphQLFormatter';
import { JWTDecoder } from './pages/JWTDecoder';
import { Base64Tool } from './pages/Base64Tool';
import { JSONDiff } from './pages/JSONDiff';
import { JSONEscape } from './pages/JSONEscape';
import { JSONPathExplorer } from './pages/JSONPathExplorer';
import { Premium } from './pages/Premium';

import { Docs } from './pages/Docs';
import { DocArticle } from './pages/DocArticle';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Level 1 - Hub pages */}
        <Route path="/tools" element={<ToolsHub />} />
        <Route path="/tools/json" element={<ToolsHub category="json" />} />
        <Route path="/tools/graphql" element={<ToolsHub category="graphql" />} />
        <Route path="/tools/api" element={<ToolsHub category="api" />} />
        <Route path="/tools/text" element={<ToolsHub category="text" />} />
        <Route path="/tools/css" element={<ToolsHub category="css" />} />

        {/* JSON tools - Level 3 & 4 */}
        <Route path="/tools/json/formatter" element={<JSONFormatter />} />
        <Route path="/tools/json/validator" element={<JSONFormatter />} />
        <Route path="/tools/json/editor" element={<JSONFormatter />} />
        <Route path="/tools/json/pretty-print" element={<JSONFormatter />} />
        <Route path="/tools/json/viewer" element={<JSONFormatter />} />
        <Route path="/tools/json/parser" element={<JSONFormatter />} />
        <Route path="/tools/json/minify" element={<JSONFormatter />} />
        <Route path="/tools/json/reader" element={<JSONFormatter />} />
        <Route path="/tools/json/stringify" element={<JSONFormatter />} />
         <Route path="/tools/json/sorter" element={<JSONFormatter />} />
        <Route path="/tools/json/compare" element={<JSONDiff />} />
        <Route path="/tools/json/escape" element={<JSONEscape />} />
        <Route path="/tools/json/unescape" element={<JSONEscape />} />
        <Route path="/tools/json/path-explorer" element={<JSONPathExplorer />} />
        <Route path="/tools/json/diff" element={<JSONDiff />} />

        {/* GraphQL tools - Level 3 */}
        <Route path="/tools/graphql/formatter" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/validator" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/editor" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/beautifier" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/minifier" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/viewer" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/checker" element={<GraphQLFormatter />} />
        <Route path="/tools/graphql/parser" element={<GraphQLFormatter />} />

        {/* API tools - Level 3 */}
        <Route path="/tools/api/jwt-decoder" element={<JWTDecoder />} />

        {/* Text Tools */}
        <Route path="/tools/text/base64-encoder" element={<Base64Tool />} />
        <Route path="/tools/text/base64-decoder" element={<Base64Tool />} />

        {/* Legacy redirects - keep old URLs alive for SEO */}
        <Route path="/json" element={<Navigate to="/tools/json/formatter" replace />} />
        <Route path="/json-validator" element={<Navigate to="/tools/json/validator" replace />} />
        <Route path="/json-editor" element={<Navigate to="/tools/json/editor" replace />} />
        <Route path="/json-pretty-print" element={<Navigate to="/tools/json/pretty-print" replace />} />
        <Route path="/json-viewer" element={<Navigate to="/tools/json/viewer" replace />} />
        <Route path="/json-parser" element={<Navigate to="/tools/json/parser" replace />} />
        <Route path="/json-minifier" element={<Navigate to="/tools/json/minify" replace />} />
        <Route path="/json-reader" element={<Navigate to="/tools/json/reader" replace />} />
        <Route path="/json-stringify" element={<Navigate to="/tools/json/stringify" replace />} />
        <Route path="/json-sorter" element={<Navigate to="/tools/json/sorter" replace />} />
        <Route path="/graphql" element={<Navigate to="/tools/graphql/formatter" replace />} />
        <Route path="/graphql-validator" element={<Navigate to="/tools/graphql/validator" replace />} />
        <Route path="/graphql-editor" element={<Navigate to="/tools/graphql/editor" replace />} />
        <Route path="/graphql-beautifier" element={<Navigate to="/tools/graphql/beautifier" replace />} />
        <Route path="/graphql-minifier" element={<Navigate to="/tools/graphql/minifier" replace />} />
        <Route path="/graphql-viewer" element={<Navigate to="/tools/graphql/viewer" replace />} />
        <Route path="/graphql-checker" element={<Navigate to="/tools/graphql/checker" replace />} />
        <Route path="/graphql-parser" element={<Navigate to="/tools/graphql/parser" replace />} />
        <Route path="/jwt" element={<Navigate to="/tools/api/jwt-decoder" replace />} />

        <Route path="/premium" element={<Premium />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/:id" element={<DocArticle />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
