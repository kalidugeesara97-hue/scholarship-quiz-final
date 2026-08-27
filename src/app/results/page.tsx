'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { playSound } from '../utils/sound'

type QuizResult = {
  studentName: string
  avatar: string
  subject: string
  topic: string
  subjectEmoji?: string
  score: number
  total: number
  answers: number[]
  questions: Array<{
    id: number
    question: string
    options: string[]
    correctAnswer?: number
    explanation?: string
  }>
}

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('quizResults')
      if (stored) {
        const parsed = JSON.parse(stored)
        setResult(parsed)
        playSound('win')
      }
    } catch (e) {
      console.error('Failed to parse quiz results', e)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl animate-bounce mb-3 shadow-inner">
          🏆
        </div>
        <p className="text-sm font-black text-slate-800">ප්‍රතිඵල ගණනය වෙමින්...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-4xl mb-2">❓</span>
        <h3 className="font-extrabold text-slate-800 text-base mb-1">ප්‍රතිඵල හමු නොවීය</h3>
        <p className="text-xs text-slate-500 mb-4">කරුණාකර ප්‍රශ්නාවලිය නැවත ආරම්භ කරන්න.</p>
        <button
          onClick={() => {
            playSound('click')
            router.push('/')
          }}
          className="btn-3d px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-tactile-blue"
        >
          මුල් පිටුවට 🏠
        </button>
      </div>
    )
  }

  const percent = Math.round((result.score / result.total) * 100)
  const isHighScorer = percent >= 80

  const handleShare = () => {
    playSound('click')
    const shareText = `🎓 සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලිය\n👤 සිසුවා: ${result.studentName} ${result.avatar}\n📚 විෂය: ${result.subject}\n🏆 ලකුණු: ${result.score}/${result.total} (${percent}%)\n\nඔබත් අදම සහභාගී වන්න! 🚀`
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`
    window.open(url, '_blank')
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* CONFETTI STREAM IF HIGH SCORER */}
      {isHighScorer && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece rounded-sm"
              style={{
                left: `${(i * 6.5) % 100}%`,
                backgroundColor: ['#FFB703', '#4CC9F0', '#06D6A0', '#F72585', '#4361EE'][i % 5],
                width: `${8 + (i % 6)}px`,
                height: `${12 + (i % 8)}px`,
                animationDelay: `${(i * 0.18)}s`,
                animationDuration: `${2.6 + (i * 0.25)}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* HEADER */}
      <div className="pt-3 px-4 pb-2.5 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => {
            playSound('click')
            router.push('/')
          }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold hover:bg-slate-200 transition"
        >
          ✕
        </button>
        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">ප්‍රතිඵල සටහන</span>
        <span className="text-base">{result.avatar}</span>
      </div>

      {/* MAIN SCROLLABLE RESULTS BODY */}
      <div className="flex-1 overflow-y-auto hide-scroll p-4 pb-24 space-y-4 text-center">
        
        {/* TROPHY HERO CARD */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-950 p-5 text-white shadow-xl border border-white/10">
          <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-amber-400/20 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-pink-500/20 blur-xl"></div>

          {/* 3D Gold Trophy Vector with Glow */}
          <div className="relative w-28 h-28 mx-auto mb-1 animate-trophy-glow">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
              <path d="M40 35 H120 V80 C120 102 102 120 80 120 C58 120 40 102 40 80 V35 Z" fill="url(#trophyGradFinal)"/>
              <path d="M40 45 H25 C18 45 15 55 20 65 L40 80" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/>
              <path d="M120 45 H135 C142 45 145 55 140 65 L120 80" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/>
              <rect x="68" y="120" width="24" height="20" fill="#D97706"/>
              <rect x="48" y="140" width="64" height="14" rx="4" fill="#92400E"/>
              <polygon points="80,55 86,70 102,70 89,80 94,95 80,85 66,95 71,80 58,70 74,70" fill="#FFFFFF" opacity="0.9"/>
              <defs>
                <linearGradient id="trophyGradFinal" x1="40" y1="35" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FCD34D"/>
                  <stop offset="0.5" stopColor="#F59E0B"/>
                  <stop offset="1" stopColor="#D97706"/>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
            {percent >= 80 ? '🌟 විශිෂ්ට ජයග්‍රහණයක්!' : percent >= 60 ? '👍 හොඳ උත්සාහයක්!' : '📖 තව පුහුණු වෙමු!'}
          </span>

          <h2 className="text-3xl font-black text-white tracking-tight">
            {result.score} / {result.total} ලකුණු!
          </h2>
          <p className="text-xs text-indigo-200 mt-1 font-semibold">
            {result.studentName} පුතා {percent}% ක් සාර්ථකව සම්පූර්ණ කළා!
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center">
            <div className="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span className="text-[9px] text-indigo-200 block">ප්‍රතිශතය</span>
              <span className="text-sm font-black text-amber-300">{percent}%</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span className="text-[9px] text-indigo-200 block">විෂය</span>
              <span className="text-xs font-bold text-white truncate block">{result.subject}</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-2 backdrop-blur-xs">
              <span className="text-[9px] text-indigo-200 block">නව XP</span>
              <span className="text-sm font-black text-emerald-400">+{result.score * 20}</span>
            </div>
          </div>
        </div>

        {/* QUESTION REVIEW ACCORDION */}
        <div className="text-left space-y-2.5">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider px-1">
            📝 ප්‍රශ්න සමාලෝචනය (Review)
          </h4>

          {result.questions.map((q, idx) => {
            const studentAns = result.answers[idx]
            const correctAns = q.correctAnswer !== undefined ? q.correctAnswer : 1
            const isQCorrect = studentAns === correctAns

            return (
              <div
                key={idx}
                className={`glow-border-card p-3.5 border-2 ${
                  isQCorrect ? 'border-emerald-200/80 bg-emerald-50/20' : 'border-rose-200/80 bg-rose-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-black text-slate-800 flex-1">
                    {idx + 1}. {q.question}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${
                    isQCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isQCorrect ? '✓ හරි' : '✕ වැරදියි'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <div>
                    <span className="font-semibold text-slate-400">ඔබේ පිළිතුර: </span>
                    <span className={`font-bold ${isQCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {studentAns !== undefined && q.options[studentAns] ? q.options[studentAns] : 'නැත'}
                    </span>
                  </div>
                  {!isQCorrect && (
                    <div>
                      <span className="font-semibold text-slate-400">නිවැරදි පිළිතුර: </span>
                      <span className="font-bold text-emerald-700">{q.options[correctAns]}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={handleShare}
            className="btn-3d w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-tactile-green flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="text-base">💬</span>
            <span>WhatsApp හරහා ලකුණු යවන්න</span>
          </button>

          <button
            onClick={() => {
              playSound('click')
              router.push('/')
            }}
            className="btn-3d w-full py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs border-2 border-slate-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🏠 මුල් පිටුවට යන්න</span>
          </button>
        </div>

      </div>

    </div>
  )
}
