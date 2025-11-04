# LiveKit Agent Testing Guide

This guide walks you through testing your LiveKit agent locally before deploying to LiveKit Cloud.

## Testing Strategy

1. **Phase 1**: Test with OpenAI TTS (free, good quality) ✅ Current
2. **Phase 2**: Switch to ElevenLabs voice cloning (John's voice) after everything works

## Prerequisites

- Python 3.9+ installed
- Virtual environment activated
- All dependencies installed
- LiveKit CLI installed
- Environment variables configured

## Step 1: Install LiveKit CLI

```bash
# macOS
brew install livekit/tap/livekit

# Or using pip
pip install livekit-cli
```

Verify installation:
```bash
lk --version
```

## Step 2: Configure Environment Variables

Make sure your `.env` file has these minimum variables for testing:

```bash
# Required for OpenAI TTS (testing phase)
OPENAI_API_KEY=sk-proj-your_key_here

# Required for LiveKit (local development)
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
LIVEKIT_URL=ws://localhost:7880

# Required for agent tools
NOTION_API_KEY=your_notion_key
NOTION_DATABASE_ID=your_database_id
NOTION_CONVERSATIONS_DB_ID=your_conversations_id
GITHUB_TOKEN=your_github_token

# Optional for testing (ElevenLabs not needed until Phase 2)
ELEVENLABS_API_KEY=sk_your_key_here
ELEVENLABS_VOICE_ID=CstaZXTpBGj2CrWoQ0VR
```

## Step 3: Start Local LiveKit Server

Open **Terminal 1** and start the LiveKit server:

```bash
livekit-server --dev
```

This will:
- Start a local LiveKit server on `ws://localhost:7880`
- Use default API keys: `devkey` / `secret`
- Display connection information

You should see:
```
[livekit] Starting LiveKit server...
[livekit] Dev server listening on ws://localhost:7880
[livekit] API Key: devkey
[livekit] API Secret: secret
```

**Keep this terminal running!**

## Step 4: Run Your Agent

Open **Terminal 2** and navigate to your backend:

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
lk agent dev
```

This will:
- Start your LiveKit agent
- Connect to the local LiveKit server
- Load your Notion and GitHub tools
- Use OpenAI TTS for voice output

You should see:
```
[livekit:agents] Starting agent: john-portfolio-agent
[livekit:agents] Connected to LiveKit server
[livekit:agents] Agent ready!
```

## Step 5: Test in LiveKit Playground

1. Open your browser to: **https://agents-playground.livekit.io/**
2. Configure the playground:
   - **LiveKit Server**: `http://localhost:7880`
   - **API Key**: `devkey`
   - **API Secret**: `secret`
   - **Agent Name**: `john-portfolio-agent`

3. Click **"Connect"**

4. Test the agent:
   - Ask: "Hi, tell me about yourself"
   - Agent should: Greet you as John, introduce himself
   - Ask: "What skills do you have?"
   - Agent should: Use `get_portfolio_info` tool, mention relevant skills
   - Ask: "Do you have any Python projects?"
   - Agent should: Use `search_github_projects` tool, find matching repos

## What to Test

### ✅ Agent Initialization
- [ ] Agent starts without errors
- [ ] Connection to LiveKit server successful
- [ ] Tools are loaded (Notion, GitHub)

### ✅ Voice Pipeline
- [ ] Speech-to-Text works (you speak, agent transcribes)
- [ ] LLM generates responses (agent understands and responds)
- [ ] Text-to-Speech works (agent speaks back to you)
- [ ] Voice Activity Detection works (agent knows when you're done talking)

### ✅ Tool Integration
- [ ] `get_portfolio_info` retrieves data from Notion
- [ ] `search_github_projects` searches GitHub repos
- [ ] `collect_contact_info` saves to Notion conversations DB

### ✅ Agent Behavior
- [ ] Initial greeting is correct
- [ ] Agent speaks as John (first person)
- [ ] Agent is concise and relevant
- [ ] Agent combines work experience + personal projects appropriately

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'livekit'"

**Solution:**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Error: "Connection refused to ws://localhost:7880"

**Solution:**
Make sure LiveKit server is running in Terminal 1:
```bash
livekit-server --dev
```

### Error: "Invalid API key"

**Solution:**
Use the default dev keys:
- LIVEKIT_API_KEY=devkey
- LIVEKIT_API_SECRET=secret

### Agent doesn't respond

**Check:**
1. Agent logs in Terminal 2
2. Browser console for errors
3. Microphone permissions in browser
4. OpenAI API key is valid

### TTS not working

**Check:**
1. OpenAI API key has TTS access
2. LiveKit logs for errors
3. Browser audio permissions
4. Try different OpenAI voice: "alloy", "echo", "fable", "onyx", "nova", "shimmer"

## Phase 2: Switch to ElevenLabs (After Testing)

Once everything works with OpenAI TTS, switch to ElevenLabs for John's cloned voice:

### Step 1: Update the agent code

Edit `backend/portfolio_agent_livekit/agent.py`, line 334-338:

```python
# Replace OpenAI TTS with ElevenLabs
tts=elevenlabs.TTS(
    voice_id=os.getenv("ELEVENLABS_VOICE_ID", "CstaZXTpBGj2CrWoQ0VR"),
),
```

### Step 2: Add ElevenLabs API key to .env

```bash
ELEVENLABS_API_KEY=sk_your_actual_key_here
ELEVENLABS_VOICE_ID=CstaZXTpBGj2CrWoQ0VR
```

### Step 3: Restart the agent

```bash
# In Terminal 2
# Stop the agent (Ctrl+C)
lk agent dev
```

### Step 4: Test again

- Agent should now speak in John's cloned voice
- Voice quality should be significantly better
- Natural intonation and pauses

## Next Steps After Testing

1. ✅ Local testing complete
2. Deploy to LiveKit Cloud
3. Integrate with frontend
4. Deploy frontend to Vercel
5. Monitor production usage

## Additional Resources

- [LiveKit Agents Docs](https://docs.livekit.io/agents/start/)
- [LiveKit Testing Guide](https://docs.livekit.io/agents/build/testing)
- [SyncTrack Reference](https://github.com/MrJohn91/synctrack_customer_voice_agent)









