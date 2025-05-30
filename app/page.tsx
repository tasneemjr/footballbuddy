'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from './components/Navigation';
import MatchCard from './components/MatchCard';
import MatchFilters from './components/MatchFilters';
import LoadingSpinner from './components/LoadingSpinner';
import { ChartBarIcon, NewspaperIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { fetchMatches } from './utils/api';

interface Match {
  id: number;
  competition: {
    id: number;
    name: string;
    emblem: string;
  };
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner: string | null;
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
  status: string;
  utcDate: string;
  group?: string;
  stage?: string;
}

export default function Home() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Function to fetch matches
  const loadMatches = async () => {
    try {
      setIsLoading(true);
      const matchesData = await fetchMatches();
      if (matchesData) {
        setMatches(matchesData.matches || []);
      }
    } catch (err) {
      setError('Failed to load matches. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadMatches();
  }, []);

  // Real-time updates for live matches
  useEffect(() => {
    if (matches.some(match => match.status === 'IN_PLAY')) {
      const interval = setInterval(loadMatches, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [matches]);

  // Filter matches
  const filteredMatches = matches.filter(match => {
    const matchesCompetition = !selectedCompetition || match.competition.name === selectedCompetition;
    const matchesStatus = !selectedStatus || match.status === selectedStatus;
    return matchesCompetition && matchesStatus;
  });

  // Group matches by competition
  const matchesByCompetition = filteredMatches.reduce((acc, match) => {
    const compName = match.competition.name;
    if (!acc[compName]) {
      acc[compName] = [];
    }
    acc[compName].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  // Get unique competition names
  const competitions = Array.from(new Set(matches.map(match => match.competition.name)));

  // Handle match click
  const handleMatchClick = (matchId: number) => {
    router.push(`/matches/${matchId}`);
  };

  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-[var(--primary-900)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              Your Ultimate Football Companion
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Stay updated with live scores, latest news, in-depth analysis, and more from the world of football.
            </p>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-32">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card bg-white/95 backdrop-blur p-6">
              <ChartBarIcon className="w-12 h-12 text-[var(--primary-600)]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Live Scores</h3>
              <p className="mt-2 text-gray-600">
                Real-time match updates and scores from games around the world.
              </p>
            </div>
            <div className="card bg-white/95 backdrop-blur p-6">
              <NewspaperIcon className="w-12 h-12 text-[var(--primary-600)]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Competitions</h3>
              <p className="mt-2 text-gray-600">
                Follow major leagues, cups, and international tournaments.
              </p>
            </div>
            <div className="card bg-white/95 backdrop-blur p-6">
              <TrophyIcon className="w-12 h-12 text-[var(--primary-600)]" />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Match Details</h3>
              <p className="mt-2 text-gray-600">
                Comprehensive match information including lineups and statistics.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Matches Section */}
      <section className="bg-gray-50 pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <MatchFilters
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            selectedStatus={selectedStatus}
            onCompetitionChange={setSelectedCompetition}
            onStatusChange={setSelectedStatus}
          />
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-8">
              {Object.entries(matchesByCompetition).map(([competitionName, competitionMatches]) => (
                <div key={competitionName}>
                  <h2 className="text-2xl font-bold mb-4">{competitionName}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {competitionMatches.map((match) => (
                      <div
                        key={match.id}
                        onClick={() => handleMatchClick(match.id)}
                        className="cursor-pointer"
                      >
                        <MatchCard {...match} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(matchesByCompetition).length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No matches found for the selected filters.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
} 