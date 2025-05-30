export async function fetchMatches() {
  try {
    const response = await fetch('/api/football/matches');
    if (!response.ok) throw new Error('Failed to fetch matches');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    return null;
  }
}

export async function fetchNews() {
  try {
    const response = await fetch('/api/football?endpoint=news');
    if (!response.ok) throw new Error('Failed to fetch news');
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

export async function fetchCompetitions() {
  try {
    const response = await fetch('/api/football/competitions');
    if (!response.ok) throw new Error('Failed to fetch competitions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    return null;
  }
}

// Helper function to format match date
export function formatMatchDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

// Helper function to format competition name
export function formatCompetitionName(name: string) {
  return name.replace('UEFA ', '').replace(' Competition', '');
} 