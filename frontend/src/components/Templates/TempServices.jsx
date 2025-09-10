import { BoxesItems } from '../page/ServicesPage/BoxesItems';
import { OverviewVerticles } from '../OverviewVerticles';
import WhyBizmetricBox from '../WhyBizmetricBox';
import ApproachBox from '../ApproachBox';
import SubServicesComp from '../DashComponents/SubServicesComp';
import NewsCards from '../Cards/NewsCards';
import IndustryAccordions from '../DashComponents/IndustryAccordions';
import BackgroundSection from '../BackgroundSection';

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
      <WhyBizmetricBox
        whyboxData={
          data?.content?.find((c) => c.type === 'fiveinputs')?.data[0] || ''
        }
      />
      <SubServicesComp
        otherservicesData={
          data?.content?.find((c) => c.type === 'otherservices')?.data || ''
        }
      />
      <ApproachBox
        approachData={
          data?.content?.find((c) => c.type === 'threeboxes3')?.data || ''
        }
      />
      <BackgroundSection>
        <NewsCards />
      </BackgroundSection>
    </>
  );
}
