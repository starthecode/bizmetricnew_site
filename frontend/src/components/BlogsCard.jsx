import { Heading } from './Heading/Heading';
import GlowLight from './extras/GlowLight';
import SvgLine4 from './lines/SvgLine4';

import NewsCards from './Cards/NewsCards';
import QuoteCards from './Cards/QuoteCards';
import BackgroundSection from './BackgroundSection';

export default function BlogsCard({ testimonialsData }) {
  return (
    <BackgroundSection>
      <div className="container">
        <NewsCards />
        <SvgLine4 />
        <div className="relative overflow-hidden px-20 z-10 mt-28 pb-20 xl:pb-0 xl:mt-48">
          <div>
            <Heading
              classes={'items-center xl:items-start'}
              type={''}
              smallTitle={'CLIENT TESTIMONIALS'}
              title={testimonialsData?.title}
            />
          </div>
          <div className="flex flex-col justify-between items-center lg:grid lg:grid-cols-3 xl:grid-cols-3 mt-5 gap-10 relative z-10">
            {testimonialsData?.items &&
              testimonialsData.items.map((item, index) => (
                <div key={index}>
                  <QuoteCards data={item} index={index} />
                </div>
              ))}
          </div>
        </div>
        <GlowLight classes={'-left-10 bottom-10 bg-junglegreen-500/40'} />
        <div className="absolute bottom-10 -right-48 opacity-10">
          <img
            className="w-full"
            src="https://bizsiteuploads.blob.core.windows.net/uploads/quotes.png"
          />
        </div>
      </div>
    </BackgroundSection>
  );
}
