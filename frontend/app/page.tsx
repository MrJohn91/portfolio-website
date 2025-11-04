"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { VoiceChat } from "@/components/voice-chat"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ParticleBackground } from "@/components/particle-background"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

export default function Home() {
  const { language } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen relative">
      <ParticleBackground />
      {/* Fixed Header */}
      <div className={`fixed inset-x-0 top-0 z-50 p-[--space] transition-transform duration-350 ${
        scrolled ? "translate-y-0" : "translate-y-0"
      }`}>
        <div className="min-h-[--header-h] py-2 md:py-0 md:h-[--header-h] flex items-center justify-center md:justify-between gap-[--space] max-w-[--maxw] mx-auto px-[--space] border border-[--border] rounded-full backdrop-blur-md bg-[--surface]/70 shadow-[0_0_0_1px_var(--ring)_inset,0_10px_30px_-20px_rgba(0,0,0,0.6)]">
          <a href="#hero" className="px-3 py-1.5 text-purple-300 font-bold tracking-wider border border-[--border] rounded-full hidden md:block">
            JI
          </a>
          <nav className="flex items-center gap-[clamp(4px,1vw,12px)] flex-wrap justify-center text-xs md:text-base">
            <a href="#hero" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "home")}
            </a>
            <a href="#about" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "about")}
            </a>
            <a href="#experience" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "experience")}
            </a>
            <a href="#skills" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "skillsTitle")}
            </a>
            <a href="#projects" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "projectsTitle")}
            </a>
            <a href="#agent" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "talkToMe")}
            </a>
            <a href="#contact" className="px-1.5 py-1 md:px-2.5 md:py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              {getTranslation(language, "contact")}
            </a>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-[calc(100svh-var(--header-h)-var(--space)*2)] grid place-items-center max-w-[--maxw] mx-auto px-[--space] py-[12vh] text-center relative z-10">
        <div className="space-y-6">
          <h1 className="gradient-text text-[clamp(2.5rem,6vw,4.5rem)] leading-tight tracking-tight font-bold">
            John Igbokwe
          </h1>
          <p className="max-w-[60ch] mx-auto text-[clamp(1.1rem,2.5vw,1.3rem)] text-gray-400 font-normal">
            {getTranslation(language, "description")}
          </p>
          <div className="flex justify-center flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#64FFDA] via-purple-500 to-blue-400 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 no-underline"
            >
              {getTranslation(language, "viewProjects")}
            </a>
            <a
              href="/resume.pdf"
              download="John_Igbokwe_Resume.pdf"
              className="inline-flex items-center px-8 py-4 bg-transparent border border-[rgba(255,255,255,0.2)] text-white rounded-2xl font-semibold hover:border-[#64FFDA] hover:bg-[rgba(100,255,218,0.1)] hover:scale-105 transition-all duration-300 no-underline"
            >
              {getTranslation(language, "downloadCV")}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-[--maxw] mx-auto px-[--space] pt-20 pb-12 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-16 text-[#38BDF8]">{getTranslation(language, "aboutTitle")}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="mb-4 text-[--muted] leading-relaxed text-lg">
              {getTranslation(language, "about1")}
            </p>
            <p className="text-[--muted] leading-relaxed text-lg">
              {getTranslation(language, "about2")}
            </p>
          </div>
          <div className="relative w-full aspect-square rounded-[--radius] overflow-hidden border border-[--border]">
            <Image
              src="/profile.jpg"
              alt="John Igbokwe"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="max-w-[--maxw] mx-auto px-[--space] pt-12 pb-20 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-12 text-[--text]">{getTranslation(language, "experienceTitle")}</h2>
        <div className="space-y-8">
          {/* Pluto's Tech */}
          <article className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{getTranslation(language, "plutosCompany")}</h3>
                <p className="text-[#38BDF8] font-medium mb-2">{getTranslation(language, "plutosRole")}</p>
                <p className="text-[--muted] text-sm">{getTranslation(language, "plutosLocation")}</p>
              </div>
            </div>
            <ul className="space-y-2 text-[--muted] leading-relaxed">
              <li>• {getTranslation(language, "plutosBullet1")}</li>
              <li>• {getTranslation(language, "plutosBullet2")}</li>
              <li>• {getTranslation(language, "plutosBullet3")}</li>
              <li>• {getTranslation(language, "plutosBullet4")}</li>
            </ul>
          </article>

          {/* Univacity */}
          <article className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{getTranslation(language, "univacityCompany")}</h3>
                <p className="text-[#38BDF8] font-medium mb-2">{getTranslation(language, "univacityRole")}</p>
                <p className="text-[--muted] text-sm">{getTranslation(language, "univacityLocation")}</p>
              </div>
            </div>
            <ul className="space-y-2 text-[--muted] leading-relaxed">
              <li>• {getTranslation(language, "univacityBullet1")}</li>
              <li>• {getTranslation(language, "univacityBullet2")}</li>
              <li>• {getTranslation(language, "univacityBullet3")}</li>
              <li>• {getTranslation(language, "univacityBullet4")}</li>
              <li>• {getTranslation(language, "univacityBullet5")}</li>
            </ul>
          </article>

          {/* Schnellecke GmbH */}
          <article className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{getTranslation(language, "schnelleckeCompany")}</h3>
                <p className="text-[#38BDF8] font-medium mb-2">{getTranslation(language, "schnelleckeRole")}</p>
                <p className="text-[--muted] text-sm">{getTranslation(language, "schnelleckeLocation")}</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-[--muted] leading-relaxed">
              <li>• {getTranslation(language, "schnelleckeBullet1")}</li>
              <li>• {getTranslation(language, "schnelleckeBullet2")}</li>
              <li>• {getTranslation(language, "schnelleckeBullet3")}</li>
              <li>• {getTranslation(language, "schnelleckeBullet4")}</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Data Engineering", "Data Integration", "Operational Efficiency", "Data Documentation"].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>

          {/* Hytel Communications */}
          <article className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{getTranslation(language, "hytelCompany")}</h3>
                <p className="text-[#38BDF8] font-medium mb-2">{getTranslation(language, "hytelRole")}</p>
                <p className="text-[--muted] text-sm">{getTranslation(language, "hytelLocation")}</p>
              </div>
            </div>
            <ul className="space-y-2 mb-4 text-[--muted] leading-relaxed">
              <li>• {getTranslation(language, "hytelBullet1")}</li>
              <li>• {getTranslation(language, "hytelBullet2")}</li>
              <li>• {getTranslation(language, "hytelBullet3")}</li>
              <li>• {getTranslation(language, "hytelBullet4")}</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Cloud", "Network Solutions", "IT Architecture", "Technical Support"].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-12 text-[#38BDF8]">{getTranslation(language, "skillsTitle")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsFrontend")}</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js 14", "TypeScript", "Tailwind CSS", "React", "shadcn/ui", "Framer Motion", "ESLint"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsBackend")}</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "FastAPI", "Google Gemini ADK", "Pydantic", "Flask"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI/ML */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsAIML")}</h3>
            <div className="flex flex-wrap gap-2">
              {["Machine Learning", "NLP", "AI Agents", "AI Automation", "TensorFlow", "Keras", "PyTorch"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Data Engineering */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsDataEngineering")}</h3>
            <div className="flex flex-wrap gap-2">
              {["SQL", "Data Pipelines", "Power BI", "Streamlit", "Databricks", "Snowflake", "Azure Synapse"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsCloud")}</h3>
            <div className="flex flex-wrap gap-2">
              {["AWS", "GCP", "Azure", "Vercel", "Microsoft Fabrics"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsTools")}</h3>
            <div className="flex flex-wrap gap-2">
              {["Git", "Docker", "MySQL", "PostgreSQL", "MCP", "n8n", "ElevenLabs", "OpenAI Whisper"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[--text]">{getTranslation(language, "skillsSoftSkills")}</h3>
            <div className="flex flex-wrap gap-2">
              {["Mentoring", "Communication", "Problem Solving", "Adaptability"].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[--surface] text-[--text] rounded-full text-xs border border-[--border]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-12 text-[#38BDF8]">{getTranslation(language, "projectsTitle")}</h2>
        <div className="space-y-8">
          <article className="group">
            <h3 className="text-2xl font-semibold mb-2">Private Enterprise AI Agent</h3>
            <p className="text-[--muted] leading-relaxed mb-3">
              Self-hosted AI agent with secure private web search for complete data sovereignty. Enterprise-grade solution with SearXNG 
              integration, Supabase conversation storage, and OpenAI-compatible API. Deployed on GPU infrastructure with qwen2.5:7b and mistral:7b models. 
              Full compliance with GDPR, HIPAA, SOX regulations. Zero external data transmission.
            </p>
            <a 
              href="https://github.com/MrJohn91/ai_local_websearchtool" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-purple-300"
            >
              View Project →
            </a>
          </article>

          <article className="group">
            <h3 className="text-2xl font-semibold mb-2">Attribution Pipeline Orchestration</h3>
            <p className="text-[--muted] leading-relaxed mb-3">
              Automated marketing attribution pipeline using IHC model for multi-touch attribution. Orchestrated with Apache Airflow 
              for daily processing. Analyzes customer journeys across Initializer, Holder, and Closer phases. Built with Python, Pandas, 
              SQLite, and external Attribution API. Calculates ROAS and CPO metrics for data-driven marketing decisions.
            </p>
            <a 
              href="https://github.com/MrJohn91/Attribution-Pipeline-Orchestration" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-purple-300"
            >
              View Project →
            </a>
          </article>

          <article className="group">
            <h3 className="text-2xl font-semibold mb-2">Snowflake MCP Integration</h3>
            <p className="text-[--muted] leading-relaxed mb-3">
              Model Context Protocol (MCP) server for seamless Snowflake database integration. Enables AI agents 
              to query and analyze data through natural language. Built with Python, demonstrating advanced 
              LLM orchestration and data engineering.
            </p>
            <a 
              href="https://github.com/MrJohn91/snowflake-mcp-server-agent" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-purple-300"
            >
              View Project →
            </a>
          </article>

          <article className="group">
            <h3 className="text-2xl font-semibold mb-2">AI-Powered Portfolio Agent</h3>
            <p className="text-[--muted] leading-relaxed mb-3">
              A voice-enabled AI agent using Google ADK with Gemini 2.0. Features real-time conversation, 
              Notion CMS integration, GitHub project search, and ElevenLabs voice cloning. Built with Python, 
              Next.js, and Three.js for immersive 3D visualization.
            </p>
            <a 
              href="https://github.com/MrJohn91/portfolio-website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-white hover:text-purple-300"
            >
              View Project →
            </a>
          </article>
        </div>
      </section>

      {/* AI Agent Section */}
      <section id="agent" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <div className="text-center mb-12">
          <p className="mb-3 text-[--muted] text-sm uppercase tracking-widest">{getTranslation(language, "agentSubtitle")}</p>
          <h2 className="text-3xl font-bold mb-4 text-[#38BDF8]">{getTranslation(language, "agentTitle")}</h2>
          <p className="max-w-[52ch] mx-auto text-[--muted]">
            {getTranslation(language, "agentDescription")}
          </p>
        </div>
        <VoiceChat />
      </section>

      {/* Quick Stats */}
      <section className="max-w-[--maxw] mx-auto px-[--space] py-12 border-t border-[--border] relative overflow-hidden">
        {/* Faded color background effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.02) 2px,
                rgba(255, 255, 255, 0.02) 4px
              ),
              linear-gradient(
                90deg,
                rgba(56, 189, 248, 0.03) 0%,
                transparent 25%,
                transparent 50%,
                rgba(100, 255, 218, 0.03) 75%,
                transparent 100%
              ),
              radial-gradient(
                ellipse at 30% 50%,
                rgba(56, 189, 248, 0.05) 0%,
                transparent 50%
              ),
              radial-gradient(
                ellipse at 70% 50%,
                rgba(100, 255, 218, 0.05) 0%,
                transparent 50%
              )
            `,
            backgroundSize: '100% 100%, 200% 100%, 60% 100%, 60% 100%',
            backgroundPosition: '0 0, 0 0, 0 0, 100% 0'
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          <div>
            <div className="text-4xl font-bold mb-2 text-white">5+</div>
            <div className="text-[--muted]">{getTranslation(language, "yearsExperience")}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-white">5</div>
            <div className="text-[--muted]">{getTranslation(language, "industries")}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-white">10+</div>
            <div className="text-[--muted]">{getTranslation(language, "projects")}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-white">∞</div>
            <div className="text-[--muted]">{getTranslation(language, "alwaysLearning")}</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-[#38BDF8]">{getTranslation(language, "contactTitle")}</h2>
          <p className="text-[--muted]">{getTranslation(language, "contactDescription")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <a
            href="mailto:nfluncvjohn@gmail.com"
            className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CADCFC] to-[#A0B9D1] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0a0c12]">
                  <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/>
                  <path d="m22 8-10 6L2 8"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold mb-1">{getTranslation(language, "email")}</h3>
                <p className="text-[--muted] text-sm break-words">nfluncvjohn@gmail.com</p>
              </div>
            </div>
          </a>

          <a
            href="tel:+4915252331017"
            className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CADCFC] to-[#A0B9D1] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0a0c12]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold mb-1">{getTranslation(language, "phone")}</h3>
                <p className="text-[--muted] text-sm break-words">+49 152 5233 1017</p>
              </div>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/mrjigbokwe/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CADCFC] to-[#A0B9D1] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0a0c12]">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"/>
                  <rect x="2" y="9" width="4" height="12" rx="1"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold mb-1">{getTranslation(language, "linkedin")}</h3>
                <p className="text-[--muted] text-sm break-words">/in/mrjigbokwe</p>
              </div>
            </div>
          </a>

          <a
            href="https://github.com/MrJohn91"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-[--border] rounded-[--radius] bg-[--surface] hover:border-[--brand] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CADCFC] to-[#A0B9D1] flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#0a0c12]">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" strokeLinecap="round"/>
                  <path d="M9 18c-4.51 2-5-2-7-2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold mb-1">{getTranslation(language, "github")}</h3>
                <p className="text-[--muted] text-sm break-words">@MrJohn91</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[--maxw] mx-auto px-[--space] py-8 border-t border-[--border] text-center text-[--muted] text-sm">
        <p>{getTranslation(language, "copyright")}</p>
      </footer>
    </main>
  )
}

