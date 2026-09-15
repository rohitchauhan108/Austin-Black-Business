import React from 'react';
import { FiClock, FiBookmark, FiArrowRight } from 'react-icons/fi';
import { ARTICLES } from '../data/articles.js';

export default function FeaturedGrid({ navigate, savedSlugs, onToggleSave }) {
  // 4 Featured stories: articles index 3, 4, 5, 6
  const featured = ARTICLES.slice(3, 7);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
      {/* Section Title Header */}
      <div className="flex items-center justify-between border-b border-[#171717] pb-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-[#8B0000]"></span>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#171717]">
            Featured Stories & Essential Reading
          </h2>
        </div>
        <button
          onClick={() => navigate('/blog')}
          className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer"
        >
          View All Stories <FiArrowRight />
        </button>
      </div>

      {/* 4-Column Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((article) => {
          const isSaved = savedSlugs.includes(article.slug);
          return (
            <article
              key={article.id}
              className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zoom */}
                <div
                  className="relative w-full h-48 overflow-hidden bg-[#E5E2DC] cursor-pointer"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
                      {article.category}
                    </span>
                  </div>
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(article.slug);
                    }}
                    aria-label="Save story"
                    className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                      isSaved
                        ? 'bg-[#8B0000] text-white'
                        : 'bg-white/90 text-[#171717] hover:bg-white'
                    }`}
                  >
                    <FiBookmark className="text-xs" />
                  </button>
                </div>

                {/* Content Block */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mb-2 font-medium">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-[10px]" /> {article.readTime}
                    </span>
                  </div>

                  <h3
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="text-lg font-serif font-bold text-[#171717] leading-snug group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 line-clamp-2"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover border border-[#E5E2DC]"
                  />
                  <span className="text-[#171717] font-semibold text-[11px] truncate max-w-[110px]">
                    {article.author.name}
                  </span>
                </div>
                <span
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  Read <FiArrowRight className="text-[10px]" />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
