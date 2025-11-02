# Notion Portfolio Database Schema

## Main Database: "John's Portfolio"

### Properties:

1. **Name** (Title)
   - Type: Title
   - Purpose: Entry name

2. **Type** (Select)
   - Options: Bio, Skill, Experience, Education, Project, Contact, Other

3. **Category** (Select)
   - For Experience: Previous Roles, Current Work, Volunteer
   - For Education: Degree, Certification, Course
   - For Skills: Technical, Soft Skills, Tools

4. **Content** (Rich Text)
   - Main description/details

5. **Start Date** (Date)
   - When applicable

6. **End Date** (Date)
   - When applicable (null for current)

7. **Location** (Text)
   - Company/Institution location

8. **Tech Stack** (Multi-select)
   - For projects and experience

9. **URL/Link** (URL)
   - GitHub, LinkedIn, website, etc.

10. **Priority** (Select)
    - High, Medium, Low - for featured items

11. **Status** (Select)
    - Active, Archived, Featured

12. **Summary** (Rich Text)
    - Short 1-2 sentence summary

13. **Tags** (Multi-select)
    - Custom tags for filtering

14. **Display Order** (Number)
    - For ordering on website

