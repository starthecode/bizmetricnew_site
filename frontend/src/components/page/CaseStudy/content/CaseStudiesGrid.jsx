import { CaseStudyHeading } from '../../../Heading/CaseStudyHeading';

export default function CaseStudiesGrid({ content }) {
  return (
    <>
      <div className="casestudy-section_2 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            AI-Powered Automation Solutions
          </h2> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {content.map((feature, index) => (
              <div
                key={index}
                className="bg-white flex gap-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 px-5 py-5"
              >
                <div>
                  <img
                    src={feature.threeboxesinput1}
                    alt={feature.threeboxesinput2}
                    className="rounded-xl w-full h-full object-cover mb-5"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-junglegreen-600 mb-2">
                    {feature.threeboxesinput2}
                  </h3>
                  <p
                    className="text-sm text-gray-600 leading-tight"
                    dangerouslySetInnerHTML={{
                      __html: feature.threeboxesinput3,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
