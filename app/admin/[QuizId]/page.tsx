"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import { PenSquare, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, getQuestions } from "@/store/questionSlice";
import { RoootState } from "@/store/store";
import { QuestionType } from "@/type";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth";
import DeleteModel from "@/components/model/delete-model";
import UpdateQuestionModel from "@/components/model/updateQuestion-model";

// const Data = [
//   {
//     Number: "one",
//     Heading: "What are the services provided to customers?",
//     Text: "Hello, we provide various services to help your business grow and develop. We help provide ideas, create designs, develop websites and mobile applications, provide support for the growth of business ideas, to help customers market their products online through the marketplace.",
//   },
//   {
//     Number: "two",
//     Heading: "How can I submit a proposal for cooperation?",
//     Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, magni suscipit culpa minima incidunt, reiciendis quia fugit commodi beatae laudantium illo deserunt molestias deleniti voluptatum. Aut deleniti quae repudiandae id",
//   },
//   {
//     Number: "three",
//     Heading:
//       "I come from a faraway place, can collaboration be done full time online through several meeting applications?",
//     Text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem modi cumque possimus rerum placeat, quo ab culpa, recusandae qui itaque dolore optio explicabo laudantium. Doloremque repellat fuga maxime numquam ea.!",
//   },
//   {
//     Number: "four",
//     Heading: "How do I get the payment complete?",
//     Text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, possimus nisi obcaecati harum facere reprehenderit voluptatibus aut. Labore consequuntur odio quidem eaque cum tempora ut. Molestias, facilis. Ipsa, molestias dignissimos.",
//   },
//   {
//     Number: "five",
//     Heading: "How long can the collaboration last?",
//     Text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit voluptatum neque ea ducimus ad vero pariatur a consectetur non, at nisi explicabo minus molestiae iusto sunt itaque. Aspernatur, error alias!",
//   },
// ];

const Qestions = ({ params }: { params: { QuizId: string } }) => {
  const [isOpen, setIsOpen] = useState(["one"]);

  const [auth] = useAuth(); //get user
  // use for delete and update
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState<QuestionType | null>(null);

  // dropdown
  const DropDown = ({ id }: { id: string }) => {
    if (isOpen.indexOf(id) === -1) {
      setIsOpen([id]);
    } else {
      setIsOpen((Item) => Item.filter((item) => item !== id));
    }
  };

  // get data
  const getQuizsHandler = async () => {
    try {
      let id = params.QuizId;
      dispatch<any>(getQuestions(id));
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  };
  const Question: QuestionType[] = useSelector(
    (store: RoootState) => store.question.question
  );
  useEffect(() => {
    getQuizsHandler();
  }, []);

  //delete data
  const DelelePopover = (item: QuestionType) => {
    setCurrentItem(item);
    setOpenDelete(true);
  };

  //To Update Popover
  const UpdatePopover = (item: QuestionType) => {
    setCurrentItem(item);
    setOpenUpdate(true);
  };

  // onDelete handler
  const onDeleteHandler = async (item: QuestionType) => {
    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${auth?.token}`,
      };
      const quiz = {
        Question: item,
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
              {currentItem !== null && (
                <UpdateQuestionModel
                  isOpen={openUpdate}
                  onClose={() => setOpenUpdate(false)}
                  data={currentItem}
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
                      <p>{item.CorrectOption}</p>
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
    </div>
  );
};

export default Qestions;
