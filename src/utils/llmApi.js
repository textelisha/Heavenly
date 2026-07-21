export const queryLLM = async (question, bibleVerse) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('Gemini API key not configured');
      return { answer: 'Unable to process your question at this time.', scripture: bibleVerse };
    }

    const systemPrompt = `You are Heavenly, a biblical theological AI assistant. You provide thoughtful, scripture-based answers to theological questions. Always cite relevant Bible verses and discuss biblical concepts with theological depth. Keep responses clear, concise, and respectful.`;

    const userPrompt = `Answer this biblical/theological question: ${question}${bibleVerse ? ` Consider this verse: ${bibleVerse}` : ''}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: systemPrompt },
                { text: userPrompt }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
          }
        })
      }
    );

    if (!response.ok) {
      return { answer: 'I could not generate a response to your question.', scripture: bibleVerse };
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to process your question.';

    return {
      answer,
      scripture: bibleVerse
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    return { answer: 'An error occurred while processing your question.', scripture: bibleVerse };
  }
};
