import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import LoadingAnimation from '../components/LoadingAnimation';
import { saveChat, loadChats, findSimilarChat } from '../utils/chatStorage';
import { queryBibleAPI } from '../utils/bibleApi';
import { queryLLM } from '../utils/llmApi';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedChats = loadChats();
    setChats(savedChats);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isBiblicalQuestion = (text) => {
    const biblicalKeywords = [
      'bible', 'jesus', 'god', 'testament', 'gospel', 'scripture', 'holy',
      'christ', 'faith', 'sin', 'salvation', 'prayer', 'heaven', 'hell',
      'paradise', 'resurrection', 'trinity', 'messiah', 'prophecy', 'psalm',
      'proverb', 'sermon', 'apostle', 'disciple', 'prophet', 'angel',
      'demon', 'satan', 'eternal', 'blessed', 'covenant', 'exodus', 'genesis',
      'revelation', 'corinthians', 'romans', 'matthew', 'mark', 'luke', 'john',
      'theological', 'doctrine', 'theology', 'biblical', 'spiritual', 'righteous'
    ];
    return biblicalKeywords.some(keyword => text.toLowerCase().includes(keyword));
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    if (!isBiblicalQuestion(messageText)) {
      const userMessage = { id: Date.now(), text: messageText, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);

      const botMessage = {
        id: Date.now() + 1,
        text: 'I only discuss Biblical theological questions and scripture. Please ask me something about the Bible, faith, theology, or related spiritual topics.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
      return;
    }

    const userMessage = { id: Date.now(), text: messageText, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    scrollToBottom();

    try {
      const similarChat = findSimilarChat(messageText, chats);

      if (similarChat && similarChat.response) {
        const botMessage = {
          id: Date.now() + 1,
          text: similarChat.response,
          sender: 'bot',
          timestamp: new Date(),
          scripture: similarChat.scripture
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const bibleVerse = await queryBibleAPI(messageText);
        const llmResponse = await queryLLM(messageText, bibleVerse);

        const botMessage = {
          id: Date.now() + 1,
          text: llmResponse.answer,
          sender: 'bot',
          timestamp: new Date(),
          scripture: llmResponse.scripture || bibleVerse
        };
        setMessages(prev => [...prev, botMessage]);

        const chatEntry = {
          id: Date.now(),
          question: messageText,
          response: llmResponse.answer,
          scripture: llmResponse.scripture || bibleVerse,
          timestamp: new Date()
        };
        saveChat(chatEntry);
        setChats(prev => [...prev, chatEntry]);
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'I encountered an issue processing your question. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="chat-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="chat-header" initial={{ y: -50 }} animate={{ y: 0 }}>
        <svg className="header-logo" viewBox="0 0 100 100" width="40" height="40">
          <defs>
            <filter id="glowHeader">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowHeader)">
            <path
              d="M 30 40 Q 25 30 20 40 Q 23 50 30 55 Q 35 47 35 40"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 30 40 Q 27 32 25 37"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M 30 42 Q 30 50 33 47"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M 70 40 Q 75 30 80 40 Q 77 50 70 55 Q 65 47 65 40"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M 70 40 Q 73 32 75 37"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M 70 42 Q 70 50 67 47"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </g>
        </svg>
        <h1>HEAVENLY</h1>
      </motion.div>

      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: index * 0.1 }}
            >
              <ChatMessage message={message} />
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && <LoadingAnimation />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
    </motion.div>
  );
}

export default Chat;
