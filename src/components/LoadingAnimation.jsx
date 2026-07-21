import { motion } from 'framer-motion';

function LoadingAnimation() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        repeat: Infinity
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [-8, 0, -8],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.8,
        repeat: Infinity
      }
    }
  };

  return (
    <motion.div className="loading-container" variants={containerVariants} animate="animate">
      <motion.div className="loading-dot" variants={dotVariants} />
      <motion.div className="loading-dot" variants={dotVariants} />
      <motion.div className="loading-dot" variants={dotVariants} />
    </motion.div>
  );
}

export default LoadingAnimation;
