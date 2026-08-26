'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  HeroBannerIllustration,
  NatureIllustration,
  SinhalaIllustration,
  MathIllustration,
  IQIllustration
} from './components/Illustrations'

type QuizInfo = {
  subject: string
  topic: string
  subjectEmoji?: string
}

const AVATARS = [
  { emoji: '👦', label: 'පුතා' },
  { emoji: '👧', label: 'දුව' },
  { emoji: '🦁', label: 'සිංහයා' },
  { emoji: '🚀', label: 'රොකට්' },
  { emoji: '🌟', label: 'තරුව' },
  { emoji: '🦉', label: 'බස්සා' },
]

const SUBJECTS = [
  {
    name: 'පරිසරය',
    desc: 'ගස්වැල්, සතුන්, ජාතික සම්පත්',
    illustration: <NatureIllustration />,
    border: 'border-emerald-300',
    bg: 'bg-emerald-50/90',
    text: 'text-emerald-900',
  },
  {
    name: 'සිංහල',
    desc: 'ව්‍යාකරණ, තේරුම් ගැනීම',
    illustration: <SinhalaIllustration />,
    border: 'border-amber-300',
    bg: 'bg-amber-50/90',
    text: 'text-amber-900',
  },
  {
    name: 'ගණිතය',
    desc: 'ගැටලු, රටා, මුදල් හා කාලය',
    illustration: <MathIllustration />,
    border: 'border-blue-300',
    bg: 'bg-blue-50/90',
    text: 'text-blue-900',
  },
  {
    name: 'සාමාන්‍ය බුද්ධිය',
    desc: 'IQ, රූප රටා හා තර්කනය',
    illustration: <IQIllustration />,
    border: 'border-purple-300',
    bg: 'bg-purple-50/90',
    text: 'text-purple-900',
  },
]

export default function Home() {
  const router = useRouter()
  const [studentName, setStudentName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('👦')
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
      } catch {
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
    router.push(`/quiz?name=${encodeURIComponent(nameToUse)}&avatar=${encodeURIComponent(selectedAvatar)}`)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-indigo-50 p-4">
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-indigo-100 max-w-sm w-full animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce">📚</div>
          <p className="text-2xl font-black text-indigo-900">ප්‍රශ්නාවලිය සකස් වෙමින් පවතී...</p>
          <p className="text-sm font-bold text-indigo-500 mt-2">සුළු මොහොතක් රැඳී සිටින්න ⏳</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen py-6 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-5">
        
        {/* Canva-Style Illustrated Hero Banner */}
        <HeroBannerIllustration />

        {/* Main Interactive Action Card */}
        <div className="w-full rounded-3xl bg-white p-6 sm:p-7 shadow-2xl shadow-indigo-100/70 border-4 border-indigo-100 relative overflow-hidden">
          
          {/* Today's Active Quiz Pill */}
          {quizInfo && (
            <div className="mb-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider backdrop-blur-sm text-amber-200">
                  අද දවසේ ප්‍රශ්නාවලිය
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                  ප්‍රශ්න 5 යි • විනාඩි 5
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 mt-1">
                <span>{quizInfo.subjectEmoji || '🌿'}</span>
                <span>{quizInfo.subject}</span>
              </h2>
              <p className="text-xs sm:text-sm font-bold text-blue-100 mt-0.5">
                📌 මාතෘකාව: <span className="font-black text-amber-300">{quizInfo.topic}</span>
              </p>
            </div>
          )}

          {/* 1. Choose Avatar */}
          <div className="mb-4">
            <label className="block text-xs font-black text-indigo-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px]">1</span>
              <span>ඔබේ Avatar රූපය තෝරන්න:</span>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.emoji}
                  type="button"
                  onClick={() => setSelectedAvatar(av.emoji)}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 text-2xl transition-all cursor-pointer ${
                    selectedAvatar === av.emoji
                      ? 'border-indigo-600 bg-indigo-50 shadow-md scale-110 ring-2 ring-indigo-300'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200'
                  }`}
                >
                  <span>{av.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Student Name Input */}
          <div className="mb-5 text-left">
            <label className="mb-2 block text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px]">2</span>
              <span>ඔබේ නම ඇතුළත් කරන්න:</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl select-none">
                {selectedAvatar}
              </span>
              <input 
                type="text"
                className="w-full min-h-[58px] rounded-2xl border-2 border-indigo-200 bg-indigo-50/40 pl-14 pr-4 py-3 text-lg font-black text-indigo-950 placeholder-indigo-300 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all shadow-inner"
                placeholder="ඔබේ නම මෙහි ලියන්න..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStart()
                }}
              />
            </div>
          </div>

          {/* 3. Start Quiz 3D Button */}
          <button 
            onClick={handleStart}
            className="w-full min-h-[64px] rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-2xl px-6 py-4 shadow-[0_6px_0_#059669] active:translate-y-1 active:shadow-[0_2px_0_#059669] transition-all flex items-center justify-center gap-2.5 cursor-pointer border-2 border-emerald-400/60"
          >
            <span>ප්‍රශ්නාවලිය පටන් ගමු!</span>
            <span className="text-3xl">🚀</span>
          </button>

          {/* WhatsApp Share Button */}
          {quizInfo && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `📚 *සුමිත් සර්ගේ ශිෂ්‍යත්ව ප්‍රශ්නාවලිය*\n\n📖 *විෂය:* ${quizInfo.subject}\n📋 *මාතෘකාව:* ${quizInfo.topic}\n❓ *ප්‍රශ්න ගණන:* 5\n\n👉 *ප්‍රශ්නාවලියට සහභාගී වීමට:*\n${typeof window !== 'undefined' ? window.location.origin : ''}\n\n🏆 ලකුණු 5/5 ගත හැකිද බලන්න!\n— *සුමිත් සර්ගේ පන්තිය*`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full min-h-[46px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                <span className="text-lg">📲</span>
                <span>WhatsApp Group එකට Share කරන්න</span>
              </a>
            </div>
          )}

        </div>

        {/* 4 Illustrated Subjects Cards (Canva-styled visual cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-indigo-950 text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5">
              <span>🎨</span> විෂය නිර්දේශ පෙරහුරුව
            </h3>
            <span className="text-xs font-bold text-indigo-600">5 ශ්‍රේණිය</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SUBJECTS.map((s, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-3xl border-2 ${s.border} ${s.bg} shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center justify-between gap-2`}
              >
                <div className="p-2 rounded-2xl bg-white shadow-sm">
                  {s.illustration}
                </div>
                <div>
                  <h4 className={`font-black text-base ${s.text}`}>{s.name}</h4>
                  <p className="text-[11px] font-bold text-slate-500 mt-0.5 leading-snug">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Motivation Card */}
        <div className="rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/80 p-4 sm:p-5 text-center shadow-sm">
          <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <span>💡</span> අද දවසේ ශිෂ්‍යත්ව උපදෙස
          </p>
          <p className="text-sm font-extrabold text-amber-950 leading-relaxed">
            &ldquo;සෑම ප්‍රශ්නයක්ම දෙවරක් හොඳින් කියවන්න. කලබල නොවී සිතා බලා නිවැරදිම පිළිතුර තෝරාගන්න!&rdquo;
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs font-bold text-slate-400 pb-6">
          👨‍🏫 සුමිත් සර්ගේ 5 ශ්‍රේණිය ශිෂ්‍යත්ව පුහුණු මධ්‍යස්ථානය • සියලු හිමිකම් ඇවිරිණි
        </footer>

      </div>
    </main>
  )
}

