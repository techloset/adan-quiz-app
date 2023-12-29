"use client";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getQuestions as getstoreQuestion,
  selectLoading,
} from "@/store/questionSlice";
import { RoootState } from "@/store/store"; 

import { QuestionType } from "@/type";

export default function useQuestions(params: { QuizId: string }) {
  const dispatch = useDispatch();
  const getQuestionHandler = async () => {
    try {
      let id = params.QuizId;
      dispatch<any>(getstoreQuestion(id));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  };
  const Question: QuestionType[] = useSelector(
    (store: RoootState) => store.question.question
  );
  const isLoading = useSelector((state: RoootState) => selectLoading(state));
  useEffect(() => {
    console.log("isLoading:", isLoading);
    getQuestionHandler();
  }, []);
  return {
    isLoading,
    Question,
  };
}
