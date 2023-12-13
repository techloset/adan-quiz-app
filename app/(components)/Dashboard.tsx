"use client";
import Image from "next/image";
import Arrow from "@/public/Dashboard/RightArrow.svg";

import { useAuth } from "@/context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen h-auto relative">
        <div className="flex flex-col  lg:ml-20 md:ml-8 sm:ml-6  lg:mt-8 md:mt-6 sm:t-2 mt-[6px] space-y-4 h-full w-full relative">
          <h1 className="text-2xl text-[#111029]  dark:text-exact-white md:text-[42px] md:leading-[52px] xl:text-[56px] xl:leading-[72px]  tracking-[-0.8px] font-semibold max-w-[500px] ">
            Welcome {!auth?.user?.username && `to`}
            <span className="text-exact-orange  dark:text-exact-light-orange ">
              {auth?.user?.username
                ? `${" "} ${auth?.user?.username} `
                : `${" "} Quiz App `}
            </span>
            Ready to take a Quiz!
          </h1>
          <p className=" md:text-[17px]text-[15px] xl:text-lg leading-[32px] lg:!w-[380px] !font-normal text-exact-gray dark:text-exact-white">
            try our latest quiz to improve and learn
            <br className="hidden xl:inline" /> new and exciting things and
            reach new height's. Your education is our first priority.
          </p>
          {auth?.user?.admin && (
            <button
              className={`w-fit relative shadow-[-5px_10px_30px_rgba(76,64,247,0.5)] py-[19px] px-[35px] bg-exact-purple rounded-xl cursor-pointer`}
            >
              <span className="flex items-baseline">
                <p className="text-base font-semibold leading-[26px] text-exact-white">
                  Create new Quizs
                </p>
                <Image
                  src={Arrow}
                  alt="icon"
                  className="w-[20px] h-[14px] ml-4 relative"
                />
              </span>
            </button>
          )}
        </div>
        <div className=" w-full">
          <Image
            src="/dashboard/Bgmobile.png"
            width={800}
            height={800}
            alt="heroImage"
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
