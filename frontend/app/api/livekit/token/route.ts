import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function POST(request: NextRequest) {
  try {
    // Get environment variables
    const livekitUrl = process.env.LIVEKIT_URL;
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    console.log("🔑 LiveKit Token Request - Checking credentials...");
    console.log("   URL:", livekitUrl ? `${livekitUrl.substring(0, 20)}...` : "MISSING");
    console.log("   API Key:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING");
    console.log("   API Secret:", apiSecret ? "SET" : "MISSING");

    if (!livekitUrl || !apiKey || !apiSecret) {
      const missing = [];
      if (!livekitUrl) missing.push("LIVEKIT_URL");
      if (!apiKey) missing.push("LIVEKIT_API_KEY");
      if (!apiSecret) missing.push("LIVEKIT_API_SECRET");
      
      console.error("❌ Missing LiveKit credentials:", missing);
      return NextResponse.json(
        { 
          error: `LiveKit credentials not configured. Missing: ${missing.join(", ")}`,
          details: "Please set LIVEKIT_URL, LIVEKIT_API_KEY, and LIVEKIT_API_SECRET in your .env.local file"
        },
        { status: 500 }
      );
    }

    // Validate and normalize LIVEKIT_URL format
    let normalizedUrl = livekitUrl.trim();
    
    // Ensure URL starts with wss:// or ws://
    if (!normalizedUrl.startsWith("wss://") && !normalizedUrl.startsWith("ws://")) {
      // If it's missing the protocol, add wss:// (secure for production)
      if (normalizedUrl.includes(".livekit.cloud")) {
        normalizedUrl = `wss://${normalizedUrl.replace(/^https?:\/\//, "")}`;
      } else {
        normalizedUrl = `wss://${normalizedUrl}`;
      }
      console.log("⚠️  Added wss:// protocol to URL:", normalizedUrl);
    }

    // Extract domain from URL for validation
    const urlDomain = normalizedUrl.replace(/^wss?:\/\//, "").split("/")[0];
    console.log("🌐 LiveKit Domain:", urlDomain);

    // Generate unique room name and participant name
    const roomName = `john-room-${Date.now()}`;
    const participantName = `user-${Math.random().toString(36).substring(7)}`;

    // Create access token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
    });

    // Grant permissions
    at.addGrant({
      room: roomName,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    // Generate token
    const token = await at.toJwt();

    console.log("✅ Token generated successfully for room:", roomName);

    return NextResponse.json({
      token,
      url: normalizedUrl, // Use normalized URL
      roomName,
      participantName,
    });
  } catch (error) {
    console.error("❌ Error generating LiveKit token:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Check for specific API key errors
    if (errorMessage.includes("invalid API key") || errorMessage.includes("API key")) {
      return NextResponse.json(
        { 
          error: "Invalid API key for LiveKit domain",
          details: `The API key doesn't match your LiveKit Cloud domain. Please verify:\n1. You're using the API key from the correct LiveKit Cloud project\n2. The API key matches the domain: ${process.env.LIVEKIT_URL}\n3. Get the correct API key from https://cloud.livekit.io`
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        error: "Failed to generate token",
        details: errorMessage
      },
      { status: 500 }
    );
  }
}


