"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/context/auth";
import { POST } from "@/lib/instance";
type Variant = "LOGIN" | "REGISTER";

export default function useAuthHook() {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isloading, setIsloading] = useState(false);
  const [auth, setAuth] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsloading(true);
    try {
      if (variant == "LOGIN") {
        let email = data.email;
        let password = data.password;
        await POST("/auth/login", { email, password }).then((res) => {
          if (res.data.status == "success") {
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            toast.success("Login Successfull");
            router.push("/");
            setIsloading(false);
          } else if (res.data.status == "Failed") {
            toast.error(res.data.message);
            setIsloading(false);
            console.log(res);
          } else {
            toast.error("Somthing went wrong, try again");
            setIsloading(false);
          }
        });
      }
      if (variant == "REGISTER") {
        let email = data.email;
        let password = data.password;
        let username = data.name;
        await POST("/auth/signup", {
          email,
          password,
          username,
        }).then((res) => {
          if (res.data.status == "success") {
            setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
            });
            const User = {
              user: res.data.user,
              token: res.data.token,
            };
            localStorage.setItem("auth", JSON.stringify(res.data));
            console.log("saved", res.data);
            toast.success("SignUp Successfull");
            router.push("/");
            setIsloading(false);
          } else if (res.data.status == "Failed") {
            toast.error(res.data.message);
            setIsloading(false);
          } else {
            toast.error("Something went wrong, try again");
            setIsloading(false);
          }
        });
      }
    } catch (error: any) {
      console.log("error", error.message);
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant == "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  return {
    toggleVariant,
    onSubmit,
    register,
    handleSubmit,
    isloading,
    variant,
    errors,
  };
}
