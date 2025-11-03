"use client"

import { useState } from "react"
import { Orb, AgentState } from "@/components/ui/orb"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-website-production-5107.up.railway.app/dev-ui/?app=portfolio_agent_adk"

const ORB_COLORS: [string, string] = ["#CADCFC", "#A0B9D1"]

export function VoiceChat() {
  const [agentState, setAgentState] = useState<AgentState>(null)
  const [showIframe, setShowIframe] = useState(false)

  const handleTalkToJohn = () => {
    setShowIframe(true)
  }

  return (
    <div className="w-full space-y-8">
      {!showIframe ? (
        <>
          {/* Orb Display */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-[--surface] relative h-48 w-48 rounded-full p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] border border-[--border]">
                <div className="h-full w-full overflow-hidden rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
                  <Orb
                    colors={ORB_COLORS}
                    seed={1000}
                    agentState={agentState}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Talk to John Button */}
          <div className="flex justify-center">
            <button
              onClick={handleTalkToJohn}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[--grad-135] text-[#0a0c12] border-transparent rounded-[--radius] font-semibold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-16px_rgba(0,0,0,0.8)] transition-all"
            >
              <svg 
                viewBox="0 0 24 24" 
                width="20" 
                height="20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              </svg>
              Talk to John Igbokwe
            </button>
          </div>

          {/* Status Text */}
          {agentState && (
            <p className="text-center text-[--muted] text-sm">
              {agentState === "listening" && "John is listening..."}
              {agentState === "talking" && "John is speaking..."}
              {agentState === "thinking" && "John is thinking..."}
            </p>
          )}
        </>
      ) : (
        /* ADK Web UI in iframe */
        <div className="w-full h-[600px] border border-[--border] rounded-[--radius] overflow-hidden">
          <div className="relative w-full h-full">
            <iframe
              src={BACKEND_URL}
              className="w-full h-full border-0"
              title="Talk to John Igbokwe - AI Agent"
            />
            <button
              onClick={() => setShowIframe(false)}
              className="absolute top-4 right-4 px-3 py-1 bg-[--surface] border border-[--border] rounded-md text-[--text] hover:bg-[--accent] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
