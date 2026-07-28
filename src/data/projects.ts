export interface Project {
  name: string;
  repo: string;
  desc: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Project One",
    repo: "cyberbaha/project-one",
    desc: "A Flutter mobile app built with Firebase backend.",
    tags: ["Flutter", "Dart", "Firebase"],
  },
  {
    name: "Project Two",
    repo: "cyberbaha/project-two",
    desc: "Web application with responsive UI and REST API integration.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
  },
  {
    name: "Project Three",
    repo: "cyberbaha/project-three",
    desc: "IT support ticketing system with real-time tracking.",
    tags: ["Flutter", "Firebase", "Material Design"],
  },
  {
    name: "Project Four",
    repo: "cyberbaha/project-four",
    desc: "Network monitoring dashboard for LAN/WAN infrastructure.",
    tags: ["JavaScript", "REST APIs"],
  },
  {
    name: "Project Five",
    repo: "cyberbaha/project-five",
    desc: "AI-assisted mobile application for daily productivity.",
    tags: ["Flutter", "Dart", "AI"],
  },
  {
    name: "Project Six",
    repo: "cyberbaha/project-six",
    desc: "Cross-platform utility app with Material Design UI.",
    tags: ["Flutter", "Dart"],
  },
];
