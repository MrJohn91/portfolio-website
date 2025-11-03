"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mic, Loader2 } from "lucide-react"
import { VoiceCallInterface } from "@/components/voice-call-interface"
import { Orb, AgentState } from "@/components/ui/orb"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/i18n"

const ORB_COLORS: [string, string] = ["#CADCFC", "#A0B9D1"]

export function VoiceChat() {
  const { language } = useLanguage()
  const [agentState, setAgentState] = useState<AgentState>(null)
  const [callData, setCallData] = useState<{
    token: string
    url: string
    roomName: string
  } | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleStartCall = async () => {
    try {
      console.log("🎤 Starting voice call...");
      setIsConnecting(true);
      
      const response = await fetch("/api/livekit/token", {
        method: "POST",
      })

      console.log("📡 Token response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("❌ Token request failed:", errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to get token`);
      }

      const data = await response.json()
      console.log("✅ Token received:", {
        roomName: data.roomName,
        url: data.url,
        hasToken: !!data.token
      });
      
      if (!data.token || !data.url || !data.roomName) {
        throw new Error("Invalid token response - missing required data");
      }
      
      setCallData({
        token: data.token,
        url: data.url,
        roomName: data.roomName,
      })
      setAgentState(null)
    } catch (error) {
      console.error("❌ Error starting call:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to connect to John: ${errorMessage}\n\nPlease check:\n1. Environment variables are set\n2. Backend agent is running\n3. Check browser console for details`);
    } finally {
      setIsConnecting(false);
    }
  }

  const handleDisconnect = useCallback(() => {
    setCallData(null)
    setAgentState(null)
  }, [])

  const handleStateChange = useCallback((state: AgentState) => {
    setAgentState(state)
  }, [])

  return (
    <>
      <div className="w-full space-y-8">
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

        {/* Status Text */}
        {(callData || agentState) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[--muted]"
          >
            {callData && !agentState
              ? getTranslation(language, "connecting")
              : agentState === "listening"
              ? getTranslation(language, "listening")
              : agentState === "talking"
              ? getTranslation(language, "speaking")
              : agentState === "thinking"
              ? getTranslation(language, "thinking")
              : callData
              ? getTranslation(language, "readyToTalk")
              : getTranslation(language, "readyToConnect")}
          </motion.p>
        )}

        {/* Talk to John Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="gradient"
            className="text-lg px-10 py-6"
            onClick={handleStartCall}
            disabled={callData !== null || isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {getTranslation(language, "connecting")}
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                {getTranslation(language, "talkButton")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Voice Call Interface Overlay */}
      <AnimatePresence>
        {callData && (
          <VoiceCallInterface
            token={callData.token}
            serverUrl={callData.url}
            roomName={callData.roomName}
            onDisconnect={handleDisconnect}
            onStateChange={handleStateChange}
          />
        )}
      </AnimatePresence>
    </>
  )
}
