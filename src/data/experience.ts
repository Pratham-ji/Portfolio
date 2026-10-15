export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
  impactMetrics: { label: string; value: string }[];
  certificateUrl?: string;
  isCurrent?: boolean;
  logoUrl?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'aviator',
    role: 'Software Engineer',
    company: 'Aviator Infotech',
    location: 'TODO_LOCATION',
    period: 'TODO_START_DATE - TODO_END_DATE',
    isCurrent: true,
    description: [
      'Developed and maintained highly scalable web applications.',
      'Collaborated with cross-functional teams to define architectural standards.',
      'TODO_ADDITIONAL_RESPONSIBILITY'
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'TODO_ADDITIONAL_TECH'],
    impactMetrics: [
      { label: 'TODO_IMPACT_METRIC', value: 'TODO_VALUE' }
    ],
    certificateUrl: 'TODO_CERTIFICATE_URL',
    logoUrl: 'TODO_COMPANY_LOGO_URL'
  },
  {
    id: 'gssoc',
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code',
    location: 'Remote',
    period: 'TODO_START_DATE - TODO_END_DATE',
    description: [
      'Contributed to various open source projects.',
      'Ranked in the top 50 among thousands of participants.',
      'TODO_ADDITIONAL_CONTRIBUTION'
    ],
    techStack: ['JavaScript', 'Git', 'Open Source', 'TODO_ADDITIONAL_TECH'],
    impactMetrics: [
      { label: 'Ranking', value: 'Top 50' }
    ],
    logoUrl: 'TODO_COMPANY_LOGO_URL'
  },
  {
    id: 'shopify',
    role: 'Freelance Developer',
    company: 'Shopify Ecosystem',
    location: 'Remote',
    period: 'TODO_START_DATE - TODO_END_DATE',
    description: [
      'Built custom Shopify solutions and storefronts for diverse clients.',
      'Optimized performance and SEO for e-commerce sites.',
      'TODO_ADDITIONAL_FREELANCE_WORK'
    ],
    techStack: ['Liquid', 'React', 'GraphQL', 'TODO_ADDITIONAL_TECH'],
    impactMetrics: [
      { label: 'TODO_IMPACT_METRIC', value: 'TODO_VALUE' }
    ],
    logoUrl: 'TODO_COMPANY_LOGO_URL'
  }
];
