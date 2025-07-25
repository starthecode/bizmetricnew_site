import { BoxesItems } from '../page/ServicesPage/BoxesItems';
import { OverviewVerticles } from '../OverviewVerticles';
import WhyBizmetricBox from '../WhyBizmetricBox';
import ApproachBox from '../ApproachBox';
import SubServicesComp from '../DashComponents/SubServicesComp';
import NewsCards from '../Cards/NewsCards';
import IndustryAccordions from '../DashComponents/IndustryAccordions';

export default function TempServices({ data }) {
  return (
    <>
      <BoxesItems
        data={data?.content?.find((c) => c.type === 'threeboxes')?.data || ''}
      />

      <OverviewVerticles
        overviewData={
          data?.content?.find((c) => c.type === 'fiveboxes')?.data || ''
        }
      />
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
    </>
  );
}
