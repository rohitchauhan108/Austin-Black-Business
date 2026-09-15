import React, { useState } from 'react';
import {
  FiMail,
  FiTrendingUp,
  FiArrowRight,
  FiCheck,
  FiTag,
  FiFolder,
  FiFeather,
  FiHeadphones,
  FiAward
} from 'react-icons/fi';
import { ARTICLES, CATEGORIES } from '../data/articles.js';

export default function EditorialSidebar({ navigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [podcastPlaying, setPodcastPlaying] = useState(false);

  // Dynamic Popular Stories (sorted by views)
  const popularStories = [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5);

  // Trending Topics for Austin Black Business
  const trendingTopics = [
    'SiliconHillsTech',
    'TopBlackDoctors',
    'MostInfluentialLawyers',
    'AchievementsGala',
    'EastAustinCommerce',
    'MadeMediaGroup',
    'BlackAustinHeritage',
    'HBCUInnovation'
  ];

  // Category counts
  const categoryCounts = CATEGORIES.filter((c) => c !== 'All').reduce((acc, cat) => {
    acc[cat] = ARTICLES.filter((a) => a.category.toLowerCase() === cat.toLowerCase()).length;
    return acc;
  }, {});

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <aside className="w-full space-y-8 select-none">
      {/* 1. About the Publisher & Editor-in-Chief Box */}
      <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-xs hover:border-[#8B0000] transition-colors">
        <div className="flex items-center gap-2 border-b border-[#E5E2DC] pb-3 mb-4">
          <FiFeather className="text-[#8B0000]" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#171717]">
            About The Publisher
          </h3>
        </div>

        <div className="flex items-start gap-4 mb-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Anita C. Roberts"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#8B0000] shrink-0"
          />
          <div>
            <h4 className="text-base font-serif font-bold text-[#171717]">
              Anita C. Roberts
            </h4>
            <p className="text-xs text-[#8B0000] font-medium">
              Publisher & Editor-in-Chief
            </p>
            <p className="text-[11px] text-[#6B6B6B] mt-1">
              Executive Director, Made Media Group
            </p>
          </div>
        </div>

        <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4 italic font-serif">
          "Retired Army Lieutenant Colonel and author of 'Achievements in Black Austin.' Dedicated to informing, empowering, and transforming African American communities through media, technology, and economic enterprise."
        </p>

        <div className="pt-3 border-t border-[#E5E2DC] flex items-center justify-between text-xs">
          <span className="text-[11px] font-medium text-[#171717]">
            Black Austin® Founder
          </span>
          <button
            onClick={() => navigate('/blog?search=Anita%20C.%20Roberts')}
            className="text-[#8B0000] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
          >
            Read Dispatches <FiArrowRight className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* 2. Signature Honors & Awards Callout */}
      <div className="bg-[#FAF7F2] border-l-4 border-l-[#8B0000] border border-[#E5E2DC] p-5 rounded-xs">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#8B0000] mb-1">
          <FiAward className="text-sm" /> Signature Program
        </div>
        <h4 className="text-base font-serif font-bold text-[#171717] mb-1">
          Achievements in Black Austin
        </h4>
        <p className="text-xs text-[#6B6B6B] leading-relaxed mb-3">
          Annual honors celebrating Central Texas Doctor of the Year, Most Influential Lawyers, Blacks in Tech, and Diversity Champions.
        </p>
        <button
          onClick={() => navigate('/blog?search=Achievements')}
          className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
        >
          View 2026 Honorees <FiArrowRight className="text-xs" />
        </button>
      </div>

      {/* 3. Newsletter: Stay Ahead of the Story */}
      <div className="bg-[#171717] text-[#F8F7F4] p-6 rounded-xs shadow-md relative overflow-hidden border-t-4 border-[#8B0000]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B0000]/20 rounded-full blur-2xl pointer-events-none"></div>

        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#FF4D4D] block mb-1">
          Community Dispatch
        </span>
        <h3 className="text-xl font-serif font-bold text-white mb-2">
          Subscribe to The Journal
        </h3>
        <p className="text-xs text-[#D4D0C8] leading-relaxed mb-4 font-light">
          Receive exclusive reporting on Central Texas Black-owned businesses, healthcare milestones, and civic initiatives delivered weekly.
        </p>

        {subscribed ? (
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 p-3 rounded-xs text-xs flex items-center gap-2">
            <FiCheck className="text-base text-emerald-400 font-bold shrink-0" />
            <span>Thank you! Your subscription to the journal is active.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address..."
                className="w-full px-3.5 py-2.5 bg-[#262626] border border-[#3E3E3E] text-xs text-white placeholder-[#888] focus:border-[#8B0000] focus:outline-none rounded-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-widest transition-colors rounded-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FiMail /> Join Newsletter
            </button>
            <p className="text-[10px] text-[#888] text-center mt-1">
              A product of Made Media Group 501(c)(3). Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>

      {/* 4. Popular Stories (01 to 05) */}
      <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-[#8B0000]" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#171717]">
              Most Read Stories
            </h3>
          </div>
          <span className="text-[10px] text-[#6B6B6B] uppercase font-bold">This Month</span>
        </div>

        <div className="space-y-4">
          {popularStories.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => navigate(`/blog/${article.slug}`)}
              className="flex items-start gap-3.5 group cursor-pointer"
            >
              <span className="font-serif text-2xl font-bold text-[#D4D0C8] group-hover:text-[#8B0000] transition-colors shrink-0 w-8">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B0000] block mb-0.5">
                  {article.category}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <div className="text-[10px] text-[#6B6B6B] mt-1 flex items-center gap-2">
                  <span>{article.readTime}</span>
                  <span>•</span>
                  <span>{(article.views / 1000).toFixed(1)}k readers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Trending Topics */}
      <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E5E2DC] pb-3 mb-4">
          <FiTag className="text-[#8B0000]" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#171717]">
            Trending Topics
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => navigate(`/blog?search=${encodeURIComponent(topic)}`)}
              className="text-xs px-3 py-1.5 bg-[#F8F7F4] hover:bg-[#8B0000] hover:text-white border border-[#E5E2DC] hover:border-[#8B0000] text-[#171717] rounded-xs transition-all font-medium cursor-pointer"
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Categories with Real Article Counts */}
      <div className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-xs">
        <div className="flex items-center gap-2 border-b border-[#E5E2DC] pb-3 mb-4">
          <FiFolder className="text-[#8B0000]" />
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#171717]">
            Editorial Sections
          </h3>
        </div>
        <div className="divide-y divide-[#E5E2DC]">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => navigate(`/blog?category=${cat}`)}
              className="w-full py-2.5 flex items-center justify-between text-xs font-medium text-[#171717] hover:text-[#8B0000] transition-colors cursor-pointer group"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                {cat}
              </span>
              <span className="text-[11px] px-2 py-0.5 bg-[#F8F7F4] border border-[#E5E2DC] text-[#6B6B6B] rounded-xs font-mono group-hover:border-[#8B0000] group-hover:text-[#8B0000]">
                {count} {count === 1 ? 'dispatch' : 'dispatches'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Audio / Podcast Feature Snippet */}
      <div className="bg-[#F4F2EC] border border-[#E5E2DC] p-5 rounded-xs">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#8B0000] mb-2">
          <FiHeadphones /> Black Austin Podcast & Audio Labs
        </div>
        <h4 className="text-sm font-serif font-bold text-[#171717] mb-1">
          Episode 42: Capital, Contracts, and Cultural Heritage
        </h4>
        <p className="text-xs text-[#6B6B6B] leading-relaxed mb-3">
          Publisher Anita C. Roberts joins East Austin business leaders to explore municipal procurement and business longevity in Texas.
        </p>
        <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E5E2DC]">
          <span className="text-[#6B6B6B] font-mono text-[11px]">
            {podcastPlaying ? '▶ Playing (32 min)' : '32 min audio'}
          </span>
          <button
            onClick={() => setPodcastPlaying(!podcastPlaying)}
            className="font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
          >
            {podcastPlaying ? 'Pause Audio' : 'Listen Now'} <FiArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    </aside>
  );
}
