import React from 'react';

interface MatchFiltersProps {
  competitions: string[];
  selectedCompetition: string;
  selectedStatus: string;
  onCompetitionChange: (competition: string) => void;
  onStatusChange: (status: string) => void;
}

export default function MatchFilters({
  competitions,
  selectedCompetition,
  selectedStatus,
  onCompetitionChange,
  onStatusChange,
}: MatchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="competition" className="block text-sm font-medium text-gray-700 mb-1">
            Competition
          </label>
          <select
            id="competition"
            value={selectedCompetition}
            onChange={(e) => onCompetitionChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Competitions</option>
            {competitions.map((competition) => (
              <option key={competition} value={competition}>
                {competition}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Match Status
          </label>
          <select
            id="status"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="">All Matches</option>
            <option value="LIVE">Live Matches</option>
            <option value="FINISHED">Finished</option>
            <option value="SCHEDULED">Upcoming</option>
          </select>
        </div>
      </div>
    </div>
  );
} 