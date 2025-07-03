import { FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LeadersProfileCard = ({ items }) => {
  return (
    <div className="flex gap-3">
      {items?.map((item, index) => (
        <div
          key={index}
          className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-lg group"
        >
          {/* Background Image */}
          <img
            src={item?.fiveboxesinput1} // Replace with your image
            alt={item?.fiveboxesinput2}
            className="w-full h-full object-cover"
          />

          {/* Base Info Bar (Always visible) */}
          <div className="absolute bottom-0 left-0 right-0 bg-junglegreen-600 px-4 py-3 flex justify-between items-center z-30">
            <div>
              <h3 className="text-white font-semibold text-sm">
                {item?.fiveboxesinput2}
              </h3>
              <p className="text-white text-xs">{item?.fiveboxesinput3} </p>
            </div>
            <Link to={item?.fiveboxesinput4}>
              <FaLinkedin className="text-white text-xl" />
            </Link>
          </div>

          {/* Hover Overlay: Slide Up + Fade In */}
          <div
            className="absolute bottom-0 left-0 right-0 h-full bg-royalBlue-950 bg-opacity-90 text-white px-4 py-5
        opacity-0 translate-y-full
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-700 ease-in-out z-20"
          >
            {/* Description Only */}
            <p className="text-sm leading-relaxed mb-16">
              {item?.fiveboxesinput5}
              <span className="text-blue-400 ml-1 cursor-pointer">
                Read More
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadersProfileCard;
