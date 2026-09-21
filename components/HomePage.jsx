'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiClock, FiMapPin, FiAward, FiCompass } from 'react-icons/fi';
import { ARTICLES, BUSINESS_DIRECTORY } from '../data/articles.js';

export default function HomePage() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // 1 Lead Cover Story
  const leadStory = ARTICLES[0];

  // 3 Top Featured Dispatches
  const topStories = ARTICLES.slice(1, 4);

  // Split remaining dispatches into thematic sections
  const enterpriseStories = ARTICLES.filter(
    (a) => a.category === 'Business' || a.category === 'Technology'
  ).slice(0, 3);

  const communityStories = ARTICLES.filter(
    (a) => a.category === 'Community' || a.category === 'Healthcare' || a.category === 'Legal'
  ).slice(0, 3);

  // 3 Featured Businesses for directory spotlight
  const spotlightBusinesses = BUSINESS_DIRECTORY.slice(0, 3);

  const quickThemes = [
    { label: 'Silicon Hills Tech', query: 'Technology' },
    // { label: 'Healthcare Pioneers', query: 'Healthcare' },
    { label: 'Capital & Investment', query: 'Business' },
    { label: 'Finance Counsel', query: 'Finance' },
    { label: 'East Austin Heritage', query: 'Community' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12 space-y-16">
      {/* =========================================================================
          EDITORIAL FOCUS PILLS (Better layout & quick topical navigation)
         ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-[#E5E2DC]">
        <span className="text-[11px] uppercase tracking-widest font-bold text-[#8B0000] shrink-0 mr-1 flex items-center gap-1">
          <FiCompass className="text-xs" /> Journal Focus:
        </span>
        {quickThemes.map((theme) => (
          <button
            key={theme.label}
            onClick={() => {
              if (theme.path) navigate(theme.path);
              else navigate(`/blog?category=${theme.query}`);
            }}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#171717] bg-white border border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000] hover:bg-[#FFF5F5] rounded-xs shrink-0 transition-colors cursor-pointer"
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* =========================================================================
          1. LEAD EDITORIAL STORY (High readability, elegant font hierarchy)
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Cover Photo */}
          <div
            className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] overflow-hidden bg-[#E5E2DC] cursor-pointer group"
            onClick={() => navigate(`/blog/${leadStory.slug}`)}
          >
            <img
              src={leadStory.imageUrl}
              alt={leadStory.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-md">
              Cover Story • {leadStory.category}
            </span>
          </div>

          {/* Editorial Content with Generous Typography */}
          <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs font-medium text-[#555] mb-3">
                <span className="text-[#171717] font-semibold">{leadStory.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <FiClock className="text-xs text-[#8B0000]" /> {leadStory.readTime}
                </span>
              </div>

              <h2
                onClick={() => navigate(`/blog/${leadStory.slug}`)}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#171717] hover:text-[#8B0000] transition-colors cursor-pointer leading-[1.2] mb-5"
              >
                {leadStory.title}
              </h2>

              <p className="text-base sm:text-lg text-[#333333] leading-relaxed mb-6 font-normal">
                {leadStory.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5E2DC] flex justify-center">
              <button
                onClick={() => navigate(`/blog/${leadStory.slug}`)}
                className="px-7 py-3 bg-[#8B0000] hover:bg-[#6E0000] text-white text-sm font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
              >
                Read Story <FiArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CURATED EDITORIAL PICKS (Clear 3-column cards with readable copy)
         ========================================================================= */}
      <section>
        <div className="border-b-2 border-[#8B0000] pb-3 mb-8 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#8B0000] block">
              Editorial Dispatches
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
              Essential Reading
            </h3>
          </div>
          <button
            onClick={() => navigate('/blog')}
            className="text-xs sm:text-sm font-bold text-[#8B0000] hover:text-[#5C0000] flex items-center gap-1.5 uppercase tracking-wider cursor-pointer"
          >
            All Stories <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topStories.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all flex flex-col justify-between group"
            >
              <div>
                <div
                  className="relative h-56 overflow-hidden bg-[#E5E2DC] cursor-pointer"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#8B0000] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-xs">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs text-[#666] mb-2.5 font-medium flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="text-xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer leading-snug mb-3"
                  >
                    {article.title}
                  </h4>
                  <p className="text-sm text-[#444] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-5 pt-3 border-t border-[#E5E2DC] flex justify-center">
                <button
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="px-5 py-2 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs sm:text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
                >
                  Read Story <FiArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PUBLISHER'S EDITORIAL NOTE (Thought leadership & human context)
         ========================================================================= */}
      <section className="bg-[#FFF8F8] border-l-4 border-[#8B0000] border-y border-r border-[#E5E2DC] p-6 sm:p-10 rounded-xs shadow-xs">
        <div className="max-w-4xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8B0000] block mb-2">
            Publisher's Mission
          </span>
          <blockquote className="text-xl sm:text-2xl font-serif font-bold text-[#171717] leading-snug mb-4">
            “To document African American enterprise in Central Texas is to celebrate resilience, innovation, and community leadership across generations.”
          </blockquote>
          <div className="flex items-center gap-3 text-sm text-[#555]">
            <span className="font-bold text-[#171717]">Anita C. Roberts</span>
            <span>•</span>
            <span>Publisher & Editor-in-Chief, Austin Black Business Journal</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. AUSTIN BLACK BUSINESS DIRECTORY SPOTLIGHT (Structured, clear directory)
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-10 rounded-xs shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#8B0000] pb-5 mb-8 gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block mb-1.5 flex items-center gap-1.5">
              <FiAward /> Community Commerce
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              Austin Black Business Directory Spotlight
            </h3>
            <p className="text-sm sm:text-base text-[#555] mt-1.5 max-w-2xl leading-relaxed">
              Discover and patronize Black-owned enterprises across Travis, Williamson, and Hays counties.
            </p>
          </div>

          <button
            onClick={() => navigate('/directory')}
            className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            Explore Full Directory <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlightBusinesses.map((biz) => (
            <div
              key={biz.id}
              onClick={() => navigate('/directory')}
              className="border border-[#E5E2DC] hover:border-[#8B0000] rounded-xs overflow-hidden p-5 bg-[#F8F7F4] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden rounded-xs mb-4 bg-[#E5E2DC]">
                  <img
                    src={biz.imageUrl}
                    alt={biz.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs shadow-xs">
                    {biz.category}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-lg text-[#171717] group-hover:text-[#8B0000] transition-colors mb-1">
                  {biz.name}
                </h4>
                <p className="text-xs text-[#555] mb-2 font-medium">Founder: {biz.owner}</p>
                <p className="text-xs text-[#666] leading-relaxed line-clamp-2 mb-3">
                  {biz.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#555] pt-3 border-t border-[#E5E2DC]">
                <span className="flex items-center gap-1">
                  <FiMapPin className="text-[#8B0000] shrink-0" />
                  <span className="font-medium text-[#171717]">{biz.neighborhood}</span>
                </span>
                <span className="text-[#8B0000] font-bold group-hover:underline">
                  View Profile →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. THEMATIC DISPATCHES: Enterprise vs. Community (Clear Layout & Hierarchy)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Column A: Enterprise & Technology */}
        <div className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="border-b-2 border-[#8B0000] pb-3 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B0000] block">
                Commerce & Innovation
              </span>
              <h3 className="text-xl font-serif font-bold text-[#171717]">
                Business & Silicon Hills
              </h3>
            </div>
            <button
              onClick={() => navigate('/blog?category=Business')}
              className="text-xs font-bold text-[#8B0000] hover:underline uppercase tracking-wider"
            >
              More →
            </button>
          </div>

          <div className="space-y-6 divide-y divide-[#E5E2DC]">
            {enterpriseStories.map((article, idx) => (
              <div
                key={article.id}
                onClick={() => navigate(`/blog/${article.slug}`)}
                className={`flex gap-4 group cursor-pointer ${idx > 0 ? 'pt-6' : ''}`}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xs border border-[#E5E2DC] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#8B0000] block mb-1">
                    {article.category} • {article.readTime}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors leading-snug mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#555] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column B: Community, Healthcare & Legal */}
        <div className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="border-b-2 border-[#8B0000] pb-3 mb-6 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B0000] block">
                Advocacy & Health
              </span>
              <h3 className="text-xl font-serif font-bold text-[#171717]">
                Community & Leadership
              </h3>
            </div>
            <button
              onClick={() => navigate('/blog?category=Community')}
              className="text-xs font-bold text-[#8B0000] hover:underline uppercase tracking-wider"
            >
              More →
            </button>
          </div>

          <div className="space-y-6 divide-y divide-[#E5E2DC]">
            {communityStories.map((article, idx) => (
              <div
                key={article.id}
                onClick={() => navigate(`/blog/${article.slug}`)}
                className={`flex gap-4 group cursor-pointer ${idx > 0 ? 'pt-6' : ''}`}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xs border border-[#E5E2DC] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#8B0000] block mb-1">
                    {article.category} • {article.readTime}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors leading-snug mb-1 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#555] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
