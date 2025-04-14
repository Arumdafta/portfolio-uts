'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Ambil dari localStorage langsung saat inisialisasi
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    );
  };

  if (!mounted) return null;

  return (
    <ThemeProvider>
      <nav className="navbar">
        <div className="navbar-left">
          <h1 className="navbar-title">
            <Link href="/">My Portfolio</Link>
          </h1>
        </div>

        <div className="navbar-center desktop-menu">
          <Link href="/about" className="navbar-link">About</Link>
          <Link href="/portfolio" className="navbar-link">Portfolio</Link>
          <Link href="/contact" className="navbar-link">Contact</Link>
          <Link href="/chatbot" className="navbar-link">Chatbot</Link>
        </div>

        <div className="navbar-right desktop-menu">
          <ThemeToggle />
        </div>

        <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {menuOpen && (
          <div className="mobile-dropdown-full">
            <Link href="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/portfolio" className="mobile-link" onClick={() => setMenuOpen(false)}>Portfolio</Link>
            <Link href="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link href="/chatbot" className="mobile-link" onClick={() => setMenuOpen(false)}>Chatbot</Link>
            <ThemeToggle />
          </div>
        )}
      </nav>
    </ThemeProvider>
  );
}
