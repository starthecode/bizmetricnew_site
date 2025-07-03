import { HiGift, HiLightBulb, HiUser } from 'react-icons/hi';
import CareerSlider from '../components/extras/CareerSlider';
import { RiFileZipFill } from 'react-icons/ri';
import { SecondaryButton } from '../components/Buttons/SecondaryButton';
import WorkCulture from '../components/page/Careers/WorkCulture';
import JobLocations from '../components/page/Careers/JobLocations';
import JobCategory from '../components/page/Careers/JobCategory';
import CurrentOpenings from '../components/page/Careers/CurrentOpenings';
import BenefitsGrid from '../components/page/Careers/BenefitsGrid';
import PagePostHero from '../components/HeroSection/PagePostHero';

const benefits = [
  {
    Icon: HiLightBulb,
    title: 'Creative freedom',
    description:
      'Experience the power of our specific tools, which are tailored to your needs.',
  },
  {
    Icon: HiUser,
    title: 'Remote work options',
    description:
      'Real examples provide you with valuable insights to optimize use of our platform.',
  },
  {
    Icon: HiGift,
    title: 'Employee benefits',
    description:
      'Information designed to help you navigate the complex data problems.',
  },
  {
    Icon: RiFileZipFill,
    title: 'Innovation-driven culture',
    description:
      "Provides you with access to experts and pro's knowledge in your community.",
  },
];

export default function Careers() {
  //   const params = { slug: ['careers'] };

  // const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  // const { res } = await fetch(apiDomain + 'wp-json/wp/v2/jobs-by-category', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   next: { revalidate: 10 },
  // }).then((res) => res.json());

  //   const { data } = await fetchGraphQL(CareersQuery, params);
  //   const jobs = await fetchGraphQL(AllJobsQuery, params);

  return (
    <section className="">
      <PagePostHero
        bannerImg={
          'https://bizsiteuploads.blob.core.windows.net/uploads/1750739948852-success-stories-banner-635435.webp'
        }
        smallTitle="Careers"
        title={'Join Bizmetric!'}
        excerpts={'Let your career unlock an outstanding corporate journey'}
        customMetaLinkText={'Seaarch Job'}
        customMetaLink={'/#searchjob'}
        customMetaLinkTwoText={'Contact Us'}
        customMetaLinkTwo={'/'}
      />
      <CareerSlider />
      <div className="grid grid-cols-2 container gap-10">
        <div className="bg-slate-50 rounded-xl p-12 text-left flex flex-col items-start justify-start w-full">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            How we stand out in world
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover opportunities to grow, innovate, and make an impact with
            brilliant minds who share your passion for excellence.
          </p>
          <SecondaryButton title={'Send Your CV'} link={'/'} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <benefit.Icon className="w-6 h-6 text-junglegreen-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WorkCulture />
      <JobLocations />
      <JobCategory />
      <CurrentOpenings />
      <BenefitsGrid />
    </section>
  );
}
