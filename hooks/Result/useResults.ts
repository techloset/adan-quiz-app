"use client";

import { RoootState } from "@/store/store";
import { getResult } from "@/store/userSlice";
import { ResultType } from "@/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useResults(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const ResultHandler = () => {
    try {
      setIsLoading(true); 
      let item = {
        id,
      };
      dispatch<any>(getResult(item));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsLoading(false);
    }
  };
  // @ts-ignore
  const Result: ResultType = useSelector(
    (store: RoootState) => store.user.result
  );
  useEffect(() => {
    ResultHandler();
  }, []);

  return { Result, isLoading };
}
