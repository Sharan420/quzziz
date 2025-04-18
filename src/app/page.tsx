import Navbar from "@/components/navbar";
import QuizCard from "@/components/quiz_card";

const Home = () => {
  return (
    <div className='flex flex-col items-start justify-start min-h-screen bg-background py-28 px-8'>
      <Navbar />
      <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
        <QuizCard
          imageUrl='https://picsum.photos/400/250'
          quizId='1'
          title='Quiz 1'
        />
        <QuizCard
          imageUrl='https://picsum.photos/400/250'
          quizId='1'
          title='Quiz 1'
        />
        <QuizCard
          imageUrl='https://picsum.photos/400/250'
          quizId='1'
          title='Quiz 1'
        />
        <QuizCard
          imageUrl='https://picsum.photos/400/250'
          quizId='1'
          title='Quiz 1'
        />
        <QuizCard
          imageUrl='https://picsum.photos/400/250'
          quizId='1'
          title='Quiz 1'
        />
      </div>
    </div>
  );
};

export default Home;
