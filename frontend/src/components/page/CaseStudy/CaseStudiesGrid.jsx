import CaseStudyCard from './CaseStudyCard';

const CaseStudiesGrid = ({ data }) => {
  return (
    <div className="py-16 bg-white mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {data &&
            data?.map((study, index) => (
              <CaseStudyCard
                key={index}
                category={study.category}
                title={study.title}
                description={study.description}
                image={study.image}
                categoryColor={study.categoryColor}
                link={study?.slug}
              />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button className="w-10 h-10 rounded-full bg-orange-500 text-white font-semibold">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            2
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            3
          </button>
          <span className="text-gray-400">...</span>
          <button className="text-orange-500 hover:text-orange-600 font-medium">
            next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesGrid;
