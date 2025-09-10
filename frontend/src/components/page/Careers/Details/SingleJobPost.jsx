import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../../Buttons/PrimaryButton';
import { JobSidebar } from './JobSidebar';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import PagePostHero from '../../../HeroSection/PagePostHero';
import NotFound from '../../../../NotFound';
import NumericLoader from '../../../Loader/NumericLoader';

export const SingleJobPost = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [moreContent, setMoreContent] = useState([]);

  const [pageHeaderData, setPageHeaderData] = useState({
    smalltitle: '',
    title: '',
    excerpts: '',
    bannerImg: '',
  });

  const [jobSidebarData, setJobSidebarData] = useState({
    employeeType: '',
    date: '',
    jobType: '',
    location: '',
    experience: '',
  });

  const [notFound, setNotFound] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: -100, opacity: 0 });
    }
  }, [inView, controls]);

  const startTime = Date.now();

  useEffect(() => {
    if (!slug) return;

    const fetchPage = async () => {
      setLoading(true);
      setData(null);
      setNotFound(false);

      try {
        const res = await fetch(`/api/careers/singleCareers/${slug}`, {
          method: 'GET',
          // cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok || !json?.careers?.title) {
          setNotFound(true);
          return;
        }

        setData(json?.careers);

        setMoreContent(json.moreCareers || []);

        setPageHeaderData({
          smalltitle: 'Careers',
          title: json?.careers?.title || '',
          excerpts: json?.careers?.excerpts || '',
          bannerImg: json?.careers?.metaFields?.featuredImage || '',
        });

        setJobSidebarData({
          employeeType: json?.careers?.extraInputFields?.inputfield1,
          date: json?.careers?.publishDate,
          jobType: json?.careers?.extraInputFields?.inputfield1,
          location: json?.careers?.categories?.location,
          experience: json?.careers?.categories?.experience,
          skills: json?.careers?.categories?.skills,
        });
      } catch (error) {
        console.error(error.message || 'Something went wrong');
        setNotFound(true);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = 3000 - elapsed;
        setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="absolute inset-0 bg-black animate-expand" />
        <div className="z-10 text-white text-5xl font-semibold animate-fadein">
          <NumericLoader />
        </div>
      </div>
    );

  if (notFound) return <NotFound />;

  return (
    <section className="pb-20">
      <PagePostHero alignCenter="true" {...pageHeaderData} />

      <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] mt-20 container">
        <div className="lg:col-span-4 md:col-span-6">
          <JobSidebar {...jobSidebarData} />
        </div>

        <div className="careers_content lg:col-span-8 md:col-span-6">
          <div dangerouslySetInnerHTML={{ __html: data?.embedcontent }} />
          <div className="mt-5 w-[10rem]">
            <PrimaryButton title="Apply Now" link="" />
          </div>
        </div>
      </div>
    </section>
  );
};
