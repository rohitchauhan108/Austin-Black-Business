'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiMapPin,
  FiPhone,
  FiSearch,
  FiPlusCircle,
  FiCheck,
  FiFilter,
  FiExternalLink
} from 'react-icons/fi';
import { BUSINESS_DIRECTORY, DIRECTORY_CATEGORIES } from '../data/articles.js';

export default function DirectoryView() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form states
  const [bizName, setBizName] = useState('');
  const [bizOwner, setBizOwner] = useState('');
  const [bizCategory, setBizCategory] = useState('Dining & Culinary');
  const [bizNeighborhood, setBizNeighborhood] = useState('');
  const [bizPhone, setBizPhone] = useState('');
  const [bizDescription, setBizDescription] = useState('');

  // Filter businesses
  const filteredBusinesses = useMemo(() => {
    return BUSINESS_DIRECTORY.filter((biz) => {
      const matchCat =
        selectedCategory === 'All' || biz.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !q ||
        biz.name.toLowerCase().includes(q) ||
        biz.owner.toLowerCase().includes(q) ||
        biz.neighborhood.toLowerCase().includes(q) ||
        biz.description.toLowerCase().includes(q) ||
        biz.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubmitBusiness = (e) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsSubmitModalOpen(false);
      setBizName('');
      setBizOwner('');
      setBizNeighborhood('');
      setBizPhone('');
      setBizDescription('');
    }, 2500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* Directory Masthead Banner */}
      <div className="border-b-2 border-[#8B0000] pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#8B0000]">
            Central Texas Black Enterprise Registry
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] mt-1">
            Austin Black Business Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1.5 max-w-2xl">
            Promoting, elevating, and circulating capital within African American-owned enterprises across Austin, Pflugerville, Round Rock, and Central Texas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <FiPlusCircle className="text-sm" /> Add Your Business
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white border border-[#E5E2DC] p-4 sm:p-5 rounded-xs shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {DIRECTORY_CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'bg-[#F8F7F4] text-[#171717] border border-[#E5E2DC] hover:border-[#8B0000]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, neighborhood, or service..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs placeholder-[#888]"
            />
            <FiSearch className="absolute left-3 top-3 text-xs text-[#6B6B6B]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-[#6B6B6B] hover:text-[#171717]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Business Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((biz) => (
          <div
            key={biz.id}
            className="bg-white border border-[#E5E2DC] rounded-xs overflow-hidden shadow-xs hover:border-[#8B0000] transition-all group flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="relative h-48 overflow-hidden bg-[#E5E2DC]">
                <img
                  src={biz.imageUrl}
                  alt={biz.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest rounded-xs shadow-xs">
                  {biz.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h3 className="text-xl font-serif font-bold text-[#171717] group-hover:text-[#8B0000] transition-colors mb-1">
                  {biz.name}
                </h3>
                <p className="text-xs text-[#8B0000] font-bold mb-2">
                  Founder: {biz.owner}
                </p>

                <p className="text-sm text-[#444] leading-relaxed mb-4 line-clamp-3">
                  {biz.description}
                </p>

                <div className="space-y-2 text-xs text-[#171717] pt-3 border-t border-[#E5E2DC]">
                  <div className="flex items-start gap-2">
                    <FiMapPin className="text-[#8B0000] mt-0.5 shrink-0 text-xs" />
                    <span className="text-xs text-[#333]">{biz.address}</span>
                  </div>
                  {biz.phone ? (
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-[#8B0000] shrink-0 text-xs" />
                      <span className="text-xs font-mono text-[#333]">{biz.phone}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Tags & Action */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {biz.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-[#F8F7F4] text-[#6B6B6B] px-2 py-0.5 rounded-xs border border-[#E5E2DC]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {biz.articleUrl ? (
                <button
                  onClick={() => navigate(biz.articleUrl)}
                  className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Read article <FiExternalLink className="text-[10px]" />
                </button>
              ) : (
                <a
                  href={`tel:${biz.phone.replace(/[^0-9]/g, '')}`}
                  className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1"
                >
                  Connect <FiExternalLink className="text-[10px]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Directory Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white border border-[#171717] rounded-xs max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-4 right-4 text-sm text-[#6B6B6B] hover:text-[#171717]"
            >
              ✕
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B0000] block mb-1">
              Community Registry
            </span>
            <h3 className="text-xl font-serif font-bold text-[#171717] mb-2">
              Submit Your Black-Owned Business
            </h3>
            <p className="text-xs text-[#6B6B6B] mb-5">
              Join hundreds of enterprises listed in the Austin Black Business Journal official digital directory.
            </p>

            {submittedSuccess ? (
              <div className="p-6 bg-[#FFF5F5] border border-[#8B0000]/30 text-[#8B0000] text-center rounded-xs">
                <FiCheck className="text-2xl text-[#8B0000] mx-auto mb-2" />
                <h4 className="font-serif font-bold text-base mb-1">Listing Submitted!</h4>
                <p className="text-xs">
                  Thank you. Our editorial team will verify your business details and publish your listing within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBusiness} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      placeholder="e.g. Austin Creative Labs"
                      className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                      Owner / Founder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bizOwner}
                      onChange={(e) => setBizOwner(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                      Category *
                    </label>
                    <select
                      value={bizCategory}
                      onChange={(e) => setBizCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs cursor-pointer"
                    >
                      {DIRECTORY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bizPhone}
                      onChange={(e) => setBizPhone(e.target.value)}
                      placeholder="(512) 555-0199"
                      className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                    Neighborhood / Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={bizNeighborhood}
                    onChange={(e) => setBizNeighborhood(e.target.value)}
                    placeholder="e.g. 1100 E 11th St, East Austin, TX 78702"
                    className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#171717] block mb-1">
                    Brief Business Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={bizDescription}
                    onChange={(e) => setBizDescription(e.target.value)}
                    placeholder="Describe your services, products, and specialties..."
                    className="w-full px-3 py-2 text-xs bg-[#F8F7F4] border border-[#E5E2DC] focus:border-[#8B0000] focus:outline-none rounded-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E5E2DC]">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#6B6B6B] hover:text-[#171717] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Submit Listing
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
