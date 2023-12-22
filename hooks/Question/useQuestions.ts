"use client";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getQuestions as getstoreQuestion } from "@/store/questionSlice";
import { RoootState } from "@/store/store";

import { QuestionType } from "@/type";

export default function useQuestions(params: { QuizId: string }) {
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const getQuizsHandler = async () => {
    try {
      setIsloading(true);
      let id = params.QuizId;
      dispatch<any>(getstoreQuestion(id));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }finally{
      setIsloading(false)
    }
  };
  const Question: QuestionType[] = useSelector(
    (store: RoootState) => store.question.question
  );
  useEffect(() => {
    getQuizsHandler();
    console.log("Qestion",Question);
    
  }, []);
  return {
    isloading,
    Question,
  };
}
