import prisma from "@/lib/prisma";
import { type NextRequest } from "next/server";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

export interface Quiz {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  questions: Question[];
}

export interface QuizResponse {
  quizes: Quiz[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const limit = req.nextUrl.searchParams.get("limit") ?? "9";
  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  const [quizes, total] = await Promise.all([
    prisma.quizes.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.quizes.count(),
  ]);

  const sanitizedQuizes = [];
  for (const quiz of quizes) {
    const sanitizedQuestions = [];

    for (const question of quiz.questions) {
      const sanitizedQuestion = {
        question: question.question,
        options: question.options,
      };
      sanitizedQuestions.push(sanitizedQuestion);
    }

    sanitizedQuizes.push({
      ...quiz,
      questions: sanitizedQuestions,
      total: total,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / pageSize),
    });
  }

  return Response.json({
    quizes: sanitizedQuizes,
    total: total,
    currentPage: pageNumber,
    totalPages: Math.ceil(total / pageSize),
  });
};

export { GET };
