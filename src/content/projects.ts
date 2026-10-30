// Published content fetched from https://yarranishwanth.tech/ on 2026-10-30.
// Text to Speech preserves the user's explicit correction from the local project.
export interface ProjectCaseStudy {
  headline: string;
  overview: string;
  contribution: string;
  problem: string;
  architecture: string;
  challenges: string;
  decisions: string;
  results: string;
  limitation: string;
  steps: string[];
  output: string;
}

export interface Project {
  id: string;
  title: string;
  fullTitle?: string;
  category: string;
  summary: string;
  metric: string;
  role: string;
  stage: string;
  stack: string;
  status: string;
  overview: string;
  highlights: string[];
  caseStudy?: ProjectCaseStudy;
  sourceUrl?: string;
  tags: string[];
  live?: string;
  repo?: string;
}

export const projects: Project[] = [
  {
    "id": "twiller",
    "title": "Twiller",
    "category": "FULL STACK",
    "summary": "Topic discovery, community circles, and configurable feed rules bring more control to an X-inspired social platform.",
    "metric": "FOUR FEED MODES / SIX FEED RULES",
    "role": "Full Stack Lead & API Architect",
    "stage": "Web application",
    "stack": "Next.js · TypeScript · Express · MongoDB · Firebase · Razorpay · Tailwind",
    "status": "Live demo available",
    "tags": [
      "Next.js",
      "TypeScript",
      "Express",
      "MongoDB",
      "Firebase",
      "Razorpay",
      "Tailwind"
    ],
    "live": "https://twiller-ruby.vercel.app/",
    "repo": "https://github.com/Nishwanth2809/twiller",
    "fullTitle": "Twiller — Social Platform",
    "overview": "Twiller combines familiar social interactions with explicit control over discovery. Users publish text, images, and audio, reply in threads, follow people and topics, join community circles, and save bookmarks. Four feed modes and six configurable rules let them narrow or reprioritize what they see. Messaging, paid plans, and admin moderation complete the application.",
    "highlights": [
      "Four feed modes: For You, Following, Topics, and Circles",
      "Six feed rules with expiry controls and score-aware cursor pagination",
      "Audio posts, threaded replies, bookmarks, and polling-based messaging",
      "Firebase session checks and transaction-backed Razorpay plan activation"
    ],
    "sourceUrl": "https://yarranishwanth.tech/",
    "caseStudy": {
      "headline": "A social feed you can shape.",
      "overview": "Twiller combines familiar social interactions with explicit control over discovery. Users publish text, images, and audio, reply in threads, follow people and topics, join community circles, and save bookmarks. Four feed modes and six configurable rules let them narrow or reprioritize what they see. Messaging, paid plans, and admin moderation complete the application.",
      "contribution": "My full-stack work spans the Next.js interface, Express REST APIs, MongoDB data models, and Firebase and Razorpay integrations. The current implementation extends the social experience with topic and circle discovery, configurable feed behavior, and a conversation-insight prototype.",
      "problem": "A single timeline gives users limited control over the conversations they encounter. Twiller adds separate views for followed people, topics, and communities, then lets users hide media or topics, boost or reduce topics, and prioritize a circle. Those choices must work alongside pagination, account permissions, media uploads, and paid posting quotas.",
      "architecture": "A Next.js 15 and React 19 frontend calls an Express 5 API backed by MongoDB and Mongoose. Firebase ID tokens and backend login-session checks establish identity. Separate operation modules handle feeds, topics, circles, posts, and notifications. Media uploads pass through backend validation and filesystem storage. Razorpay orders are verified server-side before a database transaction activates a paid plan.",
      "challenges": "Feed rules can change both eligibility and ordering, making pagination more complex than a timestamp alone. Weighted feeds use score-aware cursors and a fingerprint of the active mode and rules. Payment retries present a second consistency problem: order ownership, signatures, settlement, and prior fulfillment must be checked before changing plan access.",
      "decisions": "Feed customization uses explicit filters and deterministic ranking weights. Rules can last an hour, until midnight UTC, seven days, or until removal. Paid access uses verified 30-day purchases with transactional fulfillment and replay checks. Messaging refreshes through polling. Conversation insights use bounded reply traversal, source references, caching, and generation limits, with a mock provider behind a replaceable interface.",
      "results": "The inspected implementation connects four feed modes and six rule types to the interface and API, alongside topic follows, circle membership, audio posts, threaded replies, bookmarks, messaging, and admin moderation. Free, Bronze, Silver, and Gold plans apply server-side posting quotas. The repository includes tests for feed ranking, permissions, payments, media, and conversation insights; these are implementation evidence, not production performance measurements.",
      "limitation": "Conversation insights currently use a deterministic mock provider, so they do not demonstrate live LLM analysis. Messaging uses polling, and paid plans are individual 30-day purchases rather than automatic recurring billing. This review inspected local source; live feature parity, user adoption, and load performance were not verified.",
      "steps": [
        "Next.js + TypeScript",
        "Firebase sessions",
        "Express services",
        "MongoDB + media storage"
      ],
      "output": "Four feed modes · Six feed rules · Verified plan purchases"
    }
  },
  {
    "id": "attn",
    "title": "Attn",
    "category": "AUTOMATION",
    "summary": "A browser-based focus coach with local vision processing, configurable automation rules, and session reports.",
    "metric": "ON-DEVICE VISION / LOCAL REPORTS",
    "role": "Full-Stack & Automation Developer",
    "stage": "Web application",
    "stack": "Automation · MediaPipe · React 19 · Vite · Cloudflare Workers",
    "status": "Live demo available",
    "tags": [
      "Automation",
      "MediaPipe",
      "React 19",
      "Vite",
      "Cloudflare Workers"
    ],
    "live": "https://ai-attention.nishwanthyarra.workers.dev/",
    "repo": "https://github.com/Nishwanth2809/AI-Attention",
    "fullTitle": "Attn — AI Focus Coach",
    "overview": "Attn is a personal focus workspace rebuilt from a Python attention-monitoring prototype. It combines a session timer, optional on-device visual cues, four editable coaching rules, and a reporting dashboard. A camera-free demo lets visitors explore the workflow.",
    "highlights": [
      "On-device MediaPipe 468-point Face Mesh for real-time gaze & head pose tracking",
      "Configurable automation engine with custom triggers, cooldowns, and coaching actions",
      "100% private client-side architecture with local data storage & CSV/JSON report exports",
      "Interactive focus workspace featuring live signal timelines, streak tracking, and coaching logs"
    ],
    "sourceUrl": "https://yarranishwanth.tech/",
    "caseStudy": {
      "headline": "A little more intention. A little less distraction.",
      "overview": "Attn is a personal focus workspace rebuilt from a Python attention-monitoring prototype. It combines a session timer, optional on-device visual cues, four editable coaching rules, and a reporting dashboard. A camera-free demo lets visitors explore the workflow.",
      "contribution": "I rebuilt the application around React, moved camera inference into a dedicated worker, implemented the coaching automation rule engine, and added browser-local reports with CSV and JSON exports.",
      "problem": "Visual signals alone do not help someone manage a focus session. Attn turns sustained cues into small, configurable automation interventions while keeping camera frames and session history off an application server.",
      "architecture": "An opt-in camera supplies one transferable ImageBitmap at a time to a MediaPipe worker. A session tick feeds the automation rule engine, which applies dwell times and cooldowns before emitting a coach card, an optional notification, or an automated session pause. Completed reports are stored in localStorage, with the latest 30 sessions retained.",
      "challenges": "Camera startup, cancellation, worker errors, and stale signals require careful lifecycle handling. Pausing resets dwell continuity while retaining cooldown history. Device suspension pauses the session so stale metrics are not credited as fresh observations.",
      "decisions": "The worker keeps inference away from the interface thread, and one in-flight frame bounds processing work. Sustained triggers and cooldowns avoid reacting to every momentary cue. Static hosting keeps deployment simple; the tradeoff is browser-local storage without accounts or cross-device synchronisation.",
      "results": "The deployed application supports four configurable automation rules, local session reports, export downloads, and a camera-free demonstration. No camera pixels, landmarks, or reports are sent to an application backend.",
      "limitation": "The attention signal is a visual heuristic, not a measurement of thoughts or productivity. Coaching requires an active session tab. An unfinished session is held in memory and is lost on refresh; completed reports depend on the browser’s local storage.",
      "steps": [
        "Opt-in camera",
        "MediaPipe worker",
        "Coaching rules",
        "Local reports"
      ],
      "output": "Coach card · Optional notification · Session pause"
    }
  },
  {
    "id": "brahmi",
    "title": "Brahmi AI",
    "category": "COMPUTER VISION",
    "summary": "From an inscription image to character recognition and transliteration into modern Indian scripts.",
    "metric": "RECOGNITION / TRANSLITERATION",
    "role": "Computer Vision & ML Engineer",
    "stage": "Web application",
    "stack": "React · Flask · TensorFlow · Keras · OpenCV",
    "status": "Live demo available",
    "tags": [
      "React",
      "Flask",
      "TensorFlow",
      "Keras",
      "OpenCV"
    ],
    "live": "https://brahmi-script.vercel.app/",
    "repo": "https://github.com/Nishwanth2809/Brahmi-Script",
    "fullTitle": "Brahmi Script Recognizer",
    "overview": "Brahmi brings a computer-vision workflow into a web application: upload an inscription image, recognise its characters, and transliterate them into Telugu, Tamil, or Devanagari.",
    "highlights": [
      "94% Character Recognition Accuracy across ancient stone/manuscript scripts",
      "OpenCV contour detection and adaptive thresholding for character segmentation",
      "Transliteration engine mapping Brahmi phonetics to Telugu, Tamil & Devanagari",
      "Interactive Web App built with Flask & React for image upload and real-time inference"
    ],
    "sourceUrl": "https://yarranishwanth.tech/",
    "caseStudy": {
      "headline": "Giving an ancient script a readable next chapter.",
      "overview": "Brahmi brings a computer-vision workflow into a web application: upload an inscription image, recognise its characters, and transliterate them into Telugu, Tamil, or Devanagari.",
      "contribution": "My work spans the character-recognition model, OpenCV image preparation, phonetic mapping, and the React / Flask web application.",
      "problem": "Ancient inscriptions are difficult to read directly. Weathered surfaces and noisy character boundaries make the step from an image to individual recognisable characters especially important.",
      "architecture": "The documented pipeline uses OpenCV contour detection and adaptive thresholding to segment characters. A TensorFlow / Keras convolutional neural network recognises the segmented inputs. A phonetic mapping layer produces modern-script output, exposed through a Flask and React application.",
      "challenges": "Segmentation and recognition have to work with noisy inscription images. The project description identifies weathered artifact noise as a challenge; a breakdown by image condition is not available in the portfolio records.",
      "decisions": "The implementation separates image preparation, character recognition, and script mapping. OpenCV handles preparation, TensorFlow / Keras handles the CNN, and React with Flask provides the upload and inference interface.",
      "results": "The repository description reports 94% character-recognition accuracy. The dataset size, evaluation split, and per-character results are not documented here, so that figure should be read as a reported result rather than an independently validated benchmark.",
      "limitation": "Character recognition and phonetic transliteration are not the same as translating the meaning of an inscription. Broader validation on varied inscriptions remains unverified in the available material.",
      "steps": [
        "Inscription image",
        "OpenCV segmentation",
        "CNN recognition",
        "Script mapping"
      ],
      "output": "Telugu · Tamil · Devanagari"
    }
  },
  {
    "id": "deepfake-detection",
    "title": "Deepfake Detection",
    "category": "DEEP LEARNING",
    "summary": "Real-time deepfake detection pipeline using ResNet18 and OpenCV for frame-level analysis and media authenticity verification. 92% accuracy.",
    "metric": "RESNET18 / FRAME ANALYSIS",
    "role": "Deep Learning Systems Developer",
    "stage": "Portfolio project",
    "stack": "Python · OpenCV · ResNet18 · PyTorch",
    "status": "Source available",
    "tags": [
      "Python",
      "OpenCV",
      "ResNet18",
      "PyTorch"
    ],
    "repo": "https://github.com/Nishwanth2809/Deep-Fake-Detection",
    "fullTitle": "Deepfake Detection System",
    "overview": "A real-time deepfake detection framework engineered to inspect video frames for facial manipulation, unnatural blending artifacts, and temporal inconsistencies. Leveraged a fine-tuned ResNet18 convolutional architecture trained on facial manipulation benchmark datasets, integrated with OpenCV for frame extraction and real-time video stream analysis at 92% detection accuracy.",
    "highlights": [
      "ResNet18 Deep Convolutional Backbone fine-tuned for facial artifact detection",
      "Frame-by-frame temporal analysis & facial landmark tracking with OpenCV",
      "Real-time video processing pipeline capable of analyzing live camera streams",
      "92% verification accuracy on deepfake detection benchmark datasets"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "medical",
    "title": "Medical AI",
    "category": "ML",
    "summary": "Extracts medical data with OCR and transforms complex healthcare documents into readable, AI-generated summaries for faster comprehension.",
    "metric": "OCR / PLAIN-LANGUAGE SUMMARIES",
    "role": "Full-Stack AI Engineer",
    "stage": "Portfolio project",
    "stack": "React · Node.js · OCR · NLP",
    "status": "Live demo available",
    "tags": [
      "React",
      "Node.js",
      "OCR",
      "NLP"
    ],
    "live": "https://medical-report-analyzer-three.vercel.app/",
    "repo": "https://github.com/Nishwanth2809/AI-Medical-Report-Analyzer",
    "fullTitle": "AI Medical Report Analyzer",
    "overview": "An intelligent healthcare document intelligence application that transforms complex, dense medical lab reports and clinical documentation into structured, plain-language summaries. Integrates Tesseract OCR for text extraction from scanned PDFs/images and LLM NLP pipelines to categorize metrics, flag out-of-range lab results, and provide patient-friendly explanations.",
    "highlights": [
      "Tesseract OCR engine for document digitization from multi-page PDFs & images",
      "Automated lab result extraction & abnormal range detection",
      "Natural Language Summarization converting medical terminology to clear insights",
      "Privacy-conscious file handling with instant client-side preview"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "moodify",
    "title": "Moodify",
    "category": "NLP",
    "summary": "NLP-powered recommendation engine that detects mood from text and maps it to curated Spotify playlists. Multilingual support including Telugu, Hindi, Tamil.",
    "metric": "MULTILINGUAL NLP / SPOTIFY",
    "role": "ML & NLP Developer",
    "stage": "Portfolio project",
    "stack": "Python · NLP · Spotify API · Streamlit",
    "status": "Live demo available",
    "tags": [
      "Python",
      "NLP",
      "Spotify API",
      "Streamlit"
    ],
    "live": "https://moodstream-q4lr.onrender.com/",
    "repo": "https://github.com/Nishwanth2809/Moodify-Let-Your-Mood-Choose-the-Music-",
    "fullTitle": "Moodify",
    "overview": "An NLP-driven music recommendation system that analyzes text input (journal entries, mood descriptions, or social posts) to detect emotional sentiment and automatically generate/map curated Spotify playlists. Built using fine-tuned sentiment classifiers with multilingual NLP support (including English, Telugu, Hindi, and Tamil), integrated with the Spotify Web API.",
    "highlights": [
      "Multilingual sentiment analysis across English, Telugu, Hindi, and Tamil",
      "Seamless integration with Spotify Web API for playlist generation",
      "Streamlit web interface with real-time mood visualization",
      "Dynamic valence & energy mapping to match music audio features"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "voice-chat-ai",
    "title": "Text to Speech",
    "category": "WEB / SPEECH",
    "summary": "A browser-based speech converter with selectable voices and adjustable speed, pitch, and volume.",
    "metric": "WEB SPEECH API / VOICE CONTROLS",
    "role": "Frontend developer",
    "stage": "Web application",
    "stack": "JavaScript · HTML · CSS · Web Speech API",
    "status": "Source available",
    "tags": [
      "JavaScript",
      "Web Speech API",
      "HTML",
      "CSS"
    ],
    "repo": "https://github.com/nishwanth2809/Text-to-Speech",
    "overview": "Uses SpeechSynthesisUtterance and the browser voice list, with controls for rate, pitch, volume, playback, and stopping speech.",
    "highlights": [
      "Selectable browser voices",
      "Adjustable speaking rate, pitch, and volume",
      "Start and stop speech playback"
    ]
  },
  {
    "id": "local-rag",
    "title": "Local RAG",
    "category": "AI SYSTEMS",
    "summary": "Private document Q&A application running entirely offline using Ollama, Llama 3, and LangChain for retrieval-augmented generation.",
    "metric": "LOCAL INFERENCE / SOURCE CITATIONS",
    "role": "AI Systems Engineer",
    "stage": "Portfolio project",
    "stack": "LangChain · Ollama · ChromaDB · Streamlit",
    "status": "Source available",
    "tags": [
      "LangChain",
      "Ollama",
      "ChromaDB",
      "Streamlit"
    ],
    "repo": "https://github.com/Nishwanth2809/Local-RAG-System",
    "fullTitle": "Local RAG System",
    "overview": "A 100% private, offline Retrieval-Augmented Generation (RAG) system for querying confidential enterprise documents. Built using LangChain, ChromaDB vector storage, and local Llama 3 models served via Ollama, ensuring zero data leaves the local machine.",
    "highlights": [
      "Completely local & offline document Q&A — no API keys required",
      "High-performance vector embeddings with ChromaDB & LangChain",
      "Runs Llama 3 / Mistral locally via Ollama inference engine",
      "Streamlit chat UI with source document citation & page references"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "sales-analytics",
    "title": "Sales Analytics",
    "category": "DATA ANALYTICS",
    "summary": "Interactive Power BI analytics dashboard analyzing sales performance, revenue trends, customer segments, and regional sales distribution.",
    "metric": "POWER BI / SQL / DAX",
    "role": "Data Analyst & BI Engineer",
    "stage": "Portfolio project",
    "stack": "Power BI · SQL · Data Modeling · DAX",
    "status": "Source available",
    "tags": [
      "Power BI",
      "SQL",
      "Data Modeling",
      "DAX"
    ],
    "repo": "https://github.com/Nishwanth2809/Sales-Analytics-Dashboard",
    "fullTitle": "Sales & Revenue Analytics",
    "overview": "A comprehensive Business Intelligence suite developed in Power BI to analyze enterprise sales performance, revenue growth drivers, customer lifetime value, and regional distribution across multiple fiscal quarters. Built custom DAX metrics and star-schema relational data models from SQL databases.",
    "highlights": [
      "Star-schema relational data modeling with SQL & DAX calculations",
      "Dynamic cohort analysis, regional revenue maps, and sales target tracking",
      "Automated executive summary KPI cards & filter slicers",
      "Data cleansing & ETL automation with Power Query"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "ipl-analytics",
    "title": "IPL Analytics",
    "category": "DATA ANALYTICS",
    "summary": "Tableau dashboard analyzing 16+ seasons of IPL cricket data — team performance, player statistics, venue insights, and match outcome predictors.",
    "metric": "CRICKET DATA / TABLEAU",
    "role": "Data Analyst & Tableau Developer",
    "stage": "Portfolio project",
    "stack": "Tableau · Python · Pandas · Data Viz",
    "status": "Live demo available",
    "tags": [
      "Tableau",
      "Python",
      "Pandas",
      "Data Viz"
    ],
    "live": "https://public.tableau.com/app/profile/nishwanth.yarra/viz/IPLAnalyticsDashboard2008-2024_17821134384020/Dashboard1",
    "repo": "https://github.com/Nishwanth2809/IPL-Analytics-Tableau",
    "fullTitle": "IPL Analytics Dashboard",
    "overview": "An extensive sports analytics dashboard analyzing 16+ seasons of Indian Premier League (IPL) cricket data (2008–2024). Features deep-dive metrics on team win probabilities, venue bias, economy rates, partnership stats, and player head-to-head performance.",
    "highlights": [
      "Comprehensive analysis of 16+ seasons of IPL historical data",
      "Dynamic venue, toss impact, and target defense/chase success metrics",
      "Player head-to-head comparison tool & match outcome predictor",
      "Published live on Tableau Public with 1000+ views"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  },
  {
    "id": "rl-car-racing",
    "title": "RL Autopilot",
    "category": "REINFORCEMENT LEARNING",
    "summary": "Trained a PPO agent in OpenAI Gym CarRacing-v2 environment achieving autonomous track navigation using continuous action spaces.",
    "metric": "PPO / CONTINUOUS CONTROL",
    "role": "Reinforcement Learning Engineer",
    "stage": "Portfolio project",
    "stack": "PyTorch · Gymnasium · PPO · Stable-Baselines3",
    "status": "Source available",
    "tags": [
      "PyTorch",
      "Gymnasium",
      "PPO",
      "Stable-Baselines3"
    ],
    "repo": "https://github.com/Nishwanth2809/AI-Car-Racing---PPO-Autopilot",
    "fullTitle": "RL Car Racing Autopilot",
    "overview": "Trained an autonomous driving agent using Proximal Policy Optimization (PPO) in OpenAI Gym’s CarRacing-v2 continuous control environment. Processed pixel frame observations with a custom CNN encoder and tuned hyperparameters to achieve reliable track completion without off-track penalties.",
    "highlights": [
      "PPO (Proximal Policy Optimization) reinforcement learning algorithm",
      "Custom CNN feature extractor processing 96x96 pixel environment frames",
      "Continuous control action space (steering, gas, braking)",
      "Evaluation metrics tracking mean reward, lap time, and track completion rate"
    ],
    "sourceUrl": "https://yarranishwanth.tech/"
  }
];
