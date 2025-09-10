import { Heading } from '../../Heading/Heading';
import { VscServerProcess } from 'react-icons/vsc';
import { MdOutlineShowChart } from 'react-icons/md';
import { FaRegQuestionCircle } from 'react-icons/fa';

const iconMap = {
  VscServerProcess,
  MdOutlineShowChart,
  FaRegQuestionCircle,
};

export const BoxesItems = ({ data }) => {
  return (
    <div className="container my-20">
      <Heading
        classes={'items-center text-center xl:text-start xl:items-start'}
        type={'dark'}
        smallTitle={data?.title}
        title={data?.subtitle}
        subText={data?.extratext}
      />

      <div className="mt-12 grid sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {data &&
          data?.items?.map((item, index) => {
            const IconComponent = iconMap[item?.threeboxesinput1] || '';
            return (
              <div
                key={index}
                className="relative group overflow-hidden p-[2rem] rounded-[1.5rem] bg-white border border-junglegreen-600/40"
              >
                <div
                  aria-hidden="true"
                  className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-success-500 to-white blur-2xl opacity-25"
                ></div>
                <div className="relative">
                  <div className="flex gap-5 items-center">
                    <div className="p-4 w-fit border border-success-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-[1rem]  before:rounded-[1rem] before:absolute before:inset-0 before:border-t before:border-white before:from-success-100 ">
                      <IconComponent
                        size={24}
                        className="fill-junglegreen-500"
                      />
                    </div>
                    <span className="font-bold text-lg">
                      {item.threeboxesinput2}
                    </span>
                  </div>
                  <div className="mt-6 pb-6 rounded-b-[1rem]">
                    <p className="text-gray-700">{item.threeboxesinput3}</p>
                  </div>
                  <div className="flex gap-3 -mb-[1rem] py-4 border-dashed border-t border-flamingo-500/40"></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
