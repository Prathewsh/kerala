import { useState, useEffect } from "react";

interface AlertItem {
  label: string;
  text: string;
  link: string;
}

export function AlertBanner() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  // Fetch live news from API
  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/news");
        if (!res.ok) throw new Error("Failed to fetch news alerts");
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const mappedAlerts = data.items.map((item: any) => ({
            label: item.source || "News Update",
            text: item.title || "",
            link: item.link || "#",
          }));
          setAlerts(mappedAlerts);
        }
      } catch (err) {
        console.error("Error fetching news alerts, using fallback:", err);
      }
    }
    fetchAlerts();
  }, []);

  // Initialize visibility from sessionStorage to persist dismissal during session
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("kerala_alert_dismissed");
    if (!isDismissed) {
      setIsAlertVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isAlertVisible || alerts.length <= 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
        setFade(true);
      }, 300); // Wait for fade out to complete
    }, 6000);
    return () => clearInterval(interval);
  }, [isAlertVisible, alerts.length]);

  const handleDismiss = () => {
    setIsAlertVisible(false);
    sessionStorage.setItem("kerala_alert_dismissed", "true");
  };

  if (!isAlertVisible || alerts.length === 0) return null;

  const currentAlert = alerts[currentAlertIndex];

  return (
    <>
      {/* Self-contained marquee animation styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-custom {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-custom:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="w-full bg-[#c00612] text-white py-2 relative z-30 flex items-center justify-between shadow-md select-none border-b border-red-800/10">
        
        {/* Mobile View: Scrolling Marquee */}
        <div className="flex-1 overflow-hidden sm:hidden relative flex items-center">
          <div className="flex whitespace-nowrap min-w-full">
            <div className="animate-marquee-custom flex items-center gap-8 pr-8">
              {alerts.map((alert, index) => (
                <a
                  key={`mob-1-${index}`}
                  href={alert.link}
                  className="inline-flex items-center gap-2 hover:underline text-white no-underline flex-shrink-0"
                >
                  <span className="bg-white/20 backdrop-blur-xs text-white font-extrabold text-[9px] tracking-widest px-2 py-0.5 rounded uppercase font-mono">
                    {alert.label}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide">
                    {alert.text}
                  </span>
                </a>
              ))}
            </div>
            <div className="animate-marquee-custom flex items-center gap-8 pr-8" aria-hidden="true">
              {alerts.map((alert, index) => (
                <a
                  key={`mob-2-${index}`}
                  href={alert.link}
                  className="inline-flex items-center gap-2 hover:underline text-white no-underline flex-shrink-0"
                >
                  <span className="bg-white/20 backdrop-blur-xs text-white font-extrabold text-[9px] tracking-widest px-2 py-0.5 rounded uppercase font-mono">
                    {alert.label}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wide">
                    {alert.text}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View: Fading Ticker */}
        <div className="hidden sm:flex flex-1 justify-center items-center overflow-hidden px-4">
          <a
            href={currentAlert.link}
            className={`inline-flex items-center gap-3 hover:underline text-white no-underline max-w-full transition-opacity duration-300 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="bg-white/20 backdrop-blur-xs text-white font-extrabold text-[9px] sm:text-[10px] tracking-widest px-2.5 py-0.5 rounded uppercase flex-shrink-0 animate-pulse font-mono">
              {currentAlert.label}
            </span>
            <span className="text-xs md:text-sm font-semibold tracking-wide truncate">
              {currentAlert.text}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 flex-shrink-0 opacity-85">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>
    </>
  );
}
