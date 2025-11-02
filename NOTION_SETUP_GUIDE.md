# Notion Portfolio Database Setup Guide

## Step 1: Create Portfolio Database Manually in Notion

Go to your Notion workspace and create a new database called **"John's Portfolio"**

## Step 2: Add These Properties

### Required Properties:

1. **Name** (Title)
   - Type: Title
   - This will be the main entry identifier

2. **Type** (Select)
   - Type: Select
   - Options: Bio, Skill, Experience, Education, Project, Certification, Contact

3. **Category** (Select) 
   - Type: Select
   - Options: Frontend, Backend, AI/ML, Data Engineering, Cloud, Soft Skills, Tools

4. **Content** (Rich Text)
   - Type: Rich Text
   - Main description/details

5. **Level** (Select)
   - Type: Select  
   - Options: Expert, Advanced, Intermediate, Beginner

6. **Start Date** (Date)
   - Type: Date
   - For experience and education

7. **End Date** (Date)
   - Type: Date
   - For experience and education (leave empty for current)

8. **Location** (Text)
   - Type: Text
   - Company/Institution location

9. **Tech Stack** (Multi-select)
   - Type: Multi-select
   - For listing technologies

10. **URL** (URL)
    - Type: URL
    - GitHub, LinkedIn, website links

11. **Priority** (Select)
    - Type: Select
    - Options: High, Medium, Low

12. **Status** (Select)
    - Type: Select
    - Options: Active, Archived, Featured

13. **Summary** (Rich Text)
    - Type: Rich Text
    - Short 1-2 sentence summary

14. **Display Order** (Number)
    - Type: Number
    - For ordering on website

## Step 3: Initial Data to Add

### Skills Entries (Type: Skill)

| Name | Category | Level | Tech Stack | Summary |
|------|----------|-------|------------|---------|
| Next.js | Frontend | Expert | Next.js, React | Modern React framework with App Router |
| TypeScript | Frontend | Expert | TypeScript | Type-safe JavaScript development |
| Tailwind CSS | Frontend | Expert | Tailwind CSS | Utility-first CSS framework |
| shadcn/ui | Frontend | Advanced | React, shadcn/ui | High-quality React components |
| Python | Backend | Expert | Python | Core backend language |
| FastAPI | Backend | Advanced | FastAPI, Python | Modern Python web framework |
| Google Gemini ADK | AI/ML | Advanced | Gemini, ADK | AI agent development |
| Machine Learning | AI/ML | Advanced | Python, Scikit-learn, TensorFlow | ML model development |
| Data Engineering | Data Engineering | Expert | SQL, Python, Cloud | Data pipelines and architecture |

### Bio Entry (Type: Bio)
- Content: "Over 9 years of experience specializing in data and AI engineering..."
- Location: Bremen, Germany
- URL: LinkedIn profile

### Education Entries (Type: Education)
1. WBS Coding School - Certificate in AI, ML Data Science
2. Imo State University - Bachelor's in Psychology

## Step 4: Get Your Database ID

After creating the database:
1. Open the database
2. Check the URL: `https://www.notion.so/[WORKSPACE]/[DATABASE_ID]?v=...`
3. Copy the `DATABASE_ID` part (the long string of characters)
4. Add it to your `.env` file: `NOTION_DATABASE_ID=your_database_id_here`

## Next Steps

Once the database is created and you have the ID, we can:
1. Build Python scripts to sync data from your resume PDF
2. Create the Notion client integration in the backend
3. Set up automatic data fetching for the frontend

