"use client";

import Bg from "@/public/Bg.svg";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RoootState } from "@/store/store";
import { getQuizs } from "@/store/quizSlice";

interface QuizProps {
  id: String;
  title: String;
  description: String;
  color: String;
}

const Quizs = () => {
  const [hover, setHover] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const dispatch = useDispatch();

  const getQuizsHandler = async () => {
    setIsloading(true);
    try {
      dispatch<any>(getQuizs());
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    } finally {
      setIsloading(false);
    }
  };

  const Quiz: QuizProps[] = useSelector(
    (store: RoootState) => store.quiz.quizs
  );
  useEffect(() => {
    getQuizsHandler();
  }, []);
  return (
    <div  className={` relative pb-[100px] lg:pb-[200px] -mt-16 bg-no-repeat bg-bottom`}>
      <div className="bg-top bg-no-repeat xl:hidden lg:hidden md:hidden sm:block xs:block absolute -top-40  -bottom-56 visible">
        <Image src={Bg} alt="" />
      </div>
      <div className="absolute right-0  -bottom-56 invisible lg:visible">
        <Image src={Bg} alt="" />
      </div>
      <div className={`mx-[24px] lg:mx-[80px]  xl:mx-[160px]`}>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center text-center gap-x-8 gap-y-[60px]">
          {Quiz?.map((item: QuizProps, index: number) => {
            const Hovered = hover === index;
            return (
              <div key={index} className="flex justify-center cursor-pointer">
                <div
                  onMouseEnter={() => setHover(index)}
                  className={`self-center py-11 px-[30px] shadow-2xl dark:shadow-blue-900/50   space-y-11 max-w-[352px] flex flex-col rounded-2xl items-center ${
                    Hovered
                      ? `bg-exact-purple`
                      : "bg-exact-white dark:bg-[#00113B]"
                  }`}
                >
                  <div
                    className={`p-8 shadow-xl  rounded-full  shadow-${
                      item.color
                    } ${
                      Hovered
                        ? "bg-exact-white shadow-gray-800/50 "
                        : `bg-exact-purple`
                    }`}
                  >
                    <div
                      className={`${
                        Hovered ? `fill-exact-purple` : "fill-exact-white"
                      } w-[33px] h-[33px]`}
                    >
                      <svg viewBox="0 0 33 33">
                        <g transform="translate(0.000000,32.000000) scale(0.050000,-0.050000)">
                          <path d="M247 609 c-5 -11 -6 -151 -3 -310 l6 -289 76 -6 75 -6 -5 314 -6 314 -68 2 c-37 1 -71 -7 -75 -19z" />
                          <path d="M489 415 c-6 -16 -8 -113 -5 -217 l6 -188 70 0 70 0 0 210 0 210 -65 6 c-42 4 -69 -3 -76 -21z" />
                          <path d="M18 332 c-4 -5 -5 -81 -1 -170 l6 -162 66 0 66 0 10 155 c6 85 6 162 1 170 -9 16 -133 21 -148 7z" />
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="info space-y-4">
                    <h3
                      className={`dark:text-exact-white text-xl lg:text-lg xl:text-xl font-semibold ${
                        Hovered ? "text-exact-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`dark:text-exact-white lg:max-w-[292px] text-lg  leading-[32px] lg:text-[18px] xl:text-[18px] xl:leading-[32px] font-normal ${
                        Hovered ? "text-exact-white" : "text-[#6B6B6B]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <div
                    className={`dark:bg-[#020E2D] p-[17px] rounded-full hover:relative hover:left-1 hover:bg-[#F3F4F6] dark:fill-blue-600 fill-blue-600 ${
                      Hovered
                        ? `bg-exact-white fill-exact-purple dark:bg-exact-white/100 `
                        : "bg-[#F3F4F6]"
                    } `}
                  >
                    <svg
                      className="font-bold w-[11px] h-[11px]"
                      width="12.000000pt"
                      height="12.000000pt"
                      viewBox="0 0 12.000000 12.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g transform="translate(0.000000,12.000000) scale(0.100000,-0.100000)">
                        <path d="M65 90 c18 -20 17 -20 -18 -20 -21 0 -37 -4 -37 -10 0 -5 16 -10 37 -10 35 0 36 0 18 -20 -26 -29 -3 -24 25 5 l23 25 -23 25 c-28 29 -51 34 -25 5z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quizs;
