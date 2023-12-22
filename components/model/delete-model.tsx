"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfrim: () => void;
  loading?: boolean;
  title: String;
}

const DeleteModel: React.FC<DeleteModelProps> = ({
  isOpen,
  onClose,
  onConfrim,
  loading,
  title,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-semibold leading-none tracking-tight">
              Are you sure you want to Delete this {title}
            </div>
            <div
              onClick={onClose}
              className="p-[3px] cursor-pointer flex justify-center items-center border-2 border-black  rounded-md dark:border-white  "
            >
              <X className="h-4 w-4 " />
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            This action cannot be undone.
          </div>
        </div>
        <div className="pt-6 space-x-2 flex items-center justify-between w-full">
          <button
            disabled={loading}
            className="rounded-lg border-2 py-2 px-3 border-stone-300 hover:border-black hover:bg-stone-200 dark:hover:bg-exact-purple dark:border-white  opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onClose}
          >
            Close
          </button>
          <button
            disabled={loading}
            className="py-2 px-3 text-white rounded-lg bg-red-600 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={onConfrim}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModel;
