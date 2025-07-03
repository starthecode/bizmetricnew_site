import GlowLight from '../../extras/GlowLight';
import { Heading } from '../../Heading/Heading';

export default function IndustrySection3({ aboutIndustryData4 }) {
  return (
    <section className="h-full px-10 md:px-24 xl:px-24 pt-10 xl:pt-0 py-10 mt-10">
      <GlowLight classes={'top-[25%] left-0 bg-flamingo-600/40'} />
      <div className="max-w-7xl mx-auto">
        <div>
          <Heading
            type="dark"
            smallTitle={'Energy Industry Solutions'}
            title={'Turn Data Chaos into Competitive Advantage'}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 items-start pt-10">
          {aboutIndustryData4 &&
            aboutIndustryData4?.map((item, index) => (
              <div key={index} className="flex w-full">
                <div className="md:w-[50%] h-[300px] relative py-10 px-8 text-white overflow-hidden rounded-md">
                  <div className="absolute inset-0">
                    <img
                      src={item?.textInput1}
                      alt="Data analytics visualization"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-flamingo-500/30 via-transparent to-transparent"></div>
                  </div>
                  <div
                    className="relative z-10 flex flex-col h-full justify-between industry__box"
                    dangerouslySetInnerHTML={{ __html: item?.textInput2 }}
                  />
                </div>
                <div className="md:w-1/2 py-4 px-8">
                  <div
                    className="industry__box_list"
                    dangerouslySetInnerHTML={{ __html: item?.textInput3 }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      <GlowLight classes={'right-0 bg-flamingo-600/40'} />
    </section>
  );
}
