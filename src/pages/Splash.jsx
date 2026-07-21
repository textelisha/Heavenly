import { motion } from 'framer-motion';

function Splash() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  const glow = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(255, 215, 0, 0.3)',
        '0 0 40px rgba(255, 215, 0, 0.6)',
        '0 0 20px rgba(255, 215, 0, 0.3)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div
      className="splash"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="splash-content" variants={itemVariants}>
        <motion.svg
          className="logo"
          viewBox="0 0 200 200"
          variants={glow}
          animate="animate"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="95" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" />

          <g filter="url(#glow)">
            <path
              d="M 60 80 Q 50 60 40 80 Q 45 100 60 110 Q 70 95 70 80"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 60 80 Q 55 65 50 75"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 60 80 Q 60 60 55 70"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 60 80 Q 65 60 70 75"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 60 85 Q 60 100 65 95"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 60 85 Q 50 105 55 95"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M 140 80 Q 150 60 160 80 Q 155 100 140 110 Q 130 95 130 80"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 140 80 Q 145 65 150 75"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 140 80 Q 140 60 145 70"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 140 80 Q 135 60 130 75"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 140 85 Q 140 100 135 95"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 140 85 Q 150 105 145 95"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </motion.svg>

        <motion.h1
          className="splash-title"
          variants={itemVariants}
          animate={{
            letterSpacing: ['0px', '2px', '0px']
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          HEAVENLY
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}

export default Splash;
