import { Heading } from '../../Heading/Heading';
import Line5 from '../../lines';

export default function SolutionsSection4({ data }) {
  if (!data?.items || data.items.length === 0) return null;

  return (
    <section className="relative w-full h-full py-12">
      <div
        className="absolute h-full items-center inset-0 w-full text-center grid justify-center z-0"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <Line5 />
      </div>

      <div className="relative flex flex-col justify-center items-center w-full mt-20 z-10">
        {data.items.map((item, index) => {
          const isImageLeft = index % 2 === 0;
          const content = (
            <div className="bg-white relative z-20 text-card-foreground shadow w-full md:w-[610px] h-fit my-7 rounded-[20px]">
              <div className="flex bg-blue-300 flex-col space-y-1.5 p-6 h-[67px] px-8 py-4 rounded-t-[20px]">
                <h2 className="tracking-tight font-bold text-[#141414] text-xl leading-8">
                  {item.threeboxesinput2}
                </h2>
              </div>
              <div className="solution__section3 p-6 px-7 pt-2 text-[#495057] text-base tracking-[0.48px] leading-6 space-y-4">
                <div
                  dangerouslySetInnerHTML={{ __html: item.threeboxesinput3 }}
                />
              </div>
            </div>
          );

          const image = (
            <div
              className={`w-full md:w-[508px] h-[350px] bg-cover bg-center ${
                isImageLeft ? '' : ''
              }`}
              style={{ backgroundImage: `url(${item.threeboxesinput1})` }}
            />
          );

          return (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-0 h-[395px]"
            >
              {isImageLeft ? (
                <>
                  {image}
                  <div className="-ml-20">{content}</div>
                </>
              ) : (
                <>
                  <div className="-mr-20">{content}</div>
                  {image}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
