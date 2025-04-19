import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const quiz = await prisma.quizes.findUnique({
    where: { id: id as string },
  });

  if (quiz) {
    // Remove correctOption from each question
    const sanitizedQuiz = {
      ...quiz,
      questions: quiz.questions.map(({ question, options }) => ({
        question,
        options,
      })),
    };
    return NextResponse.json(sanitizedQuiz);
  }

  return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
};

export { GET };
