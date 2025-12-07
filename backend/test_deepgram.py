"""
Simple test script to verify Deepgram Nova-2 integration
This tests the STT configuration without needing LiveKit Cloud
"""

import os
import asyncio
from dotenv import load_dotenv
from livekit.plugins import deepgram

# Load environment
load_dotenv()

async def test_deepgram():
    """Test Deepgram Nova-2 configuration"""
    
    print("🧪 Testing Deepgram Nova-2 Integration...")
    print("=" * 50)
    
    # Check API key
    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        print("❌ DEEPGRAM_API_KEY not found in .env")
        return False
    
    print(f"✅ Deepgram API key found: {api_key[:8]}...")
    
    # Test STT initialization
    try:
        stt = deepgram.STT(
            model="nova-2",
            language="multi",  # Supports both German and English
            detect_language=True,  # Auto-detect language
        )
        print("✅ Deepgram STT initialized successfully")
        print(f"   Model: nova-2")
        print(f"   Language: multi (German + English)")
        print(f"   Auto-detect: True")
        print()
        print("🎉 Deepgram Nova-2 is ready!")
        print()
        print("Next steps:")
        print("1. Deploy agent to LiveKit Cloud: lk agent deploy")
        print("2. Or test with LiveKit Playground: https://agents-playground.livekit.io/")
        print("3. Or integrate with frontend for full testing")
        return True
        
    except Exception as e:
        print(f"❌ Error initializing Deepgram STT: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_deepgram())
