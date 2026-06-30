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
      { name: 'React', proficiency: 95, icon: '/assets/reactjs.png' },
      { name: 'Flutter', proficiency: 90, icon: '/assets/flutter.png' },
      { name: 'Dart', proficiency: 85, icon: '/assets/dart.png' },
      { name: 'Android', proficiency: 80, icon: '/assets/android.png' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    description: 'Designing scalable APIs and distributed systems.',
    skills: [
      { name: 'Node.js', proficiency: 85, icon: '/assets/nodejs.png' },
      { name: 'Spring Boot', proficiency: 80, icon: '/assets/springboot.png' },
      { name: 'Java', proficiency: 85, icon: '/assets/java.png' },
      { name: 'Python', proficiency: 75, icon: '/assets/python.png' },
      { name: 'C++', proficiency: 85, icon: '/assets/c++.png' },
    ]
  },
  {
    id: 'database',
    title: 'Databases & Storage',
    description: 'Data modeling, caching, and persistence.',
    skills: [
      { name: 'MySQL', proficiency: 85, icon: '/assets/mysql.png' },
      { name: 'Redis', proficiency: 75, icon: '/assets/redis.png' },
      { name: 'Firebase', proficiency: 85, icon: '/assets/firebase.png' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Ecosystem',
    description: 'Daily drivers and productivity multipliers.',
    skills: [
      { name: 'Postman', proficiency: 90, icon: '/assets/postman.png' },
      { name: 'TensorFlow', proficiency: 60, icon: '/assets/tensorflow.png' },
      { name: 'C', proficiency: 80, icon: '/assets/C.png' },
    ]
  }
];
