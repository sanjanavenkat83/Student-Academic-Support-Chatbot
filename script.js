/**
 * ============================================================================
 * AcademiaAI — Intelligent Student Academic Support Chatbot
 * Vanilla JavaScript Engine (Intent Recognition, Entity Extraction,
 * Multi-Turn Slot Filling, Context Memory, & Custom Academic Actions)
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. KNOWLEDGE BASE & DATA REPOSITORY
     ========================================================================== */

  const KNOWLEDGE_BASE = {
    // Academic Subjects & Concept Explanations
    subjects: {
      'data structures': {
        name: 'Data Structures & Algorithms',
        keywords: ['dsa', 'data structures', 'algorithms', 'data structure', 'algo'],
        topics: {
          'dynamic programming': {
            title: 'Dynamic Programming (DP)',
            analogy: 'Imagine writing down "1 + 1 + 1 + 1 = 4" on a notepad. If someone adds another " + 1", you don\'t re-add from scratch; you remember 4 and simply add 1 to get 5. That is memoization!',
            concept: 'Dynamic Programming solves complex problems by breaking them down into overlapping subproblems and optimal substructures. It avoids redundant computations by caching subproblem solutions in memory.',
            formula: 'Top-Down (Memoization): Recursion + Cache\nBottom-Up (Tabulation): Iterative DP Table filling',
            examTip: 'Always identify base cases first. In interviews, state the recurrence relation before jumping into code. Common DP patterns: Knapsack, Longest Common Subsequence (LCS), and Matrix Chain Multiplication.'
          },
          'recursion': {
            title: 'Recursion',
            analogy: 'Like Russian nesting dolls (Matryoshka): to reach the tiny wooden doll inside, you must open each layer one by one until you reach the smallest doll (the base case).',
            concept: 'Recursion is a programming technique where a function calls itself directly or indirectly to solve a smaller instance of the same problem.',
            formula: 'Structure:\nfunction solve(n) {\n  if (n <= base) return result; // Base case\n  return solve(n - 1) + step;   // Recursive call\n}',
            examTip: 'Watch out for Stack Overflow error! Every recursive call consumes stack memory (O(N) aux space). Mention Tail Call Optimization if applicable.'
          },
          'arrays': {
            title: 'Arrays & Dynamic Arrays',
            analogy: 'A row of numbered lockers in a hallway. If you know locker number 7, you can walk directly to it in O(1) constant time.',
            concept: 'Contiguous block of memory elements storing same-type items. Fast O(1) index access, but O(N) insertion/deletion at arbitrary positions.',
            formula: 'Access: O(1) | Search: O(N) (or O(log N) if sorted) | Insert/Delete: O(N)',
            examTip: 'Remember two-pointer technique and sliding window. They optimize O(N^2) brute force problems to O(N).'
          },
          'linked lists': {
            title: 'Linked Lists (Singly & Doubly)',
            analogy: 'A treasure hunt where each clue contains a piece of paper telling you the exact GPS coordinates of the next clue.',
            concept: 'Linear collection of data elements (nodes) where each node points to the next via a pointer/reference. Non-contiguous in memory.',
            formula: 'Insert at head: O(1) | Search: O(N) | Space per node: Data + Pointer',
            examTip: 'Floyd\'s Cycle Detection (Fast & Slow pointer / Tortoise and Hare) is the #1 most asked linked list interview question.'
          },
          'trees': {
            title: 'Trees & Binary Search Trees (BST)',
            analogy: 'A corporate organizational chart: CEO at the root, Vice Presidents as child nodes, and individual contributors as leaf nodes.',
            concept: 'Hierarchical non-linear data structure. A BST maintains the property: Left Subtree < Root < Right Subtree for every node.',
            formula: 'BST Search/Insert: O(log N) average, O(N) skewed worst case. Balanced (AVL, Red-Black): O(log N) guaranteed.',
            examTip: 'In-order traversal of a BST always yields sorted keys in ascending order!'
          },
          'graphs': {
            title: 'Graphs (BFS & DFS)',
            analogy: 'A social network like LinkedIn or Instagram: people are vertices (nodes) and friendships/follows are edges.',
            concept: 'Network of vertices connected by edges (directed, undirected, weighted). Traversed via BFS (queue, shortest path in unweighted graph) or DFS (stack/recursion).',
            formula: 'Adjacency Matrix: O(V^2) space | Adjacency List: O(V + E) space',
            examTip: 'Use BFS for shortest path in unweighted graphs. Use Dijkstra\'s algorithm for shortest path in non-negative weighted graphs.'
          }
        }
      },
      'dbms': {
        name: 'Database Management Systems (DBMS)',
        keywords: ['dbms', 'database', 'sql', 'databases', 'rdbms'],
        topics: {
          'normalization': {
            title: 'Database Normalization (1NF, 2NF, 3NF, BCNF)',
            analogy: 'Organizing your closet: instead of throwing shirts, shoes, and winter coats into one giant heap, you sort them into designated shelves to eliminate clutter and redundancy.',
            concept: 'Process of structuring a relational database to reduce data redundancy and eliminate insert, update, and delete anomalies.',
            formula: '1NF: Atomic values (no repeating groups)\n2NF: 1NF + No partial dependencies\n3NF: 2NF + No transitive dependencies\nBCNF: For every X -> Y, X must be a Super Key',
            examTip: 'In exams, draw the functional dependency diagram first. Transitive dependency: if A -> B and B -> C, then A -> C is transitive.'
          },
          'acid properties': {
            title: 'ACID Properties in Transactions',
            analogy: 'ATM cash withdrawal: if your account is debited but the machine runs out of cash, the entire transaction rolls back so you never lose money.',
            concept: 'Guarantees that ensure database transactions are processed reliably:\n• Atomicity: All or nothing\n• Consistency: Database remains in valid state\n• Isolation: Concurrent transactions do not interfere\n• Durability: Committed data survives crashes',
            formula: 'WAL (Write-Ahead Logging) provides Durability & Atomicity. 2-Phase Locking (2PL) provides Isolation.',
            examTip: 'A common viva question: "Which component handles durability?" Answer: Recovery Manager / Write-Ahead Log.'
          },
          'indexing': {
            title: 'Database Indexing & B-Trees',
            analogy: 'The index section at the back of a 1000-page textbook that tells you the exact page number of a term without reading every page.',
            concept: 'Data structure (typically B-Tree or B+ Tree) that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage.',
            formula: 'Search without index: O(N) full table scan\nSearch with B+ Tree index: O(log N)',
            examTip: 'Never index columns that are frequently updated or have very low cardinality (e.g. boolean flags).'
          }
        }
      },
      'operating systems': {
        name: 'Operating Systems (OS)',
        keywords: ['os', 'operating systems', 'operating system'],
        topics: {
          'deadlocks': {
            title: 'Deadlocks & Prevention',
            analogy: 'Four cars arrive at a four-way crossroad at the exact same moment from four directions, each waiting for the car to its right to move. Nobody can move!',
            concept: 'A situation where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process.',
            formula: '4 Coffman Conditions (All must hold):\n1. Mutual Exclusion\n2. Hold and Wait\n3. No Preemption\n4. Circular Wait',
            examTip: 'Banker\'s Algorithm is used for Deadlock Avoidance. Remember to check if safe state exists: Need = Max - Allocation.'
          },
          'paging': {
            title: 'Virtual Memory & Paging',
            analogy: 'A chef with a small cutting board: only the ingredients for the current recipe step are placed on the board, while the rest stay in the refrigerator pantry.',
            concept: 'Memory management scheme where secondary memory stores equal-sized blocks called "Pages" and physical RAM is divided into "Frames".',
            formula: 'Page Fault occurs when a requested page is not in physical RAM.\nEffective Access Time = (1 - p) * ma + p * page_fault_time',
            examTip: 'Belady\'s Anomaly: In FIFO page replacement, adding more frames can paradoxically increase the number of page faults!'
          },
          'cpu scheduling': {
            title: 'CPU Scheduling Algorithms',
            analogy: 'A single doctor in an urgent care clinic deciding whether to see patients in order of arrival, urgency, or estimated consultation time.',
            concept: 'The mechanism by which the OS allocates CPU time among runnable processes (FCFS, SJF, Round Robin, Priority Scheduling).',
            formula: 'Turnaround Time = Completion Time - Arrival Time\nWaiting Time = Turnaround Time - Burst Time',
            examTip: 'SJF (Shortest Job First) is theoretically optimal for minimum average waiting time, but cannot be implemented without knowing future burst times.'
          }
        }
      },
      'computer networks': {
        name: 'Computer Networks (CN)',
        keywords: ['cn', 'computer networks', 'networking', 'networks'],
        topics: {
          'osi model': {
            title: 'OSI 7-Layer Reference Model',
            analogy: 'Sending a registered international parcel: Packaging -> Customs document -> Sorting facility -> Cargo flight -> Local postman -> Recipient mailbox.',
            concept: 'Conceptual framework that standardizes network communication:\n1. Physical (bits)\n2. Data Link (frames, MAC)\n3. Network (packets, IP)\n4. Transport (segments, TCP/UDP)\n5. Session\n6. Presentation (SSL/TLS, formatting)\n7. Application (HTTP, DNS, FTP)',
            formula: 'Mnemonic: "Please Do Not Throw Sausage Pizza Away" (Physical to Application)',
            examTip: 'Routers operate at Layer 3 (Network). Switches operate at Layer 2 (Data Link). Hubs operate at Layer 1.'
          },
          'tcp vs udp': {
            title: 'TCP vs UDP Protocols',
            analogy: 'TCP is a registered phone call (dial, confirm connection, acknowledge words). UDP is a megaphone shout (fast, broadcast, no confirmation if heard).',
            concept: 'TCP is connection-oriented, reliable, orders packets, and provides congestion control (3-way handshake). UDP is connectionless, fast, lightweight, with zero delivery guarantee.',
            formula: 'TCP: Web (HTTP), Email (SMTP), File (FTP)\nUDP: Video streaming, VoIP, Gaming, DNS',
            examTip: 'Memorize TCP 3-way handshake: SYN -> SYN-ACK -> ACK.'
          }
        }
      },
      'python': {
        name: 'Python Programming',
        keywords: ['python', 'py', 'python programming'],
        topics: {
          'decorators': {
            title: 'Python Decorators',
            analogy: 'Gift wrapping a box: the gift inside remains the same, but the wrapper adds extra decoration, ribbons, or a gift tag around it.',
            concept: 'A decorator is a function that takes another function as an argument, extends or alters its behavior without modifying original source code, and returns the modified function.',
            formula: 'def my_decorator(func):\n    def wrapper(*args, **kwargs):\n        # before logic\n        res = func(*args, **kwargs)\n        # after logic\n        return res\n    return wrapper',
            examTip: 'Uses @decorator syntax above function definition. Essential for logging, authentication, and execution timing.'
          },
          'oop': {
            title: 'Object-Oriented Programming (OOP) in Python',
            analogy: 'A blueprint of a sports car (Class) vs the actual physical car driven on the road (Object instance).',
            concept: 'Four Pillars:\n• Encapsulation (private variables __var)\n• Abstraction (abstract classes & interfaces)\n• Inheritance (subclasses inheriting base methods)\n• Polymorphism (method overriding and duck typing)',
            formula: 'class Student:\n    def __init__(self, name):\n        self.name = name',
            examTip: 'Explain `__init__` is a constructor, and `self` represents the specific object instance invoking the method.'
          }
        }
      },
      'mathematics': {
        name: 'Engineering Mathematics & Statistics',
        keywords: ['math', 'mathematics', 'statistics', 'calculus', 'stats', 'probability'],
        topics: {
          'bayes theorem': {
            title: 'Bayes\' Theorem & Conditional Probability',
            analogy: 'A medical test: if a test is 99% accurate, but only 1 in 10,000 people have the rare disease, a positive result still means you probably don\'t have it because the base rate is so low.',
            concept: 'Calculates the probability of an event based on prior knowledge of conditions that might be related to the event.',
            formula: 'P(A | B) = [ P(B | A) * P(A) ] / P(B)',
            examTip: 'Foundation of Naive Bayes classifiers in Machine Learning and spam filtering algorithms.'
          },
          'matrices': {
            title: 'Eigenvalues & Eigenvectors',
            analogy: 'Stretching a rubber sheet with a painted arrow on it: most arrows change direction, but eigenvectors only get longer or shorter without twisting!',
            concept: 'An eigenvector of a square matrix A is a non-zero vector v such that multiplying A by v yields a scaled version of v (lambda * v).',
            formula: 'A * v = λ * v  =>  det(A - λI) = 0',
            examTip: 'Used in Principal Component Analysis (PCA) for dimensionality reduction and Google\'s original PageRank algorithm.'
          }
        }
      }
    },

    // Curated Aptitude Practice Questions (Quantitative, Logical, CS)
    aptitudeBank: [
      {
        id: 1,
        category: 'Quantitative Aptitude',
        question: 'A can complete a project in 12 days, and B can complete it in 16 days. If they work together for 4 days, what fraction of the work remains unfinished?',
        options: ['1/3', '5/12', '7/12', '1/4'],
        correctIndex: 1,
        explanation: 'Work done by A in 1 day = 1/12. Work done by B in 1 day = 1/16.\nCombined 1-day work = (1/12 + 1/16) = (4 + 3)/48 = 7/48.\nWork done in 4 days = 4 * (7/48) = 7/12.\nRemaining work = 1 - 7/12 = 5/12.',
        trick: 'Formula: Remaining = 1 - [Days * (1/A + 1/B)]. Use LCM of 12 and 16 (which is 48) to calculate total units fast!'
      },
      {
        id: 2,
        category: 'Quantitative Aptitude',
        question: 'A train 180 meters long crosses a platform 220 meters long in 20 seconds. What is the speed of the train in km/h?',
        options: ['60 km/h', '72 km/h', '80 km/h', '90 km/h'],
        correctIndex: 1,
        explanation: 'Total distance = Train length + Platform length = 180m + 220m = 400m.\nSpeed = Distance / Time = 400m / 20s = 20 m/s.\nConvert m/s to km/h: 20 * (18/5) = 4 * 18 = 72 km/h.',
        trick: 'Always multiply m/s by (18/5) to convert directly to km/h!'
      },
      {
        id: 3,
        category: 'Logical Reasoning',
        question: 'Pointing to a photograph, a woman says: "He is the only son of my father\'s only son." Who is the person in the photograph to the woman?',
        options: ['Brother', 'Son', 'Nephew', 'Father'],
        correctIndex: 2,
        explanation: '"My father\'s only son" refers to the woman\'s brother (assuming the speaker is female). Therefore, the "only son of my father\'s only son" is her brother\'s son, which makes him her Nephew.',
        trick: 'Break the chain from the end: Father\'s only son -> Brother. Only son of Brother -> Nephew.'
      },
      {
        id: 4,
        category: 'Logical Reasoning',
        question: 'Find the missing number in the sequence: 7, 14, 28, 56, 112, ?',
        options: ['168', '214', '224', '248'],
        correctIndex: 2,
        explanation: 'Each number is obtained by multiplying the previous term by 2 (Geometric progression with ratio r = 2).\n112 * 2 = 224.',
        trick: 'Observe the consecutive ratios: 14/7 = 2, 28/14 = 2. Consistent doubling.'
      },
      {
        id: 5,
        category: 'Computer Science & Tech Aptitude',
        question: 'What is the worst-case time complexity of QuickSort when the pivot chosen is always the extreme (minimum or maximum) element?',
        options: ['O(N log N)', 'O(N^2)', 'O(log N)', 'O(N)'],
        correctIndex: 1,
        explanation: 'When the pivot is the smallest or largest element (e.g. sorted array with first element as pivot), the partition creates one subproblem of size 0 and another of size N-1. This leads to the recurrence T(N) = T(N-1) + O(N) = O(N^2).',
        trick: 'Randomized QuickSort or 3-way partitioning prevents this O(N^2) degradation.'
      },
      {
        id: 6,
        category: 'Quantitative Aptitude',
        question: 'An item is sold for $720 at a profit of 20%. What was the original cost price (CP)?',
        options: ['$550', '$600', '$620', '$580'],
        correctIndex: 1,
        explanation: 'Selling Price (SP) = CP * (1 + Profit% / 100) = CP * 1.20.\n720 = CP * 1.20 => CP = 720 / 1.2 = 600.',
        trick: '20% profit = 1/5 of CP. So SP is 6/5 of CP. CP = 720 * (5/6) = 120 * 5 = 600.'
      },
      {
        id: 7,
        category: 'Computer Science & Tech Aptitude',
        question: 'Which of the following data structures is optimal for implementing an LRU (Least Recently Used) Cache?',
        options: ['Array + Stack', 'Hash Map + Doubly Linked List', 'Binary Search Tree', 'Queue only'],
        correctIndex: 1,
        explanation: 'Hash Map gives O(1) lookup time by key, while Doubly Linked List allows O(1) removal and insertion of elements at head/tail.',
        trick: 'Remember: Hash Table gives speed, Doubly Linked List gives ordering.'
      }
    ],

    // Project & Capstone Ideas Repository
    projectCatalog: [
      {
        domain: 'Full Stack & Web Engineering',
        level: 'Intermediate',
        title: 'Real-Time Collaborative Code & Markdown Editor',
        techStack: ['Node.js', 'Socket.io', 'React / Vanilla JS', 'Monaco Editor'],
        summary: 'A web-based workspace where students can pair-program simultaneously, run syntax checks, and export documents.',
        keyModules: ['Operational Transformation / WebSockets for sync', 'Syntax highlighting & cursor position broadcast', 'Live chat & code snippet execution sandbox'],
        resumeBullets: [
          'Engineered low-latency multi-client state synchronization via WebSockets maintaining sub-50ms sync.',
          'Built custom diffing mechanism preventing race conditions during concurrent typing.'
        ]
      },
      {
        domain: 'Artificial Intelligence & Machine Learning',
        level: 'Advanced',
        title: 'Intelligent Resume Screener & Job Skill Matcher',
        techStack: ['Python', 'FastAPI', 'scikit-learn', 'Spacy / HuggingFace BERT', 'PostgreSQL'],
        summary: 'Parses student PDF resumes, extracts competencies and project keywords, and calculates an ATS similarity score against job descriptions.',
        keyModules: ['Resume parsing via pdfplumber and NER entity extraction', 'TF-IDF & Cosine Similarity / Sentence-BERT embeddings', 'Interactive dashboard with visual skill gap breakdown'],
        resumeBullets: [
          'Implemented Cosine Similarity pipeline evaluating candidate suitability against 500+ technical job postings.',
          'Reduced resume parsing latency by 45% using batched token embeddings.'
        ]
      },
      {
        domain: 'System Design & DevOps',
        level: 'Intermediate',
        title: 'Distributed URL Shortener with Analytics & Rate Limiting',
        techStack: ['Python/Go', 'Redis', 'PostgreSQL', 'Docker', 'NGINX'],
        summary: 'Scalable service that generates Base62 shortened aliases, tracks geo-location click analytics, and protects endpoints using token-bucket rate limiting.',
        keyModules: ['Base62 encoding of auto-incrementing distributed 64-bit IDs', 'Redis caching layer for 99th-percentile sub-5ms redirection', 'Sliding window rate-limiter per client IP'],
        resumeBullets: [
          'Designed high-throughput URL shortening service handling 2,000+ simulated requests/sec with Redis cache hit ratio of 94%.',
          'Configured Docker Compose multi-container setup with automated NGINX reverse-proxy routing.'
        ]
      },
      {
        domain: 'Cybersecurity & Networks',
        level: 'Capstone',
        title: 'Automated Network Vulnerability & Port Scanner',
        techStack: ['Python', 'Scapy', 'Socket Programming', 'Flask Dashboard'],
        summary: 'Scans target local networks for open ports, banners, insecure protocols, and weak credentials with automated vulnerability summary generation.',
        keyModules: ['TCP SYN and UDP stealth scanning engine', 'Service banner grabbing and CVE correlation', 'HTML report generation with remediation checklists'],
        resumeBullets: [
          'Developed asynchronous socket scanner with multi-threading achieving 4x scan speeds over single-threaded routines.',
          'Demonstrated mitigation of common vulnerabilities including open Telnet and FTP ports.'
        ]
      }
    ],

    // High-yield study resources
    resources: [
      {
        category: 'Algorithms & Data Structures',
        links: [
          { name: 'NeetCode Roadmap', desc: 'Curated 150 topic-by-topic algorithmic problems with video walkthroughs.' },
          { name: 'Visualgo.net', desc: 'Interactive visualizer for trees, graphs, sorting, and graph traversals.' },
          { name: 'Abdul Bari YouTube', desc: 'Widely praised explanations of complex algorithm design and analysis.' }
        ]
      },
      {
        category: 'Core Computer Science (OS, DBMS, Networks)',
        links: [
          { name: 'Gate Smashers (YouTube)', desc: 'Concise university exam-oriented explanations of OS, DBMS, CN, and TOC.' },
          { name: 'CS50: Introduction to Computer Science', desc: 'Legendary foundational course by Harvard University.' },
          { name: 'Operating Systems: Three Easy Pieces (OSTEP)', desc: 'Free online textbook breaking down Virtualization, Concurrency, and Persistence.' }
        ]
      },
      {
        category: 'Web Dev & Software Engineering',
        links: [
          { name: 'The Odin Project', desc: '100% free, project-based full stack web development curriculum.' },
          { name: 'MDN Web Docs', desc: 'The gold standard reference for HTML, CSS, JavaScript, and Web APIs.' },
          { name: 'roadmap.sh', desc: 'Community-driven visual learning paths for Frontend, Backend, DevOps, and AI.' }
        ]
      }
    ]
  };

  /* ==========================================================================
     2. CONVERSATION CONTEXT & STATE ENGINE
     ========================================================================== */

  const ConversationContext = {
    // Persistent profile information discovered during conversation
    profile: {
      major: 'Computer Science',
      semester: null,
      careerGoal: null,
      studyPreference: 'Morning' // default to Morning if unspecified
    },

    // Current active multi-turn workflow
    workflow: {
      active: null, // null | 'STUDY_PLAN' | 'EXAM_PREP' | 'APTITUDE_QUIZ'
      step: 0,
      slots: {
        subject: null,
        examDate: null,
        dailyHours: null,
        studyTime: 'Morning'
      }
    },

    // Aptitude Quiz state
    quiz: {
      active: false,
      questions: [],
      currentIndex: 0,
      score: 0,
      answered: false
    },

    // Session message transcript
    messages: [],

    // Update methods
    setMajor(major) {
      this.profile.major = major;
      this.updateContextUI();
    },

    setSubject(subject) {
      this.workflow.slots.subject = subject;
      this.updateContextUI();
    },

    setExamDate(examDate) {
      this.workflow.slots.examDate = examDate;
      this.updateContextUI();
    },

    setWorkflow(flowName, initialStep = 1) {
      this.workflow.active = flowName;
      this.workflow.step = initialStep;
      this.updateContextUI();
    },

    clearWorkflow() {
      this.workflow.active = null;
      this.workflow.step = 0;
      this.workflow.slots = {
        subject: null,
        examDate: null,
        dailyHours: null,
        studyTime: this.profile.studyPreference || 'Morning'
      };
      this.updateContextUI();
    },

    updateContextUI() {
      const elMajor = document.getElementById('ctxMajor');
      const elSubject = document.getElementById('ctxSubject');
      const elExam = document.getElementById('ctxExam');
      const elFlow = document.getElementById('ctxFlow');
      const elScore = document.getElementById('ctxQuizScore');

      if (elMajor) elMajor.textContent = this.profile.major || 'Not specified';
      if (elSubject) elSubject.textContent = this.workflow.slots.subject || 'None selected';
      if (elExam) elExam.textContent = this.workflow.slots.examDate || 'Not set';
      if (elFlow) elFlow.textContent = this.workflow.active ? `${this.workflow.active} (In Progress)` : 'Idle (Ready)';
      if (elScore) elScore.textContent = `${this.quiz.score} / ${this.quiz.questions.length || 0}`;
    }
  };

  /* ==========================================================================
     3. NLP: INTENT CLASSIFICATION & ENTITY EXTRACTION
     ========================================================================== */

  const NLP = {
    // Normalization helper
    normalize(text) {
      return (text || '').toLowerCase().trim();
    },

    // Extract Recognized Subject Name
    extractSubject(text) {
      const clean = this.normalize(text);

      // Specific subject dictionary matching to keep user's exact subject nuance
      const specificMatches = [
        { name: 'Statistics', keys: ['statistics', 'stats'] },
        { name: 'Calculus', keys: ['calculus', 'derivatives', 'integrals'] },
        { name: 'Probability', keys: ['probability', 'bayes theorem'] },
        { name: 'Linear Algebra', keys: ['linear algebra', 'matrices', 'eigenvalues'] },
        { name: 'Data Structures & Algorithms', keys: ['data structures', 'dsa', 'data structure', 'algorithms', 'algo'] },
        { name: 'Database Management Systems (DBMS)', keys: ['dbms', 'database', 'databases', 'sql', 'rdbms'] },
        { name: 'Operating Systems', keys: ['operating systems', 'operating system', 'os'] },
        { name: 'Computer Networks', keys: ['computer networks', 'networking', 'networks', 'cn'] },
        { name: 'Python Programming', keys: ['python', 'py'] },
        { name: 'Java Programming', keys: ['java', 'core java'] },
        { name: 'C / C++ Programming', keys: ['c++', 'cpp', 'c programming'] },
        { name: 'Web Development', keys: ['web dev', 'web development', 'frontend', 'backend', 'full stack'] },
        { name: 'Machine Learning & AI', keys: ['machine learning', 'ml', 'artificial intelligence', 'ai', 'data science'] }
      ];

      for (const item of specificMatches) {
        for (const k of item.keys) {
          const regex = new RegExp(`(^|\\b)${k.replace('+', '\\+')}(\\b|$)`, 'i');
          if (regex.test(clean)) {
            return item.name;
          }
        }
      }

      // Check general regex pattern: "subject is X", "for X", "preparing for X"
      const prepMatch = clean.match(/(?:for|in|subject|about)\s+([a-zA-Z\s]{3,25})/);
      if (prepMatch && prepMatch[1]) {
        const potential = prepMatch[1].trim();
        if (!['my exam', 'the exam', 'exam', 'test', 'finals', 'tomorrow'].includes(potential)) {
          return potential.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }

      // If user provided a short clean 1-3 word capitalized topic/subject directly
      if (text.length >= 3 && text.length <= 30 && !text.includes('?')) {
        const words = clean.split(/\s+/);
        if (words.length <= 4 && !['hi', 'hello', 'yes', 'no', 'ok', 'sure', 'thanks'].includes(words[0])) {
          return text.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
      }

      return null;
    },

    // Extract Exam Deadline / Target Timeline
    extractExamDate(text) {
      const clean = this.normalize(text);

      if (clean.includes('tomorrow')) return 'Tomorrow';
      if (clean.includes('today') || clean.includes('tonight')) return 'Today / Tonight';
      if (clean.includes('day after tomorrow')) return 'In 2 days';
      if (clean.includes('next week')) return 'Next week (7 days)';
      if (clean.includes('in a week') || clean.includes('1 week')) return 'In 1 week';
      if (clean.includes('2 weeks') || clean.includes('two weeks')) return 'In 2 weeks';
      if (clean.includes('1 month') || clean.includes('one month')) return 'In 1 month';

      // Pattern: in X days
      const daysMatch = clean.match(/in\s+(\d+)\s+days?/);
      if (daysMatch) return `In ${daysMatch[1]} days`;

      // Pattern: X days left / remaining
      const daysLeftMatch = clean.match(/(\d+)\s+days?\s+(?:left|remaining)/);
      if (daysLeftMatch) return `In ${daysLeftMatch[1]} days`;

      // Pattern: 3 days, 2 days directly
      const directDaysMatch = clean.match(/^(\d+)\s+days?$/);
      if (directDaysMatch) return `In ${directDaysMatch[1]} days`;

      return null;
    },

    // Extract Available Study Hours
    extractStudyHours(text) {
      const clean = this.normalize(text);

      // Pattern: 4 hours, 3 hrs, 5h, 6 hours today
      const match = clean.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h\b)/i);
      if (match) {
        const hrs = parseFloat(match[1]);
        if (hrs > 0 && hrs <= 18) return hrs;
      }

      // Just a standalone number (e.g. "6", "4")
      const numMatch = clean.match(/\b([1-9]|1[0-6])\b/);
      if (numMatch) {
        return parseInt(numMatch[1], 10);
      }

      return null;
    },

    // Extract Peak Study Time
    extractStudyTimePreference(text) {
      const clean = this.normalize(text);
      if (clean.includes('morning') || clean.includes('early bird') || clean.includes('dawn')) return 'Morning';
      if (clean.includes('night') || clean.includes('night owl') || clean.includes('late')) return 'Late Night';
      if (clean.includes('afternoon') || clean.includes('day')) return 'Afternoon';
      if (clean.includes('evening')) return 'Evening';
      return null;
    },

    // Extract College Major / Degree
    extractMajor(text) {
      const clean = this.normalize(text);
      const majors = [
        { name: 'Computer Science', keys: ['computer science', 'cs', 'cse', 'software engineering'] },
        { name: 'Information Technology', keys: ['information technology', 'it'] },
        { name: 'Data Science & AI', keys: ['data science', 'artificial intelligence', 'ai & ds'] },
        { name: 'Electronics Engineering', keys: ['electronics', 'ece', 'electrical'] },
        { name: 'Mechanical Engineering', keys: ['mechanical', 'mech'] },
        { name: 'Civil Engineering', keys: ['civil engineering', 'civil'] },
        { name: 'BCA / MCA', keys: ['bca', 'mca'] },
        { name: 'Management / BBA / MBA', keys: ['bba', 'mba', 'business', 'management'] }
      ];

      for (const m of majors) {
        for (const k of m.keys) {
          const regex = new RegExp(`\\b${k}\\b`, 'i');
          if (regex.test(clean)) return m.name;
        }
      }
      return null;
    },

    // Extract Career Role
    extractCareerRole(text) {
      const clean = this.normalize(text);
      if (clean.includes('sde') || clean.includes('software engineer') || clean.includes('software developer')) return 'Software Development Engineer (SDE)';
      if (clean.includes('frontend') || clean.includes('front-end')) return 'Frontend Developer';
      if (clean.includes('backend') || clean.includes('back-end')) return 'Backend Developer';
      if (clean.includes('full stack') || clean.includes('fullstack')) return 'Full Stack Developer';
      if (clean.includes('data scientist') || clean.includes('data science') || clean.includes('machine learning engineer')) return 'Data Scientist / AI Engineer';
      if (clean.includes('devops') || clean.includes('cloud')) return 'Cloud & DevOps Engineer';
      if (clean.includes('cyber') || clean.includes('security') || clean.includes('ethical hacker')) return 'Cybersecurity Analyst';
      return null;
    },

    // Intent Recognition Classifier
    classifyIntent(rawText) {
      const text = this.normalize(rawText);

      // Check greetings
      if (/^(hi|hello|hey|hola|greetings|good\s+(morning|afternoon|evening)|yo)\b/i.test(text)) {
        return 'GREETING';
      }

      // Check restart / clear
      if (/\b(restart|reset|clear|start\s*over|reboot)\b/i.test(text)) {
        return 'RESTART_FLOW';
      }

      // Check goodbye
      if (/\b(bye|goodbye|see you|exit|quit|cya)\b/i.test(text)) {
        return 'GOODBYE';
      }

      // Check appreciation
      if (/\b(thank you|thanks|awesome|great job|helpful|appreciated|kudos)\b/i.test(text)) {
        return 'THANKS';
      }

      // Check student self-introduction / stating major
      if (/\b(i am studying|i'm studying|i study|my major is|i am a student of|student of)\b/i.test(text)) {
        return 'STUDENT_INTRO';
      }

      // Check aptitude quiz
      if (/\b(aptitude|quiz|mcq|practice questions|test me|solve quiz|question bank)\b/i.test(text)) {
        return 'APTITUDE_PRACTICE';
      }

      // Check study plan
      if (/\b(study\s*plan|schedule|timetable|routine|daily\s*schedule|study\s*routine|study\s*calendar|create a plan)\b/i.test(text)) {
        return 'STUDY_PLAN';
      }

      // Check exam prep / revision
      if (/\b(exam\s*(prep|preparation)|revision\s*plan|how to revise|prepare for exam|prepare for my exam|help me prepare|test tomorrow|finals)\b/i.test(text)) {
        return 'EXAM_PREP';
      }

      // Check project guidance
      if (/\b(project|projects|capstone|final year project|project ideas|build something|project guidance)\b/i.test(text)) {
        return 'PROJECT_GUIDE';
      }

      // Check assignment help
      if (/\b(assignment|homework|lab report|assignment help|solve assignment)\b/i.test(text)) {
        return 'ASSIGNMENT_HELP';
      }

      // Check career & internship guidance
      if (/\b(internship|internships|cold email|off-campus|hire|job application)\b/i.test(text)) {
        return 'INTERNSHIP_GUIDE';
      }
      if (/\b(career|roadmap|how to become|job roadmap|tech stack to learn|placement preparation)\b/i.test(text)) {
        return 'CAREER_GUIDANCE';
      }

      // Check time management
      if (/\b(time management|pomodoro|procrastinat|focus|distraction|manage time|efficiency)\b/i.test(text)) {
        return 'TIME_MANAGEMENT';
      }

      // Check resource recommendation
      if (/\b(resources|books|websites|youtube channels|cheat sheet|free courses|where to learn)\b/i.test(text)) {
        return 'RESOURCE_RECOMMEND';
      }

      // Check concept explanation
      if (/\b(explain|what is|how does|define|concept of|tell me about|difference between|vs)\b/i.test(text)) {
        return 'TOPIC_EXPLAIN';
      }

      // Check capability / help
      if (/\b(help|what can you do|commands|features|menu|capabilities|who are you)\b/i.test(text)) {
        return 'HELP_CAPABILITIES';
      }

      return 'UNKNOWN';
    }
  };

  /* ==========================================================================
     4. CUSTOM ACTION ENGINES
     ========================================================================== */

  const Actions = {
    /**
     * Action: Generate Custom Study Schedule (Day-by-Day or Hourly)
     */
    generateStudySchedule(slots, profile) {
      const subject = slots.subject || 'Academic Studies';
      const examTime = slots.examDate || 'in 3 days';
      const hours = slots.dailyHours || 4;
      const peakTime = slots.studyTime || profile.studyPreference || 'Morning';

      const deepWorkHours = (hours * 0.7).toFixed(1);
      const activeRecallHours = (hours * 0.3).toFixed(1);

      let scheduleRowsHtml = '';

      if (peakTime === 'Morning') {
        scheduleRowsHtml = `
          <div class="schedule-row">
            <span class="schedule-time">08:00 - 09:30</span>
            <span class="schedule-activity"><strong>High-Cognitive Concept Deep Dive:</strong> Core theoretical foundations and proofs for ${escapeHtml(subject)}.</span>
            <span class="schedule-tag deep">Deep Focus</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">09:30 - 09:45</span>
            <span class="schedule-activity">Hydration & Brain Recovery Break (No screens, stretch).</span>
            <span class="schedule-tag break">Rest</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">09:45 - 11:15</span>
            <span class="schedule-activity"><strong>Active Problem Solving:</strong> High-yield past exam numericals & problem sets.</span>
            <span class="schedule-tag active">Practice</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">16:00 - 17:00</span>
            <span class="schedule-activity"><strong>Feynman Technique & Flashcards:</strong> Self-testing concepts without looking at notes.</span>
            <span class="schedule-tag review">Recall</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">21:00 - 21:30</span>
            <span class="schedule-activity"><strong>Rapid Formula Sheet & Day Consolidation:</strong> 30-minute review before sleep.</span>
            <span class="schedule-tag review">Summary</span>
          </div>
        `;
      } else {
        // Late Night / Evening
        scheduleRowsHtml = `
          <div class="schedule-row">
            <span class="schedule-time">17:00 - 18:30</span>
            <span class="schedule-activity"><strong>Foundational Revision:</strong> High-level concept breakdown for ${escapeHtml(subject)}.</span>
            <span class="schedule-tag active">Review</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">20:00 - 21:45</span>
            <span class="schedule-activity"><strong>Deep Problem Solving:</strong> Complex derivations, formulas, and code implementations.</span>
            <span class="schedule-tag deep">Deep Focus</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">21:45 - 22:00</span>
            <span class="schedule-activity">Decompression & Herbal Tea Break (Rest eyes).</span>
            <span class="schedule-tag break">Rest</span>
          </div>
          <div class="schedule-row">
            <span class="schedule-time">22:00 - 23:30</span>
            <span class="schedule-activity"><strong>Timed Mock Questions:</strong> Simulating exam pressure conditions.</span>
            <span class="schedule-tag active">Exam Mode</span>
          </div>
        `;
      }

      return `
### 📅 Personalized Study Blueprint: ${escapeHtml(subject)}
*Tailored for **${escapeHtml(profile.major)}** • Target Exam: **${escapeHtml(examTime)}** • Dedication: **${hours} hrs/day***

> **Allocation Strategy:** **${deepWorkHours} hours** allocated to high-yield deep work + **${activeRecallHours} hours** reserved for active recall & error analysis.

<div class="schedule-table-card">
  <div class="schedule-header">
    <span>${peakTime} Focused Master Schedule</span>
    <span>Target: ${escapeHtml(examTime)}</span>
  </div>
  <div class="schedule-grid">
    ${scheduleRowsHtml}
  </div>
</div>

#### ⚡ 3 Ground Rules for Maximum Retention:
1. **The 80/20 Pareto Rule:** Focus 80% of your time on the top 20% recurring exam topics (derivation proofs, standard problems, and multi-step questions).
2. **Close-the-Book Recall:** After studying a chapter for 45 minutes, spend 5 minutes writing down everything you remember on a blank sheet from memory.
3. **Zero Multitasking:** Keep your phone in another room or turn on Focus Mode during study blocks.

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create 3-phase revision plan for ${escapeHtml(subject)}">🎯 3-Phase Revision Plan</button>
  <button class="msg-action-btn" data-prompt="Explain top exam topics for ${escapeHtml(subject)}">📚 Key Exam Topics</button>
  <button class="msg-action-btn" data-prompt="Start an aptitude practice quiz">🧠 Test My Aptitude</button>
</div>
      `;
    },

    /**
     * Action: Create 3-Phase Revision Plan
     */
    createRevisionPlan(slots, profile) {
      const subject = slots.subject || 'Your Target Subject';
      const examTime = slots.examDate || 'in 1 week';

      return `
### 🎯 3-Phase Master Revision Strategy: ${escapeHtml(subject)}
*Engineered to eliminate cognitive fatigue and guarantee high exam performance for **${escapeHtml(profile.major)}**.*

---

#### 🟢 Phase 1: High-Yield Concept Synthesis (Day 1 - 2)
- **Objective:** Master foundational 70% syllabus without getting bogged down in low-yield minutiae.
- **Action Items:**
  - Create a **one-page cheat sheet** per module containing all formulas, definitions, and theorems.
  - Convert syllabus headings into active questions (e.g. instead of reading *"TCP vs UDP"*, answer *"Why does video streaming prefer UDP over TCP?"*).
  - Eliminate all conceptual blindspots before attempting full-length papers.

#### 🟡 Phase 2: Exam Simulation & Past Papers (Day 3 - 4)
- **Objective:** Condition your mind to exam timing and solve unscripted problem variants.
- **Action Items:**
  - Solve at least **3 previous year question papers (PYQs)** under strict exam hall conditions (no notes, timer running).
  - Maintain an **"Error Log"**: Write down why you missed a point (conceptual gap, calculation error, or misread prompt).
  - Practice structured writing: High marks require crisp bullet points, clean diagrams, and labeled axes.

#### 🔴 Phase 3: The 24-Hour Final Polish & Mental Primer
- **Objective:** Calm the nervous system and anchor short-term memory.
- **Action Items:**
  - Stop learning new topics 18 hours before the exam.
  - Rapidly review your one-page formula sheet 3 times throughout the day.
  - Sleep a minimum of **7.5 hours**: Sleep spindle consolidation is what converts short-term study into long-term retrieval during exam stress!

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Generate study schedule for ${escapeHtml(subject)}">📅 Generate Timetable</button>
  <button class="msg-action-btn" data-prompt="How can I manage time effectively during exams?">⏳ Exam Time Hacks</button>
</div>
      `;
    },

    /**
     * Action: Explain Complex Concept with Analogy, Mechanics, and Exam Tip
     */
    explainConcept(query) {
      const clean = NLP.normalize(query);

      // Search through knowledge base topics
      for (const [subKey, subObj] of Object.entries(KNOWLEDGE_BASE.subjects)) {
        for (const [topKey, topic] of Object.entries(subObj.topics)) {
          if (clean.includes(topKey) || topKey.split(' ').every(w => clean.includes(w))) {
            return `
### 💡 Concept Breakdown: ${topic.title}
*Subject: **${subObj.name}***

#### 📌 The Real-World Analogy:
> "${topic.analogy}"

#### 🔍 Core Mechanism & How It Works:
${topic.concept}

#### ⚡ Key Syntax, Recurrence, or Formula:
\`\`\`
${topic.formula}
\`\`\`

#### 🎯 Pro Exam Tip & Interview Trap:
> **${topic.examTip}**

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Give me another topic in ${subObj.name}">📚 More in ${subObj.name}</button>
  <button class="msg-action-btn" data-prompt="Create a study plan for ${subObj.name}">📅 Study Plan for this</button>
  <button class="msg-action-btn" data-prompt="Start an aptitude practice quiz">🧠 Take Quiz</button>
</div>
            `;
          }
        }
      }

      // Dynamic fallback for any general concept
      const subject = NLP.extractSubject(query) || 'Computer Science';
      return `
### 💡 Conceptual Analysis: "${escapeHtml(query)}"
*Analyzed under **${escapeHtml(subject)}** curriculum principles.*

#### 📌 1. Intuitive Mental Model:
Think of this concept as a system designed to solve a trade-off: **Speed vs Storage**, or **Flexibility vs Control**. When engineers or researchers designed this, they needed a reproducible way to handle operations reliably under constraints.

#### 🔍 2. Step-by-Step Architecture:
1. **Input Phase:** The process ingests defined parameters or state data.
2. **Transformation Engine:** Applies invariant rules (mathematical properties, state machines, or algorithmic passes).
3. **Output & Edge Cases:** Produces a deterministic state. Special attention must be paid to null values, boundary conditions, and resource limits.

#### 🎯 3. How to Answer This in College Exams for Full Marks:
- **Start with a 1-sentence formal definition:** Avoid informal phrasing in the opening paragraph.
- **Draw a clear architectural diagram:** College professors award up to 40% of question marks for well-labeled schematics.
- **State Time and Space Complexity:** (e.g. Best, Average, Worst case).
- **Provide one practical real-world use case:** (e.g. *"Used in database query optimizers"* or *"Used in network packet buffers"*).

*Would you like a specialized study schedule or past question list for this topic?*
<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create study plan for ${escapeHtml(subject)}">📅 Create Study Plan</button>
  <button class="msg-action-btn" data-prompt="Suggest college project ideas">💡 Related Project Ideas</button>
</div>
      `;
    },

    /**
     * Action: Start Aptitude Quiz
     */
    startQuiz() {
      // Pick questions from bank (shuffle copy)
      const questions = [...KNOWLEDGE_BASE.aptitudeBank].sort(() => 0.5 - Math.random()).slice(0, 5);
      ConversationContext.quiz = {
        active: true,
        questions: questions,
        currentIndex: 0,
        score: 0,
        answered: false
      };
      ConversationContext.setWorkflow('APTITUDE_QUIZ');

      return this.renderQuizQuestion(0);
    },

    /**
     * Render a single quiz question card
     */
    renderQuizQuestion(index) {
      const q = ConversationContext.quiz.questions[index];
      const qNum = index + 1;
      const total = ConversationContext.quiz.questions.length;

      let optionsHtml = '';
      const labels = ['A', 'B', 'C', 'D'];

      q.options.forEach((opt, idx) => {
        optionsHtml += `
          <button class="quiz-opt-btn" data-index="${idx}">
            <span class="opt-key">${labels[idx]}</span>
            <span class="opt-text">${escapeHtml(opt)}</span>
          </button>
        `;
      });

      return `
### 🧠 Question ${qNum} of ${total}: ${q.category}

<div class="quiz-card" id="activeQuizCard" data-qidx="${index}">
  <div class="quiz-meta">
    <span>Category: ${q.category}</span>
    <span>Score: ${ConversationContext.quiz.score} / ${total}</span>
  </div>
  <div class="quiz-question">${escapeHtml(q.question)}</div>
  <div class="quiz-options">
    ${optionsHtml}
  </div>
</div>

*Click your answer above, or type the letter (A, B, C, or D) below.*
      `;
    },

    /**
     * Action: Check Quiz Answer
     */
    checkQuizAnswer(selectedIdx) {
      const q = ConversationContext.quiz.questions[ConversationContext.quiz.currentIndex];
      const isCorrect = selectedIdx === q.correctIndex;

      if (isCorrect) {
        ConversationContext.quiz.score += 1;
      }
      ConversationContext.quiz.answered = true;
      ConversationContext.updateContextUI();

      const labels = ['A', 'B', 'C', 'D'];
      const correctLetter = labels[q.correctIndex];
      const chosenLetter = labels[selectedIdx];

      const feedback = `
${isCorrect ? '✅ **Correct! Excellent work.**' : `❌ **Incorrect.** You selected (${chosenLetter}), but the correct answer is **(${correctLetter})**.`}

**Detailed Solution:**
${q.explanation}

💡 **Speed Shortcut / Pro-Trick:**
> *${q.trick}*
      `;

      return {
        isCorrect,
        correctIndex: q.correctIndex,
        feedbackText: feedback,
        isLast: ConversationContext.quiz.currentIndex >= ConversationContext.quiz.questions.length - 1
      };
    },

    /**
     * Action: Finish Quiz and Build Scorecard
     */
    finishQuiz() {
      const score = ConversationContext.quiz.score;
      const total = ConversationContext.quiz.questions.length;
      const percentage = Math.round((score / total) * 100);

      ConversationContext.quiz.active = false;
      ConversationContext.clearWorkflow();

      let performanceTitle = '';
      let advice = '';

      if (percentage >= 80) {
        performanceTitle = '🏆 Outstanding Mastery (Tier 1 Ready)';
        advice = 'Your analytical and speed intuition is sharp! Keep taking timed mock tests to maintain peak calculation speed during campus placements.';
      } else if (percentage >= 60) {
        performanceTitle = '👍 Solid Competence (Good Foundation)';
        advice = 'Good foundational grasp! Focus on shortcut formulas for Time & Work, Speed & Distance, and Big-O recurrence relations to cut your per-question time down to under 60 seconds.';
      } else {
        performanceTitle = '📈 Diagnostic Growth Phase';
        advice = 'Do not worry! Aptitude is purely a pattern recognition skill. Practice 10 questions daily from standard aptitude guides and learn the LCM/ratio shortcuts.';
      }

      return `
### 🎓 Aptitude Quiz Scorecard
*Diagnostic Assessment Complete*

- **Total Score:** **${score} / ${total}** (${percentage}%)
- **Performance Rating:** ${performanceTitle}

> **Performance Analysis:** ${advice}

#### Recommended Next Steps:
1. Practice quantitative problems daily for 20 minutes using the Pomodoro timer on the left.
2. Review your error log and identify whether errors were caused by calculation speed or conceptual misinterpretation.

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Start another aptitude quiz">🧠 Retake New Quiz</button>
  <button class="msg-action-btn" data-prompt="Create study plan for campus placement">📅 Placement Prep Plan</button>
  <button class="msg-action-btn" data-prompt="Career and internship roadmap">💼 Career Roadmap</button>
</div>
      `;
    },

    /**
     * Action: Provide Tailored Project & Capstone Ideas
     */
    provideProjectSuggestions(domain, level) {
      const projects = KNOWLEDGE_BASE.projectCatalog;
      let projectCardsHtml = '';

      projects.forEach(proj => {
        const diffClass = proj.level.toLowerCase();
        const tagsHtml = proj.techStack.map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('');
        const bulletsHtml = proj.resumeBullets.map(b => `<li>${escapeHtml(b)}</li>`).join('');

        projectCardsHtml += `
          <div class="project-card">
            <div class="project-card-header">
              <span class="project-title">${escapeHtml(proj.title)}</span>
              <span class="project-difficulty ${diffClass}">${escapeHtml(proj.level)}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.4rem;">${escapeHtml(proj.summary)}</p>
            <div class="project-tags">${tagsHtml}</div>
            <div style="margin-top: 0.6rem; font-size: 0.82rem;">
              <strong>Key Resume Impact Points:</strong>
              <ul style="margin: 0.3rem 0 0.4rem 1.2rem; color: var(--text-secondary);">
                ${bulletsHtml}
              </ul>
            </div>
          </div>
        `;
      });

      return `
### 💡 High-Impact College Project Proposals
*Curated for **${escapeHtml(ConversationContext.profile.major)}** students to maximize resume strength and recruiter interest.*

${projectCardsHtml}

#### 🚀 3 Keys to Turn These into Interview Winners:
1. **Host Live Demos:** Recruiters spend under 30 seconds on GitHub repos. A live Vercel / Render link gets 5x more clicks than raw source code.
2. **Write a Professional README:** Include an architecture diagram, tech stack badges, environment setup instructions, and GIF screencasts.
3. **Quantify Metrics:** State numbers on your resume (e.g. *"Processed 1,000 records in 250ms"*, *"Reduced API load by 35%"*).

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Explain how to prepare for technical interview">💼 Technical Interview Prep</button>
  <button class="msg-action-btn" data-prompt="How to get a software engineering internship?">💼 SDE Internship Guide</button>
</div>
      `;
    },

    /**
     * Action: Time Management Strategy & Protocols
     */
    generateTimeManagementAdvice() {
      return `
### ⏳ High-Performance Academic Time Management
*Science-backed strategies to eliminate procrastination and handle heavy semester workloads.*

---

#### 1. The 50/10 Ultradian Rhythm Protocol
- **The Science:** Human cognitive focus naturally dips after 50 to 90 minutes.
- **Implementation:** Use the **Study Focus Timer** on the left sidebar:
  - 50 minutes of single-task immersion (Wi-Fi off if reading notes, phone in Do Not Disturb).
  - 10 minutes of complete biological rest (walk around, hydrate, look at distant objects).

#### 2. The Eisenhower Priority Matrix for College
- **Quadrant 1 (Urgent & Important):** Exams in 48 hours, today's assignment submission. *Do immediately.*
- **Quadrant 2 (Not Urgent, but Highly Important):** DSA practice, personal capstone projects, internship networking. **Schedule non-negotiable blocks for this!** *This is where high-achieving students excel.*
- **Quadrant 3 (Urgent, Not Important):** Casual group chat notifications, spontaneous errands. *Batch or delegate.*
- **Quadrant 4 (Neither):** Endless scrolling, re-watching lectures without taking notes. *Ruthlessly eliminate.*

#### 3. Overcoming Procrastination: The "2-Minute Activation Rule"
When feeling paralyzed by a massive 20-page lab report or huge syllabus, commit to studying for **just two minutes**. Open the document and write 2 sentences. 80% of mental resistance vanishes once the activation energy barrier is crossed!

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create a study plan for my exam">📅 Generate My Study Schedule</button>
  <button class="msg-action-btn" data-prompt="Start focus session with timer">⏱️ Start Focus Timer</button>
</div>
      `;
    },

    /**
     * Action: Career & Internship Guidance Roadmap
     */
    generateCareerRoadmap(roleName) {
      const role = roleName || 'Software Development Engineer (SDE)';

      return `
### 💼 Campus-to-Career Strategic Blueprint: ${escapeHtml(role)}
*Designed for college students targeting competitive off-campus and on-campus offers.*

---

#### 📌 Semester-by-Semester Milestones
- **Semester 3 - 4 (Foundation):**
  - Master one object-oriented language deeply (C++, Java, or Python).
  - Complete 100+ fundamental LeetCode / HackerRank problems covering Arrays, Strings, HashMaps, and Recursion.
  - Learn Git version control and push every lab exercise to a neat GitHub profile.

- **Semester 5 - 6 (Portfolio & Internship Prep):**
  - Build 2 full-stack or domain-specific capstone projects solving authentic problems.
  - Master Trees, Graphs, and Dynamic Programming.
  - Create a 1-page single-column ATS-friendly resume using standard LaTeX templates (e.g. Jake's Resume).

- **Semester 7 - 8 (Placement Drive & Negotiation):**
  - Conduct weekly mock interviews on Pramp or with peers.
  - System Design fundamentals (APIs, Caching, Load Balancers, Database Sharding).

#### 📩 High-Response Cold Email Template for Recruiters & Alumni
\`\`\`text
Subject: CS Sophomore from [Your College] — Inquiry regarding [Target Team] Internship

Hi [Recipient Name],

I hope you are having a productive week.

I have been closely following [Company Name]'s recent work in [mention specific product or tech initiative], and I was really impressed by [specific detail].

I am currently a pre-final year Computer Science student at [Your College] with a strong foundation in [DSA / Full-Stack / Cloud]. Recently, I built [Brief Project Name], which achieved [1 quantifiable feature, e.g., real-time WebSocket sync with 50ms latency].

I noticed [Company Name] is accepting applications for summer engineering interns. I would love the opportunity to contribute to your team.

My resume is attached, and my portfolio is accessible at: [Your GitHub / Portfolio Link].

Thank you for your time and consideration!

Best regards,
[Your Name] | [LinkedIn Link] | [Phone Number]
\`\`\`

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Suggest college project ideas">💡 Projects to Boost Resume</button>
  <button class="msg-action-btn" data-prompt="Start an aptitude practice quiz">🧠 Practice Aptitude for Placements</button>
</div>
      `;
    },

    /**
     * Action: Assignment & Homework Strategy
     */
    generateAssignmentGuidance() {
      return `
### 📝 Academic Assignment & Lab Report Excellence Guide
*How to submit top-scoring college assignments with zero academic integrity risks.*

1. **Deconstruct the Rubric First:**
   - Review grading criteria: Does the professor weight code comments, test coverage, or theoretical analysis highest?
   - Address every sub-question explicitly with bold section headers matching the assignment prompt.

2. **The 4-Part Structure for Engineering / Tech Reports:**
   - **Introduction & Problem Formulation:** Define assumptions and constraints.
   - **Methodology & Architecture:** Include flowcharts or block diagrams.
   - **Results & Edge Case Analysis:** Show screenshots or tabular data demonstrating both typical and edge-case inputs.
   - **Discussion & Limitations:** Reflect on computational complexity and how the solution could scale.

3. **Academic Integrity & Proper Attribution:**
   - Never copy verbatim. Synthesize definitions into your own words.
   - If using open-source libraries or foundational papers, provide clean IEEE or APA citations.

*Need guidance on a specific subject assignment? Tell me the subject name (e.g. "Assignment in DBMS" or "DSA lab help").*
      `;
    },

    /**
     * Action: Curated Free Study Resources
     */
    recommendResources(subject) {
      const catalogs = KNOWLEDGE_BASE.resources;
      let html = '';

      catalogs.forEach(cat => {
        html += `#### 📚 ${cat.category}\n`;
        cat.links.forEach(l => {
          html += `- **${escapeHtml(l.name)}:** ${escapeHtml(l.desc)}\n`;
        });
        html += '\n';
      });

      return `
### 🔗 Curated High-Yield Free Study Resources
*Verified open-access resources trusted by top engineering institutions.*

${html}

> Bookmark these resources and pair video lectures with active note-taking. Never passively watch tutorial videos without writing code in your own editor simultaneously!

<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create a study plan">📅 Build Study Plan</button>
  <button class="msg-action-btn" data-prompt="Start aptitude quiz">🧠 Test My Skills</button>
</div>
      `;
    }
  };

  /* ==========================================================================
     5. MULTI-TURN STATE MACHINE & DIALOGUE CONTROLLER
     ========================================================================== */

  const DialogueController = {
    /**
     * Main Entry Point for User Input
     */
    processUserMessage(userInput) {
      const text = (userInput || '').trim();
      if (!text) return null;

      // Check if user is answering an active quiz
      if (ConversationContext.quiz.active) {
        return this.handleQuizInput(text);
      }

      // Check if user is currently inside a slot-filling workflow
      if (ConversationContext.workflow.active) {
        return this.handleActiveWorkflow(text);
      }

      // Extract general entities to keep student profile context updated
      const detectedMajor = NLP.extractMajor(text);
      if (detectedMajor) {
        ConversationContext.setMajor(detectedMajor);
      }

      const detectedSubject = NLP.extractSubject(text);
      if (detectedSubject) {
        ConversationContext.setSubject(detectedSubject);
      }

      const detectedTime = NLP.extractStudyTimePreference(text);
      if (detectedTime) {
        ConversationContext.profile.studyPreference = detectedTime;
      }

      // Classify user intent
      const intent = NLP.classifyIntent(text);

      switch (intent) {
        case 'GREETING':
          return this.handleGreeting();

        case 'STUDENT_INTRO':
          return `Great! I've noted that you are studying **${escapeHtml(ConversationContext.profile.major)}**. How can I support your studies today? You can ask me to help prepare for an exam, generate a study schedule, or explain any subject concept!`;

        case 'STUDY_PLAN':
          return this.initiateStudyPlanFlow(text);

        case 'EXAM_PREP':
          return this.initiateExamPrepFlow(text);

        case 'APTITUDE_PRACTICE':
          return Actions.startQuiz();

        case 'TOPIC_EXPLAIN':
          return Actions.explainConcept(text);

        case 'PROJECT_GUIDE':
          return Actions.provideProjectSuggestions();

        case 'CAREER_GUIDANCE':
          const role = NLP.extractCareerRole(text);
          return Actions.generateCareerRoadmap(role);

        case 'INTERNSHIP_GUIDE':
          return Actions.generateCareerRoadmap('Software Development Engineer (SDE)');

        case 'TIME_MANAGEMENT':
          return Actions.generateTimeManagementAdvice();

        case 'ASSIGNMENT_HELP':
          return Actions.generateAssignmentGuidance();

        case 'RESOURCE_RECOMMEND':
          return Actions.recommendResources(detectedSubject);

        case 'RESTART_FLOW':
          ConversationContext.clearWorkflow();
          if (ConversationContext.quiz.active) ConversationContext.quiz.active = false;
          return `🔄 **Session Reset!** I have cleared our active workflow and reset the conversation memory. How can I help you today? You can ask to generate a study plan, explain any academic topic, or start an aptitude quiz.`;

        case 'GOODBYE':
          return `👋 Goodbye! Best of luck with your study sessions and college exams. Stay consistent, take structured breaks, and feel free to return whenever you need academic assistance!`;

        case 'THANKS':
          return `You're very welcome! 😊 I'm always here to support your college journey. Let me know if you want to quiz yourself on aptitude, map out an exam schedule, or dissect another concept!`;

        case 'HELP_CAPABILITIES':
          return this.handleHelpMenu();

        case 'UNKNOWN':
        default:
          // If the message contains a detected major
          if (detectedMajor) {
            return `Great! I've noted that you are studying **${escapeHtml(detectedMajor)}**. How can I help you today? Feel free to ask for a study plan, exam preparation guidance, or project ideas!`;
          }
          return this.handleFallback(text);
      }
    },

    /**
     * Handle Greeting with contextual student major
     */
    handleGreeting() {
      const major = ConversationContext.profile.major || 'College';
      return `
Hello! 👋 I am **AcademiaAI**, your intelligent academic support assistant.

I am customized to assist **${escapeHtml(major)}** students with:
- 📅 **Personalized Study Schedules:** Day-by-day timetables with active recall breaks.
- 🎯 **3-Phase Exam Revision Plans:** High-yield strategies to ace finals and midterms.
- 📚 **Concept Breakdown:** Plain-English analogies, formulas, and common exam traps.
- 🧠 **Interactive Aptitude Practice:** Quantitative, logical, and technical placement quizzes with instant scoring.
- 💡 **Capstone & Project Ideas:** Complete specifications with tech stacks and resume bullet points.
- ⏳ **Time Management & Focus:** Pomodoro workflows and procrastination-busting techniques.

What would you like to work on right now?
<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create a study plan">📅 Create Study Plan</button>
  <button class="msg-action-btn" data-prompt="Start an aptitude practice quiz">🧠 Start Aptitude Quiz</button>
  <button class="msg-action-btn" data-prompt="Explain Dynamic Programming">📚 Explain a Concept</button>
</div>
      `;
    },

    /**
     * Flow 1: Study Plan Slot Filling
     */
    initiateStudyPlanFlow(initialText) {
      ConversationContext.setWorkflow('STUDY_PLAN', 1);

      // Pre-extract what we can from the initial message
      const subject = NLP.extractSubject(initialText);
      const examDate = NLP.extractExamDate(initialText);
      const hours = NLP.extractStudyHours(initialText);
      const pref = NLP.extractStudyTimePreference(initialText);

      if (subject) ConversationContext.setSubject(subject);
      if (examDate) ConversationContext.setExamDate(examDate);
      if (hours) ConversationContext.workflow.slots.dailyHours = hours;
      if (pref) ConversationContext.workflow.slots.studyTime = pref;

      return this.continueStudyPlanFlow();
    },

    continueStudyPlanFlow() {
      const slots = ConversationContext.workflow.slots;

      // Slot 1: Subject
      if (!slots.subject) {
        ConversationContext.workflow.step = 1;
        return `Sure! Which subject are you preparing for?`;
      }

      // Slot 2: Exam Timeline
      if (!slots.examDate) {
        ConversationContext.workflow.step = 2;
        return `When is your exam?`;
      }

      // Slot 3: Daily Study Hours
      if (!slots.dailyHours) {
        ConversationContext.workflow.step = 3;
        return `How many hours can you study today?`;
      }

      // All slots collected! Generate customized schedule
      const majorIntro = ConversationContext.profile.major ? `Since you are studying ${ConversationContext.profile.major}, ` : '';
      const plan = Actions.generateStudySchedule(slots, ConversationContext.profile);
      ConversationContext.clearWorkflow();
      return `${majorIntro}let's prepare your personalized **${escapeHtml(slots.subject)}** study plan:\n\n${plan}`;
    },

    /**
     * Flow 2: Exam Prep & Revision Flow
     */
    initiateExamPrepFlow(initialText) {
      ConversationContext.setWorkflow('EXAM_PREP', 1);

      const subject = NLP.extractSubject(initialText);
      const examDate = NLP.extractExamDate(initialText);

      if (subject) ConversationContext.setSubject(subject);
      if (examDate) ConversationContext.setExamDate(examDate);

      const slots = ConversationContext.workflow.slots;
      if (!slots.subject) {
        return `Which subject are you preparing for?`;
      }

      const majorNote = ConversationContext.profile.major ? `Since you are studying ${escapeHtml(ConversationContext.profile.major)}, ` : '';
      const plan = Actions.createRevisionPlan(slots, ConversationContext.profile);
      ConversationContext.clearWorkflow();
      return `${majorNote}let's prepare a **${escapeHtml(slots.subject)}** revision plan:\n\n${plan}`;
    },

    /**
     * Handle multi-turn state inputs while inside an active workflow
     */
    handleActiveWorkflow(text) {
      const flow = ConversationContext.workflow.active;
      const step = ConversationContext.workflow.step;

      // Check if user wants to cancel or abort
      if (/\b(cancel|stop|abort|quit|nevermind)\b/i.test(text)) {
        ConversationContext.clearWorkflow();
        return `Workflow cancelled. You're back in general mode. What would you like to explore next?`;
      }

      if (flow === 'STUDY_PLAN') {
        if (step === 1) {
          const subject = NLP.extractSubject(text) || text.replace(/[.!]/g, '').trim();
          ConversationContext.setSubject(subject);
          return this.continueStudyPlanFlow();
        } else if (step === 2) {
          const examDate = NLP.extractExamDate(text) || text.replace(/[.!]/g, '').trim();
          ConversationContext.setExamDate(examDate);
          return this.continueStudyPlanFlow();
        } else if (step === 3) {
          const hours = NLP.extractStudyHours(text) || 4;
          const pref = NLP.extractStudyTimePreference(text);
          ConversationContext.workflow.slots.dailyHours = hours;
          if (pref) ConversationContext.workflow.slots.studyTime = pref;
          return this.continueStudyPlanFlow();
        }
      }

      if (flow === 'EXAM_PREP') {
        const subject = NLP.extractSubject(text) || text.replace(/[.!]/g, '').trim();
        ConversationContext.setSubject(subject);
        const majorNote = ConversationContext.profile.major ? `Since you are studying ${escapeHtml(ConversationContext.profile.major)}, ` : '';
        const plan = Actions.createRevisionPlan(ConversationContext.workflow.slots, ConversationContext.profile);
        ConversationContext.clearWorkflow();
        return `${majorNote}let's prepare a **${escapeHtml(subject)}** revision and study plan:\n\n${plan}`;
      }

      return this.handleFallback(text);
    },

    /**
     * Handle Aptitude Quiz Input (Button clicks or typed A/B/C/D)
     */
    handleQuizInput(text) {
      const clean = NLP.normalize(text);

      // Check for exit
      if (/\b(cancel|stop|abort|quit|exit)\b/i.test(clean)) {
        ConversationContext.quiz.active = false;
        ConversationContext.clearWorkflow();
        return `Quiz session exited. Your final score was **${ConversationContext.quiz.score}**. What would you like to practice or explore next?`;
      }

      // Check if user typed A, B, C, or D
      const letterMatch = clean.match(/^[a-d]$/);
      let selectedIndex = -1;

      if (letterMatch) {
        const letter = letterMatch[0];
        selectedIndex = ['a', 'b', 'c', 'd'].indexOf(letter);
      } else {
        // Try finding matching text among options
        const q = ConversationContext.quiz.questions[ConversationContext.quiz.currentIndex];
        selectedIndex = q.options.findIndex(opt => clean.includes(NLP.normalize(opt)));
      }

      if (selectedIndex === -1) {
        return `Please select one of the valid options (**A, B, C, or D**) by clicking an option button above or typing the letter.`;
      }

      return this.submitQuizAnswer(selectedIndex);
    },

    submitQuizAnswer(selectedIndex) {
      const result = Actions.checkQuizAnswer(selectedIndex);

      if (result.isLast) {
        const scorecard = Actions.finishQuiz();
        return `${result.feedbackText}\n\n---\n\n${scorecard}`;
      } else {
        ConversationContext.quiz.currentIndex += 1;
        const nextQHtml = Actions.renderQuizQuestion(ConversationContext.quiz.currentIndex);
        return `${result.feedbackText}\n\n---\n\n${nextQHtml}`;
      }
    },

    /**
     * Help & Capabilities Directory
     */
    handleHelpMenu() {
      return `
### 🛠️ AcademiaAI Capabilities & Commands Guide
*Everything you can ask your academic companion:*

1. **Study Planning:**
   - *"Create a study plan"* (Interactive 3-question scheduler)
   - *"Make a study schedule for Data Structures"*
2. **Concept Explanations:**
   - *"Explain Normalization in DBMS"*
   - *"What is the difference between TCP and UDP?"*
   - *"Explain Deadlocks with an analogy"*
3. **Exam Revision:**
   - *"Help me prepare for my exam"*
   - *"Give me a 3-phase revision plan for Operating Systems"*
4. **Placement Aptitude Practice:**
   - *"Start an aptitude quiz"*
   - *"Test me on quantitative and logical questions"*
5. **Project Guidance:**
   - *"Suggest college project ideas for Computer Science"*
   - *"Full-stack capstone projects for resume"*
6. **Time Management & Focus:**
   - *"How can I stop procrastinating during finals?"*
   - *"Teach me the 50/10 Pomodoro rule"*
7. **Career & Internships:**
   - *"SDE internship preparation roadmap"*
   - *"Cold email template for tech recruiters"*

Feel free to click any suggestion pill or type your question below!
      `;
    },

    /**
     * Graceful Fallback Handler for ambiguous or off-topic queries
     */
    handleFallback(rawText) {
      return `
I want to ensure you get the most accurate academic guidance! While I didn't recognize a specific syllabus module in: *"${escapeHtml(rawText)}"*, here is how I can best help:

- **Need a structured study timetable?** Type: \`Create a study plan\`
- **Need a difficult topic explained with analogies?** Type: \`Explain [concept name]\`
- **Preparing for placements or campus aptitude?** Type: \`Start aptitude quiz\`
- **Looking for resume-ready project topics?** Type: \`Suggest project ideas\`
- **Struggling with exam stress or time management?** Type: \`Time management advice\`

*(Tip: You can also reset our conversation at any time by saying "reset" or clicking the Restart button).*
<div class="msg-action-chips">
  <button class="msg-action-btn" data-prompt="Create a study plan">📅 Study Plan</button>
  <button class="msg-action-btn" data-prompt="Start aptitude quiz">🧠 Aptitude Quiz</button>
  <button class="msg-action-btn" data-prompt="Explain Recursion vs Iteration">📚 Explain a Concept</button>
</div>
      `;
    }
  };

  /* ==========================================================================
     6. UI CONTROLLER & EVENT LISTENERS
     ========================================================================== */

  // Safe HTML Escaping Helper
  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Lightweight Markdown-to-HTML parser for responses
  function parseMarkdown(markdownText) {
    if (!markdownText) return '';

    let html = markdownText;

    // Code blocks ```code```
    html = html.replace(/```([a-zA-Z0-9]*)\n([\s\S]*?)```/g, function (match, lang, code) {
      return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings (###, ##, #)
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');

    // Blockquotes > text
    html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Bold **text**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Unordered lists (- item or * item)
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists (1. item)
    html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');

    // Horizontal rules (---)
    html = html.replace(/^---$/gim, '<hr style="border:0;border-top:1px solid var(--border-color);margin:0.8rem 0;">');

    // Newlines to <br> if not inside tags
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs.map(p => {
      p = p.trim();
      if (!p) return '';
      if (/^<(h\d|ul|ol|pre|blockquote|div|hr)/i.test(p)) {
        return p;
      }
      return `<p>${p.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return html;
  }

  // DOM Elements
  const chatMessagesEl = document.getElementById('chatMessages');
  const chatFormEl = document.getElementById('chatForm');
  const userInputEl = document.getElementById('userInput');
  const typingIndicatorEl = document.getElementById('typingIndicator');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const clearChatBtn = document.getElementById('clearChatBtn');
  const restartFlowBtn = document.getElementById('restartFlowBtn');
  const headerRestartBtn = document.getElementById('headerRestartBtn');
  const exportChatBtn = document.getElementById('exportChatBtn');
  const sidebarEl = document.getElementById('sidebar');
  const sidebarOpenBtn = document.getElementById('sidebarOpenBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarOverlayEl = document.getElementById('sidebarOverlay');
  const toastContainerEl = document.getElementById('toastContainer');

  // Pomodoro DOM Elements
  const pomoDisplayEl = document.getElementById('pomoDisplay');
  const pomoStartBtn = document.getElementById('pomoStartBtn');
  const pomoResetBtn = document.getElementById('pomoResetBtn');
  const pomoModeBtn = document.getElementById('pomoModeBtn');
  const pomoModeBadgeEl = document.getElementById('pomoModeBadge');

  /**
   * Display Toast Alert
   */
  function showToast(message, duration = 3000) {
    if (!toastContainerEl) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>🔔</span><span>${escapeHtml(message)}</span>`;
    toastContainerEl.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /**
   * Render Single Message Bubble in Chat
   */
  function appendMessage(sender, text, isRawHtml = false) {
    if (!chatMessagesEl) return;

    const row = document.createElement('div');
    row.className = `message-row ${sender}`;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let avatarSvg = '';
    if (sender === 'bot') {
      avatarSvg = `
        <div class="msg-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a3 3 0 0 0-3 3v1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2V5a3 3 0 0 0-3-3z"/>
            <path d="M4 14v4a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4"/>
          </svg>
        </div>
      `;
    } else {
      avatarSvg = `
        <div class="msg-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
      `;
    }

    const contentHtml = isRawHtml ? text : parseMarkdown(text);

    row.innerHTML = `
      ${avatarSvg}
      <div class="msg-bubble-wrap">
        <div class="msg-bubble">${contentHtml}</div>
        <span class="msg-timestamp">${timestamp}</span>
      </div>
    `;

    chatMessagesEl.appendChild(row);
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;

    // Record in history
    ConversationContext.messages.push({ sender, text, timestamp });

    // Attach click listeners to any action buttons inside the message
    attachDynamicActionListeners(row);
  }

  /**
   * Attach Click Handlers to action chips inside bot messages
   */
  function attachDynamicActionListeners(container) {
    const actionBtns = container.querySelectorAll('.msg-action-btn');
    actionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        if (prompt) {
          sendUserQuery(prompt);
        }
      });
    });

    // Quiz Option Click Listeners
    const quizOptBtns = container.querySelectorAll('.quiz-opt-btn');
    quizOptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const optIndex = parseInt(btn.getAttribute('data-index'), 10);
        if (!isNaN(optIndex) && ConversationContext.quiz.active) {
          const q = ConversationContext.quiz.questions[ConversationContext.quiz.currentIndex];
          if (q) {
            quizOptBtns.forEach((b, idx) => {
              b.disabled = true;
              if (idx === q.correctIndex) {
                b.classList.add('correct');
              } else if (idx === optIndex) {
                b.classList.add('incorrect');
              }
            });
          }

          // Submit answer to state machine
          const botResponse = DialogueController.submitQuizAnswer(optIndex);
          triggerBotResponse(botResponse);
        }
      });
    });
  }

  /**
   * User Query Dispatcher with Animated Typing Indicator
   */
  function sendUserQuery(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // Render User Message
    appendMessage('user', cleanText);

    // Show Typing Indicator
    if (typingIndicatorEl) {
      typingIndicatorEl.style.display = 'flex';
      chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }

    // Realistic human-like conversational delay (350ms - 650ms)
    const delay = Math.min(750, 350 + Math.random() * 250);

    setTimeout(() => {
      if (typingIndicatorEl) typingIndicatorEl.style.display = 'none';
      const botReply = DialogueController.processUserMessage(cleanText);
      if (botReply) {
        appendMessage('bot', botReply);
      }
    }, delay);
  }

  function triggerBotResponse(text) {
    if (typingIndicatorEl) {
      typingIndicatorEl.style.display = 'flex';
      chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    }

    setTimeout(() => {
      if (typingIndicatorEl) typingIndicatorEl.style.display = 'none';
      appendMessage('bot', text);
    }, 400);
  }

  /**
   * Welcome Screen Initialization
   */
  function initWelcomeScreen() {
    const welcomeHtml = `
      <div class="welcome-hero">
        <h2>👋 Welcome to AcademiaAI!</h2>
        <p>Your intelligent, responsive academic mentor. Ask questions, construct time-blocked revision plans, explore college projects, or test your problem-solving speed.</p>
        
        <div class="feature-grid">
          <div class="feature-card" data-prompt="Create a study plan for my exam">
            <span class="feat-icon">📅</span>
            <h4>Study Timetable</h4>
            <p>Generates tailored day-by-day & hourly revision schedules.</p>
          </div>
          <div class="feature-card" data-prompt="Start an aptitude practice quiz">
            <span class="feat-icon">🧠</span>
            <h4>Aptitude Practice</h4>
            <p>Interactive placement quiz with shortcuts and live scoring.</p>
          </div>
          <div class="feature-card" data-prompt="Explain Normalization in DBMS">
            <span class="feat-icon">📚</span>
            <h4>Concept Explainer</h4>
            <p>Complex topics explained with analogies & exam tips.</p>
          </div>
          <div class="feature-card" data-prompt="Suggest college project ideas for Computer Science">
            <span class="feat-icon">💡</span>
            <h4>Project Ideas</h4>
            <p>Resume-ready project proposals with tech stacks.</p>
          </div>
        </div>
      </div>
    `;

    appendMessage('bot', welcomeHtml, true);

    // Add click listeners to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      card.addEventListener('click', () => {
        const prompt = card.getAttribute('data-prompt');
        if (prompt) sendUserQuery(prompt);
      });
    });
  }

  /**
   * Theme Switcher (Dark / Light Mode)
   */
  function initTheme() {
    const savedTheme = localStorage.getItem('academiaai_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('academiaai_theme', nextTheme);
        showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
      });
    }
  }

  /**
   * Pomodoro Study Focus Timer Logic
   */
  let pomoInterval = null;
  let pomoSecondsRemaining = 25 * 60; // 25 minutes default
  let pomoIsRunning = false;
  let pomoMode = 'FOCUS'; // 'FOCUS' (25m) or 'BREAK' (5m)

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updatePomoDisplay() {
    if (pomoDisplayEl) pomoDisplayEl.textContent = formatTime(pomoSecondsRemaining);
  }

  function startPomoTimer() {
    if (pomoIsRunning) {
      // Pause
      clearInterval(pomoInterval);
      pomoIsRunning = false;
      if (pomoStartBtn) pomoStartBtn.textContent = 'Resume';
      showToast('Study timer paused');
    } else {
      // Start
      pomoIsRunning = true;
      if (pomoStartBtn) pomoStartBtn.textContent = 'Pause';
      showToast(`${pomoMode === 'FOCUS' ? 'Focus Session Started (25m)' : 'Break Started (5m)'}`);

      pomoInterval = setInterval(() => {
        if (pomoSecondsRemaining > 0) {
          pomoSecondsRemaining--;
          updatePomoDisplay();
        } else {
          // Timer finished!
          clearInterval(pomoInterval);
          pomoIsRunning = false;
          if (pomoStartBtn) pomoStartBtn.textContent = 'Start Focus';

          // Play audio beep via Web Audio API (0 external assets!)
          playTimerBeep();

          if (pomoMode === 'FOCUS') {
            showToast('🎉 Focus session complete! Time for a 5-minute break.');
            switchPomoMode('BREAK');
          } else {
            showToast('⏰ Break finished! Ready to focus again?');
            switchPomoMode('FOCUS');
          }
        }
      }, 1000);
    }
  }

  function resetPomoTimer() {
    clearInterval(pomoInterval);
    pomoIsRunning = false;
    pomoSecondsRemaining = (pomoMode === 'FOCUS') ? 25 * 60 : 5 * 60;
    updatePomoDisplay();
    if (pomoStartBtn) pomoStartBtn.textContent = (pomoMode === 'FOCUS') ? 'Start Focus' : 'Start Break';
    showToast('Timer reset');
  }

  function switchPomoMode(targetMode) {
    clearInterval(pomoInterval);
    pomoIsRunning = false;
    pomoMode = targetMode || (pomoMode === 'FOCUS' ? 'BREAK' : 'FOCUS');

    if (pomoMode === 'FOCUS') {
      pomoSecondsRemaining = 25 * 60;
      if (pomoModeBadgeEl) pomoModeBadgeEl.textContent = 'Focus';
      if (pomoModeBtn) pomoModeBtn.textContent = 'Break (5m)';
      if (pomoStartBtn) pomoStartBtn.textContent = 'Start Focus';
    } else {
      pomoSecondsRemaining = 5 * 60;
      if (pomoModeBadgeEl) pomoModeBadgeEl.textContent = 'Rest Break';
      if (pomoModeBtn) pomoModeBtn.textContent = 'Focus (25m)';
      if (pomoStartBtn) pomoStartBtn.textContent = 'Start Break';
    }
    updatePomoDisplay();
  }

  // Synthesizes a clean chime using AudioContext without external audio files
  function playTimerBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.85);
    } catch (e) {
      // AudioContext might be restricted prior to user gesture
    }
  }

  function initPomodoro() {
    if (pomoStartBtn) pomoStartBtn.addEventListener('click', startPomoTimer);
    if (pomoResetBtn) pomoResetBtn.addEventListener('click', resetPomoTimer);
    if (pomoModeBtn) pomoModeBtn.addEventListener('click', () => switchPomoMode());
    updatePomoDisplay();
  }

  /**
   * Export Chat Session Notes to Text File
   */
  function exportChatNotes() {
    if (!ConversationContext.messages.length) {
      showToast('No messages to export yet.');
      return;
    }

    let exportContent = `ACADEMIA-AI STUDY NOTES & SESSION TRANSCRIPT\n`;
    exportContent += `Date: ${new Date().toLocaleString()}\n`;
    exportContent += `Major: ${ConversationContext.profile.major}\n`;
    exportContent += `Aptitude Score: ${ConversationContext.quiz.score}\n`;
    exportContent += `==================================================================\n\n`;

    ConversationContext.messages.forEach(m => {
      exportContent += `[${m.timestamp}] ${m.sender === 'user' ? 'STUDENT' : 'ACADEMIA-AI'}:\n`;
      // Clean up markdown hashes for plain text
      const clean = m.text.replace(/###/g, '').replace(/##/g, '').replace(/\*\*/g, '');
      exportContent += `${clean}\n\n`;
    });

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AcademiaAI_Notes_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Study notes exported successfully! 📄');
  }

  /**
   * Event Listeners Setup
   */
  function initEventListeners() {
    // Chat Form Submission
    if (chatFormEl && userInputEl) {
      chatFormEl.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = userInputEl.value;
        userInputEl.value = '';
        userInputEl.style.height = 'auto';
        sendUserQuery(query);
      });

      // Textarea Auto-Resize & Enter key to submit
      userInputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          chatFormEl.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      });

      userInputEl.addEventListener('input', () => {
        userInputEl.style.height = 'auto';
        userInputEl.style.height = `${Math.min(userInputEl.scrollHeight, 120)}px`;
      });
    }

    // Suggested Chips clicks
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt) sendUserQuery(prompt);
      });
    });

    // Quick Action Nav Items in Sidebar
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const action = item.getAttribute('data-action');
        // Close sidebar on mobile
        if (window.innerWidth <= 900 && sidebarEl) {
          sidebarEl.classList.remove('open');
          if (sidebarOverlayEl) sidebarOverlayEl.classList.remove('active');
        }

        switch (action) {
          case 'study-plan':
            sendUserQuery('Create a study plan');
            break;
          case 'exam-prep':
            sendUserQuery('Create a 3-phase revision plan');
            break;
          case 'aptitude-quiz':
            sendUserQuery('Start an aptitude practice quiz');
            break;
          case 'explain-concept':
            sendUserQuery('Explain Dynamic Programming vs Recursion');
            break;
          case 'project-ideas':
            sendUserQuery('Suggest college project ideas for Computer Science');
            break;
          case 'time-management':
            sendUserQuery('How can I manage time effectively during exams?');
            break;
          case 'career-internship':
            sendUserQuery('How to get a software engineering internship?');
            break;
          case 'study-resources':
            sendUserQuery('Recommend free study resources for college');
            break;
        }
      });
    });

    // Reset Flow & Session Controls
    const resetHandler = () => {
      ConversationContext.clearWorkflow();
      if (ConversationContext.quiz.active) ConversationContext.quiz.active = false;
      showToast('Session workflow and memory reset');
      sendUserQuery('restart');
    };

    if (restartFlowBtn) restartFlowBtn.addEventListener('click', resetHandler);
    if (headerRestartBtn) headerRestartBtn.addEventListener('click', resetHandler);

    // Clear Chat Button
    if (clearChatBtn) {
      clearChatBtn.addEventListener('click', () => {
        if (confirm('Clear entire chat conversation history?')) {
          chatMessagesEl.innerHTML = '';
          ConversationContext.messages = [];
          ConversationContext.clearWorkflow();
          initWelcomeScreen();
          showToast('Chat history cleared');
        }
      });
    }

    // Export Chat Button
    if (exportChatBtn) exportChatBtn.addEventListener('click', exportChatNotes);

    // Voice dictation simulator button
    const voiceHelpBtn = document.getElementById('voiceHelpBtn');
    if (voiceHelpBtn) {
      voiceHelpBtn.addEventListener('click', () => {
        showToast('Voice dictation prompt simulation active');
        if (userInputEl) {
          userInputEl.value = 'Create a study plan for Data Structures';
          userInputEl.focus();
        }
      });
    }

    // Responsive Mobile Sidebar Toggle
    if (sidebarOpenBtn && sidebarEl && sidebarOverlayEl) {
      sidebarOpenBtn.addEventListener('click', () => {
        sidebarEl.classList.add('open');
        sidebarOverlayEl.classList.add('active');
      });
    }

    if (sidebarCloseBtn && sidebarEl && sidebarOverlayEl) {
      sidebarCloseBtn.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        sidebarOverlayEl.classList.remove('active');
      });
    }

    if (sidebarOverlayEl && sidebarEl) {
      sidebarOverlayEl.addEventListener('click', () => {
        sidebarEl.classList.remove('open');
        sidebarOverlayEl.classList.remove('active');
      });
    }
  }

  /**
   * Application Bootstrapper
   */
  function initApp() {
    initTheme();
    initPomodoro();
    initEventListeners();
    initWelcomeScreen();
    ConversationContext.updateContextUI();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
