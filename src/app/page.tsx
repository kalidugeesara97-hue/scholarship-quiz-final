'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type QuizInfo = {
  subject: string
  topic: string
  subjectEmoji?: string
}

const SUBJECT_LIST = [
  { name: 'පරිසරය', emoji: '🌿', bg: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40' },
  { name: 'සිංහල', emoji: '📖', bg: 'bg-amber-950/70 text-amber-300 border-amber-500/40' },
  { name: 'ගණිතය', emoji: '➕', bg: 'bg-blue-950/70 text-blue-300 border-blue-500/40' },
  { name: 'සාමාන්‍ය බුද්ධිය', emoji: '🧠', bg: 'bg-purple-950/70 text-purple-300 border-purple-500/40' },
]

export default function Home() {
  const router = useRouter()
  const [studentName, setStudentName] = useState('')
  const [loading, setLoading] = useState(true)
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null)

  useEffect(() => {
    const fetchTodayQuiz = async () => {
      try {
        const res = await fetch('/api/today')
        if (res.ok) {
          const data = await res.json()
          setQuizInfo(data)
        } else {
          setQuizInfo({ subject: 'පරිසරය', topic: 'ශ්‍රී ලංකාවේ ජාතික සංකේත හා භූගෝලය', subjectEmoji: '🌿' })
        }
      } catch (e) {
        setQuizInfo({ subject: 'පරිසරය', topic: 'ශ්‍රී ලංකාවේ ජාතික සංකේත හා භූගෝලය', subjectEmoji: '🌿' })
      } finally {
        setLoading(false)
      }
    }
    fetchTodayQuiz()
  }, [])

  const handleStart = () => {
    const nameToUse = studentName.trim()
    if (!nameToUse) {
      alert('කරුණාකර ඔබේ නම ඇතුළත් කරන්න! 😊')
      return
    }
    router.push(`/quiz?name=${encodeURIComponent(nameToUse)}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white">
        <div className="text-center p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-500/30">
          <div className="text-5xl mb-4 animate-bounce">📚</div>
          <p className="text-2xl font-black text-amber-400">ප්‍රශ්නාවලිය සකස් වෙමින් පවතී...</p>
          <p className="text-sm font-semibold text-slate-300 mt-2">සුළු මොහොතක් රැඳී සිටින්න ⏳</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 py-8 px-4 flex flex-col items-center justify-center text-slate-100">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Main Portal Card */}
        <div className="w-full rounded-3xl bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-500/40 relative overflow-hidden">
          
          {/* Top Badges */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <span>🌟</span> 2026 ශිෂ්‍යත්ව ජයමඟ
            </span>
            <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-300 text-xs font-black">
              <span>🎯</span> දෛනික පුහුණුව
            </span>
          </div>

          {/* Title Header */}
          <div className="text-center mb-6">
            <div className="inline-block p-3.5 bg-indigo-950/80 border border-indigo-500/40 rounded-2xl mb-2 text-4xl shadow-inner shadow-indigo-500/20">
              🎓
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
              සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලිය
            </h1>
            <p className="text-sm font-bold text-indigo-300 mt-1">
              5 ශ්‍රේණියේ දරුවන් සඳහාම විශේෂයෙන් සකසන ලද දෛනික MCQ පෙරහුරුව
            </p>
          </div>

          {/* Today's Active Quiz Badge */}
          {quizInfo && (
            <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 p-4 sm:p-5 text-white shadow-xl border border-indigo-400/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-2 -mr-2 opacity-25 text-7xl font-black select-none pointer-events-none">
                {quizInfo.subjectEmoji || '📝'}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider backdrop-blur-sm text-amber-200">
                    අද දවසේ ප්‍රශ්නාවලිය
                  </span>
                  <span className="text-xs font-bold text-blue-200">5 ප්‍රශ්න • විනාඩි 5</span>
                </div>
                <h2 className="text-2xl font-black flex items-center gap-2 mt-1 text-white">
                  <span>{quizInfo.subjectEmoji || '🌿'}</span>
                  <span>{quizInfo.subject}</span>
                </h2>
                <p className="text-sm font-medium text-blue-100 mt-1">
                  📌 මාතෘකාව: <span className="font-extrabold text-amber-300">{quizInfo.topic}</span>
                </p>
              </div>
            </div>
          )}

          {/* Name Input Section */}
          <div className="mb-6 text-left bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-indigo-500/30 shadow-inner">
            <label className="mb-2 block text-base font-black text-indigo-200 flex items-center gap-2">
              <span>✍️</span> ඔබේ නම ඇතුළත් කරන්න:
            </label>
            <input 
              type="text"
              className="w-full min-h-[56px] rounded-xl border-2 border-indigo-400/60 bg-slate-950/80 px-4 py-3 text-lg font-bold text-white placeholder-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 focus:outline-none transition-all shadow-inner"
              placeholder="උදා: කසුන් පෙරේරා..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart()
              }}
            />
            <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1">
              <span>🔒</span> ඔබේ ලකුණු සුමිත් සර්ගේ Google Sheet වෙත සුරක්ෂිතව සටහන් වේ.
            </p>
          </div>

          {/* Start Quiz Golden Button */}
          <button 
            onClick={handleStart}
            className="w-full min-h-[60px] rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:via-orange-400 hover:to-amber-400 px-6 py-4 text-xl font-black text-slate-950 shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 border-2 border-amber-300/50"
          >
            <span>ප්‍රශ්නාවලිය පටන් ගමු!</span>
            <span className="text-2xl">🚀</span>
          </button>

          {/* WhatsApp Share Button */}
          {quizInfo && (
            <div className="mt-6 border-t border-slate-800 pt-5">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `📚 *සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලිය*\n\n📖 *විෂය:* ${quizInfo.subject}\n📋 *මාතෘකාව:* ${quizInfo.topic}\n❓ *ප්‍රශ්න ගණන:* 5\n\n👉 *ප්‍රශ්නාවලියට සහභාගී වීමට:*\n${typeof window !== 'undefined' ? window.location.origin : ''}\n\n🏆 ලකුණු 5/5 ගත හැකිද බලන්න!\n— *සුමිත් සර්ගේ පන්තිය*`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full min-h-[50px] rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base shadow-lg shadow-emerald-950/50 transition-all active:scale-95 border border-emerald-400/30"
              >
                <span className="text-xl">📲</span>
                <span>WhatsApp Group එකට Share කරන්න</span>
              </a>
            </div>
          )}

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 shadow-md flex items-center gap-3">
            <div className="text-3xl p-2 bg-blue-950/80 border border-blue-500/30 rounded-xl">⏱️</div>
            <div>
              <p className="font-extrabold text-white text-sm">විනාඩි 5ක පුහුණුව</p>
              <p className="text-xs text-slate-400">දිනපතා කෙටි අභ්‍යාස</p>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 shadow-md flex items-center gap-3">
            <div className="text-3xl p-2 bg-amber-950/80 border border-amber-500/30 rounded-xl">💡</div>
            <div>
              <p className="font-extrabold text-white text-sm">ක්ෂණික පැහැදිලි කිරීම්</p>
              <p className="text-xs text-slate-400">නිවැරදි පිළිතුරු විවරණ</p>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 shadow-md flex items-center gap-3">
            <div className="text-3xl p-2 bg-purple-950/80 border border-purple-500/30 rounded-xl">🧠</div>
            <div>
              <p className="font-extrabold text-white text-sm">විභාග රටාවේ ප්‍රශ්න</p>
              <p className="text-xs text-slate-400">පසුගිය ප්‍රශ්න පත්‍ර ආශ්‍රයෙන්</p>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-indigo-500/20 shadow-md flex items-center gap-3">
            <div className="text-3xl p-2 bg-emerald-950/80 border border-emerald-500/30 rounded-xl">📊</div>
            <div>
              <p className="font-extrabold text-white text-sm">ප්‍රතිඵල සටහන් වීම</p>
              <p className="text-xs text-slate-400">Google Sheet වාර්තා</p>
            </div>
          </div>
        </div>

        {/* Subjects Covered Section */}
        <div className="bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-indigo-500/20 shadow-md">
          <p className="text-xs font-black uppercase tracking-wider text-indigo-300 mb-3 text-center">
            ආවරණය වන ප්‍රධාන විෂය ක්ෂේත්‍ර 4
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SUBJECT_LIST.map((s, idx) => (
              <div key={idx} className={`p-3 rounded-2xl border ${s.bg} text-center font-black text-sm flex flex-col items-center justify-center gap-1 shadow-sm`}>
                <span className="text-2xl">{s.emoji}</span>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Motivational Quote */}
        <div className="rounded-2xl bg-amber-950/60 border border-amber-400/40 p-4 text-center">
          <p className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
            💡 අද දවසේ ශිෂ්‍යත්ව අවවාදය
          </p>
          <p className="text-sm font-bold text-amber-100 leading-relaxed">
            &ldquo;සෑම ප්‍රශ්නයක්ම දෙවරක් හොඳින් කියවන්න. කලබල නොවී සිතා බලා නිවැරදිම පිළිතුර තෝරාගන්න!&rdquo;
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs font-semibold text-slate-400 pb-4">
          👨‍🏫 සුමිත් සර්ගේ 5 ශ්‍රේණිය ශිෂ්‍යත්ව සම්මන්ත්‍රණ මාලාව • සියලු හිමිකම් ඇවිරිණි
        </footer>

      </div>
    </main>
  )
}

