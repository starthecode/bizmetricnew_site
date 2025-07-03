import { useState } from 'react';
import BackgroundSection from '../../BackgroundSection';

const accordionData = [
  {
    title: 'Pioneers in Data Transformation',
    content: (
      <div className="grid md:grid-cols-2 gap-8 pt-6">
        <div>
          <h3 className="text-sm text-orange-400 font-semibold uppercase mb-2">
            Explore Bizmetric
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            We are the Leaders in Data Transformation
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Our prowess in diagnosing & manipulating data has helped our clients
            reach goals that once seemed unapproachable. Data is not just a part
            of information, but an asset when utilized effectively...
          </p>
        </div>
        <div>
          <iframe
            className="w-full aspect-video rounded-md"
            src="https://www.youtube.com/embed/your_video_id"
            title="Bizmetric Portfolio"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ),
  },
  {
    title: 'Experts in Scalable Cloud Solutions',
    content: (
      <p className="text-gray-300 pt-4">
        Details about scalable cloud solutions...
      </p>
    ),
  },
  {
    title: 'Transforming Insights into Impact with BI & Analytics',
    content: (
      <p className="text-gray-300 pt-4">Details about BI & Analytics...</p>
    ),
  },
];

export default function AccordionSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <BackgroundSection>
      <div className="max-w-6xl mx-auto">
        {accordionData.map((item, index) => (
          <div key={index} className="border-t border-gray-700 py-4">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left flex justify-between items-center text-lg font-medium focus:outline-none"
            >
              <span className="text-white">{item.title}</span>
              <span className="text-orange-400 text-2xl">
                {activeIndex === index ? '−' : '+'}
              </span>
            </button>
            {activeIndex === index && (
              <div className="mt-4 transition-all duration-300 ease-in-out">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </BackgroundSection>
  );
}
