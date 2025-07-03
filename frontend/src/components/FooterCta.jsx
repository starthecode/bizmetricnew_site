import { PrimaryButton } from './Buttons/PrimaryButton';
import GlowLight from './extras/GlowLight';

export default function FooterCta() {
  return (
    <section className="bg-white px-5 md:px-20 relative z-10">
      <div className="relative overflow-hidden w-full flex flex-col justify-center items-center top-10">
        {/* Top Banner */}
        <div className="bg-flamingo-500 text-white rounded-full text-center py-4 w-1/2 flex flex-col items-center border-b-2 border-b-junglegreen-500">
          <p className="text-2xl font-semibold py-3">Let's Think Digital!</p>
          <PrimaryButton title={'Contact Us'} link={'/contact-us'} />
        </div>
      </div>
      {/* Main Content Area */}
      <GlowLight classes={'-left-20 top-16 bg-junglegreen-500/40'} />

      {/* <div className="relative py-10 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 lg:w-5/12 text-center md:text-left">
            <Heading
              type="dark"
              title="Let's work with Us"
              subText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />

            <p className="text-gray-600 leading-relaxed mb-8"></p>
          </div>

          <div className="group md:w-1/2 lg:w-5/12 flex justify-center md:justify-end">
            <PrimaryButton title={'Know More'} />
          </div>
        </div>
      </div> */}
    </section>
  );
}
