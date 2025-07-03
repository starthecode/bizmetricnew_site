import React from 'react';

const NumericLoader = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame += 1;
      const progress = Math.min(Math.round((frame / totalFrames) * 100), 100);
      setCount(progress);
      if (progress === 100) clearInterval(interval);
    }, 20); // ~1.2s

    return () => clearInterval(interval);
  }, []);

  return <span>{count}%</span>;
};

export default NumericLoader;
