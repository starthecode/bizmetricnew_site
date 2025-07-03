import { Heading } from '../../Heading/Heading';

export default function SolutionsSection3({ data }) {
  return (
    <section
      className="relative px-28 py-24 sm:py-24 md:py-24 lg:py-24 z-10 h-fit mt-20"
      style={{
        backgroundImage:
          'url("https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="text-center w-full mb-10 flex flex-col justify-center items-center">
        <div className="max-w-4xl">
          <Heading
            classes={'items-center text-center justify-center'}
            type=""
            smallTitle={''}
            title={data?.title}
            subText={data?.subtitle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1456px] mx-auto">
        {data &&
          data?.items.map((card, index) => (
            <div
              key={index}
              className="rounded-xl text-card-foreground shadow bg-transparent border-0"
            >
              <div className="p-0 flex flex-col items-center h-[300px]">
                <div className="flex flex-col items-center gap-4">
                  <div
                    className="flex items-center justify-center w-[83px] h-[83px] rounded-[20.8px] overflow-hidden"
                    style={{
                      boxShadow: card.boxShadow,
                      background: `url(https://c.animaapp.com/mbogi8vtaM1MUm/img/630cb940c5c4fa57353cf11f-feature-icon-06-svg.png) center center / cover`,
                    }}
                  >
                    <div className="relative w-[83.2px] h-[83.2px] overflow-hidden">
                      <img
                        className="absolute w-[83px] h-[83px] top-0 left-0"
                        alt={`${card.threeboxesinput2} icon`}
                        src={card.threeboxesinput1}
                      />
                      {card.icon2 && (
                        <img
                          className="absolute w-[37px] h-[37px] top-[22px] left-[22px]"
                          alt="Icon inner"
                          src={card.threeboxesinput1}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-white text-xl leading-[37.1px] whitespace-nowrap">
                      {card.threeboxesinput2}
                    </h3>
                  </div>
                  <div className="text-center px-4">
                    <p className="font-medium text-white text-md leading-[26px]">
                      {card.threeboxesinput3}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
