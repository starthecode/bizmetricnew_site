import { Link } from 'react-router-dom';

const settingsData = [
  {
    title: 'Website',
    items: [
      {
        icon: '⚙️',
        label: 'Industry',
        link: '/dashboard/customizer/verticles',
      },
      {
        icon: '📊',
        label: 'Poll',
        link: '/dashboard/customizer/poll',
      },
    ],
  },
];

export default function Customize() {
  return (
    <div className="p-6 text-gray-800">
      {settingsData.map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-4">
            {section.items.map((item) => (
              <div key={item.label} className="my-3">
                <Link to={item?.link} className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full mr-3 text-lg">
                    {item.icon}
                  </div>
                  <span className="text-base">{item.label}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
