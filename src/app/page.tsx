"use client";

import QuizCard from "@/components/quiz_card";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Quiz } from "./api/getQuizes/route";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data: quizes, isPending } = useQuery({
    queryKey: ["quizes", page],
    queryFn: () => fetchQuizes(page),
  });

  if (isPending) {
    return (
      <div className='w-full flex items-center justify-center h-full'>
        <Loader2 className='w-10 h-10 animate-spin' />
      </div>
    );
  }

  return (
    <div className='w-full h-full min-h-[calc(100vh-9rem)] flex flex-col bg-background gap-10'>
      <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
        {quizes?.quizes.map((quiz: Quiz) => (
          <QuizCard
            key={quiz.id}
            imageUrl={quiz.imageUrl}
            quizId={quiz.id}
            title={quiz.title}
            description={quiz.description}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className={
                page === 1
                  ? "cursor-not-allowed pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              isActive={page !== 1}
            />
          </PaginationItem>
          <PaginationItem
            className={
              page === quizes?.totalPages && page !== 1
                ? "cursor-pointer"
                : "pointer-events-none hidden"
            }
          >
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem
            className={
              page === 1 ? "pointer-events-none hidden" : "cursor-pointer"
            }
          >
            <PaginationLink
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <div className='items-center md:flex hidden'>
            <PaginationItem
              className={
                page === quizes?.totalPages
                  ? "pointer-events-none hidden"
                  : "cursor-pointer"
              }
              onClick={() =>
                setPage((prev) => Math.min(quizes?.totalPages, prev + 1))
              }
            >
              <PaginationLink href='#'>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem
              className={
                page === quizes?.totalPages
                  ? "pointer-events-none hidden"
                  : "cursor-pointer"
              }
            >
              <PaginationEllipsis />
            </PaginationItem>
          </div>
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPage((prev) => Math.min(quizes?.totalPages, prev + 1))
              }
              className={
                page === quizes?.totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              isActive={page !== quizes?.totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

const fetchQuizes = async (page: number) => {
  const apiUrl = `/api/getQuizes?page=${page}&limit=9`;
  console.log(apiUrl);
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export default Home;
