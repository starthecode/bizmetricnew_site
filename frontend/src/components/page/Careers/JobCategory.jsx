import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { Heading } from '../../Heading/Heading';

const jobs = [
  { title: 'Data Science', vacancies: 11, highlighted: true },
  { title: 'Development', vacancies: 9 },
  { title: 'ML', vacancies: 4 },
  { title: 'Project Manager', vacancies: 6 },
  { title: 'Writing', vacancies: 2 },
  { title: 'Sales & Marketing', vacancies: 4 },
  { title: 'IT & Networking', vacancies: 4 },
  { title: 'Accounting', vacancies: 2 },
];

export default function JobCategory() {
  return (
    <section className="container mt-20">
      <div className="mb-10">
        <Heading type={'dark'} title={'Career Paths by Specialization'} />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className={`rounded-xl border p-6 w-full max-w-[300px] h-[160px] flex flex-col justify-between shadow-sm
      ${
        job.highlighted
          ? 'bg-[#fef6f3] border-[#f2682a]'
          : 'bg-gray-100 border-gray-300'
      }`}
          >
            <div>
              <h4 className="text-sm font-semibold text-woodsmoke-500 uppercase">
                {job.title}
              </h4>
              <h2 className="text-lg font-semibold mt-2">
                {job.vacancies} Vacancies Available
              </h2>
            </div>
            <SecondaryButton title={'Explore Jobs'} link={'/'} />
          </div>
        ))}
      </div>
    </section>
  );
}
