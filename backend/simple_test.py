"""
Simple test to connect and trigger agent greeting
"""
import asyncio
import logging
from livekit import rtc

# Set up logging
logging.basicConfig(level=logging.INFO)

async def test_connection():
    print("🔌 Connecting to trigger agent...")
    
    # Connect as a participant to trigger agent
    room = rtc.Room()
    
    @room.on("participant_connected")
    def on_participant_connected(participant: rtc.RemoteParticipant):
        print(f"👤 Participant joined: {participant.identity}")
        
    @room.on("track_published") 
    def on_track_published(publication, participant):
        print(f"🎵 Track published by {participant.identity}")
        
    @room.on("data_received")
    def on_data_received(data, participant):
        print(f"💬 Data from {participant.identity}: {data}")
    
    try:
        # Connect to room
        await room.connect(
            url="ws://localhost:7880",
            token=None,  # Local dev server doesn't need token
        )
        
        print("✅ Connected! Waiting for agent...")
        await asyncio.sleep(5)
        
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        await room.disconnect()

if __name__ == "__main__":
    asyncio.run(test_connection())
