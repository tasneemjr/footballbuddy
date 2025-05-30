import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Score {
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
}

interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

interface MatchProps {
  competition: {
    name: string;
    emblem: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
  status: string;
  utcDate: string;
  group?: string;
  stage?: string;
}

const MatchCard: React.FC<MatchProps> = ({
  competition,
  homeTeam,
  awayTeam,
  score,
  status,
  utcDate,
  group,
  stage
}) => {
  // Format match time
  const formatMatchTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  };

  // Get match status display
  const getStatusDisplay = () => {
    switch (status) {
      case 'SCHEDULED':
      case 'TIMED':
        return formatMatchTime(utcDate);
      case 'IN_PLAY':
        return 'LIVE';
      case 'PAUSED':
        return 'HT';
      case 'FINISHED':
        return 'FT';
      default:
        return status;
    }
  };

  const isLive = status === 'IN_PLAY' || status === 'PAUSED';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {/* Competition Header */}
      <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <div className="relative w-5 h-5">
            <Image
              src={competition.emblem}
              alt={competition.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-gray-600">{competition.name}</span>
          {group && (
            <span className="text-xs text-gray-500">• {group}</span>
          )}
        </div>
        <div className="flex items-center">
          {isLive ? (
            <span className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
              <span className="text-sm font-semibold text-red-500">LIVE</span>
            </span>
          ) : (
            <span className="text-sm text-gray-500">{getStatusDisplay()}</span>
          )}
        </div>
      </div>

      {/* Teams & Score */}
      <div className="p-4">
        {/* Home Team */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative w-8 h-8">
              <Image
                src={homeTeam.crest}
                alt={homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-gray-900">{homeTeam.shortName}</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {score.fullTime.home ?? '-'}
          </span>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative w-8 h-8">
              <Image
                src={awayTeam.crest}
                alt={awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-gray-900">{awayTeam.shortName}</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {score.fullTime.away ?? '-'}
          </span>
        </div>

        {/* Stage Info */}
        {stage && stage !== 'REGULAR_SEASON' && (
          <div className="mt-4 pt-3 border-t text-xs text-gray-500 text-center">
            {stage.replace(/_/g, ' ')}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MatchCard; 