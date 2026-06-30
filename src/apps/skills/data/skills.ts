export interface Skill {
  name: string;
  proficiency: number; // 0 to 100
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Building interactive, accessible, and performant user interfaces.',
    skills: [
      { name: 'React', proficiency: 95 },
      { name: 'TypeScript', proficiency: 90 },
      { name: 'Next.js', proficiency: 85 },
      { name: 'Tailwind CSS', proficiency: 95 },
      { name: 'Framer Motion', proficiency: 80 },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    description: 'Designing scalable APIs and distributed systems.',
    skills: [
      { name: 'Node.js', proficiency: 85 },
      { name: 'Go', proficiency: 75 },
      { name: 'Express', proficiency: 90 },
      { name: 'gRPC', proficiency: 60 },
      { name: 'GraphQL', proficiency: 70 },
    ]
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    description: 'Data modeling, caching, and persistence.',
    skills: [
      { name: 'PostgreSQL', proficiency: 85 },
      { name: 'MongoDB', proficiency: 90 },
      { name: 'Redis', proficiency: 75 },
      { name: 'Prisma', proficiency: 85 },
    ]
  },
  {
    id: 'devops',
    title: 'Cloud & DevOps',
    description: 'Deployment, CI/CD, and infrastructure automation.',
    skills: [
      { name: 'Docker', proficiency: 80 },
      { name: 'AWS', proficiency: 70 },
      { name: 'GitHub Actions', proficiency: 85 },
      { name: 'Vercel / Netlify', proficiency: 95 },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Ecosystem',
    description: 'Daily drivers and productivity multipliers.',
    skills: [
      { name: 'Git', proficiency: 90 },
      { name: 'Linux / Bash', proficiency: 85 },
      { name: 'Vite', proficiency: 90 },
      { name: 'Jest / Vitest', proficiency: 75 },
    ]
  }
];
