import React from 'react';
import { Heading } from '../../Heading/Heading';

const benefits = [
  {
    title: 'FLEXIBLE WORKING',
    description:
      'We don’t mind if you come a few minutes late. Your overall performance matters the most. Flexibility and productivity are companions.',
    gradient: 'linear-gradient(180deg, #6495ED 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
  {
    title: 'CREDIT WORTHINESS',
    description:
      'We appreciate talent, so, to help keep the motivation levels high, we organize frequent appreciation and award distribution events.',
    gradient: 'linear-gradient(180deg, #00A88B 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
  {
    title: 'WORK FROM HOME',
    description:
      'Jump on your bean bag and get to work. We do value your comfort and let you work from home. We simplify things by being easy.',
    gradient: 'linear-gradient(180deg, #F2682A 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
  {
    title: 'TRAININGS AND MEET-UPS',
    description:
      'Open your notebook or notepad. Join our rigorous training sessions to learn various technologies and update your skills frequently.',
    gradient: 'linear-gradient(180deg, #F2682A 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
  {
    title: 'COURSES & CERTIFICATIONS',
    description:
      'We reimburse course fees upon successful passing of the certification examination. This way, you can leverage your skill set for a better tomorrow.',
    gradient: 'linear-gradient(180deg, #00A88B 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
  {
    title: 'MEDICAL BENEFITS',
    description:
      'Health is always our first and foremost priority. We cover medical benefits for our employees and ensure the treatment to be burden-free.',
    gradient: 'linear-gradient(180deg, #00A88B 0%, rgba(32, 32, 32, 0.9) 100%)',
  },
];

const BenefitsGrid = () => {
  return (
    <section>
      <div className='flex flex-col w-full justify-center items-center mt-20'>
        <Heading
        classes={'items-center'}
          type={'dark'}
          smallTitle={'Benefits'}
          title={'Our Perks & Benefits'}
        />
      </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="rounded-lg p-16 shadow-md text-white relative overflow-hidden h-full"
            style={{
              background: benefit.gradient,
            }}
          >
            <div className="absolute top-6 left-6 w-28 h-28 rounded-full border-8 border-white opacity-20"></div>
            <h2 className="text-xl font-bold mb-2 uppercase relative z-10">
              {benefit.title}
            </h2>
            <p className="text-sm relative z-10">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsGrid;
