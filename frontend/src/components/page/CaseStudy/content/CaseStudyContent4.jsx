import BackgroundSection from '../../../BackgroundSection';
import { PrimaryButton } from '../../../Buttons/PrimaryButton';
import { CaseStudyHeading } from '../../../Heading/CaseStudyHeading';

export default function CaseStudyContent4({ content }) {
  return (
    <BackgroundSection>
      <div className="casestudy-section_2 px-20">
        <div className="mb-10">
          <CaseStudyHeading
            type={''}
            smallTitle={content?.title}
            title={content?.subtitle}
            subText={content?.extratext}
          />
        </div>
        {content?.inputarea && (
          <div
            className="flex flex-col justify-center items-center"
            dangerouslySetInnerHTML={{
              __html: content?.inputarea,
            }}
          />
        )}

        <div className="w-full flex items-center justify-center mx-auto">
          <div className="flex border-2 border-flamingo-500 rounded-xl gap-5 px-5 py-6 w-fit">
            <h2 className="text-white text-3xl font-semibold">
              Looking for similar solutions
            </h2>
            <PrimaryButton
              title={'Talk to Our Expert'}
              link={'/contact-us'}
              type={'button'}
            />
          </div>
        </div>
      </div>
    </BackgroundSection>
  );
}
