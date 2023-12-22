import { useState } from "react";

import { QuizType } from "@/type";

export default function useUpdateQuiz() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentUpdateItem, setCurrentUpdateItem] = useState<QuizType | null>(
    null
  );

  const UpdatePopover = (item: QuizType) => {
    setCurrentUpdateItem((prevItem) => ({
      ...prevItem,
      description: item.description,
      title: item.title,
      id: item.id,
    }));
    setOpenUpdate(true);
  };
  return { openUpdate, currentUpdateItem, UpdatePopover ,setOpenUpdate};
}
