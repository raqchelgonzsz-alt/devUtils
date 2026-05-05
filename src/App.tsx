import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { JSONFormatter } from './pages/JSONFormatter';
import { GraphQLFormatter } from './pages/GraphQLFormatter';
import { JWTDecoder } from './pages/JWTDecoder';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/json" element={<JSONFormatter />} />
        <Route path="/graphql" element={<GraphQLFormatter />} />
        <Route path="/jwt" element={<JWTDecoder />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
