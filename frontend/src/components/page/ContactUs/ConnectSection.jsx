import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaHandshake,
  FaRegHandshake,
} from 'react-icons/fa';
import { Heading } from '../../Heading/Heading';
import { MdConnectWithoutContact } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ConnectSection = () => {
  return (
    <div className="bg-white p-8">
      <Heading
        type={'dark'}
        smallTitle={"Let's Connect"}
        title={"Let's Work with Data"}
      />

      <div className="space-y-8 mt-10">
        {/* Marketing */}
        <div className="flex items-start border-b border-flamingo-500/40 mb-5">
          <div className="mr-4 mt-1 text-flamingo-500">
            <FaRegHandshake size={30} />
          </div>
          <div>
            <p className="text-woodsmoke-700">Connect with our marketing and</p>
            <p className="text-woodsmoke-700">strategy maniacs at</p>
            <Link
              href="mailto:marketing@bizmetric.com"
              className="text-flamingo-500 hover:underline pb-5 block"
            >
              marketing@bizmetric.com
            </Link>
          </div>
        </div>

        {/* Sales */}
        <div className="flex items-start border-b border-flamingo-500/40 mb-12">
          <div className="mr-4 mt-1 text-flamingo-500">
            <MdConnectWithoutContact size={30} />
          </div>
          <div>
            <p className="text-woodsmoke-700">
              Connect with our expert sales team
            </p>
            <p className="text-woodsmoke-700">at</p>
            <Link
              href="mailto:sales@bizmetric.com"
              className="text-flamingo-500 hover:underline pb-5 block"
            >
              sales@bizmetric.com
            </Link>
          </div>
        </div>

        {/* Talent */}
        <div className="flex items-start border-b border-flamingo-500/40">
          <div className="mr-4 mt-1 text-flamingo-500">
            <FiUsers size={30} />
          </div>
          <div>
            <p className="text-woodsmoke-700">
              Connect and collaborate with our
            </p>
            <p className="text-woodsmoke-700">expert talent selectors.</p>
            <Link
              href="mailto:soumya.tiwari@bizmetric.com"
              className="text-flamingo-500 hover:underline pb-5 block"
            >
              soumya.tiwari@bizmetric.com
            </Link>
          </div>
        </div>
      </div>

      {/* Social Icons - Optional if you want to add them */}
      <div className="flex justify-center items-center mt-8 gap-5">
        <div className=''>
          <p>Follow Us:</p>
        </div>
        <div className="flex space-x-4">
          <Link href="#" className="text-blue-600 hover:text-blue-800">
            <FaLinkedin size={24} />
          </Link>
          <Link href="#" className="text-blue-400 hover:text-blue-600">
            <FaTwitter size={24} />
          </Link>
          <Link href="#" className="text-blue-700 hover:text-blue-900">
            <FaFacebook size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;
