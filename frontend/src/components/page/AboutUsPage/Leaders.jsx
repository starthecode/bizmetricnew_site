import React from 'react';
import { Heading } from '../../Heading/Heading';
import LeadersProfileCard from './LeadersProfileCard';

export default function Leaders({ data }) {
  const items1 = data?.items?.slice(0, 2);
  const items2 = data?.items?.slice(2, 15);

  return (
    <section className="container py-20">
      <div className="grid grid-cols-2">
        <div>
          <Heading
            type={'dark'}
            smallTitle={data?.title}
            title={data?.subtitle}
            subText={data?.extratext}
          />
        </div>
        <div>
          <LeadersProfileCard items={items1} />
        </div>
      </div>

      <div className="flex flex-col mt-32">
        <div>
          <Heading
            type={'dark'}
            smallTitle={'Meet Our Leadership'}
            title={'Leading with Purpose and Passion'}
            subText={data?.extratext}
          />
        </div>
        <div className="mt-10">
          <LeadersProfileCard items={items2} />
        </div>
      </div>
    </section>
  );
}
