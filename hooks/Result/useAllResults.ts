"use client";

import { useAuth } from "@/context/auth";
import { RoootState } from "@/store/store";
import { getResults } from "@/store/userSlice";
import { ResultType } from "@/type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAllResults() {
  const [isLoading, setIsLoading] = useState(false);
  const [auth] = useAuth();
  const dispatch = useDispatch();

  const ResultHandler = () => {
    try {
      setIsLoading(true);
      const headers: { Authorization: string } = {
        Authorization: `Bearer ${auth?.token}`,
      };

      dispatch<any>(getResults(headers));
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
