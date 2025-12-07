# Local Testing Guide for Deepgram Nova-2

## Quick Start - Test German/English Speech Recognition

### Step 1: Start Local LiveKit Server

Open a new terminal and run:

```bash
# Install LiveKit server (if not already installed)
brew install livekit

# Start local server
livekit-server --dev
```

This will start a local LiveKit server at `ws://localhost:7880` with:
- API Key: `devkey`
- API Secret: `secret`

### Step 2: Run the Agent Locally

In another terminal, run:

```bash
cd /Users/vee/Desktop/portfolio_website/backend

# Run agent in dev mode with local server
uv run python portfolio_agent_livekit/agent.py dev \
  --url ws://localhost:7880 \
  --api-key devkey \
  --api-secret secret
```

### Step 3: Test with Web Interface

Open the LiveKit Agents Playground:
https://agents-playground.livekit.io/

Configure:
- **Server URL**: `ws://localhost:7880`
- **API Key**: `devkey`
- **API Secret**: `secret`

Then click "Connect" and start speaking!

### What to Test:

1. **German Speech**: Say "Hallo, ich bin ein Recruiter aus Deutschland"
   - Agent should detect German and respond

2. **English Speech**: Say "Hello, tell me about your experience"
   - Agent should detect English and respond

3. **Mixed**: Switch between languages mid-conversation
   - Agent should auto-detect each time

### Expected Behavior:

✅ Deepgram Nova-2 will:
- Transcribe your speech in real-time
- Auto-detect if you're speaking German or English
- Send transcription to GPT-4o-mini
- Agent responds via ElevenLabs TTS

### Troubleshooting:

**Agent won't start?**
- Make sure LiveKit server is running first
- Check that ports 7880 and 7881 are not in use

**No audio?**
- Check microphone permissions in browser
- Verify audio output is not muted

**Poor transcription?**
- Speak clearly and at moderate pace
- Reduce background noise
- Check microphone quality

### Alternative: Use LiveKit CLI

You can also test using the LiveKit CLI:

```bash
cd /Users/vee/Desktop/portfolio_website/backend

# Connect to local server
lk room join \
  --url ws://localhost:7880 \
  --api-key devkey \
  --api-secret secret \
  --room test-room \
  --identity test-user
```

Then in another terminal, run the agent to join the same room.

---

**Ready to test!** Start the LiveKit server first, then run the agent. 🚀
