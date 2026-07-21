export const queryBibleAPI = async (question) => {
  try {
    const apiKey = import.meta.env.VITE_API_BIBLE_KEY;
    if (!apiKey) {
      console.error('Bible API key not configured');
      return 'Genesis 1:1';
    }

    const response = await fetch(
      `https://api.scripture.api.bible/v1/search?query=${encodeURIComponent(question)}`,
      {
        headers: {
          'api-key': apiKey
        }
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.data && data.data.verses && data.data.verses.length > 0) {
      const verse = data.data.verses[0];
      return `${verse.reference}`;
    }

    return null;
  } catch (error) {
    console.error('Bible API error:', error);
    return null;
  }
};
