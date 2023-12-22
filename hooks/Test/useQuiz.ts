"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoootState } from "@/store/store";
import { getQuiz } from "@/store/userSlice";

import { TestQuizType } from "@/type";
export default function useQuiz(id: string) {
  const [isloading, setIsLoading] = useState(false);

  const dispatch = useDispatch(); // update the data
  

  const getQuizHandler = async () => {
    try {
      setIsLoading(true);
      let item = {
        id,
      };
      dispatch<any>(getQuiz(item));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsLoading(false);
    }
  };
// @ts-ignore
  const Quiz: TestQuizType = useSelector(
    (store: RoootState) => store.user.quiz
  );
  useEffect(() => {
    getQuizHandler();
  }, []);

  return { Quiz, isloading };
}
