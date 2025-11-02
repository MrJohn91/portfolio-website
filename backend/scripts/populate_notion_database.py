"""
Populate Notion Portfolio Database with Resume Data
Extracts data from PDF and creates database entries
"""

import os
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List

# Add parent directory to path for imports
sys.path.append(str(Path(__file__).parent.parent))

from utils.pdf_parser import ResumeParser

# We'll use MCP tools to add entries to Notion
# This script parses the PDF and prepares data for MCP insertion

def parse_resume():
    """Extract data from resume PDF."""
    resume_path = Path(__file__).parent.parent.parent / "Resume" / "John_a_Igbokwe_Resume.pdf"
    
    if not resume_path.exists():
        print(f"❌ Resume not found at: {resume_path}")
        return None
    
    print("📄 Parsing resume PDF...")
    parser = ResumeParser(str(resume_path))
    
    # Extract text
    text = parser.extract_text_from_pdf()
    print(f"✅ Extracted {len(text)} characters from PDF")
    
    # Structure the data
    data = parser.structure_data()
    
    return data

def prepare_notion_entries(parsed_data: Dict) -> List[Dict]:
    """Convert parsed resume data into Notion entry format."""
    entries = []
    
    # Add Bio entry
    entries.append({
        "Name": "John Igbokwe - AI & Data Engineer",
        "Type": "Bio",
        "Category": "AI/ML",
        "Content": "Over 9 years of experience specializing in data and AI engineering, working with cutting-edge technologies and delivering innovative solutions.",
        "Location": "Berlin, Germany",
        "Priority": "High",
        "Status": "Active",
        "Display Order": 1
    })
    
    # Add Skills
    if "skills" in parsed_data and parsed_data["skills"]:
        print(f"📊 Found {len(parsed_data['skills'])} skills")
        for idx, skill in enumerate(parsed_data["skills"][:20], 2):  # Limit to top 20
            entries.append({
                "Name": skill,
                "Type": "Skill",
                "Category": "AI/ML",  # Will be mapped properly
                "Level": "Expert",
                "Priority": "Medium",
                "Status": "Active",
                "Display Order": idx
            })
    
    # Add Education
    if "education" in parsed_data and parsed_data["education"]:
        print(f"🎓 Found {len(parsed_data['education'])} education entries")
        for edu in parsed_data["education"]:
            entries.append({
                "Name": edu.get("name", "Education"),
                "Type": "Education",
                "Content": edu.get("details", ""),
                "Level": "Advanced",
                "Priority": "High",
                "Status": "Active"
            })
    
    # Add Experience
    if "experience" in parsed_data and parsed_data["experience"]:
        print(f"💼 Found {len(parsed_data['experience'])} experience entries")
        for exp in parsed_data["experience"]:
            entries.append({
                "Name": exp.get("title", "Experience"),
                "Type": "Experience",
                "Content": exp.get("description", ""),
                "Location": exp.get("location", ""),
                "Priority": "High",
                "Status": "Active"
            })
    
    return entries

if __name__ == "__main__":
    print("🚀 Starting Notion database population...\n")
    
    # Parse resume
    data = parse_resume()
    if not data:
        print("❌ Failed to parse resume")
        sys.exit(1)
    
    # Prepare entries
    entries = prepare_notion_entries(data)
    print(f"\n✅ Prepared {len(entries)} database entries")
    
    print("\n📋 Preview of entries to add:")
    for entry in entries[:5]:
        print(f"  - {entry.get('Name')} ({entry.get('Type')})")
    
    print("\n⚠️  Manual Insertion Required:")
    print("Due to MCP limitations, you'll need to add these entries manually")
    print("or we can build a proper script with the Notion API.\n")
    
    # Save entries to JSON for manual review
    import json
    output_file = Path(__file__).parent.parent / "resume_entries.json"
    with open(output_file, 'w') as f:
        json.dump(entries, f, indent=2)
    
    print(f"💾 Saved entries to: {output_file}")
    print("You can review this file before adding to Notion.")

