import { LiaStarSolid } from 'react-icons/lia';
import { Heading } from '../../Heading/Heading';

const TestimonialCard = ({ data }) => {
  return (
    <section className="container">
      <div>
        <Heading smallTitle={data?.title} title={data?.subtitle} />
      </div>
      <div className="flex mt-16 gap-5">
        {data?.items?.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-8 max-w-lg w-full text-white shadow-lg"
          >
            <p className="text-md leading-relaxed mb-6">
              <span
                dangerouslySetInnerHTML={{ __html: item?.fiveboxesinput5 }}
              />
            </p>
            <div className="flex items-center gap-4">
              <img
                src={item?.fiveboxesinput1}
                alt={item?.fiveboxesinput2}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-white">
                  {item?.fiveboxesinput2}
                </h4>
                <div className="flex mt-1">
                  {Array(Number(item?.fiveboxesinput3))
                    .fill(0)
                    .map((_, index) => (
                      <span key={index}>
                        <LiaStarSolid className="fill-yellow-400" />
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialCard;
