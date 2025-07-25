import PartnersLogo from './Partners_Logo';
import AboutUs from './AboutUs';
import SvgLine1 from './lines/SvgLine1';

import { OverviewVerticles } from './OverviewVerticles';
import IndustryAccordions from './DashComponents/IndustryAccordions';
import { SVGLine4 } from './lines';

const MultiSection = ({ sections }) => {
  return (
    <>
      <section className="container mt-10">
        <div className="h-full flex flex-col w-full justify-center items-center relative overflow-hidden">
          {sections.partnerslogo && (
            <PartnersLogo data={sections.partnerslogo} />
          )}
          <div className="absolute top-0 left-0">
            <SvgLine1 />
          </div>
          {sections.aboutus && <AboutUs data={sections.aboutus} />}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <OverviewVerticles overviewData={sections?.fiveboxes || ''} />
        <IndustryAccordions />
      </section>
    </>
  );
};

export default MultiSection;
