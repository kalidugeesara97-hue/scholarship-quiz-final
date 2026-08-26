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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-indigo-50 p-4">
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border-4 border-indigo-100 max-w-sm w-full animate-slide-up">
          <div className="text-6xl mb-4 animate-bounce">📝</div>
          <p className="text-2xl font-black text-indigo-900">ප්‍රශ්න පූරණය වෙමින් පවතී...</p>
          <p className="text-sm font-bold text-indigo-500 mt-2">සුළු මොහොතක් රැඳී සිටින්න ⏳</p>
        </div>
      </div>
    )
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-b from-sky-50 to-indigo-50">
        <div className="text-center rounded-3xl bg-white p-8 shadow-2xl max-w-md w-full border-4 border-indigo-100">
          <div className="text-6xl mb-4">📚</div>
          <p className="text-2xl font-black text-indigo-950 mb-2">ප්‍රශ්න සූදානම් කරමින්</p>
          <p className="text-slate-600 mb-6 font-bold">අද දින ප්‍රශ්නාවලිය ආරම්භ කිරීමට සූදානම් වන්න</p>
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
          sessionStorage.setItem('quizResults', JSON.stringify({ ...data, avatar }))
        } else {
          sessionStorage.setItem('quizResults', JSON.stringify({
            studentName,
            avatar,
            score: 0,
            totalQuestions: quizData.questions.length,
            results: [],
            error: true
          }))
        }
      } catch {
        sessionStorage.setItem('quizResults', JSON.stringify({
          studentName,
          avatar,
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
    <main className="min-h-screen py-6 px-4 flex flex-col justify-between max-w-lg mx-auto">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-lg border-2 border-indigo-100 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl p-1 bg-indigo-50 rounded-2xl border border-indigo-100">{avatar}</span>
            <div>
              <p className="text-[11px] font-black uppercase text-indigo-400">ශිෂ්‍යයා</p>
              <p className="font-black text-indigo-950 text-base leading-tight">{studentName}</p>
            </div>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm shadow-md">
            ප්‍රශ්නය {currentQuestion + 1} / {quizData.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-4 w-full rounded-full bg-indigo-50 overflow-hidden p-0.5 border border-indigo-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 transition-all duration-500 shadow-sm"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / quizData.questions.length) * 100}%` }}
          />
        </div>

        {/* Subject Pill */}
        <div className="mt-3 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-900 text-xs font-black border border-indigo-100">
            <span>{quizData.subjectEmoji || '📚'}</span>
            <span>{quizData.subject} • {quizData.topic}</span>
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-indigo-100/70 border-4 border-indigo-100/80 flex-1 flex flex-col justify-between my-2">
        <div>
          {/* Question Number Badge */}
          <div className="inline-block px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black mb-3">
            ප්‍රශ්න අංක 0{currentQuestion + 1}
          </div>

          {/* Question Title */}
          <h2 className="mb-6 text-xl sm:text-2xl font-black text-indigo-950 leading-snug">
            {question.question}
          </h2>

          {/* Options (3D interactive cards) */}
          <div className="flex flex-col gap-3.5">
            {question.options.map((opt, idx) => {
              let btnClass = 'bg-slate-50 border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-800 shadow-[0_4px_0_#cbd5e1]'
              let iconClass = 'bg-slate-200 text-slate-700'

              if (showResult && selectedAnswer === idx) {
                btnClass = 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950 font-black shadow-[0_4px_0_#4f46e5] ring-2 ring-indigo-300'
                iconClass = 'bg-indigo-600 text-white'
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showResult}
                  className={`flex items-center gap-3.5 rounded-2xl p-4 text-left text-base sm:text-lg w-full min-h-[62px] ${btnClass} transition-all active:translate-y-1 active:shadow-[0_1px_0_#cbd5e1] disabled:cursor-default cursor-pointer`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm transition-all ${iconClass}`}>
                    {optionLabels[idx]}
                  </span>
                  <span className="leading-relaxed font-bold flex-1">{opt}</span>
                </button>
              )
            })}
          </div>

          {/* Answer Recorded Feedback */}
          {showResult && (
            <div className="mt-5 rounded-2xl bg-emerald-50 p-4 border-2 border-emerald-300 animate-slide-up flex items-center gap-3 shadow-xs">
              <span className="text-3xl animate-bounce">✨</span>
              <div>
                <p className="font-black text-emerald-950 text-sm">ඔබේ පිළිතුර සටහන් විය!</p>
                <p className="text-emerald-700 text-xs font-bold">අවසානයේ සියලු නිවැරදි පිළිතුරු විවරණ බලාගත හැක.</p>
              </div>
            </div>
          )}
        </div>

        {/* Next / Finish 3D Button */}
        {showResult && (
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={handleNext}
              disabled={submitting}
              className="w-full rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl px-6 py-4 shadow-[0_6px_0_#059669] active:translate-y-1 active:shadow-[0_2px_0_#059669] disabled:opacity-50 min-h-[58px] transition-all flex items-center justify-center gap-2 cursor-pointer"
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
      <div className="flex min-h-screen items-center justify-center bg-sky-50 text-indigo-900">
        <p className="text-xl font-black animate-pulse">📝 පූරණය වෙමින්...</p>
      </div>
    }>
      <QuizContent />
    </Suspense>
  )
}
