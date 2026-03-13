export type Project = {
  title: string;
  description: string;
  href: string;
  date: string;
  tags: string[];
  links?: { label: string; href: string }[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export const siteConfig = {
  name: "Gospel Excel",
  role: "Software Engineer",
  location: "New York",
  email: "gexcel123@gmail.com",
};

export const projects: Project[] = [
  {
    title: "BookSmart AI",
    description:
      "Full-stack AI-powered PDF bookmark generator. Upload documents and get automated section detection and bookmark insertion using Google Gemini AI with 85%+ accuracy.",
    href: "#",
    date: "2024",
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "AWS", "Gemini AI"],
    links: [
      { label: "Live Demo", href: "#" },
      { label: "Frontend", href: "https://github.com/GospelExcel" },
      { label: "Backend", href: "https://github.com/GospelExcel" },
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "Dell Inc.",
    role: "Software Engineer Intern — Infrastructure Solutions Group",
    period: "May 2023 – Aug 2023",
    location: "Round Rock, TX",
    bullets: [
      "Automated 35% of Dell's APEX API endpoints by creating Terraform modules from scratch",
      "Built and deployed a complete Terraform provider to streamline infrastructure provisioning",
      "Created technical documentation and architectural blueprints for future automation projects",
    ],
  },
  {
    company: "State Farm",
    role: "Legal Administrative Assistant",
    period: "Sep 2024 – Present",
    location: "Jericho, NY",
    bullets: [
      "Managed client correspondence, legal documents, and case records for attorney team",
    ],
  },
  {
    company: "HTx Services",
    role: "Intern",
    period: "Jun 2019 – Jan 2022",
    location: "Plainview, NY",
    bullets: [
      "Diagnosed and resolved hardware/software issues for lab-based ATMs, reducing downtime by 24%",
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/GospelExcel", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gospelexcel", icon: "linkedin" },
  { label: "Email", href: "mailto:gexcel123@gmail.com", icon: "mail" },
];
