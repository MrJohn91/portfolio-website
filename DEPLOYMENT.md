# Deployment Guide - John's Portfolio Agent

## Current Status

- ✅ Agent developed with LiveKit Agents Framework
- ✅ Local testing working
- ⏳ Ready for LiveKit Cloud deployment
- ⏳ Frontend integration pending

## Prerequisites

1. **LiveKit Cloud Account**
   - Sign up at https://cloud.livekit.io
   - Get API Key, Secret, and Server URL

2. **Container Registry** (optional, for Docker deployment)
   - Docker Hub, GitHub Container Registry, or similar

3. **Environment Secrets**
   - All API keys configured in LiveKit Cloud

## Deployment Options

### Option 1: LiveKit CLI (Recommended for First Deployment)

**Steps:**
1. Login to LiveKit Cloud:
   ```bash
   lk agent login
   ```

2. Navigate to backend:
   ```bash
   cd backend
   ```

3. Deploy:
   ```bash
   lk agent deploy .
   ```

**Pros:**
- Simple first deployment
- Automatic configuration
- Good for testing

**Cons:**
- Less control over container image
- Harder to version/manage

### Option 2: Docker + LiveKit Cloud UI (Production Ready)

**Steps:**

1. **Build Docker Image:**
   ```bash
   cd backend
   docker build -t john-portfolio-agent .
   ```

2. **Tag for Registry:**
   ```bash
   docker tag john-portfolio-agent YOUR_REGISTRY/john-portfolio-agent:latest
   docker tag john-portfolio-agent YOUR_REGISTRY/john-portfolio-agent:v1.0.0
   ```

3. **Push to Registry:**
   ```bash
   docker login YOUR_REGISTRY
   docker push YOUR_REGISTRY/john-portfolio-agent:latest
   docker push YOUR_REGISTRY/john-portfolio-agent:v1.0.0
   ```

4. **Deploy via LiveKit Cloud UI:**
   - Log into https://cloud.livekit.io
   - Navigate to Agents section
   - Create new agent
   - Select Docker image deployment
   - Enter image URL: `YOUR_REGISTRY/john-portfolio-agent:latest`
   - Configure environment secrets (see below)

**Pros:**
- Full version control
- Reproducible deployments
- Professional CI/CD integration

**Cons:**
- More setup required
- Need container registry

### Option 3: UV-based Build (Future - Follow SyncTrack Approach)

Similar to [SyncTrack Voice Agent](https://github.com/MrJohn91/synctrack_customer_voice_agent):

```dockerfile
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS base
# ... (see backend/Dockerfile for full implementation)
```

**Benefits:**
- Faster builds with UV
- Better dependency resolution
- Smaller final images

**Requirements:**
- Migrate from `requirements.txt` to `pyproject.toml` + `uv.lock`
- Update Dockerfile to use UV

## Environment Variables

Configure these secrets in LiveKit Cloud UI:

```bash
# OpenAI (STT + LLM)
OPENAI_API_KEY=sk-...

# ElevenLabs (TTS - John's cloned voice)
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_VOICE_ID=CstaZXTpBGj2CrWoQ0VR

# Notion (Portfolio Data + Conversations)
NOTION_API_KEY=secret_...
NOTION_DATABASE_ID=9f026f31-...
NOTION_CONVERSATIONS_DB_ID=07405753-...

# GitHub (Project Search)
GITHUB_TOKEN=ghp_...

# Optional
LLM_CHOICE=gpt-4o-mini
```

## Testing Deployment

1. **Check Agent Logs:**
   ```bash
   lk agent logs john-portfolio-agent --follow
   ```

2. **Test in LiveKit Playground:**
   - Visit: https://agents-playground.livekit.io/
   - Enter your LiveKit credentials
   - Start a conversation

3. **Frontend Integration** (coming soon):
   - Generate access token
   - Integrate LiveKit React components
   - Deploy frontend to Vercel

## Troubleshooting

### Agent Not Starting
- Check all environment variables are set
- Verify LiveKit Cloud server is accessible
- Check logs: `lk agent logs john-portfolio-agent`
- Ensure `livekit.toml` is correct

### Import Errors
- Verify `portfolio_agent_livekit/` and `services/` are copied to Docker image
- Check Python path includes `/app`
- Review `.dockerignore` isn't excluding required files

### Voice Issues
- Verify ElevenLabs API key and voice ID
- Check LiveKit audio pipeline logs
- Test STT/LLM/TTS separately

### Notion Integration
- Verify Notion API key has access to databases
- Check database IDs match environment variables
- Test Notion service independently

## CI/CD Integration (Future)

### GitHub Actions Example

```yaml
name: Deploy Agent

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          cd backend
          docker build -t john-portfolio-agent .
      
      - name: Push to registry
        run: |
          docker push john-portfolio-agent:latest
      
      - name: Deploy to LiveKit Cloud
        run: |
          lk agent deploy backend/
```

## Next Steps

1. ✅ Complete agent development
2. ✅ Create Dockerfile
3. ⏳ Deploy to LiveKit Cloud
4. ⏳ Integrate with frontend
5. ⏳ End-to-end testing
6. ⏳ Deploy frontend to Vercel
7. ⏳ Production monitoring

## Resources

- [LiveKit Agents Docs](https://docs.livekit.io/agents/start/)
- [LiveKit Cloud Dashboard](https://cloud.livekit.io)
- [SyncTrack Reference](https://github.com/MrJohn91/synctrack_customer_voice_agent)



