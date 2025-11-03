# LiveKit Agent Setup - John's Portfolio

This guide explains how to deploy the LiveKit agent for John's portfolio website.

## Architecture

- **Backend**: Python LiveKit Agent with OpenAI Whisper (STT), GPT-4o-mini (LLM), and ElevenLabs (TTS)
- **Frontend**: Next.js with LiveKit React components (to be integrated)
- **Data**: Notion CMS + GitHub integration

## Prerequisites

1. **LiveKit Cloud Account** (or self-hosted LiveKit)
   - Sign up at https://cloud.livekit.io
   - Get your API key, API secret, and server URL

2. **Environment Variables**
   - `GOOGLE_GEMINI_API_KEY` - For backup (not used by LiveKit agent)
   - `ELEVENLABS_API_KEY` - For voice cloning
   - `ELEVENLABS_VOICE_ID` - John's cloned voice (CstaZXTpBGj2CrWoQ0VR)
   - `NOTION_API_KEY` - For portfolio data
   - `NOTION_DATABASE_ID` - Portfolio database
   - `NOTION_CONVERSATIONS_DB_ID` - Conversations tracking database
   - `GITHUB_TOKEN` - For project search
   - `OPENAI_API_KEY` - For Whisper STT and GPT-4o-mini
   - `LLM_CHOICE` - LLM model (default: gpt-4o-mini)
   - `LIVEKIT_API_KEY` - LiveKit API key
   - `LIVEKIT_API_SECRET` - LiveKit API secret
   - `LIVEKIT_URL` - LiveKit server URL (ws:// or wss://)

## Local Testing

### 1. Install Dependencies

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Run LiveKit Server (Local)

If testing locally, start a local LiveKit server:

```bash
# Install LiveKit CLI
brew install livekit

# Start local server
livekit-server --dev
```

This starts a local LiveKit server with default API keys.

### 3. Test the Agent

Using the LiveKit CLI:

```bash
cd backend

# Make sure you're in the backend directory where livekit.toml is
lk agent dev --livekit-url "ws://localhost:7880" --api-key devkey --api-secret secret
```

Or using Python directly:

```bash
source venv/bin/activate
python portfolio_agent_livekit/agent.py dev
```

## Deploy to LiveKit Cloud

### Option 1: Using LiveKit CLI

```bash
# Login to LiveKit Cloud
lk agent login

# Deploy the agent
cd backend
lk agent deploy .

# Check agent status
lk agent logs john-portfolio-agent --follow
```

### Option 2: Using Docker

Create a `Dockerfile` (similar to SyncTrack):

```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy agent code
COPY portfolio_agent_livekit/ ./portfolio_agent_livekit/
COPY services/ ./services/
COPY livekit.toml .

# Expose port
EXPOSE 8080

# Run agent
CMD ["lk", "agent", "start", "--config", "livekit.toml"]
```

Then deploy to your hosting platform with LiveKit agent support.

## Frontend Integration (Coming Soon)

Once the agent is deployed, we'll integrate it with the Next.js frontend using:

- `@livekit/components-react` - React components
- `livekit-client` - Client SDK
- Token generation API route for secure access

## Testing

Test your agent in the LiveKit Playground:
https://agents-playground.livekit.io/

## Troubleshooting

### Agent Not Starting

- Check all environment variables are set
- Verify LiveKit server is accessible
- Check logs: `lk agent logs john-portfolio-agent`

### Import Errors

- Ensure you're in the `backend` directory
- Check that `services/notion_service.py` and `services/conversation_service.py` exist
- Verify Python path includes `backend/`

### Voice Issues

- Verify ElevenLabs API key and voice ID
- Check LiveKit audio pipeline logs
- Test STT/LLM/TTS separately

### Notion Integration

- Verify Notion API key has access to databases
- Check database IDs match `.env`
- Test Notion service independently

## Next Steps

1. ✅ Agent created and tested locally
2. ⏳ Deploy to LiveKit Cloud
3. ⏳ Integrate with frontend
4. ⏳ Test end-to-end
5. ⏳ Deploy frontend to Vercel

## Resources

- [LiveKit Agents Docs](https://docs.livekit.io/agents/start/)
- [LiveKit Python SDK](https://github.com/livekit/python-sdks)
- [SyncTrack Reference Repo](https://github.com/MrJohn91/synctrack_customer_voice_agent)






