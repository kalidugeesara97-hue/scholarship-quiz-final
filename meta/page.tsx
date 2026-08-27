// src/app/meta/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroBanner, OwlMascot } from "../components/Illustrations";

export default function MetaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-50 to-amber-50 flex flex-col items-center justify-center p-4">
      {/* Hero illustration */}
      <div className="w-full max-w-4xl mb-8 flex justify-center">
        <HeroBanner className="w-full h-64 md:h-80 lg:h-96" />
      </div>

      {/* Title card */}
      <div className="glass-card w-full max-w-3xl p-6 rounded-xl text-center shadow-lg mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
          🎓 සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලිය
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4">
          5 වසරේ දරුවන්ට අධි-සම්මත, රසවත්, සහ අත්දැකීම් පුරිතියෙන් පිරුණු කවීන්ට හදාරා ගත හැකි, සිංහල බසින් තොරතුරු-ප්‍රශ්නාවලියකි.
        </p>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          ඔබේ දරුවන්ට කුඩා වයසේදී මතක දැනුම ගොඩනැගීමට සහ තොරතුරු-අමුතුවෙන් ගත කිරීමේ හැකියාවන්ද අත්දැකීමට මග පෙන්වන්න.
        </p>
        <Link href="/" legacyBehavior>
          <a className="inline-block btn-3d-green px-8 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1">
            ආරම්භ කරන්න 🚀
          </a>
        </Link>
      </div>

      {/* Mascot footer */}
      <div className="mt-8 flex justify-center items-center">
        <OwlMascot className="w-24 h-24 animate-float-slow" />
        <span className="ml-4 text-gray-700 text-lg">ආදරය සහ අධ්‍යාපනය, අපිත් එක්ක!</span>
      </div>
    </main>
  );
}

// Note: `glass-card` and `btn-3d-green` utilities are defined in globals.css.
