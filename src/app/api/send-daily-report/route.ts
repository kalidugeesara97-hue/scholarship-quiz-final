import { NextResponse } from "next/server";
import { sendDailyMarksheetEmail, getSubmissionsForDate } from "../../../lib/marksheet-service";

/**
 * GET or POST /api/send-daily-report
 * 
 * Generates and sends today's Mark Sheet to sumithrathu@gmail.com
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const email = searchParams.get("email") || process.env.TEACHER_EMAIL || "sumithrathu@gmail.com";

    const submissions = getSubmissionsForDate(date);
    const result = await sendDailyMarksheetEmail(date, email);

    return NextResponse.json({
      success: result.success,
      message: result.message,
      recipient: email,
      date,
      totalStudentsRecorded: submissions.length,
      reportPath: result.reportPath,
    });
  } catch (error) {
    console.error("Failed to trigger daily report email:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const date = body.date || new Date().toISOString().split("T")[0];
    const email = body.email || process.env.TEACHER_EMAIL || "sumithrathu@gmail.com";

    const submissions = getSubmissionsForDate(date);
    const result = await sendDailyMarksheetEmail(date, email);

    return NextResponse.json({
      success: result.success,
      message: result.message,
      recipient: email,
      date,
      totalStudentsRecorded: submissions.length,
      reportPath: result.reportPath,
    });
  } catch (error) {
    console.error("Failed to trigger daily report email:", error);
    return NextResponse.json(
      { error: "Failed to dispatch email", details: String(error) },
      { status: 500 }
    );
  }
}
