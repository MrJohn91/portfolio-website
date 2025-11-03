# AI-Powered Portfolio Website - John Igbokwe

A modern, interactive portfolio website featuring an AI voice agent that enables real-time voice conversations with visitors. Built with LiveKit Agents Framework and Next.js, showcasing professional experience, projects, and skills through dynamic content from Notion CMS and GitHub.

## 📋 Overview

This portfolio website demonstrates a complete AI-powered voice interface where recruiters and potential employers can have natural voice conversations with an AI agent representing John Igbokwe. The agent can answer questions about experience, skills, projects, and provide real-time information from integrated data sources.

### Purpose

The primary goal is to create an engaging, interactive portfolio experience that:
- **Enables Voice Interaction**: Visitors can speak directly with an AI agent instead of just reading static content
- **Showcases Technical Skills**: Demonstrates expertise in AI/ML, real-time systems, and modern web development
- **Provides Dynamic Information**: Pulls live data from Notion CMS and GitHub to ensure content is always up-to-date
- **Offers Multi-language Support**: Supports both English and German languages
- **Demonstrates Production Readiness**: Built with production-grade tools (LiveKit Cloud, Vercel) for scalability and reliability

### Key Features

- 🎙️ **Real-time Voice Conversations**: Natural voice interaction using AI voice agent with John's cloned voice
- 🧠 **Intelligent Responses**: Powered by GPT-4o-mini with context-aware answers about experience and projects
- 📊 **Dynamic Content**: Automatic updates from Notion CMS and GitHub repositories
- 🌍 **Multi-language Support**: English and German language interface
- 🎨 **Modern UI/UX**: Beautiful, responsive design with 3D Orb visualization showing agent state
- ⚡ **Real-time Audio**: Low-latency voice conversations powered by LiveKit
- 🔗 **Integrated Data Sources**: Notion (portfolio data) and GitHub (project information)

### Use Cases

- Recruiters exploring John's experience and skills
- Potential employers wanting to learn about projects and achievements
- Technical professionals interested in the implementation approach
- Anyone wanting to have a natural conversation about John's background

## 🔄 Why LiveKit Agents Instead of ADK?

**Problem:** Initially built with Google ADK (Agent Development Kit) using Gemini models.

**Issues Encountered:**
1. **Conversation History Tracking**: ADK exposes message history easily, but LiveKit Agents framework doesn't provide built-in conversation tracking
2. **Deployment Complexity**: ADK deployment requires more configuration and has less documentation for production use
3. **Voice Quality**: ADK's voice synthesis was less natural compared to LiveKit's integration with ElevenLabs
4. **Community Support**: LiveKit has better documentation and active community for voice agent development
5. **Tool Integration**: LiveKit's function tool system is more straightforward for integrating external APIs (Notion, GitHub)

**Solution:** Switched to LiveKit Agents Framework which provides:
- ✅ Better voice quality with ElevenLabs integration
- ✅ Simpler deployment process with LiveKit Cloud
- ✅ Active community and comprehensive documentation
- ✅ Better real-time audio handling
- ✅ Proven production deployment

**Trade-offs:**
- ❌ Lost automatic conversation message tracking (workaround: save contact info only)
- ✅ Gained better voice quality and production readiness

## 🏗️ Architecture

### Backend (Python + LiveKit)
- **AI Agent**: LiveKit Agents Framework with OpenAI Whisper, GPT-4o-mini, ElevenLabs
- **Voice**: Real-time voice conversation with John's cloned voice
- **Data**: Notion CMS + GitHub integration
- **Server**: LiveKit Agent on LiveKit Cloud

### Frontend (Next.js + TypeScript)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Voice UI**: LiveKit React components with 3D Orb visualization
- **CMS Display**: Dynamic Notion data rendering

## 🚀 Setup

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Local testing with LiveKit
livekit-server --dev  # In separate terminal
lk agent dev  # In backend directory
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
- **LiveKit**: API Key, API Secret, Server URL
- **ElevenLabs**: API Key + Voice ID (John's cloned voice)
- **OpenAI**: API Key (for Whisper STT and GPT-4o-mini LLM)
- **Notion**: API Key + Database IDs (Portfolio + Conversations)
- **GitHub**: Personal Access Token
- **Google Gemini**: API Key (optional, for backup ADK agent)

## 🧠 AI Agent Features

- Answer questions about experience, skills, and projects
- Real-time voice conversations
- Dynamic data from Notion and GitHub
- Multi-language support (EN/DE)

## 📚 Tech Stack

- **Backend**: Python, LiveKit Agents Framework
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Framer Motion
- **AI/ML**: OpenAI GPT-4o-mini (LLM), OpenAI Whisper (STT), ElevenLabs (TTS), ElevenLabs Orb Visualization
- **Voice**: LiveKit (real-time audio), Silero VAD
- **CMS**: Notion
- **Deployment**: Vercel (Frontend) + LiveKit Cloud (Backend)

## 📖 Documentation

- [LiveKit Agents Docs](https://docs.livekit.io/agents/start/)
- [LiveKit Python SDK](https://github.com/livekit/python-sdks)

