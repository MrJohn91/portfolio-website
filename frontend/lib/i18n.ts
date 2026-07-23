export type Language = 'en' | 'de';

export const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    talkToMe: 'Talk to John',
    contact: 'Contact',
    
    // Hero
    subtitle: 'AI Architect & Software Developer',
    description: 'I build intelligent systems that help businesses solve real-world problems across various industries including healthcare, education, finance, marketing, and more.',
    viewProjects: 'View Projects',

    // About
    aboutTitle: 'About Me',
    about1: "Hey, I'm John - an AI Architect & Software Developer passionate about building intelligent systems that make a real impact. With experience across multiple industries, I bring diverse expertise to every project.",
    about2: "When I'm not coding, I'm mentoring others in data/AI careers, spending time with family, or traveling to explore new cultures. Continuous learning and adaptability are what drive me.",
    technologies: 'Technologies',
    skills: 'Skills',
    skillsTitle: 'Skills',
    skillsFrontend: 'Agentic AI Tools',
    skillsBackend: 'Backend',
    skillsAIML: 'AI/ML',
    skillsDataEngineering: 'Data Engineering',
    skillsCloud: 'Cloud',
    skillsTools: 'Tools',
    skillsSoftSkills: 'Soft Skills',
    
    // Experience
    experienceTitle: 'Work Experience',
    experience: 'Experience',
    
    // Work Experience - Pluto's Tech
    plutosCompany: 'Pluto\'s Tech',
    plutosRole: 'AI & Data Engineer',
    plutosLocation: 'Berlin, Germany',
    plutosBullet1: 'Automated workflows and integrated AI agents to streamline processes, saving significant time and reducing manual effort across data and business operations.',
    plutosBullet2: 'Enhanced e-health applications by implementing AI-driven solutions for mental health management, increasing system efficiency by 40%.',
    plutosBullet3: 'Optimized decision-making models using machine learning and data analysis, resulting in a 50% improvement in user experience.',
    plutosBullet4: 'Developed optimization models using LangChain, contributing to 25% more efficient personalization solutions.',
    
    // Work Experience - Univacity
    univacityCompany: 'Univacity',
    univacityRole: 'Data & AI Engineer',
    univacityLocation: 'United Kingdom',
    univacityBullet1: 'Developed AI-powered tools that personalized student study options, increasing satisfaction by 25% using Databricks.',
    univacityBullet2: 'Streamlined processes to improve conversion rates by 15% using advanced AI models.',
    univacityBullet3: 'Created scalable databases that enhanced data processing efficiency by 40%, supporting a 50% increase in international recruitment.',
    univacityBullet4: 'Personalized user experiences with AI (NLP), boosting user engagement by 30%.',
    univacityBullet5: 'Led architecture of data pipelines and dashboards that supported Univacity\'s global network, using Power BI and Streamlit for reports to support data projects, enabling double-digit growth in application completion rates.',
    
    // Work Experience - Calford AI
    calfordCompany: 'Calford AI',
    calfordRole: 'AI Lead Developer',
    calfordLocation: 'United States',
    calfordBullet1: 'Leading the development and deployment of AI-powered automation platforms for clients across industries.',
    calfordBullet2: 'Turning complex workflows into seamless, scalable digital experiences.',
    calfordBullet3: 'Focus on quality, speed, and measurable outcomes.',

    // Work Experience - micro1
    micro1Company: 'micro1',
    micro1Role: 'Software Development Expert',
    micro1Location: 'United States',
    micro1Bullet1: 'Training, fine-tuning, and evaluating AI models, while providing expert guidance and support throughout the process.',
    
    // Projects
    projectsTitle: 'Projects',
    project1Title: 'Private Enterprise AI Agent',
    project1Description: 'Self-hosted AI agent with secure private web search for complete data sovereignty. Enterprise-grade solution with SearXNG integration, Supabase conversation storage, and OpenAI-compatible API. Deployed on GPU infrastructure with qwen2.5:7b and mistral:7b models. Full compliance with GDPR, HIPAA, SOX regulations. Zero external data transmission.',
    project2Title: 'Attribution Pipeline Orchestration',
    project2Description: 'Automated marketing attribution pipeline using IHC model for multi-touch attribution. Orchestrated with Apache Airflow for daily processing. Analyzes customer journeys across Initializer, Holder, and Closer phases. Built with Python, Pandas, SQLite, and external Attribution API. Calculates ROAS and CPO metrics for data-driven marketing decisions.',
    project3Title: 'MedLive AI',
    project3Description: 'An AI-powered healthcare triage assistant that listens to patient concerns, sees symptoms via live video, auto-fills medical forms, and books appointments. Features real-time voice conversation with Dr. Liv avatar, 5-level triage assessment, and Google Calendar integration. Built with Gemini 2.5 Flash, Anam AI, WebRTC, Next.js, Python, and Google Cloud Run.',
    project4Title: 'AI-Powered Portfolio Agent',
    project4Description: 'A voice-enabled portfolio AI agent that provides current projects and resume details by pulling updated information from Notion database. Enables real-time conversation with dynamic content access through Notion CMS integration and GitHub project search, allowing the agent to perform searches and take action. Automatically collects and saves visitor information including name, email, phone number, and conversation summaries directly to Notion, enabling seamless tracking of potential collaborators and leads. Features voice cloning for natural engagement and immersive user experience. Built with Python, OpenAI Whisper for speech-to-text, GPT-4o-mini for intelligent responses, LiveKit Agents Framework, Next.js, and Three.js for immersive 3D visualization.',
    viewProject: 'View Project',
    
    // Agent
    agentSubtitle: 'Interactive AI Agent',
    agentTitle: 'Talk to John',
    agentDescription: 'Talk to John and learn more about him through conversation',
    connecting: 'Connecting to John...',
    listening: 'John is listening...',
    speaking: 'John is speaking',
    thinking: 'John is thinking...',
    readyToTalk: 'Ready to talk',
    readyToConnect: 'Ready to connect',
    talkButton: 'Talk to John',
    
    // Stats
    yearsExperience: 'Years Experience',
    industries: 'Industries',
    projects: 'Projects',
    alwaysLearning: 'Always Learning',
    
    // Contact
    contactTitle: 'Contact',
    contactDescription: "Wanna chat about AI, engineering, or just cool ideas? Let's connect.",
    email: 'Email',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    phone: 'Phone',
    
    // Footer
    copyright: 'John Igbokwe',
  },
  de: {
    // Header
    home: 'Startseite',
    about: 'Über Mich',
    talkToMe: 'Mit John Sprechen',
    contact: 'Kontakt',
    
    // Hero
    subtitle: 'KI-Architekt & Softwareentwickler',
    description: 'Ich erstelle intelligente Systeme, die Unternehmen dabei helfen, reale Probleme in verschiedenen Branchen wie Gesundheitswesen, Bildung, Finanzen, Marketing und mehr zu lösen.',
    viewProjects: 'Projekte Ansehen',
    
    // About
    aboutTitle: 'Über Mich',
    about1: 'Hallo, ich bin John - ein KI-Architekt und Softwareentwickler, der sich für den Aufbau intelligenter Systeme einsetzt, die einen echten Einfluss haben. Mit Erfahrung in verschiedenen Branchen bringe ich vielfältige Expertise in jedes Projekt ein.',
    about2: 'Wenn ich nicht programmiere, betreue ich andere in Karrieren im Bereich Daten/KI, verbringe Zeit mit meiner Familie oder reise, um neue Kulturen zu erkunden. Kontinuierliches Lernen und Anpassungsfähigkeit sind das, was mich antreibt.',
    technologies: 'Technologien',
    skills: 'Fähigkeiten',
    skillsTitle: 'Fähigkeiten',
    skillsFrontend: 'Agentische KI-Tools',
    skillsBackend: 'Backend',
    skillsAIML: 'KI/ML',
    skillsDataEngineering: 'Datenengineering',
    skillsCloud: 'Cloud',
    skillsTools: 'Werkzeuge',
    skillsSoftSkills: 'Soft Skills',
    
    // Experience
    experienceTitle: 'Berufserfahrung',
    experience: 'Erfahrung',
    
    // Work Experience - Pluto's Tech
    plutosCompany: 'Pluto\'s Tech',
    plutosRole: 'KI & Dateningenieur',
    plutosLocation: 'Berlin, Deutschland',
    plutosBullet1: 'Automatisierte Workflows und integrierte KI-Agenten zur Prozessoptimierung, wodurch erhebliche Zeit gespart und der manuelle Aufwand in Daten- und Geschäftsprozessen reduziert wurde.',
    plutosBullet2: 'Verbesserte E-Health-Anwendungen durch Implementierung KI-gestützter Lösungen für das psychische Gesundheitsmanagement, wodurch die Systemeffizienz um 40% gesteigert wurde.',
    plutosBullet3: 'Optimierte Entscheidungsmodelle mithilfe von maschinellem Lernen und Datenanalyse, was zu einer 50%igen Verbesserung der Benutzererfahrung führte.',
    plutosBullet4: 'Entwickelte Optimierungsmodelle mit LangChain, die zu 25% effizienteren Personalisierungslösungen beitrugen.',
    
    // Work Experience - Univacity
    univacityCompany: 'Univacity',
    univacityRole: 'Daten- & KI-Ingenieur',
    univacityLocation: 'Vereinigtes Königreich',
    univacityBullet1: 'Entwickelte KI-gestützte Tools, die Studienoptionen für Studenten personalisierten und die Zufriedenheit mithilfe von Databricks um 25% steigerten.',
    univacityBullet2: 'Optimierte Prozesse zur Steigerung der Konversionsraten um 15% mithilfe fortschrittlicher KI-Modelle.',
    univacityBullet3: 'Erstellte skalierbare Datenbanken, die die Datenverarbeitungseffizienz um 40% verbesserten und eine 50%ige Steigerung der internationalen Rekrutierung unterstützten.',
    univacityBullet4: 'Personalisiert Benutzererfahrungen mit KI (NLP), wodurch die Benutzerbindung um 30% gesteigert wurde.',
    univacityBullet5: 'Leitete die Architektur von Datenpipelines und Dashboards, die das globale Netzwerk von Univacity unterstützten, mit Power BI und Streamlit für Berichte zur Unterstützung von Datenprojekten, was zu zweistelligem Wachstum bei den Abschlussquoten von Bewerbungen führte.',
    
    // Work Experience - Calford AI
    calfordCompany: 'Calford AI',
    calfordRole: 'KI-Leitender Entwickler',
    calfordLocation: 'Vereinigte Staaten',
    calfordBullet1: 'Leitung der Entwicklung und Bereitstellung von KI-gestützten Automatisierungsplattformen für Kunden in verschiedenen Branchen.',
    calfordBullet2: 'Umwandlung komplexer Workflows in nahtlose, skalierbare digitale Erlebnisse.',
    calfordBullet3: 'Fokus auf Qualität, Geschwindigkeit und messbare Ergebnisse.',

    // Work Experience - micro1
    micro1Company: 'micro1',
    micro1Role: 'Software-Entwicklungsexperte',
    micro1Location: 'United States',
    micro1Bullet1: 'Training, Feinabstimmung und Bewertung von KI-Modellen, während fachkundige Anleitung und Unterstützung während des gesamten Prozesses bereitgestellt wird.',
    
    // Projects
    projectsTitle: 'Projekte',
    project1Title: 'Privater Unternehmens-KI-Agent',
    project1Description: 'Selbst gehosteter KI-Agent mit sicherer privater Websuche für vollständige Datensouveränität. Enterprise-Lösung mit SearXNG-Integration, Supabase-Gesprächsspeicherung und OpenAI-kompatibler API. Bereitgestellt auf GPU-Infrastruktur mit qwen2.5:7b und mistral:7b Modellen. Vollständige Einhaltung von GDPR, HIPAA, SOX Vorschriften. Keine externe Datenübertragung.',
    project2Title: 'Attribution-Pipeline-Orchestrierung',
    project2Description: 'Automatisierte Marketing-Attribution-Pipeline mit IHC-Modell für Multi-Touch-Attribution. Orchestriert mit Apache Airflow für tägliche Verarbeitung. Analysiert Kundenreisen über Initialisierungs-, Halte- und Abschlussphasen. Entwickelt mit Python, Pandas, SQLite und externer Attribution-API. Berechnet ROAS- und CPO-Metriken für datengesteuerte Marketing-Entscheidungen.',
    project3Title: 'MedLive AI',
    project3Description: 'Ein KI-gestützter Gesundheits-Triage-Assistent, der Patientenanliegen anhört, Symptome per Live-Video erkennt, medizinische Formulare automatisch ausfüllt und Termine bucht. Mit Echtzeit-Sprachgespräch mit Dr. Liv Avatar, 5-stufiger Triage-Bewertung und Google Calendar-Integration. Entwickelt mit Gemini 2.5 Flash, Anam AI, WebRTC, Next.js, Python und Google Cloud Run.',
    project4Title: 'KI-gestützter Portfolio-Agent',
    project4Description: 'Ein sprachaktivierter Portfolio-KI-Agent, der aktuelle Projekte und Lebenslaufdetails bereitstellt, indem er aktualisierte Informationen aus der Notion-Datenbank abruft. Ermöglicht Echtzeit-Gespräche mit Zugriff auf dynamische Inhalte durch Notion CMS-Integration und GitHub-Projektsuche, sodass der Agent Suchen durchführen und Maßnahmen ergreifen kann. Sammelt und speichert automatisch Besucherinformationen einschließlich Name, E-Mail, Telefonnummer und Gesprächszusammenfassungen direkt in Notion, was eine nahtlose Verfolgung potenzieller Mitarbeiter und Leads ermöglicht. Features Stimmklonierung für natürliches Engagement und immersive Benutzererfahrung. Entwickelt mit Python, OpenAI Whisper für Sprache-zu-Text, GPT-4o-mini für intelligente Antworten, LiveKit Agents Framework, Next.js und Three.js für immersive 3D-Visualisierung.',
    viewProject: 'Projekt Ansehen',
    
    // Agent
    agentSubtitle: 'Interaktiver KI-Agent',
    agentTitle: 'Mit John Sprechen',
    agentDescription: 'Sprechen Sie mit John und erfahren Sie mehr über ihn im Gespräch',
    connecting: 'Verbindung zu John wird hergestellt...',
    listening: 'John hört zu...',
    speaking: 'John spricht',
    thinking: 'John denkt nach...',
    readyToTalk: 'Bereit zum Sprechen',
    readyToConnect: 'Bereit zur Verbindung',
    talkButton: 'Mit John Sprechen',
    
    // Stats
    yearsExperience: 'Jahre Erfahrung',
    industries: 'Branchen',
    projects: 'Projekte',
    alwaysLearning: 'Immer Am Lernen',
    
    // Contact
    contactTitle: 'Kontakt',
    contactDescription: 'Möchten Sie über KI, Engineering oder einfach coole Ideen sprechen? Lassen Sie uns in Kontakt treten.',
    email: 'E-Mail',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    phone: 'Telefon',
    
    // Footer
    copyright: 'John Igbokwe',
  },
};

export function getTranslation(lang: Language, key: string): string {
  return (translations[lang] as any)[key] || key;
}
