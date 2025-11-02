"""
Conversation Service - Store and analyze portfolio conversations
Uses direct Notion API calls to save conversation data with AI-powered analysis
"""

import os
import requests
from typing import List, Dict, Optional
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
import sys

# Load environment variables
project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")

# Import Google Gemini for AI analysis
from google import genai
from google.genai import types

class ConversationService:
    """Service for storing and analyzing portfolio conversations in Notion"""
    
    def __init__(self):
        self.api_key = os.getenv("NOTION_API_KEY")
        self.database_id = os.getenv("NOTION_CONVERSATIONS_DB_ID")
        self.gemini_api_key = os.getenv("GOOGLE_GEMINI_API_KEY")
        
        if not self.api_key or not self.database_id:
            raise ValueError("NOTION_API_KEY or NOTION_CONVERSATIONS_DB_ID not found in .env")
        
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    
    def analyze_conversation(self, messages: List[Dict]) -> Dict:
        """
        Analyze conversation to extract topics, sentiment, and generate summary using Gemini.
        
        Args:
            messages: List of conversation messages with 'role' and 'content'
        
        Returns:
            Dictionary with topics, sentiment, summary, and interest_level
        """
        if not self.gemini_api_key:
            # Fallback analysis if Gemini not available
            return {
                "topics": [],
                "sentiment": "Neutral",
                "summary": "Conversation logged without AI analysis",
                "interest_level": "Medium"
            }
        
        try:
            # Format conversation for Gemini
            conversation_text = ""
            for msg in messages:
                role = msg.get('role', 'user')
                content = msg.get('content', '')
                conversation_text += f"{role.upper()}: {content}\n\n"
            
            client = genai.Client(api_key=self.gemini_api_key)
            
            # Create analysis prompt
            analysis_prompt = f"""
Analyze the following conversation between a recruiter and John Igbokwe's AI portfolio agent.

Conversation:
{conversation_text}

Provide a JSON response with:
1. topics: List of key topics discussed (e.g., ["Python", "Data Engineering", "Machine Learning", "Experience", "Skills"])
2. sentiment: Overall sentiment - one of: "Positive", "Neutral", "Negative", "Very Interested"
3. summary: A 2-3 sentence summary of the conversation
4. interest_level: Interest level - one of: "High", "Medium", "Low"

Respond in this exact JSON format:
{{
    "topics": ["topic1", "topic2"],
    "sentiment": "Sentiment",
    "summary": "Brief summary",
    "interest_level": "Interest"
}}
"""
            
            response = client.models.generate_content(
                model='gemini-2.0-flash-exp',
                contents=analysis_prompt
            )
            
            # Parse JSON response
            import json
            analysis_text = response.text.strip()
            # Remove markdown code blocks if present
            if analysis_text.startswith("```json"):
                analysis_text = analysis_text[7:]
            if analysis_text.startswith("```"):
                analysis_text = analysis_text[3:]
            if analysis_text.endswith("```"):
                analysis_text = analysis_text[:-3]
            analysis_text = analysis_text.strip()
            
            analysis = json.loads(analysis_text)
            
            return {
                "topics": analysis.get("topics", []),
                "sentiment": analysis.get("sentiment", "Neutral"),
                "summary": analysis.get("summary", "No summary available"),
                "interest_level": analysis.get("interest_level", "Medium")
            }
            
        except Exception as e:
            print(f"Error in AI analysis: {e}")
            # Fallback to basic analysis
            topics = []
            if any(word in conversation_text.lower() for word in ["skill", "experience", "project"]):
                topics.append("Skills & Experience")
            if any(word in conversation_text.lower() for word in ["hire", "job", "position", "role"]):
                topics.append("Job Opportunity")
            if any(word in conversation_text.lower() for word in ["contact", "email", "reach out"]):
                topics.append("Follow-up")
            
            return {
                "topics": topics if topics else ["General Inquiry"],
                "sentiment": "Neutral",
                "summary": f"Conversation with {len(messages)} messages",
                "interest_level": "Medium"
            }
    
    def save_conversation(self, name: str, email: str, phone: str, messages: List[Dict]) -> str:
        """
        Save conversation to Notion with AI-powered analysis.
        
        Args:
            name: Visitor's name
            email: Contact email
            phone: Contact phone (optional)
            messages: Full conversation messages
        
        Returns:
            Notion page ID of the saved conversation
        """
        try:
            # Analyze conversation
            analysis = self.analyze_conversation(messages)
            
            # Format full transcript
            transcript = ""
            for msg in messages:
                role = msg.get('role', 'user')
                content = msg.get('content', '')
                transcript += f"[{role.upper()}]: {content}\n\n"
            
            # Build properties for Notion page
            properties = {
                "Name": {
                    "title": [{"text": {"content": name}}]
                },
                "Email": {
                    "email": email
                },
                "Phone": {
                    "phone_number": phone if phone else None
                },
                "Date": {
                    "date": {
                        "start": datetime.now().isoformat()
                    }
                },
                "Topics Discussed": {
                    "multi_select": [{"name": topic.replace(",", " ")} for topic in analysis["topics"]]
                },
                "Sentiment": {
                    "select": {"name": analysis["sentiment"]}
                },
                "Conversation Summary": {
                    "rich_text": [{"text": {"content": analysis["summary"]}}]
                },
                "Full Transcript": {
                    "rich_text": [{"text": {"content": transcript}}]
                },
                "Interest Level": {
                    "select": {"name": analysis["interest_level"]}
                },
                "Follow-up Required": {
                    "checkbox": analysis["sentiment"] in ["Very Interested", "Positive"]
                },
                "Status": {
                    "select": {"name": "New"}
                }
            }
            
            # Remove None values
            properties = {k: v for k, v in properties.items() if v is not None}
            # Special handling for phone
            if not phone:
                properties["Phone"] = {"phone_number": None}
            
            # Create page in Notion
            response = requests.post(
                'https://api.notion.com/v1/pages',
                headers=self.headers,
                json={
                    "parent": {"database_id": self.database_id},
                    "properties": properties
                }
            )
            
            if response.status_code != 200:
                print(f"Error saving conversation: {response.text}")
                return None
            
            page_id = response.json()["id"]
            print(f"✅ Conversation saved to Notion: {page_id}")
            return page_id
            
        except Exception as e:
            print(f"Error saving conversation: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def get_recent_conversations(self, limit: int = 10) -> List[Dict]:
        """
        Retrieve recent conversations from Notion.
        
        Args:
            limit: Maximum number of conversations to return
        
        Returns:
            List of conversation records
        """
        try:
            response = requests.post(
                f'https://api.notion.com/v1/databases/{self.database_id}/query',
                headers=self.headers,
                json={
                    "sorts": [{"property": "Date", "direction": "descending"}],
                    "page_size": limit
                }
            )
            
            if response.status_code != 200:
                print(f"Error querying conversations: {response.text}")
                return []
            
            results = response.json().get("results", [])
            return self._format_conversations(results)
            
        except Exception as e:
            print(f"Error retrieving conversations: {e}")
            return []
    
    @staticmethod
    def _format_conversations(results: List[Dict]) -> List[Dict]:
        """Format Notion API responses into cleaner dictionaries"""
        formatted = []
        
        for result in results:
            props = result.get("properties", {})
            formatted_entry = {
                "id": result["id"],
                "name": ConversationService._extract_title(props, "Name"),
                "email": ConversationService._extract_email(props, "Email"),
                "phone": ConversationService._extract_phone(props, "Phone"),
                "date": ConversationService._extract_date(props, "Date"),
                "topics": ConversationService._extract_multi_select(props, "Topics Discussed"),
                "sentiment": ConversationService._extract_select(props, "Sentiment"),
                "summary": ConversationService._extract_rich_text(props, "Conversation Summary"),
                "interest_level": ConversationService._extract_select(props, "Interest Level"),
                "follow_up_required": ConversationService._extract_checkbox(props, "Follow-up Required"),
                "status": ConversationService._extract_select(props, "Status")
            }
            formatted.append(formatted_entry)
        
        return formatted
    
    @staticmethod
    def _extract_title(props: Dict, key: str) -> str:
        """Extract title value"""
        return " ".join([text["plain_text"] for text in props.get(key, {}).get("title", [])])
    
    @staticmethod
    def _extract_select(props: Dict, key: str) -> Optional[str]:
        """Extract select value"""
        select_obj = props.get(key, {}).get("select")
        return select_obj.get("name") if select_obj else None
    
    @staticmethod
    def _extract_rich_text(props: Dict, key: str) -> str:
        """Extract rich text value"""
        return " ".join([text["plain_text"] for text in props.get(key, {}).get("rich_text", [])])
    
    @staticmethod
    def _extract_email(props: Dict, key: str) -> Optional[str]:
        """Extract email value"""
        return props.get(key, {}).get("email")
    
    @staticmethod
    def _extract_phone(props: Dict, key: str) -> Optional[str]:
        """Extract phone value"""
        return props.get(key, {}).get("phone_number")
    
    @staticmethod
    def _extract_date(props: Dict, key: str) -> Optional[str]:
        """Extract date value"""
        date_obj = props.get(key, {}).get("date")
        return date_obj.get("start") if date_obj else None
    
    @staticmethod
    def _extract_multi_select(props: Dict, key: str) -> List[str]:
        """Extract multi-select values"""
        return [item["name"] for item in props.get(key, {}).get("multi_select", [])]
    
    @staticmethod
    def _extract_checkbox(props: Dict, key: str) -> bool:
        """Extract checkbox value"""
        return props.get(key, {}).get("checkbox", False)

