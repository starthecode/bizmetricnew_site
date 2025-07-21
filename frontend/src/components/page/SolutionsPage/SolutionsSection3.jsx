import BackgroundSection from '../../BackgroundSection';
import { Heading } from '../../Heading/Heading';

export default function SolutionsSection3({ data }) {
  return (
    <BackgroundSection>
      <div className="text-center w-full mb-10 flex flex-col justify-center items-center">
        <div className="max-w-4xl text-center">
          <Heading
            classes={'items-center text-center justify-center'}
            type=""
            smallTitle={''}
            title={data?.title}
            subText={data?.subtitle}
          />
        </div>
      </div>

      <div
        className={`grid ${
          data?.items.length == 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        } grid-cols-1 md:grid-cols-2 gap-8 mx-auto px-24`}
      >
        {data &&
          data?.items.map((card, index) => (
            <div
              key={index}
              className="rounded-xl text-card-foreground shadow bg-transparent border-0"
            >
              <div className="p-0 flex flex-col items-center h-fit">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center w-[83px] h-[83px] rounded-[20.8px] overflow-hidden">
                    <div
                      className={`relative p-2 w-fit h-fit overflow-hidden bg-white flex items-center rounded-xl border-2 ${
                        index % 2 === 0
                          ? 'border-junglegreen-500'
                          : 'border-flamingo-500'
                      }`}
                    >
                      <img
                        className="w-[30px] h-[30px]"
                        alt={`${card.threeboxesinput2} icon`}
                        src={card.threeboxesinput1}
                      />
                    </div>
                  </div>

                  {card.threeboxesinput2 && (
                    <div className="text-center">
                      <h3 className="font-bold text-white text-xl leading-[37.1px] whitespace-nowrap">
                        {card.threeboxesinput2}
                      </h3>
                    </div>
                  )}

                  {card.threeboxesinput3 && (
                    <div className="text-center px-4">
                      <p className="font-medium text-white text-md leading-[26px]">
                        {card.threeboxesinput3}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </BackgroundSection>
  );
}
