"use client";
import { useState } from "react";

import Image from "next/image";
import { PenSquare, Trash2 } from "lucide-react";

import { QuestionType } from "@/type";

import DeleteModel from "@/components/model/delete-model";
import UpdateQuestionModel from "@/components/model/updateQuestion-model";

import Link from "next/link";

import useQuestions from "@/hooks/Question/useQuestions";
import useDeleteQuestion from "@/hooks/Question/useDeleteQuestion";
import useUpdateQuestion from "@/hooks/Question/useUpdateQuestion";

const Qestions = ({ params }: { params: { QuizId: string } }) => {
  const [isOpen, setIsOpen] = useState(["one"]);
  // dropdown
  const DropDown = ({ id }: { id: string }) => {
    if (isOpen.indexOf(id) === -1) {
      setIsOpen([id]);
    } else {
      setIsOpen((Item) => Item.filter((item) => item !== id));
    }
  };
  const { isloading, Question } = useQuestions(params);
  const {
    onDeleteHandler,
    DelelePopover,
    setOpenDelete,
    loading,
    currentItem,
    openDelete,
  } = useDeleteQuestion(params);
  const { openUpdate, currentupdateItem, setOpenUpdate, UpdatePopover } =
    useUpdateQuestion();

    if (Question) {
      return (
        <div className="flex flex-col justify-center items-center">
          <div className=" space-y-5 xl:px-4 sm:p-0 mb-20 mt-4">
            <h6 className="text-exact-red dark:text-exact-light-orange text-center text-xl font-semibold">
              Customize your Question according to your liking
            </h6>
            <h3 className="text-center text-[#111029] dark:text-white text-xl md:text-2xl lg:text-4xl xl:text-[42px] px-1 tracking-[-0.1px]  font-semibold lg:leading-[56px]">
              Your Quiz Category
            </h3>
          </div>
          {/* Questions */}
          {isloading ? (
            <div className="flex justify-center items-center w-full">
              <div className="w-8 h-8 rounded-full border-4 border-slate-950 dark:border-stone-300 " />
            </div>
          ) : Question.length !== 0 ? (
            <div
              className={` pb-16 lg:w-[80%] w-auto ${
                isOpen.length > 1
                  ? "lg:pb-[100px]"
                  : isOpen.length == 0
                  ? "lg:pb-[300px]"
                  : "lg:pb-[200px]"
              }  space-y-8`}
            >
              {Question.map((item: QuestionType, index: number) => {
                return (
                  <div key={index}>
                    {currentItem !== null && (
                      <DeleteModel
                        title="Question"
                        isOpen={openDelete}
                        loading={loading}
                        onClose={() => setOpenDelete(false)}
                        onConfrim={() => onDeleteHandler(currentItem)}
                      />
                    )}
                    {currentupdateItem !== null && (
                      <UpdateQuestionModel
                        isOpen={openUpdate}
                        id={params.QuizId}
                        onClose={() => setOpenUpdate(false)}
                        data={currentupdateItem}
                      />
                    )}
                    <div
                      className={` bg-white dark:bg-[#020E2D] p-8 rounded-lg border space-y-7 border-[#D8D8D8] hover:border-exact-purple`}
                    >
                      <div
                        onClick={() => DropDown(item)}
                        className={` flex cursor-pointer justify-between items-center ${
                          isOpen?.indexOf(item.id) > -1
                            ? "border-b-[1px] pb-7"
                            : "border-none "
                        }`}
                      >
                        <h1 className="dark:text-exact-white font-medium text-sm lg:text-base">
                          {index + 1}
                          {") "} {item.Question}
                        </h1>
                        <Image
                          className={`w-3 h-3 ml-4 filter dark:invert cursor-pointer ${
                            isOpen?.indexOf(item.id) > -1 ? "rotate-180" : ""
                          }`}
                          src="/Arrow.png"
                          width={200}
                          height={200}
                          alt=""
                        />
                      </div>
                      <div
                        className={`${
                          isOpen?.indexOf(item.id) > -1 ? "block" : "hidden"
                        } `}
                      >
                        <h3 className="text-slate-950 dark:text-white text-xl font-semibold">
                          Options{" "}
                        </h3>
                        <div className="flex gap-2 text-lg font-medium italic">
                          <p className="text-exact-green">correct</p>
                          <p className="text-exact-red">wrong</p>
                        </div>
                        <div className="flex flex-col  gap-3  my-2">
                          <div className="flex gap-2 items-center">
                            <div className="w-4 h-4 bg-exact-green rounded-full" />
                            <p>{item.CorrectOption?.CorrectOption}</p>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="w-4 h-4  rounded-full bg-exact-red" />
                            <p>{item.OptionOne}</p>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="w-4 h-4  rounded-full bg-exact-red" />
                            <p>{item.OptionTwo}</p>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="w-4 h-4  rounded-full bg-exact-red" />
                            <p>{item.OptionThree}</p>
                          </div>
                        </div>
                        <div className="flex items-end gap-3 w-full lg:justify-end justify-center">
                          <div
                            className=" text-white cursor-pointer  p-[17px] rounded-full hover:relative hover:bottom-1  hover:bg-rose-500/90 hover:text-white bg-rose-500"
                            onClick={() => DelelePopover(item)}
                          >
                            <Trash2 size={20} />
                          </div>
                          <div
                            className="p-[17px] cursor-pointer rounded-full hover:relative hover:bottom-1   text-white bg-exact-light-orange hover:bg-exact-light-orange/90"
                            onClick={() => UpdatePopover(item)}
                          >
                            <PenSquare size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text center gap-2 text-xl italic">
              <h4>You haven't added any Quiz's to add Quiz</h4>
              <Link
                href={`/Admin/${params.QuizId}/AddQuestion`}
                className="text-blue-500 dark:text-exact-red cursor-pointer"
              >
                Add Question?
              </Link>
            </div>
          )}
        </div>
      );
    }
  
};

export default Qestions;
