import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface NewsChannel {
  id: string;
  name: string;
  channelId: string; // YouTube Channel ID for live stream embed
  logoText: string;
  logoBg: string;
  description: string;
  website: string;
  youtubeUrl: string;
}

const newsChannels: NewsChannel[] = [
  {
    id: "asianet",
    name: "Asianet News",
    channelId: "UCf8w5m0YsRa8MHQ5bwSGmbw",
    logoText: "AN",
    logoBg: "bg-red-600",
    description: "Kerala's leading Malayalam news channel, renowned for its comprehensive coverage, unbiased reporting, and political analysis.",
    website: "https://www.asianetnews.com",
    youtubeUrl: "https://www.youtube.com/@asianetnews"
  },
  {
    id: "twentyfour",
    name: "24 News",
    channelId: "UCup3etEdjyF1L3sRbU-rKLw",
    logoText: "24",
    logoBg: "bg-blue-600",
    description: "A highly popular, tech-driven news channel featuring innovative virtual studios, interactive debates, and rapid news updates.",
    website: "https://www.24newslive.com",
    youtubeUrl: "https://www.youtube.com/@24onlive"
  },
  {
    id: "manorama",
    name: "Manorama News",
    channelId: "UCP0uG-mcMImgKnJz-VjJZmQ",
    logoText: "MN",
    logoBg: "bg-blue-800",
    description: "From the house of Malayala Manorama, offering trusted journalism, in-depth discussions, and regional news updates.",
    website: "https://www.manoramanews.com",
    youtubeUrl: "https://www.youtube.com/@manoramanews"
  },
  {
    id: "mathrubhumi",
    name: "Mathrubhumi News",
    channelId: "UCwXrBBZnIh2ER4lal6WbAHw",
    logoText: "MB",
    logoBg: "bg-red-700",
    description: "A prominent news channel focused on social issues, political discussions, and timely bulletins from across Kerala.",
    website: "https://www.mathrubhumi.com",
    youtubeUrl: "https://www.youtube.com/@mathrubhuminews"
  },
  {
    id: "reporter",
    name: "Reporter TV",
    channelId: "UCFx1nseXKTc1Culiu3neeSQ",
    logoText: "RP",
    logoBg: "bg-red-500",
    description: "First journalist-owned news channel in Kerala, recently revamped with cutting-edge AR/VR graphics and bold journalism.",
    website: "https://www.reporterlive.com",
    youtubeUrl: "https://www.youtube.com/@reporterlive"
  },
  {
    id: "mediaone",
    name: "MediaOne TV",
    channelId: "UC-f7r46JhYv78q5pGrO6ivA",
    logoText: "M1",
    logoBg: "bg-teal-600",
    description: "Popular Malayalam news channel focusing on social justice, community news, international affairs, and public debates.",
    website: "https://www.mediaoneonline.com",
    youtubeUrl: "https://www.youtube.com/@MediaOneTVLive"
  },
  {
    id: "janam",
    name: "Janam TV",
    channelId: "UCNVkxRPqsBNejO6B9thG9Xw",
    logoText: "JN",
    logoBg: "bg-orange-600",
    description: "Nationalist Malayalam news channel covering regional affairs, cultural heritage, and national news updates.",
    website: "https://janamtv.com",
    youtubeUrl: "https://www.youtube.com/@janamtv"
  },
  {
    id: "kairali",
    name: "Kairali News",
    channelId: "UCnEvxaWfVL91XIYuyQRO5QA",
    logoText: "KR",
    logoBg: "bg-red-800",
    description: "Associated with Kairali TV, delivering progressive journalism, labor news, and comprehensive coverage of Kerala politics.",
    website: "https://www.kairalinewsonline.com",
    youtubeUrl: "https://www.youtube.com/@kairalinews"
  }
];

export default function NewsPage() {
  const [activeChannel, setActiveChannel] = useState<NewsChannel>(newsChannels[0]);

  const selectAndScroll = (channel: NewsChannel) => {
    setActiveChannel(channel);
    setTimeout(() => {
      const playerElement = document.getElementById("live-player");
      if (playerElement) {
        playerElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <main className="min-h-screen bg-[#fafaf7] text-[#1a2e22] font-sans flex flex-col">
      <Header className="bg-white border-b border-gray-150" />

      {/* Hero Section / Video Player Dashboard (Now First!) */}
      <section id="live-player" className="bg-[#fafaf7] py-12 px-6 sm:px-8 lg:px-12 relative overflow-hidden border-b border-gray-150">
        {/* Background Decorative Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0b422d]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0b422d] bg-[#0b422d]/5 px-3 py-1 rounded-full border border-[#0b422d]/10">
                Live Broadcast Hub
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-3 text-[#14261c]">
                Malayalam Live News
              </h1>
              <p className="text-sm text-[#5c7063] mt-1.5 max-w-xl">
                Watch major Malayalam news channels live in one unified dashboard. Click any channel to switch the stream.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#0b422d] bg-[#0b422d]/5 px-4 py-2.5 rounded-xl border border-[#0b422d]/10">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>Currently Playing: <strong>{activeChannel.name}</strong></span>
            </div>
          </div>

          {/* Video Dashboard Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: Interactive Video Player (Takes 2/3 width) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Premium Cinema Theater Frame */}
              <div className="bg-[#0c120e] p-3 sm:p-4 rounded-3xl border border-[#1b2f21]/20 shadow-2xl relative flex flex-col gap-3">
                <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/5 group">
                  <iframe
                    key={activeChannel.id}
                    src={`https://www.youtube.com/embed/live_stream?channel=${activeChannel.channelId}&autoplay=1&mute=0`}
                    title={`${activeChannel.name} Live Stream`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                
                {/* Broadcast Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-1 py-0.5 text-[11px] font-semibold text-[#a3b899]">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 bg-red-500/15 text-red-400 px-2.5 py-1 rounded-lg border border-red-500/25 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      LIVE
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 text-[#d1decb]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.202 0-4.277-.624-6.041-1.714v-.1a4.125 4.125 0 017.533-2.493M15 9.054a9 9 0 00-11.963-3.721m11.963 3.721A8.961 8.961 0 0010.5 6h-.008a9 9 0 00-6.955 3.298M12 11.25c.373 0 .726-.101 1.03-.277L15 11.25m-3 0c-.373 0-.726-.101-1.03-.277L9 11.25M12 11.25v2.25" />
                      </svg>
                      {((activeChannel.name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) * 17) % 12000 + 6400).toLocaleString()} watching
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 text-[9px] font-bold uppercase tracking-wider">
                      1080p HD
                    </span>
                    <span className="bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/5 text-[9px] font-bold uppercase tracking-wider">
                      Low Latency
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Channel Details */}
              <div className="bg-white border border-[#e2e8e4]/70 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 ${activeChannel.logoBg} text-white font-bold rounded-xl flex items-center justify-center shadow`}>
                    {activeChannel.logoText}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#14261c] flex items-center gap-2">
                      {activeChannel.name}
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-red-500/10 text-red-600 rounded-full border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        LIVE
                      </span>
                    </h3>
                    <p className="text-xs text-[#687a70] font-semibold">
                      Official Stream &bull; High Definition
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#5c7063] leading-relaxed mt-3">
                  {activeChannel.description}
                </p>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={activeChannel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#0b422d] hover:text-[#073020] transition-colors flex items-center gap-1"
                  >
                    Visit Website &rarr;
                  </a>
                  <a
                    href={activeChannel.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-red-600 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    YouTube Channel &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Channel Selector Sidebar (Takes 1/3 width) */}
            <div className="bg-white border border-[#e2e8e4]/70 rounded-3xl p-5 flex flex-col max-h-[520px] lg:max-h-none shadow-sm">
              <h3 className="font-serif text-lg font-bold mb-4 text-[#14261c]">
                Select Channel
              </h3>

              <div className="flex flex-col gap-2.5 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                {newsChannels.map((channel) => {
                  const isActive = activeChannel.id === channel.id;
                  return (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel)}
                      className={`flex items-center gap-3.5 p-3.5 rounded-2xl text-left border transition-all cursor-pointer group ${isActive
                        ? "bg-[#0b422d] border-[#0b422d] text-white shadow-lg"
                        : "bg-[#fafaf7]/50 border-gray-100/80 text-[#687a70] hover:bg-white hover:border-[#0b422d]/20 hover:text-[#0b422d]"
                        }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm text-white ${isActive ? "bg-white/10" : channel.logoBg
                        }`}>
                        {channel.logoText}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className={`font-bold text-xs transition-colors ${isActive ? "text-white" : "text-[#14261c] group-hover:text-[#0b422d]"}`}>
                          {channel.name}
                        </h4>
                        <span className="text-[10px] block opacity-80 truncate mt-0.5">
                          {channel.description}
                        </span>
                      </div>

                      {/* Live indicator */}
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isActive ? "bg-white animate-pulse" : "bg-red-500"
                        }`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid Directory Section (Now Second!) */}
      <section className="py-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#14261c]">
            Malayalam News Directory
          </h2>
          <p className="text-xs text-[#687a70] mt-1 font-semibold">
            All major broadcasting networks and their digital portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white border border-[#e2e8e4]/70 hover:border-[#0b422d]/25 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className={`w-8.5 h-8.5 ${channel.logoBg} text-white font-bold text-xs rounded-lg flex items-center justify-center`}>
                    {channel.logoText}
                  </div>
                  <h3 className="font-bold text-sm text-[#14261c] group-hover:text-[#0b422d] transition-colors">
                    {channel.name}
                  </h3>
                </div>
                <p className="text-xs text-[#5c7063] leading-relaxed mb-4">
                  {channel.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => selectAndScroll(channel)}
                  className="w-full inline-flex items-center justify-center bg-[#0b422d]/5 hover:bg-[#0b422d] text-[#0b422d] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Watch Stream Live
                </button>

                <div className="flex items-center justify-between mt-1 text-[10px] font-bold text-[#687a70]">
                  <a href={channel.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#0b422d]">
                    Official Website &rarr;
                  </a>
                  <a href={channel.youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
                    YouTube Page
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
