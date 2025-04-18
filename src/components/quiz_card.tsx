import { Button } from "./ui/button";
import Image from "next/image";

interface QuizCardProps {
  imageUrl: string;
  quizId: string;
  title: string;
}

const QuizCard = ({ imageUrl, quizId, title }: QuizCardProps) => {
  return (
    <div className='relative rounded-base flex flex-col shadow-shadow border-2 gap-6 py-0 border-border bg-background text-foreground font-base'>
      <Image src={imageUrl} alt={title} width={400} height={250} />
      <div className='absolute bottom-0 flex flex-col items-center gap-2 bg-background/90 w-full p-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <Button className='w-full cursor-pointer'>Click me</Button>
      </div>
    </div>
  );
};

export default QuizCard;
