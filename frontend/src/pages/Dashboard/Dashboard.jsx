import React from 'react';
import { useLocation } from 'react-router-dom';
import { DashSidebar } from '../../components/DashComponents/DashSidebar';
import { DashProfile } from './DashProfile';
import { DashHeader } from '../../components/DashComponents/DashHeader';
import { DashHome } from '../../components/DashComponents/DashHome';
import { Profile } from '../../components/DashComponents/Profile';
import { Pages } from './Pages';
import Settings from './Settings/Settings';
import Customize from './Appearance/Customize';
import Media from './Appearance/Media';
import MediaLibraryManager from './Appearance/Media/MediaLibraryManager ';
// import MenuBuilder from '../../components/DashComponents/Menu/MenuBuilder';

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = React.useState();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    const pathName = tabFromUrl.toLowerCase();

    if (pathName) {
      setTab(pathName);
    }
  }, [location]);

  return (
    <main>
      {tab !== 'main' && <div className="text-2xl capitalize">{tab}</div>}
      <div>
        {tab === 'main' && <DashHome />}
        {tab === 'Posts' && <div>Posts content</div>}
        {tab === 'Pages' && <Pages />}
        {/* {tab === 'menu' && <MenuBuilder />} */}
        {tab === 'Tags' && <div>Tags content</div>}
        {tab === 'Authors' && <div>Authors content</div>}
        {tab === 'Members' && <div>Members content</div>}
        {tab === 'Domains' && <div>Domains content</div>}
        {tab === 'Analytics' && <div>Analytics content</div>}
        {tab === 'profile' && <Profile />}
        {tab === 'settings' && <Settings />}
        {tab === 'appearance' && <Customize />}
        {tab === 'media' && <MediaLibraryManager />}
      </div>
    </main>
  );
}
