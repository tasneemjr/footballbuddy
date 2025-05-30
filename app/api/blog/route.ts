import { NextResponse } from 'next/server';
import type { BlogPost, BlogResponse } from '../../types/blog';

// This would typically come from a database
const sampleBlogs: BlogPost[] = [
  {
    id: 1,
    title: "Champions League Final Preview: The Road to Glory",
    excerpt: "An in-depth analysis of both teams' journey to the final and what to expect in the biggest match of the year.",
    content: `
      <p>The UEFA Champions League final is the pinnacle of club football, where legends are made and history is written. This year's final promises to be an epic encounter between two of Europe's footballing giants.</p>
      
      <h2>The Road to the Final</h2>
      <p>Both teams have shown incredible resilience and skill throughout their Champions League campaign. From group stage battles to dramatic knockout rounds, their journey to the final has been nothing short of remarkable.</p>
      
      <h2>Key Players to Watch</h2>
      <p>The final will showcase some of the world's best talents. Keep an eye on these key players who could make the difference on the big night.</p>
    `,
    image: "/images/blog/champions-league.jpg",
    category: "Champions League",
    topics: ["Champions League", "Analysis"],
    date: "2024-02-20",
    commentCount: 24,
    author: {
      id: 1,
      name: "John Smith",
      avatar: "/images/avatars/john-smith.jpg",
      role: "Football Analyst"
    },
    featured: true
  },
  {
    id: 2,
    title: "Premier League Transfer Window: Top 10 Potential Moves",
    excerpt: "Exploring the most exciting potential transfers that could reshape the Premier League landscape.",
    content: `
      <p>The summer transfer window is approaching, and Premier League clubs are already planning their moves. Here are the top 10 potential transfers that could happen this summer.</p>
      
      <h2>1. Star Striker on the Move</h2>
      <p>After an incredible season, the prolific forward is attracting interest from several top clubs.</p>
      
      <h2>2. Midfield Maestro Available</h2>
      <p>The creative midfielder has expressed his desire for a new challenge, putting Premier League clubs on alert.</p>
    `,
    image: "/images/blog/transfers.jpg",
    category: "Transfers",
    topics: ["Premier League", "Transfers"],
    date: "2024-02-18",
    commentCount: 18,
    author: {
      id: 2,
      name: "Sarah Johnson",
      avatar: "/images/avatars/sarah-johnson.jpg",
      role: "Transfer News Specialist"
    }
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const topic = searchParams.get('topic');
  const featured = searchParams.get('featured');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  let filteredBlogs = [...sampleBlogs];

  // Apply filters
  if (category) {
    filteredBlogs = filteredBlogs.filter(blog => blog.category.toLowerCase() === category.toLowerCase());
  }

  if (topic) {
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.topics.some(t => t.toLowerCase() === topic.toLowerCase())
    );
  }

  if (featured === 'true') {
    filteredBlogs = filteredBlogs.filter(blog => blog.featured);
  }

  // Calculate pagination
  const total = filteredBlogs.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBlogs = filteredBlogs.slice(start, end);

  const response: BlogResponse = {
    posts: paginatedBlogs,
    total,
    page,
    pageSize
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  // This would typically validate the request and save to a database
  return new NextResponse('Method not implemented', { status: 501 });
} 