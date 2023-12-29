"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface InstructionModelProps {
  isOpen: boolean;
  onClose: () => void;
}
const InstructionModel: React.FC<InstructionModelProps> = ({
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-stone-200 dark:bg-slate-950 p-4 w-96 rounded-lg shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg font-semibold ">Instructions</div>
            <div
              onClick={onClose}
              className="p-[3px] cursor-pointer flex justify-center items-center border-2 border-black  rounded-md dark:border-white  "
            >
              <X className="h-4 w-4 " />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Please read the instructions before taking the Quiz.
          </div>
        </div>
        {/* Instructions */}
        <div className="space-y-4 mt-4">
          <div className="flex flex-col gap-3 mx-2 my-4">
            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                You will be asked questions one after another.
              </p>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                Each question has three options. You can choose only one option.
              </p>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                You can review and change answers before the quiz is finish.{" "}
              </p>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                If you attempt more then half questions correct then you have passed
                other wise fail.
              </p>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                The result will not declare be declared until all the question
                have been a attempted
              </p>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <div className="w-2 h-2 rounded-full bg-slate-950 dark:bg-white" />
              <p className="text-sm text-gray-900 dark:text-stone-100 font-light ">
                The result will be declared at the end of the quiz.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={onClose}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionModel;
