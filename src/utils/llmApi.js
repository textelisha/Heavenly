export const queryLLM = async (question, bibleVerse) => {
  try {
    const apiKey = import.meta.env.VITE_LLM_API_KEY;
    if (!apiKey) {
      console.error('LLM API key not configured');
      return { answer: 'Unable to process your question at this time.', scripture: bibleVerse };
    }

    const systemPrompt = `You are Heavenly, a biblical theological AI assistant. You provide thoughtful, scripture-based answers to theological questions. Always cite relevant Bible verses and discuss biblical concepts with theological depth. Keep responses clear, concise, and respectful.`;

    const userPrompt = `Answer this biblical/theological question: ${question}${bibleVerse ? ` Consider this verse: ${bibleVerse}` : ''}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      return { answer: 'I could not generate a response to your question.', scripture: bibleVerse };
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'Unable to process your question.';

    return {
      answer,
      scripture: bibleVerse
    };
  } catch (error) {
    console.error('LLM API error:', error);
    return { answer: 'An error occurred while processing your question.', scripture: bibleVerse };
  }
};
