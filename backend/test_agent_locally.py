"""
Test agent locally by creating a room and triggering the agent
"""
import asyncio
from livekit import api
import os
from dotenv import load_dotenv

# Load environment for API access
load_dotenv()

async def test_agent_greeting():
    """Create a room that will trigger the agent"""
    
    print("🧪 Testing Agent Locally")
    print("=" * 40)
    
    # Local server configuration
    url = "ws://localhost:7880"
    api_key = "devkey"
    api_secret = "secret"
    
    try:
        # Create LiveKit API client for local server
        lk_api = api.LiveKitAPI(url, api_key, api_secret)
        
        # Create a test room
        room_name = "language-test-room"
        print(f"📝 Creating room: {room_name}")
        
        room_info = await lk_api.room.create_room(
            api.CreateRoomRequest(name=room_name)
        )
        
        print(f"✅ Room created: {room_info.name}")
        print(f"   Room SID: {room_info.sid}")
        
        # Wait a bit for the agent to connect
        print("⏳ Waiting for agent to join...")
        await asyncio.sleep(3)
        
        # List participants to see if agent joined
        participants = await lk_api.room.list_participants(
            api.ListParticipantsRequest(room=room_name)
        )
        
        print(f"👥 Participants in room:")
        for p in participants.participants:
            print(f"   - {p.identity} ({p.kind})")
        
        print("\n🎯 Check agent logs for greeting and activity!")
        
        # Keep room open for a bit
        await asyncio.sleep(5)
        
        print("🧹 Cleaning up...")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_agent_greeting())
