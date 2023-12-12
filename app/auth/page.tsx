"use client";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuth } from "@/context/auth";

type Variant = "LOGIN" | "REGISTER";

export default function Home() {
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
        await axios
          .post("http://localhost:8000/auth/login", { email, password })
          .then((res) => {
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
        await axios
          .post("http://localhost:8000/auth/signup", {
            email,
            password,
            username,
          })
          .then((res) => {
            if (res.data.status == "success") {
              setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              });
              localStorage.setItem("auth", JSON.stringify(res.data));
              toast.success("SignUp Successfull");
              router.push("/");
              setIsloading(false);
            } else if (res.data.status == "Failed") {
              toast.error(res.data.message);
              setIsloading(false);
            } else {
              toast.error("Somthing went wrong, try again");
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

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight dark:text-white text-gray-900">
          Sign in to your account
        </h1>
      </div>
      <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="dark:bg-slate-800 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant == "REGISTER" && (
              <Input
                id="name"
                label="Name"
                registor={register}
                errors={errors}
                disabled={isloading}
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              registor={register}
              errors={errors}
              disabled={isloading}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              registor={register}
              errors={errors}
              disabled={isloading}
            />
            <div>
              <Button disabled={isloading} fullWidth type="submit">
                {variant == "LOGIN" ? "Sign in" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t dark:border-slate-500 border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="dark:bg-slate-800 px-2 dark:text-slate-300 bg-white  text-gray-500">
                  Or contine with
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center text-center text-sm mt-6 px-2 dark:text-gray-300 text-gray-500">
            <div>
              {variant == "LOGIN"
                ? "New to Messenger?"
                : "Already have an account?"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant == "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
