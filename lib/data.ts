export const LINKS = {
  email: "utyo135@gmail.com",
  linkedin: "https://www.linkedin.com/in/shivendra-pratap-singh-8bab22237",
  github: "https://github.com/Shivendra1230",
  resume: "/Shivendra_Pratap_Singh_Resume.pdf",
};

export type Project = {
  id: string; name: string; cat: string; desc: string; points: string[]; stack: string[];
  demo: string; flow: string[]; repo?: string; host: "streamlit" | "render"; note?: string; flagship?: boolean;
};

export const projects: Project[] = [
  { id: "edupath", name: "EduPath 2.0", flagship: true, cat: "Generative AI / Agentic AI",
    desc: "An adaptive learning platform that finds a learner's skill gaps, builds a personalized career roadmap, and supports learning with streaming AI copilots, document-grounded Q&A and YouTube learning.",
    points: ["Personalized career roadmaps and skill-gap analysis", "Prerequisite analysis and skill prioritization", "Interactive Plotly charts for learner readiness", "Streaming AI copilots and document-grounded Q&A"],
    stack: ["LangGraph", "Groq LLM", "SQLite", "Pandas", "Plotly", "Streamlit"],
    flow: ["Assess skills", "Close gaps", "Track progress"],
    demo: "https://edupath-20-gmr9a7w2fherjmjgk6ggej.streamlit.app/", repo: "https://github.com/Shivendra1230/EduPath-2.0", host: "streamlit" },
  { id: "edupilot", name: "EduPilot", cat: "RAG / Generative AI",
    desc: "An adaptive AI learning copilot that turns PDFs, notes and YouTube lectures into personalized learning paths.",
    points: ["RAG over PDF notes and YouTube transcripts (English, Hindi, Hinglish)", "Topic mastery scoring: Strong, Revise, Weak", "FastAPI backend with 5 REST route modules, Dockerized"],
    stack: ["FastAPI", "RAG", "Groq LLM", "SQLAlchemy", "Docker", "Streamlit"],
    flow: ["Upload material", "Ask & retrieve", "Quiz & master"],
    demo: "https://edupilot-gfkyqzkbgoa4ovz3fxgbhu.streamlit.app/", repo: "https://github.com/Shivendra1230/EduPilot", host: "streamlit" },
  { id: "riskify", name: "Riskify", cat: "Machine Learning + Generative AI",
    desc: "A student early-warning system that predicts risk, explains the prediction, and suggests a personalized intervention.",
    points: ["PyTorch network on 6 signals, ~0.86 validation AUC (synthetic data)", "Gradient-based explainability", "Groq LLM action-plan coach with rule-based fallback"],
    stack: ["PyTorch", "scikit-learn", "Groq LLM", "Streamlit"],
    flow: ["Predict risk", "Explain why", "Suggest action"],
    demo: "https://riskify-rx5tffcebrxg9d4mbyomvg.streamlit.app/", repo: "https://github.com/Shivendra1230/Riskify", host: "streamlit" },
  { id: "fraud", name: "Credit Card Fraud Detection", cat: "Machine Learning / Deep Learning",
    desc: "A neural-network classifier for transaction fraud prediction with hyperparameter tuning, threshold optimization and batch CSV prediction.",
    points: ["Keras ANN on 30 features: 96.6% ROC-AUC, 87% precision, 76% recall", "Keras Tuner, Dropout, L2, early stopping, threshold tuning", "Single and batch CSV prediction with downloadable reports"],
    stack: ["TensorFlow", "Keras", "Keras Tuner", "scikit-learn", "Streamlit"],
    flow: ["Upload CSV", "Score transactions", "Flag fraud"],
    demo: "https://credit-card-fraud-detection-ann.onrender.com/", repo: "https://github.com/Shivendra1230/Credit-Card-Fraud-Detection-ANN", host: "render",
    note: "A learning and demonstration project, not a certified fraud-prevention system." },
  { id: "plant", name: "Plant Disease Detection", cat: "Deep Learning / Computer Vision",
    desc: "An EfficientNet-B0 model that classifies plant leaf images to identify potential plant diseases.",
    points: ["Image classification", "EfficientNet-B0 with PyTorch", "Interactive prediction"],
    stack: ["PyTorch", "EfficientNet-B0", "Streamlit"],
    flow: ["Upload leaf photo", "Classify", "Get diagnosis"],
    demo: "https://plant-disease-detection-4glrzup7hime5ctf4ivck6.streamlit.app/", repo: "https://github.com/Shivendra1230/plant-disease-detection", host: "streamlit",
    note: "96.54% test accuracy is the project-reported result, not a guarantee of real-world diagnostic accuracy." },
  { id: "ev", name: "EV Charging Demand Predictor", cat: "Machine Learning / Predictive Analytics",
    desc: "Predicts EV charging demand from historical demand, time features, charger availability, pricing and weather-related variables.",
    points: ["Exploratory data analysis", "Time-based train, validation and test splits", "XGBoost, evaluated with MAE, RMSE and R²"],
    stack: ["XGBoost", "Pandas", "Streamlit"],
    flow: ["Explore data", "Train XGBoost", "Predict demand"],
    demo: "https://evision-sctuxv5qrg7bawo66k5w56.streamlit.app/", host: "streamlit" },
];

export const services = [
  { title: "AI Chatbots & RAG Systems", desc: "Assistants that answer from your documents, knowledge bases or business FAQs.", price: "₹6,000",
    items: ["Document ingestion and retrieval", "Embeddings and vector search", "LLM integration with source references", "Chat interface and deployment"] },
  { title: "AI Agents & Workflow Automation", desc: "Automate repetitive workflows with LLM tools, API integrations and structured agent flows.", price: "₹8,000",
    items: ["Workflow design", "Tool and API integration", "Logging and human approval where appropriate", "Testing and documentation"] },
  { title: "Machine Learning & Predictive Analytics", desc: "Turn structured datasets into evaluated models and interactive dashboards.", price: "₹5,000",
    items: ["Preprocessing and exploratory analysis", "Baseline modeling and evaluation", "Prediction API or Streamlit dashboard", "Deployment guidance"] },
  { title: "AI Integration & Python Backend", desc: "Add AI to existing apps, or debug, improve and deploy Python-based AI products.", price: "₹2,500",
    items: ["LLM API integration", "FastAPI endpoints", "RAG debugging and model serving", "Deployment fixes and documentation"] },
];

export const skills = [
  { t: "Languages", d: "Python, C++, SQL, C" },
  { t: "Generative AI & Agents", d: "LLMs, Transformers, Agentic AI, Multi-Agent Systems, LangGraph, LangChain, RAG, Prompt Engineering, Embeddings, Vector Retrieval, Groq API" },
  { t: "ML, DL & NLP", d: "PyTorch, TensorFlow/Keras, Scikit-learn, XGBoost, NLP, Transfer Learning, Optuna, Keras Tuner, Explainable AI" },
  { t: "Backend", d: "FastAPI, REST APIs, SQLite, SQLAlchemy, Pydantic, Pandas, NumPy, Streamlit" },
  { t: "Deployment & Tools", d: "Docker, Render, Streamlit Cloud, Git, GitHub" },
  { t: "CS Fundamentals", d: "Data Structures & Algorithms, OOP, Operating Systems, DBMS" },
];

export const steps = [
  { t: "Discover", d: "Understand the problem, users, existing systems and success criteria." },
  { t: "Design", d: "Define the architecture, scope, technology choices and milestones." },
  { t: "Build & Test", d: "Implement, evaluate behavior, fix issues and validate deliverables." },
  { t: "Deploy & Handover", d: "Deliver the app with setup instructions, documentation and agreed deployment support." },
];
