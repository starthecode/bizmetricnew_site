import React from 'react';
import CaseStudyCard from '../page/CaseStudy/CaseStudyCard';
import { Heading } from '../Heading/Heading';

const caseStudies = [
  {
    category: 'AWS',
    title: 'Advanced Analytics (AWS)',
    description:
      'About the Domain Our Client is a Web Domain Service Provider...',
    image: '/placeholder-aws.jpg',
    categoryColor: 'bg-orange-100 text-orange-800',
  },
  {
    category: 'DATA ANALYTICS',
    title: 'Spotfire to Power BI Migration',
    description: 'Core study: Spotfire to Power BI Migration Domain -Oil &...',
    image: '/placeholder-analytics.jpg',
    categoryColor: 'bg-blue-100 text-blue-800',
  },
  {
    category: 'AI-ML-OPS',
    title: 'ChatGPT Solutions',
    description: 'Welcome to our in-depth case study on ChatGPT solutions...',
    image: '/placeholder-ai.jpg',
    categoryColor: 'bg-green-100 text-green-800',
  },
];

export default function CaseStudySection() {
  return (
    <div className="container py-24">
      <div className='mb-16'>
        <Heading
          type={'dark'}
          smallTitle={'Recent Case Studies'}
          title={'Our Latest Case Studies'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {caseStudies.map((study, index) => (
          <CaseStudyCard
            key={index}
            category={study.category}
            title={study.title}
            description={study.description}
            image={study.image}
            categoryColor={study.categoryColor}
          />
        ))}
      </div>
    </div>
  );
}
