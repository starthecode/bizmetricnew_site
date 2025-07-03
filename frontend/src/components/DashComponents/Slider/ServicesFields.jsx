import ThreeBoxes from '../ServicesPage/ThreeBoxes';
import OverviewBoxes from '../ServicesPage/OverviewBoxes';
import WhyBizmetricComp from '../ServicesPage/WhyBizmetricComp';
import ApproachComp from '../ServicesPage/ApproachComp';
import OtherServicesComp from '../ServicesPage/OtherServicesComp';

export default function ServicesFields({
  activeTab,
  sectionsRef,
  servicesFields,
  setServicesFields,
}) {
  return (
    <div className="p-4">
      <div
        style={{ display: activeTab === 'tab-servicesBox1' ? 'block' : 'none' }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes = el)}
          threeBoxesData={servicesFields?.threeBoxesData}
        />
      </div>

      <div
        style={{ display: activeTab === 'tab-servicesBox2' ? 'block' : 'none' }}
      >
        <OverviewBoxes
          ref={(el) => (sectionsRef.current.OverviewBoxes = el)}
          overviewBoxesData={servicesFields?.overviewBoxesData}
        />
      </div>

      <div
        style={{ display: activeTab === 'tab-servicesBox3' ? 'block' : 'none' }}
      >
        <WhyBizmetricComp
          whyboxFields={servicesFields.whyboxFields}
          setWhyBoxFields={(updatedValue) =>
            setServicesFields((prev) => ({
              ...prev,
              whyboxFields: updatedValue,
            }))
          }
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-servicesBox4' ? 'block' : 'none' }}
      >
        <ApproachComp
          ref={(el) => (sectionsRef.current.approach = el)}
          approachData={servicesFields?.approachData}
        />
      </div>

      <div
        style={{ display: activeTab === 'tab-servicesBox5' ? 'block' : 'none' }}
      >
        <OtherServicesComp
          ref={(el) => (sectionsRef.current.otherservices = el)}
          otherservicesData={servicesFields?.otherservicesData}
        />
      </div>
    </div>
  );
}
