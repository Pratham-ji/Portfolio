export interface LeetCodeData {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  recentSubmissions: {
    id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timestamp: string;
    status: string;
    lang: string;
  }[];
}

export const leetcodeSnapshot: LeetCodeData = {
  username: 'pratham',
  totalSolved: 350,
  easySolved: 120,
  mediumSolved: 180,
  hardSolved: 50,
  ranking: 152000,
  recentSubmissions: [
    {
      id: '1',
      title: 'LRU Cache',
      difficulty: 'Medium',
      timestamp: '2 hours ago',
      status: 'Accepted',
      lang: 'TypeScript'
    },
    {
      id: '2',
      title: 'Merge K Sorted Lists',
      difficulty: 'Hard',
      timestamp: '1 day ago',
      status: 'Accepted',
      lang: 'TypeScript'
    },
    {
      id: '3',
      title: 'Two Sum',
      difficulty: 'Easy',
      timestamp: '2 days ago',
      status: 'Accepted',
      lang: 'TypeScript'
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      timestamp: '3 days ago',
      status: 'Accepted',
      lang: 'TypeScript'
    },
    {
      id: '5',
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      timestamp: '4 days ago',
      status: 'Accepted',
      lang: 'TypeScript'
    }
  ]
};
