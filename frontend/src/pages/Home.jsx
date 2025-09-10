import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AnimatedSlider from '../components/Hero/AnimatedSlider';
import PartnersLogo from '../components/Partners_Logo';
import AboutUs from '../components/AboutUs';
import '../styles/HomePage.css';
import Industry from '../components/Industry';
import Choose from '../components/Choose';
import BlogsCard from '../components/BlogsCard';
import Testimonials from '../components/Testimonials';
import FooterCta from '../components/FooterCta';
import MultiSection from '../components/MultiSection';
import { Poll } from '../components/Poll/Poll';
import SeoComp from '../components/SeoComp';
import { ServiceCards } from '../components/ServiceCards';
import NumericLoader from '../components/Loader/NumericLoader';

const COMPONENTS = {
  slider: AnimatedSlider,
  partnerslogo: PartnersLogo,
  aboutus: AboutUs,
  services: ServiceCards,
  industry: Industry,
  whychoose: Choose,
  blog: BlogsCard,
  testimonials: Testimonials,
  footercta: FooterCta,
};

function fetchPage(slug) {
  return fetch(`/api/page/getpage/${slug}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json();
  });
}

export default function Home() {
  const location = useLocation();
  const slug =
    location.pathname === '/' ? 'home' : location.pathname.replace('/', '');

  // React Query fetch
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['pageData', slug],
    queryFn: () => fetchPage(slug),
    staleTime: 1 * 60 * 1000, // cache, adjust as needed!
    refetchOnWindowFocus: true, // fresh on tab focus
    keepPreviousData: true, // smooth transitions
  });
  if (isLoading || isFetching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-royalBlue-950/80 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-royalBlue-950/80 origin-top animate-slide-up" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-royalBlue-950/80 origin-bottom animate-slide-down" />
        <div className="z-10 text-junglegreen-600 text-5xl font-semibold animate-fade-in">
          <NumericLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error.message || 'Error loading content.'}
        <button onClick={() => refetch()}>Try Again</button>
      </div>
    );
  }

  // Process sections as before
  const sections = {};
  for (const section of data?.content || []) {
    sections[section.type] = section.data || [];
  }
  const seoData = data?.seo || {};

  return (
    <div id="home">
      <SeoComp
        seoTitle={seoData?.seoTitle}
        description={seoData?.seoDescription}
        keywords={seoData?.focusKeyphrase}
        image={seoData?.image}
        url={`https://yourdomain.com/blog/${seoData?.slug}`}
      />
      <Poll />
      <div className="h-full" style={{ display: 'inherit' }}>
        {sections.slider && (
          <AnimatedSlider
            data={sections.slider}
            mrqData={sections?.threeboxes}
          />
        )}
        <MultiSection sections={sections} />
        {sections.whychoose && <Choose data={sections.whychoose} />}
        {sections.blog && sections.testimonials && (
          <BlogsCard
            blogData={sections.blog}
            testimonialsData={sections.testimonials}
          />
        )}
      </div>
    </div>
  );
}
