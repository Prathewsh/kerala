import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";

const getCategoryIcon = (cat: string) => {
  switch(cat) {
    case "Hill Station": return "⛰️";
    case "Beach": return "🏖️";
    case "Backwaters": return "⛵";
    case "Heritage & Fort": return "🏰";
    case "Wildlife & Nature": return "🌲";
    default: return "📍";
  }
};

interface MapMarkerItem {
  id: string;
  name: string;
  lat: number;
  lng: number;
  icon: string;
  category: string;
  desc: string;
  locationName: string;
}

// Famous Places in Kerala
const famousPlaces: MapMarkerItem[] = [
  {
    id: "munnar",
    name: "Munnar",
    lat: 10.0889,
    lng: 77.0595,
    icon: "⛰️",
    category: "Hill Station",
    locationName: "Idukki",
    desc: "Breathtaking tea gardens, winding roads, mist-covered valleys, and Anamudi, the highest peak in South India."
  },
  {
    id: "alleppey",
    name: "Alappuzha Backwaters",
    lat: 9.4981,
    lng: 76.3388,
    icon: "⛵",
    category: "Backwaters",
    locationName: "Alappuzha",
    desc: "The 'Venice of the East', world-famous for its tranquil network of canals, lagoons, and traditional houseboat cruises."
  },
  {
    id: "wayanad",
    name: "Wayanad Hills",
    lat: 11.6854,
    lng: 76.1320,
    icon: "🌲",
    category: "Wildlife & Nature",
    locationName: "Wayanad",
    desc: "A spice-scented highland region home to waterfalls, ancient Edakkal Caves, wildlife sanctuaries, and lush forests."
  },
  {
    id: "fort_kochi",
    name: "Fort Kochi",
    lat: 9.9682,
    lng: 76.2441,
    icon: "⚓",
    category: "Heritage & Fort",
    locationName: "Kochi",
    desc: "A historic coastal town renowned for its giant Chinese fishing nets, colonial architecture, and spice markets."
  },
  {
    id: "varkala",
    name: "Varkala Cliff Beach",
    lat: 8.7379,
    lng: 76.7056,
    icon: "🏖️",
    category: "Beach",
    locationName: "Trivandrum",
    desc: "Stunning red laterite cliffs bordering the Arabian Sea, unique natural mineral springs, and a vibrant cliffside culture."
  },
  {
    id: "kovalam",
    name: "Kovalam Beach",
    lat: 8.4004,
    lng: 76.9787,
    icon: "🌊",
    category: "Beach",
    locationName: "Trivandrum",
    desc: "A world-famous crescent beach dominated by a striped red-and-white lighthouse, offering calm waters and palm groves."
  },
  {
    id: "thekkady",
    name: "Periyar National Park",
    lat: 9.6015,
    lng: 77.1611,
    icon: "🐘",
    category: "Wildlife & Nature",
    locationName: "Thekkady",
    desc: "A protected tiger and elephant reserve centered around a scenic lake, offering jungle safaris and bamboo rafting."
  },
  {
    id: "athirappilly",
    name: "Athirappilly Waterfalls",
    lat: 10.2736,
    lng: 76.5404,
    icon: "💦",
    category: "Wildlife & Nature",
    locationName: "Thrissur",
    desc: "Kerala's largest and most majestic waterfall, cascading down 80 feet through dense rainforests; often called the 'Niagara of India'."
  },
  {
    id: "bekal_fort",
    name: "Bekal Fort",
    lat: 12.3916,
    lng: 75.0354,
    icon: "🏰",
    category: "Heritage & Fort",
    locationName: "Kasaragod",
    desc: "A massive, keyhole-shaped 17th-century fort rising directly from the beach, offering panoramic ocean views."
  },
  {
    id: "vagamon",
    name: "Vagamon Meadows",
    lat: 9.6878,
    lng: 76.9048,
    icon: "🍃",
    category: "Hill Station",
    locationName: "Kottayam",
    desc: "A serene, untouched hill station featuring grassy green meadows, pine forests, tea estates, and paragliding adventure spots."
  },
  {
    id: "kumarakom",
    name: "Kumarakom Bird Sanctuary",
    lat: 9.5937,
    lng: 76.4253,
    icon: "🦩",
    category: "Backwaters",
    locationName: "Kottayam",
    desc: "A beautiful peninsula on Vembanad Lake hosting migratory birds, luxury lake resorts, and traditional canoe rides."
  },
  {
    id: "ponmudi",
    name: "Ponmudi Hills",
    lat: 8.7601,
    lng: 77.1158,
    icon: "☁️",
    category: "Hill Station",
    locationName: "Trivandrum",
    desc: "Known as the 'Golden Peak', a quiet hill station reached via 22 winding hairpin turns, offering cool mountain mist and trekking."
  },
  {
    id: "jatayu",
    name: "Jatayu Earth's Center",
    lat: 8.8659,
    lng: 76.8672,
    icon: "🦅",
    category: "Heritage & Fort",
    locationName: "Kollam",
    desc: "World's largest bird sculpture, built on a massive rock. Dedicated to the legendary bird Jatayu from Ramayana, featuring adventure sports."
  },
  {
    id: "muzhappilangad",
    name: "Muzhappilangad Drive-in Beach",
    lat: 11.7962,
    lng: 75.4420,
    icon: "🚗",
    category: "Beach",
    locationName: "Kannur",
    desc: "Asia's longest drive-in beach, where you can drive your vehicle directly on the firm sand along the shoreline."
  },
  {
    id: "poovar",
    name: "Poovar Island",
    lat: 8.3175,
    lng: 77.0714,
    icon: "🏝️",
    category: "Backwaters",
    locationName: "Trivandrum",
    desc: "A beautiful coastal village where the river, lake, and sea meet, famous for its floating cottages and golden sand beach."
  },
  {
    id: "silent_valley",
    name: "Silent Valley National Park",
    lat: 11.1330,
    lng: 76.4670,
    icon: "🐒",
    category: "Wildlife & Nature",
    locationName: "Palakkad",
    desc: "A pristine, untouched evergreen rainforest home to rare flora and fauna, including the endangered Lion-tailed Macaque."
  },
  {
    id: "nelliyampathy",
    name: "Nelliyampathy Hills",
    lat: 10.5349,
    lng: 76.6933,
    icon: "🍊",
    category: "Hill Station",
    locationName: "Palakkad",
    desc: "A scenic hill station surrounded by orange orchards, tea estates, and the majestic Kesavan Para viewpoint."
  },
  {
    id: "kappad",
    name: "Kappad Beach",
    lat: 11.3812,
    lng: 75.7188,
    icon: "⛵",
    category: "Beach",
    locationName: "Kozhikode",
    desc: "The historic beach where Portuguese explorer Vasco da Gama landed in 1498, marking the beginning of the spice route."
  },
  {
    id: "ranipuram",
    name: "Ranipuram Hills",
    lat: 12.4255,
    lng: 75.3611,
    icon: "🥾",
    category: "Hill Station",
    locationName: "Kasaragod",
    desc: "Often compared to Ooty, it is famous for its beautiful trekking trails, green meadows, and wild elephant sightings."
  },
  {
    id: "ashtamudi",
    name: "Ashtamudi Lake",
    lat: 8.9482,
    lng: 76.6025,
    icon: "🚣",
    category: "Backwaters",
    locationName: "Kollam",
    desc: "A scenic palm-shaped lake, the second-largest in Kerala, serving as the gateway to the world-famous backwaters."
  },
  {
    id: "gavi",
    name: "Gavi Eco-Tourism",
    lat: 9.4372,
    lng: 77.1654,
    icon: "🛶",
    category: "Wildlife & Nature",
    locationName: "Pathanamthitta",
    desc: "A pristine forest eco-tourism village famous for its rich wildlife, boating, trekking, and bird-watching."
  },
  {
    id: "thrissur_pooram",
    name: "Vadakkumnathan Temple",
    lat: 10.5276,
    lng: 76.2144,
    icon: "🛕",
    category: "Heritage & Fort",
    locationName: "Thrissur",
    desc: "A classic 1000-year-old Kerala style temple at the cultural capital's heart, host of the world-famous Thrissur Pooram festival."
  }
];

export default function MapViewPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRefs = useRef<{ [key: string]: any }>({});
  
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlaces, setShowPlaces] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Legend Subcategory Filters
  const [selectedPlaceCats, setSelectedPlaceCats] = useState<string[]>([
    "Hill Station", "Beach", "Backwaters", "Heritage & Fort", "Wildlife & Nature"
  ]);

  // Handle Place Category Toggles
  const togglePlaceCat = (cat: string) => {
    setSelectedPlaceCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Check if Leaflet is loaded
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    const interval = setInterval(() => {
      if ((window as any).L) {
        setLeafletLoaded(true);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Filter Markers based on Search and Legend Checkboxes
  const filteredMarkers = famousPlaces.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (!matchesSearch) return false;
    return showPlaces && selectedPlaceCats.includes(item.category);
  });

  // 1. Initialize Map once
  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: true
      }).setView([10.25, 76.3], 7.5);

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CartoDB</a>'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Fetch and draw Kerala state boundary outline
      fetch("https://raw.githubusercontent.com/subhashb/kerala-geojson/master/kerala.geojson")
        .then(res => res.json())
        .then(data => {
          if (mapInstanceRef.current) {
            L.geoJSON(data, {
              style: {
                color: "#0b422d",
                weight: 4.5,
                opacity: 0.95,
                fillColor: "#0b422d",
                fillOpacity: 0.08,
              }
            }).addTo(mapInstanceRef.current);
          }
        })
        .catch(err => console.error("Could not load Kerala GeoJSON outline:", err));

      // Crucial Fix: Invalidate size after map renders to prevent partially loaded map tiles
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // 2. Draw Markers when map is ready or filters change
  useEffect(() => {
    if (!leafletLoaded || !mapInstanceRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markerRefs.current).forEach(marker => {
      map.removeLayer(marker);
    });
    markerRefs.current = {};

    // Add new filtered markers
    filteredMarkers.forEach(item => {
      const iconHtml = `
        <div class="flex items-center justify-center w-10 h-10 rounded-2xl bg-white shadow-md border-2 transition-transform duration-200 hover:scale-110" 
             style="border-color: #0b422d; pointer-events: auto;">
          <span style="pointer-events: none; font-size: 22px; display: block; line-height: 1;">${item.icon}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "custom-map-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      const popupContent = `
        <div class="p-3 font-sans max-w-[240px]">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="text-xl">${item.icon}</span>
            <div>
              <h4 class="font-bold text-[#14261c] text-sm m-0">${item.name}</h4>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-[9px] font-bold px-1.5 py-0.2 bg-gray-100 rounded text-gray-600">${item.locationName}</span>
                <span class="text-[9px] font-bold text-[#687a70] uppercase tracking-wider">${item.category}</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-[#4a5e52] leading-relaxed mb-3">${item.desc}</p>
          <span class="inline-flex items-center justify-center bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-2 rounded-lg w-full text-center">
            📍 Tourism Landmark
          </span>
        </div>
      `;

      const marker = L.marker([item.lat, item.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(popupContent, {
          closeButton: false,
          className: "custom-leaflet-popup"
        });

      markerRefs.current[item.id] = marker;
    });
  }, [leafletLoaded, filteredMarkers]);

  // Adjust size on window resize
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletLoaded) return;
    const handleResize = () => {
      mapInstanceRef.current.invalidateSize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [leafletLoaded]);

  // Click handler to pan map and open popup from sidebar
  const focusOnItem = (item: MapMarkerItem) => {
    if (!mapInstanceRef.current || !leafletLoaded) return;
    const map = mapInstanceRef.current;
    
    map.setView([item.lat, item.lng], 10, { animate: true, duration: 1 });
    
    const marker = markerRefs.current[item.id];
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 800);
    }
  };

  return (
    <main className="h-screen flex flex-col bg-[#fafaf7] text-[#1a2e22] font-sans overflow-hidden relative">
      <Header className="max-w-none border-b border-gray-150 bg-white !py-4" />

      {/* Map Main Viewport */}
      <div className="flex-1 relative min-h-0 w-full z-0">
        
        {/* Leaflet Map Canvas (Takes 100% of the viewport under header) */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Sidebar Card (z-index overlay on top of the map) */}
        <div 
          className={`absolute top-6 left-6 z-[1000] bg-white/95 backdrop-blur-md border border-[#e2e8e4]/80 rounded-3xl shadow-2xl transition-all duration-300 flex flex-col ${
            isSidebarCollapsed 
              ? "w-14 h-14 p-0 items-center justify-center overflow-hidden" 
              : "w-96 max-h-[calc(100vh-140px)] p-6"
          }`}
        >
          {isSidebarCollapsed ? (
            // Collapsed Toggle Button
            <button 
              onClick={() => setIsSidebarCollapsed(false)}
              className="w-full h-full flex items-center justify-center text-[#0b422d] hover:bg-gray-50 transition-colors cursor-pointer"
              title="Expand Explorer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          ) : (
            // Full Sidebar Content
            <div className="flex flex-col gap-5 overflow-hidden h-full flex-1">
              
              {/* Header inside Sidebar */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#14261c]">
                    Everything Kerala Map
                  </h2>
                  <p className="text-[10px] text-[#687a70] font-semibold mt-0.5">
                    Landmarks and famous attractions.
                  </p>
                </div>
                
                {/* Collapse Button */}
                <button 
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-[#687a70] hover:text-[#14261c] transition-colors cursor-pointer"
                  title="Collapse Explorer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search landmarks..."
                  className="w-full bg-[#fafaf7] border border-[#e2e8e4] rounded-xl px-4 py-2.5 text-xs text-[#1a2e22] placeholder-[#8a9e91] focus:outline-none focus:ring-2 focus:ring-[#135c3c]/15 focus:border-[#135c3c]"
                />
              </div>

              {/* Scrollable Filters & Lists */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5 custom-scrollbar">
                
                {/* Interactive Legend: Famous Places */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-[#14261c] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0b422d] inline-block" />
                      Famous Places
                    </span>
                    <button 
                      onClick={() => {
                        if (showPlaces) {
                          setShowPlaces(false);
                        } else {
                          setShowPlaces(true);
                          setSelectedPlaceCats(["Hill Station", "Beach", "Backwaters", "Heritage & Fort", "Wildlife & Nature"]);
                        }
                      }}
                      className="text-[10px] font-bold text-[#0b422d] hover:underline cursor-pointer"
                    >
                      {showPlaces ? "Hide All" : "Show All"}
                    </button>
                  </div>

                  {showPlaces && (
                    <div className="grid grid-cols-2 gap-2">
                      {["Hill Station", "Beach", "Backwaters", "Heritage & Fort", "Wildlife & Nature"].map(cat => {
                        const isSelected = selectedPlaceCats.includes(cat);
                        return (
                          <button
                            key={cat}
                            onClick={() => togglePlaceCat(cat)}
                            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? "bg-emerald-50/60 border-[#0b422d]/35 text-[#0b422d] font-bold shadow-sm"
                                : "bg-[#fafaf7]/50 border-gray-150 text-[#687a70] hover:bg-[#fafaf7] hover:border-gray-200"
                            }`}
                          >
                            <span className="text-xs select-none">{getCategoryIcon(cat)}</span>
                            <span className="text-[10px] font-semibold tracking-tight leading-none truncate">{cat}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Match Results List */}
                <div className="border-t border-gray-100 pt-4 flex-1 flex flex-col">
                  <h3 className="text-[10px] font-bold text-[#14261c] uppercase tracking-wider mb-2">
                    Matching Locations ({filteredMarkers.length})
                  </h3>
                  <div className="flex-col gap-1.5 flex max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredMarkers.length === 0 ? (
                      <span className="text-[11px] text-gray-400 italic">No spots match your filters.</span>
                    ) : (
                      filteredMarkers.map(item => (
                        <button
                          key={item.id}
                          onClick={() => focusOnItem(item)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#fafaf7] border border-transparent hover:border-[#e2e8e4]/60 text-left transition-all group cursor-pointer"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#fafaf7] border border-gray-150 flex items-center justify-center text-sm flex-shrink-0 group-hover:bg-white transition-colors">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-[11px] text-[#14261c] truncate group-hover:text-[#0b422d] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[9px] text-[#687a70] font-semibold block">
                              {item.locationName} &bull; {item.category}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom attribution inside sidebar */}
              <div className="pt-3 border-t border-gray-100 text-[9px] font-semibold text-gray-400 text-center">
                Everything Kerala Map &copy; {new Date().getFullYear()}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Map Custom Styling */}
      <style>{`
        /* Custom styling for Leaflet Popups */
        .custom-leaflet-popup .leaflet-popup-content-wrapper {
          background: #fafaf7;
          border: 1px solid #e2e8e4;
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 10px 30px rgba(11, 66, 45, 0.08);
        }
        .custom-leaflet-popup .leaflet-popup-content {
          margin: 0;
        }
        .custom-leaflet-popup .leaflet-popup-tip {
          background: #fafaf7;
          border-left: 1px solid #e2e8e4;
          border-bottom: 1px solid #e2e8e4;
          box-shadow: none;
        }
        .custom-map-marker {
          background: transparent !important;
          border: none !important;
        }
        /* Custom zoom controls alignment */
        .leaflet-top.leaflet-right {
          top: 24px;
          right: 24px;
        }
        .leaflet-bar {
          border: 1px solid #e2e8e4 !important;
          box-shadow: 0 10px 25px rgba(11, 66, 45, 0.06) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-bar a {
          background-color: rgba(255, 255, 255, 0.95) !important;
          color: #14261c !important;
          border-bottom: 1px solid #e2e8e4 !important;
          width: 38px !important;
          height: 38px !important;
          line-height: 38px !important;
          font-weight: bold !important;
          transition: background-color 0.2s;
        }
        .leaflet-bar a:hover {
          background-color: #fafaf7 !important;
          color: #0b422d !important;
        }
        /* Custom thin scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8e4;
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </main>
  );
}
