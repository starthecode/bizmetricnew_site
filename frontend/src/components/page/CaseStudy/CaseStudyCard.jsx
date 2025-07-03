import { FiArrowRight } from 'react-icons/fi';
import { SecondaryButton } from '../../Buttons/SecondaryButton';
import { IoIosArrowDroprightCircle } from 'react-icons/io';

const CaseStudyCard = ({
  category,
  title,
  description,
  image,
  categoryColor,
}) => {
  return (
    <div className="max-w-sm p-4 rounded-xl overflow-hidden border border-gray-300 shadow-sm bg-woodsmoke-500/10 hover:bg-flamingo-500/10 hover:shadow-md transition-shadow duration-300">
      <img
        src="https://bizsiteuploads.blob.core.windows.net/uploads/1750742181912-case-study-img787874545.webp"
        alt="Case Study"
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <div className="pt-4">
        <p className="text-sm font-semibold text-orange-500 uppercase mb-1 tracking-wider">
          {category}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {title.slice(0, 35) + '...'}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          Care study: Spotfire to Power BI Migration Domain -Oil...
        </p>

        <hr className="border-t border-gray-300 mb-3" />

        <div className="flex justify-between items-center text-sm text-gray-700 font-medium">
          <span>Read More</span>
          <IoIosArrowDroprightCircle size={20} className="fill-flamingo-500" />
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCard;
