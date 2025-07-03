import IndustryBox1 from '../IndustryPage/IndustryBox1';
import IndustryBox2 from '../IndustryPage/IndustryBox2';
import IndustryBox3 from '../IndustryPage/IndustryBox3';
import IndustryBox4 from '../IndustryPage/IndustryBox4';
import IndustryBox5 from '../IndustryPage/IndustryBox5';
import IndustryBox6 from '../IndustryPage/IndustryBox6';

export default function IndustryFields({
  activeTab,
  sectionsRef,
  industryState,
  setIndustryState,
}) {
  return (
    <div className="p-4">
      <div
        style={{ display: activeTab === 'tab-industryBox1' ? 'block' : 'none' }}
      >
        <IndustryBox1
          industryBox1Fields={industryState?.industryBox1Fields}
          setIndustryBox1Fields={(updatedValue) =>
            setIndustryState((prev) => ({
              ...prev,
              industryBox1Fields: updatedValue,
            }))
          }
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-industryBox2' ? 'block' : 'none' }}
      >
        <IndustryBox2
          ref={(el) => (sectionsRef.current.industrybox2 = el)}
          industryBox2Data={industryState?.industryBox2Fields}
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-industryBox3' ? 'block' : 'none' }}
      >
        <IndustryBox3
          ref={(el) => (sectionsRef.current.industrybox3 = el)}
          industryBox3Data={industryState?.industryBox3Fields}
        />
      </div>

      <div
        style={{ display: activeTab === 'tab-industryBox4' ? 'block' : 'none' }}
      >
        <IndustryBox4
          ref={(el) => (sectionsRef.current.industrybox4 = el)}
          industryBox4Data={industryState?.industryBox4Fields}
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-industryBox5' ? 'block' : 'none' }}
      >
        <IndustryBox5
          industryBox5Fields={industryState?.industryBox5Fields}
          setIndustryBox5Fields={(updatedValue) =>
            setIndustryState((prev) => ({
              ...prev,
              industryBox5Fields: updatedValue,
            }))
          }
        />
      </div>
      <div
        style={{ display: activeTab === 'tab-industryBox6' ? 'block' : 'none' }}
      >
        <IndustryBox6
          ref={(el) => (sectionsRef.current.industrybox6 = el)}
          industryBox6Data={industryState?.industryBox6Fields}
        />
      </div>
    </div>
  );
}
