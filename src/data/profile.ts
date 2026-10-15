export interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  about: {
    journey: string;
    currentFocus: string;
    philosophy: string;
    funFacts: string[];
  };
  resumeUrl: string;
  contactEmail: string;
  location: string;
  photoUrl: string;
  achievements: { title: string; organization: string; description: string }[];
}

export const profileData: ProfileData = {
  name: 'Prathamraj Giri',
  title: 'Software Engineer',
  tagline: 'Building interactive engineering workspaces and scalable systems.',
  about: {
    journey: 'TODO_ABOUT_JOURNEY',
    currentFocus: 'TODO_ABOUT_CURRENT_FOCUS',
    philosophy: 'I am a Software Engineer focused on crafting robust architectures and high-performance applications. My work bridges the gap between complex system design and intuitive user experiences.',
    funFacts: ['TODO_FUN_FACT_1', 'TODO_FUN_FACT_2']
  },
  resumeUrl: '/resume.pdf',
  contactEmail: 'contact@example.com', // TODO_CONTACT_EMAIL
  location: 'India',
  photoUrl: '/profile.jpg',
  achievements: [
    {
      title: 'Global Rank 149',
      organization: 'CodeChef',
      description: 'Achieved in Starters 100 among 5000+ participants.',
    },
    {
      title: 'Top 50',
      organization: 'GSSOC',
      description: 'Open source contributions.',
    },
  ],
};
