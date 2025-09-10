import ThreeBoxes from '../ServicesPage/ThreeBoxes';
import OverviewBoxes from '../ServicesPage/OverviewBoxes';
import WhyBizmetricComp from '../ServicesPage/FiveInputs';
import ApproachComp from '../ServicesPage/ApproachComp';
import OtherServicesComp from '../ServicesPage/OtherServicesComp';
import PartnerComp from './PartnerComp';
import FiveBoxes from '../ServicesPage/FiveBoxes';

export default function AboutUsFields({
  activeTab,
  sectionsRef,
  aboutusState,
}) {
  console.log('activeTab', activeTab);

  return (
    <div className="p-4">
      <div
        style={{ display: activeTab === 'tab-aboutusBox1' ? 'block' : 'none' }}
      >
        <PartnerComp
          ref={(el) => (sectionsRef.current.partnersLogo = el)}
          partnersLogoData={aboutusState?.partnersLogoData}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-aboutusBox2' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes = el)}
          threeBoxesData={aboutusState?.threeBoxesData}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-aboutusBox4' ? 'block' : 'none',
        }}
      >
        <FiveBoxes
          ref={(el) => (sectionsRef.current.FiveBoxes = el)}
          fiveBoxesData={aboutusState?.fiveBoxesData}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-aboutusBox5' ? 'block' : 'none',
        }}
      >
        <FiveBoxes
          ref={(el) => (sectionsRef.current.FiveBoxes2 = el)}
          fiveBoxesData={aboutusState?.fiveBoxesData2}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-aboutusBox6' ? 'block' : 'none',
        }}
      >
        <FiveBoxes
          ref={(el) => (sectionsRef.current.FiveBoxes3 = el)}
          fiveBoxesData={aboutusState?.fiveBoxesData3}
        />
      </div>
    </div>
  );
}
