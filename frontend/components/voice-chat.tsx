"use client"

import { useState } from "react"
import { Orb, AgentState } from "@/components/ui/orb"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://portfolio-website-production-5107.up.railway.app"

const ORB_COLORS: [string, string] = ["#CADCFC", "#A0B9D1"]

export function VoiceChat() {
  const [agentState, setAgentState] = useState<AgentState>(null)

  const handleTalkToJohn = () => {
    // Open ADK web UI in a new window/tab
    window.open(BACKEND_URL, '_blank')
  }

  return (
    <div className="w-full space-y-8">
      {/* Orb Display */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="bg-[--surface] relative h-64 w-64 rounded-full p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] border border-[--border]">
            <div className="h-full w-full overflow-hidden rounded-full shadow-[inset_0_0_12px_rgba(0,0,0,0.3)]">
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

      {/* Talk to John Button - SyncTrack Style */}
      <div className="flex justify-center">
        <button
          onClick={handleTalkToJohn}
          className="group relative flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-[#6ee7ff] via-[#00E0C6] to-[#007BFF] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <svg 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:scale-110 transition-transform"
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
    </div>
  )
}
