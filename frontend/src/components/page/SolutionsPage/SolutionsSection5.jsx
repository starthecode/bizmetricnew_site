import BackgroundSection from '../../BackgroundSection';
import { Heading } from '../../Heading/Heading';

const cards = [
  {
    title: 'Global Distribution',
    description:
      'Azure Cosmos DB allows seamless global distribution across multiple Azure regions, enabling low-latency access and data replication close to users.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group.png',
    icon2: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/solar-global-bold.svg',
    bg: 'rgba(146, 92, 255, 0.48)',
    boxShadow:
      'rgba(146, 92, 255, 0.48) 0px 7.8px 20.8px -7.8px, rgba(146, 92, 255, 0.12) 0px 0px 15.6px inset, rgba(146, 92, 255, 0.24) 0px 0px 3.9px inset, rgb(146, 92, 255) 0px 0px 1.3px inset',
  },
  {
    title: 'Elastic Scalability',
    description:
      'It automatically scales throughput and storage, ensuring that applications can handle varying loads without manual intervention.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group-1.png',
    icon2: '',
    boxShadow:
      'rgba(255, 201, 51, 0.48) 0px 7.8px 20.8px -7.8px, rgba(255, 201, 51, 0.12) 0px 0px 15.6px inset, rgba(255, 201, 51, 0.24) 0px 0px 3.9px inset, rgb(255, 201, 51) 0px 0px 1.3px inset',
  },
  {
    title: 'Guaranteed Low Latency',
    description:
      'With millisecond-level latency guarantees for both reads and writes, Azure Cosmos DB ensures fast data access for users globally.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group-2.png',
    icon2: '',
    boxShadow:
      'rgba(67, 239, 159, 0.48) 0px 7.8px 20.8px -7.8px, rgba(67, 239, 159, 0.12) 0px 0px 15.6px inset, rgba(67, 239, 159, 0.24) 0px 0px 3.9px inset, rgb(67, 239, 159) 0px 0px 1.3px inset',
  },
  {
    title: 'Multiple Data Models',
    description:
      'Azure Cosmos DB supports various data models, including key-value, graph, document, and column family, offering flexibility for different application needs.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group-3.png',
    icon2: '',
    boxShadow:
      'rgba(255, 71, 108, 0.48) 0px 7.8px 20.8px -7.8px, rgba(255, 71, 108, 0.12) 0px 0px 15.6px inset, rgba(255, 71, 108, 0.24) 0px 0px 3.9px inset, rgb(255, 71, 108) 0px 0px 1.3px inset',
  },
  {
    title: 'Fully Managed',
    description:
      'As a fully managed service, Azure Cosmos DB reduces operational overhead, with automatic updates, backups, and database management.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group-4.png',
    icon2: '',
    boxShadow:
      'rgba(71, 169, 255, 0.48) 0px 7.8px 20.8px -7.8px, rgba(71, 169, 255, 0.12) 0px 0px 15.6px inset, rgba(71, 169, 255, 0.24) 0px 0px 3.9px inset, rgb(71, 169, 255) 0px 0px 1.3px inset',
  },
  {
    title: 'Comprehensive SLAs',
    description:
      'It offers industry-leading service-level agreements (SLAs) for uptime, performance, availability, and consistency, ensuring high reliability and confidence in data access.',
    icon1: 'https://c.animaapp.com/mbogi8vtaM1MUm/img/clip-path-group-5.png',
    icon2: '',
    boxShadow:
      'rgba(255, 133, 51, 0.48) 0px 7.8px 20.8px -7.8px, rgba(255, 133, 51, 0.12) 0px 0px 15.6px inset, rgba(255, 133, 51, 0.24) 0px 0px 3.9px inset, rgb(255, 133, 51) 0px 0px 1.3px inset',
  },
];
export default function SolutionsSection5({ data }) {
  return (
    <BackgroundSection>
      <div className="container">
        <div className="text-center w-full mb-10 flex flex-col justify-center items-center">
          <div className="w-full text-center">
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
            data?.items.map((item, index) => (
              <div
                key={index}
                class="rounded-3xl p-[2px] bg-royalBlue-950/20 border border-white/10"
              >
                <div class="bg-transparent rounded-[calc(1.5rem-2px)] p-10">
                  <h3 class="text-lg font-medium text-white mb-3">
                    {item?.threeboxesinput2}
                  </h3>
                  <p class="text-woodsmoke-300">
                    I absolutely love Tailus! The component blocks are
                    beautifully designed and easy to use, which makes creating a
                    great-looking website a breeze.
                  </p>
                </div>
              </div>

              // <div
              //   key={index}
              //   className="rounded-xl text-card-foreground shadow flex flex-col max-w-[456px] w-full items-center gap-[19.8px] px-[18px] py-[14.4px] bg-transparent border-[3px] border-solid border-transparent [border-image:linear-gradient(180deg,rgba(189,0,255,1)_0%,rgba(209,209,209,1)_100%)_1]"
              // >
              //   <h3 className="mt-[-3.00px] font-semibold text-[#f2682a] text-xl text-center leading-[31.2px] whitespace-nowrap">
              //     {item?.threeboxesinput2}
              //   </h3>
              //   <div className="flex flex-col items-center justify-center p-0 w-full">
              //     <p className="mt-[-1.20px] font-medium text-white text-md text-center flex items-center gap-3 capitalize">
              //       {item?.threeboxesinput3}
              //     </p>
              //   </div>
              // </div>
            ))}
        </div>
      </div>
    </BackgroundSection>
  );
}
