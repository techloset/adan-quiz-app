"use client"
import Button from "@/components/Button";

import useAddQuiz from "@/hooks/Quiz/useAddQuiz";

export default function Home() {
  const { isloading, onSubmit, form } = useAddQuiz();
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight dark:text-white text-gray-900">
          Make a New Quiz Category
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
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Title
                </label>
                <div className="w-full flex justify-center items-center">
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter your title"
                    disabled={isloading}
                    {...form.register("title")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Description
                </label>
                <div className="w-full">
                  <textarea
                    id="description"
                    placeholder="Explain us about the your title in your words"
                    disabled={isloading}
                    {...form.register("description")}
                    className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
