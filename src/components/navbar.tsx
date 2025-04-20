"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className='fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-secondary-background border-b-2 border-border shadow-shadow z-10'>
      <Link href='/' className='text-2xl font-bold'>
        Quizlet?...
      </Link>
      <Button
        onClick={() => router.push("/quiz/create")}
        className='cursor-pointer'
      >
        Create Quiz
      </Button>
      {/* <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar> */}
    </nav>
  );
};

export default Navbar;
