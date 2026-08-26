import React from 'react'

export function HeroBannerIllustration() {
  return (
    <div className="relative w-full h-44 sm:h-52 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl flex items-center justify-between p-6 text-white border-2 border-indigo-300/40 select-none">
      {/* Background Decorative Shapes */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10%" cy="20%" r="40" fill="#fff" />
        <circle cx="85%" cy="80%" r="60" fill="#fde047" />
        <circle cx="50%" cy="10%" r="25" fill="#67e8f9" />
        <polygon points="120,20 130,40 110,40" fill="#fbbf24" />
        <polygon points="340,120 355,145 325,145" fill="#f472b6" />
      </svg>

      {/* Left Text & Badge */}
      <div className="relative z-10 max-w-[65%] space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-xs uppercase tracking-wider shadow-md">
          <span>✨</span> 5 ශ්‍රේණිය ශිෂ්‍යත්වය 2026
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
          සුමිත් සර්ගේ <br className="hidden sm:inline" />
          <span className="text-amber-300">දෛනික පෙරහුරුව</span>
        </h2>
        <p className="text-xs sm:text-sm font-bold text-blue-100">
          දිනපතා විනාඩි 5න් ප්‍රශ්න 5ක් විසඳා ලකුණු බලන්න! 🎯
        </p>
      </div>

      {/* Right Graphic: Cute 3D Illustrated Mascot */}
      <div className="relative z-10 flex flex-col items-center justify-center shrink-0">
        <div className="relative">
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-xl animate-pulse" />
          
          {/* Cute Owl / Scholar Mascot SVG */}
          <svg className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-2xl animate-float" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Graduation Cap */}
            <polygon points="60,15 95,28 60,40 25,28" fill="#1e1b4b" />
            <rect x="52" y="32" width="16" height="10" rx="3" fill="#312e81" />
            <line x1="95" y1="28" x2="95" y2="48" stroke="#fbbf24" strokeWidth="3" />
            <circle cx="95" cy="50" r="4" fill="#f59e0b" />
            
            {/* Owl Body */}
            <ellipse cx="60" cy="72" rx="36" ry="38" fill="#f59e0b" />
            <ellipse cx="60" cy="78" rx="26" ry="28" fill="#fef3c7" />
            
            {/* Eyes */}
            <circle cx="46" cy="62" r="14" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
            <circle cx="74" cy="62" r="14" fill="#ffffff" stroke="#d97706" strokeWidth="3" />
            <circle cx="48" cy="62" r="7" fill="#1e1b4b" />
            <circle cx="72" cy="62" r="7" fill="#1e1b4b" />
            <circle cx="50" cy="60" r="2.5" fill="#ffffff" />
            <circle cx="74" cy="60" r="2.5" fill="#ffffff" />
            
            {/* Glasses */}
            <circle cx="46" cy="62" r="14" stroke="#4f46e5" strokeWidth="3" fill="none" />
            <circle cx="74" cy="62" r="14" stroke="#4f46e5" strokeWidth="3" fill="none" />
            <line x1="60" y1="62" x2="60" y2="62" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" />
            
            {/* Beak */}
            <polygon points="60,68 55,77 65,77" fill="#ea580c" />
            
            {/* Book in hands */}
            <rect x="42" y="90" width="36" height="22" rx="4" fill="#2563eb" />
            <path d="M60 90 L60 112" stroke="#ffffff" strokeWidth="2" />
            <path d="M46 96 L56 96 M46 102 L56 102" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
            <path d="M64 96 L74 96 M64 102 L74 102" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export function NatureIllustration() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#ecfdf5" />
      {/* Sun */}
      <circle cx="46" cy="18" r="8" fill="#fbbf24" />
      {/* Big Tree */}
      <rect x="29" y="36" width="6" height="18" rx="2" fill="#78350f" />
      <circle cx="32" cy="28" r="16" fill="#10b981" />
      <circle cx="24" cy="32" r="10" fill="#059669" />
      <circle cx="40" cy="32" r="10" fill="#34d399" />
      {/* Little Plants */}
      <circle cx="16" cy="46" r="6" fill="#10b981" />
      <circle cx="48" cy="46" r="6" fill="#059669" />
      {/* Ground */}
      <path d="M8 48 C20 44 44 44 56 48 L56 56 C56 58 54 60 52 60 L12 60 C10 60 8 58 8 56 Z" fill="#059669" />
    </svg>
  )
}

export function SinhalaIllustration() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#fffbeb" />
      {/* Open Book */}
      <path d="M12 44 C20 40 30 42 32 46 C34 42 44 40 52 44 L52 24 C44 20 34 22 32 26 C30 22 20 20 12 24 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
      <path d="M14 42 C21 38 29 40 31 44 L31 25 C29 21 21 19 14 23 Z" fill="#fef3c7" />
      <path d="M50 42 C43 38 35 40 33 44 L33 25 C35 21 43 19 50 23 Z" fill="#ffffff" />
      {/* Sinhala Letter Marker */}
      <circle cx="42" cy="32" r="4" fill="#f59e0b" />
      {/* Feather Quill */}
      <path d="M48 10 C46 16 38 24 34 28 L32 26 C36 22 44 14 48 10 Z" fill="#ef4444" />
      <circle cx="50" cy="8" r="3" fill="#fbbf24" />
    </svg>
  )
}

export function MathIllustration() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#eff6ff" />
      {/* Math Board */}
      <rect x="12" y="14" width="40" height="36" rx="8" fill="#3b82f6" />
      <rect x="15" y="17" width="34" height="30" rx="6" fill="#1e40af" />
      {/* Plus */}
      <path d="M24 26 L24 34 M20 30 L28 30" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
      {/* Equals */}
      <path d="M36 28 L44 28 M36 32 L44 32" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
      {/* Number 5 */}
      <path d="M22 41 L27 41 L22 44 C25 43 27 45 26 47 C25 49 22 49 21 48" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Star */}
      <polygon points="40,38 42,42 46,43 43,46 44,50 40,48 36,50 37,46 34,43 38,42" fill="#fbbf24" />
    </svg>
  )
}

export function IQIllustration() {
  return (
    <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#faf5ff" />
      {/* Glowing Lightbulb */}
      <path d="M32 14 C23 14 18 20 18 27 C18 32 22 36 24 39 L24 43 C24 44 25 45 26 45 L38 45 C39 45 40 44 40 43 L40 39 C42 36 46 32 46 27 C46 20 41 14 32 14 Z" fill="#fbbf24" />
      {/* Bulb Filament / Brain line */}
      <path d="M28 27 C28 24 30 22 32 22 C34 22 36 24 36 27 C36 30 32 32 32 35" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Base */}
      <rect x="27" y="46" width="10" height="3" rx="1.5" fill="#94a3b8" />
      <rect x="29" y="50" width="6" height="2" rx="1" fill="#64748b" />
      {/* Sparks */}
      <line x1="32" y1="8" x2="32" y2="11" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="20" x2="11" y2="18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="20" x2="53" y2="18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function TrophyIllustration() {
  return (
    <svg className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-xl animate-bounce" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Golden Base */}
      <rect x="34" y="78" width="28" height="10" rx="3" fill="#78350f" />
      <rect x="30" y="86" width="36" height="6" rx="3" fill="#451a03" />
      <rect x="42" y="66" width="12" height="14" fill="#d97706" />
      
      {/* Trophy Handles */}
      <path d="M24 30 C12 30 12 48 26 52 L28 46 C20 44 20 34 28 34 Z" fill="#f59e0b" />
      <path d="M72 30 C84 30 84 48 70 52 L68 46 C76 44 76 34 68 34 Z" fill="#f59e0b" />
      
      {/* Trophy Body */}
      <path d="M24 22 C24 50 40 66 48 66 C56 66 72 50 72 22 Z" fill="#fbbf24" />
      <ellipse cx="48" cy="22" rx="24" ry="7" fill="#fde047" />
      
      {/* 3D Gold Shimmer */}
      <path d="M30 26 C30 46 42 58 48 60 C44 54 36 44 36 26 Z" fill="#ffffff" opacity="0.4" />
      
      {/* Star on Trophy */}
      <polygon points="48,34 51,41 58,42 53,47 55,54 48,50 41,54 43,47 38,42 45,41" fill="#d97706" />
    </svg>
  )
}
