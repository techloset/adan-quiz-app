// "use client";


// import Button from "@/components/Button";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { useState } from "react";

// export default function Home() {
//     const [selected,setSelected]=useState("")

//     const onSelect = (option:string) => {
//         console.log("selected",selected);
        
//         setSelected(option);
//       };

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center h-screen gap-4">
//         <h1 className="text-3xl dark:text-stone-200 text-slate-900 font-semibold">
//           Question no 1
//         </h1>
//         <div className="w-[370px] lg:w-[800px] md:w-[600px] border-2 border-primary p-2 rounded-xl dark:bg-slate-900 bg-sto bb-white shadow-2xl">
//           <h3 className="px-4 text-blue-700 dark:text-blue-300 font-medium text-xl italic py-4 flex gap-2">
//             <p className="dark:text-white text-slate-950">1{") "}</p>What was the
//             real name of the Javascript?
//           </h3>
//           <form>
//             <div >
//               <RadioGroup defaultValue="option1" className="px-4 my-4 flex flex-col space-y-4 ">
//                 <div className="flex items-center space-x-2 cursor-pointer">
//                   <RadioGroupItem value="option1" id="option1" className="h-6 w-6"      onClick={() => onSelect('option1')}    checked={selected === 'option1'}/>
//                   <Label htmlFor="option1" className={`text-lg ${selected== "option1"? "text-cyan-950":"text-cyan-700"}`} >Option One</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="option2" id="option2"  className="h-6 w-6"    onClick={() => onSelect('option2')}  checked={selected === 'option2'} />
//                   <Label htmlFor="option2" className={`text-lg ${selected== "option2"? "text-cyan-950":"text-cyan-700"}`} >Option Two</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="option3" id="option3"  className="h-6 w-6"    onClick={() => onSelect('option3')}  checked={selected === 'option3'}/>
//                   <Label htmlFor="option3" className={`text-lg ${selected== "option3"? "text-cyan-950":"text-cyan-700"}`}  >Option Three</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="option4" id="option4"  className="h-6 w-6"   onClick={() => onSelect('option4')}  checked={selected === 'option4'}/>
//                   <Label htmlFor="option4" className={`text-lg ${selected== "option4"? "text-cyan-950":"text-cyan-700"}`} >Option Four</Label>
//                 </div>
//               </RadioGroup>
//             </div>
//             <div className="w-full justify-between items-center flex px-4 pb-2 pt-6">
//               <Button >
//                 Prev
//               </Button>
//               <Button >
//                 Next
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }
"use client"
import React, { useState } from 'react';
import Button from '@/components/Button';

export default function Home() {
  const [selected, setSelected] = useState('');

  const onSelect = (option:any) => {
    setSelected(option);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <h1 className="text-3xl dark:text-stone-200 text-slate-900 font-semibold">
          Question no 1
        </h1>
        <div className="w-[370px] lg:w-[800px] md:w-[600px] border-2 border-primary p-2 rounded-xl dark:bg-slate-900 bg-stone-200 shadow-2xl">
          <h3 className="px-4 text-blue-700 dark:text-blue-300 font-medium text-xl italic py-4 flex gap-2">
            <p className="dark:text-white text-slate-950">1{') '}</p>
            What was the real name of the Javascript?
          </h3>
          <form>
            <div className='flex gap-4 lg:flex-row flex-col'>
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="option1"
                  value="option1"
                  checked={selected === 'option1'}
                  onChange={() => onSelect('option1')}
                  className="h-6 w-6"
                />
                <label
                  htmlFor="option1"
                  className={`text-lg ${
                    selected === 'option1' ? 'text-cyan-950' : 'text-cyan-700'
                  }`}
                >
                  Option One
                </label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="option2"
                  value="option2"
                  checked={selected === 'option2'}
                  onChange={() => onSelect('option2')}
                  className="h-6 w-6"
                />
                <label
                  htmlFor="option2"
                  className={`text-lg ${
                    selected === 'option2' ? 'text-cyan-950' : 'text-cyan-700'
                  }`}
                >
                  Option Two
                </label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="option3"
                  value="option3"
                  checked={selected === 'option3'}
                  onChange={() => onSelect('option3')}
                  className="h-6 w-6"
                />
                <label
                  htmlFor="option3"
                  className={`text-lg ${
                    selected === 'option3' ? 'text-cyan-950' : 'text-cyan-700'
                  }`}
                >
                  Option Three
                </label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  id="option4"
                  value="option4"
                  checked={selected === 'option4'}
                  onChange={() => onSelect('option4')}
                  className="h-6 w-6"
                />
                <label
                  htmlFor="option4"
                  className={`text-lg ${
                    selected === 'option4' ? 'text-cyan-950' : 'text-cyan-700'
                  }`}
                >
                  Option Four
                </label>
              </div>
            </div>
            <div className="w-full justify-between items-center flex px-4 pb-2 pt-6">
              <Button>Prev</Button>
              <Button>Next</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
