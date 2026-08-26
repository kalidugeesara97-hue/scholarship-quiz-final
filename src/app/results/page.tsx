'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type QuestionResult = {
  questionId: number
  question: string
  options: string[]
  studentAnswer: number
  correctAnswer: number
  isCorrect: boolean
  explanation: string
}

type QuizResults = {
  success?: boolean
  studentName: string
  avatar?: string
  date?: string
  subject?: string
  topic?: string
  score: number
  totalQuestions: number
  percentage?: number
  results: QuestionResult[]
  error?: boolean
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults')
    if (stored) {
      const data: QuizResults = JSON.parse(stored)
      setResults(data)
      if (data.score >= 3) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 6000)
      }
    }
  }, [])

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center rounded-3xl bg-white p-8 shadow-2xl max-w-md w-full border-4 border-indigo-100">
          <div className="text-6xl mb-4">🤔</div>
          <p className="text-2xl font-black text-indigo-950 mb-2">ප්‍රතිඵල හමු නොවීය</p>
          <p className="text-slate-600 mb-6 font-bold">කරුණාකර මුල් පිටුවට ගොස් ප්‍රශ්නාවලිය ආරම්භ කරන්න.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg py-4 shadow-[0_5px_0_#059669] active:translate-y-1 active:shadow-[0_1px_0_#059669] transition-all"
          >
            මුල් පිටුවට යන්න 🏠
          </button>
        </div>
      </div>
    )
  }

  const { score, totalQuestions, results: questionResults, studentName, subject, topic, avatar } = results
  const percentage = Math.round((score / totalQuestions) * 100)
  const optionLabels = ['(1)', '(2)', '(3)']

  let emoji = '🏆'
  let message = ''
  let subMessage = ''

  if (score >= 5) {
    emoji = '👑'
    message = 'විශිෂ්ටයි! සම්පූර්ණ ලකුණු!'
    subMessage = 'ඔබ අද දවසේ ශිෂ්‍යත්ව සුපිරි තරුවක්! 🌟'
  } else if (score >= 4) {
    emoji = '🎉'
    message = 'හරිම දක්ෂයි! ඉතා හොඳයි!'
    subMessage = 'ශිෂ්‍යත්ව විභාගයට ඔබේ සූදානම විශිෂ්ටයි! 🚀'
  } else if (score >= 3) {
    emoji = '💪'
    message = 'හොඳ උත්සාහයක්!'
    subMessage = 'තව ටිකක් පුහුණු වෙමු, හෙට නැවත උත්සාහ කරමු!'
  } else {
    emoji = '📖'
    message = 'තව පුහුණු වෙමු!'
    subMessage = 'වරදින තරමටයි පාඩම හොඳින් මතක හිටින්නේ. හෙට නැවත එන්න!'
  }

  const confettiColors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bb5', '#845ec2', '#00c9a7']

  return (
    <main className="min-h-screen py-8 px-4 max-w-lg mx-auto">
      
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: confettiColors[i % confettiColors.length],
                animationDelay: `${Math.random() * 1.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                width: `${8 + Math.random() * 8}px`,
                height: `${8 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '3px',
              }}
            />
          ))}
        </div>
      )}

      {/* Main Results Hero Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl shadow-indigo-100/70 text-center mb-6 border-4 border-indigo-100/80 relative overflow-hidden">
        
        {/* Big Trophy / Emoji */}
        <div className="text-7xl sm:text-8xl mb-2 animate-bounce">{emoji}</div>

        {/* Student Avatar & Name Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-950 font-black text-sm mb-3 border border-indigo-200">
          <span className="text-xl">{avatar || '👦'}</span>
          <span>{studentName} ගේ ප්‍රතිඵලය</span>
        </div>

        {/* Score Ring / Display */}
        <div className="my-3">
          <div className="inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-4 border-amber-300 shadow-inner">
            <span className="text-5xl sm:text-6xl font-black text-amber-950 tracking-tight">
              {score} <span className="text-3xl text-amber-600 font-bold">/ {totalQuestions}</span>
            </span>
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400 text-amber-950 mt-2 shadow-xs">
              ලකුණු ප්‍රතිශතය: {percentage}%
            </span>
          </div>
        </div>

        {/* Feedback Message */}
        <h2 className="text-2xl font-black text-indigo-950 mt-2 leading-snug">
          {message}
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-1 leading-relaxed">
          {subMessage}
        </p>

        {/* Share Score on WhatsApp */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `🏆 *මම සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලියට සහභාගී වුණා!*\n\n👦 *නම:* ${studentName}\n📊 *මගේ ලකුණු:* ${score}/${totalQuestions} (${percentage}%)\n📖 *විෂය:* ${subject || 'ශිෂ්‍යත්ව පුහුණුව'}\n\n👉 *ඔබත් දැන්ම ප්‍රශ්නාවලියට සහභාගී වී ලකුණු බලන්න:*\n${typeof window !== 'undefined' ? window.location.origin : ''}\n\n— *සුමිත් සර්ගේ පන්තිය*`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full min-h-[50px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-md active:scale-95 transition-all"
          >
            <span className="text-xl">📲</span>
            <span>ලකුණු WhatsApp එකට Share කරන්න</span>
          </a>
        </div>

      </div>

      {/* Review All Questions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
            <span>📋</span> ප්‍රශ්න සහ නිවැරදි විවරණ
          </h3>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-white text-indigo-900 shadow-sm border border-indigo-100">
            ප්‍රශ්න {totalQuestions} යි
          </span>
        </div>

        <div className="space-y-4">
          {questionResults && questionResults.map((r, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-5 border-2 shadow-sm bg-white ${
                r.isCorrect ? 'border-emerald-300' : 'border-rose-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-base font-black ${
                  r.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {r.isCorrect ? '✓' : '✗'}
                </span>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase">ප්‍රශ්න අංක 0{idx + 1}</p>
                  <p className="font-extrabold text-indigo-950 text-base leading-snug mt-0.5">{r.question}</p>
                </div>
              </div>

              {/* Options Breakdown */}
              <div className="space-y-1.5 ml-11 mb-3">
                {r.options.map((opt, optIdx) => {
                  let optClass = 'bg-slate-50 text-slate-700 border border-slate-200'
                  let indicator = optionLabels[optIdx]

                  if (optIdx === r.correctAnswer) {
                    optClass = 'bg-emerald-50 text-emerald-950 font-black border-2 border-emerald-400 shadow-xs'
                    indicator = '✅ ' + optionLabels[optIdx]
                  } else if (optIdx === r.studentAnswer && !r.isCorrect) {
                    optClass = 'bg-rose-50 text-rose-950 font-bold border-2 border-rose-300 line-through opacity-80'
                    indicator = '❌ ' + optionLabels[optIdx]
                  }

                  return (
                    <div key={optIdx} className={`p-2.5 rounded-xl text-sm flex items-center gap-2 ${optClass}`}>
                      <span className="font-bold">{indicator}</span>
                      <span>{opt}</span>
                    </div>
                  )
                })}
              </div>

              {/* Explanation Box */}
              <div className="ml-11 rounded-2xl bg-amber-50 p-3.5 border border-amber-200 text-xs font-bold text-amber-950 leading-relaxed">
                <p className="font-black text-amber-900 mb-0.5 flex items-center gap-1">
                  <span>💡</span> නිවැරදි විවරණය:
                </p>
                <p>{r.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Home 3D Button */}
      <button
        onClick={() => router.push('/')}
        className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl px-6 py-4 shadow-[0_6px_0_#3730a3] active:translate-y-1 active:shadow-[0_2px_0_#3730a3] transition-all flex items-center justify-center gap-2 mb-6 cursor-pointer"
      >
        <span>නැවත මුල් පිටුවට යන්න</span>
        <span>🏠</span>
      </button>

      {/* Footer */}
      <footer className="text-center text-xs font-bold text-slate-400 pb-4">
        👨‍🏫 සුමිත් සර්ගේ 5 ශ්‍රේණිය ශිෂ්‍යත්ව පුහුණු මධ්‍යස්ථානය
      </footer>

    </main>
  )
}
