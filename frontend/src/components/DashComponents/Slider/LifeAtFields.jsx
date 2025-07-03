import GalleryBoxes from '../ServicesPage/GalleryBoxes';
import ThreeBoxes from '../ServicesPage/ThreeBoxes';

export default function LifeAtFields({
  activeTab,
  sectionsRef,
  lifeatState,
  setLifeatState,
}) {
  return (
    <div className="p-4">
      {/* Section 1 */}
      <div
        style={{
          display: activeTab === 'tab-lifeatbizBox1' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes = el)}
          threeBoxesData={lifeatState?.threeBoxesData}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-lifeatbizBox2' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes2 = el)}
          threeBoxesData={lifeatState?.threeBoxesData2}
        />
      </div>
      <div
        style={{
          display: activeTab === 'tab-lifeatbizBox3' ? 'block' : 'none',
        }}
      >
        <GalleryBoxes
          ref={(el) => (sectionsRef.current.GalleryBoxes = el)}
          galleryBoxesData={lifeatState?.galleryBoxesData}
        />
      </div>
      <div
        style={{
          display: activeTab === 'tab-lifeatbizBox4' ? 'block' : 'none',
        }}
      >
        <ThreeBoxes
          ref={(el) => (sectionsRef.current.ThreeBoxes3 = el)}
          threeBoxesData={lifeatState?.threeBoxesData3}
        />
      </div>
    </div>
  );
}
