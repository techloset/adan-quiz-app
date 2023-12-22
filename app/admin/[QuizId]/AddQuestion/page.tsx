"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "@/components/Button";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function Home({ params }: { params: { QuizId: string } }) {
  const [isloading, setIsloading] = useState(false);
  const [auth] = useAuth();

  const formSchema = z.object({
    question: z
      .string()
      .min(6, { message: "Question must be at least 6 characters." })
      .max(160, {
        message: "Question must not be longer than 30 characters.",
      }),
    correctOption: z.string().min(1),
    OptionOne: z.string().min(1),
    OptionTwo: z.string().min(1),
    OptionThree: z.string().min(1),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      correctOption: "",
      OptionOne: "",
      OptionTwo: "",
      OptionThree: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data) {
      return toast.error("Please fill all of the fields ");
    }
    if (
      data.OptionOne === data.OptionTwo ||
      data.OptionOne === data.OptionThree ||
      data.OptionTwo === data.OptionThree
    ) {
      return toast.error("Options must be unique");
    }

    if (
      data.correctOption !== data.OptionOne &&
      data.correctOption !== data.OptionTwo &&
      data.correctOption !== data.OptionThree
    ) {
      return toast.error("CorrectOption must be one of the provided options");
    }
    setIsloading(true);
    let id = params.QuizId;
    let question = data.question;
    let correctOption = data.correctOption;
    let OptionOne = data.OptionOne;
    let OptionTwo = data.OptionTwo;
    let OptionThree = data.OptionThree;
    const headers = {
      Authorization: `Bearer ${auth?.token}`,
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/question/addQuestion",
        { id, question, correctOption, OptionOne, OptionTwo, OptionThree },
        { headers }
      );
      if (res.status == 204) {
        toast.success("Successfully added Question");
      } else {
        toast.error("Something went wrong, try again ");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.log(error)
    } finally {
      setIsloading(false);
      form.reset();
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center pb-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight dark:text-white text-gray-900">
          Add a new Question's new in category
        </h1>
      </div>
      <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-3xl ">
        <div className="dark:bg-slate-800 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/3 w-full space-y-6 mx-auto"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Question
                </label>
                <div className="w-full">
                  <textarea
                    id="question"
                    placeholder="Add a question according to your category"
                    disabled={isloading}
                    {...form.register("question")}
                    className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="correctOption"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Correct Option
                </label>
                <div className="w-full flex justify-center items-center">
                  <input
                    type="text"
                    id="correctOption"
                    placeholder="Enter your correct answer"
                    disabled={isloading}
                    {...form.register("correctOption")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="OptionOne"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Option One
                </label>
                <div className="w-full flex justify-center items-center">
                  <input
                    type="text"
                    id="OptionOne"
                    placeholder="Enter an incorrect option"
                    disabled={isloading}
                    {...form.register("OptionOne")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="OptionTwo"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Option Two
                </label>
                <div className="w-full flex justify-center items-center">
                  <input
                    type="text"
                    id="OptionTwo"
                    placeholder="Enter an incorrect option"
                    disabled={isloading}
                    {...form.register("OptionTwo")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="OptionThree"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Option Three
                </label>
                <div className="w-full flex justify-center items-center">
                  <input
                    type="text"
                    id="OptionThree"
                    placeholder="Enter an incorrect option"
                    disabled={isloading}
                    {...form.register("OptionThree")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
            <Button disabled={isloading} fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
