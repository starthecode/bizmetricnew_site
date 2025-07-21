import { FaMagnifyingGlass, FaXmark, FaBars } from 'react-icons/fa6';
import { HiXMark } from 'react-icons/hi2';

import { flatListToHierarchical } from '../../utils/flatListToHierarchical';
// import { Toggle } from './Toggle';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Search } from '../Search/Search';
import { MobileNav } from './MobileNav';
import { Logo } from '../Logo';
import { PrimaryButton } from '../Buttons/PrimaryButton';
// import PopupContext from '../Extras/Popups/PopupContext';

const Header = ({ menus }) => {

  const menuList = flatListToHierarchical(menus);
  const [active, setActive] = useState(false);

  // const { openPopup } = useContext(PopupContext);

  const menuHandler = () => {
    setActive(!active);
  };

  const [width, setWidth] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  const handleSearch = () => {
    showSearch ? setShowSearch(false) : setShowSearch(true);
  };

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scroll) {
        setScroll(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scroll]);

  const headerClasses = `rounded-xl relative z-20 transition-all ease-in-out duration-500 bg-royalBlue-950/80 shadow-lg ${
    scroll ? 'w-[1150px]' : 'w-[1285px]'
  }`;

  return (
    <>
      <header>
        <div
          className={`flex mt-3 relative justify-center items-center w-[600px] ${
            width < 1024 && active
              ? 'mobile-nav--active inset-0 z-30 fixed'
              : 'large-menu relative sm:fixed md:fixed lg:fixed xl:fixed'
          } `}
        >
          <div
            className={`mobile-nav-btns lg:items-center flex lg:justify-start md:justify-between sm:justify-between ${headerClasses} px-4 lg:px-6 lg:xl:px-0`}
          >
            <div className="flex justify-between lg:w-full items-center mx-10">
              <Logo />

              <Navbar
                scroll={scroll}
                menuList={menuList}
                active={active}
                width={width}
              />
            </div>
            <div
              className={`${
                showSearch
                  ? 'opacity-100 bg-[#f7f9fc] w-[50%]'
                  : 'opacity-0 bg-transparent w-0'
              } absolute z-10 right-[18em] h-[60px] rounded-xl transition-all ease-out duration-700 border border-woodsmoke-200/10`}
            >
              <Search active={active} width={width} />
            </div>
            <div className="ml-4 flex items-center gap-5 mx-10">
              <div className="flex relative items-center">
                {/* Menu Open-Close Button */}
                <div className="ml-auto flex">
                  <button
                    onClick={menuHandler}
                    className={`${
                      active ? 'dark:border-slate-500 ' : ''
                    } lg:hidden relative z-20 border-onyx-400 dark:border-onyx-700 hover:bg-white/[.15] dark:hover:bg-accent
                focus:bg-white ml-2 flex h-7 w-7 items-center justify-center rounded-full
                border bg-white transition-colors focus:border-slate-400
                 dark:bg-white/[.15]"
                  aria-label="open mobile menu`}
                  >
                    {active ? (
                      <FaXmark
                        className={`${
                          active ? 'dark:fill-slate-500 ' : ''
                        } fill-slate-500 h-4 w-4 transition-colors`}
                      />
                    ) : (
                      <FaBars
                        className={`fill-slate-500 h-4 w-4 transition-colors hover:fill-flamingo-500 focus:fill-flamingo-500`}
                      />
                    )}
                  </button>
                </div>
                <div className="relative z-20">
                  <button
                    onClick={() => handleSearch()}
                    className="flex ml-2 h-7 w-7 items-center justify-center rounded-full border border-onyx-400/40"
                  >
                    {!showSearch ? (
                      <FaMagnifyingGlass className="h-4 w-4 fill-flamingo-600 dark:fill-[#00a59a]" />
                    ) : (
                      <HiXMark className="h-4 w-4 fill-flamingo-600" />
                    )}
                  </button>
                </div>
              </div>
              {/* <UserProfile /> */}
              <PrimaryButton title="Contact Us" link="/contact-us" />;
            </div>
          </div>
        </div>
        <div
          className={`${
            width < 1024 && active ? '' : 'hidden'
          } h-fit fixed z-20 inset-0 px-10 py-10 bg-[#f7f9fc] dark:bg-gradient-to-t from-onyx-950 to-woodsmoke-950`}
        >
          {/* Mobile Menu */}
          <MobileNav menuList={menuList} />
        </div>
      </header>
    </>
  );
};

export default Header;
