export const PROFILE = {
  name: "Arpit Avasarmol",
  username: "Arpit-Avasarmol",
  avatarUrl: "/avatar.jpg",
  avatarCroppedUrl: "/avatar_cropped.jpg",
  githubUrl: "https://github.com/Arpit-Avasarmol",
  bio: "M.Tech Scholar at IIT Roorkee specializing in Generative Diffusion Models & Agentic RAG Systems.",
  education: "M.Tech at IIT Roorkee",
  philosophy: "Small, sharp tools over big vague ideas. Build fast, test on real data, and ship what works.",
  stats: {
    contributionsLastYear: 751,
    activeDays: 93,
    bestWeek: 125,
    publicRepos: 45,
    starsTotal: 14
  },
  socials: {
    website: "arpit-avasarmol.dev",
    instagram: "https://instagram.com/arpit_avasarmol",
    linkedin: "https://linkedin.com/in/arpit-avasarmol",
    email: "arpit.avasarmol@gmail.com",
    github: "https://github.com/Arpit-Avasarmol"
  },
  stack: [
    { name: "python", category: "Languages", icon: "🐍" },
    { name: "pytorch", category: "AI & ML", icon: "🔥" },
    { name: "langchain", category: "Agentic AI", icon: "🔗" },
    { name: "langgraph", category: "Agentic AI", icon: "🕸️" },
    { name: "fastapi", category: "Backend", icon: "⚡" },
    { name: "vllm", category: "LLM Ops", icon: "🚀" },
    { name: "vector-dbs", category: "Databases", icon: "🗄️" },
    { name: "docker", category: "DevOps", icon: "🐳" },
    { name: "typescript", category: "Frontend", icon: "🟦" },
    { name: "javascript", category: "Frontend", icon: "🟨" },
    { name: "react", category: "Frontend", icon: "⚛️" },
    { name: "three.js", category: "3D & Graphics", icon: "📐" },
    { name: "postgres", category: "Databases", icon: "🐘" },
    { name: "opencv", category: "Vision", icon: "👁️" },
    { name: "mediapipe", category: "Vision", icon: "🖐️" },
    { name: "git", category: "Tools", icon: "🌱" },
    { name: "linux", category: "OS", icon: "🐧" }
  ]
};

export const WORK_EXPERIENCE = [
  {
    id: "meril-ai",
    role: "AI Software Engineer",
    organization: "Meril",
    companyFull: "Meril Life Sciences",
    type: "Full-time",
    period: "Jul 2024 - Present",
    duration: "2 yrs 3 mos",
    location: "Vapi, Gujarat, India",
    mode: "On-site",
    status: "Current",
    category: "AI & Engineering",
    linkedinSourced: true,
    logoText: "Meril",
    logoBg: "from-purple-600 to-indigo-600 text-white shadow-purple-900/40",
    badgeColor: "border-purple-500/30 bg-purple-500/10 text-purple-300",
    summary: "Developed a ligand-based molecular generation framework using discrete diffusion models & PyTorch for computational drug design.",
    highlights: [
      "Architected ligand-based molecular generation framework leveraging discrete score-based & diffusion neural models.",
      "Engineered high-performance computational pipelines integrating RDKit, PyTorch, and deep learning for compound design.",
      "Deployed scalable microservices and RAG pipelines using FastAPI, vLLM, and containerized Docker environments."
    ],
    skills: ["RDKit", "PyTorch", "Generative AI", "Ligand Generation", "FastAPI", "Docker", "vLLM", "Python", "Deep Learning", "+23 skills"]
  },
  {
    id: "profitops-llm",
    role: "LLM Engineer",
    organization: "ProfitOps.AI",
    companyFull: "ProfitOps.AI",
    type: "Part-time",
    period: "Feb 2025 - Apr 2025",
    duration: "3 mos",
    location: "Remote",
    mode: "Remote",
    status: "Previous",
    category: "LLM & RAG",
    linkedinSourced: true,
    logoText: "ProfitOps",
    logoBg: "from-cyan-600 to-blue-600 text-white shadow-blue-900/40",
    badgeColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    summary: "Built state-of-the-art LLM-powered solutions focused on decision automation, enterprise prompt evaluation, and retrieval frameworks.",
    highlights: [
      "Built multi-agent LLM reasoning workflows and automated prompt evaluation loops leveraging OpenAI API.",
      "Optimized vector retrieval microservices for rapid contextual RAG lookups across enterprise analytics.",
      "Engineered structured output parsers and API connectors for production-ready AI agents."
    ],
    skills: ["OpenAI", "OpenAI API", "LangChain", "Prompt Engineering", "Vector DBs", "RAG", "Python", "+9 skills"]
  },
  {
    id: "iitr-group",
    role: "Academic Leadership & Student Coordination",
    organization: "Indian Institute of Technology, Roorkee",
    companyFull: "IIT Roorkee",
    type: "Full-time",
    period: "Feb 2023 - Feb 2024",
    duration: "1 yr 1 mo",
    location: "Roorkee, Uttarakhand, India",
    mode: "On-site",
    status: "Previous",
    category: "Academia & Leadership",
    linkedinSourced: false,
    logoText: "IIT Roorkee",
    logoBg: "from-amber-600 to-orange-600 text-white shadow-amber-900/40",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    isGrouped: true,
    subRoles: [
      {
        id: "iitr-placement",
        role: "Placement Coordinator",
        period: "Feb 2023 - Feb 2024",
        duration: "1 yr 1 mo",
        summary: "Acted as the single point of contact (POC) for the comprehensive internship and placement drive at IIT Roorkee.",
        highlights: [
          "Served as primary POC connecting tier-1 global tech companies, R&D labs, and candidate pools for campus recruiting.",
          "Spearheaded recruitment operational logistics, corporate partner onboarding, and strategic placement analytics."
        ],
        skills: ["Communication", "Team Management", "Corporate Outreach", "Event Logistics"]
      },
      {
        id: "iitr-ta",
        role: "Teaching Assistant",
        period: "Jul 2023 - Nov 2023",
        duration: "5 mos",
        summary: "Served as a Teaching Assistant for course AID-521: Mathematics for Data Science.",
        highlights: [
          "Mentored M.Tech & undergraduate scholars in linear algebra, multivariable calculus, and optimization theory.",
          "Designed practical Python assignment labs for data science algorithms and machine learning mathematical principles."
        ],
        skills: ["Mathematics for Data Science", "Python", "Machine Learning", "Mentorship"]
      }
    ],
    summary: "Held key institutional leadership and academic teaching roles while pursuing M.Tech specialization at IIT Roorkee.",
    skills: ["Mathematics for Data Science", "Python", "Communication", "Team Management", "Leadership"]
  },
  {
    id: "cognizant-pat",
    role: "Programmer Analyst Trainee",
    organization: "Cognizant",
    companyFull: "Cognizant Technology Solutions",
    type: "Full-time",
    period: "Sep 2021 - Jul 2022",
    duration: "11 mos",
    location: "Mumbai, Maharashtra, India",
    mode: "Remote",
    status: "Previous",
    category: "AI & Engineering",
    linkedinSourced: false,
    logoText: "Cognizant",
    logoBg: "from-blue-600 to-teal-600 text-white shadow-teal-900/40",
    badgeColor: "border-blue-500/30 bg-blue-500/10 text-blue-300",
    summary: "Worked for Cognizant Technology Solutions powering enterprise partner software, cloud services, and backend systems.",
    highlights: [
      "Engineered enterprise application modules using Microsoft Foundation Class (MFC) and C++.",
      "Managed Microsoft Azure cloud deployments and automated CI/CD build scripts.",
      "Collaborated across agile sprints to optimize legacy codebase throughput and reduce system downtime."
    ],
    skills: ["Microsoft Foundation Class (MFC)", "Microsoft Azure", "C++", "Cloud Infrastructure", "CI/CD", "+4 skills"]
  },
  {
    id: "gcoe-etas",
    role: "Executive Committee Member for ETAS",
    organization: "Government College of Engineering, Amravati",
    companyFull: "GCOE Amravati",
    type: "Full-time",
    period: "Jun 2019 - Mar 2020",
    duration: "10 mos",
    location: "Amravati, Maharashtra, India",
    mode: "On-site",
    status: "Previous",
    category: "Academia & Leadership",
    linkedinSourced: false,
    logoText: "ETAS GCOEA",
    logoBg: "from-rose-600 to-red-600 text-white shadow-rose-900/40",
    badgeColor: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    summary: "Coordinated diverse guest lectures and technical workshops while overseeing student teams and department event management.",
    highlights: [
      "Organized state-level workshops, guest lectures, and technical symposiums for electronics & telecom domain.",
      "Supervised committee sub-teams, budget allocations, and industry expert invitations for the college association."
    ],
    skills: ["Analog Circuits", "Team Management", "Leadership", "Event Management"]
  }
];

export const FEATURED_PROJECTS = [
  {
    id: "biointel",
    name: "BioIntel-AgenticRAG",
    title: "BioIntel: Agentic RAG System for Drug Discovery",
    description: "Local, multi-tenant agentic RAG platform for biomedical intelligence & patent search. Uses official biomedical APIs, dense vector + BM25 hybrid search, and LangGraph multi-step planning.",
    language: "Python",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/BioIntel-AgenticRAG",
    demoUrl: "",
    tags: ["Python", "LangGraph", "RAG", "Hybrid-Search", "Biomedical API", "FastAPI"],
    highlight: true,
    readmeSnippet: "In-depth biomedical drug discovery assistant. Integrates PubMed, ChEMBL, and ClinicalTrials APIs with dense vector embeddings and BM25 index re-ranking."
  },
  {
    id: "diffusion-thesis",
    name: "Thesis-Diffusion-Models-for-Detecting-the-Anomalies",
    title: "M.Tech Thesis: Diffusion Models for X-Ray Anomaly Detection",
    description: "My M.Tech Thesis research at IIT Roorkee leveraging Generative Diffusion Models (DDPM/DDIM) for detecting fine-grained anomalies in medical X-Ray imagery.",
    language: "Python",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/Thesis-Diffusion-Models-for-Detecting-the-Anomalies",
    demoUrl: "",
    tags: ["PyTorch", "Diffusion Models", "IIT Roorkee", "Medical AI", "Computer Vision"],
    highlight: true,
    readmeSnippet: "Explores score-based generative modeling for unsupervised medical anomaly localization. Evaluated against standard chest X-Ray datasets."
  },
  {
    id: "drone-geopositioning",
    name: "Drone_Geopositioning_by_Satellite_Image_Matching",
    title: "Drone Geopositioning via Satellite Image Matching",
    description: "Computer Vision pipeline developed for ArtPark-IISc Startup assignment. Matches real-time drone aerial imagery against satellite maps for precision GPS-denied positioning.",
    language: "Python",
    stars: 0,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/Drone_Geopositioning_by_Satellite_Image_Matching",
    demoUrl: "",
    tags: ["Python", "OpenCV", "PyTorch", "ArtPark IISc", "Satellite Vision"],
    highlight: true,
    readmeSnippet: "Feature matching and cross-view geo-localization deep learning framework designed to locate UAVs in satellite reference frames without rely on GPS signals."
  },
  {
    id: "research-genie",
    name: "ResearchGenie",
    title: "ResearchGenie: Multi-Tenant Agentic Research Assistant",
    description: "Multi-tenant agentic research platform for drug discovery that tracks protein targets, delivers daily literature & clinical-trial updates, and adapts with feedback loops.",
    language: "Python",
    stars: 0,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/ResearchGenie",
    demoUrl: "",
    tags: ["Python", "LangChain", "VectorDB", "Agentic AI", "Clinical Trials"],
    highlight: true,
    readmeSnippet: "Automated agent that monitors PubMed & BioRxiv feeds daily, runs personalized summary synthesis per protein target, and maintains persistent state across user sessions."
  },
  {
    id: "awesome-rag-production",
    name: "awesome-rag-production",
    title: "Awesome Production RAG Frameworks & Practices",
    description: "Curated list of battle-tested tools, frameworks, vector databases, and architectural patterns for building scalable, production-grade Retrieval-Augmented Generation systems.",
    language: "Markdown",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/awesome-rag-production",
    demoUrl: "https://yigtwxx.github.io/awesome-rag-production/",
    tags: ["RAG", "LLMOps", "Vector-Search", "System-Design"],
    highlight: true,
    readmeSnippet: "Comprehensive reference guide for production RAG deployment including hybrid search tuning, reranking algorithms, context window optimization, and evaluation metrics."
  },
  {
    id: "vllm-study",
    name: "vllm-study",
    title: "vLLM Internals & Inference Optimization",
    description: "Deep dive study repository covering PagedAttention, KV cache management, continuous batching, and high-throughput vLLM engine setup for LLM serving.",
    language: "Python",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/vllm-study",
    demoUrl: "",
    tags: ["vLLM", "Inference", "GPU", "CUDA", "LLMOps"],
    highlight: false,
    readmeSnippet: "Dissects vLLM architecture, memory fragmentation reduction via PagedAttention, and hands-on benchmarking recipes."
  },
  {
    id: "vectordb-interview",
    name: "vectorDB-interviewPrep",
    title: "Vector Databases & ANN Search Guide",
    description: "Comprehensive guide to Vector Databases (Pinecone, Qdrant, Milvus, Chroma), HNSW indexing, Product Quantization, and query optimization for AI interviews.",
    language: "Markdown",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/vectorDB-interviewPrep",
    demoUrl: "",
    tags: ["VectorDB", "HNSW", "Embeddings", "ANN Search"],
    highlight: false,
    readmeSnippet: "Detailed breakdown of approximate nearest neighbor algorithms, high-dimensional distance metrics (Cosine, L2, Dot Product), and trade-offs."
  },
  {
    id: "sentiment-bert",
    name: "Sentiment-Analysis-Using-Bert",
    title: "Google PlayStore Sentiment Analysis with BERT",
    description: "Custom fine-tuned BERT transformer model for sentiment analysis on real-world Google PlayStore app reviews. Assignment for Meril Life.",
    language: "Jupyter Notebook",
    stars: 1,
    forks: 0,
    githubUrl: "https://github.com/Arpit-Avasarmol/Sentiment-Analysis-Using-Bert",
    demoUrl: "",
    tags: ["BERT", "HuggingFace", "NLP", "Meril Life", "PyTorch"],
    highlight: false,
    readmeSnippet: "Fine-tuning HuggingFace BERT-base-uncased model for 5-star sentiment classification with multi-class loss optimization."
  }
];

export const CONTRIBUTION_SPARKLINE = [
  { week: "Jan", count: 12 },
  { week: "Feb", count: 18 },
  { week: "Mar", count: 34 },
  { week: "Apr", count: 25 },
  { week: "May", count: 48 },
  { week: "Jun", count: 85 },
  { week: "Jul", count: 125 }, // Peak week!
  { week: "Aug", count: 98 },
  { week: "Sep", count: 76 },
  { week: "Oct", count: 62 },
  { week: "Nov", count: 89 },
  { week: "Dec", count: 110 }
];
