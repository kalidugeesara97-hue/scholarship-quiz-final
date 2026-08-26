'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type Question = {
  id: number
  question: string
  options: string[]
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
  const studentName = searchParams.get('name') || 'සිසුවා'

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
      } catch {
        // silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-4">
        <div className="text-center p-8 bg-slate-900/90 rounded-3xl shadow-2xl border border-indigo-500/30 text-white">
          <div className="text-5xl mb-4 animate-bounce">📝</div>
          <p className="text-2xl font-black text-amber-400">ප්‍රශ්න පූරණය වෙමින් පවතී...</p>
          <p className="text-sm font-semibold text-slate-300 mt-2">සුළු මොහොතක් රැඳී සිටින්න ⏳</p>
        </div>
      </div>
    )
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950">
        <div className="text-center rounded-3xl bg-slate-900/90 p-8 shadow-2xl max-w-md w-full border border-indigo-500/30 text-white">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-2xl font-black text-white mb-2">ප්‍රශ්න සූදානම් කරමින්</p>
          <p className="text-slate-300 mb-6 font-medium">අද දින ප්‍රශ්නාවලිය ආරම්භ කිරීමට සූදානම් වන්න</p>
          <button
            onClick={() => router.push('/')}
            className="w-full rounded-2xl bg-amber-500 hover:bg-amber-400 px-6 py-4 text-slate-950 font-black text-lg shadow-lg active:scale-95 transition-all"
          >
            මුල් පිටුවට යන්න 🏠
          </button>
        </div>
      </div>
    )
  }

  const question = quizData.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quizData.questions.length - 1
  const optionLabels = ['(1)', '(2)', '(3)']

  const handleOptionClick = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
    setShowResult(true)
    const newAnswers = [...answers, index]
    setAnswers(newAnswers)
  }

  const handleNext = async () => {
    if (isLastQuestion) {
      setSubmitting(true)
      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentName, answers })
        })

        if (res.ok) {
          const data = await res.json()
          sessionStorage.setItem('quizResults', JSON.stringify(data))
        } else {
          sessionStorage.setItem('quizResults', JSON.stringify({
            studentName,
            score: 0,
            totalQuestions: quizData.questions.length,
            results: [],
            error: true
          }))
        }
      } catch {
        sessionStorage.setItem('quizResults', JSON.stringify({
          studentName,
          score: 0,
          totalQuestions: quizData.questions.length,
          results: [],
          error: true
        }))
      }

      router.push('/results')
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 py-6 px-4 flex flex-col justify-between max-w-lg mx-auto text-slate-100">
      
      {/* Top Header Card */}
      <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-indigo-500/30 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl p-1.5 bg-indigo-950 rounded-xl border border-indigo-500/30">👦</span>
            <div>
              <p className="text-xs font-bold text-slate-400">ශිෂ්‍යයාගේ නම</p>
              <p className="font-black text-amber-300 text-base">{studentName}</p>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow border border-indigo-400/30">
            ප්‍රශ්නය {currentQuestion + 1} / {quizData.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3.5 w-full rounded-full bg-slate-800 overflow-hidden p-0.5 border border-indigo-500/30">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 transition-all duration-500 shadow-sm"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / quizData.questions.length) * 100}%` }}
          />
        </div>

        {/* Subject Pill */}
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 text-xs font-extrabold border border-indigo-500/30">
            <span>{quizData.subjectEmoji || '📚'}</span>
            <span>{quizData.subject} • {quizData.topic}</span>
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-indigo-500/40 flex-1 flex flex-col justify-between my-2">
        <div>
          {/* Question Number Badge */}
          <div className="inline-block px-3 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-black mb-3">
            ප්‍රශ්න අංක 0{currentQuestion + 1}
          </div>

          {/* Question Title */}
          <h2 className="mb-6 text-xl sm:text-2xl font-black text-white leading-snug">
            {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((opt, idx) => {
              let btnClass = 'bg-slate-800/80 border-2 border-slate-700 hover:border-indigo-400 hover:bg-indigo-950/50 text-slate-200'
              let iconClass = 'bg-slate-700 text-slate-300'

              if (showResult && selectedAnswer === idx) {
                btnClass = 'bg-indigo-900/90 border-2 border-amber-400 text-amber-200 font-black shadow-lg ring-2 ring-amber-400/30'
                iconClass = 'bg-amber-400 text-slate-950'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showResult}
                  className={`flex items-center gap-3.5 rounded-2xl p-4 text-left text-lg w-full min-h-[60px] ${btnClass} transition-all active:scale-[0.98] disabled:cursor-default`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-black text-sm transition-all ${iconClass}`}>
                    {optionLabels[idx]}
                  </span>
                  <span className="leading-relaxed font-bold flex-1">{opt}</span>
                </button>
              )
            })}
          </div>

          {/* Answer Recorded Feedback */}
          {showResult && (
            <div className="mt-5 rounded-2xl bg-emerald-950/80 p-4 border-2 border-emerald-500/40 animate-slide-up flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div>
                <p className="font-black text-emerald-300 text-sm">ඔබේ පිළිතුර සාර්ථකව සටහන් විය!</p>
                <p className="text-emerald-400 text-xs font-semibold">අවසානයේ සියලු නිවැරදි පිළිතුරු විවරණ බලාගත හැක.</p>
              </div>
            </div>
          )}
        </div>

        {/* Next / Finish Button */}
        {showResult && (
          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={handleNext}
              disabled={submitting}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 px-6 py-4 text-xl font-black text-slate-950 shadow-xl shadow-orange-500/30 active:scale-95 disabled:opacity-50 min-h-[56px] transition-all flex items-center justify-center gap-2 border border-amber-300/50"
            >
              <span>{submitting ? '⏳ ලකුණු සටහන් කරමින්...' : isLastQuestion ? '🏆 ප්‍රතිඵල බලමු!' : 'ඊළඟ ප්‍රශ්නය'}</span>
              {!submitting && <span>{isLastQuestion ? '🎉' : '→'}</span>}
            </button>
          </div>
        )}
      </div>

      {/* Encouragement Footer */}
      <div className="text-center text-xs font-bold text-slate-400 mt-2">
        🎯 5 ශ්‍රේණිය ශිෂ්‍යත්ව ප්‍රශ්නාවලිය • සුමිත් සර්
      </div>

    </main>
  )
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-xl text-amber-400 font-black">📝 පූරණය වෙමින්...</p>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
