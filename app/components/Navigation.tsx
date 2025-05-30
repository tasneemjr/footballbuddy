'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChartBarIcon, NewspaperIcon, TrophyIcon, UserGroupIcon, 
  MagnifyingGlassIcon, ChevronDownIcon, CalculatorIcon,
  ChatBubbleLeftIcon, BookOpenIcon, ChartPieIcon,
  PencilIcon, TagIcon, FireIcon
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    matches: {
      title: 'Matches & Scores',
      sections: [
        {
          title: 'Live & Upcoming',
          links: [
            { name: 'Live Scores', href: '/matches/live', icon: ChartBarIcon },
            { name: 'Today\'s Matches', href: '/matches/today' },
            { name: 'Tomorrow\'s Matches', href: '/matches/tomorrow' },
            { name: 'Match Calendar', href: '/matches/calendar' },
          ]
        },
        {
          title: 'Top Competitions',
          links: [
            { name: 'Premier League', href: '/competitions/premier-league' },
            { name: 'La Liga', href: '/competitions/la-liga' },
            { name: 'Champions League', href: '/competitions/champions-league' },
            { name: 'World Cup', href: '/competitions/world-cup' },
          ]
        },
        {
          title: 'Match Center',
          links: [
            { name: 'Match Statistics', href: '/matches/stats' },
            { name: 'Head to Head', href: '/matches/h2h' },
            { name: 'Line-ups', href: '/matches/lineups' },
            { name: 'Commentary', href: '/matches/commentary' },
          ]
        }
      ]
    },
    blog: {
      title: 'Blog',
      sections: [
        {
          title: 'Categories',
          links: [
            { name: 'Latest Posts', href: '/blog', icon: FireIcon },
            { name: 'Match Analysis', href: '/blog?category=analysis' },
            { name: 'Transfer News', href: '/blog?category=transfers' },
            { name: 'Opinion', href: '/blog?category=opinion' },
          ]
        },
        {
          title: 'Featured Content',
          links: [
            { name: 'Editor\'s Picks', href: '/blog?featured=true', icon: PencilIcon },
            { name: 'Tactical Analysis', href: '/blog?category=tactics' },
            { name: 'Player Spotlights', href: '/blog?category=players' },
            { name: 'Behind the Scenes', href: '/blog?category=behind-scenes' },
          ]
        },
        {
          title: 'Topics',
          links: [
            { name: 'Champions League', href: '/blog?topic=champions-league', icon: TagIcon },
            { name: 'Premier League', href: '/blog?topic=premier-league' },
            { name: 'International', href: '/blog?topic=international' },
            { name: 'Youth Football', href: '/blog?topic=youth' },
          ]
        }
      ]
    },
    stats: {
      title: 'Statistics & Analysis',
      sections: [
        {
          title: 'Performance Stats',
          links: [
            { name: 'Player Stats', href: '/stats/players', icon: ChartPieIcon },
            { name: 'Team Stats', href: '/stats/teams' },
            { name: 'League Stats', href: '/stats/leagues' },
            { name: 'Historical Data', href: '/stats/historical' },
          ]
        },
        {
          title: 'Advanced Analytics',
          links: [
            { name: 'Expected Goals (xG)', href: '/stats/xg' },
            { name: 'Player Heat Maps', href: '/stats/heatmaps' },
            { name: 'Pass Networks', href: '/stats/pass-networks' },
            { name: 'Performance Analysis', href: '/stats/analysis' },
          ]
        },
        {
          title: 'Fantasy Tools',
          links: [
            { name: 'Fantasy Calculator', href: '/fantasy/calculator', icon: CalculatorIcon },
            { name: 'Player Comparison', href: '/fantasy/compare' },
            { name: 'Team Builder', href: '/fantasy/team-builder' },
            { name: 'Price Changes', href: '/fantasy/prices' },
          ]
        }
      ]
    },
    community: {
      title: 'Community',
      sections: [
        {
          title: 'Discussions',
          links: [
            { name: 'Fan Forum', href: '/community/forum', icon: ChatBubbleLeftIcon },
            { name: 'Match Threads', href: '/community/match-threads' },
            { name: 'Transfer Talk', href: '/community/transfers' },
            { name: 'Tactics Discussion', href: '/community/tactics' },
          ]
        },
        {
          title: 'Content',
          links: [
            { name: 'Fan Articles', href: '/community/articles' },
            { name: 'Match Reviews', href: '/community/reviews' },
            { name: 'Predictions', href: '/community/predictions' },
            { name: 'Fan Media', href: '/community/media' },
          ]
        },
        {
          title: 'Learning',
          links: [
            { name: 'Coaching Corner', href: '/community/coaching', icon: BookOpenIcon },
            { name: 'Tactical Analysis', href: '/community/tactics-analysis' },
            { name: 'Rules & Regulations', href: '/community/rules' },
            { name: 'History & Culture', href: '/community/history' },
          ]
        }
      ]
    }
  };

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png"
                  alt="FootballBuddy Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display text-2xl font-bold text-[#1a237e]">
                FootballBuddy
              </span>
            </Link>

            <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
              {Object.entries(menuItems).map(([key, item]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="nav-link">
                    {item.title}
                    <ChevronDownIcon className="ml-1 w-4 h-4" />
                  </button>
                  
                  {activeMenu === key && (
                    <div className="absolute top-full left-0 w-screen max-w-7xl bg-white shadow-lg rounded-b-xl">
                      <div className="grid grid-cols-3 gap-8 p-8">
                        {item.sections.map((section, idx) => (
                          <div key={idx}>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                              {section.title}
                            </h3>
                            <ul className="space-y-4">
                              {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                  <Link
                                    href={link.href}
                                    className="group flex items-center text-sm text-gray-600 hover:text-[var(--primary-600)]"
                                  >
                                    {link.icon && (
                                      <link.icon className="w-5 h-5 mr-2 text-gray-400 group-hover:text-[var(--primary-600)]" />
                                    )}
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 hover:text-[var(--primary-600)] rounded-full hover:bg-gray-100"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg p-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 ml-3" />
                    <input
                      type="text"
                      placeholder="Search matches, teams, players..."
                      className="w-full px-4 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Quick Links</h4>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link href="/matches/live" className="text-sm text-gray-600 hover:text-[var(--primary-600)]">
                        Live Matches
                      </Link>
                      <Link href="/stats/top-scorers" className="text-sm text-gray-600 hover:text-[var(--primary-600)]">
                        Top Scorers
                      </Link>
                      <Link href="/transfers" className="text-sm text-gray-600 hover:text-[var(--primary-600)]">
                        Transfer News
                      </Link>
                      <Link href="/fantasy" className="text-sm text-gray-600 hover:text-[var(--primary-600)]">
                        Fantasy Football
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button className="btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {Object.entries(menuItems).map(([key, item]) => (
            <button
              key={key}
              className="nav-link-mobile w-full text-left"
              onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 