import { Heading } from '../Heading/Heading';
import { motion } from 'framer-motion';
import LiteYouTubeEmbed from '../extras/LiteYouTubeEmbed';
import FiveCards from '../Cards/FiveCards';
import FeedbackSlider from '../FeedbackSlider';
import { GalleryWithTab } from '../extras/GalleryWithTab';
import AwardsRecognition from '../extras/AwardsRecognition';
import YoutubeEmbedVideo from '../extras/embed/YoutubeEmbedVideo';
import { Line5 } from '../lines';

export default function TempLiftAtBiz({ data }) {
  return (
    <>
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
            <div className="iframe__div relative w-fit">
              <div className="relative border border-junglegreen-400 rounded-xl p-2 w-fit">
                <YoutubeEmbedVideo
                  videoId={
                    data?.content?.find((c) => c.type === 'threeboxes')?.data
                      ?.extratext || ''
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FiveCards
        count={5}
        type="center"
        data={
          data?.content?.find((c) => c.type === 'threeboxes')?.data?.items || []
        }
      />
      <FeedbackSlider
        data={data?.content?.find((c) => c.type === 'threeboxes2')?.data || []}
      />
      <GalleryWithTab
        data={data?.content?.find((c) => c.type === 'galleryboxes')?.data || []}
      />
      <AwardsRecognition
        data={data?.content?.find((c) => c.type === 'threeboxes3')?.data || []}
      />
    </>
  );
}
