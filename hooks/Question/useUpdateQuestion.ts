"use client";
import { useState } from "react";

import { QuestionType } from "@/type";

export default function useUpdateQuestion() {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentupdateItem, setCurrentupdateItem] =
    useState<QuestionType | null>(null);
  //To Update Popover
  const UpdatePopover = (item: QuestionType) => {
    setCurrentupdateItem(item);
    setOpenUpdate(true);
  };
  return { openUpdate, currentupdateItem, setOpenUpdate, UpdatePopover };
}
