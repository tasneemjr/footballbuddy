import type { BlogResponse, BlogFilters } from '../types/blog';

export async function fetchBlogPosts(filters: BlogFilters = {}): Promise<BlogResponse> {
  const params = new URLSearchParams();
  
  if (filters.category) {
    params.append('category', filters.category);
  }
  
  if (filters.topic) {
    params.append('topic', filters.topic);
  }
  
  if (filters.featured) {
    params.append('featured', 'true');
  }
  
  if (filters.page) {
    params.append('page', filters.page.toString());
  }
  
  if (filters.pageSize) {
    params.append('pageSize', filters.pageSize.toString());
  }

  try {
    const response = await fetch(`/api/blog?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return {
      posts: [],
      total: 0,
      page: 1,
      pageSize: 10
    };
  }
}

export async function fetchBlogPost(id: number) {
  try {
    const response = await fetch(`/api/blog/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog post');
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
} 