import ThreeBoxes from '../ServicesPage/ThreeBoxes';

export default function SolutionsFields({
  activeTab,
  sectionsRef,
  solutionsFields,
  setSolutionsFields,
}) {
  return (
    <div className="p-4">
      {/* Section 1 */}
      <div
        style={{
          display: activeTab === 'tab-solutionBox1' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes = el)}
          threeBoxesData={solutionsFields?.threeBoxesData}
        />
      </div>

      {/* Section 2 */}
      <div
        style={{ display: activeTab === 'tab-solutionBox2' ? 'block' : 'none' }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes2 = el)}
          threeBoxesData={solutionsFields?.threeBoxesData2}
        />
      </div>

      {/* Section 3 */}
      <div
        style={{ display: activeTab === 'tab-solutionBox3' ? 'block' : 'none' }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes3 = el)}
          threeBoxesData={solutionsFields?.threeBoxesData3}
        />
      </div>
      {/* Section 4 */}
      <div
        style={{ display: activeTab === 'tab-solutionBox4' ? 'block' : 'none' }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes4 = el)}
          threeBoxesData={solutionsFields?.threeBoxesData4}
        />
      </div>
    </div>
  );
}
