'use client';

import { useState } from 'react';

export default function CollapsibleNav({ navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed left-0 top-0 h-full bg-black/80 backdrop-blur-sm border-r border-zinc-800 z-50 transition-all duration-300 ease-in-out hidden md:block ${
          isExpanded ? 'w-64' : 'w-12'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800 relative">
            <h2 className={`text-xl text-zinc-300 font-display transition-all duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              Portfolio
            </h2>
            <span className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-zinc-300 font-display font-bold transition-all duration-300 ${
              isExpanded ? 'opacity-0' : 'opacity-100'
            }`}>
              P
            </span>
          </div>
          <ul className="flex flex-col p-6 space-y-4">
            {navigation.map((item) => (
              <li key={item.href} className="relative">
                <a
                  href={item.href}
                  className="text-lg duration-500 text-zinc-500 hover:text-zinc-300 transition-all block py-2 px-4 rounded-lg hover:bg-zinc-800/50 relative group"
                  title={isExpanded ? '' : item.name}
                >
                  <span className={`transition-all duration-300 ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {item.name}
                  </span>
                  <span className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-all duration-300 font-bold ${
                    isExpanded ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {item.name.charAt(0)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800 md:hidden">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl text-zinc-300 font-display">Portfolio</h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-300 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <ul className="flex flex-col p-4 space-y-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg duration-500 text-zinc-500 hover:text-zinc-300 transition-all block py-2 px-4 rounded-lg hover:bg-zinc-800/50"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
} 