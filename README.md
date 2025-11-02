# AI-Powered Portfolio Website - John Igbokwe

Modern portfolio website with AI voice agent powered by Google Gemini ADK (Python) and Next.js frontend.

## 🏗️ Architecture

### Backend (Python + ADK)
- **AI Agent**: Google ADK with Gemini 2.0 Flash
- **Voice**: ElevenLabs voice cloning
- **Data**: Notion CMS + GitHub MCP
- **API**: FastAPI server

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Voice UI**: Real-time voice chat interface
- **CMS Display**: Dynamic Notion data rendering

## 🚀 Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add your API keys
npm run dev
```

## 📋 Environment Variables

See `.env.example` for required API keys:
- Google Gemini API Key
- ElevenLabs API Key + Voice ID
- Notion API Key + Database ID
- GitHub Token
- OpenAI API Key (for Whisper)

## 🧠 AI Agent Features

- Answer questions about experience, skills, and projects
- Real-time voice conversations
- Dynamic data from Notion and GitHub
- Multi-language support (EN/DE)

## 📚 Tech Stack

- **Backend**: Python, Google ADK, FastAPI, Pydantic
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **AI/ML**: Google Gemini 2.0, ElevenLabs, OpenAI Whisper
- **CMS**: Notion
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

## 📖 Documentation

- [Google ADK Python Docs](https://github.com/google/adk-python)
- Lesson notebooks in `/google_adk_refrence` folder

