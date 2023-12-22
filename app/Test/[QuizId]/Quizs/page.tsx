import Quizs from "@/app/(components)/Quizs";
export default function Home() {
  return (
    <>
      <div className="heading space-y-5 xl:px-4 sm:p-0 mb-20 mt-4">
        <h6 className="text-exact-red dark:text-exact-light-orange text-center text-xl font-semibold">
          Quizs
        </h6>
        <h3 className="text-center text-[#111029] dark:text-white text-xl md:text-2xl lg:text-4xl xl:text-[42px] px-1 tracking-[-0.1px]  font-semibold lg:leading-[56px]">
          try Our latest Quizs
        </h3>
      </div>
      <Quizs />
    </>
  );
}
