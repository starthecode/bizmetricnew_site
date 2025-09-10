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
import { useSelector } from 'react-redux';

export const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'Dashboard';
  const currentSub = searchParams.get('sub') || '';
  const [openDropdown, setOpenDropdown] = React.useState('');
  const navigate = useNavigate();

  console.log('currentUser', currentUser);

  // ✅ Role checks
  const isAdmin =
    currentUser?.isAdmin === true && currentUser?.role?.includes('admin');

  const isHR = currentUser?.role?.includes('hr');

  const isUser = currentUser?.role?.includes('user');

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
        { name: 'Add New Page', link: '/dashboard/new-page' },
        { name: 'Categories', link: '/dashboard/pages/categories' },
        { name: 'Tags', link: '/dashboard/pages/tags' },
      ],
    },
    {
      name: 'Posts',
      icon: <FiBookOpen color="#f2692a" />,
      subpages: [
        { name: 'All Posts', link: '/dashboard/posts' },
        { name: 'Add New Post', link: '/dashboard/new-post' },
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
      name: 'Careers',
      icon: <MdPostAdd color="#f2692a" />,
      subpages: [
        { name: 'All Careers', link: '/dashboard/careers' },
        { name: 'Add New Career Post', link: '/dashboard/new-career' },
        // { name: 'Categories', link: '/dashboard/newsletters/categories' },
        // { name: 'Tags', link: '/dashboard/newsletters/tags' },
      ],
    },
    {
      name: 'media',
      icon: <MdOutlinePermMedia color="#f2692a" />,
    },
    {
      name: 'users',
      icon: <FiMail color="#f2692a" />,
      subpages: [
        { name: 'All Users', link: '/dashboard/users' },
        { name: 'Add New User', link: '/dashboard/new-user' },
      ],
    },
  ];

  const menuItems2 = [
    { name: 'Appearance', icon: <MdOutlineBrush /> },
    {
      name: 'Profile',
      icon: <MdOutlineBrush />,
      link: `/dashboard/users/user/${currentUser?._id || ''}`,
    },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  const handleTabClick = (tab, sub, customLink) => {
    if (!customLink && !sub) {
      const params = { tab };
      const search = new URLSearchParams(params);
      navigate(`/dashboard?${search}`);
      return;
    }

    if (customLink) {
      navigate(customLink);
      return;
    }

    const params = { tab };
    if (sub) params.sub = sub;
    const search = new URLSearchParams(params);
    navigate(`/dashboard?${search}`);
  };

  // ✅ Build visible menus by role
  let visibleMenu1 = [];
  let visibleMenu2 = [];

  if (isAdmin) {
    visibleMenu1 = menuItems1;
    visibleMenu2 = menuItems2;
  } else if (isHR) {
    visibleMenu1 = [
      menuItems1[0],
      menuItems1.find((i) => i.name === 'Careers'),
    ];
    visibleMenu2 = [menuItems2.find((i) => i.name === 'Profile')];
  } else if (isUser) {
    visibleMenu1 = [menuItems1[0], menuItems1.find((i) => i.name === 'Posts')];
    visibleMenu2 = [menuItems2.find((i) => i.name === 'Profile')];
  } else {
    visibleMenu1 = [menuItems1[0]]; // only Dashboard
    visibleMenu2 = [];
  }

  return (
    <div className="w-64 h-screen bg-white shadow-md p-4">
      <nav className="mt-4">
        {visibleMenu1.map((item, index) => (
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
                  {openDropdown === item.name ? (
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
        {visibleMenu2.map((item, index) => (
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
                  {openDropdown === item.name ? (
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
    </div>
  );
};
