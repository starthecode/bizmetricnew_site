import BackgroundSection from './components/BackgroundSection';

const NotFound = () => {
  return (
    <BackgroundSection>
      <div className="text-center py-40">
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="mt-4 text-woodsmoke-300">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </div>
    </BackgroundSection>
  );
};

export default NotFound;
