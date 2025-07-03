import { SecondaryButton } from '../../Buttons/SecondaryButton';

export default function NewslettersGrid({ newsletters }) {
  // Group newsletters by year
  const newslettersByYear = newsletters.reduce((acc, newsletter) => {
    const year = new Date(newsletter.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(newsletter);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(newslettersByYear).sort((a, b) => b - a);

  return (
    <div className="px-6 py-10 space-y-12">
      {sortedYears.map((year) => (
        <div key={year}>
          {/* Year + View All */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{year}</h2>
            <SecondaryButton title={'View All'} link={'/'} />
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap gap-6">
            {newslettersByYear[year].map((item, index) => {
              const formattedDate = new Date(item.date).toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              );

              return (
                <div
                  key={item.id || index}
                  className="relative w-[220px] rounded-xl overflow-hidden shadow-lg group transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-junglegreen-600/60 via-transparent to-flamingo-500/60" />
                  <img
                    src={item.image}
                    alt={`${formattedDate} Newsletter`}
                    className={`w-full h-auto object-cover transition-opacity duration-300 ${
                      item.isActive
                        ? ''
                        : ''
                    }`}
                  />
                  <div className="absolute top-2 left-2 text-woodsmoke-700 font-semibold text-sm bg-white/80 backdrop-blur-lg shadow-lg px-2 py-1 rounded">
                    {formattedDate}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="mb-4 bg-orange-500 text-white px-4 py-2 text-sm font-semibold rounded-full shadow hover:bg-orange-600">
                      View Newsletter
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
