import Dashboard from "./(components)/Dashboard";
import Quizs from "./(components)/Quizs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Created by Adan Atif",
};
export default function Home() {
  return (
    <>
      <Dashboard />
      <Quizs />
    </>
  );
}
