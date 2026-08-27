import React from 'react';

export interface IllustrationProps {
  className?: string;
  variant?: 'boy' | 'girl';
}

export const HeroBanner: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 900 360" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hero-skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A90E2" />
        <stop offset="100%" stopColor="#87CEFA" />
      </linearGradient>
      <linearGradient id="hero-mountGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#43A047" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="hero-mountGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#66BB6A" />
        <stop offset="100%" stopColor="#388E3C" />
      </linearGradient>
      <linearGradient id="hero-sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFEB3B" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
    </defs>
    <rect width="900" height="360" fill="url(#hero-skyGrad)" />
    
    {/* Sun */}
    <circle cx="800" cy="80" r="50" fill="url(#hero-sunGrad)" />
    <g stroke="url(#hero-sunGrad)" strokeWidth="4" strokeLinecap="round">
      <line x1="800" y1="10" x2="800" y2="25" />
      <line x1="800" y1="135" x2="800" y2="150" />
      <line x1="730" y1="80" x2="745" y2="80" />
      <line x1="855" y1="80" x2="870" y2="80" />
      <line x1="750" y1="30" x2="760" y2="40" />
      <line x1="840" y1="120" x2="850" y2="130" />
      <line x1="750" y1="130" x2="760" y2="120" />
      <line x1="840" y1="40" x2="850" y2="30" />
    </g>

    {/* Distant Mountains */}
    <path d="M0 250 Q 150 150 300 250 T 600 250 T 900 250 L 900 360 L 0 360 Z" fill="url(#hero-mountGrad1)" opacity="0.8" />
    <path d="M-100 280 Q 100 180 350 280 T 700 260 T 1000 280 L 1000 360 L -100 360 Z" fill="url(#hero-mountGrad2)" opacity="0.9" />

    {/* Palm Trees */}
    <g transform="translate(50, 150)">
      <path d="M45 150 Q 55 100 50 50" fill="none" stroke="#795548" strokeWidth="8" />
      <g fill="#2E7D32">
        <path d="M50 50 Q 20 60 10 90 Q 30 70 50 50" />
        <path d="M50 50 Q 80 60 90 90 Q 70 70 50 50" />
        <path d="M50 50 Q 30 30 10 20 Q 40 30 50 50" />
        <path d="M50 50 Q 70 30 90 20 Q 60 30 50 50" />
        <path d="M50 50 Q 50 20 40 0 Q 60 10 50 50" />
      </g>
    </g>
    
    <g transform="translate(750, 180)">
      <path d="M45 120 Q 35 80 40 30" fill="none" stroke="#795548" strokeWidth="6" />
      <g fill="#2E7D32">
        <path d="M40 30 Q 10 40 0 70 Q 20 50 40 30" />
        <path d="M40 30 Q 70 40 80 70 Q 60 50 40 30" />
        <path d="M40 30 Q 20 10 0 0 Q 30 10 40 30" />
        <path d="M40 30 Q 60 10 80 0 Q 50 10 40 30" />
        <path d="M40 30 Q 40 0 30 -20 Q 50 -10 40 30" />
      </g>
    </g>

    {/* Classroom Building */}
    <g transform="translate(300, 200)">
      <rect x="0" y="40" width="300" height="120" fill="#FFF3E0" />
      <path d="M-20 40 L 150 0 L 320 40 Z" fill="#D84315" />
      {/* Windows */}
      <rect x="30" y="60" width="60" height="60" fill="#81D4FA" stroke="#455A64" strokeWidth="3" />
      <line x1="60" y1="60" x2="60" y2="120" stroke="#455A64" strokeWidth="3" />
      <line x1="30" y1="90" x2="90" y2="90" stroke="#455A64" strokeWidth="3" />
      
      <rect x="210" y="60" width="60" height="60" fill="#81D4FA" stroke="#455A64" strokeWidth="3" />
      <line x1="240" y1="60" x2="240" y2="120" stroke="#455A64" strokeWidth="3" />
      <line x1="210" y1="90" x2="270" y2="90" stroke="#455A64" strokeWidth="3" />

      {/* Door */}
      <rect x="120" y="70" width="60" height="90" fill="#795548" />
      <circle cx="130" cy="115" r="4" fill="#FFC107" />

      {/* Sign Board */}
      <rect x="100" y="25" width="100" height="25" fill="#FFECB3" stroke="#8D6E63" strokeWidth="2" />
      <path d="M 110 35 Q 120 30 130 35 T 150 35 T 170 35" fill="none" stroke="#3E2723" strokeWidth="2" />
      <path d="M 120 42 Q 130 38 140 42 T 160 42 T 180 42" fill="none" stroke="#3E2723" strokeWidth="2" />
    </g>

    {/* Students */}
    <g transform="translate(150, 270)">
      <circle cx="20" cy="10" r="10" fill="#5C4033" />
      <rect x="12" y="20" width="16" height="30" rx="5" fill="#1565C0" />
      <rect x="5" y="25" width="10" height="15" rx="3" fill="#E53935" /> {/* Backpack */}
      <path d="M 12 50 L 12 70 M 28 50 L 28 70" stroke="#5C4033" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g transform="translate(200, 280)">
      <circle cx="20" cy="10" r="9" fill="#5C4033" />
      <rect x="12" y="19" width="16" height="28" rx="5" fill="#E91E63" />
      <rect x="5" y="23" width="10" height="14" rx="3" fill="#4CAF50" />
      <path d="M 12 47 L 12 65 M 28 47 L 28 65" stroke="#5C4033" strokeWidth="4" strokeLinecap="round" />
    </g>
    <g transform="translate(250, 260)">
      <circle cx="20" cy="10" r="11" fill="#5C4033" />
      <rect x="12" y="21" width="16" height="32" rx="5" fill="#FF9800" />
      <rect x="5" y="26" width="10" height="16" rx="3" fill="#2196F3" />
      <path d="M 12 53 L 12 75 M 28 53 L 28 75" stroke="#5C4033" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Birds */}
    <g fill="none" stroke="#37474F" strokeWidth="2" strokeLinecap="round">
      <path d="M 200 80 Q 210 70 220 80 Q 230 70 240 80" />
      <path d="M 250 50 Q 260 40 270 50 Q 280 40 290 50" />
      <path d="M 320 90 Q 325 85 330 90 Q 335 85 340 90" />
      <path d="M 100 120 Q 115 105 130 120 Q 145 105 160 120" />
      <path d="M 600 70 Q 610 60 620 70 Q 630 60 640 70" />
    </g>

    {/* Animated Sparkles */}
    <g fill="#FFF" className="animate-pulse">
      <circle cx="450" cy="150" r="3" />
      <circle cx="500" cy="100" r="2" />
      <circle cx="350" cy="120" r="4" />
      <circle cx="700" cy="180" r="2.5" />
    </g>
  </svg>
);

export const OwlMascot: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 200 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="owl-bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8D6E63" />
        <stop offset="100%" stopColor="#5D4037" />
      </linearGradient>
      <linearGradient id="owl-bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>
      <linearGradient id="owl-capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFC107" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
      <filter id="owl-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
      </filter>
    </defs>
    
    <ellipse cx="100" cy="205" rx="50" ry="10" fill="rgba(0,0,0,0.2)" />
    
    {/* Feet & Branch */}
    <path d="M 30 195 Q 100 210 170 195" fill="none" stroke="#4E342E" strokeWidth="8" strokeLinecap="round" />
    <path d="M 85 190 L 80 200 M 90 190 L 90 200 M 95 190 L 100 200" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />
    <path d="M 105 190 L 100 200 M 110 190 L 110 200 M 115 190 L 120 200" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />

    {/* Wings */}
    <path d="M 50 100 Q 10 120 30 160 Q 50 140 60 120 Z" fill="url(#owl-bodyGrad)" />
    <path d="M 150 100 Q 190 120 170 160 Q 150 140 140 120 Z" fill="url(#owl-bodyGrad)" />
    <path d="M 35 130 L 45 140 M 40 145 L 50 155" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
    <path d="M 165 130 L 155 140 M 160 145 L 150 155" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />

    {/* Body */}
    <rect x="50" y="70" width="100" height="120" rx="50" fill="url(#owl-bodyGrad)" filter="url(#owl-shadow)" />
    <ellipse cx="100" cy="140" rx="35" ry="40" fill="url(#owl-bellyGrad)" />
    
    {/* Belly feathers */}
    <path d="M 85 130 Q 90 135 95 130 M 105 130 Q 110 135 115 130" fill="none" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" />
    <path d="M 80 145 Q 85 150 90 145 M 100 145 Q 105 150 110 145 M 110 145 Q 115 150 120 145" fill="none" stroke="#F57C00" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="75" cy="90" r="22" fill="#FFF" />
    <circle cx="125" cy="90" r="22" fill="#FFF" />
    <circle cx="75" cy="90" r="14" fill="#FFA000" />
    <circle cx="125" cy="90" r="14" fill="#FFA000" />
    <circle cx="75" cy="90" r="8" fill="#000" />
    <circle cx="125" cy="90" r="8" fill="#000" />
    <circle cx="72" cy="87" r="3" fill="#FFF" />
    <circle cx="122" cy="87" r="3" fill="#FFF" />

    {/* Beak */}
    <path d="M 95 105 L 105 105 L 100 120 Z" fill="#FF9800" />

    {/* Graduation Cap */}
    <path d="M 50 50 L 100 30 L 150 50 L 100 70 Z" fill="#212121" />
    <rect x="75" y="60" width="50" height="15" fill="#212121" />
    <circle cx="100" cy="50" r="4" fill="url(#owl-capGrad)" />
    <path d="M 100 50 Q 140 40 145 65" fill="none" stroke="url(#owl-capGrad)" strokeWidth="2" />
    <line x1="145" y1="65" x2="145" y2="80" stroke="url(#owl-capGrad)" strokeWidth="4" />

    {/* Book */}
    <g transform="translate(60, 150)">
      <path d="M 40 10 L 0 0 L 0 25 L 40 35 Z" fill="#E0E0E0" />
      <path d="M 40 10 L 80 0 L 80 25 L 40 35 Z" fill="#F5F5F5" />
      <path d="M 40 10 L 40 35" stroke="#9E9E9E" strokeWidth="2" />
      <path d="M 5 5 Q 15 10 35 15 M 5 12 Q 15 17 35 22 M 5 19 Q 15 24 35 29" fill="none" stroke="#757575" strokeWidth="1.5" />
      <path d="M 75 5 Q 65 10 45 15 M 75 12 Q 65 17 45 22 M 75 19 Q 65 24 45 29" fill="none" stroke="#757575" strokeWidth="1.5" />
    </g>
  </svg>
);

export const NatureScene: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 300 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nature-skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#81D4FA" />
        <stop offset="100%" stopColor="#E1F5FE" />
      </linearGradient>
      <linearGradient id="nature-hillGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#81C784" />
        <stop offset="100%" stopColor="#388E3C" />
      </linearGradient>
      <linearGradient id="nature-hillGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#AED581" />
        <stop offset="100%" stopColor="#43A047" />
      </linearGradient>
      <linearGradient id="nature-pondGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4DD0E1" />
        <stop offset="100%" stopColor="#00ACC1" />
      </linearGradient>
    </defs>
    <rect width="300" height="260" fill="url(#nature-skyGrad)" />
    
    {/* Sun Rays */}
    <g stroke="#FFF59D" strokeWidth="10" opacity="0.4">
      <line x1="0" y1="0" x2="300" y2="150" />
      <line x1="0" y1="0" x2="300" y2="80" />
      <line x1="0" y1="0" x2="150" y2="260" />
    </g>
    <circle cx="0" cy="0" r="50" fill="#FFF176" />

    {/* Hills */}
    <path d="M -50 150 Q 50 80 150 150 T 350 130 L 350 260 L -50 260 Z" fill="url(#nature-hillGrad1)" />
    <path d="M -20 180 Q 100 120 200 180 T 320 160 L 320 260 L -20 260 Z" fill="url(#nature-hillGrad2)" />

    {/* Elephant Silhouette */}
    <g transform="translate(200, 160)" fill="#546E7A">
      <ellipse cx="25" cy="20" rx="15" ry="12" />
      <circle cx="10" cy="15" r="8" />
      <path d="M 5 15 Q -5 20 -2 30 Q 2 35 5 25" />
      <ellipse cx="12" cy="15" rx="5" ry="8" />
      <rect x="15" y="25" width="4" height="10" rx="2" />
      <rect x="20" y="27" width="4" height="10" rx="2" />
      <rect x="30" y="27" width="4" height="10" rx="2" />
      <rect x="35" y="25" width="4" height="10" rx="2" />
    </g>

    {/* Large Tree */}
    <g transform="translate(100, 200)">
      <path d="M -10 0 Q -5 -40 0 -80 Q 5 -40 10 0 Z" fill="#5D4037" />
      <g fill="#2E7D32">
        <circle cx="0" cy="-100" r="30" />
        <circle cx="-25" cy="-80" r="25" />
        <circle cx="25" cy="-80" r="25" />
        <circle cx="-15" cy="-60" r="20" />
        <circle cx="15" cy="-60" r="20" />
        <circle cx="0" cy="-120" r="25" />
      </g>
      <g fill="#4CAF50">
        <circle cx="0" cy="-95" r="15" />
        <circle cx="-15" cy="-80" r="12" />
        <circle cx="15" cy="-80" r="12" />
      </g>
    </g>

    {/* Grass Strip */}
    <rect x="0" y="230" width="300" height="30" fill="#388E3C" />

    {/* Pond */}
    <ellipse cx="220" cy="240" rx="60" ry="15" fill="url(#nature-pondGrad)" />

    {/* Lotus Flowers */}
    <g transform="translate(190, 235)">
      <path d="M 0 5 Q -10 -5 0 -10 Q 10 -5 0 5 Z" fill="#F48FB1" />
      <path d="M 0 5 Q -15 0 -10 -8 Q -5 0 0 5 Z" fill="#F06292" />
      <path d="M 0 5 Q 15 0 10 -8 Q 5 0 0 5 Z" fill="#F06292" />
      <ellipse cx="0" cy="6" rx="8" ry="3" fill="#4CAF50" />
    </g>
    <g transform="translate(240, 242) scale(0.8)">
      <path d="M 0 5 Q -10 -5 0 -10 Q 10 -5 0 5 Z" fill="#F48FB1" />
      <path d="M 0 5 Q -15 0 -10 -8 Q -5 0 0 5 Z" fill="#F06292" />
      <path d="M 0 5 Q 15 0 10 -8 Q 5 0 0 5 Z" fill="#F06292" />
      <ellipse cx="0" cy="6" rx="8" ry="3" fill="#4CAF50" />
    </g>

    {/* Butterflies */}
    <g transform="translate(170, 210)">
      <path d="M 0 0 Q -5 -5 -10 -2 Q -5 2 0 0 Z" fill="#FFCA28" />
      <path d="M 0 0 Q 5 -5 10 -2 Q 5 2 0 0 Z" fill="#FFCA28" />
    </g>
    <g transform="translate(260, 220) scale(0.8)">
      <path d="M 0 0 Q -5 -5 -10 -2 Q -5 2 0 0 Z" fill="#CE93D8" />
      <path d="M 0 0 Q 5 -5 10 -2 Q 5 2 0 0 Z" fill="#CE93D8" />
    </g>
  </svg>
);

export const SinhalaBook: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 280 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="book-coverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A237E" />
        <stop offset="100%" stopColor="#311B92" />
      </linearGradient>
      <linearGradient id="book-pageGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E0E0E0" />
        <stop offset="100%" stopColor="#FFF8E1" />
      </linearGradient>
      <linearGradient id="book-pageGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFF8E1" />
        <stop offset="100%" stopColor="#E0E0E0" />
      </linearGradient>
      <filter id="book-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="10" floodColor="#000" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#book-shadow)" transform="translate(140, 120)">
      {/* Cover */}
      <path d="M 0 80 L -120 40 L -100 -60 L 0 -20 Z" fill="url(#book-coverGrad)" stroke="#FFD54F" strokeWidth="3" />
      <path d="M 0 80 L 120 40 L 100 -60 L 0 -20 Z" fill="url(#book-coverGrad)" stroke="#FFD54F" strokeWidth="3" />
      <path d="M -5 80 L 5 80 L 5 -20 L -5 -20 Z" fill="#0D47A1" />

      {/* Pages */}
      <path d="M 0 70 Q -60 60 -110 35 L -90 -55 Q -40 -30 0 -10 Z" fill="url(#book-pageGradLeft)" />
      <path d="M 0 70 Q 60 60 110 35 L 90 -55 Q 40 -30 0 -10 Z" fill="url(#book-pageGradRight)" />

      {/* Page Thickness */}
      <path d="M 0 70 Q -60 60 -110 35 L -110 40 Q -60 65 0 75 Z" fill="#BDBDBD" />
      <path d="M 0 70 Q 60 60 110 35 L 110 40 Q 60 65 0 75 Z" fill="#9E9E9E" />
      <path d="M 0 70 L 0 75" stroke="#757575" strokeWidth="1" />

      {/* Wavy Sinhala Text Lines */}
      <g stroke="#795548" strokeWidth="1.5" fill="none">
        <path d="M -90 -20 Q -80 -10 -60 -15 T -30 -10 T -10 -5" />
        <path d="M -95 -5 Q -85 5 -65 0 T -35 5 T -15 10" />
        <path d="M -100 10 Q -90 20 -70 15 T -40 20 T -20 25" />
        <path d="M -105 25 Q -95 35 -75 30 T -45 35 T -25 40" />

        <path d="M 10 -5 Q 30 -10 60 -15 T 80 -10 T 90 -20" />
        <path d="M 15 10 Q 35 5 65 0 T 85 5 T 95 -5" />
        <path d="M 20 25 Q 40 20 70 15 T 90 20 T 100 10" />
      </g>

      {/* Bookmark Ribbon */}
      <path d="M 0 -15 L 15 50 L 5 60 L -5 50 Z" fill="#E53935" />

      {/* Lotus Decoration Left Page */}
      <g transform="translate(-50, 60) scale(0.6)">
        <path d="M 0 0 Q -15 -15 0 -30 Q 15 -15 0 0 Z" fill="#F48FB1" />
        <path d="M 0 0 Q -25 -5 -15 -25 Q -5 -10 0 0 Z" fill="#F06292" />
        <path d="M 0 0 Q 25 -5 15 -25 Q 5 -10 0 0 Z" fill="#F06292" />
      </g>

      {/* Quill Pen */}
      <path d="M 30 30 Q 80 -40 120 -80 Q 110 -20 30 30 Z" fill="#FFF" stroke="#E0E0E0" />
      <path d="M 30 30 Q 70 -30 110 -70 Q 100 -20 30 30 Z" fill="#F5F5F5" />
      <line x1="30" y1="30" x2="120" y2="-80" stroke="#BDBDBD" strokeWidth="2" />
      <circle cx="28" cy="32" r="3" fill="#3E2723" />
      
      {/* Ink Bottle */}
      <path d="M 80 50 L 110 50 L 115 80 L 75 80 Z" fill="#212121" />
      <rect x="85" y="40" width="20" height="10" fill="#757575" />
      <ellipse cx="95" cy="50" rx="15" ry="5" fill="#424242" />
      <rect x="90" y="55" width="10" height="15" fill="#FAFAFA" opacity="0.8" />
    </g>
  </svg>
);

export const MathWorld: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 280 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="math-grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF5252" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="math-grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#448AFF" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
      <linearGradient id="math-grad3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#69F0AE" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <pattern id="math-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill="none" />
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E0E0E0" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="280" height="240" fill="#FAFAFA" />
    <rect width="280" height="240" fill="url(#math-grid)" />

    {/* Floating Shapes */}
    <circle cx="50" cy="50" r="25" fill="none" stroke="#FFCA28" strokeWidth="6" />
    <polygon points="230,30 260,80 200,80" fill="none" stroke="#AB47BC" strokeWidth="6" strokeLinejoin="round" />
    <rect x="200" y="160" width="40" height="40" rx="4" fill="none" stroke="#26A69A" strokeWidth="6" />
    
    <text x="120" y="70" fontSize="40" fill="#FF7043" fontWeight="bold" opacity="0.6">+</text>
    <text x="180" y="140" fontSize="40" fill="#5C6BC0" fontWeight="bold" opacity="0.6">=</text>
    <text x="60" y="180" fontSize="40" fill="#9CCC65" fontWeight="bold" opacity="0.6">×</text>

    {/* 3D Number Blocks */}
    <g transform="translate(100, 100)">
      {/* Block 1 (Red) */}
      <path d="M -30 -30 L -10 -40 L 30 -40 L 10 -30 Z" fill="#EF5350" />
      <path d="M 10 -30 L 30 -40 L 30 0 L 10 10 Z" fill="#B71C1C" />
      <rect x="-30" y="-30" width="40" height="40" fill="url(#math-grad1)" />
      <text x="-16" y="-3" fontSize="24" fill="#FFF" fontWeight="bold">1</text>
    </g>
    
    <g transform="translate(140, 140)">
      {/* Block 2 (Blue) */}
      <path d="M -20 -20 L 0 -30 L 40 -30 L 20 -20 Z" fill="#64B5F6" />
      <path d="M 20 -20 L 40 -30 L 40 10 L 20 20 Z" fill="#0D47A1" />
      <rect x="-20" y="-20" width="40" height="40" fill="url(#math-grad2)" />
      <text x="-5" y="7" fontSize="24" fill="#FFF" fontWeight="bold">2</text>
    </g>

    <g transform="translate(80, 160)">
      {/* Block 3 (Green) */}
      <path d="M -20 -20 L 0 -30 L 40 -30 L 20 -20 Z" fill="#81C784" />
      <path d="M 20 -20 L 40 -30 L 40 10 L 20 20 Z" fill="#1B5E20" />
      <rect x="-20" y="-20" width="40" height="40" fill="url(#math-grad3)" />
      <text x="-5" y="7" fontSize="24" fill="#FFF" fontWeight="bold">3</text>
    </g>

    {/* Ruler */}
    <g transform="translate(30, 200) rotate(-30)">
      <rect x="0" y="0" width="160" height="25" rx="2" fill="#FFD54F" stroke="#F57F17" strokeWidth="2" />
      <path d="M 10 0 L 10 10 M 30 0 L 30 10 M 50 0 L 50 10 M 70 0 L 70 10 M 90 0 L 90 10 M 110 0 L 110 10 M 130 0 L 130 10 M 150 0 L 150 10" stroke="#3E2723" strokeWidth="1.5" />
      <path d="M 20 0 L 20 5 M 40 0 L 40 5 M 60 0 L 60 5 M 80 0 L 80 5 M 100 0 L 100 5 M 120 0 L 120 5 M 140 0 L 140 5" stroke="#3E2723" strokeWidth="1" />
    </g>

    {/* Stars */}
    <g fill="#FFC107">
      <polygon points="30,10 34,20 45,20 36,26 39,36 30,30 21,36 24,26 15,20 26,20" />
      <polygon points="260,110 262,115 268,115 263,118 265,124 260,121 255,124 257,118 252,115 258,115" />
      <polygon points="120,30 123,38 131,38 124,43 127,51 120,46 113,51 116,43 109,38 117,38" />
    </g>
  </svg>
);

export const BrainPuzzle: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 280 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="brain-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <linearGradient id="brain-piece1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF4081" />
        <stop offset="100%" stopColor="#C51162" />
      </linearGradient>
      <linearGradient id="brain-piece2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFEB3B" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="brain-piece3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00E676" />
        <stop offset="100%" stopColor="#00C853" />
      </linearGradient>
      <linearGradient id="brain-piece4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#448AFF" />
        <stop offset="100%" stopColor="#2962FF" />
      </linearGradient>
    </defs>
    
    <rect width="280" height="240" fill="#1A237E" opacity="0.05" />

    {/* Glowing Brain Background */}
    <g transform="translate(140, 130)" filter="url(#brain-glow)" fill="#F48FB1" opacity="0.7">
      <path d="M 0 -40 C 40 -40 60 -10 60 20 C 60 50 30 60 0 60 C -30 60 -60 50 -60 20 C -60 -10 -40 -40 0 -40 Z" />
      <path d="M 0 -40 C 20 -40 20 -60 0 -60 C -20 -60 -20 -40 0 -40 Z" />
    </g>

    {/* Puzzle Pieces */}
    <g transform="translate(140, 130) scale(0.9)">
      {/* Top Left - Pink */}
      <path d="M 0 0 L -60 0 C -60 -20 -80 -20 -80 0 L -100 0 L -100 -60 L -60 -60 C -60 -80 -40 -80 -40 -60 L 0 -60 Z" fill="url(#brain-piece1)" stroke="#FFF" strokeWidth="2" />
      {/* Top Right - Yellow */}
      <path d="M 0 0 L 0 -60 L 40 -60 C 40 -80 60 -80 60 -60 L 100 -60 L 100 0 L 80 0 C 80 -20 60 -20 60 0 Z" fill="url(#brain-piece2)" stroke="#FFF" strokeWidth="2" />
      {/* Bottom Left - Green */}
      <path d="M 0 0 L 0 60 L -40 60 C -40 80 -60 80 -60 60 L -100 60 L -100 0 L -80 0 C -80 20 -60 20 -60 0 Z" fill="url(#brain-piece3)" stroke="#FFF" strokeWidth="2" />
      {/* Bottom Right - Blue */}
      <path d="M 0 0 L 60 0 C 60 20 80 20 80 0 L 100 0 L 100 60 L 60 60 C 60 80 40 80 40 60 L 0 60 Z" fill="url(#brain-piece4)" stroke="#FFF" strokeWidth="2" />
      
      {/* Connectors */}
      <circle cx="-70" cy="0" r="14" fill="url(#brain-piece1)" />
      <circle cx="70" cy="0" r="14" fill="url(#brain-piece4)" />
      <circle cx="0" cy="-50" r="14" fill="url(#brain-piece1)" />
      <circle cx="0" cy="50" r="14" fill="url(#brain-piece4)" />
    </g>

    {/* Lightbulb */}
    <g transform="translate(140, 45)">
      <circle cx="0" cy="0" r="15" fill="#FFEB3B" filter="url(#brain-glow)" />
      <path d="M -10 10 L 10 10 L 8 20 L -8 20 Z" fill="#9E9E9E" />
      <path d="M -6 22 L 6 22 L 4 25 L -4 25 Z" fill="#424242" />
      <g stroke="#FFC107" strokeWidth="3" strokeLinecap="round">
        <line x1="0" y1="-20" x2="0" y2="-30" />
        <line x1="-15" y1="-15" x2="-22" y2="-22" />
        <line x1="15" y1="-15" x2="22" y2="-22" />
        <line x1="-20" y1="0" x2="-30" y2="0" />
        <line x1="20" y1="0" x2="30" y2="0" />
      </g>
    </g>

    {/* Question Marks & Sparkles */}
    <text x="30" y="80" fontSize="40" fill="#9C27B0" fontWeight="bold" opacity="0.6">?</text>
    <text x="220" y="70" fontSize="30" fill="#E91E63" fontWeight="bold" opacity="0.6">?</text>
    <text x="210" y="190" fontSize="50" fill="#00BCD4" fontWeight="bold" opacity="0.6">?</text>
    <text x="40" y="200" fontSize="35" fill="#FF9800" fontWeight="bold" opacity="0.6">?</text>

    <g fill="#FFEB3B">
      <circle cx="90" cy="30" r="3" />
      <circle cx="200" cy="110" r="4" />
      <circle cx="50" cy="130" r="2" />
      <circle cx="150" cy="210" r="3" />
    </g>
  </svg>
);

export const GoldenTrophy: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 200 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trophy-gold1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FBC02D" />
        <stop offset="25%" stopColor="#FFF59D" />
        <stop offset="50%" stopColor="#FBC02D" />
        <stop offset="75%" stopColor="#F57F17" />
        <stop offset="100%" stopColor="#FBC02D" />
      </linearGradient>
      <linearGradient id="trophy-gold2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <linearGradient id="trophy-bronze" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5D4037" />
        <stop offset="50%" stopColor="#795548" />
        <stop offset="100%" stopColor="#3E2723" />
      </linearGradient>
      <filter id="trophy-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#trophy-glow)">
      {/* Handles */}
      <path d="M 60 70 C 20 70 20 120 60 120" fill="none" stroke="url(#trophy-gold2)" strokeWidth="12" strokeLinecap="round" />
      <path d="M 140 70 C 180 70 180 120 140 120" fill="none" stroke="url(#trophy-gold2)" strokeWidth="12" strokeLinecap="round" />

      {/* Base */}
      <rect x="60" y="210" width="80" height="30" rx="4" fill="url(#trophy-bronze)" />
      <path d="M 70 190 L 130 190 L 140 210 L 60 210 Z" fill="#8D6E63" />
      
      {/* Stem */}
      <rect x="90" y="150" width="20" height="40" fill="url(#trophy-gold1)" />
      <ellipse cx="100" cy="150" rx="30" ry="10" fill="url(#trophy-gold1)" />
      
      {/* Cup */}
      <path d="M 40 40 L 160 40 C 160 120 130 150 100 150 C 70 150 40 120 40 40 Z" fill="url(#trophy-gold1)" />
      <ellipse cx="100" cy="40" rx="60" ry="15" fill="#FFF59D" />
      <ellipse cx="100" cy="42" rx="55" ry="12" fill="#F9A825" />

      {/* Engraved Star */}
      <polygon points="100,70 106,85 122,85 109,95 114,110 100,100 86,110 91,95 78,85 94,85" fill="#FFF9C4" opacity="0.9" />

      {/* Base Text (1st) */}
      <text x="100" y="233" fontSize="22" fill="#FFECB3" fontWeight="bold" textAnchor="middle">1st</text>
    </g>

    {/* Laurel Wreath */}
    <g fill="#4CAF50" opacity="0.8">
      <path d="M 30 150 Q 20 100 50 30 Q 30 80 40 140 Z" />
      <path d="M 170 150 Q 180 100 150 30 Q 170 80 160 140 Z" />
      {/* Leaves Left */}
      <ellipse cx="45" cy="130" rx="10" ry="4" transform="rotate(-30 45 130)" />
      <ellipse cx="38" cy="110" rx="10" ry="4" transform="rotate(-40 38 110)" />
      <ellipse cx="35" cy="90" rx="10" ry="4" transform="rotate(-50 35 90)" />
      <ellipse cx="38" cy="70" rx="10" ry="4" transform="rotate(-60 38 70)" />
      <ellipse cx="45" cy="50" rx="10" ry="4" transform="rotate(-70 45 50)" />
      {/* Leaves Right */}
      <ellipse cx="155" cy="130" rx="10" ry="4" transform="rotate(30 155 130)" />
      <ellipse cx="162" cy="110" rx="10" ry="4" transform="rotate(40 162 110)" />
      <ellipse cx="165" cy="90" rx="10" ry="4" transform="rotate(50 165 90)" />
      <ellipse cx="162" cy="70" rx="10" ry="4" transform="rotate(60 162 70)" />
      <ellipse cx="155" cy="50" rx="10" ry="4" transform="rotate(70 155 50)" />
    </g>

    {/* Confetti & Sparkles */}
    <g>
      <rect x="20" y="60" width="8" height="15" fill="#E91E63" transform="rotate(45 20 60)" />
      <rect x="170" y="80" width="8" height="15" fill="#2196F3" transform="rotate(-30 170 80)" />
      <rect x="40" y="200" width="8" height="15" fill="#4CAF50" transform="rotate(15 40 200)" />
      <rect x="160" y="180" width="8" height="15" fill="#9C27B0" transform="rotate(-60 160 180)" />
      <circle cx="30" cy="100" r="4" fill="#FFEB3B" />
      <circle cx="180" cy="140" r="5" fill="#FF9800" />
      <circle cx="50" cy="40" r="3" fill="#00BCD4" />
    </g>
  </svg>
);

export const QuizPencil: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 200 180" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pencil-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFCA28" />
        <stop offset="50%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FFB300" />
      </linearGradient>
      <linearGradient id="pencil-metal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#B0BEC5" />
        <stop offset="50%" stopColor="#CFD8DC" />
        <stop offset="100%" stopColor="#90A4AE" />
      </linearGradient>
      <linearGradient id="pencil-eraser" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F48FB1" />
        <stop offset="100%" stopColor="#E91E63" />
      </linearGradient>
      <linearGradient id="pencil-wood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="100%" stopColor="#FFCC80" />
      </linearGradient>
    </defs>
    
    {/* Paper Background */}
    <g transform="translate(20, 20)">
      <path d="M 0 0 L 160 20 L 150 150 L -10 130 Z" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="2" />
      <path d="M -5 30 Q 75 40 155 50" fill="none" stroke="#64B5F6" strokeWidth="1.5" />
      <path d="M -7 50 Q 73 60 153 70" fill="none" stroke="#64B5F6" strokeWidth="1.5" />
      <path d="M -9 70 Q 71 80 151 90" fill="none" stroke="#64B5F6" strokeWidth="1.5" />
      <path d="M -11 90 Q 69 100 149 110" fill="none" stroke="#64B5F6" strokeWidth="1.5" />
      <path d="M 20 5 L 10 135" fill="none" stroke="#EF5350" strokeWidth="2" opacity="0.7" />
      
      {/* Written Text Effect */}
      <path d="M 30 40 Q 40 30 50 45 T 70 35 T 90 45" fill="none" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
      <path d="M 25 60 Q 45 50 65 65 T 100 55" fill="none" stroke="#424242" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Pencil rotated 30deg */}
    <g transform="translate(100, 70) rotate(-30)">
      {/* Wood Tip */}
      <polygon points="-70,10 -40,25 -40,-5" fill="url(#pencil-wood)" />
      {/* Graphite Point */}
      <polygon points="-70,10 -60,15 -60,5" fill="#424242" />
      
      {/* Body */}
      <rect x="-40" y="-10" width="100" height="40" fill="url(#pencil-body)" />
      <line x1="-40" y1="3.3" x2="60" y2="3.3" stroke="#F57F17" strokeWidth="1" />
      <line x1="-40" y1="16.6" x2="60" y2="16.6" stroke="#F57F17" strokeWidth="1" />

      {/* Metal Band */}
      <rect x="60" y="-10" width="20" height="40" fill="url(#pencil-metal)" />
      <line x1="65" y1="-10" x2="65" y2="30" stroke="#78909C" strokeWidth="2" />
      <line x1="75" y1="-10" x2="75" y2="30" stroke="#78909C" strokeWidth="2" />

      {/* Eraser */}
      <path d="M 80 -10 L 95 -10 C 105 -10 105 30 95 30 L 80 30 Z" fill="url(#pencil-eraser)" />
    </g>

    {/* Motion Lines */}
    <path d="M 60 130 C 50 110 80 90 40 100" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeDasharray="5,5" />
    <path d="M 70 150 C 60 130 90 110 50 120" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeDasharray="5,5" />

    {/* Graphite Dust */}
    <circle cx="40" cy="110" r="2" fill="#424242" />
    <circle cx="35" cy="120" r="1.5" fill="#424242" />
    <circle cx="50" cy="115" r="2.5" fill="#424242" />
    <circle cx="45" cy="125" r="1" fill="#424242" />
  </svg>
);

export const StarBurst: React.FC<IllustrationProps> = ({ className = '' }) => (
  <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="50%" stopColor="#FFCA28" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g transform="translate(80, 80)">
      {/* Rays */}
      <g stroke="#FFD54F" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <line x1="0" y1="-40" x2="0" y2="-70" />
        <line x1="0" y1="40" x2="0" y2="70" />
        <line x1="-40" y1="0" x2="-70" y2="0" />
        <line x1="40" y1="0" x2="70" y2="0" />
        <line x1="-30" y1="-30" x2="-50" y2="-50" />
        <line x1="30" y1="30" x2="50" y2="50" />
        <line x1="-30" y1="30" x2="-50" y2="50" />
        <line x1="30" y1="-30" x2="50" y2="-50" />
      </g>

      {/* Main 6-Pointed Star */}
      <polygon points="0,-40 10,-10 40,-15 15,10 25,40 0,20 -25,40 -15,10 -40,-15 -10,-10" fill="url(#star-grad)" filter="url(#star-glow)" />

      {/* Center Highlight */}
      <circle cx="0" cy="0" r="15" fill="#FFF" opacity="0.6" filter="url(#star-glow)" />

      {/* Smaller Stars */}
      <g fill="#FFD54F">
        <polygon points="0,-65 2,-70 7,-70 3,-74 5,-79 0,-76 -5,-79 -3,-74 -7,-70 -2,-70" transform="rotate(45)" />
        <polygon points="50,50 52,45 57,45 53,41 55,36 50,39 45,36 47,41 43,45 48,45" />
        <polygon points="-60,0 -58,-5 -53,-5 -57,-9 -55,-14 -60,-11 -65,-14 -63,-9 -68,-5 -62,-5" transform="rotate(30 -60 0)" />
        <polygon points="40,-40 42,-45 47,-45 43,-49 45,-54 40,-51 35,-54 37,-49 33,-45 38,-45" />
      </g>

      {/* Sparkle Dots */}
      <g fill="#FFF" opacity="0.9">
        <circle cx="20" cy="-50" r="3" />
        <circle cx="-40" cy="-40" r="2" />
        <circle cx="-50" cy="30" r="3.5" />
        <circle cx="30" cy="60" r="2.5" />
        <circle cx="-10" cy="65" r="2" />
        <circle cx="65" cy="-10" r="3" />
      </g>
    </g>
  </svg>
);

export const KidCharacter: React.FC<IllustrationProps> = ({ className = '', variant = 'boy' }) => {
  const isBoy = variant === 'boy';

  return (
    <svg viewBox="0 0 120 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kid-skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFCCBC" />
          <stop offset="100%" stopColor="#D84315" />
        </linearGradient>
        <linearGradient id="kid-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
        <linearGradient id="kid-bottoms" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>
      </defs>

      <g transform="translate(60, 90)">
        {/* Backpack */}
        <rect x="-35" y="-10" width="70" height="50" rx="10" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
        
        {/* Back Arm (Left) */}
        <path d="M -20 -10 Q -40 0 -45 20" fill="none" stroke="#FFCCBC" strokeWidth="12" strokeLinecap="round" />
        
        {/* Hair Back (Girl Pigtails) */}
        {!isBoy && (
          <g fill="#212121">
            <path d="M -25 -70 Q -40 -60 -45 -40 Q -30 -40 -20 -50 Z" />
            <path d="M 25 -70 Q 40 -60 45 -40 Q 30 -40 20 -50 Z" />
            <circle cx="-35" cy="-55" r="4" fill="#E91E63" />
            <circle cx="35" cy="-55" r="4" fill="#E91E63" />
          </g>
        )}

        {/* Legs */}
        <rect x="-15" y="40" width="10" height="35" fill="#FFCCBC" />
        <rect x="5" y="40" width="10" height="35" fill="#FFCCBC" />
        
        {/* Shoes */}
        <path d="M -20 75 L -5 75 L -5 85 L -25 85 Z" fill="#424242" rx="3" />
        <path d="M 5 75 L 20 75 L 25 85 L 5 85 Z" fill="#424242" rx="3" />

        {/* Bottoms (Shorts/Skirt) */}
        {isBoy ? (
          <path d="M -25 20 L 25 20 L 25 50 L 5 50 L 0 35 L -5 50 L -25 50 Z" fill="url(#kid-bottoms)" />
        ) : (
          <path d="M -20 20 L 20 20 L 30 55 L -30 55 Z" fill="url(#kid-bottoms)" />
        )}

        {/* Shirt */}
        <path d="M -25 -20 L 25 -20 L 30 25 L -30 25 Z" fill="url(#kid-shirt)" />
        {/* Collar */}
        <path d="M -15 -20 L 0 -10 L 15 -20 Z" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />
        <line x1="0" y1="-10" x2="0" y2="25" stroke="#E0E0E0" strokeWidth="2" />
        
        {/* Front Arm (Right) */}
        <path d="M 20 -10 Q 40 0 45 20" fill="none" stroke="#FFCCBC" strokeWidth="12" strokeLinecap="round" />
        <path d="M 20 -10 L 35 0" stroke="url(#kid-shirt)" strokeWidth="14" strokeLinecap="round" />
        <path d="M -20 -10 L -35 0" stroke="url(#kid-shirt)" strokeWidth="14" strokeLinecap="round" />

        {/* Head */}
        <circle cx="0" cy="-55" r="25" fill="#FFCCBC" />
        
        {/* Face */}
        <circle cx="-10" cy="-55" r="3" fill="#212121" />
        <circle cx="10" cy="-55" r="3" fill="#212121" />
        <path d="M -10 -45 Q 0 -35 10 -45" fill="none" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
        
        {/* Hair Front */}
        {isBoy ? (
          <path d="M -25 -55 Q -25 -85 0 -80 Q 25 -85 25 -55 Q 20 -70 0 -70 Q -20 -70 -25 -55 Z" fill="#212121" />
        ) : (
          <path d="M -25 -55 Q -25 -85 0 -80 Q 25 -85 25 -55 Q 20 -65 0 -65 Q -20 -65 -25 -55 Z" fill="#212121" />
        )}
      </g>
    </svg>
  );
};
