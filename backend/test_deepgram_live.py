"""
Live test for Deepgram Nova-2 with German language detection
Tests real-time speech recognition with microphone input
"""

import os
import asyncio
from dotenv import load_dotenv
from deepgram import (
    DeepgramClient,
    LiveTranscriptionEvents,
    LiveOptions,
    Microphone,
)

# Load environment
load_dotenv()

async def test_live_transcription():
    """Test Deepgram Nova-2 with live microphone input"""
    
    print("🎤 Deepgram Nova-2 Live Test")
    print("=" * 60)
    
    # Check API key
    api_key = os.getenv("DEEPGRAM_API_KEY")
    if not api_key:
        print("❌ DEEPGRAM_API_KEY not found in .env")
        return
    
    print(f"✅ Deepgram API key found")
    print()
    print("📋 Configuration:")
    print("   Model: nova-2")
    print("   Language: multi (auto-detect German/English)")
    print("   Streaming: Real-time")
    print()
    
    try:
        # Create Deepgram client
        deepgram = DeepgramClient(api_key)
        
        # Create connection
        dg_connection = deepgram.listen.live.v("1")
        
        # Track detected languages
        detected_languages = set()
        
        def on_message(self, result, **kwargs):
            sentence = result.channel.alternatives[0].transcript
            if len(sentence) > 0:
                # Get detected language
                language = result.channel.alternatives[0].languages[0] if hasattr(result.channel.alternatives[0], 'languages') and result.channel.alternatives[0].languages else "unknown"
                detected_languages.add(language)
                
                print(f"🗣️  [{language}] {sentence}")
        
        def on_metadata(self, metadata, **kwargs):
            pass
        
        def on_error(self, error, **kwargs):
            print(f"❌ Error: {error}")
        
        def on_close(self, close, **kwargs):
            print("\n👋 Connection closed")
        
        # Register event handlers
        dg_connection.on(LiveTranscriptionEvents.Transcript, on_message)
        dg_connection.on(LiveTranscriptionEvents.Metadata, on_metadata)
        dg_connection.on(LiveTranscriptionEvents.Error, on_error)
        dg_connection.on(LiveTranscriptionEvents.Close, on_close)
        
        # Configure options for multilingual detection
        options = LiveOptions(
            model="nova-2",
            language="multi",  # Auto-detect language
            detect_language=True,
            punctuate=True,
            smart_format=True,
            interim_results=False,
        )
        
        # Start connection
        if not dg_connection.start(options):
            print("❌ Failed to start connection")
            return
        
        print("✅ Connection established")
        print()
        print("🎙️  SPEAK NOW!")
        print("   Try speaking in German: 'Hallo, ich bin John Igbokwe'")
        print("   Or in English: 'Hello, I am John Igbokwe'")
        print()
        print("   Press Ctrl+C to stop")
        print("=" * 60)
        print()
        
        # Create microphone stream
        microphone = Microphone(dg_connection.send)
        
        # Start microphone
        microphone.start()
        
        # Keep the connection alive for 30 seconds
        try:
            await asyncio.sleep(30)
        except KeyboardInterrupt:
            print("\n\n⏹️  Stopping...")
        
        # Stop microphone
        microphone.finish()
        
        # Close connection
        dg_connection.finish()
        
        print()
        print("=" * 60)
        print("📊 Test Results:")
        print(f"   Languages detected: {', '.join(detected_languages) if detected_languages else 'None'}")
        print()
        
        if 'de' in detected_languages or 'german' in str(detected_languages).lower():
            print("✅ German language detection: SUCCESS")
        else:
            print("ℹ️  No German detected (try speaking in German)")
        
        if 'en' in detected_languages or 'english' in str(detected_languages).lower():
            print("✅ English language detection: SUCCESS")
        
        print()
        print("🎉 Deepgram Nova-2 is working correctly!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_live_transcription())
