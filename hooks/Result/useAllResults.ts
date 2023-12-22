"use client";

import { RoootState } from "@/store/store";
import { getResults } from "@/store/userSlice";
import { ResultType } from "@/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAllResults() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const ResultHandler = () => {
    try {
      setIsLoading(true);
      dispatch<any>(getResults());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsLoading(false);
    }
  };
  const Results: ResultType[] = useSelector(
    (store: RoootState) => store.user.results
  );
  useEffect(() => {
    ResultHandler();
  }, []);

  return { Results, isLoading };
}
