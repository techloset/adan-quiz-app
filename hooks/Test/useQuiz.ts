"use client";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoootState } from "@/store/store";
import { getQuiz, selectLoading } from "@/store/userSlice";

import { TestQuizType } from "@/type";
export default function useQuiz(id: string) {
  const dispatch = useDispatch(); // update the data

  const getQuizHandler = async () => {
    try {
      let item = {
        id,
      };
      dispatch<any>(getQuiz(item));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  };
  // @ts-ignore
  const Quiz: TestQuizType = useSelector(
    (store: RoootState) => store.user.quiz
  );
  const isLoading = useSelector((state: RoootState) => selectLoading(state));
  useEffect(() => {
    getQuizHandler();
  }, []);

  return { Quiz, isLoading };
}
