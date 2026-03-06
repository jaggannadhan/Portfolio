export const profile = {
  name: "Jaggannadhan Venugopal",
  email: "jaggannadhan1994@gmail.com",
  phone: "+1 (862) 226-2405",
  linkedin: "https://www.linkedin.com/in/jvenu94",
  github: "https://github.com/jaggannadhan",
  headline: "Full-Stack Engineer | Agentic Workflows | RAG & Data Engineering",
  subheadline:
    "Building production AI orchestration with LangGraph & DeepAgents, cloud-native microservices on GCP/Azure/AWS, and scalable data pipelines.",
};

export const metrics: {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}[] = [
  { label: "Faster Vendor Onboarding", value: 40, suffix: "%", prefix: "~" },
  { label: "OCR Accuracy", value: 95, suffix: "%" },
  { label: "Faster Build/Deploy Cycles", value: 65, suffix: "%" },
  { label: "Faster Contract Execution", value: 3.2, suffix: "x" },
  { label: "Annual Revenue Impact", value: 2.5, suffix: "M", prefix: "$" },
];

export const experience = [
  {
    company: "Leah (formerly ContractPodAi)",
    role: "Software Engineer",
    location: "NY, NY",
    dates: "Apr 2025 - Present",
    station: "STATION ALPHA",
    bullets: [
      "Built agentic procurement workflows with Google ADK & LangGraph DeepAgents, cutting vendor onboarding time by ~40%.",
      "Engineered OCR-driven ETL pipelines on Vertex AI with 95% accuracy; indexed docs as a RAG knowledge base.",
      "Unified microservices into a mono-repo on Azure Functions, reducing build/deploy cycles by 65%.",
    ],
    tags: ["Google ADK", "LangGraph", "Vertex AI", "Azure", "RAG"],
  },
  {
    company: "Flow Global",
    role: "Full Stack Engineer",
    location: "Austin, TX",
    dates: "Oct 2024 - Mar 2025",
    station: "STATION BETA",
    bullets: [
      "Integrated AI/ML with Salesforce & Lusha CRMs into an Electron app, boosting sales efficiency by 75%.",
      "Redesigned PostgreSQL schemas with indexing & caching, achieving 40% faster response times.",
      "Deployed Django microservices to AWS Lambda/Azure with automated CI/CD, cutting deploy time by 50%.",
    ],
    tags: ["Django", "PostgreSQL", "AWS Lambda", "Salesforce", "Electron"],
  },
  {
    company: "AnywhereWorks Inc.",
    role: "Software Engineer",
    location: "India",
    dates: "Mar 2018 - Aug 2022",
    station: "STATION GAMMA",
    bullets: [
      "Built micro front-end apps on GCP driving $2.5M annual revenue; real-time analytics with Elasticsearch & WebSockets.",
      "Designed scalable task system handling 10K+ daily background ops at 99% uptime via GCP Cloud Tasks.",
      "Mentored engineers on security standards, TDD, and CI/CD in an Agile environment.",
    ],
    tags: ["GCP", "Elasticsearch", "WebSockets", "Python", "Micro Front-ends"],
  },
];

export const projects = [
  {
    name: "CrowdDoing - Match4Action",
    description:
      "Analyzed user interactions to improve location-based recommendations leveraging Foursquare API integration.",
    bullets: [
      "Built information retrieval, location matching, and geo-tagging features using Foursquare API.",
      "Achieved 35% improvement in location-based recommendation accuracy.",
    ],
    tags: ["Foursquare API", "Python", "Location Matching", "Geo-tagging"],
  },
  {
    name: "RAG-Based Legal Advisory Engine (iSage)",
    description:
      "Architected a RAG application on Streamlit that provides reliable and up-to-date information sourced from official U.S. government websites for international students.",
    bullets: [
      "Built RAG pipeline sourcing from official US government legal publications.",
      "Developed interactive Streamlit interface for legal document querying.",
    ],
    tags: ["RAG", "Streamlit", "LLM", "Legal Tech", "Python"],
  },
  {
    name: "Developer Documents",
    description:
      "Conceived and implemented web application to automate secure storing and instantaneous sharing of API endpoints within/across organizations.",
    bullets: [
      "Designed secure storing and sharing system for API endpoints.",
      "Implemented OAuth 2.0 authentication and authorization workflows.",
    ],
    tags: ["OAuth2", "API Design", "Security", "Full Stack"],
  },
];

export const skills = {
  groups: [
    {
      title: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    },
    {
      title: "Databases",
      items: ["MongoDB", "MySQL", "PostgreSQL", "Google NDB", "SQLAlchemy"],
    },
    {
      title: "Frameworks/Services",
      items: ["Flask", "FastAPI", "Django", "React (v19+)", "Next.js"],
    },
    {
      title: "Cloud Technologies",
      items: ["Google Cloud Platform (GCP)", "Azure Web Services", "AWS"],
    },
    {
      title: "Data Engineering",
      items: [
        "ETL Pipelines",
        "Data Modeling",
        "Schema Design",
        "Query Optimization",
        "Real-time Streaming",
      ],
    },
    {
      title: "AI / ML",
      items: [
        "Google ADK",
        "Vertex AI",
        "LangGraph-DeepAgents",
        "RAG Pipelines",
        "Scikit-learn",
        "TensorFlow",
      ],
    },
    {
      title: "Testing",
      items: ["PyTest", "PyUnit", "React Testing Library", "Jest"],
    },
    {
      title: "Others",
      items: [
        "CI/CD",
        "Agile",
        "Docker",
        "GIT",
        "Vibe-Coding",
        "TDD",
        "WebSockets",
        "Microservice Stacks",
        "API Integration",
      ],
    },
  ],
};

export const education = [
  {
    degree: "MS in Computer Science",
    school: "University of Massachusetts, Boston, MA",
    gpa: "3.54",
    dates: "Sep 2022 - May 2024",
  },
  {
    degree: "BE in Computer Science",
    school: "Sri Venkateswara College of Eng. & Tech",
    gpa: "3.20",
    dates: "Sep 2012 - May 2016",
  },
];

export const achievements = [
  "Pioneered the first Jiu-Jitsu club at UMass Boston (President, 2022)",
  "Governor's Award (Rajya Puraskar) - Bharat Scouts & Guides (2014)",
  "Black-belt in Karate, Shito-Ryu style (2010)",
];
