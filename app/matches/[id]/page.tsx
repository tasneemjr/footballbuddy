'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '../../components/Navigation';

interface Match {
  id: number;
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  status: string;
  utcDate: string;
}

export default function MatchDetails() {
  const params = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        if (!params?.id) {
          throw new Error('Match ID is required');
        }
        
        const response = await fetch(`/api/football/matches/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch match details');
        const data = await response.json();
        setMatch(data.match);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [params?.id]);

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-600)]"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </>
    );
  }

  if (!match) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Match Not Found</h1>
          <p className="text-gray-600">The requested match could not be found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <img
                src={match.homeTeam.crest}
                alt={match.homeTeam.name}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{match.homeTeam.name}</h2>
            </div>
            <div className="text-center px-8">
              <div className="text-3xl font-bold mb-2">
                {match.score.fullTime.home ?? '-'} - {match.score.fullTime.away ?? '-'}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(match.utcDate).toLocaleDateString()}
              </div>
              <div className="text-sm font-semibold text-[var(--primary-600)]">
                {match.status}
              </div>
            </div>
            <div className="text-center flex-1">
              <img
                src={match.awayTeam.crest}
                alt={match.awayTeam.name}
                className="w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{match.awayTeam.name}</h2>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 