export type Language = 'en' | 'de';

export const translations = {
  en: {
    // Header
    home: 'Home',
    about: 'About',
    talkToMe: 'Talk to Me',
    contact: 'Contact',
    
    // Hero
    subtitle: 'AI & Data Engineer',
    description: 'I build intelligent systems that help businesses solve real-world problems across various industries including healthcare, education, finance, logistics, and more.',
    viewProjects: 'View Projects',
    downloadCV: 'Download CV',
    
    // About
    aboutTitle: 'About Me',
    about1: "Hey, I'm John - an AI & Data Engineer passionate about building intelligent systems that make a real impact. With experience across multiple industries, I bring diverse expertise to every project.",
    about2: "When I'm not coding, I'm mentoring others in data/AI careers, playing FIFA, or traveling to explore new cultures. Continuous learning and adaptability are what drive me.",
    technologies: 'Technologies',
    
    // Projects
    projectsTitle: 'Projects',
    
    // Agent
    agentSubtitle: 'Interactive AI Agent',
    agentTitle: 'Talk to John Igbokwe',
    agentDescription: 'Talk to John and learn more about him through conversation',
    connecting: 'Connecting to John...',
    listening: 'John is listening...',
    speaking: 'John is speaking',
    thinking: 'John is thinking...',
    readyToTalk: 'Ready to talk',
    readyToConnect: 'Ready to connect',
    talkButton: 'Talk to John Igbokwe',
    
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
    
    // Footer
    copyright: '© 2025 John Igbokwe',
  },
  de: {
    // Header
    home: 'Startseite',
    about: 'Über Mich',
    talkToMe: 'Sprechen',
    contact: 'Kontakt',
    
    // Hero
    subtitle: 'KI & Dateningenieur',
    description: 'Ich erstelle intelligente Systeme, die Unternehmen dabei helfen, reale Probleme in verschiedenen Branchen wie Gesundheitswesen, Bildung, Finanzen, Logistik und mehr zu lösen.',
    viewProjects: 'Projekte Ansehen',
    downloadCV: 'Lebenslauf Herunterladen',
    
    // About
    aboutTitle: 'Über Mich',
    about1: 'Hallo, ich bin John - ein KI- und Dateningenieur, der sich für den Aufbau intelligenter Systeme einsetzt, die einen echten Einfluss haben. Mit Erfahrung in verschiedenen Branchen bringe ich vielfältige Expertise in jedes Projekt ein.',
    about2: 'Wenn ich nicht programmiere, betreue ich andere in Karrieren im Bereich Daten/KI, spiele FIFA oder reise, um neue Kulturen zu erkunden. Kontinuierliches Lernen und Anpassungsfähigkeit sind das, was mich antreibt.',
    technologies: 'Technologien',
    
    // Projects
    projectsTitle: 'Projekte',
    
    // Agent
    agentSubtitle: 'Interaktiver KI-Agent',
    agentTitle: 'Mit John Igbokwe Sprechen',
    agentDescription: 'Sprechen Sie mit John und erfahren Sie mehr über ihn im Gespräch',
    connecting: 'Verbindung zu John wird hergestellt...',
    listening: 'John hört zu...',
    speaking: 'John spricht',
    thinking: 'John denkt nach...',
    readyToTalk: 'Bereit zum Sprechen',
    readyToConnect: 'Bereit zur Verbindung',
    talkButton: 'Mit John Igbokwe Sprechen',
    
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
    
    // Footer
    copyright: '© 2025 John Igbokwe',
  },
};

export function getTranslation(lang: Language, key: string): string {
  return (translations[lang] as any)[key] || key;
}

