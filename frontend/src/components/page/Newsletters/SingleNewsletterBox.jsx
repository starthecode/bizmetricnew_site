import { formatDate } from '../../../utils/utils';
import { Heading } from '../../Heading/Heading';

export default function SingleNewsletterBox({ newsletter }) {
  return (
    <section className="px-6 py-12 md:px-16">
      {/* Title */}
      <div className="mb-8">
        <Heading
          type={'dark'}
          smallTitle={'News & Highlights'}
          title={'Bizmetric in News'}
        />
      </div>

      {/* Card */}
      <div className="relative flex md:flex-row justify-end items-center overflow-hidden">
        {/* Left Content Card */}
        <div className="relative z-10 w-full md:w-3/5 lg:w-1/2 -mt-16 md:mt-0 bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-6 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2">
          {/* Tag */}
          <span className="badge mb-3 inline-block">
            Latest News
          </span>

          {/* Title */}
          <h3
            className="text-xl font-semibold mb-4"
            dangerouslySetInnerHTML={{
              __html: newsletter?.extraInputFields?.inputfield1,
            }}
          />

          {/* Author */}
          <div className="flex items-center gap-3 mb-4 ">
            <div className='rounded-full'>
              {' '}
              <img
                src="https://bizsiteuploads.blob.core.windows.net/uploads/1751374830014-bizmetric_logo-small.webp"
                alt="Author"
                className="w-8 h-8 object-cover p-1"
              />
            </div>

            <div>
              <p className="text-sm font-medium">Bizmetric</p>
              <p className="text-xs text-gray-500">
                {formatDate(newsletter?.date)}
              </p>
            </div>
          </div>
        </div>

        {/* Background Image with hat */}
        <div className="w-full bg-flamingo-500/30 md:w-3/5 lg:w-3/3 rounded-l-xl overflow-hidden py-5 pl-5">
          <img
            src={newsletter?.extraInputFields?.inputfield2}
            alt="Background"
            className="object-cover rounded-l-xl border-2 border-r-0 border-flamingo-500"
          />
        </div>
      </div>
    </section>
  );
}
