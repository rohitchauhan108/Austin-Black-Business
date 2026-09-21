'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiX, FiArrowRight, FiClock, FiTag } from 'react-icons/fi';
import { ARTICLES } from '../data/articles.js';
import { useSearch } from './SearchContext.jsx';

export default function SearchModal() {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { isSearchOpen, toggleSearch, closeSearch } = useSearch();
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K and ESC)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch, closeSearch]);

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ''
    ? ARTICLES.slice(0, 6)
    : ARTICLES.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      });

  const handleSelect = (slug) => {
    navigate(`/blog/${slug}`);
    closeSearch();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[#F8F7F4] border border-[#E5E2DC] shadow-2xl rounded-xs overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E5E2DC] bg-white gap-3">
          <FiSearch className="text-lg text-[#8B0000] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across 30 ABBJ stories, directory, honorees..."
            className="w-full bg-transparent text-sm sm:text-base text-[#171717] focus:outline-none placeholder-[#999]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#6B6B6B] hover:text-[#171717] px-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-[#6B6B6B] hover:text-[#8B0000] text-lg rounded-xs cursor-pointer"
            aria-label="Close search"
          >
            <FiX />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold px-2">
            <span>{query ? `Search Results (${filtered.length})` : 'Recent & Popular Inquiries'}</span>
            <span className="text-[10px]">ESC to close</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#6B6B6B]">
              <p className="text-base font-serif text-[#171717] mb-1">No articles found matching "{query}"</p>
              <p className="text-xs">Try searching for "Silicon Hills", "Doctors", "Lawyers", "Anita Roberts", or "HBCU".</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E2DC] border border-[#E5E2DC] bg-white rounded-xs">
              {filtered.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleSelect(article.slug)}
                  className="p-3.5 hover:bg-[#FFF5F5] cursor-pointer transition-colors flex items-center gap-3.5 group"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 object-cover rounded-xs shrink-0 border border-[#E5E2DC]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B0000]">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-[#6B6B6B] flex items-center gap-1">
                        <FiClock className="text-[10px]" /> {article.readTime}
                      </span>
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors truncate">
                      {article.title}
                    </h4>
                    <p className="text-xs text-[#6B6B6B] truncate">
                      {article.excerpt}
                    </p>
                  </div>
                  <FiArrowRight className="text-sm text-[#D4D0C8] group-hover:text-[#8B0000] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Quick Category Tags */}
          <div className="pt-2 px-1">
            <div className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold mb-2 flex items-center gap-1">
              <FiTag /> Explore Categories
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Business', 'Technology', 'Finance', 'Leadership', 'Community'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    navigate(`/blog?category=${cat}`);
                    closeSearch();
                  }}
                  className="text-xs px-2.5 py-1 bg-white border border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000] text-[#171717] rounded-xs font-medium cursor-pointer transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
