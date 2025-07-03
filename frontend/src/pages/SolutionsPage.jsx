import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion, useAnimation } from 'framer-motion';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import GlowLight from '../components/extras/GlowLight';
import { Heading } from '../components/Heading/Heading';
import Line5 from '../components/lines';
import SolutionsSection3 from '../components/page/SolutionsPage/SolutionsSection3';
import SolutionsSection4 from '../components/page/SolutionsPage/SolutionsSection4';
import SolutionsSection5 from '../components/page/SolutionsPage/SolutionsSection5';
import SolutionsSection6 from '../components/page/SolutionsPage/SolutionsSection6';
import SolutionForm from '../components/Forms/SolutionForm';
import SpringSlider from '../components/extras/SpringSlider';
import PagePostHero from '../components/HeroSection/PagePostHero';
import FiveCards from '../components/Cards/FiveCards';
import NumericLoader from '../components/Loader/NumericLoader';
import YoutubeEmbedVideo from '../components/extras/embed/YoutubeEmbedVideo';

export default function SolutionsPage() {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [pageHeaderData, setPageHeaderData] = useState({
    smalltitle: '',
    title: '',
    excerpts: '',
    bannerImg: '',
  });

  // const [dynamicHeading, setDynamicHeading] = useState({
  //   title: '',
  //   subText: '',
  //   vidId: '',
  // });

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
        const res = await fetch(`/api/solutions/singleSolution/${slug}`, {
          method: 'GET',
          // cache: 'force-cache',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await res.json();

        if (!res.ok || !json?.title) {
          setNotFound(true);
          return;
        }

        setData(json);

        // const threeboxesContent = json.content?.find(
        //   (block) => block.type === 'threeboxes'
        // );

        setPageHeaderData({
          smalltitle: 'Solution',
          title: json.title || '',
          excerpts: json.excerpts || '',
          bannerImg: json.metaFields?.featuredImage || '',
        });
        // if (json?.editorJs?.blocks?.length) {
        //   const blocks = json.editorJs.blocks;

        //   const h2Block = blocks.find(
        //     (block) => block.type === 'header' && block.data.level === 2
        //   );
        //   const paragraphBlock = blocks.find(
        //     (block) => block.type === 'paragraph'
        //   );

        //   const videoBlock =
        //     blocks[2]?.type === 'paragraph' ? blocks[2].data.text : '';

        //   setDynamicHeading({
        //     title: h2Block?.data?.text || '',
        //     subText: paragraphBlock?.data?.text || '',
        //     vidId: videoBlock || '',
        //   });
        // }
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
    <section>
      <PagePostHero {...pageHeaderData} />
      <GlowLight classes={'top-[25%] left-0 bg-flamingo-600/40'} />
      <div className="max-w-7xl mx-auto mt-20">
        <div className="text-center">
          <Heading
            classes={'items-center'}
            type="dark"
            smallTitle={''}
            title={
              data?.content?.find((c) => c.type === 'threeboxes')?.data
                ?.title || ''
            }
            subText={
              data?.content?.find((c) => c.type === 'threeboxes')?.data
                ?.subtitle || ''
            }
          />
        </div>
        <div className="relative overflow-hidden h-full pb-20">
          <div className="absolute inset-0 w-full text-center grid justify-center">
            <Line5 />
          </div>
          <div className="flex justify-center items-center w-full mt-20">
            {/* Video */}
            <div className="iframe__div relative w-[300]" ref={ref}>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative border border-junglegreen-400 rounded-xl p-2 w-fit h-fit"
              >
                <YoutubeEmbedVideo
                  videoId={
                    data?.content?.find((c) => c.type === 'threeboxes')?.data
                      ?.extratext || ''
                  }
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <FiveCards
        type={'left'}
        count={4}
        data={
          data?.content?.find((c) => c.type === 'threeboxes')?.data?.items || []
        }
      />
      <SolutionsSection3
        data={data?.content?.find((c) => c.type === 'threeboxes2')?.data || []}
      />
      <SolutionsSection4
        data={data?.content?.find((c) => c.type === 'threeboxes3')?.data || []}
      />

      <SolutionsSection5
        data={data?.content?.find((c) => c.type === 'threeboxes4')?.data || []}
      />
      <SolutionsSection6 />
      <SolutionForm
        pageSource={slug}
        data={data?.content?.find((c) => c.type === 'linkboxes')?.data || []}
      />
      <SpringSlider />
    </section>
  );
}
