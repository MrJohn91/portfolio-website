"""
Portfolio Agent for John Igbokwe
Using Google ADK with Notion integration and voice response
"""

import os
import pathlib
import wave
from typing import Dict, List
from pathlib import Path
from dotenv import load_dotenv

from google.adk.agents import Agent
from google.adk.tools import ToolContext
from google import genai
from google.genai import types

# Load environment
try:
    project_root = Path(__file__).parent.parent.parent
    load_dotenv(project_root / ".env")
except:
    load_dotenv()  # Try loading from current directory

# Import our Notion service
from services.notion_service import NotionService
from services.conversation_service import ConversationService

# Import GitHub
from github import Github

def wave_file(filename, pcm, channels=1, rate=24000, sample_width=2):
    """Helper function to save audio data as a wave file"""
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm)

async def generate_voice_response(text: str, tool_context: ToolContext, filename: str = "portfolio_response") -> Dict[str, str]:
    """
    Generate audio from text using Gemini TTS (for testing - will switch to ElevenLabs later).
    
    Args:
        text: The text to convert to speech
        tool_context: The ADK tool context
        filename: Base filename for the audio file
    
    Returns:
        Dictionary with status and file information
    """
    try:
        client = genai.Client()
        prompt = f"TTS the following: {text}"
        
        response = client.models.generate_content(
            model="gemini-2.5-flash-preview-tts",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["AUDIO"],
                speech_config=types.SpeechConfig(
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name="Aeolus")
                    )
                )
            )
        )
        
        data = response.candidates[0].content.parts[0].inline_data.data
        
        if not filename.endswith(".wav"):
            filename += ".wav"
        
        current_directory = pathlib.Path.cwd()
        file_path = current_directory / filename
        wave_file(str(file_path), data)
        
        return {
            "status": "success",
            "message": f"Successfully generated audio to {file_path.resolve()} (using Gemini TTS for testing)",
            "file_path": str(file_path.resolve()),
            "file_size": len(data)
        }
        
    except Exception as e:
        error_msg = str(e)[:200]
        return {"status": "error", "message": f"Audio generation failed: {error_msg}"}

def get_portfolio_info() -> Dict[str, str]:
    """
    Retrieve John Igbokwe's portfolio information from Notion database.
    Returns key information about skills, experience, education, and contact.
    
    Returns:
        A dictionary containing portfolio sections
    """
    try:
        service = NotionService()
        
        # Get all portfolio data
        all_bios = service.get_all_entries("Bio")
        main_bio = all_bios[0] if all_bios else None
        personal_interests = None
        for bio in all_bios:
            if "Personal Interests" in bio.get("name", ""):
                personal_interests = bio
                break
        
        skills = service.get_skills()
        experience = service.get_experience()
        education = service.get_education()
        contact = service.get_contact_info()
        
        # Combine all bio information
        bio_content = main_bio.get("content", "") if main_bio else "Not available"
        if personal_interests:
            bio_content += f"\n\nPersonal Info:\n{personal_interests.get('content', '')}"
        
        # Format into comprehensive response
        result = {
            "bio": bio_content,
            "skills": ", ".join([skill.get("name", "") for skill in skills[:20]]),  # Top 20
            "experience_summary": "\n".join([
                f"{exp.get('name', '')}: {exp.get('content', '')[:200]}..." 
                for exp in experience
            ]),
            "education": "\n".join([
                f"{edu.get('name', '')}: {edu.get('content', '')}" 
                for edu in education
            ]),
            "contact_info": "\n".join([
                f"{c.get('name', '')}: {c.get('url', '')}" 
                for c in contact
            ])
        }
        
        return result
        
    except Exception as e:
        return {"error": f"Failed to retrieve portfolio: {str(e)}"}

def search_github_projects(topic: str, limit: int = 10) -> Dict[str, str]:
    """
    Search for GitHub repositories related to a specific topic or technology.
    Returns repository information including README content for John's projects.
    
    Args:
        topic: The technology, skill, or project topic to search for (e.g., "data engineering", "snowflake", "machine learning")
        limit: Maximum number of repositories to return (default: 10)
    
    Returns:
        Dictionary containing matching repositories with their README content
    """
    try:
        # Get GitHub token from environment
        github_token = os.getenv("GITHUB_TOKEN")
        if not github_token:
            return {"error": "GITHUB_TOKEN not configured"}
        
        # Initialize GitHub client
        g = Github(github_token)
        
        # Get user's repositories
        user = g.get_user("MrJohn91")
        repos = user.get_repos(sort="updated", direction="desc")
        
        # Search for repositories matching the topic
        matching_repos = []
        topic_lower = topic.lower()
        
        for repo in repos:
            # Check if topic matches repo name, description, or topics
            if (topic_lower in repo.name.lower() or 
                (repo.description and topic_lower in repo.description.lower()) or
                any(topic_lower in tag.lower() for tag in repo.get_topics())):
                
                # Try to get README content
                readme_content = "No README available"
                try:
                    readme = repo.get_readme()
                    # Decode base64 content if needed
                    if readme.encoding == "base64":
                        import base64
                        readme_content = base64.b64decode(readme.content).decode('utf-8')
                    else:
                        readme_content = readme.decoded_content.decode('utf-8')
                except Exception:
                    readme_content = "README not available for this repository"
                
                matching_repos.append({
                    "name": repo.name,
                    "description": repo.description or "No description",
                    "url": repo.html_url,
                    "topics": ", ".join(repo.get_topics()),
                    "readme": readme_content[:500] + "..." if len(readme_content) > 500 else readme_content
                })
                
                if len(matching_repos) >= limit:
                    break
        
        if not matching_repos:
            return {
                "message": f"No repositories found matching '{topic}'. Available topics: Python, Data Engineering, AI/ML, Cloud",
                "available_projects": "Search my GitHub at https://github.com/MrJohn91"
            }
        
        result = {
            "count": len(matching_repos),
            "topic": topic,
            "repositories": matching_repos
        }
        
        return result
        
    except Exception as e:
        return {"error": f"Failed to search GitHub: {str(e)}"}

def collect_contact_info(name: str, email: str, phone: str = "") -> Dict[str, str]:
    """
    Store visitor contact information for follow-up.
    Called when you learn the visitor's name and contact details.
    
    Args:
        name: Visitor's full name
        email: Contact email address
        phone: Phone number (optional, can be empty string)
    
    Returns:
        Dictionary with status and confirmation message
    """
    try:
        # Save contact info with a placeholder conversation
        service = ConversationService()
        
        # Create a minimal conversation entry to save contact info
        placeholder_messages = [
            {"role": "user", "content": "Contact information collected"},
            {"role": "assistant", "content": f"Contact info saved for {name} ({email})"}
        ]
        
        page_id = service.save_conversation(name, email, phone, placeholder_messages)
        
        if page_id:
            return {
                "status": "success",
                "message": f"Got it, {name}! I've saved your contact info ({email}). Great to connect with you!"
            }
        else:
            return {
                "status": "partial_success",
                "message": f"Nice to meet you, {name}! I've noted your info."
            }
    except Exception as e:
        return {"status": "error", "message": f"Failed to store contact info: {str(e)}"}


root_agent = Agent(
    model='gemini-2.0-flash-live-001',
    name='portfolio_assistant',
    description='AI portfolio assistant for John Igbokwe with voice capabilities',
    instruction="""
You ARE John Igbokwe. You are not an assistant talking about John - you ARE John speaking directly to recruiters and potential employers.

**VERY IMPORTANT - First Message:**
When a conversation starts (no prior messages), your FIRST response MUST be:
"Hi there! I'm John Igbokwe - AI & Data Engineer based in Germany. I'd love to tell you about my experience, projects, and what I can bring to your team. What would you like to know about me?"

After the greeting, continue as John himself speaking in first person.

Your role:
- Answer questions about YOUR skills, experience, education, and achievements (speak as John)
- Provide specific examples from YOUR portfolio when relevant - but keep it concise!
- Share YOUR personal interests and cross-industry experience naturally
- Be professional, friendly, and authentic
- If you don't know something, be honest about it
- Don't overwhelm with information - answer what's asked

When asked about specific skills or experience, use the `get_portfolio_info` tool to retrieve the latest information from my database.

**Important - Be Concise and Relevant:**
- Only mention skills directly relevant to what the visitor is asking about
- Don't list all skills at once - be selective based on their needs
- Keep responses focused and useful

**When to Use Which Tool:**
1. **For Work Experience & Skills**: Use `get_portfolio_info` to get professional experience from companies like Pluto's Tech, Univacity, etc.
2. **For Personal Projects**: Use `search_github_projects` to find my personal GitHub projects that demonstrate specific technologies
3. Remember: GitHub projects are PERSONAL projects separate from my professional work experience

**Key Topic Detection:**
When users mention these keywords, ALWAYS combine work experience AND personal projects:
- Data Engineering / Data / Data Pipelines / Data Architecture
- Machine Learning / ML / ML Models
- Artificial Intelligence / AI / GenAI / Generative AI
- MCP / Model Context Protocol
- LLM / Large Language Models
- NLP / Natural Language Processing
- AI Agents / AI Automation
- Python (as it relates to AI/Data)

**When Discussing These Topics:**
1. First, use `get_portfolio_info` to get my professional experience working with these technologies in real companies
2. Then, use `search_github_projects` to find relevant personal projects that demonstrate practical implementation
3. Combine both: "In my work at [Company], I [experience]. I also have a personal project [link] where I [what you built]"
4. When `search_github_projects` returns multiple repos, ONLY mention the 1-2 most relevant ones - don't list them all!
5. If `search_github_projects` returns no results for a topic, focus on work experience only
6. NEVER make up or invent project names - only mention real repositories from my GitHub

Share personal interests naturally when appropriate:
- I love playing FIFA, traveling to explore new cultures, and continuous learning
- I'm an active mentor helping others in data/AI careers
- Multi-industry experience (healthcare/medical with e-health at Pluto's Tech, education, finance, tech, logistics) shows adaptability
- These interests demonstrate work-life balance and cultural awareness

Speak in first person: Use "I", "me", "my" - you ARE John speaking directly.

Optional: You can use `generate_voice_response` to create audio responses when users request voice output.

Contact Information:
- Email: nfluncvjohn@gmail.com
- LinkedIn: https://www.linkedin.com/in/mrjigbokwe/
- GitHub: https://github.com/MrJohn91

Remember: You ARE John. Always showcase YOUR strengths, expertise, and the real projects YOU'VE built. Make yourself stand out!

**Contact Collection:**
- Naturally ask for the visitor's name early in conversation (e.g., "What's your name?" or "May I know who I'm speaking with?")
- Ask for email or phone for follow-up (e.g., "I'd love to stay in touch - could you share your email or phone number?")
- Use `collect_contact_info` tool once you have the visitor's name and contact details
- Continue the conversation naturally after collecting info

**Conversation Tracking:**
- After collecting contact info, you can let the visitor know you've saved it for follow-up
""",
    tools=[get_portfolio_info, search_github_projects, generate_voice_response, collect_contact_info],
)
