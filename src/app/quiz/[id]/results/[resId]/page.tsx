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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [result, setResult] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  useEffect(() => {
    const fetchResult = async () => {
      const result = await fetch(`/api/getQuizResults?resId=${resId}`);
      const resultData = await result.json();
      console.log(resultData);
      setResult(resultData);
      if (resultData) {
        const quiz = await fetch(`/api/getQuizByID?id=${id}`);
        const quizData = await quiz.json();
        console.log(quizData);
        setQuiz(quizData);
      }
    };
    fetchResult();
  }, [resId, id]);
  if (result) {
    const chartData = [
      {
        type: "Correct",
        score: result.score,
        fill: "hsl(var(--chart-2))",
      },
    ];
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-row justify-between gap-10 w-[85%]'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-6xl font-bold'>{quiz?.title}</h1>
            <p className='text-2xl text-gray-500'>{quiz?.description}</p>
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
                  <RadialBar dataKey='score' background />
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
                                {chartData[0].score.toLocaleString()}
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
      </div>
    );
  }
  return <div>No result found</div>;
};

export default Results;
