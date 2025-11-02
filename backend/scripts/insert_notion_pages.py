"""
Insert pages into Notion database using direct API calls
Helper script to populate the portfolio database
"""

import json
import os
from pathlib import Path
from dotenv import load_dotenv

project_root = Path(__file__).parent.parent.parent
load_dotenv(project_root / ".env")

def insert_entry(entry_data, db_id, notion_token):
    """Insert a single entry into Notion database"""
    import requests
    
    headers = {
        'Authorization': f'Bearer {notion_token}',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
    
    # Build the page data
    page_data = {
        "parent": {"database_id": db_id},
        "properties": {}
    }
    
    # Convert entry to Notion format
    if "name" in entry_data:
        page_data["properties"]["Name"] = {
            "title": [{"text": {"content": entry_data["name"]}}]
        }
    
    if "type" in entry_data:
        page_data["properties"]["Type"] = {
            "select": {"name": entry_data["type"]}
        }
    
    if "category" in entry_data:
        page_data["properties"]["Category"] = {
            "select": {"name": entry_data["category"]}
        }
    
    if "content" in entry_data and entry_data["content"]:
        page_data["properties"]["Content"] = {
            "rich_text": [{"text": {"content": entry_data["content"]}}]
        }
    
    if "level" in entry_data:
        page_data["properties"]["Level"] = {
            "select": {"name": entry_data["level"]}
        }
    
    if "location" in entry_data:
        page_data["properties"]["Location"] = {
            "rich_text": [{"text": {"content": entry_data["location"]}}]
        }
    
    if "url" in entry_data and entry_data["url"]:
        page_data["properties"]["URL"] = {
            "url": entry_data["url"]
        }
    
    if "tech_stack" in entry_data and entry_data["tech_stack"]:
        tech_list = [tech.strip() for tech in str(entry_data["tech_stack"]).split(",")]
        page_data["properties"]["Tech Stack"] = {
            "multi_select": [{"name": tech} for tech in tech_list]
        }
    
    if "priority" in entry_data:
        page_data["properties"]["Priority"] = {
            "select": {"name": entry_data["priority"]}
        }
    
    if "status" in entry_data:
        page_data["properties"]["Status"] = {
            "select": {"name": entry_data["status"]}
        }
    
    if "display_order" in entry_data:
        page_data["properties"]["Display Order"] = {
            "number": entry_data["display_order"]
        }
    
    # Make the API call
    response = requests.post(
        'https://api.notion.com/v1/pages',
        headers=headers,
        json=page_data
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"❌ Error inserting {entry_data.get('name', 'unknown')}: {response.status_code}")
        print(f"Response: {response.text[:200]}")
        return None

if __name__ == "__main__":
    # Load entries
    entries_file = project_root / "notion_entries_ready.json"
    with open(entries_file, 'r') as f:
        entries = json.load(f)
    
    db_id = os.getenv("NOTION_DATABASE_ID")
    notion_token = os.getenv("NOTION_API_KEY")
    
    if not db_id or not notion_token:
        print("❌ Missing NOTION_DATABASE_ID or NOTION_API_KEY in .env")
        sys.exit(1)
    
    print(f"🚀 Inserting {len(entries)} entries into Notion...")
    
    successful = 0
    failed = 0
    
    for i, entry in enumerate(entries, 1):
        result = insert_entry(entry, db_id, notion_token)
        if result:
            successful += 1
            print(f"✅ [{i}/{len(entries)}] {entry.get('name', 'Unknown')}")
        else:
            failed += 1
            print(f"❌ [{i}/{len(entries)}] Failed: {entry.get('name', 'Unknown')}")
    
    print(f"\n📊 Summary: {successful} successful, {failed} failed")

