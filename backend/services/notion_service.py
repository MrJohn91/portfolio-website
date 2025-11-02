"""
Notion Service - Query and manage portfolio data
Uses direct Notion API calls since notion-client doesn't have query method
"""

import os
import requests
from typing import List, Dict, Optional
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
# Try to load from parent directories or just use environment variables
try:
    project_root = Path(__file__).parent.parent.parent
    load_dotenv(project_root / ".env")
except:
    pass  # Use environment variables instead

class NotionService:
    """Service for interacting with Notion database"""
    
    def __init__(self):
        self.api_key = os.getenv("NOTION_API_KEY")
        self.database_id = os.getenv("NOTION_DATABASE_ID")
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    
    def get_all_entries(self, entry_type: Optional[str] = None) -> List[Dict]:
        """Get all entries from database, optionally filtered by type"""
        filter_dict = {}
        
        # Also filter by Active status
        status_filter = {
            "property": "Status",
            "select": {"equals": "Active"}
        }
        
        if entry_type:
            type_filter = {
                "property": "Type",
                "select": {"equals": entry_type}
            }
            filter_dict = {
                "and": [type_filter, status_filter]
            }
        else:
            filter_dict = status_filter
        
        # Query database using direct API
        response = requests.post(
            f'https://api.notion.com/v1/databases/{self.database_id}/query',
            headers=self.headers,
            json={
                "filter": filter_dict,
                "sorts": [{"property": "Display Order", "direction": "ascending"}]
            }
        )
        
        if response.status_code != 200:
            print(f"Error querying Notion: {response.text}")
            return []
        
        results = response.json().get("results", [])
        return self._format_entries(results)
    
    def get_bio(self) -> Optional[Dict]:
        """Get bio entry"""
        entries = self.get_all_entries("Bio")
        return entries[0] if entries else None
    
    def get_skills(self) -> List[Dict]:
        """Get all skill entries"""
        return self.get_all_entries("Skill")
    
    def get_experience(self) -> List[Dict]:
        """Get all experience entries"""
        return self.get_all_entries("Experience")
    
    def get_education(self) -> List[Dict]:
        """Get all education entries"""
        return self.get_all_entries("Education")
    
    def get_projects(self) -> List[Dict]:
        """Get all project entries"""
        return self.get_all_entries("Project")
    
    def get_contact_info(self) -> List[Dict]:
        """Get all contact entries"""
        return self.get_all_entries("Contact")
    
    def get_knowledge_base(self) -> str:
        """Build a comprehensive knowledge base string for AI agent"""
        sections = []
        
        # Bio
        bio = self.get_bio()
        if bio:
            sections.append(f"PROFILE:\n{bio.get('content', '')}")
        
        # Experience
        experience = self.get_experience()
        if experience:
            sections.append("\nEXPERIENCE:")
            for exp in experience:
                sections.append(f"- {exp.get('name', '')}: {exp.get('content', '')[:300]}...")
        
        # Education
        education = self.get_education()
        if education:
            sections.append("\nEDUCATION:")
            for edu in education:
                sections.append(f"- {edu.get('name', '')}: {edu.get('content', '')}")
        
        # Skills
        skills = self.get_skills()
        if skills:
            sections.append("\nSKILLS:")
            skill_names = [skill.get('name', '') for skill in skills]
            sections.append(", ".join(skill_names))
        
        # Contact
        contacts = self.get_contact_info()
        if contacts:
            sections.append("\nCONTACT:")
            for contact in contacts:
                sections.append(f"- {contact.get('name', '')}: {contact.get('url', '')}")
        
        return "\n".join(sections)
    
    @staticmethod
    def _format_entries(results: List[Dict]) -> List[Dict]:
        """Format Notion API responses into cleaner dictionaries"""
        formatted = []
        
        for result in results:
            props = result.get("properties", {})
            formatted_entry = {
                "id": result["id"],
                "name": NotionService._extract_title(props, "Name"),
                "type": NotionService._extract_select(props, "Type"),
                "category": NotionService._extract_select(props, "Category"),
                "content": NotionService._extract_rich_text(props, "Content"),
                "level": NotionService._extract_select(props, "Level"),
                "location": NotionService._extract_rich_text(props, "Location"),
                "url": NotionService._extract_url(props, "URL"),
                "tech_stack": NotionService._extract_multi_select(props, "Tech Stack"),
                "priority": NotionService._extract_select(props, "Priority"),
                "status": NotionService._extract_select(props, "Status"),
                "display_order": NotionService._extract_number(props, "Display Order")
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
    def _extract_url(props: Dict, key: str) -> Optional[str]:
        """Extract URL value"""
        return props.get(key, {}).get("url")
    
    @staticmethod
    def _extract_multi_select(props: Dict, key: str) -> List[str]:
        """Extract multi-select values"""
        return [item["name"] for item in props.get(key, {}).get("multi_select", [])]
    
    @staticmethod
    def _extract_number(props: Dict, key: str) -> Optional[int]:
        """Extract number value"""
        return props.get(key, {}).get("number")
