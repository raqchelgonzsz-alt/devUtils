import React from 'react';
import { SEO } from '../components/SEO';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <SEO 
        title="Terms of Service | Stoolzen"
        description="Terms of Service for Stoolzen.com"
      />
      <h1 className="text-3xl font-bold mb-6 text-on-surface">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none text-on-surface-variant">
        <p className="mb-6"><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">1. Agreement to Terms</h2>
        <p className="mb-4">By accessing and using Stoolzen.com, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">2. Use License</h2>
        <p className="mb-4">Permission is granted to temporarily use the tools on Stoolzen's website for personal, non-commercial, or commercial transitory viewing and usage. This is the grant of a license, not a transfer of title. We encourage developers to use these tools freely in their daily workflows.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">3. Disclaimer</h2>
        <p className="mb-4">The materials and tools on Stoolzen.com are provided on an 'as is' basis. Stoolzen makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">4. Limitations</h2>
        <p className="mb-4">In no event shall Stoolzen or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stoolzen's website, even if Stoolzen or a Stoolzen authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">5. Accuracy of Materials</h2>
        <p className="mb-4">The materials appearing on Stoolzen's website could include technical, typographical, or photographic errors. Stoolzen does not warrant that any of the materials on its website are accurate, complete or current. Stoolzen may make changes to the materials contained on its website at any time without notice.</p>
        
        <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">6. Links</h2>
        <p className="mb-4">Stoolzen has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Stoolzen of the site. Use of any such linked website is at the user's own risk.</p>
      </div>
    </div>
  );
};
