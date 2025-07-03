import React from 'react';
import { Poll } from './Poll';

export const PollBase = () => {
  const [shouldHide, setShouldHide] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const hideHeight = 1138; // Adjust this value based on your needs

      if (scrollPosition > hideHeight) {
        setShouldHide(true);
      } else {
        setShouldHide(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <span className={`${shouldHide ? 'hidden' : ''}`}>
      <Poll />
    </span>
  );
};
