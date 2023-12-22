import { useState } from "react";

import { useDispatch } from "react-redux";
import { deleteQuizs } from "@/store/quizSlice";

import { toast } from "react-hot-toast";

import { QuizType } from "@/type";

export default function useDeleteQuiz() {
  const dispatch = useDispatch(); // delete the data
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState<QuizType | null>(null);

  // To Delete Popover
  const DelelePopover = (item: QuizType) => {
    setCurrentItem((prevItem) => ({
      ...prevItem,
      description: item.description,
      title: item.title,
      id: item.id,
    }));
    setOpenDelete(true);
  };

  // onDelete Handler
  const onDeleteHandler = async (item: QuizType) => {
    try {
      setLoading(true);
      const quiz = {
        Quiz: item,
      };
      await dispatch<any>(deleteQuizs(quiz));
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
  return { onDeleteHandler, DelelePopover, currentItem, openDelete, loading ,setOpenDelete};
}
