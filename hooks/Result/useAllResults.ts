"use client";

import { RootState } from "@/store/store";
import { getResults, selectResultLoading } from "@/store/userSlice";
import { ResultType } from "@/type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAllResults() {
  const dispatch = useDispatch();

  const ResultHandler = () => {
    try {
      dispatch<any>(getResults());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  };
  const Results: ResultType[] = useSelector(
    (store: RootState) => store.user.results
  );
  const isLoading = useSelector((state: RootState) =>
    selectResultLoading(state)
  );

  useEffect(() => {
    ResultHandler();
  }, []);

  return { Results, isLoading };
}
