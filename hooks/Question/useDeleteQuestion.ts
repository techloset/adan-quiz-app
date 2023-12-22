"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";

import { useDispatch } from "react-redux";
import { deleteQuestion } from "@/store/questionSlice";

import toast from "react-hot-toast";

import { QuestionType } from "@/type";

export default function useDeleteQuestion(params: { QuizId: string }) {
  const [auth] = useAuth(); //get user

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState<QuestionType | null>(null);

  const DelelePopover = (item: QuestionType) => {
    setCurrentItem(item);
    setOpenDelete(true);
  };

  const onDeleteHandler = async (item: QuestionType) => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${auth?.token}`,
      };
      const quiz = {
        Question: item,
        QuizId:params.QuizId,
        headers: headers,
      };
      await dispatch<any>(deleteQuestion(quiz));
      setOpenDelete(false);
      toast.success("Successfully deleted Quiz");
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return {
    onDeleteHandler,
    DelelePopover,
    setOpenDelete,
    loading,
    currentItem,
    openDelete,
  };
}
