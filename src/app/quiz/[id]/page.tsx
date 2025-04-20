"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { type Quiz } from "@/app/api/getQuizes/route";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [attempt, setAttempt] = useState<number[]>([]);
  const router = useRouter();
  const params = useParams();
  console.log(params);

  const getRandomColor = () => {
    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-indigo-400",
      "bg-teal-400",
    ];
    const selectedColors = new Set();
    while (selectedColors.size < 4) {
      selectedColors.add(colors[Math.floor(Math.random() * colors.length)]);
    }
    return Array.from(selectedColors);
  };

  const submitQuiz = async (attempt_arr: number[]) => {
    const res = await fetch(`/api/submit`, {
      method: "POST",
      body: JSON.stringify({ quizId: params.id, attempt: attempt_arr }),
    });
    const data = await res.json();
    return data.id;
  };

  const handleOptionClick = async (option: string, index: number) => {
    console.log(option);
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setAttempt([...attempt, index]);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log([...attempt, index]);
      const resultId = await submitQuiz([...attempt, index]);
      router.push(`/quiz/${params.id}/results/${resultId}`);
    }
  };

  const { data: quiz, isPending } = useQuery({
    queryKey: ["quiz", params.id],
    queryFn: () => fetchQuiz(params.id as string),
  });

  return (
    <div className='w-full h-full min-h-[calc(100vh-9rem)] flex flex-col items-center justify-between'>
      {isPending ? (
        <Loader2 className='w-10 h-10 animate-spin' />
      ) : (
        <>
          <h1 className='text-4xl font-bold'>{quiz?.title}</h1>
          <h2 className='text-2xl font-bold'>
            {currentQuestion +
              1 +
              ". " +
              quiz?.questions[currentQuestion].question}
          </h2>
          <div className='w-full h-full flex flex-row items-center justify-center gap-10'>
            {quiz?.questions[currentQuestion].options.map(
              (option: string, index: number) => (
                <Card
                  className={`w-full h-fit min-h-50 cursor-pointer ${
                    getRandomColor()[index]
                  }`}
                  key={index}
                  onClick={async () => await handleOptionClick(option, index)}
                >
                  <CardHeader className='text-center text-2xl font-bold'>
                    <CardTitle>Option {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent className='text-center text-2xl'>
                    {option}
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

const fetchQuiz = async (id: string) => {
  const res = await fetch(`/api/getQuizByID?id=${id}`);
  const data = await res.json();
  return data;
};

export default Quiz;
