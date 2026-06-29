export function Footer() {
  return (
    <footer className="bg-[#fafaf7] border-t border-gray-150 relative z-10">
      {/* Top Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
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
            </div>
            <p className="text-sm text-[#4a5e52]/90 leading-relaxed max-w-xs font-medium">
              The digital hub for Kerala. Discover open-source projects, community tools, and local services.
            </p>
          </div>

          {/* Links Column 1: Explore */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#14261c] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Apps
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: For Developers */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#14261c] uppercase tracking-wider">
              For Developers
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Submit an App
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Developer Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Resources */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#14261c] uppercase tracking-wider">
              Resources
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#687a70] hover:text-[#0b422d] font-semibold transition-colors">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#14261c] uppercase tracking-wider">
              Follow us
            </h4>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-[#f4f6f4] hover:bg-[#0b422d]/10 text-[#4a5e52] hover:text-[#0b422d] flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#f4f6f4] hover:bg-[#0b422d]/10 text-[#4a5e52] hover:text-[#0b422d] flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.796.056 1.03.047 1.766.203 2.47.475.762.296 1.39.69 2.016 1.315.625.625 1.02 1.252 1.315 2.016.272.704.428 1.44.475 2.47.047 1.01.056 1.366.056 3.796v.184c0 2.43-.01 2.783-.056 3.796-.047 1.03-.203 1.766-.475 2.47a6.058 6.058 0 01-1.315 2.016c-.625.625-1.252 1.02-2.016 1.315-.704.272-1.44.428-2.47.475-1.01.047-1.366.056-3.796.056h-.184c-2.43 0-2.783-.01-3.796-.056-1.03-.047-1.766-.203-2.47-.475a6.058 6.058 0 01-2.016-1.315c-.625-.625-1.02-1.252-1.315-2.016-.272-.704-.428-1.44-.475-2.47C2.01 14.714 2 14.358 2 11.928v-.184c0-2.43.01-2.784.056-3.796.047-1.03.203-1.766.475-2.47A6.058 6.058 0 013.84 3.84c.625-.625 1.252-1.02 2.016-1.315.704-.272 1.44-.428 2.47-.475C9.336 2.01 9.69 2 12.12 2h.195zM12.004 4.18c-2.385 0-2.678.01-3.62.054-.93.04-1.423.188-1.758.32a3.993 3.993 0 00-1.455.947 3.993 3.993 0 00-.947 1.455c-.13.334-.277.827-.32 1.758-.04.943-.053 1.236-.053 3.62s.01 2.678.053 3.62c.04.93.188 1.423.32 1.758.223.58.552 1.082.947 1.455.373.395.875.724 1.455.947.334.13.827.277 1.758.32.942.04 1.236.053 3.62.053s2.678-.01 3.62-.053c.93-.04 1.423-.188 1.758-.32.58-.223 1.082-.552 1.455-.947.395-.373.724-.875.947-1.455.13-.334.277-.827.32-1.758.04-.942.053-1.236.053-3.62s-.01-2.678-.053-3.62c-.04-.93-.188-1.423-.32-1.758a3.993 3.993 0 00-.947-1.455 3.993 3.993 0 00-.947-.947c-.334-.13-.827-.277-1.758-.32-.942-.04-1.236-.053-3.62-.053zM12.004 7.037a4.963 4.963 0 100 9.926 4.963 4.963 0 000-9.926zm0 2.035a2.927 2.927 0 110 5.854 2.927 2.927 0 010-5.854zm5.278-.205a1.187 1.187 0 11-2.373 0 1.187 1.187 0 012.373 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#f4f6f4] hover:bg-[#0b422d]/10 text-[#4a5e52] hover:text-[#0b422d] flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.68 22 12 22 12s0 3.32-.42 4.814a2.504 2.504 0 01-1.768 1.768c-1.494.42-4.814.42-4.814.42s-3.32 0-4.814-.42a2.503 2.503 0 01-1.768-1.768C8 15.32 8 12 8 12s0-3.32.42-4.814a2.503 2.503 0 011.768-1.768C11.68 5 15 5 15 5s3.32 0 4.812.418zM13.5 15l4.5-3-4.5-3v6z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#f4f6f4] hover:bg-[#0b422d]/10 text-[#4a5e52] hover:text-[#0b422d] flex items-center justify-center transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#687a70]">
          <p>© {new Date().getFullYear()} Everything Kerala. An open-source initiative built by Keralites, for Keralites.</p>
          <p className="flex items-center gap-1.5">
            Made with <span className="text-red-500 text-sm">❤️</span> in Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
