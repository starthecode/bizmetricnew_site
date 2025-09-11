import { FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Logo } from './Logo';
import GlowLight from './extras/GlowLight';
import { SecondaryButton } from './Buttons/SecondaryButton';
import FooterCta from './FooterCta';
import { IoIosArrowForward } from 'react-icons/io';

const Footer = () => {
  return (
    <>
      <FooterCta />
      <footer className="bg-black text-white px-10 lg:px-40 xl:px-40 pt-20">
        <GlowLight classes={'top-1/1 right-0 bg-junglegreen-500/40'} />

        <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {/* Logo and Social */}
          <div className="w-[250px]">
            <div>
              <Logo />
            </div>
            <p className="text-sm mb-6">
              Bizmetric is a trusted partner for your data journey. We make
              digital transformation easy for our clients.
            </p>
            <p className="text-lg font-semibold mb-2 text-white">
              Follow <span className="text-flamingo-500">Us</span>
            </p>
            <div className="flex gap-3">
              <FaLinkedin className="text-blue-600 text-2xl bg-white rounded p-1" />
              <FaFacebook className="text-blue-800 text-2xl bg-white rounded p-1" />
              <FaYoutube className="text-red-600 text-2xl bg-white rounded p-1" />
            </div>

            <div className="mt-10">
              <img src="/uploads/1750942105289-Databricks.webp" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-2">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <h3 className="text-2xl font-bold mb-4">
                  Quick <span className="text-flamingo-500">Links</span>
                </h3>
                <ul className="space-y-2">
                  {[
                    'Success Story',
                    'Careers',
                    'Contact Us',
                    'About Us',
                    'Privacy Policy',
                  ].map((item) => (
                    <li
                      key={item}
                      className="cursor-pointer flex items-center gap-1 text-sm xl:text-md text-woodsmoke-200 hover:text-flamingo-500 py-1"
                    >
                      <IoIosArrowForward
                        size={15}
                        className="fill-junglegreen-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reach Us */}
              <div className="col-span-2">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Reach <span className="text-flamingo-500">Us</span>
                  </h3>
                  <p className="text-woodsmoke-200">
                    <span className="font-semibold ">Address:</span> Biz-Metric
                    Partners Inc, 1650 Highway 6, Suite 130, Sugar Land, TX
                    77478
                  </p>
                  <p className="mt-3">
                    <span className="font-semibold">Email:</span>{' '}
                    marketing@bizmetric.com
                  </p>
                </div>

                {/* Career Related */}
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-4">
                    Career Related{' '}
                    <span className="text-flamingo-500">Enquiries:</span>
                  </h3>
                  <p>soumya.tiwari@bizmetric.com</p>
                  <p className="mt-2">
                    <span className="font-semibold">Phone:</span> (832)742 9957
                  </p>
                </div>
              </div>
            </div>
            {/* News Section */}
            <div className="max-w-7xl mx-auto mt-5">
              <h3 className="text-2xl font-bold mb-4">
                Recent <span className="text-flamingo-500">News</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="relative border-l border-t border-junglegreen-500/60  pt-1 p-0 rounded-2xl overflow-hidden shadow-lg text-white ">
                  <div className="grid grid-cols-3 py-2 rounded-xl relative group bg-opacity-30 backdrop-filter backdrop-blur-lg">
                    <div className="flex items-center w-full h-full justify-center">
                      <img
                        src="https://bizsiteuploads.blob.core.windows.net/uploads/1745392430467-blogimg1.webp"
                        alt="Analytics"
                        className="w-20 h-20 object-cover"
                      />
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm">
                        6 Reasons to use Power BI as a Business Intelligence
                        Solution
                      </p>
                      <SecondaryButton
                        classes={'text-xs'}
                        title={'Read More'}
                        link={'/'}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative border-l border-t border-junglegreen-500/60  pt-1 p-0 rounded-2xl overflow-hidden shadow-lg text-white ">
                  <div className="grid grid-cols-3 py-2 rounded-xl relative group bg-opacity-30 backdrop-filter backdrop-blur-lg">
                    <div className="flex items-center w-full h-full justify-center">
                      <img
                        src="https://bizsiteuploads.blob.core.windows.net/uploads/1745392441915-blogimg2.webp"
                        alt="Analytics"
                        className="w-20 h-20 object-cover"
                      />
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm">
                        6 Reasons to use Power BI as a Business Intelligence
                        Solution
                      </p>
                      <SecondaryButton
                        classes={'text-xs'}
                        title={'Read More'}
                        link={'/'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-xs py-3 text-gray-400 mt-12 border-t border-t-junglegreen-500/30">
          © 2025 <span className="text-flamingo-500">BIZ-METRIC PARTNERS</span>.
          ALL RIGHTS RESERVED
        </div>
        <GlowLight classes={'-left-20 bottom-0 bg-junglegreen-500/40'} />
      </footer>
    </>
  );
};

export default Footer;
