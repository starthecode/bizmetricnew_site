import { CaseStudyHeading } from '../../../Heading/CaseStudyHeading';

export default function CaseStudyContent1({ content }) {
  return (
    <div className="container">
      <div
        className="flex flex-col justify-center items-center mt-20 mb-20"
        dangerouslySetInnerHTML={{
          __html: content?.inputarea,
        }}
      />
      <div className="px-20">
        <CaseStudyHeading
          type={'dark'}
          smallTitle={content?.title}
          title={content?.subtitle}
          subText={content?.extratext}
        />
      </div>
    </div>
  );
}
