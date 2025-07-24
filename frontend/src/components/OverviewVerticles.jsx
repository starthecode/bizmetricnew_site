import { Heading } from './Heading/Heading';
import { ServiceCards } from './ServiceCards';
import BackgroundSection from './BackgroundSection';

export const OverviewVerticles = ({ overviewData }) => {
  console.log('overviewData', overviewData);

  return (
    <BackgroundSection>
      <div className="h-full max-w-full px-0 sm:px-0 md:px-40 lg:px-40 xl:px-40">
        <div className="flex text-center justify-center">
          <Heading
            classes={'items-center'}
            type=""
            smallTitle={overviewData?.title}
            title={overviewData?.subtitle}
            subText={overviewData?.extratext}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid xl:grid-cols-3 gap-10 mt-10 ">
          {overviewData?.items?.map((item, index) => (
            <div key={index}>
              <ServiceCards item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </BackgroundSection>
  );
};
