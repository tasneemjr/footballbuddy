'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '../../components/Navigation';
import { useSession } from 'next-auth/react';
import type { BlogPost } from '../../types/blog';

export default function BlogAdmin() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Champions League',
    topics: [] as string[],
    image: '',
    authorName: '',
    authorAvatar: '',
    authorRole: ''
  });

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role !== 'admin') {
      router.push('/blog');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <>
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-600)]"></div>
          </div>
        </main>
      </>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }

  const categories = ['Champions League', 'Premier League', 'La Liga', 'Transfers', 'Analysis'];
  const topicOptions = ['Champions League', 'Premier League', 'La Liga', 'Analysis', 'Transfers', 'International', 'Youth'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          topics: formData.topics,
          image: formData.image,
          author: {
            name: formData.authorName,
            avatar: formData.authorAvatar,
            role: formData.authorRole
          },
          date: new Date().toISOString().split('T')[0],
          commentCount: 0
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      router.push('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post. Please try again.');
    }
  };

  const handleTopicChange = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Blog Post</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              required
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
              value={formData.excerpt}
              onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content (HTML)
            </label>
            <textarea
              id="content"
              required
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)] font-mono text-sm"
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Topics */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {topicOptions.map(topic => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicChange(topic)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
                    ${formData.topics.includes(topic)
                      ? 'bg-[var(--primary-600)] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-[var(--primary-600)] hover:text-white'}`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
              value={formData.image}
              onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
            />
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
                Author Name
              </label>
              <input
                type="text"
                id="authorName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
                value={formData.authorName}
                onChange={e => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="authorRole" className="block text-sm font-medium text-gray-700">
                Author Role
              </label>
              <input
                type="text"
                id="authorRole"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
                value={formData.authorRole}
                onChange={e => setFormData(prev => ({ ...prev, authorRole: e.target.value }))}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="authorAvatar" className="block text-sm font-medium text-gray-700">
                Author Avatar URL
              </label>
              <input
                type="url"
                id="authorAvatar"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-600)] focus:ring-[var(--primary-600)]"
                value={formData.authorAvatar}
                onChange={e => setFormData(prev => ({ ...prev, authorAvatar: e.target.value }))}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors"
            >
              Create Post
            </button>
          </div>
        </form>
      </main>
    </>
  );
} 