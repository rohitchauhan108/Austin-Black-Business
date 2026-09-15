'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useSearch } from './SearchContext.jsx';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { openSearch } = useSearch();

  const todayString = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  const currentPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navCategories = [
    { label: 'Home', path: '/' },
    { label: 'Business', path: '/blog?category=Business' },
    { label: 'Technology', path: '/blog?category=Technology' },
    { label: 'Healthcare', path: '/blog?category=Healthcare' },
    { label: 'Legal', path: '/blog?category=Legal' },
    { label: 'Community', path: '/blog?category=Community' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header id="site-header" className="w-full bg-[#F8F7F4] border-b border-[#E5E2DC]">
      {/* Top Blood Red Editorial Dispatch Strip */}
      <div className="w-full bg-[#8B0000] text-white border-b border-[#6E0000]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-1.5 flex items-center justify-between text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-bold uppercase tracking-widest bg-[#5C0000] px-2 py-0.5 rounded-xs shrink-0">
              Official Journal
            </span>
            <span className="truncate hidden sm:inline text-white/90">
              Central Texas’s Premier African American Business Publication • Published by Made Media Group 501(c)(3)
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-white/90">
            <span>{todayString}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline uppercase font-bold text-white tracking-wider">Austin, TX</span>
          </div>
        </div>
      </div>

      {/* Editorial Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {/* Left: Quick Mission Stamp */}
          <div className="hidden md:block w-52 text-left">
            <span className="text-[11px] font-bold text-[#8B0000] tracking-wider uppercase block">
              Vol. XIV • Est. 2011
            </span>
            <span className="text-xs text-[#555] block mt-0.5 font-serif italic">
              Economic Equity & Leadership
            </span>
          </div>

          {/* Center: Brand Title */}
          <div
            className="text-center cursor-pointer flex-1 px-2"
            onClick={() => navigate('/')}
          >
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-masthead tracking-tight text-[#171717] uppercase hover:text-[#8B0000] transition-colors">
              AUSTIN BLACK BUSINESS
            </h1>
            <div className="flex items-center justify-center gap-3 mt-1.5">
              <span className="h-[1px] w-8 sm:w-16 bg-[#8B0000] hidden xs:block"></span>
              <p className="text-xs sm:text-sm font-serif font-bold text-[#8B0000] tracking-[0.25em] uppercase">
                Journal & Community News Magazine
              </p>
              <span className="h-[1px] w-8 sm:w-16 bg-[#8B0000] hidden xs:block"></span>
            </div>
          </div>

          {/* Right: Search & Mobile Menu */}
          <div className="w-auto md:w-52 flex items-center justify-end gap-2">
            <button
              onClick={openSearch}
              id="search-trigger-button"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#171717] bg-white border border-[#E5E2DC] hover:border-[#8B0000] hover:text-[#8B0000] rounded-xs cursor-pointer transition-all shadow-xs"
              title="Search articles"
            >
              <FiSearch className="text-sm text-[#8B0000]" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden lg:inline text-[10px] bg-[#F1EFEA] px-1 py-0.5 rounded-xs text-[#777] font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-xl text-[#171717] border border-[#E5E2DC] bg-white rounded-xs hover:border-[#8B0000]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Signature Blood Red Navigation Bar */}
      <nav
        id="category-navigation-bar"
        className="w-full bg-[#8B0000] text-white shadow-xs border-y border-[#730000]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <ul className="flex items-center justify-center space-x-1 sm:space-x-3 text-xs font-medium overflow-x-auto no-scrollbar py-2">
            {navCategories.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);

              const isDirectory = item.path === '/directory';

              return (
                <li key={item.label} className="shrink-0">
                  <button
                    onClick={() => navigate(item.path)}
                    className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer text-xs uppercase tracking-wider font-semibold ${
                      isDirectory
                        ? isActive
                          ? 'bg-white text-[#8B0000] shadow-xs font-bold'
                          : 'bg-[#5C0000] text-white hover:bg-white hover:text-[#8B0000] font-bold border border-white/20'
                        : isActive
                        ? 'bg-[#5C0000] text-white shadow-inner font-bold border-b-2 border-white'
                        : 'text-white/90 hover:text-white hover:bg-[#730000]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#8B0000] bg-white px-6 py-5 shadow-lg">
          <div className="space-y-1">
            {navCategories.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2.5 px-3.5 text-sm font-semibold rounded-xs transition-colors ${
                    isActive
                      ? 'bg-[#8B0000] text-white'
                      : 'text-[#171717] hover:bg-[#FFF5F5] hover:text-[#8B0000]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
