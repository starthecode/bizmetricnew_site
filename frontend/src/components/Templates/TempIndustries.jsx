import PageHeading from '../Heading/PageHeading';
import { Breadcrumbs } from '../Breadcrumbs';

import IndustrySection1 from '../page/IndustriesPage/IndustrySection1';
import IndustrySection2 from '../page/IndustriesPage/IndustrySection2';
import IndustrySection3 from '../page/IndustriesPage/IndustrySection3';
import IndustrySection4 from '../page/IndustriesPage/IndustrySection4';
import NewsCards from '../Cards/NewsCards';
import IndustrySection5 from '../page/IndustriesPage/IndustrySection5';

export default function TempIndustries({ data, title }) {
  let industryBox1Data = null;
  let industryBox2Data = null;
  let industryBox3Data = null;
  let industryBox4Data = null;
  let industryBox5Data = null;
  let industryBox6Data = null;

  if (data && Array.isArray(data.content)) {
    const industrySection1 = data.content.find(
      (section) => section.type === 'industrybox1'
    );
    industryBox1Data = industrySection1?.data?.[0] || null;

    const industrySection2 = data.content.find(
      (section) => section.type === 'industrybox2'
    );
    industryBox2Data = industrySection2?.data || null;

    const industrySection3 = data.content.find(
      (section) => section.type === 'industrybox3'
    );
    industryBox3Data = industrySection3?.data || null;

    const industrySection4 = data.content.find(
      (section) => section.type === 'industrybox4'
    );
    industryBox4Data = industrySection4?.data || null;

    const industrySection5 = data.content.find(
      (section) => section.type === 'industrybox5'
    );
    industryBox5Data = industrySection5?.data?.[0] || null;

    const industrySection6 = data.content.find(
      (section) => section.type === 'industrybox6'
    );
    industryBox6Data = industrySection6?.data || null;
  }

  return (
    <section className="w-full">
      <div
        className="relative h-[550px] py-0 sm:py-0 md:pt-24 lg:pt-24 xl:pt-24 overflow-hidden z-10"
        style={{
          backgroundImage: `url(${data?.metaFields?.featuredImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80 z-0" />

        <div className="container">
          <div className="w-full flex flex-col justify-center items-center mb-20">
            <div className="grid mx-auto w-full justify-start items-start mb-5 mt-14">
              <Breadcrumbs capitalizeLinks />
              <PageHeading
                type={''}
                smallTitle={title}
                title={data?.customMetaFields?.customMetaTitle}
                subText={
                  'Integrate intelligence with the organizational workflow to empower your business<br/> with semantic architecture and highly sophisticated decision-making processes.'
                }
              />
            </div>
          </div>
        </div>
      </div>
      <IndustrySection1
        aboutIndustryData1={industryBox1Data}
        aboutIndustryData2={industryBox2Data}
      />
      <IndustrySection2 aboutIndustryData3={industryBox3Data} />
      <IndustrySection3 aboutIndustryData4={industryBox4Data} />
      <IndustrySection4 aboutIndustryData5={industryBox5Data} />
      <IndustrySection5 aboutIndustryData6={industryBox6Data} />

      <section
        className="relative px-0 sm:px-0 md:px-10 lg:px-40 xl:px-40 pt-28 xl:pb-40 z-10 bg-black"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://bizsiteuploads.blob.core.windows.net/uploads/1744992778190-back-image.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {' '}
        <NewsCards />
      </section>
    </section>
  );
}
