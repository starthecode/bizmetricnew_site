import PageHeading from '../Heading/PageHeading';
import { Breadcrumbs } from '../Breadcrumbs';
import { BoxesItems } from '../page/ServicesPage/BoxesItems';
import { OverviewVerticles } from '../OverviewVerticles';
import WhyBizmetricBox from '../WhyBizmetricBox';
import ApproachBox from '../ApproachBox';
import SubServicesComp from '../DashComponents/SubServicesComp';
import NewsCards from '../Cards/NewsCards';
import { Heading } from '../Heading/Heading';
import IndustryAccordions from '../DashComponents/IndustryAccordions';

export default function TempServices({ data, title }) {
  return (
    <>
      <section className="">
        <div
          className="relative h-[550px] py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-24 overflow-hidden z-10"
          style={{
            backgroundImage: `url(${data?.metaFields?.featuredImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/80 z-0" />

          <div className="container">
            <div className="w-full flex flex-col justify-center items-center mb-20">
              <div className="grid mx-auto w-full justify-start items-start mb-5 mt-14">
                <Breadcrumbs capitalizeLinks />
                <PageHeading
                  type={''}
                  smallTitle={title}
                  title={'Empower Workflows With <br/>Artificial Intelligence'}
                  subText={
                    'Integrate intelligence with the organizational workflow to empower your business<br/> with semantic architecture and highly sophisticated decision-making processes.'
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <BoxesItems
          data={
            data?.content?.find((c) => c.type === 'threeboxes')?.data || ''
          }
        />
        <section
          className="relative pt-24 sm:pt-24 md:pt-24 lg:py-24 z-10"
          style={{
            backgroundImage: `url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="h-full max-w-full px-0 sm:px-0 md:px-40 lg:px-40 xl:px-40">
            <div className="flex text-center justify-center">
              <Heading
                type=""
                smallTitle={'Overview'}
                title={'Ways Business can Benefit with Artificial Intelligence'}
              />
            </div>
            <OverviewVerticles overviewData={data?.content?.[1]?.data} />
          </div>
        </section>
        <IndustryAccordions />
        <WhyBizmetricBox whyboxData={data?.content?.[2]?.data} />
        <SubServicesComp otherservicesData={data?.content?.[4]?.data} />
        <ApproachBox whyboxData={data?.content?.[3]?.data} />
        <section
          className="relative pt-28 xl:pb-40 z-10 bg-black"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <NewsCards />
        </section>
      </section>
    </>
  );
}
