"""
Create Notion Portfolio Database using Python notion-client
This bypasses MCP and uses direct Notion API
"""

from notion_client import Client
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from project root .env file
project_root = Path(__file__).parent.parent.parent
env_path = project_root / ".env"
load_dotenv(env_path)

def create_portfolio_database():
    """Create John's Portfolio database in Notion."""
    
    # Try to get token from environment or MCP
    notion_token = os.getenv("NOTION_API_KEY")
    
    if not notion_token or notion_token == "your_notion_integration_token_here":
        print("❌ Error: NOTION_API_KEY not configured")
        print("Please get your Notion API key from:")
        print("https://www.notion.com/my-integrations")
        print("\nOr if you're using MCP, we may need to configure this differently")
        return None
    
    # Initialize Notion client
    notion = Client(auth=notion_token)
    
    # Parent page where database will be created
    parent_page_id = "25d0f08f-cfb0-8027-99f1-d38def5e1cf2"  # Your Synctrack page
    
    # Database title
    title = [{"type": "text", "text": {"content": "John's Portfolio"}}]
    
    # Database properties with all the fields we need
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
    
    print("🔄 Creating Notion database via Python client...")
    
    try:
        # Create the database
        new_database = notion.databases.create(
            parent={"type": "page_id", "page_id": parent_page_id},
            title=title,
            properties=properties
        )
        
        database_id = new_database["id"]
        database_url = new_database.get("url", "")
        
        print("✅ Database created successfully!")
        print(f"📊 Database ID: {database_id}")
        print(f"🔗 URL: {database_url}")
        print("\n🎉 Next steps:")
        print("1. Update your .env file:")
        print(f"   NOTION_DATABASE_ID={database_id}")
        print("2. Then we'll populate it with your resume data")
        
        return database_id
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nPossible issues:")
        print("- Notion API key is invalid")
        print("- Integration doesn't have access to parent page")
        print("- Integration needs 'content' capability")
        return None

if __name__ == "__main__":
    create_portfolio_database()


