import BackgroundSection from '../BackgroundSection';
import CaseStudySection from '../extras/CaseStudySection';
import MarqueeBanner from '../MarqueeBanner';
import AccordionSection from '../page/AboutUsPage/AccordionSection';
import Leaders from '../page/AboutUsPage/Leaders';
import OurValue from '../page/AboutUsPage/OurValue';
import TestimonialCard from '../page/AboutUsPage/TestimonialCard';
import TimelineSlider from '../page/AboutUsPage/TimelineSlider';

export default function TempAboutus({ data, type }) {
  return (
    <div>
      <MarqueeBanner
        data={data?.content?.find((c) => c.type === 'partnerslogo')?.data || ''}
        type={type}
      />
      <OurValue
        data={data?.content?.find((c) => c.type === 'threeboxes')?.data || ''}
      />
      <AccordionSection />
      <Leaders
        data={data?.content?.find((c) => c.type === 'fiveboxes')?.data || ''}
      />
      <BackgroundSection>
        <TestimonialCard
          data={data?.content?.find((c) => c.type === 'fiveboxes2')?.data || ''}
        />
        <TimelineSlider />
      </BackgroundSection>
      <CaseStudySection />
    </div>
  );
}
