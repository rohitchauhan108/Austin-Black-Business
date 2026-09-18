'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FiSearch,
  FiFilter,
  FiClock,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiSliders
} from 'react-icons/fi';
import { ARTICLES, CATEGORIES } from '../data/articles.js';

export default function BlogPage({
  initialCategory = 'All',
  initialSearch = ''
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getInitialCategory = () => {
    const param = searchParams.get('category');
    if (param) return param;
    return initialCategory;
  };

  const getInitialSearch = () => {
    const param = searchParams.get('search');
    if (param) return param;
    return initialSearch;
  };

  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
  const [searchQuery, setSearchQuery] = useState(getInitialSearch());
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || initialCategory);
    setSearchQuery(searchParams.get('search') || initialSearch);
    setCurrentPage(1);
  }, [searchParams, initialCategory, initialSearch]);

  // Filter & Sort
  const filteredArticles = useMemo(() => {
    let list = [...ARTICLES];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(
        (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'latest') {
      // already sorted by editorial chronology
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'readTime') {
      list.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime));
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Featured banner article for blog page (first item or main hero)
  const featuredStory = filteredArticles[0] || ARTICLES[0];

  // Pagination calculations
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const displayedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Blog Masthead Banner */}
      <div className="border-b-2 border-[#8B0000] pb-6 mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#8B0000]">
            Editorial Archives & Curated Dispatches
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] mt-1">
            The Journal Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1.5 max-w-xl">
            Explore 30 in-depth investigations, essays, and dispatches across Technology, Travel, Living, Business, and Health.
          </p>
        </div>

        <div className="text-xs text-[#6B6B6B] font-mono bg-white border border-[#E5E2DC] px-4 py-2 rounded-xs self-center sm:self-auto shadow-xs">
          Showing <span className="text-[#8B0000] font-bold">{filteredArticles.length}</span> articles
        </div>
      </div>

      {/* Featured Story of the Archive (Only on Page 1 without active search) */}
      {currentPage === 1 && !searchQuery && featuredStory && (
        <div className="mb-12 bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div
              className="lg:col-span-7 h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#E5E2DC] cursor-pointer relative"
              onClick={() => navigate(`/blog/${featuredStory.slug}`)}
            >
              <img
                src={featuredStory.imageUrl}
                alt={featuredStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-md">
                Featured Dispatch
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2 font-medium">
                  <span className="text-[#8B0000] font-bold uppercase tracking-wider">
                    {featuredStory.category}
                  </span>
                  <span>•</span>
                  <span>{featuredStory.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-xs text-[#8B0000]" /> {featuredStory.readTime}
                  </span>
                </div>

                <h2
                  onClick={() => navigate(`/blog/${featuredStory.slug}`)}
                  className="text-2xl sm:text-3xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-3 leading-tight"
                >
                  {featuredStory.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4">
                  {featuredStory.excerpt}
                </p>

                <blockquote className="border-l-2 border-[#8B0000] pl-3 py-1 my-3 text-xs italic font-serif text-[#171717] bg-[#FFF8F8]">
                  "{featuredStory.pullQuote}"
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[#E5E2DC] flex justify-center">
                <button
                  onClick={() => navigate(`/blog/${featuredStory.slug}`)}
                  className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
                >
                  Read Story <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar Controls */}
      <div className="bg-white border border-[#E5E2DC] p-4 sm:p-5 rounded-xs shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'bg-[#F8F7F4] text-[#171717] border border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort By */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search archive..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs placeholder-[#888]"
              />
              <FiSearch className="absolute left-3 top-2.5 text-xs text-[#8B0000]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-[10px] text-[#6B6B6B] hover:text-[#171717]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort articles by"
                className="pl-3 pr-7 py-1.5 text-xs bg-[#F8F7F4] border border-[#E5E2DC] text-[#171717] rounded-xs font-medium focus:outline-none focus:border-[#8B0000] cursor-pointer"
              >
                <option value="latest">Latest First</option>
                <option value="popular">Most Popular</option>
                <option value="readTime">Longest Read</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Articles Grid */}
      {displayedArticles.length === 0 ? (
        <div className="bg-white border border-[#E5E2DC] p-12 text-center rounded-xs my-8">
          <p className="text-xl font-serif font-bold text-[#171717] mb-2">
            No articles found matching your criteria
          </p>
          <p className="text-xs text-[#6B6B6B] mb-4">
            Try adjusting your search terms or clearing category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs hover:bg-[#6E0000] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article) => {
            return (
              <article
                key={article.id}
                className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div
                    className="relative h-52 overflow-hidden bg-[#E5E2DC] cursor-pointer"
                    onClick={() => navigate(`/blog/${article.slug}`)}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mb-2 font-medium">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiClock className="text-[10px]" /> {article.readTime}
                      </span>
                    </div>

                    <h3
                      onClick={() => navigate(`/blog/${article.slug}`)}
                      className="text-xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2.5 leading-snug line-clamp-2"
                    >
                      {article.title}
                    </h3>

                    <p className="text-sm text-[#444] leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] bg-[#F8F7F4] text-[#6B6B6B] px-2 py-0.5 rounded-xs border border-[#E5E2DC]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#E5E2DC] flex justify-center">
                  <button
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="px-5 py-2 bg-[#8B0000] hover:bg-[#6E0000] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
                  >
                    Read Story <FiArrowRight className="text-[10px]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination Controls & Load More */}
      {totalPages > 1 && (
        <div className="mt-12 pt-8 border-t border-[#E5E2DC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6B6B6B]">
            Page <span className="font-bold text-[#8B0000]">{currentPage}</span> of{' '}
            <span className="font-bold text-[#171717]">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 border border-[#E5E2DC] bg-white rounded-xs text-[#171717] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#8B0000] transition-colors"
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 text-xs font-bold rounded-xs transition-colors cursor-pointer ${
                  page === currentPage
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'bg-white border border-[#E5E2DC] text-[#171717] hover:border-[#8B0000] hover:text-[#8B0000]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 border border-[#E5E2DC] bg-white rounded-xs text-[#171717] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#8B0000] transition-colors"
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
