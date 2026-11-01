// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: 'Samiha Hossain',
  title: 'Software Engineer',
  tagline:
    'I build responsive, scalable web applications with React and TypeScript, and bring AI into real products.',
  summary:
    'Software Engineer experienced in React.js, TypeScript and JavaScript. I build scalable applications with reusable components and API integrations, and back them with automated testing for quality and reliability.',
  about: [
    "I'm a software engineer who loves turning ideas into working products. At SELISE Digital Platforms I build responsive React and TypeScript interfaces with reusable components, integrate REST and third-party APIs, and create business applications on Corteza. I've built e-commerce and real estate solutions from the ground up.",
    'I also bring AI into real products using LLM APIs, open-source models and fine-tuning workflows, and I use tools like Claude Code and OpenAI Codex to prototype and deliver faster. And because I care about what I ship, I back my work with Playwright automation so it stays reliable.',
  ],
  location: 'Bangladesh',
  email: 'hsamiha2020@gmail.com',
  linkedin: 'https://www.linkedin.com/in/samiha-hossain-b892271ab',
  github: 'https://github.com/SamihaH23',
  resume: `${import.meta.env.BASE_URL}Samiha-Hossain-Resume.pdf`,
}

export const competencies = [
  'Analytical Problem-Solving',
  'Attention to Detail',
  'Time Management',
  'Multitasking',
  'Cross-Functional Collaboration',
  'Independent Work',
  'Team Delivery',
]

export type SkillGroup = {
  name: string
  blurb: string
  icon: 'code' | 'layout' | 'check' | 'plug' | 'spark' | 'tool'
  area: string // position in the Skills grid
  featured?: boolean
  highlights?: string[] // featured card only
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Software Development',
    blurb: 'Building responsive, scalable web apps from idea to production.',
    icon: 'code',
    area: 'dev',
    featured: true,
    highlights: [
      'Responsive UIs with reusable React components',
      'REST and third-party API integrations',
      'Business apps on Corteza for workflow automation',
      'E-commerce & real estate solutions built from the ground up',
    ],
    items: [
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
      'React Native',
      'Redux.js',
      'HTML',
      'CSS',
    ],
  },
  {
    name: 'API & Data',
    blurb: 'Wiring things together.',
    icon: 'plug',
    area: 'api',
    items: ['REST APIs', 'Postman', 'JSON', 'MongoDB', 'CRUD Operations'],
  },
  {
    name: 'AI',
    blurb: 'Bringing LLMs into real products.',
    icon: 'spark',
    area: 'ai',
    items: ['LLM APIs', 'Open-source Models', 'Fine-tuning', 'Claude Code', 'OpenAI Codex'],
  },
  {
    name: 'Testing & QA',
    blurb: 'Making sure what I build keeps working, release after release.',
    icon: 'check',
    area: 'test',
    items: [
      'Playwright',
      'UI Automation',
      'Manual Testing',
      'Functional Testing',
      'Regression Testing',
      'Smoke Testing',
      'Exploratory Testing',
      'Cross-Browser Testing',
      'Responsive Testing',
      'User Acceptance Testing',
      'Test-Driven Development',
    ],
  },
  {
    name: 'Platforms & Tools',
    blurb: 'The rest of the kit.',
    icon: 'tool',
    area: 'tools',
    items: ['Corteza', 'GitHub', 'Microsoft Excel'],
  },
]

export type Job = {
  role: string
  company: string
  period: string
  points: string[]
}

export const experience: Job[] = [
  {
    role: 'Associate Software Engineer',
    company: 'SELISE Digital Platforms',
    period: 'Jan 2025 – Present',
    points: [
      'Build responsive, scalable interfaces with React.js, TypeScript and Redux.js, with reusable components and REST / third-party API integrations.',
      'Build and maintain business applications on Corteza for workflow automation.',
      'Develop and maintain Playwright automation suites in TypeScript, increasing test coverage and reducing manual testing effort.',
      'Design and run functional, regression, smoke, exploratory, cross-browser and responsive test cases; validate APIs with Postman.',
      'Implement AI features in production using LLM APIs, open-source models and fine-tuning workflows.',
      'Built e-commerce and real estate solutions from the ground up, working independently in fast-paced environments.',
    ],
  },
  {
    role: 'Developer Intern',
    company: 'SELISE Digital Platforms',
    period: 'Oct 2024 – Jan 2025',
    points: [
      'Designed and developed the SELISE Procurement Management System, automating approval workflows.',
      'Implemented inventory management features to track assets, supplies and stock levels.',
      'Built modular business apps with Corteza and helped develop, integrate and test REST APIs.',
    ],
  },
  {
    role: 'Junior Support Engineer',
    company: 'InNeed Intelligent Cloud',
    period: 'May 2024 – Oct 2024',
    points: [
      'Supported the TB Management Information System, keeping operations and users running smoothly.',
      'Performed manual, functional and user acceptance testing; documented scenarios, cases and results.',
      'Validated, analyzed and reported large operational datasets in Microsoft Excel.',
    ],
  },
  {
    role: 'React Developer Intern',
    company: 'Shark and Hawk Tech',
    period: 'Jan 2023 – May 2023',
    points: [
      'Built a React.js to-do app using hooks, props, state management and responsive interactions.',
      'Tested REST APIs with Postman and used MongoDB for CRUD operations.',
    ],
  },
]

export type Project = {
  name: string
  description: string
  tags: string[]
  category: 'Web App' | 'AI'
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'PR Summary Generator',
    description:
      'AI tool that reads Git diffs or pull requests and writes a short summary, flags possible breaking changes, rates risk and suggests test cases.',
    tags: ['React', 'TypeScript', 'Vite', 'LLM'],
    category: 'AI',
    github: 'https://github.com/SamihaH23/PR-Summary-Generator',
  },
  {
    name: 'TalentLens — AI Resume Parser',
    description:
      'Turns PDF, DOCX and text resumes into structured candidate profiles with confidence scoring, inline editing, batch filtering and candidate comparison.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Gemini AI'],
    category: 'AI',
  },
  {
    name: 'Release Manager',
    description:
      'Release planning dashboard with a drag-and-drop Kanban board, automatic release notes and a Dev → Staging → Production rollout tracker.',
    tags: ['React 19', 'Material UI', 'Charts', 'Dark mode'],
    category: 'Web App',
    github: 'https://github.com/SamihaH23/Release-Manager-Kanban-',
  },
  {
    name: 'TokenTier',
    description:
      'Prompt library that ranks prompts by quality per token across Bare, Standard and Robust tiers, with cost estimates and side-by-side prompt diffs.',
    tags: ['React', 'TypeScript', 'Material UI', 'Prompt Engineering'],
    category: 'AI',
    github: 'https://github.com/SamihaH23/Token-Tier',
  },
]

// The "Right now" card in About.
export const now = [
  { label: 'Working', value: 'Associate Software Engineer at SELISE Digital Platforms' },
  { label: 'Exploring', value: 'Agentic AI & knowledge-grounded LLM systems' },
  { label: 'Open to', value: 'Software engineering roles & research collaborations' },
  { label: 'Based in', value: 'Bangladesh' },
]

export const research = {
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Large Language Models (LLMs)',
    'Agentic AI',
    'Cybersecurity',
  ],
  summary:
    'My research spans ML-based anomaly detection for secure data sharing, NLP for fake news detection, and predictive modeling, complemented by industry experience integrating LLMs into production software. I aim to build reliable, secure, and knowledge-grounded agentic AI systems.',
}

export type Publication = {
  title: string
  venue?: string
  year?: string
  note?: string
  link?: string
}

export const publications: Publication[] = [
  {
    title:
      'Predicting User Engagement with Online Advertisements: A Comparative Study of Machine Learning Models',
    venue:
      '3rd International Conference on Big Data, IoT and Machine Learning (BIM 2025). Accepted and under publication in Springer Lecture Notes in Networks and Systems.',
    year: '2025',
    note: 'Scopus Indexed',
  },
  {
    title: 'Fusion of Machine Learning Techniques for Robust Anomaly Detection in Cybersecurity During Data Sharing',
  },
  {
    title: 'A Comprehensive Analysis of Machine Learning Approaches for Fake News Detection and Its Effects',
    venue: 'Turkish Journal of Computer and Mathematics Education (TURCOMAT), 14(03), 384–391.',
    year: '2023',
  },
  {
    title: 'Find out the innovative techniques of data sharing using cryptography by systematic literature review',
    venue: 'Turkish Journal of Computer and Mathematics Education (TURCOMAT), 14(03), 216–224.',
    year: '2023',
  },
]

export const thesis = {
  label: 'Undergraduate Thesis Research',
  institution: 'American International University-Bangladesh',
  year: '2023',
  title:
    'Innovative Techniques of Data Sharing and Security for Anomaly Detection Using Novel Machine Learning Techniques',
  supervisor: 'Tanvir Ahmed, Lecturer, Department of Computer Science, AIUB',
  supervisorEmail: 'tanvir.ahmed@aiub.edu',
}

export const education = {
  degree: 'Bachelor of Science in Computer Science and Engineering',
  school: 'American International University-Bangladesh (AIUB)',
  major: 'Major: Software Engineering',
}
