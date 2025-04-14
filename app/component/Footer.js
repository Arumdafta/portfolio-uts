'use client';

import React from 'react';
import { Github, Instagram } from 'lucide-react';
import '../styles/theme.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {year} Arumdafta Nawa Hagiaza. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/Arumdafta" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://instagram.com/ranaz_za" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
