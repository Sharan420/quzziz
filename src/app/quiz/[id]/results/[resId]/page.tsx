/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const chartConfig = {
  score: {
    label: "Score",
  },
  type: {
    label: "Correct",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const Results = () => {
  const { resId, id } = useParams();

  const { data: result, isPending } = useQuery({
    queryKey: ["result", resId],
    queryFn: () => fetchResult(resId as string),
  });

  const { data: quiz, isPending: quizPending } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuiz(id as string),
    enabled: !!id,
  });

  if (quizPending || isPending) {
    return (
      <div className='min-h-[calc(100vh-9rem)] h-full flex flex-col items-center justify-center'>
        <Loader2 className='w-10 h-10 animate-spin' />{" "}
      </div>
    );
  }

  const attempt = result.attempt;
  console.log(quiz);
  const tableData = quiz?.questions.map((question: any, index: number) => {
    return {
      question: question.question,
      correct: question.options[question.correctOption],
      attempt: question.options[attempt[index]],
    };
  });
  console.log("test", quiz?.questions);
  const chartData = [
    {
      type: "Correct",
      score: result.score,
      fill: "hsl(var(--chart-2))",
    },
  ];

  return (
    <div className='min-h-[calc(100vh-9rem)] h-full flex flex-col items-center justify-center w-full'>
      {isPending ? (
        <Loader2 className='w-10 h-10 animate-spin' />
      ) : (
        <div className='flex flex-row justify-between gap-10 w-[85%]'>
          <div className='flex flex-col gap-2 justify-between'>
            <h1 className='text-6xl font-bold'>{quiz?.title}</h1>
            <p className='text-2xl text-gray-500'>{quiz?.description}</p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-1/3'>Question</TableHead>
                  <TableHead className='w-1/3'>Correct Answer</TableHead>
                  <TableHead className='w-1/3'>Your Answer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row: any) => (
                  <TableRow key={row.question}>
                    <TableCell
                      className={
                        row.correct === row.attempt
                          ? "bg-green-400"
                          : "bg-red-400 "
                      }
                    >
                      {row.question}
                    </TableCell>
                    <TableCell
                      className={
                        row.correct === row.attempt
                          ? "bg-green-400"
                          : "bg-red-400 "
                      }
                    >
                      {row.correct}
                    </TableCell>
                    <TableCell
                      className={
                        row.correct === row.attempt
                          ? "bg-green-400 "
                          : "bg-red-400"
                      }
                    >
                      {row.attempt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card className='flex flex-col'>
            <CardHeader className='items-center pb-0'>
              <CardTitle className='text-2xl font-bold'>Quiz Results</CardTitle>
              <CardDescription>
                {new Date(result.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-1 pb-0'>
              <ChartContainer
                config={chartConfig}
                className='mx-auto aspect-square max-h-[200px]'
              >
                <RadialBarChart
                  data={chartData}
                  endAngle={-360 * (result.score / quiz?.questions.length)}
                  innerRadius={80}
                  outerRadius={140}
                >
                  <PolarGrid
                    gridType='circle'
                    radialLines={false}
                    stroke='none'
                    className='first:fill-slate-400 last:fill-background'
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey='score' />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor='middle'
                              dominantBaseline='middle'
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className='fill-foreground text-4xl font-bold'
                              >
                                {chartData[0].score.toLocaleString() +
                                  "/" +
                                  quiz?.questions.length.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className='fill-muted-foreground'
                              >
                                {chartData[0].type}
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col gap-2 text-sm'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                You got {result.score} out of {quiz?.questions.length} questions
                correct 🚀
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

const fetchResult = async (resId: string) => {
  const apiUrl = `/api/getQuizResults?sanitized=false&resId=${resId}`;
  const result = await fetch(apiUrl);
  const resultData = await result.json();
  return resultData;
};

const fetchQuiz = async (id: string) => {
  const res = await fetch(`/api/getQuizByID?id=${id}&sanitized=false`);
  const data = await res.json();
  return data;
};
export default Results;
