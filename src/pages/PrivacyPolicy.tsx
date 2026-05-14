import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <SEO 
        title="Privacy Policy | Stoolzen"
        description="Privacy Policy for Stoolzen.com - Learn how we handle your data."
      />
      <h1 className="text-3xl font-bold mb-6 text-on-surface">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none text-on-surface-variant">
        <p className="mb-6"><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">1. Introduction</h2>
        <p className="mb-4">Welcome to Stoolzen.com. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">2. Data Collection & Usage</h2>
        <p className="mb-4">The developer tools provided on Stoolzen (such as the JSON Formatter, GraphQL Formatter, and JWT Decoder) are designed to process data locally in your browser. We do not transmit, store, or process your code, schemas, or JSON payloads on our servers. All formatting and decoding happens client-side to ensure your data remains completely private and secure.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">3. Third-Party Services & Ads</h2>
        <p className="mb-4">We use third-party advertising companies, such as Google AdSense, to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. We use cookies to personalize content and ads, to provide social media features, and to analyze our traffic.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">4. Local Storage & Cookies</h2>
        <p className="mb-4">We use local storage in your browser to save your preferences, such as your chosen theme (light/dark mode) and editor configurations. You can clear this data at any time by clearing your browser's site data.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">5. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at info@stoolzen.com.</p>
      </div>
    </div>
  );
};
