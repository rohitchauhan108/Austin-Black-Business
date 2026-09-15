import React from 'react';
import { FiClock, FiBookmark, FiArrowRight } from 'react-icons/fi';
import { ARTICLES } from '../data/articles.js';

export default function HeroSection({ navigate, savedSlugs, onToggleSave }) {
  const mainHero = ARTICLES[0]; // The Future of Technology Is Becoming More Human
  const rightTop = ARTICLES[1]; // Inside the New Era of Modern Travel
  const rightBottom = ARTICLES[2]; // How Modern Homes Are Changing the Way We Live

  const isMainSaved = savedSlugs.includes(mainHero.slug);
  const isTopSaved = savedSlugs.includes(rightTop.slug);
  const isBottomSaved = savedSlugs.includes(rightBottom.slug);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-10">
      {/* Section Sub-bar */}
      <div className="flex items-center justify-between border-b border-[#171717] pb-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#8B0000]"></span>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#171717]">
            The Lead Stories & Top Picks
          </h2>
        </div>
        <span className="text-xs text-[#6B6B6B] font-serif italic hidden sm:inline">
          Curated by The Editorial Board
        </span>
      </div>

      {/* Grid: 1 large left (span 7 or 8 on desktop), 2 stacked right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Large Main Hero Story */}
        <div className="lg:col-span-7 flex flex-col bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group">
          {/* Main Image Container */}
          <div
            className="relative w-full h-72 sm:h-96 md:h-[420px] overflow-hidden bg-[#E5E2DC] cursor-pointer"
            onClick={() => navigate(`/blog/${mainHero.slug}`)}
          >
            <img
              src={mainHero.imageUrl}
              alt={mainHero.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Category tag badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-[#8B0000] text-white text-[11px] font-bold uppercase tracking-widest rounded-xs shadow-md">
                {mainHero.category}
              </span>
            </div>
            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(mainHero.slug);
              }}
              aria-label="Save story"
              className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md ${
                isMainSaved
                  ? 'bg-[#8B0000] text-white'
                  : 'bg-white/90 text-[#171717] hover:bg-white'
              }`}
            >
              <FiBookmark className="text-sm" />
            </button>
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
            {/* Caption banner on bottom of photo */}
            <div className="absolute bottom-3 left-4 right-4 text-white/90 text-[11px] font-serif italic truncate hidden sm:block">
              {mainHero.imageCaption}
            </div>
          </div>

          {/* Content Block */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mb-2 font-medium">
                <span>{mainHero.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FiClock className="text-xs" /> {mainHero.readTime}
                </span>
                <span>•</span>
                <span className="text-[#8B0000] uppercase tracking-wider font-semibold text-[10px]">
                  Special Report
                </span>
              </div>

              <h2
                onClick={() => navigate(`/blog/${mainHero.slug}`)}
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] leading-tight group-hover:text-[#8B0000] transition-colors cursor-pointer mb-3"
              >
                {mainHero.title}
              </h2>

              <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed mb-6 font-sans">
                {mainHero.excerpt}
              </p>
            </div>

            {/* Author Footer row */}
            <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={mainHero.author.avatar}
                  alt={mainHero.author.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#E5E2DC]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#171717]">
                    {mainHero.author.name}
                  </h4>
                  <p className="text-[11px] text-[#6B6B6B]">
                    {mainHero.author.role}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/blog/${mainHero.slug}`)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer"
              >
                Read Story <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Two Smaller Stories Stacked */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Top Story (Travel) */}
          <div className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group flex-1 flex flex-col sm:flex-row lg:flex-col">
            <div
              className="relative w-full sm:w-1/2 lg:w-full h-52 sm:h-auto lg:h-52 overflow-hidden bg-[#E5E2DC] cursor-pointer shrink-0"
              onClick={() => navigate(`/blog/${rightTop.slug}`)}
            >
              <img
                src={rightTop.imageUrl}
                alt={rightTop.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
                  {rightTop.category}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(rightTop.slug);
                }}
                aria-label="Save story"
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                  isTopSaved
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-white/90 text-[#171717] hover:bg-white'
                }`}
              >
                <FiBookmark className="text-xs" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mb-1.5">
                  <span>{rightTop.date}</span>
                  <span>•</span>
                  <span>{rightTop.readTime}</span>
                </div>
                <h3
                  onClick={() => navigate(`/blog/${rightTop.slug}`)}
                  className="text-lg sm:text-xl font-serif font-bold text-[#171717] leading-snug group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2"
                >
                  {rightTop.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                  {rightTop.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="text-[#171717] font-semibold text-[11px]">
                  By {rightTop.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${rightTop.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer"
                >
                  Read <FiArrowRight className="text-[10px]" />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Story (Lifestyle) */}
          <div className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group flex-1 flex flex-col sm:flex-row lg:flex-col">
            <div
              className="relative w-full sm:w-1/2 lg:w-full h-52 sm:h-auto lg:h-52 overflow-hidden bg-[#E5E2DC] cursor-pointer shrink-0"
              onClick={() => navigate(`/blog/${rightBottom.slug}`)}
            >
              <img
                src={rightBottom.imageUrl}
                alt={rightBottom.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
                  {rightBottom.category}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(rightBottom.slug);
                }}
                aria-label="Save story"
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                  isBottomSaved
                    ? 'bg-[#8B0000] text-white'
                    : 'bg-white/90 text-[#171717] hover:bg-white'
                }`}
              >
                <FiBookmark className="text-xs" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mb-1.5">
                  <span>{rightBottom.date}</span>
                  <span>•</span>
                  <span>{rightBottom.readTime}</span>
                </div>
                <h3
                  onClick={() => navigate(`/blog/${rightBottom.slug}`)}
                  className="text-lg sm:text-xl font-serif font-bold text-[#171717] leading-snug group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2"
                >
                  {rightBottom.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed">
                  {rightBottom.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="text-[#171717] font-semibold text-[11px]">
                  By {rightBottom.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${rightBottom.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer"
                >
                  Read <FiArrowRight className="text-[10px]" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
