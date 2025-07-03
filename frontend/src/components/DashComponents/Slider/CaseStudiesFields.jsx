import InputBoxes from '../../Form_Fields/InputBoxes';
import ThreeBoxes from '../ServicesPage/ThreeBoxes';

export default function CaseStudiesFields({
  activeTab,
  sectionsRef,
  casestudiesFields,
}) {
  return (
    <div className="p-4">
      {/* Section 1 */}
      <div
        style={{
          display: activeTab === 'tab-casestudiesBox1' ? 'block' : 'none',
        }}
      >
        <InputBoxes
          ref={(el) => (sectionsRef.current.InputBoxes = el)}
          inputBoxesData={casestudiesFields?.inputBoxesData}
        />
      </div>

      {/* Section 2 */}
      <div
        style={{
          display: activeTab === 'tab-casestudiesBox2' ? 'block' : 'none',
        }}
      >
        <InputBoxes
          ref={(el) => (sectionsRef.current.InputBoxes2 = el)}
          inputBoxesData={casestudiesFields?.inputBoxesData2}
        />
      </div>

      {/* Section 3 */}
      <div
        style={{
          display: activeTab === 'tab-casestudiesBox3' ? 'block' : 'none',
        }}
      >
        <InputBoxes
          ref={(el) => (sectionsRef.current.InputBoxes3 = el)}
          inputBoxesData={casestudiesFields?.inputBoxesData3}
        />
      </div>
      {/* Section 4 */}
      <div
        style={{
          display: activeTab === 'tab-casestudiesBox4' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes = el)}
          threeBoxesData={casestudiesFields?.threeBoxesData}
        />
      </div>

      {/* Section 5 */}
      <div
        style={{
          display: activeTab === 'tab-casestudiesBox5' ? 'block' : 'none',
        }}
      >
        <InputBoxes
          ref={(el) => (sectionsRef.current.InputBoxes4 = el)}
          inputBoxesData={casestudiesFields?.inputBoxesData4}
        />
      </div>
    </div>
  );
}
