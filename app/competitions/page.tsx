import React from 'react';

export default function CompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Competitions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Competition content will go here */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            Competition information will be available here shortly.
          </p>
        </div>
      </div>
    </div>
  );
} 