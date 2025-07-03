import React from 'react';
import { ChildPageCards } from './ChildPageCards';
import { BoxesItems } from './BoxesItems';
import { OverviewItems } from './OverviewItems';
import { WhySection } from './WhySection';
import { ApproachSection } from './ApproachSection';
import { PageConstruction } from '@/components/PageConstruction';
import { Heading3 } from '@/components/Headings/Heading3';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

const ParentPage = ({ postData }: any) => {
  if (postData?.PageUnderConstructionStatus?.pageUnderConstruction === true) {
    return <PageConstruction />;
  }

  return (
    <section className="container mt-40">
      <div className="w-full text-center flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="flex justify-start mb-5 mt-10">
          <Breadcrumbs capitalizeLinks />

          </div>
          <div className="w-full flex justify-start items-center text-left">
            <div className="w-[700px]">
              <Heading3
                align={'left'}
                small={'Services'}
                main={postData?.title}
                specialTitle={''}
                classes={'font-inter'}
                desc={postData?.excerpt}
              />{' '}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        {' '}
        <BoxesItems BoxItem={postData?.ServicesAcfFields?.boxesItemsX3} />
      </div>
      <OverviewItems
        title1={postData?.ServicesAcfFields?.serviceTitle2}
        title2={postData?.ServicesAcfFields?.serviceSmallTitle2}
        OvItems={postData?.ServicesAcfFields?.overviewSection}
      />

      <WhySection
        WyItemsImg={postData?.ServicesAcfFields?.fourthSectionImage}
        WyItemsSmallTitle={postData?.ServicesAcfFields?.fourthSectionSmallTitle}
        WyItemsMainTitle={postData?.ServicesAcfFields?.fourthSectionMainTitle}
        WyItemsSpecialTitle={
          postData?.ServicesAcfFields?.fourthSectionSpecialTitle
        }
        WyItemsDesc={postData?.ServicesAcfFields?.fourthSectionDesc}
        WyItemsList={postData?.ServicesAcfFields?.fourthSectionList}
      />

      <ApproachSection
        ApproachSmallTitle={postData?.ServicesAcfFields?.fifthSectionSmallTitle}
        ApproachMainTitle={postData?.ServicesAcfFields?.fifthSectionMainTitle}
        ApproachList={postData?.ServicesAcfFields?.fifthSectionListItems}
      />

      {postData?.children && <ChildPageCards childData={postData?.children} />}
    </section>
  );
};

export default ParentPage;
