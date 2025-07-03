import { Heading } from '../../Heading/Heading';

export default function OurValue({ data }) {
  return (
    <div className="container">
      <div>
        <Heading
          classes={'items-center'}
          type={'dark'}
          smallTitle={data?.title}
          title={data?.subtitle}
        />
      </div>
      {/* Top Row - PATH Cards */}
      <div className="flex flex-col items-center justify-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl pt-10">
          {data?.items.slice(0, 4).map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-flamingo-500/40 to-white text-left px-5 pt-10 pb-5 rounded-xl border relative shadow-sm"
            >
              <div className="absolute top-2 left-2 w-16 h-16 border-2 border-white/40 rounded-full"></div>
              <h2 className="relative z-10 text-4xl font-semibold text-flamingo-600">
                {item.threeboxesinput1}
              </h2>
              <p className="mt-2 text-md font-semibold text-gray-800">
                {item.threeboxesinput2}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Mission & Vision */}
      <div className="flex flex-col items-center justify-center px-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          {data?.items.slice(4).map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-[#9dd5c5] to-white p-10 rounded-xl shadow-md relative"
            >
              <div className="absolute right-4 bottom-4 w-16 h-16 border-4 border-white/50 rounded-full"></div>
              <h3 className="text-lg font-semibold mb-2 text-junglegreen-800">
                {item.threeboxesinput1}
              </h3>
              <p className="text-sm text-gray-800">{item.threeboxesinput2}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
