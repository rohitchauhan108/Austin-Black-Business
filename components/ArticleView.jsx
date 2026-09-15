'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiClock,
  FiShare2,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiVolume2,
  FiVolumeX,
  FiThumbsUp,
  FiMessageSquare,
  FiType,
  FiCompass,
  FiUser
} from 'react-icons/fi';
import {
  FaXTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp
} from 'react-icons/fa6';
import {
  getArticleBySlug,
  getRelatedArticles,
  ARTICLES
} from '../data/articles.js';

export default function ArticleView({ slug }) {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const article = getArticleBySlug(slug) || ARTICLES[0];
  const related = getRelatedArticles(article.slug, 3);

  // Find previous and next articles in the database
  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  // Local states
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // 'small', 'medium', 'large'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Hendrik Van Der Bilt',
      role: 'Architect & Urbanist, Rotterdam',
      date: 'Yesterday at 4:15 PM',
      content: 'The observation about acoustic thresholds vs open plan resonates deeply with what we are seeing across European residential projects. People no longer want an echo chamber; they want psychological demarcation.',
      likes: 18
    },
    {
      id: 2,
      author: 'Astrid Lindholm',
      role: 'Design Director, Stockholm',
      date: '2 days ago',
      content: 'The shift to tactile materials (stoneware, oiled oak, lime plaster) is an inevitable rebellion against the slick plastic and glass monoculture of the last 15 years.',
      likes: 24
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: newCommentName.trim(),
      role: newCommentRole.trim() || 'Reader',
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1
    };

    setComments([newEntry, ...comments]);
    setNewCommentName('');
    setNewCommentRole('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  const handleLikeComment = (commentId) => {
    setComments(
      comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Font size classes
  const fontClasses = {
    small: 'text-sm sm:text-base leading-relaxed',
    medium: 'text-base sm:text-lg leading-relaxed sm:leading-8',
    large: 'text-lg sm:text-xl leading-relaxed sm:leading-9'
  }[fontSize];

  return (
    <article className="w-full relative">
      {/* Dynamic Reading Progress Bar in signature Blood Red */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#E5E2DC] z-50">
        <div
          className="h-full bg-[#8B0000] transition-all duration-150 shadow-xs"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6 select-none">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#8B0000] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(`/blog?category=${article.category}`)}
            className="hover:text-[#8B0000] transition-colors font-medium text-[#8B0000]"
          >
            {article.category}
          </button>
          <span>/</span>
          <span className="truncate max-w-[200px] sm:max-w-xs text-[#171717] font-medium">
            {article.title}
          </span>
        </nav>

        {/* Category Pill & Special Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#8B0000] text-white text-[11px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
            {article.category}
          </span>
          <span className="text-xs text-[#6B6B6B] font-mono">
            DISPATCH #{article.id.replace('art-', '')}
          </span>
        </div>

        {/* Huge Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#171717] leading-[1.12] mb-4">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#6B6B6B] font-serif leading-relaxed mb-6 italic">
          {article.subtitle}
        </p>

        {/* Author, Date, Read Time Bar */}
        <div className="py-4 border-y border-[#E5E2DC] flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#8B0000]"
            />
            <div>
              <h4 className="text-sm font-bold text-[#171717]">
                {article.author.name}
              </h4>
              <p className="text-xs text-[#6B6B6B]">
                {article.author.role} • {article.date}
              </p>
            </div>
          </div>

          {/* Action & Utility Icons */}
          <div className="flex items-center gap-3">
            {/* Audio Listen Simulation */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xs border transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-[#8B0000] text-white border-[#8B0000]'
                  : 'bg-white text-[#171717] border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000]'
              }`}
            >
              {isPlayingAudio ? <FiVolumeX /> : <FiVolume2 className="text-[#8B0000]" />}
              <span>{isPlayingAudio ? 'Pause Audio' : `Listen (${article.readTime})`}</span>
            </button>

            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center border border-[#E5E2DC] bg-white rounded-xs p-0.5 text-xs">
              <button
                onClick={() => setFontSize('small')}
                className={`px-2 py-1 rounded-xs font-serif ${
                  fontSize === 'small' ? 'bg-[#8B0000] text-white font-bold' : 'text-[#6B6B6B]'
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2 py-1 rounded-xs font-serif ${
                  fontSize === 'medium' ? 'bg-[#8B0000] text-white font-bold' : 'text-[#6B6B6B]'
                }`}
                title="Medium text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-xs font-serif ${
                  fontSize === 'large' ? 'bg-[#8B0000] text-white font-bold' : 'text-[#6B6B6B]'
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Share / Copy link button */}
            <button
              onClick={handleCopyLink}
              className="relative p-2 bg-white border border-[#E5E2DC] hover:border-[#8B0000] text-[#171717] rounded-xs transition-colors cursor-pointer"
              title="Copy Story Link"
            >
              <FiShare2 />
              {copiedLink && (
                <span className="absolute -top-8 right-0 bg-[#8B0000] text-white text-[10px] py-1 px-2 rounded-xs whitespace-nowrap shadow-md">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Audio Player Active Banner */}
        {isPlayingAudio && (
          <div className="bg-[#8B0000] text-white p-4 rounded-xs mb-8 flex items-center justify-between gap-4 animate-in fade-in shadow-md">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
              <div>
                <p className="text-xs font-bold font-serif">Now Playing: Audio Essay Edition</p>
                <p className="text-[11px] text-white/80">Narrated by Made Media Group Newsroom • High-fidelity audio</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span>01:42 / 07:15</span>
              <button
                onClick={() => setIsPlayingAudio(false)}
                className="text-white/80 hover:text-white underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Large Hero Image */}
        <div className="mb-8 rounded-xs overflow-hidden border border-[#E5E2DC] bg-[#E5E2DC] shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[560px] object-cover"
          />
          <div className="p-3 bg-white border-t border-[#E5E2DC] text-xs text-[#6B6B6B] flex items-center justify-between">
            <span className="font-serif italic">{article.imageCaption}</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#999]">
              Photo © Unsplash
            </span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="bg-[#FFF8F8] border-l-4 border-[#8B0000] border-y border-r border-[#E5E2DC] p-5 sm:p-6 mb-8 rounded-xs shadow-xs">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B0000] mb-3 flex items-center gap-2">
              <FiCheck className="text-sm font-bold" /> Executive Summary & Key Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#171717] leading-relaxed">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#8B0000] font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Article Body Typography */}
        <div className={`prose max-w-none text-[#171717] font-serif space-y-6 ${fontClasses}`}>
          {/* Paragraph 1 with Drop Cap */}
          <p className="drop-cap leading-relaxed">
            {article.paragraphs[0]}
          </p>

          {/* Paragraph 2 */}
          {article.paragraphs[1] && (
            <p className="leading-relaxed">
              {article.paragraphs[1]}
            </p>
          )}

          {/* Editorial Pullquote */}
          <div className="my-10 py-6 px-6 sm:px-8 border-y-2 border-[#8B0000] bg-[#FFF8F8] text-center">
            <span className="text-3xl text-[#8B0000] font-serif font-bold leading-none block mb-2">
              “
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#171717] leading-snug mb-3">
              {article.pullQuote}
            </blockquote>
            <cite className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8B0000] not-italic block">
              — {article.pullQuoteAuthor}
            </cite>
          </div>

          {/* Paragraph 3 */}
          {article.paragraphs[2] && (
            <p className="leading-relaxed">
              {article.paragraphs[2]}
            </p>
          )}

          {/* Secondary Photo Breakout */}
          <div className="my-8 border border-[#E5E2DC] bg-white rounded-xs overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-72 sm:h-96 object-cover filter contrast-[1.03]"
            />
            <p className="p-3 text-xs text-[#6B6B6B] font-serif italic text-center bg-[#F8F7F4] border-t border-[#E5E2DC]">
              Sensory observation and environmental context play an essential role in contemporary discernment.
            </p>
          </div>

          {/* Paragraph 4 & 5 */}
          {article.paragraphs.slice(3).map((para, i) => (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Tags Section */}
        <div className="mt-10 pt-6 border-t border-[#E5E2DC] flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-[#6B6B6B] mr-2">
            Archived Topics:
          </span>
          {article.tags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate(`/blog?search=${encodeURIComponent(tag)}`)}
              className="text-xs px-3 py-1 bg-white border border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000] text-[#171717] rounded-xs font-medium transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Social Share Footer Bar */}
        <div className="my-8 p-4 bg-white border border-[#E5E2DC] rounded-xs flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
            Share This Investigation
          </span>
          <div className="flex items-center space-x-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#F8F7F4] hover:bg-[#8B0000] hover:text-white border border-[#E5E2DC] rounded-xs transition-colors text-xs"
              aria-label="Share on X"
            >
              <FaXTwitter />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#F8F7F4] hover:bg-[#0077b5] hover:text-white border border-[#E5E2DC] rounded-xs transition-colors text-xs"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-[#F8F7F4] hover:bg-[#8B0000] hover:text-white border border-[#E5E2DC] rounded-xs transition-colors text-xs"
              aria-label="Share on Facebook"
            >
              <FaFacebookF />
            </a>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-[#F8F7F4] hover:bg-[#8B0000] hover:text-white border border-[#E5E2DC] rounded-xs transition-colors text-xs font-medium cursor-pointer"
            >
              {copiedLink ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="my-10 p-6 sm:p-8 bg-white border border-[#E5E2DC] rounded-xs shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#8B0000] shrink-0"
          />
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block mb-1">
              Author Spotlight
            </span>
            <h4 className="text-xl font-serif font-bold text-[#171717]">
              {article.author.name}
            </h4>
            <p className="text-xs text-[#6B6B6B] mb-2 font-medium">
              {article.author.role}
            </p>
            <p className="text-xs text-[#171717] leading-relaxed mb-4">
              {article.author.bio}
            </p>
            <button
              onClick={() => navigate(`/blog?search=${encodeURIComponent(article.author.name)}`)}
              className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
            >
              View all dispatches by {article.author.name} <FiArrowRight />
            </button>
          </div>
        </div>

        {/* Previous & Next Article Cards */}
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <div
              onClick={() => navigate(`/blog/${prevArticle.slug}`)}
              className="p-5 bg-white border border-[#E5E2DC] rounded-xs hover:border-[#8B0000] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B] mb-2">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Previous Story
              </div>
              <h5 className="text-sm sm:text-base font-serif font-bold text-[#171717] group-hover:text-[#8B0000] line-clamp-2">
                {prevArticle.title}
              </h5>
              <span className="text-[11px] text-[#6B6B6B] mt-2 block">
                {prevArticle.category} • {prevArticle.readTime}
              </span>
            </div>
          ) : <div />}

          {nextArticle ? (
            <div
              onClick={() => navigate(`/blog/${nextArticle.slug}`)}
              className="p-5 bg-white border border-[#E5E2DC] rounded-xs hover:border-[#8B0000] transition-all cursor-pointer group flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-2 text-[10px] uppercase tracking-wider font-bold text-[#6B6B6B] mb-2">
                Next Story <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
              <h5 className="text-sm sm:text-base font-serif font-bold text-[#171717] group-hover:text-[#8B0000] line-clamp-2">
                {nextArticle.title}
              </h5>
              <span className="text-[11px] text-[#6B6B6B] mt-2 block">
                {nextArticle.category} • {nextArticle.readTime}
              </span>
            </div>
          ) : <div />}
        </div>

        {/* Reader Discussion / Comments Section */}
        <section className="my-12 pt-8 border-t border-[#E5E2DC]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-[#171717] flex items-center gap-2">
              <FiMessageSquare className="text-[#8B0000]" /> Reader Perspectives ({comments.length})
            </h3>
            <span className="text-xs text-[#6B6B6B]">Moderated by Editorial Team</span>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleAddComment} className="bg-white border border-[#E5E2DC] p-5 sm:p-6 rounded-xs shadow-xs mb-8">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#171717] mb-3">
              Contribute to the Discussion
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                required
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="Your Full Name *"
                className="px-3.5 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
              />
              <input
                type="text"
                value={newCommentRole}
                onChange={(e) => setNewCommentRole(e.target.value)}
                placeholder="Professional Affiliation / City (optional)"
                className="px-3.5 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
              />
            </div>
            <textarea
              required
              rows={3}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Share your perspective on this essay..."
              className="w-full px-3.5 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs mb-3"
            />
            <div className="flex items-center justify-between">
              {commentSubmitted ? (
                <span className="text-xs text-[#8B0000] font-medium">
                  Thank you! Your perspective has been posted.
                </span>
              ) : <span className="text-[11px] text-[#888]">Comments adhere to journalistic standards.</span>}
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Submit Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="bg-white border border-[#E5E2DC] p-5 rounded-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="text-xs font-bold text-[#171717]">{comm.author}</h5>
                    <p className="text-[10px] text-[#6B6B6B]">{comm.role} • {comm.date}</p>
                  </div>
                  <button
                    onClick={() => handleLikeComment(comm.id)}
                    className="flex items-center gap-1.5 text-xs text-[#6B6B6B] hover:text-[#8B0000] bg-[#F8F7F4] px-2.5 py-1 rounded-xs border border-[#E5E2DC] transition-colors"
                  >
                    <FiThumbsUp className="text-[11px]" /> {comm.likes}
                  </button>
                </div>
                <p className="text-xs text-[#171717] leading-relaxed font-sans">{comm.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Stories Grid (3 cards from same category) */}
        <section className="mt-16 pt-10 border-t-2 border-[#8B0000]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8B0000] block">
                Related Reading
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#171717]">
                More from {article.category}
              </h3>
            </div>
            <button
              onClick={() => navigate(`/blog?category=${article.category}`)}
              className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 uppercase tracking-wider cursor-pointer"
            >
              Browse Category <FiArrowRight />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/blog/${rel.slug}`)}
                className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden group hover:border-[#8B0000] transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-[#E5E2DC]">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#8B0000] text-white text-[9px] font-bold uppercase tracking-wider rounded-xs">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] text-[#6B6B6B] block mb-1">
                      {rel.date} • {rel.readTime}
                    </span>
                    <h5 className="text-sm font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors leading-snug line-clamp-2">
                      {rel.title}
                    </h5>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-[#E5E2DC] text-[11px] text-[#8B0000] font-bold flex items-center justify-between">
                  <span>By {rel.author.name}</span>
                  <FiArrowRight />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
