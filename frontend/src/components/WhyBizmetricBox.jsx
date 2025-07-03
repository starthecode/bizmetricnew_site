import { PrimaryButton } from './Buttons/PrimaryButton';
import { Heading } from './Heading/Heading';

import { FaCheck } from 'react-icons/fa';

export default function WhyBizmetricBox({ whyboxData }) {
  return (
    <section
      className="relative pt-24 pb-24 sm:pt-24 md:pt-24 lg:pt-24 z-10"
      style={{
        backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="flex 2xl:text-left 2xl:justify-start">
          <Heading
            type=""
            smallTitle={'Why Bizmetric'}
            title={'Driving Business Acceleration Strategically'}
            subText={
              'Bizmetric is leading the digital transformation space in full capacity. We are successfully making ways into the era of disruptions by linking humans and machines. Harnessing technologies to reinvent the business outcome is our competitive advantage.'
            }
          />
        </div>

        <div className="grid grid-cols-2 mt-5 gap-10">
          <div className="div">
            <div className="grid items-center mb-5 justify-start">
              <ul className="mb-5 text-white leading-[2.5] space-y-2 list-none">
                {whyboxData &&
                  whyboxData[0]?.whyboxDesc?.split(',').map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheck className="text-green-400 mt-1" size={16} />
                      <span>{item.trim()}</span>
                    </li>
                  ))}
              </ul>
              <PrimaryButton title={'Talk to our expert'} />
            </div>
          </div>
          <div className="relative w-full h-128 mb-20 lg:mb-0 animate__animated animate__fadeIn overflow-hidden pb-8">
            <div className="absolute top-10 left-10 h-full w-[500px] mt-6 bg-junglegreen-300/60 rounded-xl"></div>
            <img
              alt="single solution image"
              data-nimg="1"
              loading="lazy"
              decoding="async"
              className="relative top-0 right-0 h-[320px] w-[500px] rounded-xl object-cover object-top"
              src={whyboxData && whyboxData[0]?.whyboxImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
