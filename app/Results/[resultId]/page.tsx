"use client";
import Loader from "@/components/Loader";
import useResults from "@/hooks/Result/useResults";
import { Check, XCircle } from "lucide-react";
export default function Home({ params }: { params: { resultId: string } }) {
  let id = params.resultId;
  const { Result, isLoading } = useResults(id);

  if (isLoading || Object.keys(Result).length === 0) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }
   const percentage = (Result.mark / Result.total) * 100;
   const isPass = percentage >= 50;
    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="dark:text-white text-slate-950 text-center text-3xl">
              Result
            </h1>
          </div>
          <div className=" border-2 border-cyan-500 bg-slate-900 text-stone-200  shadow-xl overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full caption-bottom text-sm">
              <></>
              <thead>
                <tr className="dark:bg-slate-900 dark:hover:bg-slate-950 dark:text-white text-slate-950 bg-stone-200 hover:bg-stone-100">
                  <th className="">No .</th>
                  <th>Question</th>
                  <th>Correct Answer</th>
                  <th className="text-right">Your Answer</th>
                  <th className="flex gap-2 items-center justify-center">
                    <div className="px-2 py-2 bg-rose-500 rounded-xl">
                      <XCircle className="text-white" size={20} />
                    </div>
                    <div className="w-[1px] h-4 bg-white" />
                    <div className="p-2 bg-lime-500 rounded-xl">
                      <Check size={20} className="text-white" />
                    </div>
                  </th>
                </tr>
              </thead>
              {Result.ResultHistory?.map((item: any, index: number) => {
                return (
                  <tbody key={index}>
                    <tr className="">
                      <td className="p-4 font-medium">{index + 1}</td>
                      <td className="p-4">{item.Question}</td>
                      <td className="p-4">{item.CorrectOption}</td>
                      <td className="p-4 text-right">{item.SelectedOption}</td>
                      <td className="p-4  flex justify-center items-center">
                        {item.CorrectOption == item.SelectedOption ? (
                          <div className="p-2 bg-lime-500 rounded-xl ">
                            <Check size={20} className="text-white" />
                          </div>
                        ) : (
                          <div className="px-2 py-2 bg-rose-500 rounded-xl">
                            <XCircle className="text-white" size={20} />
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}

              <tfoot>
                <tr className="dark:bg-slate-800 text-slate-900 dark:text-white dark:hover:bg-slate-800 bg-stone-300 hover:bg-stone-300">
                  <td
                    colSpan={2}
                    className="p-4 text-center text-xl font-semibold"
                  >
                    Totals Marks {Result.total}
                  </td>
                  <td
                    colSpan={2}
                    className="p-4 text-center text-xl font-semibold"
                  >
                    Your marks {Result.mark}
                  </td>
                  <td className="p-4 text-center dark:bg-slate-900 bg-stone-300 text-slate-900 dark:text-white text-xl text-bold">
                    {isPass ? ( <div className="py-2 px-2 text-xl bg-lime-500 text-white rounded-xl">
                      Pass
                    </div>):( <div className="py-2 px-2 text-xl bg-rose-500 text-white rounded-xl">
                      Fail
                    </div>)}
                   
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    );
}
