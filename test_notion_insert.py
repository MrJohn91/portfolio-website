"""Quick test to insert one entry into Notion"""
import json
import requests
import os
from pathlib import Path
from dotenv import load_dotenv

project_root = Path(__file__).parent
load_dotenv(project_root / ".env")

db_id = os.getenv("NOTION_DATABASE_ID")
notion_token = os.getenv("NOTION_API_KEY")

print(f"Token: {notion_token[:20]}...")
print(f"DB ID: {db_id}")

headers = {
    'Authorization': f'Bearer {notion_token}',
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json'
}

# Test with bio entry
page_data = {
    "parent": {"database_id": db_id},
    "properties": {
        "Name": {"title": [{"text": {"content": "John Igbokwe - AI & Data Engineer"}}]},
        "Type": {"select": {"name": "Bio"}},
        "Category": {"select": {"name": "AI/ML"}},
        "Content": {"rich_text": [{"text": {"content": "Over 9 years of experience"}}]},
        "Location": {"rich_text": [{"text": {"content": "Berlin, Germany"}}]},
        "URL": {"url": "https://www.linkedin.com/in/mrjigbokwe/"},
        "Priority": {"select": {"name": "High"}},
        "Status": {"select": {"name": "Active"}}
    }
}

response = requests.post('https://api.notion.com/v1/pages', headers=headers, json=page_data)

print(f"\nStatus: {response.status_code}")
if response.status_code == 200:
    print("✅ Success! Entry created")
    print(f"Page URL: {response.json().get('url')}")
else:
    print(f"❌ Error: {response.text}")

