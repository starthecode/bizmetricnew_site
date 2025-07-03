import { TbStarFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Heading } from './Heading/Heading';
import { motion } from 'framer-motion';

const links = [
  'Modernizing ERP Data with Databricks: Unlock Scalable Analytics & AI-Driven Insights',
  'Business Challenges you can solve with Power BI Solutions',
  'How Bizmetric’s AI and Data Capabilities Drive Smarter Decisions in the Energy Sector?',
  'Unity Catalog in Databricks: The Key to Secure and Scalable Data Governance',
  'Driving Transformation in 2025: How Bizmetric is Leading Data & AI Trends',
  'Seamlessly Integrate D365 with Microsoft Fabric: Bizmetric’s Cost-Effective Accelerator',
  'Transform Your Analytics with the D365 to Fabric Connector',
  'Smarter Field Service Automation with Databricks and Bizmetric’s Collaborative Approach',
  'Azure Databricks vs. AWS Databricks: Which One Should You Choose?',
  'Revolutionizing Business with Generative AI',
  'The Power of Bizmetric Operational Technology',
  'Revolutionize your approach with low-code solutions through Microsoft Power Platform',
  'How Azure Innovate & Bizmetric Expertise Supercharge AI-Powered Intelligent App Development',
  'Enhancing Power BI Experience with Microsoft Fabric and Copilot Features',
  'Bizmetric Gen AI BOT',
  'Bizmetric Azure Cosmos DB Capabilities',
  'Enhancing PowerBI with MS Fabric and Copilot',
  'Enhancing GenAI Applications with Azure Cosmos DB',
  'Why Bizmetric?',
  'Data Migration from GCP to Microsoft Fabric with Bizmetric',
  'MLOps Implementation',
  'How Bizmetric is Transforming the Energy Industry with MLOps - Case Study',
];

const MarqueeBanner = ({ data, type }) => {
  return type === 'about-us' ? (
    <div className="container py-20">
      <div className="w-full flex flex-col justify-center items-center">
        <Heading
          classes={'items-center justify-center'}
          type={'dark'}
          smallTitle={data?.title}
          title={data?.subtitle}
        />
      </div>

      {/* Marquee content container */}
      <div className="relative w-full overflow-hidden py-10">
        <div className="flex">
          <motion.div
            initial={{ x: `${0}` }}
            animate={{ x: `${'-100%'}` }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="flex flex-shrink-0 gap-10 items-center justify-center"
          >
            {data &&
              data?.items?.map((image, index) => {
                return (
                  <div className="py-3 px-4 rounded-xl flex text-center justify-center items-center">
                    <img
                      width={200}
                      height={200}
                      alt={`marqueImg${index}`}
                      className="object-contain"
                      src={image?.logoUrl}
                      key={index}
                    />
                  </div>
                );
              })}
          </motion.div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative w-full overflow-hidden border-y border-junglegreen-500/60 bg-gradient-to-r from-[#0F172A] to-[#1E293B] py-3 mt-8 mb-8 text-center sm:text-center md:text-center lg:text-left xl:text-left grid sm:block md:flex xl:flex sm:justify-center md:justify-start xl:justify-start items-center">
      {/* Fixed "What’s New" */}
      <div className="sm:w-full md:w-[160px] lg:w-[160px] xl:w-[160px] pl-4">
        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-junglegreen-500 to-blue-500">
          What’s New:
        </span>
      </div>

      {/* Marquee content container */}
      <div className="relative w-full overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {links.map((text, index) => (
            <Link to={'/'} key={index} className="flex items-center group">
              <span className="text-white text-lg font-medium group-hover:text-flamingo-500">
                {text}
              </span>
              {/* Add icon only if not the last item */}
              {index !== links.length - 1 && (
                <TbStarFilled size={20} className="fill-flamingo-500 mx-3" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeBanner;
