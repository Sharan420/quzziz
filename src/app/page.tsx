"use client";

import QuizCard from "@/components/quiz_card";
import { useEffect, useState } from "react";
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

const Home = () => {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchQuizes = async () => {
      setLoading(true);
      const apiUrl = `/api/getQuizes?page=${page}&limit=9`;
      console.log(apiUrl);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setQuizes(data.quizes);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchQuizes();
  }, [page]);

  return (
    <div className='w-full h-full min-h-[calc(100vh-9rem)] flex flex-col bg-background gap-10'>
      <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
        {quizes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            imageUrl={quiz.imageUrl}
            quizId={quiz.id}
            title={quiz.title}
            loading={loading}
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
              page === totalPages && page !== 1
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
                page === totalPages
                  ? "pointer-events-none hidden"
                  : "cursor-pointer"
              }
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            >
              <PaginationLink href='#'>{page + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem
              className={
                page === totalPages
                  ? "pointer-events-none hidden"
                  : "cursor-pointer"
              }
            >
              <PaginationEllipsis />
            </PaginationItem>
          </div>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              className={
                page === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              isActive={page !== totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Home;
