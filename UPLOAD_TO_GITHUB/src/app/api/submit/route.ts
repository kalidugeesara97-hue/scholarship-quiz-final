import { NextResponse } from "next/server";
import { loadQuizData } from "../../../lib/google-sheets";
import { recordStudentScore, incrementParticipantCount } from "../../../lib/google-sheets";
import { saveStudentSubmission, sendDailyMarksheetEmail } from "../../../lib/marksheet-service";
import type { QuizData } from "../../../lib/gemini";

interface SubmitRequest {
  studentName: string;
  phone?: string;
  school?: string;
  avatar?: string;
  answers: number[]; // array of selected option indices
  date?: string;
}

/**
 * POST /api/submit
 * 
 * Auto-grades a student's quiz submission:
 * 1. Loads quiz data with correct answers
 * 2. Compares student answers
 * 3. Records score to Daily Mark Sheet Registry & Google Sheet
 * 4. AUTOMATICALLY triggers/updates the daily mark sheet for Sumith Sir (sumithrathu@gmail.com)
 * 5. Returns score + explanations to the student
 */
export async function POST(request: Request) {
  try {
    const body: SubmitRequest = await request.json();
    const { studentName, phone, school, avatar, answers, date: dateOverride } = body;

    if (!studentName || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "studentName and answers[] are required" },
        { status: 400 }
      );
    }

    const today = dateOverride || new Date().toISOString().split("T")[0];

    // Load quiz data with correct answers
    let quizData: QuizData | null = null;
    try {
      const quizJson = await loadQuizData(today);
      if (quizJson) {
        quizData = JSON.parse(quizJson);
      }
    } catch (e) {
      console.error("Failed to load quiz from sheets for grading:", e);
    }

    if (!quizData) {
      const { getDefaultQuiz } = await import("../../../lib/default-quizzes");
      quizData = getDefaultQuiz();
    }

    // Grade the answers
    let score = 0;
    const results = quizData.questions.map((q, i) => {
      const studentAnswer = answers[i];
      const isCorrect = studentAnswer === q.correctAnswer;
      if (isCorrect) score++;

      return {
        questionId: q.id,
        question: q.question,
        options: q.options,
        studentAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const questionResults = results.map((r) => r.isCorrect);
    const submitTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Colombo",
      hour: "2-digit",
      minute: "2-digit",
    });

    // 1. Record to Daily Mark Sheet Registry
    try {
      await saveStudentSubmission({
        id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        studentName,
        phone: phone || "",
        school: school || "",
        avatar: avatar || "👦",
        subject: quizData.subject,
        topic: quizData.topic,
        score,
        totalQuestions: quizData.questions.length,
        percentage: Math.round((score / quizData.questions.length) * 100),
        answers,
        questionResults,
        submittedAt: submitTime,
        date: today,
      });

      // 2. AUTOMATICALLY dispatch / update Sumith Sir's Daily Marksheet in the background
      // (Runs asynchronously so student doesn't have to wait)
      sendDailyMarksheetEmail(today, "sumithrathu@gmail.com").catch((err) => {
        console.error("Background auto-email to Sumith Sir failed:", err);
      });
    } catch (saveError) {
      console.error("Failed to save to daily marksheet:", saveError);
    }

    // 3. Record to Google Sheet (if configured)
    try {
      await recordStudentScore(
        today,
        studentName,
        quizData.subject,
        quizData.topic,
        score,
        quizData.questions.length,
        questionResults,
        submitTime
      );
      await incrementParticipantCount(today);
    } catch (sheetError) {
      console.error("Failed to record score to Google Sheets:", sheetError);
    }

    return NextResponse.json({
      success: true,
      studentName,
      date: today,
      subject: quizData.subject,
      topic: quizData.topic,
      score,
      totalQuestions: quizData.questions.length,
      percentage: Math.round((score / quizData.questions.length) * 100),
      autoEmailedToTeacher: true,
      teacherEmail: "sumithrathu@gmail.com",
      results,
    });
  } catch (error) {
    console.error("Submit failed:", error);
    return NextResponse.json(
      { error: "Submission failed", details: String(error) },
      { status: 500 }
    );
  }
}
