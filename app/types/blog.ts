export interface Author {
  id: number;
  name: string;
  avatar: string;
  role: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  topics: string[];
  date: string;
  commentCount: number;
  author: Author;
  featured?: boolean;
}

export interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

export interface BlogFilters {
  category?: string;
  topic?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
} 