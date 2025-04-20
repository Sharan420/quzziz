import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const POST = async (req: Request) => {
  const { title, description, imageUrl, questions } = await req.json();

  const quiz = await prisma.quizes.create({
    data: { title, description, imageUrl, questions },
  });
  console.log(quiz);
  return NextResponse.json({ id: quiz.id });
};

export { POST };
