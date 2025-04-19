import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
  const { quizId, attempt } = await req.json();

  const quiz = await prisma.quizes.findUnique({
    where: { id: quizId },
  });
  const questions = quiz?.questions || [];
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].correctOption === attempt[i]) {
      score++;
    }
  }
  const result = await prisma.results.create({
    data: { quizId, score, attempt },
  });
  return NextResponse.json({ id: result.id });
};

export { POST };
