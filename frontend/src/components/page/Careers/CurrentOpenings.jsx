import { SearchBar } from '../../extras/SearchBar';
import { Heading } from '../../Heading/Heading';
import { RiMapPin2Fill } from 'react-icons/ri';
import { HiClock } from 'react-icons/hi';

const jobs = [
  {
    tag: 'Data Science',
    title: 'Data Engineer',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '10–25–06',
  },
  {
    tag: 'ML',
    title: 'Data Scientist',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '10–25–06',
  },
  {
    tag: 'Data Science',
    title: 'Power BI Developer',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '10–25–06',
  },
  {
    tag: 'ML',
    title: 'Machine Learning Engineer',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '10–25–06',
  },
  {
    tag: 'Development',
    title: 'Snowflake Developer',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '10–25–06',
  },
  {
    tag: 'Development',
    title: 'GEN AI Engineer',
    work: 'Hybrid',
    location: 'All Locations',
    posted: '01–25–06',
  },
];

export default function CurrentOpenings() {
  const showLocation = true;
  return (
    <section
      className="relative py-20 sm:py-24 md:py-24 lg:py-20 z-10 mt-40"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://bizsiteuploads.blob.core.windows.net/uploads/Background-Colour-Gradient-667564.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col justify-center items-center mb-10">
        <Heading
          classes={'items-center'}
          type={''}
          smallTitle={'Search'}
          title={'Search By Specific'}
        />
      </div>
      <SearchBar type="dark" />

      <div className="py-10 px-4 mt-10">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="border rounded-xl shadow-sm bg-white p-6 w-full max-w-sm space-y-4"
            >
              <span className="bg-junglegreen-500/20 text-junglegreen-600 text-sm font-medium px-3 py-1 rounded-full">
                {job.tag}
              </span>

              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>

              <div className="flex items-center text-sm text-gray-600 space-x-6">
                {showLocation && (
                  <div className="flex items-center space-x-1">
                    <RiMapPin2Fill className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <HiClock className="w-4 h-4" />
                  <span>{job.work}</span>
                </div>
              </div>

              <hr />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Posted by:{' '}
                  <strong className="text-gray-900">{job.posted}</strong>
                </span>
                <button className="bg-flamingo-100 text-orange-600 text-sm font-semibold px-4 py-2 rounded-md hover:bg-orange-200 transition">
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
