'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FiAward,
  FiBookOpen,
  FiUsers,
  FiTarget,
  FiCheckCircle,
  FiArrowRight,
  FiMapPin,
  FiMail
} from 'react-icons/fi';

export default function AboutPage() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const leadershipTeam = [
    {
      name: 'Anita C. Roberts',
      title: 'Publisher & Editor-in-Chief',
      organization: 'Founder, Black Austin® | Executive Director, Made Media Group',
      bio: 'A retired military veteran and civic champion, Anita founded Black Austin® in 2011 to connect, elevate, and celebrate African American enterprise. Under her stewardship, Austin Black Business Journal has evolved into Central Texas’s premier chronicle of Black excellence, corporate leadership, and community resilience.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Marcus Vance',
      title: 'Senior Enterprise Editor',
      organization: 'Austin Black Business Journal',
      bio: 'Award-winning investigative and economic journalist with over 15 years documenting venture capital distribution, commercial real estate, municipal equity, and minority business enterprise (MBE) policy.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Dr. Evelyn St. Claire',
      title: 'Contributing Editor, Healthcare Equity',
      organization: 'Austin Black Physicians Initiative',
      bio: 'Public health researcher and clinician dedicated to chronicling Central Texas healthcare disparities, clinical innovation, and the achievements of Black medical professionals.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Darius Thorne, Esq.',
      title: 'Finance Affairs & Civic Policy Analyst',
      organization: 'Central Texas Finance Institute',
      bio: 'Practicing civil rights attorney and corporate advisor examining regulatory developments, judicial appointments, and community wealth preservation across Travis and Williamson counties.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const pillars = [
    {
      icon: FiBookOpen,
      title: 'Independent Business Journalism',
      desc: 'Rigorous reporting on capital access, technology, municipal contracts, commercial growth, and executive leadership shaping the Austin-Round Rock metropolitan ecosystem.'
    },
    {
      icon: FiAward,
      title: 'Annual Recognition & Honors',
      desc: 'Organizers of the signature Achievements in Black Austin Awards Gala, celebrating Top Black Doctors, Most Influential Lawyers, Tech Pioneers, and Community Stewards.'
    },
    {
      icon: FiUsers,
      title: 'Austin Black Business Directory',
      desc: 'Curated, comprehensive registry of hundreds of Black-owned enterprises connecting consumers, procurement officials, and institutional partners with local services.'
    },
    {
      icon: FiTarget,
      title: 'Media Literacy & Mentorship',
      desc: 'Under Made Media Group 501(c)(3), providing educational pathways, student journalism fellowships, and community storytelling workshops.'
    }
  ];

  const milestones = [
    {
      year: '2011',
      title: 'Foundation of Black Austin®',
      description: 'Anita C. Roberts retired from military service and launched Black Austin® to provide an economic forum and resource directory for local entrepreneurs.'
    },
    {
      year: '2015',
      title: 'Launch of Journal Publication',
      description: 'Austin Black Business Journal debuted in digital and print formats to provide in-depth journalistic analysis of Black corporate and community leadership.'
    },
    {
      year: '2018',
      title: 'Achievements in Black Austin Gala',
      description: 'Inaugurated the annual gala recognizing Top Black Doctors, Influential Lawyers, and Entrepreneurs, becoming one of Central Texas’s most anticipated civic gatherings.'
    },
    {
      year: '2022',
      title: 'Silicon Hills Tech & Innovation Focus',
      description: 'Expanded specialized coverage chronicling Black founders, venture funding benchmarks, and STEM initiatives across the Austin technology boom.'
    },
    {
      year: 'Present',
      title: 'Empowering Central Texas',
      description: 'Continuing to bridge the racial wealth divide through impactful reporting, directory advocacy, and Made Media Group community empowerment programs.'
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 md:py-14 space-y-16">
      {/* Editorial Breadcrumbs */}
      <nav className="text-xs text-[#666] flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          className="hover:text-[#8B0000] cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-[#8B0000] font-semibold">About The Journal</span>
      </nav>

      {/* Hero Mission Section */}
      <section className="border-b-2 border-[#8B0000] pb-12">
        <div className="max-w-4xl">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B0000] block mb-2.5">
            About Made Media Group & Austin Black Business Journal
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] leading-[1.2] mb-6">
            Informing, Empowering, and Transforming African American Enterprise in Central Texas.
          </h1>
          <p className="text-base sm:text-xl text-[#444] leading-relaxed font-normal">
            Austin Black Business Journal & Community News magazine is published by <strong>Made Media Group</strong>, a certified 501(c)(3) non-profit organization dedicated to economic equity, civic education, and leadership recognition. We chronicle the innovators, visionaries, and community pillars defining Central Texas’s economic landscape.
          </p>
        </div>
      </section>

      {/* Core Mission & Vision */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border border-[#E5E2DC] p-8 sm:p-10 rounded-xs shadow-xs space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B0000] block">
            Our Purpose
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#171717]">
            The Mission of Made Media Group
          </h2>
          <p className="text-sm sm:text-base text-[#444] leading-relaxed">
            African American business owners and professionals have shaped Central Texas since the founding of Austin’s historic freedom colonies. Yet their stories, economic achievements, and policy challenges often remain underreported in mainstream media.
          </p>
          <p className="text-sm sm:text-base text-[#444] leading-relaxed">
            Our mission is clear: to illuminate economic opportunities, hold municipal and corporate institutions accountable for equitable supplier diversity, and preserve the generational legacy of Black wealth in Austin, Round Rock, Pflugerville, Manor, and beyond.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/directory')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8B0000] hover:underline uppercase tracking-wider cursor-pointer"
            >
              Explore Austin Black Business Directory <FiArrowRight />
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#E5E2DC] p-8 sm:p-10 rounded-xs shadow-xs space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B0000] block">
            Core Beliefs
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#171717]">
            Our Editorial Standards
          </h2>
          <ul className="space-y-3.5 text-sm sm:text-base text-[#444]">
            <li className="flex items-start gap-3">
              <FiCheckCircle className="text-[#8B0000] mt-1 shrink-0 text-base" />
              <span><strong>Uncompromising Accuracy:</strong> Independent fact-checking, sourced reporting, and transparent journalistic ethics.</span>
            </li>
            <li className="flex items-start gap-3">
              <FiCheckCircle className="text-[#8B0000] mt-1 shrink-0 text-base" />
              <span><strong>Economic Advocacy:</strong> Examining municipal procurement, venture funding gaps, and commercial tenancy protections.</span>
            </li>
            <li className="flex items-start gap-3">
              <FiCheckCircle className="text-[#8B0000] mt-1 shrink-0 text-base" />
              <span><strong>Community Uplift:</strong> Centering living role models across medicine, law, engineering, education, and culinary arts.</span>
            </li>
            <li className="flex items-start gap-3">
              <FiCheckCircle className="text-[#8B0000] mt-1 shrink-0 text-base" />
              <span><strong>Cultural Preservation:</strong> Chronicling East Austin’s cultural heritage districts and historical landmarks.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Signature Pillars */}
      <section>
        <div className="border-b-2 border-[#8B0000] pb-3 mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B0000] block">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            Signature Programs & Publications
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E2DC] p-6 rounded-xs shadow-xs hover:border-[#8B0000] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xs bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center text-xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#171717] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline of Impact */}
      <section className="bg-white border border-[#E5E2DC] p-8 sm:p-12 rounded-xs shadow-xs">
        <div className="border-b border-[#E5E2DC] pb-4 mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B0000] block">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            A Decade of Chronicling Central Texas Excellence
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#E5E2DC]">
          {milestones.map((item, index) => (
            <div key={index} className="relative flex items-start gap-6 pl-2">
              <div className="w-4 h-4 rounded-full bg-[#8B0000] border-4 border-white shadow-xs shrink-0 mt-1.5 z-10" />
              <div>
                <span className="text-xs font-mono font-bold text-[#8B0000] uppercase tracking-wider block">
                  {item.year}
                </span>
                <h4 className="text-lg font-serif font-bold text-[#171717] mb-1">
                  {item.title}
                </h4>
                <p className="text-sm text-[#555] leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Leadership & Board */}
      <section>
        <div className="border-b-2 border-[#8B0000] pb-3 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B0000] block">
              The Masthead
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              Editorial & Organizational Leadership
            </h2>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="text-xs sm:text-sm font-bold text-[#8B0000] hover:underline uppercase tracking-wider cursor-pointer"
          >
            Contact the Newsroom →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leadershipTeam.map((leader, i) => (
            <div
              key={i}
              className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs flex flex-col sm:flex-row gap-6 items-start hover:border-[#8B0000] transition-colors"
            >
              <img
                src={leader.avatar}
                alt={leader.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#8B0000] shrink-0"
              />
              <div>
                <h3 className="text-xl font-serif font-bold text-[#171717]">
                  {leader.name}
                </h3>
                <span className="text-xs font-bold text-[#8B0000] uppercase tracking-wider block mt-0.5">
                  {leader.title}
                </span>
                <p className="text-xs text-[#777] mb-3">{leader.organization}</p>
                <p className="text-sm text-[#444] leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="bg-[#171717] text-white p-8 sm:p-12 rounded-xs border-t-4 border-[#8B0000] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#FF4D4D] font-bold block mb-1">
            Get Involved
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
            Have a Story or Business to Share?
          </h3>
          <p className="text-sm text-[#A3A3A3] max-w-xl leading-relaxed">
            Whether you are pitching an enterprise story, submitting your company to the Austin Black Business Directory, or nominating a leader for the Achievements Gala, our newsroom welcomes your voice.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 shrink-0">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs cursor-pointer"
          >
            Contact Newsroom
          </button>
          <button
            onClick={() => navigate('/directory')}
            className="px-6 py-3 bg-white text-[#171717] hover:bg-[#F8F7F4] text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-xs cursor-pointer"
          >
            Browse Directory
          </button>
        </div>
      </section>
    </div>
  );
}
