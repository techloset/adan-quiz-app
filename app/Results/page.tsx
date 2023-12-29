"use client";
import Loader from "@/components/Loader";
import useAllResults from "@/hooks/Result/useAllResults";
import { Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import moment from "moment";
import Link from "next/link";

export default function Home() {
  const { Results, isLoading } = useAllResults();
  const router = useRouter();
  const momentDate = (date: string) => moment(date).format("LLL");

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center ">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className="lg:w-[800px] md:w-[600px] w-full space-y-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="dark:text-white text-slate-900 text-center text-3xl">
              Your History
            </h1>
          </div>
          {Results?.length !== 0 ? (
            <div className="mx-auto border-2 border-cyan-500 dark:bg-slate-900 bg-stone-200 text-slate-900 dark:text-stone-200 ">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b dark:hover:bg-slate-900 hover:bg-stone-200">
                  <tr>
                    <th>Type</th>
                    <th>Total Marks</th>
                    <th>Marks</th>
                    <th>See result</th>
                  </tr>
                </thead>
                <tbody>
                  {Results?.map((item) => {
                    return (
                      <tr className="cursor-pointer text-center" key={item.id}>
                        <td className="p-4 text-center">
                          {momentDate(item.createdAt.toString())}
                        </td>
                        <td className="p-4 text-center">{item.total}</td>
                        <td className="p-4 text-center">{item.mark}</td>
                        <td className="p-4 text-center   flex items-center justify-center">
                          <div
                            onClick={() => router.push(`/results/${item.id}`)}
                            className="p-2 text-white bg-green-500 hover:bg-green-600 w-auto rounded-md"
                          >
                            <Navigation size={20} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-full justify-center items-center text-center  text-xl italic flex gap-2">
              <p>You did not take any test</p>
              <Link
            href={"/quizs"}
            className="text-blue-500 dark:text-exact-red cursor-pointer"
          >
            Take Quiz
          </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
