const STORAGE_KEY = 'heavenly_chats';

export const saveChat = (chatEntry) => {
  const chats = loadChats();
  chats.push(chatEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

export const loadChats = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const findSimilarChat = (newQuestion, chats) => {
  if (!chats.length) return null;

  const normalize = (str) => str.toLowerCase().trim();
  const newWords = normalize(newQuestion).split(/\s+/);

  let bestMatch = null;
  let highestScore = 0;

  chats.forEach(chat => {
    const chatWords = normalize(chat.question).split(/\s+/);
    const matchingWords = newWords.filter(word => chatWords.includes(word));
    const score = matchingWords.length / Math.max(newWords.length, chatWords.length);

    if (score > 0.4 && score > highestScore) {
      highestScore = score;
      bestMatch = chat;
    }
  });

  return bestMatch;
};
