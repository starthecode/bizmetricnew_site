import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div className="flex flex-col mt-1 mb-1 xl:mt-2 w-[200px] h-[70px]">
      {/* Top "bm" part */}
      <Link to={window.location.origin} className="flex flex-col">
        <div className="flex items-center">
          <motion.span
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 10,
              marginRight: '-10px', // tighter spacing
            }}
          >
            <img
              className="flex w-[40px] h-[40px] object-contain"
              src="/assets/imgs/logopart1.png"
              alt="logo"
            />
          </motion.span>

          <motion.span
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              marginTop: '11px',
            }}
          >
            <img
              className="flex w-[40px] h-[40px] object-contain"
              src="/assets/imgs/logopart2.png"
              alt="logo"
            />
          </motion.span>
        </div>
        {/* BIZMETRIC text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          style={{
            marginTop: '-25px',
            marginLeft: '8px', // visually match your image
          }}
        >
          <img
            className="flex w-[60px] h-[60px] object-contain"
            src="/assets/imgs/logopart3.png"
            alt="logo"
          />
        </motion.div>
      </Link>
    </div>
  );
};
