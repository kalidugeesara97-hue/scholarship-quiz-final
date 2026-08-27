'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { playSound } from '../utils/sound'

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer?: number
  explanation?: string
}

type QuizApiResponse = {
  available: boolean
  date: string
  subject: string
  topic: string
  subjectEmoji: string
  questions: Question[]
}

function QuizContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const studentName = searchParams.get('name') || 'කසුන්'
  const avatar = searchParams.get('avatar') || '👦'

  const [loading, setLoading] = useState(true)
  const [quizData, setQuizData] = useState<QuizApiResponse | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('/api/today')
        if (res.ok) {
          const data = await res.json()
          if (data.available) {
            setQuizData(data)
          }
        }
      } catch (err) {
        console.error('Quiz fetch failed', err)
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-3xl animate-bounce mb-3 shadow-inner">
          📝
        </div>
        <p className="text-sm font-black text-slate-800">ප්‍රශ්න සූදානම් වෙමින්...</p>
      </div>
    )
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-4xl mb-2">🏖️</span>
        <h3 className="font-extrabold text-slate-800 text-base mb-1">අද දින ප්‍රශ්නාවලියක් නොමැත</h3>
        <p className="text-xs text-slate-500 mb-4">කරුණාකර හෙට නැවත පැමිණෙන්න!</p>
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

  const q = quizData.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quizData.questions.length - 1
  const progressPercent = ((currentQuestion + 1) / quizData.questions.length) * 100

  const correctAnswerIndex = q.correctAnswer !== undefined ? q.correctAnswer : 1
  const isCorrect = selectedAnswer === correctAnswerIndex

  const handleSelectOption = (idx: number) => {
    if (showResult) return
    setSelectedAnswer(idx)
    setShowResult(true)
    setAnswers((prev) => [...prev, idx])

    if (idx === correctAnswerIndex) {
      playSound('correct')
    } else {
      playSound('wrong')
    }
  }

  const handleNext = async () => {
    playSound('click')
    if (isLastQuestion) {
      setSubmitting(true)
      try {
        const payload = {
          studentName,
          answers: [...answers],
        }
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        // Calculate score
        let score = 0
        quizData.questions.forEach((question, i) => {
          const ans = i < answers.length ? answers[i] : selectedAnswer
          const correct = question.correctAnswer !== undefined ? question.correctAnswer : 1
          if (ans === correct) score++
        })

        sessionStorage.setItem(
          'quizResults',
          JSON.stringify({
            studentName,
            avatar,
            subject: quizData.subject,
            topic: quizData.topic,
            subjectEmoji: quizData.subjectEmoji,
            score: score,
            total: quizData.questions.length,
            answers: [...answers],
            questions: quizData.questions,
          })
        )

        router.push('/results')
      } catch (e) {
        console.error('Submission failed', e)
        router.push('/results')
      }
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] relative overflow-hidden">
      
      {/* QUIZ APP HEADER */}
      <div className="pt-3 px-4 pb-2.5 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => {
            playSound('click')
            router.push('/')
          }}
          className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold hover:bg-slate-200 transition"
        >
          ✕
        </button>

        {/* Segmented Duolingo Progress Bar */}
        <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex items-center gap-1 font-bold text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs">
          <span>{currentQuestion + 1} / {quizData.questions.length}</span>
        </div>
      </div>

      {/* QUIZ BODY */}
      <div className="flex-1 overflow-y-auto hide-scroll p-4 pb-28 space-y-3.5">
        
        {/* Subject & Timer Capsule */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-100/80 text-indigo-900 font-bold text-xs border border-indigo-200/50">
            <span>{quizData.subjectEmoji || '🌿'}</span> {quizData.subject} • {quizData.topic}
          </span>
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            {avatar} {studentName}
          </span>
        </div>

        {/* QUESTION CARD */}
        <div className="glow-border-card p-5 relative">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg mb-2.5 border border-indigo-100">
            ප්‍රශ්න අංක 0{currentQuestion + 1}
          </div>

          <h2 className="text-lg font-black text-slate-900 leading-snug">
            {q.question}
          </h2>
        </div>

        {/* TACTILE OPTION BUTTONS */}
        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            const isSelected = selectedAnswer === idx
            let buttonStyle = 'bg-white border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
            let badgeStyle = 'bg-slate-100 text-slate-700'

            if (showResult) {
              if (idx === correctAnswerIndex) {
                buttonStyle = 'bg-emerald-50 border-2 border-emerald-500 shadow-md shadow-emerald-500/10'
                badgeStyle = 'bg-emerald-500 text-white'
              } else if (isSelected) {
                buttonStyle = 'bg-rose-50 border-2 border-rose-400 animate-shake'
                badgeStyle = 'bg-rose-500 text-white'
              } else {
                buttonStyle = 'bg-white border border-slate-100 opacity-50'
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`btn-3d rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between shadow-xs ${buttonStyle}`}
              >
                <div className="flex items-center gap-3.5 flex-1">
                  <div className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-sm flex-shrink-0 ${badgeStyle}`}>
                    {idx + 1}
                  </div>
                  <span className={`text-sm font-bold text-slate-800 ${showResult && idx === correctAnswerIndex ? 'text-emerald-950 font-black' : ''}`}>
                    {opt}
                  </span>
                </div>

                {showResult && idx === correctAnswerIndex && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm ml-2">
                    ✓
                  </div>
                )}
                {showResult && isSelected && idx !== correctAnswerIndex && (
                  <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs shadow-sm ml-2">
                    ✕
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* SLIDE-UP EXPLANATION BOTTOM SHEET */}
        {showResult && (
          <div className={`rounded-3xl p-4 border-2 shadow-sm animate-pop-bounce ${
            isCorrect
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300'
              : 'bg-gradient-to-br from-rose-50 to-amber-50 border-rose-300'
          }`}>
            <div className="flex items-start gap-3">
              <div className="text-2xl animate-float">🦉</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-black uppercase tracking-wide ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>
                    {isCorrect ? '✓ නිවැරදියි! හරිම දක්ෂයි!' : '✗ වැරදියි. නිවැරදි පිළිතුර ඉගෙන ගමු:'}
                  </span>
                  {isCorrect && (
                    <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.2 rounded-full shadow-xs">
                      +20 XP
                    </span>
                  )}
                </div>
                <p className={`text-xs font-semibold mt-1 leading-relaxed ${isCorrect ? 'text-emerald-950' : 'text-slate-800'}`}>
                  {q.explanation || (isCorrect ? 'ඔබ තෝරාගත් පිළිතුර ඉතාම නිවැරදියි!' : `නිවැරදි පිළිතුර වන්නේ "${q.options[correctAnswerIndex]}" වේ.`)}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      {showResult && (
        <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 z-40">
          <button
            onClick={handleNext}
            disabled={submitting}
            className={`btn-3d w-full py-4 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer ${
              isCorrect ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-tactile-green' : 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-tactile-blue'
            }`}
          >
            <span>{isLastQuestion ? (submitting ? 'ප්‍රතිඵල සූදානම් වෙමින්...' : 'ප්‍රතිඵල බලමු 🏆') : 'ඊළඟ ප්‍රශ්නය ➔'}</span>
          </button>
        </div>
      )}

    </div>
  )
}

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl animate-bounce mb-3 shadow-inner">
            🎓
          </div>
          <p className="text-sm font-extrabold text-slate-700">ප්‍රශ්නාවලිය ආරම්භ වෙමින්...</p>
        </div>
      }
    >
      <QuizContent />
    </Suspense>
  )
}
