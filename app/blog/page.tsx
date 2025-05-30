'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogCard } from '../components/BlogCard';
import Navigation from '../components/Navigation';
import { fetchBlogPosts } from '../utils/blog';
import type { BlogPost } from '../types/blog';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Champions League', 'Premier League', 'La Liga', 'Transfers', 'Analysis'];

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const filters = selectedCategory === 'All' ? {} : { category: selectedCategory };
      const response = await fetchBlogPosts(filters);
      setPosts(response.posts);
      setLoading(false);
    }

    loadPosts();
  }, [selectedCategory]);

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-grow">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Football Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest football news, analysis, and insights from our expert writers.
            </p>
          </div>
          <Link
            href="/blog/admin"
            className="flex items-center px-4 py-2 bg-[var(--primary-600)] text-white rounded-lg hover:bg-[var(--primary-700)] transition-colors"
          >
            <PencilIcon className="w-5 h-5 mr-2" />
            Write Post
          </Link>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedCategory === category 
                  ? 'bg-[var(--primary-600)] text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-[var(--primary-600)] hover:text-white'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-600)]"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <BlogCard {...post} />
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">
                  No blog posts found in this category.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
} 