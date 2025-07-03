import CaseStudyCard from './CaseStudyCard';

const CaseStudiesGrid = () => {
  const caseStudies = [
    {
      category: 'AWS',
      title: 'Advanced Analytics (AWS)',
      description:
        'About the Domain Our Client is a Web Domain Service Provider...',
      image: '/placeholder-aws.jpg',
      categoryColor: 'bg-orange-100 text-orange-800',
    },
    {
      category: 'DATA ANALYTICS',
      title: 'Spotfire to Power BI Migration',
      description:
        'Core study: Spotfire to Power BI Migration Domain -Oil &...',
      image: '/placeholder-analytics.jpg',
      categoryColor: 'bg-blue-100 text-blue-800',
    },
    {
      category: 'AI-ML-OPS',
      title: 'ChatGPT Solutions',
      description: 'Welcome to our in-depth case study on ChatGPT solutions...',
      image: '/placeholder-ai.jpg',
      categoryColor: 'bg-green-100 text-green-800',
    },
    {
      category: 'AZURE LOGISTICS',
      title: 'Hadoop Migration to Azure',
      description:
        'Explore our successful Hadoop to Azure migration case study...',
      image: '/placeholder-hadoop.jpg',
      categoryColor: 'bg-purple-100 text-purple-800',
    },
    {
      category: 'ANALYTICS',
      title: 'Salesperson Utility for Data Ingestion',
      description:
        'About the Domain Our client is a national organization of local...',
      image: '/placeholder-sales.jpg',
      categoryColor: 'bg-indigo-100 text-indigo-800',
    },
    {
      category: 'WAREHOUSING',
      title: 'KPI Alerts using Power BI, Big Query and Apache Airflow',
      description:
        'Unlock the future of data-driven decision-making with our case...',
      image: '/placeholder-kpi.jpg',
      categoryColor: 'bg-teal-100 text-teal-800',
    },
  ];

  return (
    <div className="py-16 bg-white mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard
              key={index}
              category={study.category}
              title={study.title}
              description={study.description}
              image={study.image}
              categoryColor={study.categoryColor}
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
