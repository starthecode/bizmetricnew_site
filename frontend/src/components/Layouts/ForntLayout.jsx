import { Outlet } from 'react-router-dom';
import HeaderServer from '../Header/HeaderServer';
import Footer from '../Footer';

const ForntLayout = () => {
  return (
    <main>
      <div className="w-full h-full">
        <HeaderServer />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default ForntLayout;
