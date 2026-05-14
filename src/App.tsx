import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { JSONFormatter } from './pages/JSONFormatter';
import { GraphQLFormatter } from './pages/GraphQLFormatter';
import { JWTDecoder } from './pages/JWTDecoder';
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

        {/* JSON tools - all same component, different SEO via useLocation */}
        <Route path="/json" element={<JSONFormatter />} />
        <Route path="/json-validator" element={<JSONFormatter />} />
        <Route path="/json-editor" element={<JSONFormatter />} />
        <Route path="/json-pretty-print" element={<JSONFormatter />} />
        <Route path="/json-viewer" element={<JSONFormatter />} />
        <Route path="/json-parser" element={<JSONFormatter />} />
        <Route path="/json-minifier" element={<JSONFormatter />} />
        <Route path="/json-reader" element={<JSONFormatter />} />
        <Route path="/json-stringify" element={<JSONFormatter />} />
        <Route path="/json-sorter" element={<JSONFormatter />} />

        {/* GraphQL tools - all same component, different SEO via useLocation */}
        <Route path="/graphql" element={<GraphQLFormatter />} />
        <Route path="/graphql-validator" element={<GraphQLFormatter />} />
        <Route path="/graphql-editor" element={<GraphQLFormatter />} />
        <Route path="/graphql-beautifier" element={<GraphQLFormatter />} />
        <Route path="/graphql-minifier" element={<GraphQLFormatter />} />
        <Route path="/graphql-viewer" element={<GraphQLFormatter />} />
        <Route path="/graphql-checker" element={<GraphQLFormatter />} />
        <Route path="/graphql-parser" element={<GraphQLFormatter />} />

        <Route path="/jwt" element={<JWTDecoder />} />
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
