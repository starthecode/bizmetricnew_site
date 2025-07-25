import React from 'react';
import TestimonialsComp from './TestimonialsComp';
import BlogComp from './BlogComp';
import WhychooseComp from './WhychooseComp';
import IndustryComp from './IndustryComp';
import ServicesComp from './ServicesComp';
import AboutComp from './AboutComp';
import PartnerComp from './PartnerComp';
import SliderForm from './SliderComp';
import ThreeBoxes from '../ServicesPage/ThreeBoxes';
import FiveBoxes from '../ServicesPage/FiveBoxes';

export default function HomeFields({
  activeTab,
  sectionsRef,
  homepageFields,
  setHomepageFields,
}) {
  return (
    <div className="p-4">
      <div style={{ display: activeTab === 'tab-homeBox1' ? 'block' : 'none' }}>
        <SliderForm
          ref={(el) => (sectionsRef.current.slider = el)}
          slidersData={homepageFields?.slidersData}
        />
      </div>

      <div style={{ display: activeTab === 'tab-homeBox2' ? 'block' : 'none' }}>
        <PartnerComp
          ref={(el) => (sectionsRef.current.partnersLogo = el)}
          partnersLogoData={homepageFields?.partnersLogoData}
        />
      </div>

      <div style={{ display: activeTab === 'tab-homeBox3' ? 'block' : 'none' }}>
        <AboutComp
          aboutFields={homepageFields?.aboutFields}
          setAboutFields={setHomepageFields?.setAboutFields}
        />
      </div>
      <div style={{ display: activeTab === 'tab-homeBox4' ? 'block' : 'none' }}>
        <FiveBoxes
          ref={(el) => (sectionsRef.current.FiveBoxes = el)}
          fiveBoxesData={homepageFields?.fiveBoxesData}
        />
      </div>
      <div style={{ display: activeTab === 'tab-homeBox5' ? 'block' : 'none' }}>
        <IndustryComp
          ref={(el) => (sectionsRef.current.industry = el)}
          industryData={homepageFields?.industryData}
          industryTitle={homepageFields?.industryTitle}
          setIndustryTitle={setHomepageFields?.setIndustryTitle}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-homeBox6' ? 'block' : 'none',
        }}
      >
        <WhychooseComp
          ref={(el) => (sectionsRef.current.whychoose = el)}
          whychooseData={homepageFields?.whychooseData}
          whychooseTitle={homepageFields?.whychooseTitle}
          setWhychooseTitle={setHomepageFields?.setWhychooseTitle}
        />
      </div>

      <div style={{ display: activeTab === 'tab-homeBox7' ? 'block' : 'none' }}>
        <BlogComp
          blogTitle={homepageFields?.blogTitle}
          setBlogTitle={setHomepageFields?.setBlogTitle}
        />
      </div>

      <div
        style={{
          display: activeTab === 'tab-homeBox8' ? 'block' : 'none',
        }}
      >
        <TestimonialsComp
          ref={(el) => (sectionsRef.current.testimonials = el)}
          testimonialsData={homepageFields?.testimonialsData}
          testimonialsTitle={homepageFields?.testimonialsTitle}
          setTestimonialsTitle={setHomepageFields?.setTestimonialsTitle}
        />
      </div>
    </div>
  );
}
