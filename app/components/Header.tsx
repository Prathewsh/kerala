import { AlertBanner } from "./AlertBanner";

export function Header({ className = "" }: { className?: string }) {
  return (
    <>
      <AlertBanner />
      <header className={`relative z-20 w-full ${className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
      {/* Brand Logo */}
      <a href="/" className="flex items-center gap-3 no-underline cursor-pointer">
        {/* Custom Leaf SVG */}
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 flex-shrink-0">
          {/* Light green leaf */}
          <path 
            d="M16 4C9 4 6 9 6 16C6 21 10 24 15 24C15 24 16.5 21.5 16.5 19C16.5 16.5 14 14 14 10C14 6 16 4 16 4Z" 
            fill="#8cb83e" 
          />
          {/* Dark green leaf */}
          <path 
            d="M15 12C21 12 24 15 24 21C24 25 20 27 16 27C16 27 14.5 25 14.5 22.5C14.5 20 16.5 18.5 16.5 15C16.5 12.5 15 12 15 12Z" 
            fill="#0b422d" 
          />
        </svg>
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0b422d]">
          Everything Kerala
        </span>
      </a>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <a href="/" className="text-sm font-semibold text-[#687a70] hover:text-[#0b422d] transition-colors py-2">
          Home
        </a>
        <a href="/#categories" className="text-sm font-semibold text-[#687a70] hover:text-[#0b422d] transition-colors py-2">
          Categories
        </a>
        <a href="/#featured-apps" className="text-sm font-semibold text-[#687a70] hover:text-[#0b422d] transition-colors py-2">
          Featured Apps
        </a>
        <a href="/map" className="text-sm font-semibold text-[#687a70] hover:text-[#0b422d] transition-colors py-2">
          Interactive Map
        </a>
        <a 
          href="/news" 
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 no-underline cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          Live News
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button className="p-2.5 text-[#4a5e52] hover:text-[#0b422d] hover:bg-white/85 rounded-xl transition-all border border-[#e2e8e4] bg-white/50 shadow-sm cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button className="bg-[#0b422d] hover:bg-[#073020] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow shadow-[#0b422d]/10 cursor-pointer">
          Sign In
        </button>
      </div>
    </div>
  </header>
  </>
  );
}
