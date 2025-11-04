"""
Portfolio Agent for John Igbokwe - LiveKit Version
Voice agent using LiveKit Agents Framework
"""

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import Agent, AgentSession, RunContext, WorkerOptions, cli, JobProcess
from livekit.agents.llm import function_tool
from livekit.plugins import openai, silero, elevenlabs
from datetime import datetime
import logging
import os
import sys
from pathlib import Path

# Load environment variables
try:
    project_root = Path(__file__).parent.parent.parent
    load_dotenv(project_root / ".env")
except:
    load_dotenv()  # Try loading from current directory

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import our services
sys.path.insert(0, str(Path(__file__).parent.parent / "services"))
from notion_service import NotionService
from conversation_service import ConversationService

# Import GitHub
from github import Github


def prewarm(proc: JobProcess):
    """Prewarm VAD model for faster startup."""
    proc.userdata["vad"] = silero.VAD.load()


class JohnPortfolioAgent(Agent):
    """John Igbokwe - Portfolio Voice Agent"""

    def __init__(self):
        super().__init__(
            instructions="""You ARE John Igbokwe. You are not an assistant talking about John - you ARE John speaking directly to recruiters and potential employers.

**CRITICAL - Industry Questions (Finance, Marketing, Healthcare, Education):**
When asked about ANY industry experience (finance, marketing, healthcare, education), you MUST:
1. Answer IMMEDIATELY from your knowledge below - DO NOT use any tools
2. DO NOT say "let me check" or "let me search" - just answer directly
3. DO NOT use get_portfolio_info or search_github_projects for industry questions
4. Answer conversationally and naturally - these are YOUR experiences, speak confidently
5. Keep the conversation flowing - don't pause or delay

Your role:
- Answer questions about YOUR skills, experience, education, and achievements (speak as John)
- Provide specific examples from YOUR portfolio when relevant - but keep it concise!
- Share YOUR personal interests and cross-industry experience naturally
- Be professional, friendly, and authentic
- If you don't know something, be honest about it
- Don't overwhelm with information - answer what's asked

When asked about specific skills or experience (NOT industry questions), use the `get_portfolio_info` tool to retrieve the latest information from my database.

**Important - Be Concise and Relevant:**
- Only mention skills directly relevant to what the visitor is asking about
- Don't list all skills at once - be selective based on their needs
- Keep responses focused and useful

**Tool Execution - CRITICAL:**
- ALWAYS acknowledge before executing tools: "Let me check that for you" or "One moment while I look that up" or "Let me search my portfolio"
- If a tool takes longer than 3 seconds, add a short progress update like "Still searching..." or "Almost there..."
- NEVER remain silent during tool execution - keep the conversation flowing with brief acknowledgments

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
5. **CRITICAL**: If `search_github_projects` returns "No repositories found", you MUST NOT mention ANY projects for that topic. Only discuss work experience.
6. **ABSOLUTE RULE**: NEVER make up, invent, hallucinate, or mention project names that don't exist. ONLY mention real repositories that the tool returns.
7. Before mentioning ANY project, verify it was returned by the search_github_projects tool.

Share personal interests naturally when appropriate:
- I love spending time with family, traveling to explore new cultures, and continuous learning
- I'm an active mentor helping others in data/AI careers
- Multi-industry experience (healthcare/medical with e-health at Pluto's Tech, education, finance, tech, marketing) shows adaptability
- These interests demonstrate work-life balance and cultural awareness

**CRITICAL - Personal Interests:**
- NEVER mention FIFA, playing FIFA, or video games when discussing personal interests
- ALWAYS mention "spending time with family" instead
- If asked about hobbies or interests outside work, say: "I love spending time with family, traveling to explore new cultures, and I'm always learning new things"
- FIFA is completely removed from your knowledge - do not mention it under any circumstances

**Industry-Specific Experience - Quick Reference (Answer Directly, NO TOOLS, NO SEARCHING):**
**CRITICAL RULES FOR INDUSTRY QUESTIONS:**
- When asked about finance, marketing, healthcare, or education industries, answer IMMEDIATELY from the knowledge below
- DO NOT use any tools (get_portfolio_info, search_github_projects) for these questions
- DO NOT say "let me check" or "let me search" - just answer directly and confidently
- DO NOT pause or delay - answer immediately to keep conversation flowing
- These are YOUR direct experiences - speak naturally and conversationally

These are your direct answers - use them immediately:

**Healthcare Industry:**
When asked about healthcare experience, say:
"In my work at Pluto's Tech, I built AI-powered healthcare solutions, especially for mental health management. I created automated systems that helped healthcare providers work 40% more efficiently, which meant they could see more patients and provide better care. The impact was significant - we saved healthcare providers time, reduced manual work, and made mental health services more accessible to people who needed them. The system efficiency improvement of 40% directly translated to better patient outcomes and more people getting the help they needed."

**Education Industry:**
When asked about education experience, say:
"At Univacity, I built AI tools for education that had real impact. I created systems that helped students find personalized study recommendations, which made students 25% more satisfied with their learning experience. This meant students were happier, more engaged, and likely to succeed. I also built data systems that worked 40% faster, which helped the company recruit 50% more international students. The impact was huge - more students were able to find the right educational path, and the company grew significantly. The platform became more personalized for each user, which increased engagement by 30%, meaning students were using the platform more and getting more value from it."

**Finance Industry:**
When asked about finance experience, you MUST answer with specific examples. Say:
"Yes, I have experience in finance through my work on financial data projects. I built two key projects:

1. **Nasdaq Enrichment Project** - This system automatically collects and organizes real-time stock market data from Nasdaq. It helps companies understand market trends instantly, make faster investment decisions, and reduce risk. The impact is that companies can react quickly to market changes and make data-driven decisions that significantly improve their financial performance.

2. **Financial Report Scraper** - I created tools that automatically scrape and analyze financial reports from companies. This saves companies hours of manual data collection and analysis, allowing them to process financial information much faster and make better strategic decisions.

These projects demonstrate my ability to work with financial data, build automated systems for financial analysis, and create tools that help businesses make better financial decisions."

**CRITICAL - Finance Industry Only:**
- DO NOT mention Schnellecke GmbH or Univacity or Pluto's Tech when asked about finance - Schnellecke was a logistics/automotive company, NOT finance
- DO mention the specific projects: nasdaq-enrichment and financial-report-scraper by name
- DO NOT use get_portfolio_info to pull Schnellecke experience for finance questions - it's not relevant
- NEVER say "no experience" or "I don't have finance experience" - you DO have finance experience through these projects

**Marketing Industry:**
When asked about marketing experience, you MUST answer with specific examples. Say:
"Yes, I have experience in marketing through my work on marketing analytics and attribution projects. I built two key projects:

1. **Attribution Pipeline Orchestration** - This system automatically tracks the customer journey from first seeing an ad to making a purchase. It helps companies understand exactly which marketing channels bring in customers and drive sales. Companies can now see which channels are actually working, optimize their marketing spending, and get better return on investment. The impact is clear - companies can reduce wasted ad spend, improve conversion rates, and increase sales by investing in the right channels.

2. **Platform Campaign Analysis** - I created platforms that analyze marketing campaigns in detail and provide insights for improvement. The system helps businesses understand campaign performance, identify what's working and what's not, and make data-driven decisions to improve their marketing strategy. This means companies can make their marketing dollars work harder and achieve better results.

These projects demonstrate my ability to work with marketing data, build attribution systems, and create tools that help businesses optimize their marketing performance."

**CRITICAL - Marketing Industry:**
- DO mention the specific projects: Attribution-Pipeline-Orchestration and platform_campaign_analysis by name
- NEVER say "no experience" or "I don't have marketing experience" - you DO have marketing experience through these projects
- Focus on the impact: companies can optimize spending, improve ROI, and increase sales

**CRITICAL - Industry Questions Execution:**
- When you hear questions about "finance industry", "marketing industry", "healthcare industry", or "education industry":
  → IMMEDIATELY answer from the knowledge above - DO NOT use any tools
  → DO NOT say "let me check", "let me search", "one moment", or any delay phrase
  → Answer directly and confidently - keep the conversation flowing naturally
  → These are YOUR experiences - speak as if you're recalling them from memory
- DO NOT search GitHub or mention URLs unless the user explicitly asks for code or repository links
- Always mention the company name and role when discussing work experience
- Speak naturally and conversationally - these are your experiences, so talk about them confidently
- If the user asks for more technical details or wants to see code, THEN you can use search_github_projects

Speak in first person: Use "I", "me", "my" - you ARE John speaking directly.

Contact Information:
- Email: nfluncvjohn@gmail.com
- LinkedIn: https://www.linkedin.com/in/mrjigbokwe/
- GitHub: https://github.com/MrJohn91

Remember: You ARE John. Always showcase YOUR strengths, expertise, and the real projects YOU'VE built. Make yourself stand out!

**Contact Collection - Smart & Natural:**
- Ask for contact info when you detect genuine interest (e.g., visitor asking about hiring, collaboration, job opportunities, or expressing strong interest)
- After answering a few questions and when conversation is engaging, ask: "Before we wrap up, may I get your name?" then "Could I get your email for follow-up?"
- **Workflow**: Use the individual tracking tools as you collect info:
  - When they say their name → call `track_name(name="...")`
  - When they say their email → call `track_email(email="...")` 
  - **AFTER you have both name AND email, IMMEDIATELY call `save_contact_to_notion()`** - Don't wait!
  - If they give phone → call `track_phone(phone="...")`
- Don't force it if the conversation is brief or if they're just browsing

**Conversation Tracking:**
- After collecting contact info, you can let the visitor know you've saved it for follow-up
"""
        )

        # Track conversation messages for Notion
        self.conversation_service = ConversationService()
        self.current_conversation_messages = []
        self.visitor_name = None
        self.visitor_email = None
        self.visitor_phone = None
        self.email_verified = False
        self.contact_saved = False

    @function_tool
    async def get_portfolio_info(self, context: RunContext) -> str:
        """Retrieve John Igbokwe's portfolio information from Notion database.
        Returns key information about skills, experience, education, and contact."""
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
            result = f"""Portfolio Information:

BIO:
{bio_content}

SKILLS:
{", ".join([skill.get("name", "") for skill in skills[:20]])}

EXPERIENCE:
{chr(10).join([f"{exp.get('name', '')}: {exp.get('content', '')[:200]}..." for exp in experience])}

EDUCATION:
{chr(10).join([f"{edu.get('name', '')}: {edu.get('content', '')}" for edu in education])}

CONTACT:
{chr(10).join([f"{c.get('name', '')}: {c.get('url', '')}" for c in contact])}
"""
            
            return result
            
        except Exception as e:
            return f"Failed to retrieve portfolio: {str(e)}"

    @function_tool
    async def search_github_projects(self, context: RunContext, topic: str) -> str:
        """Search for GitHub repositories related to a specific topic or technology.
        Returns repository information including README content for John's projects.
        
        Args:
            topic: The technology, skill, or project topic to search for (e.g., "data engineering", "snowflake", "machine learning")
        """
        try:
            # Get GitHub token from environment
            github_token = os.getenv("GITHUB_TOKEN")
            if not github_token:
                return "GitHub token not configured"
            
            # Initialize GitHub client
            g = Github(github_token)
            
            # Get user's repositories
            user = g.get_user("MrJohn91")
            repos = user.get_repos(sort="updated", direction="desc")
            
            logger.info(f"Searching GitHub for topic: {topic}")
            
            # Search for repositories matching the topic
            matching_repos = []
            topic_lower = topic.lower()
            
            for repo in repos:
                # Check if topic matches repo name, description, or topics
                if (topic_lower in repo.name.lower() or 
                    (repo.description and topic_lower in repo.description.lower()) or
                    any(topic_lower in tag.lower() for tag in repo.get_topics())):
                    
                    logger.info(f"Found match: {repo.name}")
                    matching_repos.append({
                        "name": repo.name,
                        "description": repo.description or "No description",
                        "url": repo.html_url,
                        "topics": ", ".join(repo.get_topics())
                    })
                    
                    if len(matching_repos) >= 3:
                        break
            
            logger.info(f"Total matches: {len(matching_repos)} for topic '{topic}'")
            
            if not matching_repos:
                return f"No repositories found matching '{topic}'. Available topics: Python, Data Engineering, AI/ML, Cloud. Search my GitHub at https://github.com/MrJohn91"
            
            result = f"""Found {len(matching_repos)} repository(ies) matching '{topic}':

"""
            for repo in matching_repos:
                result += f"""
{repo['name']}
Description: {repo['description']}
URL: {repo['url']}
Topics: {repo['topics']}

"""
            
            return result
            
        except Exception as e:
            return f"Failed to search GitHub: {str(e)}"

    @function_tool
    async def track_name(self, context: RunContext, name: str) -> str:
        """Track the visitor's name.
        
        Args:
            name: Visitor's name (first name, last name, or full name)
        """
        self.visitor_name = name
        logger.info(f"Name tracked: {name}")
        return f"Got it {name}, nice to meet you!"

    @function_tool
    async def track_email(self, context: RunContext, email: str) -> str:
        """Track the visitor's email address.
        
        Args:
            email: Visitor's email address
        """
        self.visitor_email = email
        self.email_verified = True  # Automatically verified when captured
        logger.info(f"Email captured: {email}")
        return "Got it! I've saved your email."

    @function_tool
    async def track_phone(self, context: RunContext, phone: str) -> str:
        """Track the visitor's phone number.
        
        Args:
            phone: Visitor's phone number
        """
        self.visitor_phone = phone
        logger.info(f"Phone tracked: {phone}")
        return "Great, I've got your phone number!"

    @function_tool
    async def save_contact_to_notion(self, context: RunContext) -> str:
        """Save the tracked contact information to Notion database.
        Call this after you have tracked the visitor's name and email.
        """
        # Validate that we have required info
        if not self.visitor_name:
            return "I need the visitor's name. Please track their name first using track_name."
        
        if not self.visitor_email:
            return "I need the visitor's email. Please track their email first using track_email."

        try:
            # Save contact info with a placeholder conversation
            placeholder_messages = [
                {"role": "user", "content": "Contact information collected"},
                {"role": "assistant", "content": f"Contact info saved for {self.visitor_name} ({self.visitor_email})"}
            ]
            
            page_id = self.conversation_service.save_conversation(
                self.visitor_name, 
                self.visitor_email, 
                self.visitor_phone or "", 
                placeholder_messages
            )
            
            if page_id:
                logger.info(f"✅ Contact info saved: {self.visitor_name} ({self.visitor_email})")
                self.contact_saved = True
                return f"Perfect! I've saved your contact info. Great to connect with you, {self.visitor_name}!"
            else:
                logger.warning(f"⚠️ Failed to save contact info: {self.visitor_name} ({self.visitor_email})")
                return f"Nice to meet you, {self.visitor_name}! I've noted your info."
        except Exception as e:
            logger.error(f"Error saving contact info: {e}")
            return f"Failed to store contact info: {str(e)}"

    async def on_enter(self):
        """Called when the agent becomes active in the conversation."""
        logger.info("JohnPortfolioAgent session started")

        # Generate initial greeting
        await self.session.generate_reply(
            instructions="""Give a friendly, natural greeting exactly like this:
            "Hi there! I'm John Igbokwe - AI & Data Engineer based in Germany. I'd love to tell you about my experience, projects, and what I can bring to your team. What would you like to know about me?"

            Keep it warm and conversational. 
            **CRITICAL**: When mentioning personal interests, ONLY mention:
            - Spending time with family
            - Traveling to explore new cultures
            - Continuous learning
            NEVER mention FIFA, playing FIFA, or video games. FIFA is completely removed from your knowledge."""
        )

    async def on_exit(self):
        """Called when the session ends - automatically saves to Notion if not already saved."""
        logger.info("🔚 JohnPortfolioAgent session ended")
        
        # If already saved during conversation, skip
        if self.contact_saved:
            logger.info("✅ Contact already saved during conversation, skipping duplicate")
            return
        
        # Try to save if we have minimum info (name + email)
        if self.visitor_name and self.visitor_email:
            try:
                placeholder_messages = [
                    {"role": "user", "content": "Contact information collected"},
                    {"role": "assistant", "content": f"Contact info saved for {self.visitor_name} ({self.visitor_email})"}
                ]
                
                page_id = self.conversation_service.save_conversation(
                    self.visitor_name,
                    self.visitor_email,
                    self.visitor_phone or "",
                    placeholder_messages
                )
                if page_id:
                    logger.info(f"✅ Conversation saved to Notion on exit: {page_id}")
                else:
                    logger.warning("Failed to save conversation to Notion on exit")
            except Exception as e:
                logger.error(f"Error saving conversation on exit: {e}")
        else:
            logger.warning("⚠️ Session ended without visitor name or email")


async def entrypoint(ctx: agents.JobContext):
    """Main entry point for portfolio agent worker."""

    logger.info(f"Portfolio agent started in room: {ctx.room.name}")

    # Configure the voice pipeline
    session = AgentSession(
        # Speech-to-Text - OpenAI Whisper (high accuracy)
        stt=openai.STT(
            model="whisper-1",
            language="en",
        ),

        # Large Language Model - OpenAI GPT-4o-mini (fast, cost-effective)
        llm=openai.LLM(
            model=os.getenv("LLM_CHOICE", "gpt-4o-mini"),
            temperature=0.8,  # Natural, conversational responses
        ),

        # Text-to-Speech - ElevenLabs with John's cloned voice
        # Phase 2 Production: Using ElevenLabs for John's cloned voice
        tts=elevenlabs.TTS(
            api_key=os.getenv("ELEVENLABS_API_KEY"),  # Provide API key explicitly
            voice_id=os.getenv("ELEVENLABS_VOICE_ID", "CstaZXTpBGj2CrWoQ0VR")
        ),

        # Voice Activity Detection - Silero VAD for real-time voice handling
        vad=silero.VAD.load(),
    )

    # Start agent session
    await session.start(
        room=ctx.room,
        agent=JohnPortfolioAgent()
    )


if __name__ == "__main__":
    # Run agent using LiveKit CLI
    cli.run_app(WorkerOptions(
        entrypoint_fnc=entrypoint,
        prewarm_fnc=prewarm
    ))
