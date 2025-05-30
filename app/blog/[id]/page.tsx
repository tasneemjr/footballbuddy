import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navigation from '../../components/Navigation';

// This would typically come from your API or CMS based on the ID
const sampleBlog = {
  id: 1,
  title: "Champions League Final Preview: The Road to Glory",
  content: `
    <p class="mb-4">
      The UEFA Champions League final is the pinnacle of club football, where legends are made and history is written. This year's final promises to be an epic encounter between two of Europe's footballing giants.
    </p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">The Road to the Final</h2>
    
    <p class="mb-4">
      Both teams have shown incredible resilience and skill throughout their Champions League campaign. From group stage battles to dramatic knockout rounds, their journey to the final has been nothing short of remarkable.
    </p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Key Players to Watch</h2>
    
    <p class="mb-4">
      The final will showcase some of the world's best talents. Keep an eye on these key players who could make the difference on the big night.
    </p>
    
    <ul class="list-disc list-inside mb-4 ml-4">
      <li class="mb-2">Player 1 - The prolific striker with 12 goals in the competition</li>
      <li class="mb-2">Player 2 - The midfield maestro pulling the strings</li>
      <li class="mb-2">Player 3 - The rock-solid defender with crucial experience</li>
    </ul>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Tactical Analysis</h2>
    
    <p class="mb-4">
      The tactical battle between the managers will be fascinating. Both teams have shown tactical flexibility throughout the tournament, but they might need to adapt their approaches for this final showdown.
    </p>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Prediction</h2>
    
    <p class="mb-4">
      Given the form of both teams and their head-to-head record, this final could go either way. However, the team that handles the pressure better and takes their chances will likely lift the trophy.
    </p>
  `,
  image: "/images/blog/champions-league.jpg",
  category: "Champions League",
  date: "2024-02-20",
  author: {
    name: "John Smith",
    avatar: "/images/avatars/john-smith.jpg",
    role: "Football Analyst"
  }
};

export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <>
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-gray-600 hover:text-[var(--primary-600)] mb-8"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Hero Image */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          <Image
            src={sampleBlog.image}
            alt={sampleBlog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="px-2 py-1 bg-[var(--accent-600)] text-white text-sm font-semibold rounded mb-4 inline-block">
              {sampleBlog.category}
            </span>
            <h1 className="text-4xl font-bold mt-2">
              {sampleBlog.title}
            </h1>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-6 mb-8 text-gray-600">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            <span>{sampleBlog.date}</span>
          </div>
          <div className="flex items-center">
            <UserCircleIcon className="w-5 h-5 mr-2" />
            <span>{sampleBlog.author.name}</span>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 flex items-center">
          <Image
            src={sampleBlog.author.avatar}
            alt={sampleBlog.author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="ml-4">
            <h3 className="font-bold text-gray-900">{sampleBlog.author.name}</h3>
            <p className="text-gray-600">{sampleBlog.author.role}</p>
          </div>
        </div>

        {/* Content */}
        <article 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: sampleBlog.content }}
        />

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a91da]">
              Twitter
            </button>
            <button className="px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899]">
              Facebook
            </button>
            <button className="px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006396]">
              LinkedIn
            </button>
          </div>
        </div>
      </main>
    </>
  );
} 