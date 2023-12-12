import { Check, XCircle } from "lucide-react";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="lg:w-[800px] md:w-[600px] w-[370px] space-y-4">
        <div className="flex justify-between items-center px-2">
          <h1 className="dark:text-white text-slate-950 text-center text-3xl">
            Result
          </h1>
        </div>
        <div className="mx-auto border-2 border-cyan-500 bg-slate-900 text-stone-200  shadow-xl">
          <table className="w-full caption-bottom text-sm">
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
            <tbody>
              <tr className="bg-teal-500 text-slate-950 hover:bg-teal-500">
                <td className="p-4 font-medium">1</td>
                <td className="p-4">What is the main name of JavaScript</td>
                <td className="p-4">Livescript</td>
                <td className="p-4 text-right">Livescript</td>
                <td className="p-4 dark:bg-slate-900 bg-stone-300 flex justify-center items-center">
                  <div className="p-2 bg-lime-500 rounded-xl ">
                    <Check size={20} className="text-white" />
                  </div>
                </td>
              </tr>
              <tr className="bg-rose-500 text-slate-950 hover:bg-rose-500 hover:text-slate-950">
                <td className="p-4 font-medium">2</td>
                <td className="p-4">What is the main name of JavaScript</td>
                <td className="p-4">Livescript</td>
                <td className="p-4 text-right">Livescript</td>
                <td className="p-4 dark:bg-slate-900 bg-stone-300 items-center flex justify-center">
                  <div className="px-2 py-2 bg-rose-500 rounded-xl">
                    <XCircle className="text-white" size={20} />
                  </div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="dark:bg-slate-800 text-slate-900 dark:text-white dark:hover:bg-slate-800 bg-stone-300 hover:bg-stone-300">
                <td colSpan={2} className="p-4 text-center text-xl font-semibold">
                  Totals Marks
                </td>
                <td colSpan={2} className="p-4 text-center text-xl font-semibold">
                  7
                </td>
                <td className="p-4 text-center dark:bg-slate-900 bg-stone-300 text-slate-900 dark:text-white text-xl text-bold">
                  <div className="py-2 px-2 text-xl bg-lime-500 text-white rounded-xl">
                    Pass
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

