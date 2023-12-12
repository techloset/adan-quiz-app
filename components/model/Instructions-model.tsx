

const InstructionModel = () => {
  return (
    <div className="bg-slate-950   h-screen justify-center flex flex-col items-center gap-4">
    <h1>hi Adan!</h1>
    <div className="max-w-[800px] justify-center flex flex-col items-center border-4 border-cyan-700 p-8">
      <h1 className="text-cyan-300 text-3xl   font-semibold ">
        Quiz Application
      </h1>
      <ol className="flex flex-col items-start text-slate-300 italic mt-4 gap-1 ">
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-2 h-2 bg-cyan-400" />
          <li>You will be asked 10 questions one after another. </li>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-2 h-2 bg-cyan-400" />
          <li>10 points is awarded for the correct answer.</li>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-2 h-2 bg-cyan-400" />
          <li>
            Each question has three options. You can choose only one option.{" "}
          </li>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-2 h-2 bg-cyan-400" />
          <li>
            You can review and change answers before the quiz is finish.{" "}
          </li>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full w-2 h-2 bg-cyan-400" />
          <li>he result will be declared at the end of the quiz.</li>
        </div>
      </ol>
      <h3 className="items-start text-slate-700 mt-1 italic justify-start text-md  ">
        Please read instructions before conducting the test
      </h3>

      <button className="bg-cyan-600 text-slate-200 hover:text-cyan-500 hover:bg-slate-800   h-8 mt-8 rounded-3xl flex items-center justify-center px-3">
        Start Quiz
      </button>
    </div>
  </div>
  )
}

export default InstructionModel