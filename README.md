# ✨ Heavenly - Biblical AI Companion

A sophisticated AI companion that discusses Biblical theology, scripture, and theological questions with smooth animations and elegant design.

## Features

- 🙏 **Biblical Expertise**: Only discusses theological and biblical topics
- 📖 **Scripture Integration**: Automatically references relevant Bible verses
- 💾 **Chat History**: Saves all conversations locally for future reference
- ⚡ **Smart Caching**: Recognizes similar questions and reuses previous responses
- ✨ **Smooth Animations**: Beautiful Framer Motion animations throughout
- 🎨 **Dark Theme**: Black background with golden accents and glowing effects
- 🎤 **Voice-Ready**: Chat bubbles optimized for potential voice integration
- 📱 **Responsive**: Works seamlessly on desktop and mobile

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn

### Environment Configuration

1. Clone the repository
2. Create a `.env` file in the root directory
3. Add your API keys:

```
VITE_API_BIBLE_KEY=your_bible_api_key
VITE_LLM_API_KEY=your_openai_api_key
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will start on `http://localhost:5173`

### Build

```bash
npm run build
```

## How It Works

1. **Splash Screen**: 4-second animated intro featuring the Heavenly logo
2. **Question Filter**: Only biblical/theological questions are processed
3. **Scripture Lookup**: Uses Bible API to find relevant verses
4. **LLM Processing**: Sends question + verse to OpenAI for theological response
5. **Chat History**: Saves to localStorage for future reference
6. **Smart Matching**: Recognizes similar questions within 1 second to 10 minutes

## API Keys Required

- **Bible API**: Get yours at [scripture.api.bible](https://scripture.api.bible)
- **LLM (OpenAI)**: Get yours at [openai.com](https://openai.com)

## Architecture

- **Frontend**: React + Vite
- **Animations**: Framer Motion
- **Styling**: Pure CSS with gradient effects
- **Storage**: Browser localStorage
- **APIs**: Bible API + OpenAI GPT

## Technologies

- React 18
- Vite
- Framer Motion
- Axios
- CSS3 Animations
