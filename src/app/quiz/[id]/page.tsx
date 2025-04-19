"use client";
import { useParams } from "next/navigation";

const Quiz = () => {
  const params = useParams();
  console.log(params);
  return <div>{params.id}</div>;
};

export default Quiz;
