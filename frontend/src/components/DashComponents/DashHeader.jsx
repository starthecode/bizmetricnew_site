import { UserProfile } from '../Header/UserProfile';

export const DashHeader = () => {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between border-b sticky inset-x-0 top-0 z-20">
      {/* Left Side: Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-gray-100 rounded-full flex items-center justify-center p-2">
          <img className="w-8 h-8 object-contain" src="/assets/imgs/logo.png" />
        </div>

        <div>
          <h1 className="text-lg font-semibold">Bizmetric</h1>
          <p className="text-sm text-gray-500">www.bizmetric.com</p>
        </div>
      </div>

      {/* Center: Navigation */}
      {/* <nav className="flex space-x-6">
        <a
          href="#"
          className="text-gray-700 hover:text-black text-sm font-medium"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-black text-sm font-medium"
        >
          Docs
        </a>
        <a
          href="#"
          className="text-gray-700 hover:text-black text-sm font-medium"
        >
          Support
        </a>
      </nav> */}

      {/* Right Side: Profile Image */}
      <div>
        <UserProfile />
      </div>
    </header>
  );
};
