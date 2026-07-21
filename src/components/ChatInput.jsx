import { useState } from 'react';
import { motion } from 'framer-motion';

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const inputVariants = {
    focus: { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
    blur: { boxShadow: '0 0 0px rgba(255, 215, 0, 0)' }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="input-form">
      <motion.input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about Biblical theology, scripture, faith..."
        disabled={disabled}
        variants={inputVariants}
        onFocus={() => {}} 
        className="input-field"
      />
      <motion.button
        type="submit"
        disabled={disabled || !input.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="send-button"
      >
        {disabled ? '...' : '✨'}
      </motion.button>
    </motion.form>
  );
}

export default ChatInput;
