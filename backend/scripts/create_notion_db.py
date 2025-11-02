"""
Script to create Notion Portfolio Database with all required properties
Uses direct Notion API calls with proper schema
"""

import requests
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv(Path(__file__).parent.parent.parent / ".env")

NOTION_TOKEN = os.getenv("NOTION_API_KEY")

def create_portfolio_database():
    """Create the John's Portfolio database in Notion."""
    
    if not NOTION_TOKEN:
        print("❌ Error: NOTION_API_KEY not found in .env")
        print("Please add your Notion integration token to .env")
        return None
    
    headers = {
        'Authorization': f'Bearer {NOTION_TOKEN}',
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
    }
    
    # Parent workspace (you may need to adjust this based on your workspace setup)
    parent_page_id = "25d0f08f-cfb0-8027-99f1-d38def5e1cf2"  # Synctrack page or create a new parent
    
    # Database title
    title = [
        {"type": "text", "text": {"content": "John's Portfolio"}}
    ]
    
    # Database description
    description = [
        {"type": "text", "text": {"content": "Portfolio data for AI-powered website - skills, experience, education, projects"}}
    ]
    
    # Define all properties with proper Notion API format
    properties = {
        "Name": {
            "title": {}
        },
        "Type": {
            "select": {
                "options": [
                    {"name": "Bio", "color": "blue"},
                    {"name": "Skill", "color": "green"},
                    {"name": "Experience", "color": "orange"},
                    {"name": "Education", "color": "purple"},
                    {"name": "Project", "color": "yellow"},
                    {"name": "Certification", "color": "red"},
                    {"name": "Contact", "color": "gray"}
                ]
            }
        },
        "Category": {
            "select": {
                "options": [
                    {"name": "Frontend", "color": "blue"},
                    {"name": "Backend", "color": "green"},
                    {"name": "AI/ML", "color": "purple"},
                    {"name": "Data Engineering", "color": "orange"},
                    {"name": "Cloud", "color": "red"},
                    {"name": "Soft Skills", "color": "yellow"},
                    {"name": "Tools", "color": "gray"}
                ]
            }
        },
        "Content": {
            "rich_text": {}
        },
        "Level": {
            "select": {
                "options": [
                    {"name": "Expert", "color": "red"},
                    {"name": "Advanced", "color": "orange"},
                    {"name": "Intermediate", "color": "yellow"},
                    {"name": "Beginner", "color": "blue"}
                ]
            }
        },
        "Start Date": {
            "date": {}
        },
        "End Date": {
            "date": {}
        },
        "Location": {
            "rich_text": {}
        },
        "Tech Stack": {
            "multi_select": {}
        },
        "URL": {
            "url": {}
        },
        "Priority": {
            "select": {
                "options": [
                    {"name": "High", "color": "red"},
                    {"name": "Medium", "color": "yellow"},
                    {"name": "Low", "color": "gray"}
                ]
            }
        },
        "Status": {
            "select": {
                "options": [
                    {"name": "Active", "color": "green"},
                    {"name": "Archived", "color": "gray"},
                    {"name": "Featured", "color": "blue"}
                ]
            }
        },
        "Summary": {
            "rich_text": {}
        },
        "Tags": {
            "multi_select": {}
        },
        "Display Order": {
            "number": {
                "format": "number"
            }
        }
    }
    
    # Create database payload
    payload = {
        "parent": {
            "type": "page_id",
            "page_id": parent_page_id
        },
        "title": title,
        "properties": properties
    }
    
    print("🔄 Creating Notion database: John's Portfolio...")
    print(f"📄 Parent page: {parent_page_id}")
    
    try:
        response = requests.post(
            "https://api.notion.com/v1/databases",
            headers=headers,
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            database_id = result["id"]
            database_url = result.get("url", "")
            
            print("✅ Database created successfully!")
            print(f"📊 Database ID: {database_id}")
            print(f"🔗 URL: {database_url}")
            print("\n🎉 Next steps:")
            print("1. Open the database URL above")
            print("2. Add the database ID to your .env file:")
            print(f"   NOTION_DATABASE_ID={database_id}")
            print("3. Run the script to populate initial data")
            
            return database_id
        else:
            print(f"❌ Error creating database: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"❌ Exception: {e}")
        return None

if __name__ == "__main__":
    create_portfolio_database()


