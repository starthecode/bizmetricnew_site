import BackgroundSection from './BackgroundSection';
import { PrimaryButton } from './Buttons/PrimaryButton';
import { Heading } from './Heading/Heading';

import { FaCheck } from 'react-icons/fa';

export default function WhyBizmetricBox({ whyboxData }) {
  return (
    <BackgroundSection className='mt-20'>
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-2 mt-5 gap-10">
          <div className="div">
            <div className="flex 2xl:text-left 2xl:justify-start">
              <Heading
                classes={
                  'items-center text-center xl:text-start xl:items-start'
                }
                type=""
                smallTitle={whyboxData?.fiveboxesinput1}
                title={whyboxData?.fiveboxesinput2}
                subText={whyboxData?.fiveboxesinput3}
              />
            </div>
            <div className="w-full grid items-center mb-5 xl:justify-start">
              <ul className="mb-5 text-white leading-[2.5] space-y-2 list-none">
                {whyboxData &&
                  whyboxData[0]?.whyboxDesc?.split(',').map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="text-green-400 mt-1" size={16} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
              </ul>
              <div className="w-full flex justify-center items-center justify-items-center mx-auto text-center">
                <PrimaryButton title={'Talk to our expert'} />
              </div>
            </div>
          </div>
          <div className="relative w-full h-128 mb-20 lg:mb-0 animate__animated animate__fadeIn overflow-hidden pb-8">
            <div className="absolute hidden xl:block top-10 left-10 h-full w-[500px] mt-6 bg-junglegreen-300/60 rounded-xl"></div>
            <img
              alt="single solution image"
              data-nimg="1"
              loading="lazy"
              decoding="async"
              className="relative top-0 right-0 h-[320px] w-[500px] rounded-xl object-cover object-top"
              src={whyboxData && whyboxData?.fiveboxesinput4}
            />
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
}
