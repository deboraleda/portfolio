export type MilestoneType = 'education' | 'research' | 'work' | 'personal' | 'project';
export type IllustrationType = 'tree' | 'flower' | 'house' | 'bridge' | 'stone' | 'mushroom' | 'sign';

export interface Milestone {
  id: string;
  progress: number; // 0–1, position along the journey
  year: string;
  title: string;
  description: string;
  type: MilestoneType;
  illustration: IllustrationType;
}

const journey: Milestone[] = [
  {
    id: 'university',
    progress: 0.10,
    year: '2019',
    title: 'Undergraduate Beginnings',
    description: 'Started Computer Science at UFCG. The path was beginning to take shape.',
    type: 'education',
    illustration: 'sign',
  },
  {
    id: 'epol',
    progress: 0.25,
    year: '2020',
    title: 'ePol — Federal Police Research',
    description: 'Team manager on the UFCG × Brazilian Federal Police partnership. Summarization, similarity, and graph visualization of investigations, applying data mining and distributed computing.',
    type: 'research',
    illustration: 'bridge',
  },
  {
    id: 'salesforce-ds',
    progress: 0.40,
    year: '2022',
    title: 'Data Scientist at Dell',
    description: 'Data science on a Dell × UFCG partnership: data engineering and visualization with Splunk and Power BI dashboards.',
    type: 'work',
    illustration: 'mushroom',
  },
  {
    id: 'graduation',
    progress: 0.55,
    year: '2023',
    title: 'Computer Science Degree',
    description: 'Graduated in Computer Science at UFCG. GPA 8.49, thesis advised by Rohit Gheyi.',
    type: 'education',
    illustration: 'tree',
  },
  {
    id: 'lightning',
    progress: 0.72,
    year: '2023',
    title: 'Lightning Notifications — Frontend',
    description: 'Frontend developer on a UFCG × Dell Brasil partnership building a Salesforce Lightning notifications app in ReactJS and Electron.',
    type: 'work',
    illustration: 'stone',
  },
  {
    id: 'masters',
    progress: 0.80,
    year: '2025',
    title: "Master's in Software Engineering",
    description: "Master's approved unanimously at UFCG under advisor Rohit Gheyi.",
    type: 'education',
    illustration: 'flower',
  },
  {
    id: 'agents4good',
    progress: 0.88,
    year: '2025',
    title: 'Agents4Good — Lead Researcher',
    description: 'Leading Agents4Good (Kunumi × UFCG) — designing complex multi-agent workflows to tackle social-impact problems.',
    type: 'research',
    illustration: 'house',
  },
  {
    id: 'phd',
    progress: 0.94,
    year: '2025',
    title: 'PhD in Software Engineering',
    description: 'PhD begins under Patrícia Machado — architectures for intelligent agents and automatic code generation via LLMs. Expected 2028.',
    type: 'research',
    illustration: 'bridge',
  },
];

export default journey;
