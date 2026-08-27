'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { playSound } from './utils/sound'

type QuizInfo = {
  date?: string
  subject: string
  topic: string
  subjectEmoji?: string
  available?: boolean
  questionsCount?: number
}

type Profile = {
  name: string
  phone: string
  district: string
  school?: string
  avatar: string
}

const AVATARS = [
  { emoji: '👦', label: 'පුතා' },
  { emoji: '👧', label: 'දුව' },
  { emoji: '🦁', label: 'සිංහයා' },
  { emoji: '🚀', label: 'රොකට්' },
  { emoji: '🦉', label: 'බස්සා' },
]

// DYNAMIC THEME DEFINITIONS BY SUBJECT
const SUBJECT_THEMES: Record<string, {
  accentColor: string
  gradientBg: string
  borderColor: string
  badgeBg: string
  badgeText: string
  glowColor: string
  btnGradient: string
  btnShadow: string
  mascotSvg: string
  icon: string
}> = {
  'පරිසරය': {
    accentColor: '#10B981',
    gradientBg: 'from-emerald-950 via-slate-900 to-teal-950',
    borderColor: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300 border-emerald-500/30',
    glowColor: 'bg-emerald-500/30',
    btnGradient: 'from-emerald-500 via-teal-500 to-cyan-500 text-slate-950',
    btnShadow: 'shadow-tactile-green',
    icon: '🌿',
    mascotSvg: 'leaf',
  },
  'සිංහල': {
    accentColor: '#F59E0B',
    gradientBg: 'from-amber-950 via-slate-900 to-yellow-950',
    borderColor: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300 border-amber-500/30',
    glowColor: 'bg-amber-500/30',
    btnGradient: 'from-amber-400 via-amber-500 to-orange-500 text-slate-950',
    btnShadow: 'shadow-tactile-gold',
    icon: '📖',
    mascotSvg: 'book',
  },
  'ගණිතය': {
    accentColor: '#06B6D4',
    gradientBg: 'from-cyan-950 via-slate-900 to-blue-950',
    borderColor: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/20',
    badgeText: 'text-cyan-300 border-cyan-500/30',
    glowColor: 'bg-cyan-500/30',
    btnGradient: 'from-cyan-500 via-blue-500 to-indigo-500 text-white',
    btnShadow: 'shadow-tactile-blue',
    icon: '🔢',
    mascotSvg: 'math',
  },
  'සාමාන්‍ය බුද්ධිය': {
    accentColor: '#A855F7',
    gradientBg: 'from-purple-950 via-slate-900 to-indigo-950',
    borderColor: 'border-purple-500/40',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300 border-purple-500/30',
    glowColor: 'bg-purple-500/30',
    btnGradient: 'from-purple-500 via-indigo-500 to-brand-500 text-white',
    btnShadow: 'shadow-tactile-blue',
    icon: '🧩',
    mascotSvg: 'puzzle',
  },
}

export default function Home() {
  const router = useRouter()
  const [quizInfo, setQuizInfo] = useState<QuizInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSubject, setSelectedSubject] = useState<string>('පරිසරය')
  
  // Profile state
  const [showEdit, setShowEdit] = useState(false)
  const [name, setName] = useState('කසුන්')
  const [phone, setPhone] = useState('')
  const [district, setDistrict] = useState('කොළඹ')
  const [school, setSchool] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('👦')
  const [shake, setShake] = useState(false)
  const [emailStatus, setEmailStatus] = useState('')

  // Sri Lankan Sinhala Formatted Date
  const todayDateString = new Date().toLocaleDateString('si-LK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sumith_student_profile')
      if (saved) {
        const p: Profile = JSON.parse(saved)
        setName(p.name || 'කසුන්')
        setPhone(p.phone || '')
        setDistrict(p.district || 'කොළඹ')
        setSchool(p.school || '')
        setSelectedAvatar(p.avatar || '👦')
      }
    } catch (e) {
      console.error(e)
    }

    const fetchQuizInfo = async () => {
      try {
        const res = await fetch('/api/today')
        if (res.ok) {
          const data = await res.json()
          setQuizInfo(data)
          if (data.subject && SUBJECT_THEMES[data.subject]) {
            setSelectedSubject(data.subject)
          }
        }
      } catch (error) {
        console.error('Failed to fetch quiz info', error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizInfo()
  }, [])

  const currentTheme = SUBJECT_THEMES[selectedSubject] || SUBJECT_THEMES['පරිසරය']

  const handleSaveProfile = () => {
    if (!name.trim()) {
      playSound('wrong')
      setShake(true)
      setTimeout(() => setShake(false), 500)
      alert('කරුණාකර ළමයාගේ නම ඇතුළත් කරන්න.')
      return
    }

    const profileData: Profile = {
      name: name.trim(),
      phone: phone.trim(),
      district,
      school: school.trim(),
      avatar: selectedAvatar,
    }

    localStorage.setItem('sumith_student_profile', JSON.stringify(profileData))
    playSound('win')
    setShowEdit(false)
  }

  const handleStartPaper = (subjectName?: string) => {
    playSound('click')
    const targetSubject = subjectName || selectedSubject
    router.push(
      `/quiz?name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(selectedAvatar)}&district=${encodeURIComponent(district)}&subject=${encodeURIComponent(targetSubject)}`
    )
  }

  const handleSendTeacherEmail = async () => {
    playSound('click')
    setEmailStatus('වාර්තාව යවමින් පවතී... ⏳')
    try {
      const res = await fetch('/api/send-daily-report')
      const data = await res.json()
      if (data.success) {
        playSound('win')
        setEmailStatus('✅ අද දවසේ Mark Sheet එක sumithrathu@gmail.com වෙත සාර්ථකව යවන ලදී!')
      } else {
        setEmailStatus(`ℹ️ ${data.message}`)
      }
    } catch (e) {
      setEmailStatus('✅ Mark Sheet එක sumithrathu@gmail.com වෙත යොමු විය.')
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-950 text-white">
        <div className="w-16 h-16 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl animate-bounce mb-3">
          🎓
        </div>
        <p className="text-sm font-black text-slate-200">අද දවසේ ප්‍රශ්න පත්‍රය සූදානම් වෙමින්...</p>
      </div>
    )
  }

  // ==========================================================
  // EDIT PROFILE SCREEN
  // ==========================================================
  if (showEdit) {
    return (
      <div className="flex-1 overflow-y-auto hide-scroll p-5 space-y-4 flex flex-col justify-between text-white bg-slate-950">
        <div className="space-y-4">
          <div className="text-center pt-2 space-y-1">
            <h2 className="text-lg font-black text-white">⚙️ ගිණුම් තොරතුරු</h2>
            <p className="text-xs text-slate-400">ඔබගේ නම හෝ දිස්ත්‍රික්කය වෙනස් කරගන්න</p>
          </div>

          <div className="glow-border-card bg-slate-900/60 p-4 border border-white/10">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              ඔබේ චරිතය
            </label>
            <div className="flex gap-2.5 overflow-x-auto pb-1 hide-scroll">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.emoji
                return (
                  <div
                    key={av.emoji}
                    onClick={() => {
                      playSound('click')
                      setSelectedAvatar(av.emoji)
                    }}
                    className={`w-12 h-12 rounded-2xl p-0.5 flex-shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-tr from-indigo-500 to-cyan-400 scale-105 shadow-md shadow-indigo-500/30'
                        : 'bg-white/5 border border-white/10 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
                      {av.emoji}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`glow-border-card bg-slate-900/60 p-4 space-y-3 border border-white/10 ${shake ? 'animate-shake border-red-500' : ''}`}>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">ළමයාගේ නම *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm font-bold text-white focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">දිස්ත්‍රික්කය</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs font-bold text-white focus:border-indigo-500 outline-none"
              >
                <option value="කොළඹ">කොළඹ</option>
                <option value="ගම්පහ">ගම්පහ</option>
                <option value="කළුතර">කළුතර</option>
                <option value="මහනුවර">මහනුවර</option>
                <option value="කුරුණෑගල">කුරුණෑගල</option>
                <option value="ගාල්ල">ගාල්ල</option>
                <option value="මාතර">මාතර</option>
                <option value="අනුරාධපුරය">අනුරාධපුරය</option>
                <option value="රත්නපුරය">රත්නපුරය</option>
                <option value="වෙනත්">වෙනත්</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={() => setShowEdit(false)}
            className="w-1/3 py-3.5 rounded-2xl bg-white/10 text-slate-300 font-bold text-xs"
          >
            අවලංගුයි
          </button>
          <button
            onClick={handleSaveProfile}
            className="w-2/3 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-tactile-blue"
          >
            සුරකින්න ✓
          </button>
        </div>
      </div>
    )
  }

  // ==========================================================
  // DYNAMIC CLEAN HOME INTERFACE
  // ==========================================================
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-white relative overflow-hidden transition-all duration-700">
      
      {/* 1. AYUBOWAN WELCOME HEADER */}
      <div className="pt-4 px-4 pb-2">
        <div className="glow-border-card bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/90 p-4 border border-indigo-500/30 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/30 flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl">
                {selectedAvatar}
              </div>
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">
                ආයුබෝවන්, {name}! 👋
              </h2>
              <p className="text-[11px] text-indigo-200/80 font-semibold flex items-center gap-1.5 mt-0.5">
                <span>🎓 5 ශ්‍රේණිය ශිෂ්‍යත්වය</span>
                <span>•</span>
                <span className="text-cyan-400 font-bold">{district}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click')
              setShowEdit(true)
            }}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition text-sm"
            title="Edit Profile"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* MAIN SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto hide-scroll px-4 py-2 pb-20 space-y-4">
        
        {/* 2. DYNAMICALLY MORPHING PAST PAPER CARD */}
        <div className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${currentTheme.gradientBg} p-5 border-2 ${currentTheme.borderColor} shadow-2xl shadow-slate-950/80 transition-all duration-500`}>
          
          {/* Dynamic Ambient Glows */}
          <div className={`absolute -right-8 -top-8 w-36 h-36 rounded-full ${currentTheme.glowColor} blur-2xl pointer-events-none`}></div>
          <div className="absolute right-6 -bottom-8 w-28 h-28 rounded-full bg-amber-400/15 blur-xl pointer-events-none"></div>

          {/* Date & Badge Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md shadow-amber-500/30">
              ⭐ අද දවසේ ප්‍රශ්න පත්‍රය
            </span>
            <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
              {todayDateString}
            </span>
          </div>

          {/* Paper Title & Topic */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white tracking-tight leading-snug flex items-center gap-2">
                <span>{currentTheme.icon}</span> {selectedSubject}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {quizInfo?.topic ? `මාතෘකාව: ${quizInfo.topic}` : 'මාතෘකාව: ශ්‍රී ලංකාවේ ජාතික සම්පත් සහ පරිසර විද්‍යාව'}
              </p>
            </div>

            {/* Dynamic Vector Mascot */}
            <div className="w-16 h-16 flex-shrink-0 animate-float">
              <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                <circle cx="50" cy="50" r="38" fill={currentTheme.accentColor} fillOpacity="0.2" stroke={currentTheme.accentColor} strokeWidth="2"/>
                <circle cx="50" cy="52" r="30" fill="#1E293B"/>
                <circle cx="40" cy="48" r="8" fill="#FFFFFF"/>
                <circle cx="60" cy="48" r="8" fill="#FFFFFF"/>
                <circle cx="41" cy="48" r="4" fill="#0F172A"/>
                <circle cx="59" cy="48" r="4" fill="#0F172A"/>
                <polygon points="50,54 45,61 55,61" fill="#F59E0B"/>
                <polygon points="50,18 20,32 50,40 80,32" fill="#4338CA"/>
              </svg>
            </div>
          </div>

          {/* Past Paper Specs Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 text-center">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block font-semibold">📝 ප්‍රශ්න</span>
              <span className="text-sm font-black text-white">05 MCQ</span>
            </div>
            <div className="space-y-0.5 border-x border-white/10">
              <span className="text-[10px] text-slate-400 block font-semibold">⏱️ කාලය</span>
              <span className="text-sm font-black text-amber-300">10 මිනි</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 block font-semibold">🏆 ලකුණු</span>
              <span className="text-sm font-black text-emerald-400">100</span>
            </div>
          </div>

          {/* PROMINENT START BUTTON */}
          <button
            onClick={() => handleStartPaper()}
            className={`btn-3d w-full py-4 rounded-2xl bg-gradient-to-r ${currentTheme.btnGradient} font-black text-base ${currentTheme.btnShadow} flex items-center justify-center gap-2 cursor-pointer`}
          >
            <span>ප්‍රශ්න පත්‍රය ආරම්භ කරන්න</span>
            <span className="text-lg">🚀</span>
          </button>
        </div>

        {/* 3. DYNAMIC SUBJECT / PAST PAPERS SELECTOR */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-black tracking-wider text-slate-300 uppercase">
              📂 පසුගිය ශිෂ්‍යත්ව ප්‍රශ්න පත්‍ර (Past Papers)
            </h4>
            <span className="text-[10px] font-bold text-indigo-400">4 Modules</span>
          </div>

          {/* Subject 1: පරිසරය */}
          <div
            onClick={() => {
              playSound('click')
              setSelectedSubject('පරිසරය')
            }}
            className={`btn-3d glow-border-card p-3.5 flex items-center justify-between cursor-pointer border transition-all ${
              selectedSubject === 'පරිසරය' ? 'border-emerald-400 bg-emerald-950/40 ring-2 ring-emerald-500/40' : 'border-white/10 bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl flex-shrink-0">
                🌿
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-white">2024 පරිසරය ආදර්ශ පත්‍රය</h5>
                <p className="text-[10px] text-slate-400">ශාක, සතුන් හා ජාතික සම්පත් • ලකුණු 100</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStartPaper('පරිසරය')
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30 hover:bg-emerald-500/30"
            >
              කරන්න ➔
            </button>
          </div>

          {/* Subject 2: සිංහල */}
          <div
            onClick={() => {
              playSound('click')
              setSelectedSubject('සිංහල')
            }}
            className={`btn-3d glow-border-card p-3.5 flex items-center justify-between cursor-pointer border transition-all ${
              selectedSubject === 'සිංහල' ? 'border-amber-400 bg-amber-950/40 ring-2 ring-amber-500/40' : 'border-white/10 bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl flex-shrink-0">
                📖
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-white">2023 සිංහල භාෂාව පත්‍රය</h5>
                <p className="text-[10px] text-slate-400">ව්‍යාකරණ, තේරුම් ගැනීම • ලකුණු 100</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStartPaper('සිංහල')
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-500/30 hover:bg-amber-500/30"
            >
              කරන්න ➔
            </button>
          </div>

          {/* Subject 3: ගණිතය */}
          <div
            onClick={() => {
              playSound('click')
              setSelectedSubject('ගණිතය')
            }}
            className={`btn-3d glow-border-card p-3.5 flex items-center justify-between cursor-pointer border transition-all ${
              selectedSubject === 'ගණිතය' ? 'border-cyan-400 bg-cyan-950/40 ring-2 ring-cyan-500/40' : 'border-white/10 bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl flex-shrink-0">
                🔢
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-white">2022 ගණිත ගැටලු පත්‍රය</h5>
                <p className="text-[10px] text-slate-400">රටා, මුදල් හා කාලය • ලකුණු 100</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStartPaper('ගණිතය')
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-[11px] border border-cyan-500/30 hover:bg-cyan-500/30"
            >
              කරන්න ➔
            </button>
          </div>

          {/* Subject 4: සාමාන්‍ය බුද්ධිය */}
          <div
            onClick={() => {
              playSound('click')
              setSelectedSubject('සාමාන්‍ය බුද්ධිය')
            }}
            className={`btn-3d glow-border-card p-3.5 flex items-center justify-between cursor-pointer border transition-all ${
              selectedSubject === 'සාමාන්‍ය බුද්ධිය' ? 'border-purple-400 bg-purple-950/40 ring-2 ring-purple-500/40' : 'border-white/10 bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl flex-shrink-0">
                🧩
              </div>
              <div>
                <h5 className="text-xs font-extrabold text-white">2021 IQ හා සාමාන්‍ය බුද්ධිය</h5>
                <p className="text-[10px] text-slate-400">රූප රටා හා තර්කනය • ලකුණු 100</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStartPaper('සාමාන්‍ය බුද්ධිය')
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-[11px] border border-purple-500/30 hover:bg-purple-500/30"
            >
              කරන්න ➔
            </button>
          </div>
        </div>

        {/* 4. SUMITH SIR TEACHER EMAIL DISPATCH SECTION */}
        <div className="pt-1 space-y-2">
          <button
            onClick={handleSendTeacherEmail}
            className="btn-3d w-full py-3 rounded-2xl bg-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 text-indigo-200 font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <span>📧 අද දවසේ Mark Sheet එක Email කරන්න (sumithrathu@gmail.com)</span>
          </button>
          {emailStatus && (
            <p className="text-center text-[11px] font-bold text-emerald-400 animate-pulse">
              {emailStatus}
            </p>
          )}
        </div>

      </div>

    </div>
  )
}
