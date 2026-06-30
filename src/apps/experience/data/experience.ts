export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
  isCurrent?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Software Engineer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA (Remote)',
    period: '2023 - Present',
    isCurrent: true,
    description: [
      'Architected and implemented distributed microservices using Go and gRPC, reducing system latency by 30%.',
      'Led the migration of legacy frontend applications to React 18, improving Core Web Vitals and overall performance.',
      'Mentored junior engineers and conducted weekly pair-programming sessions.'
    ],
    techStack: ['Go', 'React', 'gRPC', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'Creative Web Agency',
    location: 'New York, NY',
    period: '2021 - 2023',
    description: [
      'Developed high-performance web applications for Fortune 500 clients using Next.js and Tailwind CSS.',
      'Implemented robust state management using Redux Toolkit and React Query.',
      'Collaborated closely with UX designers to ensure pixel-perfect accessibility-compliant interfaces.'
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion']
  },
  {
    id: 'exp-3',
    role: 'Junior Web Developer',
    company: 'Startup Hub',
    location: 'Austin, TX',
    period: '2019 - 2021',
    description: [
      'Maintained and added features to a large monolithic Express.js backend.',
      'Built responsive UI components using vanilla HTML/CSS/JS and gradually introduced React.',
      'Optimized database queries in MongoDB, reducing load times on the main dashboard by 40%.'
    ],
    techStack: ['JavaScript', 'Express', 'MongoDB', 'HTML/CSS', 'React']
  }
];
