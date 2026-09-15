import React from 'react';
import {
  FiArrowRight,
  FiBookmark,
  FiBriefcase,
  FiCpu,
  FiActivity,
  FiShield,
  FiUsers,
  FiMapPin,
  FiSearch
} from 'react-icons/fi';
import { getArticlesByCategory, BUSINESS_DIRECTORY } from '../data/articles.js';

export default function CategorySections({ navigate, savedSlugs, onToggleSave }) {
  const techArticles = getArticlesByCategory('Technology');
  const businessArticles = getArticlesByCategory('Business');
  const healthArticles = getArticlesByCategory('Healthcare');
  const legalArticles = getArticlesByCategory('Legal');
  const communityArticles = getArticlesByCategory('Community');

  return (
    <div className="w-full space-y-16 py-6 select-none">
      {/* =========================================================================
          SECTION 1: BUSINESS & ENTERPRISE (Commercial Capital, Procurement, Founders)
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b-2 border-[#171717] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#171717] text-white rounded-xs">
              <FiBriefcase className="text-sm" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Central Texas Commerce
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
                Business, Capital & Enterprise
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/blog?category=Business')}
            className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            All Business <FiArrowRight />
          </button>
        </div>

        {/* Financial / Economic Indicator Bar */}
        <div className="bg-[#171717] text-white p-3 rounded-xs mb-6 flex items-center justify-between overflow-x-auto text-[11px] font-mono whitespace-nowrap gap-6 no-scrollbar">
          <div className="flex items-center gap-1">
            <span className="text-[#888]">AUSTIN BLACK BIZ COUNT:</span>
            <span className="text-emerald-400 font-bold">1,840+ Active</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#888]">CITY M/WBE TARGET:</span>
            <span className="text-white font-bold">28.4% Awarded</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#888]">ANGEL / VC SYNDICATE:</span>
            <span className="text-emerald-400 font-bold">$42M Closed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#888]">AUSTIN JOB GROWTH:</span>
            <span className="text-emerald-400 font-bold">+3.2% YoY ↑</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businessArticles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="border border-[#E5E2DC] p-5 rounded-xs bg-[#F8F7F4] flex flex-col justify-between group hover:border-[#171717] transition-all"
            >
              <div>
                <div
                  className="relative h-48 overflow-hidden rounded-xs bg-[#E5E2DC] cursor-pointer mb-3"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#171717] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs">
                    {article.tags[0]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(article.slug);
                    }}
                    className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center shadow-xs transition-colors ${
                      savedSlugs.includes(article.slug)
                        ? 'bg-[#8B0000] text-white'
                        : 'bg-white/90 text-[#171717]'
                    }`}
                  >
                    <FiBookmark className="text-xs" />
                  </button>
                </div>

                <span className="text-[10px] text-[#6B6B6B] block mb-1">
                  {article.date} • {article.readTime}
                </span>

                <h3
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-base font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 leading-snug line-clamp-2"
                >
                  {article.title}
                </h3>

                <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed mb-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-[#171717]">
                  By {article.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  Read Dispatch <FiArrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURE CALLOUT: AUSTIN BLACK BUSINESS DIRECTORY SHOWCASE
         ========================================================================= */}
      <section className="bg-[#171717] text-white p-6 sm:p-8 rounded-xs shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B0000]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10 border-b border-[#333] pb-6 mb-6">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#FF4D4D] block mb-1">
              Central Texas Registry
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Austin Black Business Directory
            </h2>
            <p className="text-xs sm:text-sm text-[#D4D0C8] mt-1 max-w-2xl font-light">
              Discover, patronize, and partner with African American-owned enterprises across Travis, Williamson, and Hays counties.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/directory')}
              className="px-5 py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FiSearch /> Browse Full Directory
            </button>
          </div>
        </div>

        {/* 4 Featured Business Spotlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {BUSINESS_DIRECTORY.slice(0, 4).map((biz) => (
            <div
              key={biz.id}
              onClick={() => navigate('/directory')}
              className="bg-[#222] border border-[#333] hover:border-[#8B0000] p-4 rounded-xs transition-colors group cursor-pointer"
            >
              <div className="relative h-32 overflow-hidden rounded-xs mb-3">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#8B0000] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs">
                  {biz.category}
                </span>
              </div>
              <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#FF4D4D] transition-colors truncate">
                {biz.name}
              </h4>
              <p className="text-[11px] text-[#888] mb-2 truncate">
                Founder: {biz.owner}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-[#aaa]">
                <FiMapPin className="text-[#FF4D4D] shrink-0" />
                <span className="truncate">{biz.neighborhood}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TECHNOLOGY & SILICON HILLS
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b-2 border-[#171717] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#171717] text-white rounded-xs">
              <FiCpu className="text-sm" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Blacks In Tech
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
                Silicon Hills & Tech Innovation
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/blog?category=Technology')}
            className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            All Tech <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {techArticles[0] && (
            <div className="lg:col-span-7 flex flex-col justify-between group">
              <div
                className="relative h-64 sm:h-80 overflow-hidden rounded-xs bg-[#E5E2DC] cursor-pointer mb-4"
                onClick={() => navigate(`/blog/${techArticles[0].slug}`)}
              >
                <img
                  src={techArticles[0].imageUrl}
                  alt={techArticles[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#171717] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs">
                  Cover Story
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(techArticles[0].slug);
                  }}
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-xs transition-colors ${
                    savedSlugs.includes(techArticles[0].slug)
                      ? 'bg-[#8B0000] text-white'
                      : 'bg-white/90 text-[#171717]'
                  }`}
                >
                  <FiBookmark className="text-xs" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-2">
                  <span>{techArticles[0].date}</span>
                  <span>•</span>
                  <span>{techArticles[0].readTime}</span>
                </div>
                <h3
                  onClick={() => navigate(`/blog/${techArticles[0].slug}`)}
                  className="text-xl sm:text-2xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 leading-snug"
                >
                  {techArticles[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4">
                  {techArticles[0].excerpt}
                </p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E5E2DC]">
                  <span className="font-semibold text-[#171717]">
                    By {techArticles[0].author.name}
                  </span>
                  <button
                    onClick={() => navigate(`/blog/${techArticles[0].slug}`)}
                    className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Read Analysis <FiArrowRight className="text-xs" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="lg:col-span-5 flex flex-col divide-y divide-[#E5E2DC] justify-between">
            {techArticles.slice(1, 4).map((article) => (
              <div
                key={article.id}
                className="py-4 first:pt-0 last:pb-0 flex gap-4 group cursor-pointer"
                onClick={() => navigate(`/blog/${article.slug}`)}
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 object-cover rounded-xs border border-[#E5E2DC] shrink-0 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] uppercase font-bold tracking-wider mb-1">
                    <span className="text-[#8B0000]">{article.tags[0]}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors leading-snug line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-[#6B6B6B] line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: HEALTHCARE & MEDICINE
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b-2 border-[#171717] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#8B0000] text-white rounded-xs">
              <FiActivity className="text-sm" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Clinical Excellence & Equity
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
                Healthcare, Medicine & Community Wellness
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/blog?category=Healthcare')}
            className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            All Healthcare <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthArticles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="bg-[#F8F7F4] border border-[#E5E2DC] p-5 rounded-xs flex flex-col justify-between group hover:border-[#8B0000] transition-all"
            >
              <div>
                <div
                  className="relative h-44 overflow-hidden rounded-xs bg-[#E5E2DC] cursor-pointer mb-3"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#8B0000] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs">
                    {article.tags[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-[#6B6B6B] mb-1 font-medium">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-base font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 leading-snug line-clamp-2"
                >
                  {article.title}
                </h3>

                <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed mb-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-[#171717]">
                  {article.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  Read Profile <FiArrowRight />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: LEGAL, LEADERSHIP & POLICY
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b-2 border-[#171717] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#171717] text-white rounded-xs">
              <FiShield className="text-sm" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Jurisprudence & Governance
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
                Legal Counsel & Civil Leadership
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/blog?category=Legal')}
            className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            All Legal <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {legalArticles.slice(0, 2).map((article) => (
            <div
              key={article.id}
              className="border border-[#E5E2DC] p-5 sm:p-6 rounded-xs bg-[#F8F7F4] flex flex-col justify-between group hover:border-[#8B0000] transition-all"
            >
              <div>
                <div
                  className="relative h-60 overflow-hidden rounded-xs bg-[#E5E2DC] cursor-pointer mb-4"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs">
                    {article.tags[0]}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#6B6B6B] mb-2 font-medium">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 leading-snug"
                >
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {article.pullQuote && (
                  <blockquote className="border-l-2 border-[#8B0000] pl-3 py-1 my-3 text-xs italic font-serif text-[#171717] bg-white/60">
                    "{article.pullQuote}"
                  </blockquote>
                )}
              </div>

              <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#171717]">
                  By {article.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer"
                >
                  Read Feature <FiArrowRight className="text-xs" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMMUNITY & AFRICAN AMERICAN HERITAGE
         ========================================================================= */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b-2 border-[#171717] pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-[#8B0000] text-white rounded-xs">
              <FiUsers className="text-sm" />
            </span>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Heritage & Community
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
                East Austin Legacy, Culture & Civil Empowerment
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/blog?category=Community')}
            className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 uppercase tracking-wider cursor-pointer"
          >
            All Community <FiArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityArticles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs overflow-hidden group flex flex-col justify-between hover:border-[#8B0000] transition-all"
            >
              <div>
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
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider rounded-xs">
                    {article.tags[0] || 'Community'}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B] block mb-1">
                    {article.date} • {article.readTime}
                  </span>
                  <h3
                    onClick={() => navigate(`/blog/${article.slug}`)}
                    className="text-base font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors cursor-pointer mb-2 leading-snug line-clamp-2"
                  >
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#6B6B6B] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4 pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
                <span className="text-[#6B6B6B] text-[11px]">
                  By {article.author.name}
                </span>
                <span
                  onClick={() => navigate(`/blog/${article.slug}`)}
                  className="text-[#8B0000] font-bold flex items-center gap-1 cursor-pointer"
                >
                  Read Story <FiArrowRight className="text-[10px]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
