import React from 'react';
import {
  FiHome,
  FiFileText,
  FiBookOpen,
  FiTag,
  FiUsers,
  FiMail,
  FiGlobe,
  FiBarChart,
  FiSettings,
  FiChevronRight,
  FiChevronDown,
} from 'react-icons/fi';
import { BsFillMenuButtonFill, BsMailbox2Flag } from 'react-icons/bs';

import { MdOutlineBrush, MdOutlinePermMedia, MdPostAdd } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const DashSidebar = () => {
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'Dashboard';

  const currentSub = searchParams.get('sub') || '';

  const [openDropdown, setOpenDropdown] = React.useState('');

  const navigate = useNavigate();

  const menuItems1 = [
    { name: 'Dashboard', icon: <FiHome color="#f2692a" /> },

    {
      name: 'Inquires',
      icon: <BsMailbox2Flag color="#f2692a" />,
      link: 'dashboard/inquires',
    },

    {
      name: 'Pages',
      icon: <FiFileText color="#f2692a" />,
      subpages: [
        { name: 'All Pages', link: '/dashboard/pages' },
        { name: 'Add New Page', link: '/dashboard/page-new' },
        { name: 'Categories', link: '/dashboard/pages/categories' },
        { name: 'Tags', link: '/dashboard/pages/tags' },
      ],
    },

    {
      name: 'Posts',
      icon: <FiBookOpen color="#f2692a" />,
      subpages: [
        { name: 'All Posts', link: '/dashboard/posts' },
        { name: 'Add New Post', link: '/dashboard/post-new' },
        { name: 'Categories', link: '/dashboard/pages/categories' },
        { name: 'Tags', link: '/dashboard/pages/tags' },
      ],
    },

    {
      name: 'Solutions',
      icon: <MdPostAdd color="#f2692a" />,
      subpages: [
        { name: 'All Solutions', link: '/dashboard/solutions' },
        { name: 'Add New Solution', link: '/dashboard/new-solution' },
        { name: 'Categories', link: '/dashboard/solutions/categories' },
        { name: 'Tags', link: '/dashboard/solutions/tags' },
      ],
    },

    {
      name: 'Newsletters',
      icon: <MdPostAdd color="#f2692a" />,
      subpages: [
        { name: 'All Newsletters', link: '/dashboard/newsletters' },
        { name: 'Add New Newsletter', link: '/dashboard/new-newsletter' },
        { name: 'Categories', link: '/dashboard/newsletters/categories' },
        { name: 'Tags', link: '/dashboard/newsletters/tags' },
      ],
    },

    {
      name: 'Success Stories',
      icon: <MdPostAdd color="#f2692a" />,
      subpages: [
        { name: 'All Case Studies', link: '/dashboard/casestudies' },
        { name: 'Add New Case Study', link: '/dashboard/new-casestudy' },
        { name: 'Categories', link: '/dashboard/newsletters/categories' },
        { name: 'Tags', link: '/dashboard/newsletters/tags' },
      ],
    },

    {
      name: 'media',
      icon: <MdOutlinePermMedia color="#f2692a" />,
    },

    {
      name: 'Menu',
      icon: <BsFillMenuButtonFill color="#f2692a" />,
    },

    { name: 'Users', icon: <FiMail color="#f2692a" /> },
  ];

  const menuItems2 = [
    { name: 'Appearance', icon: <MdOutlineBrush /> },
    { name: 'Profile', icon: <MdOutlineBrush /> },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  const handleTabClick = (tab, sub, customLink) => {
    if (!customLink && !sub) {
      // Only set tab in URL (no navigation)
      const params = { tab };
      const search = new URLSearchParams(params);
      navigate(`/dashboard?${search}`);
      return;
    }

    if (customLink === '/dashboard/page-new') {
      const currentSearch = window.location.search;
      const isEditing =
        currentSearch.includes('action=edit') ||
        currentSearch.includes('page=');

      if (isEditing) {
        const confirmReset = window.confirm(
          'You have unsaved changes. Are you sure you want to start a new page?'
        );
        if (!confirmReset) return;
      }
      // Navigate cleanly, removing query params
      navigate('/dashboard/page-new', { replace: true });
      return;
    }

    // Default behavior
    if (customLink) {
      navigate(customLink);
      return;
    }

    const params = { tab };
    if (sub) params.sub = sub;

    const search = new URLSearchParams(params);
    navigate(`/dashboard?${search}`);
  };

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <nav className="mt-4">
        {menuItems1.map((item, index) => (
          <div key={index}>
            <button
              className={`flex items-start text-left capitalize w-full my-1 px-3 py-3 text-sm rounded-lg transition ${
                item.subpages
                  ? openDropdown === item.name
                    ? 'bg-flamingo-500/10 font-medium text-flamingo-500'
                    : 'text-gray-600 hover:bg-gray-100'
                  : currentTab === item.name
                  ? 'bg-flamingo-500/10 font-bold text-flamingo-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => {
                if (item.subpages) {
                  setOpenDropdown((prev) =>
                    prev === item.name ? '' : item.name
                  );
                } else {
                  handleTabClick(item.name, null, item.link);
                }
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="ml-3 flex-1">{item.name}</span>
              {item.subpages && (
                <span className="text-sm">
                  {item.subpages && openDropdown === item.name ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                </span>
              )}
            </button>

            {item.subpages && openDropdown === item.name && (
              <div className="ml-6 mt-1 space-y-1">
                {item.subpages.map((sub) => (
                  <button
                    key={sub.name}
                    className={`flex items-center w-full px-2 py-2 text-sm rounded-lg transition ${
                      currentSub === sub.name
                        ? 'bg-gray-100 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() =>
                      handleTabClick(item.name, sub.name, sub.link)
                    }
                  >
                    <span className="ml-2">{sub.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <hr className="my-4" />
      <nav>
        {menuItems2.map((item) => (
          <button
            key={item.name}
            className={`flex items-center w-full px-3 py-3 text-sm rounded-lg transition ${
              currentTab === item.name
                ? 'bg-gray-100 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => handleTabClick(item.name)}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="ml-3">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
