import React from 'react';
import { useRouter } from 'next/router';

const MatchDetail = () => {
  const router = useRouter();
  const { Id } = router.query;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Match Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Match ID: {Id}</p>
        {/* Match details will go here */}
        <p>Match details coming soon...</p>
      </div>
    </div>
  );
};

export default MatchDetail;
