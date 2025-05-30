export interface Team {
  id: number;
  name: string;
  logo: string;
  score?: number;
  stats?: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
  };
}

export interface Competition {
  id: number;
  name: string;
  logo: string;
}

export interface Match {
  id: number;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' | 'CANCELLED';
  time?: string;
  competition: Competition;
  homeTeam: Team;
  awayTeam: Team;
}

export interface Author {
  name: string;
  avatar: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  commentCount: number;
  author: Author;
}

export interface MatchesResponse {
  matches: Match[];
}

export interface NewsResponse {
  articles: NewsArticle[];
} 