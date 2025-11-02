"""
PDF Parser Utility for Extracting Resume Data
Parses John Igbokwe's resume PDF and structures the data for Notion import
"""

import re
from pathlib import Path
from typing import Dict, List, Optional
import PyPDF2
from pdfminer.high_level import extract_text
from pdfminer.layout import LTTextContainer

class ResumeParser:
    """Parse resume PDF and extract structured data."""
    
    def __init__(self, pdf_path: str):
        self.pdf_path = Path(pdf_path)
        self.full_text = ""
        self.parsed_data = {
            "personal_info": {},
            "experience": [],
            "education": [],
            "skills": [],
            "projects": [],
            "languages": []
        }
    
    def extract_text_from_pdf(self) -> str:
        """Extract all text from PDF using pdfminer."""
        try:
            text = extract_text(str(self.pdf_path))
            self.full_text = text
            return text
        except Exception as e:
            print(f"Error extracting text: {e}")
            return ""
    
    def extract_metadata(self) -> Dict:
        """Extract PDF metadata (author, title, etc.)."""
        try:
            with open(self.pdf_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                metadata = pdf_reader.metadata
                return {
                    "title": metadata.get("/Title", ""),
                    "author": metadata.get("/Author", ""),
                    "creator": metadata.get("/Creator", "")
                }
        except Exception as e:
            print(f"Error reading metadata: {e}")
            return {}
    
    def parse_sections(self) -> Dict:
        """Parse resume into structured sections."""
        if not self.full_text:
            self.extract_text_from_pdf()
        
        # Common resume section headers (case-insensitive)
        section_patterns = {
            "experience": r"(experience|work\s*experience|employment|professional\s*experience|work\s*history)",
            "education": r"(education|academic\s*background|qualifications)",
            "skills": r"(skills|technical\s*skills|competencies)",
            "projects": r"(projects|key\s*projects|portfolio)",
            "certifications": r"(certifications|certificates)",
            "languages": r"(languages)",
            "contact": r"(contact|reach|get\s*in\s*touch)"
        }
        
        # Split text by sections
        sections = {}
        lines = self.full_text.split('\n')
        current_section = None
        current_content = []
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Check if line is a section header
            is_header = False
            for section_name, pattern in section_patterns.items():
                if re.search(pattern, line, re.IGNORECASE):
                    # Save previous section
                    if current_section:
                        sections[current_section] = '\n'.join(current_content)
                    current_section = section_name
                    current_content = []
                    is_header = True
                    break
            
            if not is_header and current_section:
                current_content.append(line)
            elif not is_header and not current_section:
                # Content before first section (likely personal info)
                if "personal_info" not in sections:
                    sections["personal_info"] = []
                if isinstance(sections.get("personal_info"), list):
                    sections["personal_info"].append(line)
        
        # Save last section
        if current_section:
            sections[current_section] = '\n'.join(current_content)
        
        if "personal_info" in sections and isinstance(sections["personal_info"], list):
            sections["personal_info"] = '\n'.join(sections["personal_info"])
        
        return sections
    
    def structure_data(self) -> Dict:
        """Structure parsed resume data for Notion."""
        sections = self.parse_sections()
        
        # Extract contact info
        text = self.full_text.lower()
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        email = re.search(email_pattern, self.full_text, re.IGNORECASE)
        
        linkedin_pattern = r'linkedin\.com/in/[\w-]+'
        linkedin = re.search(linkedin_pattern, text)
        
        github_pattern = r'github\.com/[\w-]+'
        github = re.search(github_pattern, text)
        
        self.parsed_data["personal_info"] = {
            "email": email.group() if email else "",
            "linkedin": f"https://{linkedin.group()}" if linkedin else "",
            "github": f"https://{github.group()}" if github else "",
            "raw_text": sections.get("personal_info", "")
        }
        
        # Structure experience
        if "experience" in sections:
            self.parsed_data["experience"] = self._parse_experience(sections["experience"])
        
        # Structure education
        if "education" in sections:
            self.parsed_data["education"] = self._parse_education(sections["education"])
        
        # Structure skills
        if "skills" in sections:
            self.parsed_data["skills"] = self._parse_skills(sections["skills"])
        
        return self.parsed_data
    
    def _parse_experience(self, text: str) -> List[Dict]:
        """Parse experience section."""
        # Simple regex-based parsing - can be enhanced
        experiences = []
        # Split by potential job entries
        # This is a simplified parser - you may need to adjust based on your resume format
        lines = text.split('\n')
        # TODO: Implement more sophisticated parsing
        return experiences
    
    def _parse_education(self, text: str) -> List[Dict]:
        """Parse education section."""
        # Similar to experience
        return []
    
    def _parse_skills(self, text: str) -> List[str]:
        """Parse skills section."""
        # Split by common delimiters
        skills = re.split(r'[,;•|\n]', text)
        return [s.strip() for s in skills if s.strip()]
    
    def get_full_text(self) -> str:
        """Return full extracted text."""
        if not self.full_text:
            self.extract_text_from_pdf()
        return self.full_text

if __name__ == "__main__":
    # Test parser
    resume_path = "../../Resume/John_a_Igbokwe_Resume.pdf"
    parser = ResumeParser(resume_path)
    
    print("Extracting text from PDF...")
    text = parser.extract_text_from_pdf()
    print(f"Extracted {len(text)} characters")
    print("\n--- First 500 characters ---")
    print(text[:500])
    
    print("\n--- Parsing sections ---")
    sections = parser.parse_sections()
    for section, content in sections.items():
        print(f"\n{section.upper()}:")
        print(content[:200] + "..." if len(content) > 200 else content)

