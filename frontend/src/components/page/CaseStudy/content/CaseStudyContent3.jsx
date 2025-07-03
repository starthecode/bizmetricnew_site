import BackgroundSection from '../../../BackgroundSection';
import { CaseStudyHeading } from '../../../Heading/CaseStudyHeading';

export default function CaseStudyContent3({ content }) {
  return (
    <>
      <div className="casestudy-section_2 mt-20">
        <div className="px-20">
          <CaseStudyHeading
            type={'dark'}
            smallTitle={content?.title}
            title={content?.subtitle}
            subText={content?.extratext}
          />
        </div>
        <div
          className="flex flex-col justify-center items-center mt-20 mb-20"
          dangerouslySetInnerHTML={{
            __html: content?.inputarea,
          }}
        />
      </div>
    </>
  );
}
