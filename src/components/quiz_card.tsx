import { Button } from "./ui/button";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Loader2 } from "lucide-react";
import Link from "next/link";
interface QuizCardProps {
  imageUrl: string;
  quizId: string;
  title: string;
  loading?: boolean;
  description: string;
}

const QuizCard = ({
  imageUrl,
  quizId,
  title,
  loading = false,
  description,
}: QuizCardProps) => {
  return (
    <div className='relative rounded-base flex flex-col shadow-shadow border-2 gap-6 py-0 border-border bg-background text-foreground font-base'>
      {loading ? (
        <div className='w-[400px] h-[250px] flex items-center justify-center'>
          <Loader2 className='w-12 h-12 animate-spin' />
        </div>
      ) : (
        <div className='w-[400px] h-[250px] relative'>
          <Image src={imageUrl} alt={title} fill className='object-cover' />
        </div>
      )}
      {loading ? (
        <div className='absolute bottom-0 flex flex-col items-center gap-2 bg-background/90 w-full p-4'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 sm:w-[250px] w-[100px]' />
              <Skeleton className='h-4 sm:w-[200px] w-[100px]' />
            </div>
          </div>
        </div>
      ) : (
        <div className='absolute bottom-0 flex flex-col items-center gap-2 bg-background/90 w-full p-4'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-sm text-muted-foreground'>{description}</p>
          <Link href={`/quiz/${quizId}`} className='w-full'>
            <Button className='w-full cursor-pointer'>Click me</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
