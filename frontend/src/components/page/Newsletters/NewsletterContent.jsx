import React from 'react';
import PagePostSidebar from '../../extras/PagePostSidebar';
import NewslettersGrid from './NewslettersGrid';

export default function NewsletterContent({ newsletters }) {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <NewslettersGrid newsletters={newsletters} />
        <PagePostSidebar />
      </div>
    </div>
  );
}
