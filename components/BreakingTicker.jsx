import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { ARTICLES } from '../data/articles.js';

export default function BreakingTicker({ navigate }) {
  const trendingArticles = ARTICLES.filter((a) => a.isTrending);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % trendingArticles.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [trendingArticles.length]);

  const current = trendingArticles[index] || trendingArticles[0];

  return (
    <div className="w-full bg-white border-b border-[#E5E2DC] py-2 px-4 sm:px-8 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs gap-4">
        {/* Left Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B0000] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0000]"></span>
          </span>
          <span className="font-bold uppercase tracking-[0.2em] text-[#8B0000] text-[11px]">
            Trending Dispatches:
          </span>
        </div>

        {/* Center Current Headline */}
        <div className="flex-1 truncate">
          <button
            onClick={() => navigate(`/blog/${current.slug}`)}
            className="text-[#171717] hover:text-[#8B0000] transition-colors truncate font-serif font-medium text-xs sm:text-sm text-left cursor-pointer"
          >
            <span className="text-[#6B6B6B] font-sans font-bold uppercase tracking-wider text-[10px] mr-2">
              [{current.category}]
            </span>
            {current.title} — {current.excerpt}
          </button>
        </div>

        {/* Right Arrow Controls */}
        <div className="flex items-center gap-1 shrink-0 text-[#6B6B6B]">
          <button
            onClick={() =>
              setIndex((prev) => (prev - 1 + trendingArticles.length) % trendingArticles.length)
            }
            className="p-1 hover:text-[#171717] rounded-xs"
            aria-label="Previous trending headline"
          >
            <FiChevronLeft />
          </button>
          <span className="text-[10px] font-mono">
            {index + 1}/{trendingArticles.length}
          </span>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % trendingArticles.length)}
            className="p-1 hover:text-[#171717] rounded-xs"
            aria-label="Next trending headline"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
