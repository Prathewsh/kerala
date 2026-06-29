import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import appsData from "../../data/apps.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCommunityApps, setShowAllCommunityApps] = useState(false);

  // Filter and sort apps alphabetically by name
  const filteredCommunityApps = appsData
    .filter(app => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        (app.tags && app.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  // Limit display to 12 apps by default, show all if toggled
  const displayedCommunityApps = showAllCommunityApps
    ? filteredCommunityApps
    : filteredCommunityApps.slice(0, 12);

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a2e22] font-sans overflow-x-hidden relative">
      {/* Decorative leaf in the top-left corner */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-15 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#0b422d]">
          <path d="M10 90C25 65 50 60 90 90M10 90C30 55 55 40 90 90M10 90C20 45 45 25 90 90M10 90C15 35 35 15 90 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <Header />

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-80px)] flex items-center">
        {/* Background Image Layer */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-[url('/hero_bg.png')] bg-no-repeat bg-cover lg:bg-contain bg-right-bottom opacity-90 lg:opacity-100 pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Gradients to blend the background image perfectly with the cream bg */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] bg-gradient-to-r from-[#fafaf7] via-[#fafaf7]/95 to-transparent pointer-events-none z-0 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7] via-[#fafaf7]/80 to-transparent pointer-events-none z-0 block lg:hidden" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="font-serif text-[44px] sm:text-6xl lg:text-[72px] font-bold tracking-tight text-[#14261c] leading-[1.08]">
                Discover <br />
                <span className="text-[#135c3c] relative inline-block">
                  Kerala&apos;s
                </span> <br />
                Digital Ecosystem
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-[#4a5e52] leading-relaxed max-w-xl font-medium">
                Explore a curated collection of useful apps, local services, news platforms, and community tools built for Keralites.
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-xl">
                <div className="flex items-center justify-between bg-white border border-[#e2e8e4] rounded-2xl shadow-[0_4px_20px_rgba(11,66,45,0.03)] hover:shadow-[0_8px_30px_rgba(11,66,45,0.06)] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#135c3c]/15 focus-within:border-[#135c3c] px-4 py-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search apps, services, news, tools..."
                    className="w-full bg-transparent px-2 py-3.5 text-base text-[#1a2e22] placeholder-[#8a9e91] focus:outline-none"
                  />
                  <div className="p-2 text-[#4a5e52]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 bg-[#0b422d] hover:bg-[#073020] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-[#0b422d]/10 group cursor-pointer">
                  Explore Apps
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
                <a 
                  href="/map"
                  className="inline-flex items-center justify-center border border-[#0b422d]/30 hover:border-[#0b422d]/60 text-[#0b422d] bg-white/85 hover:bg-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
                >
                  View Map
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#4a5e52] font-semibold">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0b422d]/10 text-[#0b422d]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  Curated & Trusted
                </div>

                <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#4a5e52] font-semibold">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0b422d]/10 text-[#0b422d]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                      <path d="M9 22v-4h4" />
                    </svg>
                  </span>
                  Made for Kerala
                </div>

                <div className="flex items-center gap-2.5 text-sm sm:text-base text-[#4a5e52] font-semibold">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0b422d]/10 text-[#0b422d]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </span>
                  Safe & Reliable
                </div>
              </div>

            </div>

            {/* Right Column: Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] z-10">
              <div className="absolute w-72 h-72 bg-[#0b422d]/5 rounded-full blur-3xl -z-10" />
              <img
                src="/phone2.png"
                alt="Kerala Digital Directory App Preview"
                className="w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] object-contain drop-shadow-[0_25px_45px_rgba(11,66,45,0.15)] transform hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section id="categories" className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14261c]">
                Browse by Categories
              </h2>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-[#0b422d] hover:underline transition-all group">
              View all categories
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((cat, idx) => {
              const url = cat.title === "News" ? "/news" : "#apps";
              return (
                <a
                  key={idx}
                  href={url}
                  className="bg-[#fafaf7]/50 border border-gray-100/80 hover:border-[#0b422d]/20 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-md hover:shadow-gray-100/50 hover:-translate-y-0.5 group cursor-pointer block no-underline"
                >
                  {cat.icon}
                  <h3 className="font-bold text-sm text-[#14261c] group-hover:text-[#0b422d] transition-colors mt-2">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#687a70] mt-0.5 font-semibold">
                    {cat.count} apps
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Apps Section */}
      <section id="featured-apps" className="py-16 bg-[#fafaf7] relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14261c]">
                Featured Apps
              </h2>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-[#0b422d] hover:underline transition-all group">
              View all apps
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Featured Apps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {featuredApps.map((app, idx) => (
              <a
                key={idx}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-100/80 hover:border-[#0b422d]/20 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
              >
                <div className="min-w-0">
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-start justify-between mb-4">
                    {app.icon}
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${app.tagClass}`}>
                      {app.tag}
                    </span>
                  </div>

                  {/* App Info */}
                  <h3 className="font-bold text-base text-[#14261c] leading-snug group-hover:text-[#0b422d] transition-colors truncate" title={app.title}>
                    {app.title}
                  </h3>
                  <p className="text-[11px] text-[#687a70] font-semibold mt-0.5">
                    {app.category}
                  </p>
                  <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                    {app.description}
                  </p>
                </div>

                {/* Bottom Bar: Rating, Platforms & Link */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-500">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="text-xs font-bold text-[#14261c]">{app.rating}</span>
                    </div>

                    {/* Platforms */}
                    <div className="flex items-center gap-1.5 text-gray-400">
                      {app.platforms.android && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 hover:text-green-600 transition-colors">
                          <path d="M17.523 15.3c-.149 0-.272-.122-.272-.27V11.23c0-.148.123-.27.272-.27.148 0 .27.122.27.27v3.8c0 .148-.122.27-.27.27zm-11.046 0c-.148 0-.27-.122-.27-.27V11.23c0-.148.123-.27.27-.27.149 0 .272.122.272.27v3.8c0 .148-.123.27-.272.27zM12 18.777c-2.36 0-4.313-1.745-4.654-4.04h9.308c-.341 2.295-2.293 4.04-4.654 4.04zm4.986-5.07H7.014c-.093-1.077.218-2.14.872-2.936a4.85 4.85 0 013.386-1.68l-.898-1.558a.27.27 0 01.096-.367.27.27 0 01.367.098l.92 1.597c.39-.071.792-.107 1.196-.107.426 0 .85.038 1.264.113l.895-1.55a.27.27 0 01.37-.098.27.27 0 01.096.37l-.883 1.53c1.236.438 2.278 1.309 2.923 2.443.593.774.869 1.737.778 2.697z" />
                        </svg>
                      )}
                      {app.platforms.ios && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 hover:text-slate-800 transition-colors">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Action link */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0b422d]/80 group-hover:text-[#0b422d] transition-colors">
                      View Details
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transition-transform group-hover:translate-x-0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Community Apps Section */}
      <section className="py-16 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14261c]">
                Community Apps
              </h2>
              <p className="text-xs sm:text-sm text-[#687a70] mt-1 font-medium">
                Explore open-source, community-driven projects built for Kerala.
              </p>
            </div>
            {filteredCommunityApps.length > 12 && (
              <button
                onClick={() => setShowAllCommunityApps(!showAllCommunityApps)}
                className="flex items-center gap-1.5 text-sm font-bold text-[#0b422d] hover:underline transition-all cursor-pointer"
              >
                {showAllCommunityApps ? "Show less" : `View all ${filteredCommunityApps.length} apps`}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3.5 h-3.5 transition-transform duration-200 ${showAllCommunityApps ? "rotate-180" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            )}
          </div>

          {/* Community Apps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {displayedCommunityApps.map((app) => {
              return (
                <a
                  key={app.id}
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100/80 hover:border-[#0b422d]/25 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
                >
                  <div className="min-w-0">
                    {/* Top Bar: Emoji & Category/Tag */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 bg-[#fafaf7] border border-gray-100/60 rounded-xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                        {app.icon}
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md border bg-gray-50 text-gray-600 border-gray-100">
                        {app.category}
                      </span>
                    </div>

                    {/* App Info */}
                    <h3 className="font-bold text-base text-[#14261c] leading-snug group-hover:text-[#0b422d] transition-colors truncate" title={app.name}>
                      {app.name}
                    </h3>
                    <p className="text-[11px] text-[#687a70] font-semibold mt-0.5">
                      {app.category}
                    </p>
                    <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                      {app.description}
                    </p>
                  </div>

                  {/* Bottom Bar: Added By & Action */}
                  <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#687a70]">
                      <span>By {app.addedBy}</span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9m0 0a3 3 0 013-3h3m-6 3a3 3 0 00-3-3H6m6 3v3m0-6V3" />
                        </svg>
                        <span className="text-[9px] font-bold tracking-wider">Web</span>
                      </div>
                    </div>

                    {/* Action Link */}
                    <div className="text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0b422d]/80 group-hover:text-[#0b422d] transition-colors">
                        Open App
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transition-transform group-hover:translate-x-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Show More Button below grid on mobile/tablet */}
          {filteredCommunityApps.length > 12 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAllCommunityApps(!showAllCommunityApps)}
                className="inline-flex items-center gap-2 bg-[#fafaf7] hover:bg-[#fafaf7]/80 border border-[#e2e8e4] text-[#0b422d] text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer hover:shadow"
              >
                {showAllCommunityApps ? "Show Less Apps" : `Show All ${filteredCommunityApps.length} Apps`}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 transition-transform duration-200 ${showAllCommunityApps ? "rotate-180" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Curated Collections Section */}
      <section className="py-16 bg-[#fafaf7] relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#14261c]">
                Curated Collections
              </h2>
            </div>
            <a href="#" className="flex items-center gap-1.5 text-sm font-bold text-[#0b422d] hover:underline transition-all group">
              View all collections
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {collections.map((col, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Background Image */}
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-5 z-10">
                  {/* Top: Icon */}
                  <div className="w-9 h-9 bg-white/15 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/10">
                    {col.icon}
                  </div>

                  {/* Bottom: Info */}
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight">
                      {col.title}
                    </h3>
                    <p className="text-[11px] text-white/85 mt-1 font-semibold">
                      {col.count} apps
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Submit App CTA Card */}
            <div className="relative aspect-[3/4] bg-white border border-[#e2e8e4] rounded-2xl p-6 flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              {/* Palm leaf watermark */}
              <div className="absolute right-0 bottom-0 w-40 h-40 opacity-[0.08] pointer-events-none translate-x-4 translate-y-4 rotate-12 group-hover:rotate-6 transition-transform duration-500">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#0b422d]">
                  <path d="M10 90C25 65 50 60 90 90M10 90C30 55 55 40 90 90M10 90C20 45 45 25 90 90M10 90C15 35 35 15 90 90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Content */}
              <div className="z-10 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#14261c] leading-snug">
                    Built an app <br />for Kerala?
                  </h3>
                  <p className="text-xs text-[#4a5e52]/95 mt-3 leading-relaxed font-medium">
                    Submit your app and get discovered by users across Kerala.
                  </p>
                </div>

                <div>
                  <button className="inline-flex items-center gap-2 bg-[#0b422d] hover:bg-[#073020] text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-sm group cursor-pointer">
                    Submit an App
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 transition-transform group-hover:translate-x-0.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Categories Data
const categories = [
  {
    title: "Utilities",
    count: 182,
    description: "Daily-use apps for payments, transport, and more.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-[#15803d]/10 text-[#15803d] flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      </div>
    )
  },
  {
    title: "News",
    count: 48,
    description: "Stay updated with Malayalam and English news apps.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
        </svg>
      </div>
    )
  },
  {
    title: "Government",
    count: 56,
    description: "Official services and citizen utility applications.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-emerald-700/10 text-emerald-700 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33l-7.5-5-7.5 5V21M3 21h18M12 9.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        </svg>
      </div>
    )
  },
  {
    title: "Travel",
    count: 67,
    description: "Travel, navigation, tourism and local transport.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8a2.18 2.18 0 001.5-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m0 0a48.109 48.109 0 00-14.202 0m14.202 0V4.875c0-.621-.504-1.125-1.125-1.125h-4.5c-.621 0-1.125.504-1.125 1.125v1.25m-6 0a48.109 48.109 0 00-3.413.387m0 0a2.18 2.18 0 00-1.5 1.661v3.784c0 .621.284 1.19.75 1.661m0 0a2.18 2.18 0 001.5 1.661v3.784c0 .621.284 1.19.75 1.661" />
        </svg>
      </div>
    )
  },
  {
    title: "Education",
    count: 64,
    description: "Learning, exam prep, school & university tools.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      </div>
    )
  },
  {
    title: "Community",
    count: 38,
    description: "Community platforms and local help initiatives.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Finance",
    count: 71,
    description: "Banking, UPI, loans, investments and more.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0v-3M3 12v-3m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
        </svg>
      </div>
    )
  },
  {
    title: "Health",
    count: 52,
    description: "Healthcare, fitness, mental wellness and more.",
    icon: (
      <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </div>
    )
  }
];

// Featured Apps Data
const featuredApps = [
  {
    title: "Kerala Transit",
    category: "Travel • Utility",
    tag: "Verified",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    description: "Live bus, metro and train updates for easy travel across Kerala.",
    rating: "4.6",
    platforms: { android: true, ios: true },
    url: "https://play.google.com/store/apps/details?id=com.keralatransit",
    icon: (
      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V3.375c0-.621-.508-1.125-1.129-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5M16.5 13.5v3.75m0-3.75H13.5" />
        </svg>
      </div>
    )
  },
  {
    title: "Evide",
    category: "Transport",
    tag: "Verified",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    description: "Live tracking, timings, and routes for KSRTC and private buses in Kerala.",
    rating: "4.7",
    platforms: { android: true, ios: true },
    url: "https://www.evide.in/",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm flex-shrink-0">
        e
      </div>
    )
  },
  {
    title: "Mathrubhumi",
    category: "News",
    tag: "Popular",
    tagClass: "bg-amber-50 text-amber-700 border-amber-100/80",
    description: "Malayalam news app from Kerala's most trusted media.",
    rating: "4.4",
    platforms: { android: true, ios: true },
    url: "https://www.mathrubhumi.com/",
    icon: (
      <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm flex-shrink-0">
        M
      </div>
    )
  },
  {
    title: "Sevana",
    category: "Government",
    tag: "Verified",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    description: "Access government services and certificates easily.",
    rating: "4.5",
    platforms: { android: true, ios: true },
    url: "https://sevana.lsgkerala.gov.in/",
    icon: (
      <div className="w-12 h-12 bg-white border border-gray-150 rounded-2xl flex items-center justify-center text-emerald-700 shadow-sm p-1.5 flex-shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-full h-full">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M8 12h8" strokeLinecap="round" />
        </svg>
      </div>
    )
  },
  {
    title: "Yatra Partner",
    category: "Travel",
    tag: "Popular",
    tagClass: "bg-amber-50 text-amber-700 border-amber-100/80",
    description: "Kerala Tourism official app for partners and travel guides.",
    rating: "4.2",
    platforms: { android: true, ios: true },
    url: "https://www.keralatourism.org/",
    icon: (
      <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm flex-shrink-0">
        y
      </div>
    )
  },
  {
    title: "Nammude School",
    category: "Education",
    tag: "New",
    tagClass: "bg-indigo-50 text-indigo-700 border-indigo-100/80",
    description: "School management app for teachers, students & parents.",
    rating: "4.3",
    platforms: { android: true, ios: true },
    url: "https://education.kerala.gov.in/",
    icon: (
      <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-sm flex-shrink-0">
        N
      </div>
    )
  },
  {
    title: "MediCare Kerala",
    category: "Health",
    tag: "Verified",
    tagClass: "bg-emerald-50 text-emerald-700 border-emerald-100/80",
    description: "Find hospitals, book appointments and health services.",
    rating: "4.6",
    platforms: { android: true, ios: true },
    url: "https://ehealth.kerala.gov.in/",
    icon: (
      <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      </div>
    )
  }
];

// Curated Collections Data
const collections = [
  {
    title: "Essential Apps for Every Keralite",
    count: 20,
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.5a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
      </svg>
    )
  },
  {
    title: "Best Malayalam News Apps",
    count: 15,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    )
  },
  {
    title: "Useful Apps for Students",
    count: 18,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.9c4.756 0 9.173-1.436 12.23-3.883a60.436 60.436 0 00-.492-6.347M12 9v12m0-12L4.26 10.147M12 9l7.74 1.147M3.07 12.75c.34-.377.746-.676 1.19-.882m15.48 0c.444.206.85.505 1.19.882m-17.86 0A10.43 10.43 0 0012 15.75c3.27 0 6.24-1.49 8.24-3.87m-16.48 0c-.83-.43-1.52-1.1-2-1.88M20.24 12c.83-.43 1.52-1.1 2-1.88M12 3c-1.2 0-2.4.4-3.3 1.2a5.46 5.46 0 00-1.7 3.3" />
      </svg>
    )
  },
  {
    title: "Community & Local Help",
    count: 22,
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    )
  },
  {
    title: "Tourism and Travel Tools",
    count: 17,
    image: "https://images.unsplash.com/photo-1593693411515-c202e974eb17?auto=format&fit=crop&w=600&q=80",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8m-9-3.75h12m-6 6.75A9.75 9.75 0 102.25 12 9.75 9.75 0 0012 21.75z" />
      </svg>
    )
  }
];
