import BackgroundSection from '../BackgroundSection';
import CaseStudySection from '../extras/CaseStudySection';
import MarqueeBanner from '../MarqueeBanner';
import AccordionSection from '../page/AboutUsPage/AccordionSection';
import Leaders from '../page/AboutUsPage/Leaders';
import OurValue from '../page/AboutUsPage/OurValue';
import TestimonialCard from '../page/AboutUsPage/TestimonialCard';
import TimelineSlider from '../page/AboutUsPage/TimelineSlider';
import CaseStudyCard from '../page/CaseStudy/CaseStudyCard';
import CompanyLocations from '../page/ContactUs/CompanyLocations';
import ConnectSection from '../page/ContactUs/ConnectSection';
import ContactusForm from '../Forms/ContactusForm';

export default function TempContactus({ data, type }) {
  return (
    <section className="container">
      <div className="grid grid-cols-2">
        <div>
          <ContactusForm pageSource={type} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <ConnectSection />
        </div>
      </div>

      <div>
        <CompanyLocations />
      </div>
    </section>
  );
}
