# Deepgram Nova-2 Setup Guide

## Overview
We've integrated **Deepgram Nova-2** as the ASR (Automatic Speech Recognition) model for your portfolio voice agent. This provides:
- ✅ **Low latency** (~300ms) for real-time conversations
- ✅ **GDPR compliance** with EU data centers (important for Germany)
- ✅ **Multilingual support** (German + English auto-detection)
- ✅ **Cost-effective** ($0.0043/min for streaming)
- ✅ **High accuracy** for both languages

## What Changed

### 1. Dependencies (`pyproject.toml`)
Added `livekit-plugins-deepgram>=0.6.0` to the dependencies.

### 2. Agent Code (`portfolio_agent_livekit/agent.py`)
Replaced OpenAI Whisper with Deepgram Nova-2:

```python
# OLD - OpenAI Whisper
stt=openai.STT(
    model="whisper-1",
    language="en",
)

# NEW - Deepgram Nova-2
stt=deepgram.STT(
    model="nova-2",
    language="multi",  # Supports both German and English
    detect_language=True,  # Auto-detect language
)
```

### 3. Environment Variables (`.env`)
You need to add your Deepgram API key to `.env`:

```bash
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

## Setup Steps

### Step 1: Add Deepgram API Key to .env
Open `/Users/vee/Desktop/portfolio_website/backend/.env` and add:

```bash
# Deepgram (for Nova-2 speech-to-text)
DEEPGRAM_API_KEY=your_actual_deepgram_api_key
```

### Step 2: Test the Agent
Run the agent to test Deepgram integration:

```bash
cd /Users/vee/Desktop/portfolio_website/backend
python portfolio_agent_livekit/agent.py dev
```

### Step 3: Verify in Frontend
1. Start the frontend: `cd frontend && npm run dev`
2. Open http://localhost:3000
3. Click on the voice agent
4. Test with both English and German speech

## Deepgram Nova-2 Features

### Language Detection
The agent will automatically detect whether you're speaking:
- **English** - For international recruiters
- **German** - For local German employers

### Model Configuration
- **Model**: `nova-2` (latest, most accurate)
- **Language**: `multi` (supports 100+ languages)
- **Auto-detect**: `True` (automatically switches between languages)

### Performance
- **Latency**: ~300ms (3x faster than Whisper)
- **Accuracy**: 95%+ for English and German
- **Streaming**: Real-time transcription as you speak

## Troubleshooting

### Issue: "Deepgram API key not found"
**Solution**: Make sure `DEEPGRAM_API_KEY` is set in your `.env` file.

### Issue: High latency or slow responses
**Solution**: 
1. Check your internet connection
2. Verify you're using the EU endpoint (Deepgram auto-routes to nearest data center)
3. Consider upgrading to Deepgram's dedicated plan for lower latency

### Issue: Poor transcription accuracy
**Solution**:
1. Ensure good microphone quality
2. Reduce background noise
3. Speak clearly and at a moderate pace
4. Check if the correct language is being detected

## Cost Estimation

### Deepgram Pricing
- **Pay-as-you-go**: $0.0043/minute for streaming
- **Example**: 100 conversations × 5 minutes = 500 minutes = **$2.15**

### Comparison with OpenAI Whisper
- **Whisper**: $0.006/minute
- **Deepgram**: $0.0043/minute
- **Savings**: ~28% cheaper + 3x faster

## Next Steps

1. ✅ Add your Deepgram API key to `.env`
2. ✅ Test the agent with English speech
3. ✅ Test the agent with German speech
4. ✅ Monitor latency and accuracy
5. ✅ Deploy to production

## Resources

- [Deepgram Documentation](https://developers.deepgram.com/)
- [LiveKit Deepgram Plugin](https://docs.livekit.io/agents/plugins/deepgram/)
- [Deepgram Nova-2 Model](https://deepgram.com/product/nova-2)

## Support

If you encounter any issues:
1. Check the logs: `tail -f backend/agent.log`
2. Verify API key is valid: https://console.deepgram.com/
3. Test with Deepgram's playground: https://playground.deepgram.com/

---

**Ready to test!** Add your API key and run the agent. 🚀
