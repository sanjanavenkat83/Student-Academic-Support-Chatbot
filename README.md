# AcademiaAI — Intelligent Student Academic Support Chatbot

An intelligent, interactive AI-style academic companion and decision-support system built purely with **HTML5, CSS3, and Vanilla JavaScript**. Designed specifically for college and university students to optimize their study workflows, master complex technical topics, prepare for semester examinations, practice placement aptitude quizzes, and navigate career roadmaps.

Hosted directly via **GitHub Pages** with zero build tools, zero external APIs, zero paid services, and zero backend dependencies.

---

## 🚀 Live Demo & Deployment

- **GitHub Pages Ready:** Place all files in the root directory and enable GitHub Pages on the `main` branch.
- **Zero Configuration:** No `npm install`, no API keys, no Node.js server required.

---

## 📋 Table of Contents
1. [Problem Statement](#-problem-statement)
2. [Key Architecture & Technical Highlights](#-key-architecture--technical-highlights)
3. [Core Chatbot Functionalities](#-core-chatbot-functionalities)
   - [Intent Recognition](#a-intent-recognition)
   - [Entity Extraction](#b-entity-extraction)
   - [Multi-Turn Slot Filling](#c-multi-turn-slot-filling-state-machine)
   - [Context Management & Memory](#d-context-management--memory)
   - [Custom Functional Actions](#e-custom-functional-actions)
4. [User Interface & Experience](#-user-interface--experience)
5. [File Structure](#-file-structure)
6. [How to Run Locally](#-how-to-run-locally)
7. [GitHub Pages Deployment Instructions](#-github-pages-deployment-instructions)

---

## 🎯 Problem Statement

College students regularly face academic overload, fragmented syllabi, tight exam deadlines, and difficulty balancing theoretical coursework with placement preparation. 

**AcademiaAI** solves this real-world academic challenge by acting as an on-demand, intelligent companion providing:
- Structured daily and hourly study planning.
- High-yield 3-phase revision strategies before exams.
- Topic explanations utilizing real-world analogies, core mechanisms, formulas, and common exam traps.
- Assignment deconstruction and academic integrity best practices.
- Interactive quantitative and logical aptitude practice with instant scoring and shortcut tricks.
- Resume-worthy capstone project suggestions with tech stacks and quantifiable resume bullet points.
- Proven time-management protocols (Pomodoro, Eisenhower Matrix, and circadian rhythm focus blocks).
- Verified open-access study resource recommendations.

---

## 🧠 Key Architecture & Technical Highlights

```
+--------------------------------------------------------------------------+
|                              AcademiaAI                                  |
+--------------------------------------------------------------------------+
|  [ User Input Form / Quick Suggestion Chips / Interactive Quiz Buttons ] |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                             NLP ENGINE                                   |
|  1. Text Normalizer & Tokenizer                                          |
|  2. Entity Extractor (Subject, Exam Date, Hours, Major, Role, Peak Time) |
|  3. Multi-Feature Intent Classifier (14+ Academic Intent Categories)     |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                     STATE MACHINE & CONTEXT MANAGER                      |
|  - Tracks Student Profile (Major, Semester, Study Preference)            |
|  - Manages Active Workflow (STUDY_PLAN, EXAM_PREP, APTITUDE_QUIZ, etc.)  |
|  - Conducts Multi-Turn Slot Filling (Missing entity detection & prompt)  |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                       CUSTOM ACTION EXECUTORS                            |
|  - generateStudySchedule()       - createRevisionPlan()                  |
|  - startQuiz() / checkAnswer()   - explainConcept()                      |
|  - provideProjectSuggestions()   - generateTimeManagementAdvice()        |
+--------------------------------------------------------------------------+
                                    |
                                    v
+--------------------------------------------------------------------------+
|                          UI RENDERER & WIDGETS                           |
|  - Markdown-to-HTML parser (Code blocks, Tables, Badges, Quotes)         |
|  - Live Academic Context Card DOM updater                                |
|  - Pomodoro Study Timer (Web Audio API sound chime, 25m/5m modes)        |
|  - Dark / Light Mode with LocalStorage persistence                       |
|  - Session Note Exporter (.txt download)                                 |
+--------------------------------------------------------------------------+
```

---

## 💡 Core Chatbot Functionalities

### A. Intent Recognition
The rule-based NLP classifier processes incoming messages through pattern matching and weighted keyword scoring across the following academic intents:
1. `GREETING`: Welcome prompts and dynamic greeting customized to user's major.
2. `STUDY_PLAN`: Initiates the multi-turn study scheduler.
3. `EXAM_PREP`: Triggers the 3-phase exam revision methodology.
4. `TOPIC_EXPLAIN`: Dissects concepts with real-world analogies, architecture, and pro exam tips.
5. `APTITUDE_PRACTICE`: Launches the interactive MCQ quiz engine.
6. `PROJECT_GUIDE`: Recommends curated college capstone and portfolio projects.
7. `ASSIGNMENT_HELP`: Provides structured rubric and report methodology.
8. `CAREER_GUIDANCE` & `INTERNSHIP_GUIDE`: Role roadmaps, cold emailing templates, and ATS guidelines.
9. `TIME_MANAGEMENT`: Pomodoro, 50/10 ultradian focus, and Eisenhower Matrix.
10. `RESOURCE_RECOMMEND`: Free, verified learning platforms and cheat sheets.
11. `RESTART_FLOW`: Resets conversation memory and active state machines.
12. `HELP_CAPABILITIES`: Comprehensive list of commands and example queries.
13. `THANKS` & `GOODBYE`: Polite conversational closures.

### B. Entity Extraction
The engine automatically extracts key entities from conversational phrases:
- **Academic Subjects:** e.g., Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Python, Java, Mathematics/Statistics.
- **Exam Dates / Timeframes:** e.g., "Tomorrow", "In 3 days", "Next week", "In 2 weeks", "In a month".
- **Available Study Hours:** e.g., "3 hours", "6 hrs", "4h", "2.5 hours".
- **Study Peak Times:** e.g., "Morning", "Late night", "Afternoon", "Evening".
- **College Majors / Degrees:** e.g., "Computer Science", "Information Technology", "BCA", "MCA", "Data Science".
- **Target Career Roles:** e.g., "Software Development Engineer (SDE)", "Data Scientist", "DevOps Engineer", "Frontend Developer".

### C. Multi-Turn Slot Filling (State Machine)
When the student triggers a complex action with missing parameters, the chatbot pauses and asks targeted follow-up questions in logical sequence:

**Example Conversation Flow:**
```
Student: "Create a study plan."
Bot:     "I'd love to help you build a personalized study plan! Which subject are you preparing for?"

Student: "Statistics."
Bot:     "When is your exam or target deadline?"

Student: "Tomorrow."
Bot:     "How many hours can you dedicate to studying each day?"

Student: "6 hours."
Bot:     "Do you focus best in the morning, afternoon, or late night?"

Student: "Late night."
Bot:     [Generates personalized hour-by-hour Late Night Study Schedule with deep work blocks, active recall intervals, and formulas!]
```

Users can change answers or type `cancel` at any time to exit the workflow.

### D. Context Management & Memory
- Context is retained inside the `ConversationContext` JavaScript state object throughout the browser session.
- **Context Awareness in Natural Language:** If a student mentions *"I am a Computer Science student"* and later asks *"Create a study plan for DSA"*, the bot responds:
  > *"Since you're studying Computer Science, we'll tailor the Data Structures & Algorithms study plan..."*
- **Live Academic Context Card:** Visible on the left sidebar, displaying the active Major, Focus Subject, Target Exam, Quiz Score, and Current Workflow in real time.

### E. Custom Functional Actions (Fully Implemented)
Unlike prototype bots with placeholder text, all actions execute real client-side JavaScript logic:
- `generateStudySchedule()`: Calculates session blocks, deep work distribution (70%), active recall buffer (30%), and hourly timetables based on the student's peak alertness hours.
- `createRevisionPlan()`: Generates a Phase 1 (Concept Synthesis), Phase 2 (PYQ Simulation), and Phase 3 (24-Hour Primer) plan.
- `startQuiz()` & `checkQuizAnswer()`: Interactive 4-choice questions with instant visual feedback (green/red highlights), score calculation, detailed solutions, and speed shortcut tricks.
- `finishQuiz()`: Renders a diagnostic scorecard with score percentage, performance tier (e.g. *Tier 1 Ready*), and targeted improvement recommendations.
- `provideProjectSuggestions()`: Project catalog with tech stacks, module breakdown, and quantifiable resume bullet points.
- **Built-in Pomodoro Timer:** Interactive sidebar widget with 25-minute focus and 5-minute break cycles, start/pause/reset states, and sound synthesis via the browser Web Audio API (no audio files needed).
- **Export Session Notes:** One-click download of the complete study session and timetable to a formatted `.txt` file.

---

## 🎨 User Interface & Experience

- **Design Aesthetic:** High-polish modern AI dark/light theme with smooth micro-animations, glassmorphism card depth, and readable typography via Google Fonts (`Plus Jakarta Sans` & `JetBrains Mono`).
- **Responsive Navigation:** Collapsible slide-out drawer on mobile screens (<900px) with backdrop overlay.
- **Typing Indicator:** Smooth 3-dot pulse animation simulating natural processing latency (350ms–750ms).
- **Keyboard Shortcuts:**
  - `Enter`: Send message
  - `Shift + Enter`: Multi-line prompt formatting
- **Interactive Quick Chips:** Horizontal scroll bar offering one-click suggestions to explore features without typing.

---

## 📁 File Structure

As required, all files are located strictly in the **root directory** with no nested subdirectories:

```
IT Vedant/
│
├── index.html       # Semantic HTML5 layout, sidebar, timer, chat log, and input bar
├── style.css        # Responsive CSS3 variables, dark/light themes, animations & widgets
├── script.js        # NLP engine, state machine, custom actions, and UI controller
└── README.md        # Comprehensive documentation and deployment guide
```

---

## 💻 How to Run Locally

1. Clone or download this repository onto your machine:
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```
2. Open `index.html` directly in any modern web browser:
   - Double-click `index.html` in your file explorer, OR
   - Run a simple local server if preferred:
     ```bash
     # Python 3
     python -m http.server 8000
     ```
3. Open `http://localhost:8000` in Google Chrome, Firefox, Safari, or Microsoft Edge.

---

## 🌐 GitHub Pages Deployment Instructions

This project requires zero build steps and is 100% compatible with GitHub Pages:

1. Push the 4 root files (`index.html`, `style.css`, `script.js`, `README.md`) to your GitHub repository.
2. In your repository on GitHub, navigate to **Settings** > **Pages** (under the "Code and automation" section).
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**.
5. Wait 30–60 seconds. GitHub will display your live URL:
   `https://<username>.github.io/<repository-name>/`

---

## 🛡️ License

Open Source Academic Resource — Created for college students, educators, and software engineering aspirants.
