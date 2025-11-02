"""
Add Resume Data to Notion Database using MCP
Combines data from SKILLS_TO_ADD.md and parsed resume
"""

import sys
import os
from pathlib import Path
import json

# Load from .env  
project_root = Path(__file__).parent.parent.parent
from dotenv import load_dotenv
load_dotenv(project_root / ".env")

# Skills from markdown file
SKILLS_DATA = {
    "Frontend": ["Next.js 14", "TypeScript", "Tailwind CSS", "React", "shadcn/ui", "Framer Motion", "ESLint"],
    "Backend": ["Python", "FastAPI", "Google Gemini ADK", "Pydantic"],
    "AI/ML": ["Machine Learning", "NLP (Natural Language Processing)", "AI Agents", "AI Automation"],
    "Cloud": ["Cloud Platforms (AWS/GCP/Azure)", "Vercel Deployment", "Git/GitHub", "Docker"],
    "Data Engineering": ["SQL", "Data Engineering", "Data Pipelines", "Power BI", "Streamlit"],
    "Tools": ["Streamlit", "Power BI", "ElevenLabs (Voice Cloning)", "OpenAI Whisper"]
}

def prepare_contact_entry():
    """Prepare contact entry with social links"""
    return [
        {
            "type": "Contact",
            "name": "LinkedIn Profile",
            "category": "Tools",
            "content": "Professional networking and connections",
            "url": "https://www.linkedin.com/in/mrjigbokwe/",
            "priority": "High",
            "status": "Active",
            "display_order": 0
        },
        {
            "type": "Contact",
            "name": "GitHub Profile",
            "category": "Tools",
            "content": "View my repositories and open-source contributions",
            "url": "https://github.com/MrJohn91",
            "priority": "High",
            "status": "Active",
            "display_order": 1
        }
    ]

def prepare_skills_entries():
    """Prepare skill entries from SKILLS_TO_ADD.md"""
    entries = []
    order = 1
    
    for category, skills in SKILLS_DATA.items():
        for skill in skills:
            entries.append({
                "type": "Skill",
                "category": category,
                "name": skill,
                "level": "Expert" if category in ["Backend", "AI/ML", "Data Engineering"] else "Advanced",
                "priority": "High",
                "status": "Active",
                "display_order": order
            })
            order += 1
    
    return entries

def prepare_bio_entry():
    """Prepare bio entry"""
    return [{
        "type": "Bio",
        "name": "John Igbokwe - AI & Data Engineer",
        "category": "AI/ML",
        "content": "Over 9 years of experience specializing in data and AI engineering, with a focus on transitioning organizations to data-driven solutions. Expertise in building scalable data architectures supporting analytics and AI, with a core competency in using technologies like Python, SQL, and cloud platforms.",
        "location": "Berlin, Germany",
        "url": "https://www.linkedin.com/in/mrjigbokwe/",
        "priority": "High",
        "status": "Active",
        "display_order": 0
    }]

def prepare_education_entries():
    """Prepare education entries"""
    return [
        {
            "type": "Education",
            "name": "WBS Coding School - AI, ML Data Science Certificate",
            "category": "AI/ML",
            "content": "Certificate - AI, ML Data Science, and Analytics",
            "priority": "High",
            "status": "Active",
            "level": "Advanced"
        },
        {
            "type": "Education",
            "name": "Imo State University - Bachelor's in Psychology",
            "category": "Cloud",  # Placeholder category
            "content": "Bachelor's - Psychology",
            "priority": "Medium",
            "status": "Active",
            "level": "Advanced"
        }
    ]

def prepare_language_entries():
    """Prepare language entries"""
    return [
        {
            "type": "Skill",
            "name": "English",
            "category": "Soft Skills",
            "content": "Fluent",
            "level": "Expert",
            "priority": "Medium",
            "status": "Active"
        },
        {
            "type": "Skill",
            "name": "Deutsch (German)",
            "category": "Soft Skills",
            "content": "B1 Level",
            "level": "Intermediate",
            "priority": "Medium",
            "status": "Active"
        }
    ]

def prepare_experience_entries():
    """Prepare experience entries from resume"""
    return [
        {
            "type": "Experience",
            "name": "Pluto's Tech - AI & Data Engineer",
            "category": "AI/ML",
            "content": "• Automated workflows and integrated AI agents to streamline processes, saving significant time and reducing manual effort across data and business operations.\n• Enhanced e-health applications by implementing AI-driven solutions for mental health management, increasing system efficiency by 40%.\n• Optimized decision-making models using machine learning and data analysis, resulting in a 50% improvement in user experience.\n• Developed optimization models using LangChain, contributing to 25% more efficient personalization solutions.",
            "location": "Berlin, Germany",
            "tech_stack": "AI, Machine Learning, NLP, GenAI, LangChain",
            "priority": "High",
            "status": "Active",
            "display_order": 1
        },
        {
            "type": "Experience",
            "name": "Univacity - Data & AI Engineer",
            "category": "AI/ML",
            "content": "• Developed AI-powered tools that personalized student study options, increasing satisfaction by 25% using Databricks\n• Streamlined processes to improve conversion rates by 15% using advanced AI models.\n• Created scalable databases that enhanced data processing efficiency by 40%, supporting a 50% increase in international recruitment.\n• Personalized user experiences with AI (NLP), boosting user engagement by 30%.\n• Led architecture of data pipelines and dashboards that supported Univacity's global network, using Power BI and Streamlit for reports to support data projects, enabling double-digit growth in application completion rates.",
            "location": "United Kingdom",
            "tech_stack": "AI, Data Engineering, NLP, Scalable Databases",
            "priority": "High",
            "status": "Active",
            "display_order": 2
        },
        {
            "type": "Experience",
            "name": "Schnellecke GmbH - Data Coordinator",
            "category": "Data Engineering",
            "content": "• Troubleshot data issues, enhancing operational efficiency.\n• Maintained extensive documentation for data sources and workflows, raising data flow efficiency by 40%.\n• Designed data integration techniques that improved overall operational metrics by 25%.\n• Engineered processing solutions that minimized downtime by 30%.",
            "location": "Bremen, Germany",
            "tech_stack": "Data Troubleshooting, Operational Efficiency, Data Documentation, Data Integration",
            "priority": "Medium",
            "status": "Active",
            "display_order": 3
        },
        {
            "type": "Experience",
            "name": "Hytel Communications - IT Solutions Architect",
            "category": "Cloud",
            "content": "• Provided comprehensive technical support, achieving an 80% customer satisfaction rate.\n• Collaborated with the sales team for client-focused technical solutions, enhancing client relationships and satisfaction.\n• Developed customized IT solutions that met specific client requirements, resulting in increased customer retention.\n• Implemented and troubleshot network solutions, optimizing connectivity by 50%.",
            "location": "Owerri, Nigeria",
            "tech_stack": "Technical Support, Customer Satisfaction, Solution Development, Network Optimization",
            "priority": "Medium",
            "status": "Active",
            "display_order": 4
        }
    ]

def prepare_top_skills_entries():
    """Prepare TOP SKILLS from resume"""
    return [
        {"type": "Skill", "name": "Python", "category": "Backend", "level": "Expert", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "SQL", "category": "Data Engineering", "level": "Expert", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Machine Learning", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Cloud Platforms", "category": "Cloud", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Data Engineering", "category": "Data Engineering", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "NLP", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "AI Agents", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "AI Automation", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Flask", "category": "Backend", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "FastAPI", "category": "Backend", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "TensorFlow", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Keras", "category": "AI/ML", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "PyTorch", "category": "AI/ML", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "MCP", "category": "Tools", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "n8n", "category": "Tools", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "MySQL", "category": "Data Engineering", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "PostgreSQL", "category": "Data Engineering", "level": "Advanced", "priority": "Medium", "status": "Active"},
        {"type": "Skill", "name": "Snowflake", "category": "Data Engineering", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Databricks", "category": "Data Engineering", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Azure Synapse", "category": "Cloud", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Microsoft Fabrics", "category": "Cloud", "level": "Advanced", "priority": "High", "status": "Active"},
        {"type": "Skill", "name": "Git", "category": "Tools", "level": "Advanced", "priority": "Medium", "status": "Active"},
    ]

def create_notion_page_data(entry: dict, db_id: str) -> dict:
    """Convert entry to Notion page creation format"""
    properties = {
        "Name": {
            "title": [
                {"text": {"content": entry["name"]}}
            ]
        },
        "Type": {
            "select": {"name": entry["type"]}
        },
        "Category": {
            "select": {"name": entry["category"]}
        }
    }
    
    if "content" in entry and entry["content"]:
        properties["Content"] = {
            "rich_text": [{"text": {"content": entry["content"]}}]
        }
    
    if "level" in entry:
        properties["Level"] = {
            "select": {"name": entry["level"]}
        }
    
    if "location" in entry:
        properties["Location"] = {
            "rich_text": [{"text": {"content": entry["location"]}}]
        }
    
    if "url" in entry and entry["url"]:
        properties["URL"] = {
            "url": entry["url"]
        }
    
    if "tech_stack" in entry and entry["tech_stack"]:
        # Parse tech_stack as comma-separated list
        tech_list = [tech.strip() for tech in str(entry["tech_stack"]).split(",")]
        properties["Tech Stack"] = {
            "multi_select": [{"name": tech} for tech in tech_list]
        }
    
    properties["Priority"] = {
        "select": {"name": entry.get("priority", "Medium")}
    }
    
    properties["Status"] = {
        "select": {"name": entry.get("status", "Active")}
    }
    
    if "display_order" in entry:
        properties["Display Order"] = {
            "number": entry["display_order"]
        }
    
    return properties

if __name__ == "__main__":
    print("🚀 Preparing Notion entries...")
    
    all_entries = []
    all_entries.extend(prepare_bio_entry())
    all_entries.extend(prepare_education_entries())
    all_entries.extend(prepare_language_entries())
    all_entries.extend(prepare_experience_entries())
    all_entries.extend(prepare_top_skills_entries())
    all_entries.extend(prepare_skills_entries())  # Additional skills from SKILLS_TO_ADD.md
    all_entries.extend(prepare_contact_entry())
    
    print(f"✅ Prepared {len(all_entries)} total entries")
    print(f"\nPreview:")
    for entry in all_entries[:5]:
        print(f"  - {entry['name']} ({entry['type']})")
    
    # Save to JSON for MCP import
    output_file = project_root / "notion_entries_ready.json"
    with open(output_file, 'w') as f:
        json.dump(all_entries, f, indent=2)
    
    print(f"\n💾 Saved to: {output_file}")
    print("\n📋 Entry breakdown:")
    print(f"  Bio: {len(prepare_bio_entry())}")
    print(f"  Education: {len(prepare_education_entries())}")
    print(f"  Languages: {len(prepare_language_entries())}")
    print(f"  Experience: {len(prepare_experience_entries())}")
    print(f"  Top Skills (from resume): {len(prepare_top_skills_entries())}")
    print(f"  Additional Skills: {len(prepare_skills_entries())}")
    print("\n🎯 Ready for MCP insertion!")

