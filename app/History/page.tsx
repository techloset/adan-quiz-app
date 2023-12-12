import { Trash2 } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="lg:w-[800px] md:w-[600px] w-full space-y-4">
          <div className="flex justify-between items-center px-2">
            <h1 className="dark:text-white text-slate-900 text-center text-3xl">
              Your History
            </h1>
          </div>
          <div className="mx-auto border-2 border-cyan-500 dark:bg-slate-900 bg-stone-200 text-slate-900 dark:text-stone-200 ">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b dark:hover:bg-slate-900 hover:bg-stone-200">
                <tr>
                  <th>Type</th>
                  <th>Total Marks</th>
                  <th>Marks</th>
                  <th className="hover:text-rose-500 text-rose-700">
                    Delete all
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="cursor-pointer ">
                  <td className="p-4">Programming</td>
                  <td className="p-4">10</td>
                  <td className="p-4">8</td>
                  <td className="p-4">
                    <Trash2
                      size={25}
                      className="hover:text-rose-500 text-rose-700"
                    />
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
