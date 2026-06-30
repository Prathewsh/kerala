import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface Fixture {
  id: number;
  date: string;
  referee: string;
  venue: {
    name: string;
    city: string;
  };
  status: {
    elapsed: number;
    short: string;
    long: string;
  };
  league: {
    round: string;
  };
  teams: {
    home: { name: string; logo: string; winner: boolean | null };
    away: { name: string; logo: string; winner: boolean | null };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
  };
}

interface StandingItem {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  points: number;
  goalsDiff: number;
  group: string;
  all?: {
    played: number;
    win: number;
    draw: number;
    lose: number;
    goals?: {
      for: number;
      against: number;
    };
  };
}

interface TopScorer {
  rank: number;
  name: string;
  photo: string;
  teamName: string;
  teamLogo: string;
  goals: number;
  assists: number;
}

interface DashboardData {
  summary: {
    counts: {
      fixtures: number;
      live: number;
      teams: number;
      rounds: number;
      standings: number;
      topScorers: number;
    };
    fixtures: Fixture[];
    standings?: any;
    topScorers?: any;
  };
}

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
}

const FIFA_VIDEOS: VideoItem[] = [
  {
    id: "z9umI2sq4ZE",
    title: "HIGHLIGHTS: Netherlands vs Morocco | FIFA World Cup 2026™",
    category: "HIGHLIGHTS",
    thumbnail: "https://img.youtube.com/vi/z9umI2sq4ZE/mqdefault.jpg",
    description: "Watch the full match highlights of Netherlands vs Morocco in the FIFA World Cup 2026 (30/06/2026)."
  },
  {
    id: "EeLUP57yMn4",
    title: "FIFA World Cup 2026™ | Official Promo & Teaser",
    category: "PROMO",
    thumbnail: "https://img.youtube.com/vi/EeLUP57yMn4/mqdefault.jpg",
    description: "Watch the official promo teaser showcasing the cities, venues, and teams preparing for the 2026 World Cup."
  },
  {
    id: "kF4gN4p8L2M",
    title: "FIFA World Cup 2026™ | All 16 Stadiums Tour",
    category: "STADIUMS",
    thumbnail: "https://img.youtube.com/vi/kF4gN4p8L2M/mqdefault.jpg",
    description: "Take an in-depth tour of the 16 state-of-the-art stadium venues across the USA, Canada, and Mexico hosting the 2026 World Cup."
  },
  {
    id: "fDk4t7uK_Z8",
    title: "FIFA World Cup 2026™ | Cinematic Intro & Concept Teaser",
    category: "TEASER",
    thumbnail: "https://img.youtube.com/vi/fDk4t7uK_Z8/mqdefault.jpg",
    description: "A stunning cinematic concept intro showcasing the cities, atmosphere, and teams for the 2026 North American tournament."
  },
  {
    id: "zN1jWd_L3YQ",
    title: "How the 2026 World Cup Will Work | Tifo Football",
    category: "EXPLAINER",
    thumbnail: "https://img.youtube.com/vi/zN1jWd_L3YQ/mqdefault.jpg",
    description: "An analysis of the new 48-team format, the group stage layouts, and travel logistics for the co-hosted tournament."
  }
];

export default function FIFAWCPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Navigation Tabs (Matching the FOX Sports Sub-Header)
  const [activeTab, setActiveTab] = useState<"SCHEDULE" | "STANDINGS" | "VIDEOS" | "STATS" | "ABOUT">("SCHEDULE");
  const [activeVideo, setActiveVideo] = useState<VideoItem>(FIFA_VIDEOS[0]);
  
  // Date Selector state
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");

  // YouTube Player API State
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize YouTube Player API for active video iframe
  useEffect(() => {
    let ytPlayer: any = null;

    function initPlayer() {
      // Create a player instance bound to the iframe ID
      ytPlayer = new (window as any).YT.Player("youtube-player-active", {
        events: {
          onReady: (event: any) => {
            // Read initial mute state
            setIsMuted(event.target.isMuted());
          }
        }
      });
      setPlayer(ytPlayer);
    }

    // Load the YouTube IFrame API script if not already present
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      (window as any).onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else if ((window as any).YT.Player) {
      initPlayer();
    }

    return () => {
      if (ytPlayer && ytPlayer.destroy) {
        ytPlayer.destroy();
      }
    };
  }, [activeVideo.id, activeTab]); // Re-bind when video or tab changes

  const toggleMute = () => {
    if (!player) return;
    try {
      if (player.isMuted()) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.error("Failed to toggle mute:", e);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(
          "https://s6yli9bgre.execute-api.ap-south-1.amazonaws.com/api/dashboard?season=2026&timezone=Asia%2FKolkata"
        );
        if (!res.ok) throw new Error("Failed to fetch live tournament data");
        const json = await res.json();
        setData(json);

        // Default select today's date if it exists in the fixtures, otherwise the first active/live/upcoming match
        if (json.summary.fixtures && json.summary.fixtures.length > 0) {
          const todayStr = new Date().toDateString();
          const hasMatchesToday = json.summary.fixtures.some(
            (f: any) => new Date(f.date).toDateString() === todayStr
          );

          if (hasMatchesToday) {
            setSelectedDateStr(todayStr);
          } else {
            const activeFixture = json.summary.fixtures.find((f: any) => {
              const status = f.status.short.toUpperCase();
              return !["FT", "AET", "PEN"].includes(status);
            });

            let defaultDateStr = "";
            if (activeFixture) {
              defaultDateStr = new Date(activeFixture.date).toDateString();
            } else {
              const lastIdx = json.summary.fixtures.length - 1;
              defaultDateStr = new Date(json.summary.fixtures[lastIdx].date).toDateString();
            }
            setSelectedDateStr(defaultDateStr);
          }
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while loading dashboard.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Parse Standings
  const getGroupStandings = () => {
    const raw = data?.summary?.standings || [];
    const flat = Array.isArray(raw) ? raw.flat(2) : [];
    const groups: { [key: string]: StandingItem[] } = {};

    flat.forEach((item: any) => {
      const groupName = item.group || "Group Stage";
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(item);
    });

    // Sort by rank
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.rank - b.rank);
    });

    return groups;
  };

  // Parse Top Scorers
  const getTopScorers = (): TopScorer[] => {
    const raw = data?.summary?.topScorers || [];
    return raw.map((item: any, index: number) => {
      return {
        rank: index + 1,
        name: item.name || "Unknown Player",
        photo: item.photo || "https://media.api-sports.io/football/players/placeholder.png",
        teamName: item.team?.name || "Unknown",
        teamLogo: item.team?.logo || "",
        goals: item.goals || 0,
        assists: item.assists || 0,
      };
    });
  };

  // Get Unique Dates from Fixtures (starting from the first live/upcoming match date)
  const getUniqueDates = () => {
    if (!data) return [];

    // Find the first live/upcoming match date
    const firstActiveFixture = data.summary.fixtures.find((f) => {
      const status = f.status.short.toUpperCase();
      return !["FT", "AET", "PEN"].includes(status);
    });

    const activeDateThreshold = firstActiveFixture
      ? new Date(new Date(firstActiveFixture.date).setHours(0, 0, 0, 0))
      : null;

    const dateMap: { [key: string]: Date } = {};
    data.summary.fixtures.forEach((f) => {
      const d = new Date(f.date);

      // If there is an active date threshold, only include dates on or after that threshold
      if (activeDateThreshold && new Date(d).setHours(0, 0, 0, 0) < activeDateThreshold.getTime()) {
        return;
      }

      const dateStr = d.toDateString();
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = d;
      }
    });
    return Object.values(dateMap).sort((a, b) => a.getTime() - b.getTime());
  };

  // Filtered Fixtures for the Selected Date (Sorted: Live first, Upcoming second, Finished last)
  const getFilteredFixtures = () => {
    if (!data) return [];
    return data.summary.fixtures
      .filter((fixture) => {
        const fixtureDateStr = new Date(fixture.date).toDateString();
        return fixtureDateStr === selectedDateStr;
      })
      .sort((a, b) => {
        const aStatus = a.status.short.toUpperCase();
        const bStatus = b.status.short.toUpperCase();

        const aIsFinished = ["FT", "AET", "PEN"].includes(aStatus);
        const bIsFinished = ["FT", "AET", "PEN"].includes(bStatus);

        const aIsLive = ["1H", "2H", "HT", "ET", "P", "BT"].includes(aStatus);
        const bIsLive = ["1H", "2H", "HT", "ET", "P", "BT"].includes(bStatus);

        // 1. Live matches first
        if (aIsLive && !bIsLive) return -1;
        if (!aIsLive && bIsLive) return 1;

        // 2. Upcoming matches second
        if (!aIsFinished && bIsFinished) return -1;
        if (aIsFinished && !bIsFinished) return 1;

        // 3. Chronological order by timestamp otherwise
        return a.timestamp - b.timestamp;
      });
  };

  const groupStandings = data ? getGroupStandings() : {};
  const topScorers = data ? getTopScorers() : [];
  const uniqueDates = getUniqueDates();
  const filteredFixtures = getFilteredFixtures();

  return (
    <div className="min-h-screen bg-[#fafaf7] text-[#1a2e22] flex flex-col font-sans">
      {/* Standard Website Header */}
      <Header className="bg-white border-b border-gray-150" />

      {/* FOX Sports Style FIFA Header (Black & Gold) */}
      <div className="bg-black text-white select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* FIFA World Cup 2026 Logo Image */}
            <img
              src="/FIFAMensWorldCup2026.webp"
              alt="FIFA World Cup 2026 Logo"
              className="w-12 h-14 object-contain flex-shrink-0"
            />

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-wider font-serif uppercase">
                FIFA WORLD CUP 2026™
              </h2>
              <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase -mt-0.5">
                SOCCER &bull; MEN'S 2026 WORLD CUP
              </p>
            </div>
          </div>

          {/* Tab Menu */}
          <nav className="flex items-center gap-1 overflow-x-auto max-w-full scrollbar-none">
            {([
              { id: "SCHEDULE", label: "SCHEDULE" },
              { id: "STANDINGS", label: "STANDINGS" },
              { id: "VIDEOS", label: "VIDEOS" },
              { id: "STATS", label: "STATS" },
              { id: "ABOUT", label: "ABOUT" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-black tracking-widest uppercase transition-all relative border-b-2 cursor-pointer ${activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Gold Banner */}
        <div className="bg-[#c5a059] text-black py-2 px-4 sm:px-6 lg:px-8 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              All Matches Live
            </span>
            <a
              href="/news"
              className="bg-black text-white text-[9px] font-black tracking-widest px-3.5 py-1.5 rounded-md hover:bg-gray-900 transition-all flex items-center gap-1 no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
              </svg>
              WATCH ON FOX ONE
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {loading && !data && (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#0b422d]/20 border-t-[#0b422d] rounded-full animate-spin"></div>
            <p className="mt-4 text-xs text-[#687a70] font-semibold">Loading dashboard...</p>
          </div>
        )}

        {/* Two Column Layout (Left: Selected Tab, Right: Info Sidebar) */}
        {!loading && data && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT COLUMN: Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* SCHEDULE TAB */}
              {activeTab === "SCHEDULE" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#e2e8e4] pb-3">
                    <h3 className="text-xl font-extrabold tracking-tight text-[#14261c] font-serif uppercase">
                      SCHEDULE
                    </h3>
                    <button
                      onClick={() => setSelectedDateStr(uniqueDates[0]?.toDateString() || "")}
                      className="text-xs font-bold text-[#0b422d] hover:underline uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      View Full Schedule &gt;
                    </button>
                  </div>

                  {/* Horizontal Date Selector */}
                  <div className="flex gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none select-none">
                    {uniqueDates.map((date) => {
                      const isActive = date.toDateString() === selectedDateStr;
                      const isToday = date.toDateString() === new Date().toDateString();
                      const monthStr = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                      const dayName = isToday ? "TODAY" : date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                      const dayNum = date.getDate();

                      return (
                        <button
                          key={date.toISOString()}
                          onClick={() => setSelectedDateStr(date.toDateString())}
                          className={`flex-shrink-0 w-16 py-3 rounded-xl border flex flex-col items-center justify-between transition-all cursor-pointer ${isActive
                            ? "bg-black border-black text-white shadow-md scale-105"
                            : isToday
                              ? "bg-white border-amber-500 ring-2 ring-amber-500/25 text-[#1a2e22] scale-105 font-bold"
                              : "bg-white border-[#e2e8e4] text-[#1a2e22] hover:border-gray-400"
                            }`}
                        >
                          <span className={`text-[8px] font-black tracking-wider ${isActive ? "text-gray-400" : "text-gray-400"}`}>
                            {monthStr}
                          </span>
                          <span className="text-[10px] font-extrabold mt-1">{dayName}</span>
                          <span className="text-lg font-black leading-none mt-1">{dayNum}</span>
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isActive ? "bg-[#c5a059]" : "bg-transparent"}`}></span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Matches List for Selected Date */}
                  {filteredFixtures.length === 0 ? (
                    <div className="py-16 bg-white rounded-2xl border border-dashed border-[#e2e8e4] text-center">
                      <p className="text-[#5c7063] text-sm font-semibold">No matches scheduled for this date.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredFixtures.map((fixture) => {
                        const isFinished = ["FT", "AET", "PEN"].includes(fixture.status.short.toUpperCase());
                        const isLive = ["1H", "2H", "HT", "ET", "P", "BT"].includes(fixture.status.short.toUpperCase());

                        return (
                          <div
                            key={fixture.id}
                            className="bg-white border border-[#e2e8e4] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                          >
                            <div>
                              {/* Match Teams */}
                              <div className="space-y-3">
                                {/* Home */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={fixture.teams.home.logo}
                                      alt={fixture.teams.home.name}
                                      className="w-7 h-7 object-contain bg-slate-50 p-0.5 rounded border border-[#e2e8e4]/80"
                                    />
                                    <span className={`text-sm font-extrabold ${fixture.teams.home.winner ? "text-[#0b422d]" : "text-[#14261c]"}`}>
                                      {fixture.teams.home.name}
                                    </span>
                                  </div>
                                  {(isFinished || isLive) && (
                                    <span className="text-sm font-black text-[#14261c]">{fixture.goals.home}</span>
                                  )}
                                </div>

                                {/* Away */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={fixture.teams.away.logo}
                                      alt={fixture.teams.away.name}
                                      className="w-7 h-7 object-contain bg-slate-50 p-0.5 rounded border border-[#e2e8e4]/80"
                                    />
                                    <span className={`text-sm font-extrabold ${fixture.teams.away.winner ? "text-[#0b422d]" : "text-[#14261c]"}`}>
                                      {fixture.teams.away.name}
                                    </span>
                                  </div>
                                  {(isFinished || isLive) && (
                                    <span className="text-sm font-black text-[#14261c]">{fixture.goals.away}</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right / Bottom Info */}
                            <div className="mt-4 pt-3.5 border-t border-[#e2e8e4]/70 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-gray-400 font-bold uppercase">
                                  {fixture.league.round}
                                </span>
                                <span className="text-[9px] text-[#687a70] truncate max-w-[140px] mt-0.5">
                                  {fixture.venue.name}, {fixture.venue.city}
                                </span>
                              </div>

                              <div className="text-right flex flex-col items-end">
                                {isLive ? (
                                  <span className="bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    LIVE {fixture.status.elapsed}'
                                  </span>
                                ) : isFinished ? (
                                  <span className="text-[9px] font-black text-gray-400 uppercase">FINAL</span>
                                ) : (
                                  <span className="text-[10px] font-extrabold text-[#0b422d]">
                                    {new Date(fixture.date).toLocaleTimeString("en-IN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true
                                    })}
                                  </span>
                                )}
                                <span className="text-[10px] font-black italic text-[#14261c] mt-0.5">FOX</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* STANDINGS TAB */}
              {activeTab === "STANDINGS" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.keys(groupStandings).map((groupName) => {
                    const standingsList = groupStandings[groupName];
                    return (
                      <div
                        key={groupName}
                        className="bg-white border border-[#e2e8e4] rounded-2xl overflow-hidden shadow-sm"
                      >
                        <div className="bg-[#fafaf7] border-b border-[#e2e8e4] px-4 py-3">
                          <h3 className="text-xs font-bold tracking-wider text-[#14261c] uppercase">
                            {groupName}
                          </h3>
                        </div>
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-[#e2e8e4] text-[#687a70] font-semibold bg-[#fafaf7]/40">
                              <th className="py-2 px-3 text-center w-8">#</th>
                              <th className="py-2 px-2">Team</th>
                              <th className="py-2 px-2 text-center">P</th>
                              <th className="py-2 px-2 text-center">W</th>
                              <th className="py-2 px-2 text-center">GD</th>
                              <th className="py-2 px-3 text-center font-bold">Pts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {standingsList.map((row, idx) => (
                              <tr key={row.team.id} className="border-b border-[#e2e8e4]/65 hover:bg-[#fafaf7]/45">
                                <td className="py-2.5 px-3 text-center font-bold text-gray-400">{row.rank}</td>
                                <td className="py-2.5 px-2 font-bold text-[#14261c]">
                                  <div className="flex items-center gap-2">
                                    <img src={row.team.logo} alt={row.team.name} className="w-4 h-4 object-contain" />
                                    <span>{row.team.name}</span>
                                  </div>
                                </td>
                                <td className="py-2.5 px-2 text-center">{row.all?.played ?? 0}</td>
                                <td className="py-2.5 px-2 text-center">{row.all?.win ?? 0}</td>
                                <td className="py-2.5 px-2 text-center font-semibold">{row.goalsDiff}</td>
                                <td className="py-2.5 px-3 text-center font-extrabold text-[#0b422d]">{row.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VIDEOS TAB */}
              {activeTab === "VIDEOS" && (
                <div className="space-y-6">
                  {/* Active Video Player */}
                  <div className="bg-white border border-[#e2e8e4] rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-video w-full bg-black relative group">
                      <iframe
                        id="youtube-player-active"
                        src={`https://www.youtube.com/embed/${activeVideo.id}?enablejsapi=1&autoplay=1&mute=1&controls=0&rel=0`}
                        title={activeVideo.title}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      
                      {/* Custom Mute/Unmute Overlay Button */}
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-2 bg-black/75 hover:bg-black/90 text-white text-xs font-bold rounded-full border border-white/15 backdrop-blur-sm transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        {isMuted ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                            </svg>
                            UNMUTE
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.063.922-2.063 2.063v4.875c0 1.141.922 2.062 2.063 2.062h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.563 12c0-2.183-1.324-4.05-3.188-4.875v9.75c1.864-.825 3.188-2.692 3.188-4.875z" />
                              <path d="M21 12c0-3.827-2.324-7.1-5.625-8.438v16.876C18.676 19.1 21 15.827 21 12z" />
                            </svg>
                            MUTE
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-black text-[#0b422d] tracking-widest bg-[#0b422d]/5 px-2.5 py-1 rounded border border-[#0b422d]/10 uppercase">
                        {activeVideo.category}
                      </span>
                      <h3 className="text-xl font-bold text-[#14261c] mt-3 leading-snug">
                        {activeVideo.title}
                      </h3>
                      <p className="text-sm text-[#5c7063] mt-1.5 leading-relaxed">
                        {activeVideo.description}
                      </p>
                    </div>
                  </div>

                  {/* Video Grid Selection */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-[#14261c] uppercase tracking-wider">
                      More Videos
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {FIFA_VIDEOS.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => {
                            setActiveVideo(video);
                            window.scrollTo({ top: 250, behavior: "smooth" });
                          }}
                          className={`bg-white border rounded-2xl overflow-hidden p-3 text-left transition-all flex items-start gap-3 shadow-xs hover:shadow-md cursor-pointer ${activeVideo.id === video.id
                            ? "border-[#0b422d] ring-2 ring-[#0b422d]/10"
                            : "border-[#e2e8e4] hover:border-gray-400"
                            }`}
                        >
                          <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-grow min-w-0">
                            <span className="text-[9px] font-black text-[#0b422d] tracking-widest uppercase">
                              {video.category}
                            </span>
                            <h5 className="text-xs font-bold text-[#14261c] mt-1 leading-snug line-clamp-2">
                              {video.title}
                            </h5>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STATS TAB */}
              {activeTab === "STATS" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-[#14261c] border-b border-[#e2e8e4] pb-2 uppercase">
                    GOLDEN BOOT RACE
                  </h3>
                  <div className="bg-white border border-[#e2e8e4] rounded-2xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-[#e2e8e4]/60">
                      {topScorers.map((scorer) => (
                        <div key={scorer.name} className="px-6 py-4.5 flex items-center justify-between hover:bg-[#fafaf7]/50">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-gray-400 w-5 text-center">{scorer.rank}</span>
                            <img src={scorer.photo} alt={scorer.name} className="w-10 h-10 rounded-lg object-cover bg-slate-50 border border-[#e2e8e4]" />
                            <div>
                              <h5 className="text-sm font-extrabold text-[#14261c]">{scorer.name}</h5>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-0.5">
                                <img src={scorer.teamLogo} alt={scorer.teamName} className="w-3 h-3 object-contain" />
                                <span>{scorer.teamName}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-right">
                              <span className="text-[9px] text-gray-400 block uppercase font-bold">Assists</span>
                              <span className="text-xs font-semibold text-[#14261c]">{scorer.assists}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] text-gray-400 block uppercase font-bold">Goals</span>
                              <span className="text-base font-black text-[#0b422d]">{scorer.goals}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT TAB */}
              {activeTab === "ABOUT" && (
                <div className="bg-white border border-[#e2e8e4] rounded-3xl p-6 shadow-sm space-y-4 text-sm leading-relaxed text-[#5c7063]">
                  <h3 className="text-lg font-bold text-[#14261c] uppercase">TOURNAMENT OVERVIEW</h3>
                  <p>
                    The 2026 FIFA World Cup™ is the 23rd edition of the biggest sporting event on the planet. Co-hosted by Canada, Mexico, and the United States, it is the first tournament to feature an expanded 48-team format.
                  </p>
                  <p>
                    A total of 104 matches will be played across 16 iconic host cities, culminating in the World Cup Final.
                  </p>
                  <h4 className="font-bold text-[#14261c] mt-4">HOST CITIES</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">Vancouver, BC</div>
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">Toronto, ON</div>
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">Mexico City</div>
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">Monterrey</div>
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">Los Angeles, CA</div>
                    <div className="bg-[#fafaf7] p-2 rounded-lg border border-[#e2e8e4]/60">New York/New Jersey</div>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Sidebar (About the World Cup & Trophy Image) */}
            <div className="space-y-8">

              {/* About Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold tracking-tight text-[#14261c] font-serif uppercase border-b border-[#e2e8e4] pb-3">
                  ABOUT THE 2026 WORLD CUP
                </h3>
                <p className="text-sm text-[#5c7063] leading-relaxed">
                  The 2026 FIFA World Cup™ in North America is the 23rd edition of the biggest sporting event on the planet. The tournament is already full of firsts as it is the first to feature 48 teams and to be co-hosted by three countries (United States, Canada, and Mexico).
                </p>
                <p className="text-sm text-[#5c7063] leading-relaxed">
                  The FOX Sports app is your complete home for World Cup content, including live scores, highlights, commentary and analysis, and full-match replays.
                </p>
              </div>

              {/* FIFA Image Card */}
              <div className="bg-white border border-[#e2e8e4] rounded-2xl overflow-hidden shadow-sm relative group">
                <div className="aspect-[4/3] w-full bg-[#fafaf7] relative overflow-hidden flex items-center justify-center">
                  <img
                    src="/fifa.png"
                    alt="FIFA World Cup 2026"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"></div>

                  {/* Caption */}
                  {/* <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h4 className="text-white text-base font-serif font-bold mt-1 shadow-sm">
                      FIFA WORLD CUP 2026
                    </h4>
                  </div> */}
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
