'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiHelpCircle,
  FiChevronDown,
  FiChevronUp,
  FiMessageSquare,
  FiAward,
  FiUsers,
  FiFileText
} from 'react-icons/fi';

export default function ContactPage() {
  const router = useRouter();
  const navigate = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'Editorial Story Pitch',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const inquiryTypes = [
    'Editorial Story Pitch',
    'Austin Black Business Directory Submission/Update',
    'Achievements in Black Austin Awards Nomination',
    'Corporate Sponsorship & Advertising',
    'Made Media Group 501(c)(3) Partnership',
    'General Newsroom Inquiry'
  ];

  const departmentContacts = [
    {
      icon: FiFileText,
      department: 'Editorial & Story Pitches',
      email: 'editorial@austinblackbusiness.com',
      desc: 'Send news tips, founder stories, op-ed submissions, and press releases.'
    },
    {
      icon: FiUsers,
      department: 'Business Directory Desk',
      email: 'directory@austinblackbusiness.com',
      desc: 'Submit, update, or verify your company profile in the Black Business Directory.'
    },
    {
      icon: FiAward,
      department: 'Achievements in Black Austin Awards',
      email: 'awards@austinblackbusiness.com',
      desc: 'Inquire about annual gala tickets, sponsorship, and honoree nominations.'
    },
    {
      icon: FiMessageSquare,
      department: 'Made Media Group Partnerships',
      email: 'partnerships@mademediagroup.org',
      desc: 'Connect with our 501(c)(3) leadership regarding community grants and sponsorships.'
    }
  ];

  const faqs = [
    {
      question: 'How do I submit my business to the Austin Black Business Directory?',
      answer: 'You can navigate to the Business Directory page and click "Add Your Business", or email your company details, owner information, physical address, and high-resolution logo to directory@austinblackbusiness.com. Listings are reviewed by our verification team.'
    },
    {
      question: 'How are honorees selected for the Achievements in Black Austin Awards?',
      answer: 'Nominations open annually across categories including Top Black Doctors, Most Influential Lawyers, Tech Pioneers, and Emerging Entrepreneurs. An independent advisory committee reviews community impact, professional excellence, and civic contributions before announcing the cohort.'
    },
    {
      question: 'Is Made Media Group a registered 501(c)(3) non-profit organization?',
      answer: 'Yes. Made Media Group is a federally recognized 501(c)(3) charitable organization based in Austin, Texas. Contributions, corporate sponsorships, and donations directly fund journalism fellowships, youth media literacy workshops, and community economic forums.'
    },
    {
      question: 'Does the Journal accept guest commentary and community op-eds?',
      answer: 'Yes, we welcome well-researched guest essays and perspective pieces addressing economic development, healthcare disparities, tech equity, and Central Texas civic policy. Submissions should be between 600–900 words and sent to editorial@austinblackbusiness.com.'
    },
    {
      question: 'Where can I find print copies of the Austin Black Business Journal?',
      answer: 'Print editions are distributed quarterly to local libraries, chambers of commerce, Huston-Tillotson University, municipal offices, and partner Black-owned businesses across the Austin metropolitan area.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      inquiryType: 'Editorial Story Pitch',
      subject: '',
      message: ''
    });
    setSubmitted(false);
  };

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
        <span className="text-[#8B0000] font-semibold">Contact Newsroom</span>
      </nav>

      {/* Header Title */}
      <section className="border-b-2 border-[#8B0000] pb-10">
        <div className="max-w-3xl">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B0000] block mb-2.5">
            Connect With Our Newsroom & Staff
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] leading-[1.2] mb-4">
            Contact Austin Black Business Journal
          </h1>
          <p className="text-base sm:text-lg text-[#555] leading-relaxed">
            Have a news tip, press release, directory question, or inquiry about Made Media Group programs? Reach out to our editors and department desks below.
          </p>
        </div>
      </section>

      {/* Main Contact Grid: Contact Info + Interactive Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Office Details & Direct Desks (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Central Texas Office Card */}
          <div className="bg-white border border-[#E5E2DC] p-6 sm:p-8 rounded-xs shadow-xs space-y-5">
            <h2 className="text-xl font-serif font-bold text-[#171717] border-b border-[#E5E2DC] pb-3">
              Headquarters & Newsroom
            </h2>

            <div className="space-y-4 text-sm text-[#444]">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#8B0000] mt-1 shrink-0 text-base" />
                <div>
                  <strong className="block text-[#171717]">Made Media Group / Black Austin®</strong>
                  <span>5114 Balcones Woods Dr</span>
                  <span className="block text-[#666]">Austin, Texas 78759</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="text-[#8B0000] mt-1 shrink-0 text-base" />
                <div>
                  <strong className="block text-[#171717]">Telephone</strong>
                  <a
                    href="tel:5128618484"
                    className="hover:text-[#8B0000] transition-colors font-mono"
                  >
                    (512) 861-8484
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="text-[#8B0000] mt-1 shrink-0 text-base" />
                <div>
                  <strong className="block text-[#171717]">General Inquiries</strong>
                  <a
                    href="mailto:info@austinblackbusiness.com"
                    className="hover:text-[#8B0000] transition-colors"
                  >
                    info@austinblackbusiness.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="text-[#8B0000] mt-1 shrink-0 text-base" />
                <div>
                  <strong className="block text-[#171717]">Newsroom Hours</strong>
                  <span>Monday – Friday: 9:00 AM – 5:30 PM CST</span>
                  <span className="block text-xs text-[#777]">Press tips monitored 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Department Desks */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#171717]">
              Specialized Department Desks
            </h3>

            <div className="space-y-3">
              {departmentContacts.map((dept, i) => {
                const Icon = dept.icon;
                return (
                  <div
                    key={i}
                    className="bg-white border border-[#E5E2DC] p-4 rounded-xs shadow-xs flex items-start gap-3 hover:border-[#8B0000] transition-all"
                  >
                    <div className="w-8 h-8 rounded-xs bg-[#8B0000]/10 text-[#8B0000] flex items-center justify-center shrink-0 mt-0.5 text-sm">
                      <Icon />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#171717]">{dept.department}</h4>
                      <p className="text-xs text-[#666] leading-relaxed mb-1">{dept.desc}</p>
                      <a
                        href={`mailto:${dept.email}`}
                        className="text-xs font-semibold text-[#8B0000] hover:underline"
                      >
                        {dept.email}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E5E2DC] p-6 sm:p-10 rounded-xs shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#FFF5F5] text-[#8B0000] rounded-full flex items-center justify-center mx-auto text-3xl">
                  <FiCheckCircle />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#171717]">
                  Thank You, Message Received
                </h3>
                <p className="text-sm text-[#555] max-w-md mx-auto leading-relaxed">
                  Your inquiry regarding <strong>{formData.inquiryType}</strong> has been routed to the appropriate editorial desk at Austin Black Business Journal. We typically respond within 1–2 business days.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#171717] mb-1">
                    Send a Message to the Journal
                  </h2>
                  <p className="text-xs text-[#666]">
                    Please complete the fields below and our editorial team will get in touch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jordan Washington"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(512) 555-0199"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                      Company or Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Austin Enterprise Council"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                    Inquiry Type *
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all cursor-pointer"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief summary of your inquiry..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] mb-1.5">
                    Message / Story Details *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your story pitch, directory listing, or questions..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8F7F4] border border-[#E5E2DC] rounded-xs focus:bg-white focus:outline-none focus:border-[#8B0000] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#8B0000] hover:bg-[#6E0000] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <FiSend className="text-sm" /> Submit Message to Newsroom
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="bg-white border border-[#E5E2DC] p-6 sm:p-10 rounded-xs shadow-xs">
        <div className="border-b border-[#E5E2DC] pb-4 mb-6 flex items-center gap-2">
          <FiHelpCircle className="text-[#8B0000] text-lg" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#E5E2DC]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-4">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#171717] hover:text-[#8B0000] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <span className="text-sm text-[#777] shrink-0">
                    {isOpen ? <FiChevronUp className="text-[#8B0000]" /> : <FiChevronDown />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-[#555] leading-relaxed font-sans max-w-4xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
