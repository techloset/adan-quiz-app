"use client";
import { useState } from "react";
import { useAuth } from "@/context/auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { POST } from "@/lib/instance";

export default function useAddQuiz() {
  const [isloading, setIsloading] = useState(false);

  const router = useRouter();

  const [auth] = useAuth();

  const formSchema = z.object({
    description: z
      .string()
      .min(10, { message: "description must be at least 10 characters." })
      .max(160, {
        message: "description must not be longer than 30 characters.",
      }),
    title: z.string().min(1),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      title: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsloading(true);
    let description = data.description;
    let title = data.title;
   

    try {
      const res = await POST(
        "/quiz/addQuiz",
        { description, title },
      );
      if (res.data.status === "success") {
       await router.push(`/Admin/${res.data.quiz.id}/AddQuestion`)
        toast.success("Successfully added Quiz");
      } else if (res.data.status === "Failed") {
        toast.error(res.data.message);
        setIsloading(false);
      } else {
        toast.error("Something went wrong, try again");
        setIsloading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setIsloading(false)
    }
  };
  return {
    isloading,
    onSubmit,
    form,
  };
}
