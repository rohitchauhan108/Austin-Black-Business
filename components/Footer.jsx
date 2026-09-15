'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';

export default function Footer() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer id="site-footer" className="w-full bg-[#171717] text-[#D4D0C8] border-t-4 border-[#8B0000] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-10 border-b border-[#2A2A2A]">
          {/* Brand Info */}
          <div className="max-w-md space-y-3">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <h2 className="text-xl sm:text-2xl font-masthead font-black tracking-wider text-white uppercase">
                AUSTIN BLACK BUSINESS
              </h2>
              <span className="text-[11px] tracking-[0.2em] text-[#FF4D4D] uppercase font-bold block mt-0.5">
                Journal & Community News Magazine
              </span>
            </div>
            <p className="text-xs text-[#999] leading-relaxed">
              Published by Made Media Group, a 501(c)(3) non-profit organization dedicated to informing, empowering, and transforming African American communities through business journalism, advocacy, and leadership recognition.
            </p>
            <p className="text-xs text-[#777]">
              Publisher & Editor-in-Chief: <span className="text-white font-medium">Anita C. Roberts</span>
            </p>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap gap-8 sm:gap-16 text-xs">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-3">
                Sections
              </h4>
              <ul className="space-y-2 text-[#A3A3A3]">
                {['Business', 'Technology', 'Healthcare', 'Legal', 'Community'].map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => navigate(`/blog?category=${cat}`)}
                      className="hover:text-[#FF4D4D] transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-3">
                Publication
              </h4>
              <ul className="space-y-2 text-[#A3A3A3]">
                <li>
                  <button
                    onClick={() => navigate('/about')}
                    className="hover:text-[#FF4D4D] transition-colors cursor-pointer"
                  >
                    About The Journal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="hover:text-[#FF4D4D] transition-colors cursor-pointer"
                  >
                    Contact Newsroom
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/directory')}
                    className="hover:text-[#FF4D4D] text-white font-semibold transition-colors cursor-pointer"
                  >
                    Black Business Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/blog')}
                    className="hover:text-[#FF4D4D] transition-colors cursor-pointer"
                  >
                    All Journal Stories
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777] gap-3">
          <p>© {new Date().getFullYear()} Austin Black Business Journal & Made Media Group. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Austin, Texas</span>
            <span>•</span>
            <button
              onClick={() => navigate('/directory')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Directory
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Archives
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
