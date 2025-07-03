// components/DashboardLayout.jsx

import { Outlet } from 'react-router-dom';
import { DashSidebar } from './DashSidebar';
import { DashHeader } from './DashHeader';

const DashboardLayout = () => {
  return (
    <main>
      <DashHeader />
      <div className="flex">
        <DashSidebar />
        <div className="w-full h-screen overflow-y-auto">
          <div className="absolute h-[200px] inset-0 -top-[125px] opacity-20 blur bg-conic-gradient"></div>
          <div className="p-10">
            <Outlet /> {/* This is where nested dashboard pages render */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
