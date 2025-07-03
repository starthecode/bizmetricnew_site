import CaseStudyContent1 from './CaseStudyContent1';
import CaseStudyContent2 from './CaseStudyContent2';
import CaseStudyContent3 from './CaseStudyContent3';
import CaseStudiesGrid from './CaseStudiesGrid';
import CaseStudyContent4 from './CaseStudyContent4';

export default function CaseStudyContent({ data }) {
  console.log('data', data);

  return (
    <>
      <CaseStudyContent1
        content={data?.content.find((c) => c.type === 'inputboxes').data || []}
      />
      <CaseStudyContent2
        content={data?.content.find((c) => c.type === 'inputboxes2').data || []}
      />
      <CaseStudyContent3
        content={data?.content.find((c) => c.type === 'inputboxes3').data || []}
      />
      <CaseStudiesGrid
        content={
          data?.content.find((c) => c.type === 'threeboxes').data?.items || []
        }
      />
      <CaseStudyContent4
        content={data?.content.find((c) => c.type === 'inputboxes4').data || []}
      />
    </>
  );
}
