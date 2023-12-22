"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoootState } from "@/store/store";
import { getQuizs as getQuizsstore } from "@/store/quizSlice";

import { QuizType } from "@/type";
export default function useQuizs() {
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); // update the data

  const getQuizsHandler = async () => {
    try {
      setIsLoading(true);
      dispatch<any>(getQuizsstore());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsLoading(false);
    }
  };
  const Quiz: QuizType[] = useSelector((store: RoootState) => store.quiz.quizs);
  useEffect(() => {
    getQuizsHandler();
  }, []);

  return { Quiz, isloading };
}
