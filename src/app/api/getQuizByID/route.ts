import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const sanitized = searchParams.get("sanitized") ?? "true";

    const shouldSanitize = sanitized === "true";

    if (!id) {
      return NextResponse.json(
        { error: "Quiz ID is required" },
        { status: 400 }
      );
    }

    const quiz = await prisma.quizes.findUnique({
      where: { id: id },
    });

    if (!shouldSanitize) {
      return NextResponse.json(quiz);
    }

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Remove correctOption from each question
    const sanitizedQuiz = {
      ...quiz,
      questions: quiz.questions.map(({ question, options }) => ({
        question,
        options,
      })),
    };

    return NextResponse.json(sanitizedQuiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
