import { motion } from 'framer-motion';

function ChatMessage({ message }) {
  const bubbleVariants = {
    initial: { scale: 0.8, opacity: 0, x: message.sender === 'user' ? 50 : -50 },
    animate: { scale: 1, opacity: 1, x: 0 },
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div className={`message ${message.sender}`} variants={bubbleVariants} initial="initial" animate="animate">
      <motion.div
        className="bubble"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {message.text.split('').map((char, i) => (
          <motion.span key={i} variants={charVariants}>
            {char}
          </motion.span>
        ))}
        {message.scripture && (
          <motion.div
            className="scripture-ref"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            📖 {message.scripture}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default ChatMessage;
