"use client";

import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { X } from "lucide-react";
import { QuizType } from "@/type";
import Input from "../Input";
import Textarea from "../Textarea";
import { useDispatch } from "react-redux";
import { useAuth } from "@/context/auth";
import { updateQuizs } from "@/store/quizSlice";

interface UpdateQuizModelProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuizType;
}

const UpdateQuizModel: React.FC<UpdateQuizModelProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [auth] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: data.id,
      title: data.title,
      description: data.description,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  const onUpdateHandler: SubmitHandler<FieldValues> = async (item) => {
    if (item.title !== "" || item.description !== "") {
      try {
        console.log("item", item);

        setLoading(true);
        const updatedQuiz = {
          id: item.id as string,
          title: item.title as string,
          description: item.description as string,
        };
        const headers = {
          Authorization: `Bearer ${auth?.token}`,
        };
        const quiz = {
          Quiz: updatedQuiz,
          headers: headers,
        };
        await dispatch<any>(updateQuizs(quiz));
        onClose();
        toast.success("Successfully updated Quiz");
      } catch (error: any) {
        toast.error("Something went wrong please try again1");
        console.log("-------------------------------------");
        console.log(error.message);
        console.log("-------------------------------------");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fill the fields");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-semibold leading-none tracking-tight">
              Are you sure you want to Update your Quiz
            </div>
            <div
              onClick={onClose}
              className="p-[3px] cursor-pointer flex justify-center items-center border-2 border-black  rounded-md dark:border-white  "
            >
              <X className="h-4 w-4 " />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            This will change your quiz Name
          </div>
        </div>
        {/* Inputs */}
        <div>
          <form className="space-y-6" onSubmit={handleSubmit(onUpdateHandler)}>
            <Input
              id="title"
              label="Title"
              type="text"
              registor={register}
              errors={errors}
              disabled={loading}
            />
            <Textarea
              id="description"
              label="Description"
              registor={register}
              errors={errors}
              disabled={loading}
            />
            <div className="pt-6 space-x-2 flex items-center justify-between w-full">
              <button
                disabled={loading}
                className="rounded-lg border-2 py-2 px-3 border-stone-300 hover:border-black hover:bg-stone-200 dark:hover:bg-exact-purple dark:border-white  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={onClose}
              >
                Close
              </button>
              <button
                disabled={loading}
                className="py-2 px-3 text-white rounded-lg dark:bg-exact-light-orange dark:hover:bg-exact-dark-orange/90 hover:bg-exact-light-orange/90 bg-exact-light-orange opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={onUpdateHandler}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuizModel;
