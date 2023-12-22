"use cilent";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { QuestionType } from "@/type";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const Questions = ({
  data,
  quizId,
  token,
}: {
  data: QuestionType[];
  quizId: string;
  token: string;
}) => {
  const { register } = useForm();
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  const [selectedOptions, setSelectedOptions] = useState<
    { id: string; selectOption: string; Question: string }[]
  >([]);

  const onSave = async () => {
    try {
      setIsloading(true);
      const isAnyOptionNotSelected = data.some((item) => {
        const selectedOption = selectedOptions.find(
          (selected) => selected.Question === item.Question
        );

        return !selectedOption;
      });
      if (isAnyOptionNotSelected) {
        return toast.error("Please answer every question first");
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        "http://localhost:8000/user/addResult",
        { quizId, selectedOptions },
        { headers }
      );
      if (res.data.status == "success") {
        toast.success("Test has been taken");
        return router.push(`/User/Results/${res.data.id}`);
      }
      toast.success("Something went wrong please try again");
      setIsloading(false);
    } catch (error) {
      console.log("==========================================");
      console.log(error);
      console.log("==========================================");
    }
  };

  const handleOptionChange = (
    question: string,
    id: string,
    selectedOption: string
  ) => {
    // Update the state with the selected options
    setSelectedOptions((prevOptions) => [
      ...prevOptions,
      { id, selectOption: selectedOption, Question: question },
    ]);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 mb-10">
      <div className="flex flex-col justify-center items-center gap-4">
        {data?.map((item: QuestionType, index: number) => {
          return (
            <div className="flex flex-col  gap-4" key={item.id}>
              <h1 className="text-3xl dark:text-stone-200 text-slate-900 font-semibold">
                Question no {index + 1}
              </h1>
              <div className="w-[370px] lg:w-[800px] md:w-[600px] border-2 border-primary p-2 rounded-xl dark:bg-slate-900 bg-stone-200 shadow-2xl">
                <h3 className="px-4 text-blue-700 dark:text-blue-300 font-medium text-xl italic py-4 flex gap-2">
                  <p className="dark:text-white text-slate-950">
                    {index + 1}
                    {") "}
                  </p>
                  {item.Question}
                </h3>
                <form>
                  <div className="flex gap-4 ml-2 flex-col">
                    {[item.OptionOne, item.OptionTwo, item.OptionThree].map(
                      (option: string, optionIndex: number) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            disabled={isloading}
                            type="radio"
                            value={option}
                            {...register(`question_${index}_option`)}
                            onChange={() =>
                              handleOptionChange(item.Question, item.id, option)
                            }
                            className="h-6 w-6"
                          />
                          <label className={`text-lg text-cyan-700`}>
                            {option}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </form>
              </div>
            </div>
          );
        })}
      </div>
      <div className="max-w-[800px] w-full">
        <Button fullWidth onClick={onSave}  disabled={isloading}>
          Completed Test
        </Button>
      </div>
    </div>
  );
};

export default Questions;
