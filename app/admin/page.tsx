"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

import { useDispatch, useSelector } from "react-redux";
import { RoootState } from "@/store/store";
import { getQuizs, deleteQuizs } from "@/store/quizSlice";

import { HelpCircle, PenSquare, Plus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

import DeleteModel from "@/components/model/delete-model"
import UpdateQuizModel from "@/components/model/updateQuiz-model";

import { QuizType } from "@/type";

export default function Home() {
  const [hover, setHover] = useState(0);

  // State for delete and update
  const dispatch = useDispatch(); // update the data
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState<QuizType | null>(null);

  const [auth] = useAuth(); // get user
  const router = useRouter();

  // get data
  const getQuizsHandler = async () => {
    try {
      dispatch<any>(getQuizs());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  };
  const Quiz: QuizType[] = useSelector((store: RoootState) => store.quiz.quizs);
  useEffect(() => {
    getQuizsHandler();
  }, []);

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

  //To Update Popover
  const UpdatePopover = (item: QuizType) => {
    setCurrentItem((prevItem) => ({
      ...prevItem,
      description: item.description,
      title: item.title,
      id: item.id,
    }));
    setOpenUpdate(true);
  };

  // onDelete Handler
  const onDeleteHandler = async (item: QuizType) => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${auth?.token}`,
      };
      const quiz = {
        Quiz: item,
        headers: headers,
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

  return (
    <div>
      <div className="heading space-y-5 xl:px-4 sm:p-0 mb-20 mt-4">
        <h6 className="text-exact-red dark:text-exact-light-orange text-center text-xl font-semibold">
          Customize your Quizs and add new Quizs
        </h6>
        <h3 className="text-center text-[#111029] dark:text-white text-xl md:text-2xl lg:text-4xl xl:text-[42px] px-1 tracking-[-0.1px]  font-semibold lg:leading-[56px]">
          Welcome Admin
        </h3>
      </div>
      {/* Quizs */}
      <div
        className={` relative pb-[100px] lg:pb-[200px] -mt-16 bg-no-repeat bg-bottom`}
      >
        <div className={`mx-[24px] lg:mx-[80px]  xl:mx-[160px]`}>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center text-center gap-x-8 gap-y-[60px]">
            {Quiz?.map((item: QuizType, index: number) => {
              const Hovered = hover === index;
              return (
                <div key={index}>
                  {currentItem !== null && (
                    <DeleteModel
                    title="Quiz"
                      isOpen={openDelete}
                      loading={loading}
                      onClose={() => setOpenDelete(false)}
                      onConfrim={() => onDeleteHandler(currentItem)}
                    />
                  )}
                  {currentItem !== null && (
                    <UpdateQuizModel
                      isOpen={openUpdate}
                      onClose={() => setOpenUpdate(false)}
                      data={currentItem}
                    />
                  )}
                  <div className="flex justify-center cursor-pointer">
                    <div
                      onMouseEnter={() => setHover(index)}
                      className={`self-center py-11 px-[30px] shadow-2xl dark:shadow-blue-900/50   space-y-11 max-w-[352px] flex flex-col rounded-2xl items-center ${
                        Hovered
                          ? `bg-exact-purple`
                          : "bg-exact-white dark:bg-[#00113B]"
                      }`}
                    >
                      <div
                        className={`p-8 shadow-xl  rounded-full   ${
                          Hovered
                            ? "bg-exact-white shadow-gray-800/50 "
                            : `bg-exact-purple`
                        }`}
                      >
                        <div
                          className={`${
                            Hovered ? `fill-exact-purple` : "fill-exact-white"
                          } w-[33px] h-[33px]`}
                        >
                          <svg viewBox="0 0 33 33">
                            <g transform="translate(0.000000,32.000000) scale(0.050000,-0.050000)">
                              <path d="M247 609 c-5 -11 -6 -151 -3 -310 l6 -289 76 -6 75 -6 -5 314 -6 314 -68 2 c-37 1 -71 -7 -75 -19z" />
                              <path d="M489 415 c-6 -16 -8 -113 -5 -217 l6 -188 70 0 70 0 0 210 0 210 -65 6 c-42 4 -69 -3 -76 -21z" />
                              <path d="M18 332 c-4 -5 -5 -81 -1 -170 l6 -162 66 0 66 0 10 155 c6 85 6 162 1 170 -9 16 -133 21 -148 7z" />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="info space-y-4">
                        <h3
                          className={`dark:text-exact-white text-xl lg:text-lg xl:text-xl font-semibold ${
                            Hovered ? "text-exact-white" : "text-black"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`dark:text-exact-white lg:max-w-[292px] text-lg  leading-[32px] lg:text-[18px] xl:text-[18px] xl:leading-[32px] font-normal ${
                            Hovered ? "text-exact-white" : "text-[#6B6B6B]"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div
                          className={`dark:bg-[#020E2D] p-[17px] rounded-full hover:relative hover:bottom-1 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-700 dark:fill-blue-600 fill-blue-600 ${
                            Hovered
                              ? `bg-exact-white fill-exact-purple dark:bg-slate-950 `
                              : "bg-[#F3F4F6]"
                          } `}
                          onClick={() => DelelePopover(item)}
                        >
                          <Trash2 size={20} />
                        </div>
                        <div
                          className={`dark:bg-[#020E2D] p-[17px] rounded-full hover:relative hover:bottom-1   hover:bg-fuchsia-600 dark:hover:bg-fuchsia-500 hover:text-white  dark:fill-blue-600 fill-blue-600 ${
                            Hovered
                              ? `bg-exact-white fill-exact-purple dark:bg-slate-950  `
                              : "bg-[#F3F4F6]"
                          } `}
                          onClick={() => UpdatePopover(item)}
                        >
                          <PenSquare size={20} />
                        </div>
                        <div
                          className={`dark:bg-[#020E2D] p-[17px] rounded-full hover:relative hover:bottom-1  hover:bg-exact-dark-orange  hover:text-white dark:hover:bg-exact-light-orange dark:fill-blue-600 fill-blue-600 ${
                            Hovered
                              ? `bg-exact-white fill-exact-purple dark:bg-slate-950  `
                              : "bg-[#F3F4F6]"
                          } `}
                          onClick={() => router.push(`/Admin/${item.id}`)}
                        >
                          <HelpCircle size={20} />
                        </div>
                        <div
                          className={`dark:bg-[#020E2D] p-[17px] rounded-full hover:relative hover:bottom-1   hover:bg-exact-green dark:hover:bg-exact-green hover:text-white  dark:fill-blue-600 fill-blue-600 ${
                            Hovered
                              ? `bg-exact-white fill-exact-purple dark:bg-slate-950  `
                              : "bg-[#F3F4F6]"
                          } `}
                          onClick={() =>
                            router.push(`/Admin/${item.id}/AddQuestion`)
                          }
                        >
                          <Plus size={20} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
