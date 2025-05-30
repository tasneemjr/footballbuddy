import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CalendarIcon, ChatBubbleLeftIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { BlogPost } from '../types/blog';

type BlogCardProps = Pick<BlogPost, 'title' | 'excerpt' | 'image' | 'category' | 'date' | 'commentCount' | 'author'>;

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  image,
  category,
  date,
  commentCount,
  author,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card cursor-pointer overflow-hidden group h-full"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-2 py-1 bg-[var(--accent-600)] text-white text-xs font-semibold rounded">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-[var(--primary-600)]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
              <span>{commentCount}</span>
            </div>
          </div>
          <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 group-hover:text-[var(--primary-600)]" />
        </div>

        {/* Author */}
        <div className="mt-4 pt-4 border-t flex items-center">
          <Image
            src={author.avatar}
            alt={author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="ml-2 text-sm font-medium text-gray-900">
            {author.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}; 