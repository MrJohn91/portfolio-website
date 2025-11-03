"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { VoiceChat } from "@/components/voice-chat"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Fixed Header */}
      <div className={`fixed inset-x-0 top-0 z-50 p-[--space] transition-transform duration-350 ${
        scrolled ? "translate-y-0" : "translate-y-0"
      }`}>
        <div className="h-[--header-h] flex items-center justify-between gap-[--space] max-w-[--maxw] mx-auto px-[--space] border border-[--border] rounded-full backdrop-blur-md bg-[--surface]/70 shadow-[0_0_0_1px_var(--ring)_inset,0_10px_30px_-20px_rgba(0,0,0,0.6)]">
          <a href="#hero" className="px-3 py-1.5 text-[--brand] font-bold tracking-wider border border-[--border] rounded-full">
            JI
          </a>
          <nav className="flex gap-[clamp(10px,3vw,22px)]">
            <a href="#hero" className="px-2.5 py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              Home
            </a>
            <a href="#about" className="px-2.5 py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              About
            </a>
            <a href="#agent" className="px-2.5 py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              Talk to Me
            </a>
            <a href="#contact" className="px-2.5 py-2 rounded-[10px] text-[--muted] hover:text-[--text] hover:bg-white/5 hover:no-underline">
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-[calc(100svh-var(--header-h)-var(--space)*2)] grid place-items-center max-w-[--maxw] mx-auto px-[--space] py-[12vh] text-center relative z-10">
        <div>
          <p className="mb-3 text-[--muted] text-[clamp(0.9rem,1.5vw,1rem)] uppercase tracking-widest">
            AI & Data Engineer
          </p>
          <h1 className="gradient-text mb-2.5 text-[clamp(2rem,6vw,4rem)] leading-tight tracking-tight">
            John Igbokwe
          </h1>
          <p className="max-w-[52ch] mx-auto mb-7 text-[clamp(1rem,2vw,1.15rem)] text-[--muted]">
            I build intelligent systems that solve real-world problems across healthcare, education, finance, and logistics.
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-block px-4 py-3 bg-[--grad-135] text-[#0a0c12] border-transparent rounded-[--radius] font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)] hover:no-underline transition-all"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download="John_Igbokwe_Resume.pdf"
              className="inline-block px-4 py-3 border border-[--border] rounded-[--radius] bg-[#121523] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)] hover:no-underline transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-4 text-[--muted] leading-relaxed">
              Hey, I'm John - an AI & Data Engineer passionate about building intelligent systems that make a real impact. 
              With experience across multiple industries, I bring diverse expertise to every project.
            </p>
            <p className="mb-4 text-[--muted] leading-relaxed">
              When I'm not coding, I'm mentoring others in data/AI careers, playing FIFA, or traveling to explore new cultures. 
              Continuous learning and adaptability are what drive me.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "AI/ML", "Data Engineering", "Snowflake", 
                  "Databricks", "MCP", "LLM", "GenAI", "FastAPI", 
                  "Next.js", "TypeScript", "GitHub", "Notion",
                  "Cloud (AWS, GCP, Azure)"
                ].map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[--surface] text-[--text] rounded-full text-sm border border-[--border]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
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

      {/* Projects Section */}
      <section id="projects" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <h2 className="text-3xl font-bold mb-12">Projects</h2>
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
              className="text-[--brand] hover:text-[--accent] inline-flex items-center gap-1"
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
              className="text-[--brand] hover:text-[--accent] inline-flex items-center gap-1"
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
              href="https://github.com/MrJohn91" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[--brand] hover:text-[--accent] inline-flex items-center gap-1"
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
              className="text-[--brand] hover:text-[--accent] inline-flex items-center gap-1"
            >
              View Project →
            </a>
          </article>
        </div>
      </section>

      {/* AI Agent Section */}
      <section id="agent" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <div className="text-center mb-12">
          <p className="mb-3 text-[--muted] text-sm uppercase tracking-widest">Interactive AI Agent</p>
          <h2 className="text-3xl font-bold mb-4">Talk to John Igbokwe</h2>
          <p className="max-w-[52ch] mx-auto text-[--muted]">
            Talk to John and learn more about him through conversation
          </p>
        </div>
        <VoiceChat />
      </section>

      {/* Quick Stats */}
      <section className="max-w-[--maxw] mx-auto px-[--space] py-12 border-t border-[--border]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[--brand] mb-2">5+</div>
            <div className="text-[--muted]">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[--brand] mb-2">5</div>
            <div className="text-[--muted]">Industries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[--brand] mb-2">10+</div>
            <div className="text-[--muted]">Projects</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[--brand] mb-2">∞</div>
            <div className="text-[--muted]">Always Learning</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-[--maxw] mx-auto px-[--space] py-20 border-t border-[--border]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-[--muted]">Wanna chat about AI, engineering, or just cool ideas? Let's connect.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
              <div>
                <h3 className="text-lg font-semibold mb-1">Email</h3>
                <p className="text-[--muted] text-sm">nfluncvjohn@gmail.com</p>
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
              <div>
                <h3 className="text-lg font-semibold mb-1">LinkedIn</h3>
                <p className="text-[--muted] text-sm">/in/mrjigbokwe</p>
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
              <div>
                <h3 className="text-lg font-semibold mb-1">GitHub</h3>
                <p className="text-[--muted] text-sm">@MrJohn91</p>
              </div>
            </div>
          </a>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/resume.pdf"
            download="John_Igbokwe_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[--border] rounded-[--radius] bg-[--grad-135] text-[#0a0c12] border-transparent font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)] hover:no-underline transition-all"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[--maxw] mx-auto px-[--space] py-8 border-t border-[--border] text-center text-[--muted] text-sm">
        <p>© 2025 John Igbokwe</p>
      </footer>
    </main>
  )
}
