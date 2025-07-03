import React from 'react';
import { Link } from 'react-router-dom';

const settingsData = [
  {
    title: 'Website',
    items: [
      { icon: '⚙️', label: 'General', link: '/dashboard/settings/general' },
      { icon: '📜', label: 'Navigation', badge: 'BETA' },
      { icon: '🎨', label: 'Design', badge: 'COMING SOON' },
      { icon: '👥', label: 'Footer', badge: 'BETA' },
      { icon: '📢', label: 'Features' },
    ],
  },
  {
    title: 'Members',
    items: [
      { icon: '📋', label: 'Membership', badge: 'COMING SOON' },
      { icon: '✉️', label: 'Email newsletter', badge: 'COMING SOON' },
    ],
  },
  {
    title: 'Advanced',
    items: [
      { icon: '🗺️', label: 'Field mapping' },
      { icon: '💻', label: 'Custom HTML' },
    ],
  },
];

export default function Settings() {
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
