import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Splash from './pages/Splash';
import Chat from './pages/Chat';

function App() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {!showChat ? (
          <Splash key="splash" />
        ) : (
          <Chat key="chat" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
