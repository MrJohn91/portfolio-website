# 🧠 plan.md — AI Portfolio Website & Voice Agent

## 🎯 Project Goal
Build an **AI-powered personal portfolio website** for **John Igbokwe**, where recruiters can explore his background, projects, and achievements interactively.  
The site features a **voice-enabled AI agent** that speaks in John’s cloned voice and answers questions about his experience — powered by **Google Gemini (via ADK)** and data synced from **Notion**.
use the gogle adk refrnce folder to refrence how you build with google adk and the documentaion link is on lesson 6 notbook.
check the resume pdf to learn about me. 

---

## 🏗️ System Overview
### Objective
Create a dynamic, intelligent, and engaging portfolio that blends personal branding with AI.

### Core Capabilities
1. 🌍 **Frontend:** Next.js + TailwindCSS + shadcn/ui
2. 🧠 **AI Agent:** Google Gemini via ADK
3. 🔗 **Data Source:** Notion (resume & bio), connected via MCP
4. 🗣️ **Voice Agent:** Custom cloned voice for conversational interaction
5. 📄 **Résumé Download:** PDF version available for recruiters
6. 💻 **Projects Showcase:** 3–4 featured GitHub repositories with short summaries and links using the available mcp i have to accesss my github. ask me and i will provide the 3 or 4 projects we will select
7. 📊 **Analytics:** (optional) track interactions and engagement

---

## 🧩 Functional Requirements

### 1. Website Frontend
**Stack:**  
- Framework: Next.js (latest)  
- Styling: TailwindCSS + shadcn/ui  check the mcp for shadcn components and also check kibo ui mcp incase to make the website nice.
- Hosting: Vercel  

**Sections:**
- **Hero Section:**  
  - Greeting: “Hi, I’m John — AI & Data Engineer based in Germany.”  
  - Voice agent intro + interactive chat/voice button  
- **About Section:**  
  - Bio pulled dynamically from Notion  
- **Projects Section:**  
  - Display 3–4 top GitHub projects with brief descriptions and repo links  
- **Resume Section:**  
  - Embedded preview + “Download PDF” button  
- **Contact Section:**  
  - Email and LinkedIn buttons  
  - Optional “Ask my AI agent about me” interaction  

---

### 2. AI Agent System
**Stack & Tools:**  
- Google Gemini via **Google ADK**  
- MCP integration with Notion (for dynamic data sync)  
- Custom voice cloning model for personalized responses  
- Optional Whisper (speech-to-text) for voice input  

**Capabilities:**
- Respond to questions about John’s skills, background, or projects  
- Pull latest résumé details from Notion when updated  
- Use prompt templates for consistent, context-aware replies  
- Allow both text and voice interaction  

---

### 3. Data Source & Context Management
- **Primary Source:** Notion database with John’s résumé, skills, education, and projects  
- **Integration:** MCP (Model Context Protocol) keeps AI context up to date  
- **Backup:** Local JSON fallback in case Notion API is unavailable  
- **Security:** API tokens stored in environment variables (never exposed on client side)

---

### 4. Voice System
- **Voice Cloning:** Trained voice model (John’s voice)
- **Input Options:** Microphone or chat text box  
- **Output:** Real-time voice and/or on-screen responses  
- **Fallback:** Text-only mode if voice API unavailable  

---

## ⚙️ Non-Functional Requirements
- **Responsive Design:** Works on desktop and mobile  
- **Privacy:** No user data collection without consent  
- **Performance:** Lazy load non-critical assets  
- **Accessibility:** ARIA labels, keyboard navigation, transcripts for voice  
- **Security:** Environment variables for API keys, HTTPS only  

---

## 🧱 Architecture Overview

## 🚀 Deployment
- **Hosting:** Vercel (for static + dynamic routes)
- **Database:** Notion (no separate DB required) check required the mcp tools you have
- **Voice Model Hosting:** External API or cloud function
- **CI/CD:** GitHub Actions or Vercel automatic deployments

## 🤖 Agent Capabilities (User-Facing)

- **Answer recruiter questions** about:
  - Education  
  - Experience  
  - Projects  
  - Technologies  
  - Availability  
  - Visa status  
  - Rates  

- **Provide short summaries** for each pinned GitHub project, including:
  - Tech stack used  
  - Role in the project  
  - Link to the repository  

- **Offer helpful actions**, such as:
  - Sending John’s latest **resume PDF**  
  - Scheduling a **quick call** via embedded **Calendly link**

- **Respond in John’s cloned voice**, allowing visitors to:
  - Listen to AI-generated answers in natural speech  
  - Toggle **voice on/off** for accessibility or preference  

- **Fallback behavior**:
  - When the agent is uncertain or data is missing, it responds politely and transparently:
    > “I’m not sure — I can send the resume or link you to the project details.”

- **Tone and personality**:
  - Professional yet approachable  
  - Reflective of John’s authentic communication style  
  - Focused on clarity, relevance, and recruiter-friendly responses  


---

## 🧰 Future Enhancements
- Add analytics dashboard for recruiter interactions  
- Enable multi-language responses (EN/DE)  
- Integrate calendar booking (e.g., “Book a call with John”)  i have the calnder system i will provide the link    