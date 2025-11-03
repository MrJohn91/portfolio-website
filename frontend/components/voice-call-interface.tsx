"use client";

import { useState, useEffect, useRef } from "react";
import { Room, RoomEvent, RemoteParticipant, Track, ConnectionState, Participant } from "livekit-client";
import { LiveKitRoom, RoomAudioRenderer, useRoomContext } from "@livekit/components-react";
import "@livekit/components-styles";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, PhoneOff, Loader2 } from "lucide-react";

interface VoiceCallInterfaceProps {
  token: string;
  serverUrl: string;
  roomName: string;
  onDisconnect: () => void;
  onStateChange?: (state: "listening" | "talking" | "thinking" | null) => void;
}

function VoiceCallControls({
  room,
  onDisconnect,
  onStateChange,
}: {
  room: Room;
  onDisconnect: () => void;
  onStateChange?: (state: "listening" | "talking" | "thinking" | null) => void;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userSpeakingRef = useRef(false);
  const agentSpeakingRef = useRef(false);

  const updateOrbState = useRef(() => {
    if (agentSpeakingRef.current) {
      onStateChange?.("talking");
    } else if (userSpeakingRef.current) {
      onStateChange?.("listening");
    } else {
      onStateChange?.(null);
    }
  });

  useEffect(() => {
    if (!room) return;

    const handleConnectionStateChange = (state: ConnectionState) => {
      console.log("🔄 Connection state changed:", state);
      setIsConnected(state === ConnectionState.Connected);
      if (state === ConnectionState.Connected) {
        onStateChange?.(null);
      }
    };

    const checkUserSpeaking = () => {
      if (!room) return;
      
      const localParticipant = room.localParticipant;
      const audioTracks = Array.from(localParticipant.audioTrackPublications.values());
      const isMuted = audioTracks.length > 0 && audioTracks[0]?.track?.isMuted;
      const isSpeaking = localParticipant.isSpeaking && 
                        localParticipant.isMicrophoneEnabled && 
                        !isMuted;
      
      const previousUserSpeaking = userSpeakingRef.current;
      userSpeakingRef.current = isSpeaking || false;
      
      if (previousUserSpeaking !== userSpeakingRef.current || !agentSpeakingRef.current) {
        updateOrbState.current();
      }
    };

    const userSpeakingInterval = setInterval(checkUserSpeaking, 100);

    // Track when agent (remote participant) is speaking
  const handleRemoteTrackSubscribed = (track: Track, publication: any, participant: RemoteParticipant) => {
      if (track.kind === "audio" && !participant.isLocal) {
        // Check if this is the agent (typically has "agent" or "john" in identity)
        const isAgent = participant.identity.toLowerCase().includes("agent") || 
                        participant.name?.toLowerCase().includes("agent") ||
                        participant.identity.toLowerCase().includes("john") ||
                        participant.name?.toLowerCase().includes("john");
        
        if (isAgent && track.mediaStreamTrack) {
          if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.srcObject = new MediaStream([track.mediaStreamTrack]);
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
          } else {
            audioRef.current.srcObject = new MediaStream([track.mediaStreamTrack]);
          }
          
          // Track if agent is speaking by checking if audio is actively playing
          const checkAgentSpeaking = () => {
            if (audioRef.current) {
              // Check if audio is playing and has audio data
              const isPlaying = !audioRef.current.paused && 
                              audioRef.current.currentTime > 0 && 
                              !audioRef.current.ended;
              
              // Also check if there's actual audio data (not silence)
              // This is a heuristic - you might want more sophisticated VAD
              agentSpeakingRef.current = isPlaying;
            } else {
              agentSpeakingRef.current = false;
            }
            updateOrbState.current();
          };
          
          // Check more frequently when agent's track is active
          const agentSpeakingInterval = setInterval(checkAgentSpeaking, 100);
          return () => clearInterval(agentSpeakingInterval);
        }
      }
    };

    const handleRemoteTrackUnsubscribed = (track: Track, publication: any, participant: RemoteParticipant) => {
      if (track.kind === "audio" && !participant.isLocal) {
        agentSpeakingRef.current = false;
        updateOrbState.current();
      }
    };

    const handleActiveSpeakersChanged = (speakers: Participant[]) => {
      if (!room) return;
      
      // Find remote participants (agent)
      const remoteParticipants = Array.from(room.remoteParticipants.values());
      
      // Check if agent is in the active speakers (filter to remote participants)
      const remoteSpeakers = speakers.filter(p => !p.isLocal) as RemoteParticipant[];
      const agentIsSpeaking = remoteSpeakers.some(p => {
        const identity = (p.identity || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        return identity.includes("agent") || 
               name.includes("agent") ||
               identity.includes("john") ||
               name.includes("john");
      });
      
      // Check if user (local participant) is speaking
      // Use isSpeaking property directly from localParticipant for better accuracy
      const localParticipantIsSpeaking = room.localParticipant.isSpeaking;
      const userIsInSpeakers = speakers.some(p => p.isLocal);
      const userIsSpeaking = localParticipantIsSpeaking || userIsInSpeakers;
      
      // Update refs - prioritize agent speaking over user
      // If agent is speaking, show "talking"
      // If user is speaking and agent is not, show "listening" (agent is listening)
      agentSpeakingRef.current = agentIsSpeaking;
      userSpeakingRef.current = userIsSpeaking && !agentIsSpeaking;
      
      // Immediately update orb state when speakers change
      updateOrbState.current();
    };

    room.on(RoomEvent.ConnectionStateChanged, handleConnectionStateChange);
    room.on(RoomEvent.TrackSubscribed, handleRemoteTrackSubscribed);
    room.on(RoomEvent.TrackUnsubscribed, handleRemoteTrackUnsubscribed);
    room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);

    return () => {
      clearInterval(userSpeakingInterval);
      room.off(RoomEvent.ConnectionStateChanged, handleConnectionStateChange);
      room.off(RoomEvent.TrackSubscribed, handleRemoteTrackSubscribed);
      room.off(RoomEvent.TrackUnsubscribed, handleRemoteTrackUnsubscribed);
      room.off(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.srcObject = null;
      }
    };
  }, [room]);

  const toggleMute = async () => {
    if (!room) return;
    await room.localParticipant.setMicrophoneEnabled(isMuted);
    setIsMuted(!isMuted);
    
    if (isMuted) {
      userSpeakingRef.current = room.localParticipant.isMicrophoneEnabled;
    } else {
      userSpeakingRef.current = false;
    }
    
    updateOrbState.current();
  };

  const handleEndCall = () => {
    if (room) {
      room.disconnect();
    }
    onDisconnect();
  };

  if (!room) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} autoPlay playsInline style={{ display: "none" }} />
      <div 
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
        style={{ zIndex: 99999 }}
      >
        <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={toggleMute}
              className="bg-white/20 hover:bg-white/30 border-white/30 text-white"
              disabled={!isConnected}
            >
              {isMuted ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
            >
              <PhoneOff className="w-5 h-5 mr-2" />
              End Call
            </Button>
          </div>

          <p className="text-white text-sm font-medium">
            {isConnected ? "Connected to John" : "Connecting..."}
          </p>
        </div>
      </div>
    </>
  );
}

function RoomAccessor({
  onRoomReady,
  onDisconnect,
  onStateChange,
}: {
  onRoomReady: (room: Room) => void;
  onDisconnect: () => void;
  onStateChange?: (state: "listening" | "talking" | "thinking" | null) => void;
}) {
  const room = useRoomContext();
  const roomSentRef = useRef(false);

  useEffect(() => {
    if (room) {
      // Always send room instance when it's available, even if not connected yet
      if (!roomSentRef.current) {
        roomSentRef.current = true;
        onRoomReady(room);
      }
      
      // Check if already connected
      if (room.state === ConnectionState.Connected) {
        onStateChange?.(null);
      }

      // Listen for connection events
      const handleConnected = () => {
        console.log("📡 Room connected, participants:", room.remoteParticipants.size);
        onStateChange?.(null);
      };

      const handleDisconnected = () => {
        console.log("❌ Room disconnected");
        onDisconnect();
      };

      const handleParticipantConnected = (participant: RemoteParticipant) => {
        console.log("🤖 Participant connected:", participant.identity, participant.name);
      };

      room.on(RoomEvent.Connected, handleConnected);
      room.on(RoomEvent.Disconnected, handleDisconnected);
      room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);

      return () => {
        room.off(RoomEvent.Connected, handleConnected);
        room.off(RoomEvent.Disconnected, handleDisconnected);
        room.off(RoomEvent.ParticipantConnected, handleParticipantConnected);
      };
    }
  }, [room, onRoomReady, onDisconnect, onStateChange]);

  return null;
}

export function VoiceCallInterface({
  token,
  serverUrl,
  roomName,
  onDisconnect,
  onStateChange,
}: VoiceCallInterfaceProps) {
  const [roomState, setRoomState] = useState<"connecting" | "connected" | "disconnected">("connecting");
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("🔌 VoiceCallInterface initialized:", {
    roomName,
    serverUrl: serverUrl ? `${serverUrl.substring(0, 30)}...` : "MISSING",
    hasToken: !!token,
    tokenLength: token?.length
  });

  const liveKitServerUrl = serverUrl;

  const handleRoomReady = (roomInstance: Room) => {
    console.log("📦 Room ready:", roomInstance.name);
    setRoomState("connected");
    setRoom(roomInstance);
  };

  const handleDisconnect = () => {
    console.log("🔌 Disconnected from room");
    setRoomState("disconnected");
    setRoom(null);
    setError(null);
    onDisconnect();
  };

  return (
    <>
      <LiveKitRoom
        video={false}
        audio={true}
        token={token}
        serverUrl={liveKitServerUrl}
        connect={true}
        options={{
          adaptiveStream: true,
          dynacast: true,
        }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-[#0a0a0a] via-[#1a1f2e] to-[#2a1f2e] flex items-center justify-center"
        onConnected={() => {
          console.log("✅ Connected to LiveKit room:", roomName);
          setRoomState("connected");
          setError(null);
        }}
        onDisconnected={(reason) => {
          console.log("❌ Disconnected from LiveKit:", reason);
          handleDisconnect();
        }}
        onError={(error) => {
          console.error("❌ LiveKit connection error:", error);
          const errorMsg = error?.message || "Unknown connection error";
          setError(errorMsg);
          // Don't show alert here - let it fail gracefully and show error in UI
        }}
      >
        <RoomAccessor
          onRoomReady={handleRoomReady}
          onDisconnect={handleDisconnect}
          onStateChange={onStateChange}
        />
        <RoomAudioRenderer />

        {/* Loading State */}
        {roomState === "connecting" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Connecting to Agent...</p>
              {error && (
                <p className="text-red-400 text-sm mt-2">Error: {error}</p>
              )}
            </div>
          </div>
        )}
      </LiveKitRoom>

      {/* Controls Component - Always show when call is active, outside LiveKitRoom for proper z-index */}
      {/* Show controls as soon as we're connecting, keep visible during entire call */}
      {roomState !== "disconnected" ? (
        room ? (
          <VoiceCallControls 
            room={room}
            onDisconnect={onDisconnect} 
            onStateChange={onStateChange} 
          />
        ) : (
          // Show a placeholder with End Call button while room is being set up
          <div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto z-[99999]"
          >
            <div className="flex flex-col items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
              <Button
                variant="destructive"
                size="lg"
                onClick={handleDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
              >
                <PhoneOff className="w-5 h-5 mr-2" />
                End Call
              </Button>
              <p className="text-white text-sm font-medium">Connecting...</p>
            </div>
          </div>
        )
      ) : null}
    </>
  );
}


