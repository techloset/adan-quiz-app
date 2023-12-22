"use client";

import Loader from "@/components/Loader";
import { useAuth } from "@/context/auth";
import useQuiz from "@/hooks/Test/useQuiz";
import { useRouter } from "next/navigation";
import Questions from "../(components)/Questions";

export default function Home({ params }: { params: { QuizId: string } }) {
  const router = useRouter();
  const [auth] = useAuth();

  if (!auth.user || !auth.token) {
    return router.push("/Auth");
  }

  const id = params.QuizId;
  const token = auth.token;

  const { isloading, Quiz } = useQuiz(id, token);


  return (
    <div>
      {isloading ? (
        <div className="h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        Quiz ? (
          <>
          <div className="heading space-y-5 xl:px-4 sm:p-0 mb-20 mt-4">
            <h6 className="text-exact-red dark:text-exact-light-orange text-center text-xl font-semibold">
              {Quiz.description}
            </h6>
            <h3 className="text-center text-[#111029] dark:text-white text-xl md:text-2xl lg:text-4xl xl:text-[42px] px-1 tracking-[-0.1px]  font-semibold lg:leading-[56px]">
              {Quiz.title}
            </h3>
          </div>
          <Questions
           data={Quiz.Question}
            quizId={id}
            token={token} />
        </>
        ): (
          <div></div>
        )
      )}
    </div>
  );
}
