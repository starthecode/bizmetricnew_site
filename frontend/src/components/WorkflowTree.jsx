// components/WorkflowTree.jsx
import {
  FaEye,
  FaServer,
  FaLightbulb,
  FaPenNib,
  FaRocket,
} from 'react-icons/fa';

const items = [
  {
    title: 'Mitigating',
    subtitle: 'Lorem Ipsum text here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <FaEye size={24} className="text-flamingo-500" />,
    position: 'top',
  },
  {
    title: 'Deploying',
    subtitle: 'Lorem Ipsum Text here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <FaServer size={24} className="text-flamingo-500" />,
    position: 'top',
  },
  {
    title: 'Identifying',
    subtitle: 'Lorem ipsum tect here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <FaLightbulb size={24} className="text-flamingo-500" />,
    position: 'bottom',
  },
  {
    title: 'Exercising',
    subtitle: 'Lorem Ipsum Text here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <FaPenNib size={24} className="text-flamingo-500" />,
    position: 'bottom',
  },
  {
    title: 'Testing',
    subtitle: 'Lorem Ipsum Text here',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: <FaRocket size={24} className="text-flamingo-500" />,
    position: 'bottom',
  },
];

export default function WorkflowTree() {
  const topItems = items.filter((item) => item.position === 'top');
  const bottomItems = items.filter((item) => item.position === 'bottom');

  return (
    <div className="relative w-full flex flex-col items-center py-16 bg-gradient-to-t from-purple-100 to-white z-20">
      {/* Horizontal connector line */}
      <div className="absolute top-1/2 w-[90%] h-0.5 bg-woodsmoke-600/50"></div>

      <div className="relative overflow-hidden w-[1px] h-[90px] m-auto">
        <div
          className="absolute w-full h-[40%] bg-gray-500 top-[30%]"
          style={{ boxShadow: '0px 0px 30px 20px grey' }}
        ></div>
      </div>
      <div className="border-[0.6px] border-woodsmoke-600/50" />

      {/* Top row */}
      <div className="flex gap-20 mb-20 z-10">
        {topItems.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>

      {/* Vertical lines from top cards */}
      <div className="absolute top-[46%] flex w-[90%] justify-between">
        {topItems.map((_, i) => (
          <div key={i} className="w-1 h-16 bg-black mx-auto" />
        ))}
      </div>

      {/* Bottom row */}
      <div className="flex gap-16 mt-20 z-10">
        {bottomItems.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

function Card({ title, subtitle, description, icon }) {
  return (
    <div className="bg-black text-white w-64 rounded-2xl shadow-lg p-5 flex flex-col justify-between gap-3 border border-gray-700 relative z-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-flamingo-500 text-sm">{subtitle}</p>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}
