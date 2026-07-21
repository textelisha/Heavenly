# ✨ Heavenly - Biblical AI Companion

A sophisticated AI companion that discusses Biblical theology, scripture, and theological questions with smooth animations and elegant design. Hosted on Vercel with Gemini API integration.

## Features

- 🙏 **Biblical Expertise**: Only discusses theological and biblical topics
- 📖 **Scripture Integration**: Automatically references relevant Bible verses
- 💾 **Chat History**: Saves all conversations locally for future reference
- ⚡ **Smart Caching**: Recognizes similar questions and reuses previous responses
- ✨ **Smooth Animations**: Beautiful Framer Motion animations throughout
- 🎨 **Dark Theme**: Black background with golden accents and glowing effects
- 🎤 **Voice-Ready**: Chat bubbles optimized for potential voice integration
- 📱 **Responsive**: Works seamlessly on desktop and mobile
- 🚀 **Vercel Deployed**: Production-ready hosting

## Setup

### Prerequisites
- Git
- Vercel account (free at vercel.com)
- API keys for:
  - Bible API (scripture.api.bible)
  - Google Gemini API (ai.google.dev)

### Deploy to Vercel

1. Fork or clone this repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import this repository
4. Add Environment Variables in Vercel dashboard:
   ```
   VITE_API_BIBLE_KEY=your_bible_api_key
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
5. Click Deploy

### Local Development (Optional)

1. Clone the repository
2. Create `.env` file with your API keys
3. Install: `npm install`
4. Run: `npm run dev`

## How It Works

1. **Splash Screen**: 4-second animated intro with glowing Heavenly logo
2. **Question Filter**: Only biblical/theological questions are processed
3. **Scripture Lookup**: Uses Bible API to find relevant verses
4. **Gemini Processing**: Sends question + verse to Google Gemini for theological response
5. **Chat History**: Saves to localStorage for future reference
6. **Smart Matching**: Recognizes similar questions within 1 second to 10 minutes

## API Keys

- **Bible API**: Get yours at [scripture.api.bible](https://scripture.api.bible)
- **Gemini API**: Get yours at [ai.google.dev](https://ai.google.dev)

## Architecture

- **Frontend**: React 18 + Vite
- **Animations**: Framer Motion
- **Styling**: Pure CSS with gradient effects
- **Storage**: Browser localStorage
- **APIs**: Bible API + Google Gemini
- **Hosting**: Vercel

## Technologies

- React 18
- Vite
- Framer Motion
- Axios
- CSS3 Animations
- Vercel CLI (optional)
