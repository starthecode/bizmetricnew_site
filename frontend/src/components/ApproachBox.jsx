import { PrimaryButton } from './Buttons/PrimaryButton';
import { Heading } from './Heading/Heading';
import WorkflowTree from './WorkflowTree';
import { LuSearchCode } from 'react-icons/lu';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { GiArtificialHive } from 'react-icons/gi';
import { VscServerProcess } from 'react-icons/vsc';
import { GrDocumentTest } from 'react-icons/gr';

const iconMap = {
  LuSearchCode,
  HiClipboardDocumentList,
  GiArtificialHive,
  VscServerProcess,
  GrDocumentTest,
};

export default function ApproachBox({ approachData = [] }) {
  console.log('approachData', approachData);

  return (
    <div className="relative z-[999] overflow-hidden rounded-[30px] bg-gradient-to-t from-white to-transparent px-4 pb-20 sm:px-20 lg:px-[110px] mt-20">
      <div className="w-full flex justify-center text-center items-center mb-10">
        <Heading
          type="dark"
          smallTitle={approachData?.title}
          title="Our Approach"
          classes="items-center"
        />
      </div>

      <div className="relative w-full h-full mt-20">
        <div className="absolute flex justify-center items-center top-0 left-0 rounded-full before:bg-junglegreen-500/20 after:bg-flamingo-600/30 circle__pulse">
          <svg
            className="w-16 h-16"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient x1="0%" y1="32.443%" x2="104.18%" y2="50%" id="a">
                <stop stopColor="#FFF" stopOpacity=".299" offset="0%" />
                <stop stopColor="#7587E4" stopOpacity="0" offset="100%" />
              </linearGradient>
              <linearGradient x1="18.591%" y1="0%" x2="100%" y2="100%" id="b">
                <stop stopColor="#04c89e" offset="0%" />
                <stop stopColor="#C7D2FE" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path fill="#04c89e" d="M16 18.5V32l15.999-9.25V9.25z" />
              <path fill="#04c89e" d="m0 23 16 9V18.501L0 9.251z" />
              <path
                fillOpacity=".64"
                fill="url(#a)"
                d="M16 13 0 23l16 9 16-9z"
              />
              <path fill="url(#b)" d="M16 0 0 9.25l16 9.25 15.999-9.25z" />
            </g>
          </svg>
        </div>

        <div className="block mt-28">
          <div className="relative overflow-hidden w-[2px] h-[90px] m-auto">
            <div
              className="absolute w-full h-[40%] bg-junglegreen-500 top-[30%]"
              style={{ boxShadow: '0px 0px 30px 20px grey' }}
            ></div>
          </div>

          <div className="border border-junglegreen-500" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-0 xl:gap-4">
            {approachData &&
              approachData?.items?.map((item, index) => {
                const IconComponent =
                  iconMap[item?.threeboxesinput1] || LuSearchCode;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="relative overflow-hidden w-[2px] h-[60px] m-auto">
                      <div
                        className="absolute w-full h-[50%] bg-junglegreen-500 top-[30%]"
                        style={{ boxShadow: '0px 0px 30px 20px grey' }}
                      ></div>
                    </div>

                    <div
                      className="z-10 w-[200px] h-[250px] rounded-xl py-2 px-8 flex flex-col justify-center items-center
                    bg-[#08112e] border border-white/20 ring-1 ring-white/10 shadow-xl backdrop-blur-md"
                    >
                      <div className="flex flex-col justify-center items-center">
                        <span className="flex justify-center items-center border border-gray-700/30 bg-flamingo-200 dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e293b] w-12 h-12 rounded-full mb-3">
                          <IconComponent size={24} color="#f2692a" />
                        </span>
                        <h1 className="text-center text-sm uppercase text-junglegreen-500 font-semibold">
                          {item?.threeboxesinput2}
                        </h1>
                        <p className="text-xs text-center mt-2 text-slate-200/90">
                          {item?.threeboxesinput3}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="absolute [mask-image:linear-gradient(to_bottom,transparent,white)] h-96 inset-x-0 opacity-60 rotate-0 text-junglegreen-500/40 bottom-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-full inset-0 w-full"
        >
          <defs>
            <pattern
              id="grid-pattern"
              x="50%"
              y="100%"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>
    </div>
  );
}
