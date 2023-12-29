"use client";

import { RoootState } from "@/store/store";
import { getResults, selectResultLoading } from "@/store/userSlice";
import { ResultType } from "@/type";
import { useEffect, useState } from "react";
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
    (store: RoootState) => store.user.results
  );
  const isLoading = useSelector((state: RoootState) => selectResultLoading(state));
  
  useEffect(() => {
    ResultHandler();
  }, []);

  return { Results, isLoading };
}
