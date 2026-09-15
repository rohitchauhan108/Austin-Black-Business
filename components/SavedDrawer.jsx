import React from 'react';
import { FiX, FiTrash2, FiBookmark, FiArrowRight, FiClock } from 'react-icons/fi';
import { ARTICLES } from '../data/articles.js';

export default function SavedDrawer({ isOpen, onClose, savedSlugs, onRemoveSaved, navigate }) {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter((a) => savedSlugs.includes(a.slug));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F7F4] border-l border-[#E5E2DC] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E5E2DC] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiBookmark className="text-[#8B0000] text-lg" />
              <div>
                <h3 className="text-base font-serif font-bold text-[#171717]">Reading List</h3>
                <p className="text-xs text-[#6B6B6B]">
                  {savedArticles.length} {savedArticles.length === 1 ? 'story' : 'stories'} saved for later
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#6B6B6B] hover:text-[#8B0000] rounded-xs cursor-pointer"
              aria-label="Close saved drawer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* List of saved articles */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#E5E2DC]/50 flex items-center justify-center text-[#6B6B6B]">
                  <FiBookmark className="text-xl" />
                </div>
                <h4 className="text-base font-serif font-bold text-[#171717] mb-1">Your reading list is empty</h4>
                <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto mb-6 leading-relaxed">
                  Click the bookmark icon on any article card or story header to save it for offline reading.
                </p>
                <button
                  onClick={() => { navigate('/blog'); onClose(); }}
                  className="px-4 py-2 bg-[#8B0000] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#6E0000] transition-colors cursor-pointer"
                >
                  Explore Articles
                </button>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-xs hover:border-[#8B0000] transition-all group relative flex flex-col justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 object-cover rounded-xs border border-[#E5E2DC] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 text-[10px] uppercase font-bold tracking-wider text-[#8B0000]">
                        <span>{article.category}</span>
                        <span className="text-[#6B6B6B] lowercase font-normal flex items-center gap-1">
                          <FiClock /> {article.readTime}
                        </span>
                      </div>
                      <h4
                        onClick={() => { navigate(`/blog/${article.slug}`); onClose(); }}
                        className="text-sm font-serif font-bold text-[#171717] line-clamp-2 hover:text-[#8B0000] cursor-pointer"
                      >
                        {article.title}
                      </h4>
                      <p className="text-[11px] text-[#6B6B6B] line-clamp-1 mt-1">
                        By {article.author.name}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#E5E2DC] flex items-center justify-between">
                    <button
                      onClick={() => onRemoveSaved(article.slug)}
                      className="text-xs text-[#6B6B6B] hover:text-[#8B0000] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <FiTrash2 className="text-xs" /> Remove
                    </button>
                    <button
                      onClick={() => { navigate(`/blog/${article.slug}`); onClose(); }}
                      className="text-xs font-bold text-[#171717] hover:text-[#8B0000] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Read Now <FiArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {savedArticles.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E5E2DC] flex justify-between items-center text-xs text-[#6B6B6B]">
              <span>Saved locally in your browser</span>
              <button
                onClick={() => {
                  savedArticles.forEach(a => onRemoveSaved(a.slug));
                }}
                className="text-[#8B0000] hover:underline font-medium cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
