
# 🧪 Quick Testing Guide - John's Portfolio Agent

## Prerequisites Check

Make sure you have:
- ✅ LiveKit server running in Terminal 1
- ✅ All environment variables in `.env`
- ✅ Virtual environment activated

## Step 1: Start LiveKit Server

**Open Terminal 1** and run:
```bash
livekit-server --dev
```

Keep this running. You should see:
```
[livekit] Starting LiveKit server...
[livekit] Dev server listening on ws://localhost:7880
[livekit] API Key: devkey
[livekit] API Secret: secret
```

## Step 2: Run Your Agent

**Open Terminal 2** and run:
```bash
cd /Users/vee/Desktop/portfolio_website/backend
source venv/bin/activate
python portfolio_agent_livekit/agent.py console --url ws://localhost:7880 --api-key devkey --api-secret secret
```

You should see:
```
INFO:livekit.agents:starting worker
==================================================
     Livekit Agents - Console
==================================================
Press [Ctrl+B] to toggle between Text/Audio mode, [Q] to quit.
```

## Step 3: Test the Agent

### Conversation Flow:

**Agent will greet you first:**
> "Hi there! I'm John Igbokwe - AI & Data Engineer based in Germany..."

**Try asking:**
- "Tell me about your Python experience"
- "What's your latest project?"
- "Do you have any AI/ML projects?"
- "What companies have you worked with?"

**Test contact collection:**
- "I'd like to share my info for follow-up"
- Give your name: "I'm [Your Name]"
- Give your email: "My email is [your@email.com]"

**Agent should:**
1. Call `get_portfolio_info` tool ✓
2. Call `search_github_projects` tool ✓
3. Call `collect_contact_info` tool ✓
4. Speak back naturally

### Toggle Modes:
- Press `[Ctrl+B]` to switch between Text and Voice modes
- Press `[Q]` to quit

## Step 4: Check Logs

Watch Terminal 2 for:
```
DEBUG:livekit.agents:executing tool {"function": "get_portfolio_info"}
DEBUG:livekit.agents:executing tool {"function": "search_github_projects"}
DEBUG:livekit.agents:executing tool {"function": "collect_contact_info"}
```

These confirm tools are working!

## Troubleshooting

### Agent won't start
```bash
# Make sure server is running
curl http://localhost:7880

# Check virtual environment
source venv/bin/activate
```

### OpenAI TTS errors (500)
- This is temporary OpenAI server issue
- Agent still works, just might not speak
- To fix: Switch to ElevenLabs TTS

### Tools not found
- Check `.env` has all keys
- Verify Notion database IDs are correct
- Check GitHub token is valid

## Next Steps

Once testing works:
1. Switch to ElevenLabs TTS for better voice
2. Deploy to LiveKit Cloud
3. Integrate with frontend

---
**Reference:** Full guide in `backend/TESTING_GUIDE.md`

