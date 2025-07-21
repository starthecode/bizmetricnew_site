export default function FiveCards({ data, type, count }) {
  console.log('count', count + 1);

  return (
    <div className={`grid grid-cols-${count + 1} gap-5 px-28`}>
      {data &&
        data?.map((item, index) => (
          <div
            key={index}
            className={`${
              index % 2 !== 0 ? 'mt-20' : ''
            } rounded-xl bg-white shadow-lg border border-junglegreen-500/30
             text-white h-fit`}
          >
            <div
              className={`p-4 h-full flex flex-col w-full ${
                type === 'center'
                  ? 'items-center text-center'
                  : 'items-start text-left'
              }`}
            >
              <div
                className={`w-fit h-fit p-2 ${
                  type === 'left' &&
                  'shadow-lg rounded-[9.24px]  bg-junglegreen-500'
                }  mb-3 flex items-center justify-center`}
              >
                <img className="w-6 h-6" src={item?.threeboxesinput1} />
              </div>
              <h3 className="font-semibold text-black text-md mb-3">
                {item?.threeboxesinput2}
              </h3>
              <p className="font-medium text-[#adb5bd] text-sm leading-[20px]">
                {item?.threeboxesinput3}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
