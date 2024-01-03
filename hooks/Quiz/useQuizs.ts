"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getQuizs as getQuizsstore, selectLoading } from "@/store/quizSlice";

import { QuizType } from "@/type";
export default function useQuizs() {
  const dispatch = useDispatch(); // update the data

  const getQuizsHandler = async () => {
    try {
      dispatch<any>(getQuizsstore());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
    }
  };
  const Quiz: QuizType[] = useSelector((store: RootState) => store.quiz.quizs);
  const isLoading = useSelector((state: RootState) => selectLoading(state));
  useEffect(() => {
    getQuizsHandler();
  }, [dispatch]);

  return { Quiz, isLoading };
}
