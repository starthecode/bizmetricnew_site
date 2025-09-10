import ThreeBoxes from '../ServicesPage/ThreeBoxes';
import ApproachComp from '../ServicesPage/ApproachComp';
import OtherServicesComp from '../ServicesPage/OtherServicesComp';
import FiveBoxes from '../ServicesPage/FiveBoxes';
import FiveInputs from '../ServicesPage/FiveInputs';

export default function ServicesFields({
  activeTab,
  sectionsRef,
  servicesFields,
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
        <FiveBoxes
          ref={(el) => (sectionsRef.current.FiveBoxes = el)}
          fiveBoxesData={servicesFields?.fiveBoxesData}
        />
      </div>

      <div
        style={{ display: activeTab === 'tab-servicesBox3' ? 'block' : 'none' }}
      >
        <FiveInputs
          ref={(el) => (sectionsRef.current.fiveinputs = el)}
          fiveinputsData={servicesFields.fiveinputsData || []} // Add fallback
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-servicesBox4' ? 'block' : 'none' }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes3 = el)}
          threeBoxesData={servicesFields?.threeBoxesData3}
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
