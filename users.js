-- SkillSwap Demo Seed Data
-- Password for ALL demo users is: demo1234
-- bcrypt hash of 'demo1234' with 10 rounds: $2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS

-- Truncate existing data
TRUNCATE TABLE ratings, messages, swap_requests, custom_skill_requests, skills_wanted, skills_offered, users RESTART IDENTITY CASCADE;

-- =============================================
-- USERS (password: demo1234)
-- =============================================
INSERT INTO users (name, email, password_hash, university, bio, badge, created_at) VALUES
(
  'Alex Chen',
  'alex.chen@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'MIT',
  'Full-stack developer with a passion for building scalable web apps. I love teaching React and modern JavaScript. Looking to learn data science and ML.',
  'Expert',
  NOW() - INTERVAL '30 days'
),
(
  'Priya Sharma',
  'priya.sharma@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'Stanford University',
  'Machine learning researcher and Python enthusiast. I can teach TensorFlow, data analysis, and statistics. Want to improve my frontend skills!',
  'Expert',
  NOW() - INTERVAL '25 days'
),
(
  'Marcus Johnson',
  'marcus.j@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'University of Texas',
  'UI/UX designer who codes. Specializing in Figma, design systems, and CSS animations. Eager to learn backend development and databases.',
  'Intermediate',
  NOW() - INTERVAL '20 days'
),
(
  'Sofia Martinez',
  'sofia.m@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'UC Berkeley',
  'Cybersecurity student and ethical hacker. I know penetration testing and network security. Want to learn mobile app development.',
  'Intermediate',
  NOW() - INTERVAL '18 days'
),
(
  'James Park',
  'james.park@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'Carnegie Mellon',
  'iOS and Android developer with 3+ years experience. Swift and Kotlin are my superpowers. Looking to level up my DevOps and cloud knowledge.',
  'Expert',
  NOW() - INTERVAL '15 days'
),
(
  'Emma Wilson',
  'emma.wilson@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'Oxford University',
  'Data analyst and visualization wizard. Expert in Tableau, Power BI, and SQL. Curious about machine learning and AI applications.',
  'Intermediate',
  NOW() - INTERVAL '12 days'
),
(
  'Raj Patel',
  'raj.patel@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'IIT Bombay',
  'Cloud architect certified in AWS and GCP. I love helping people learn DevOps and containerization. Want to sharpen my frontend design skills.',
  'Expert',
  NOW() - INTERVAL '10 days'
),
(
  'Chloe Dubois',
  'chloe.d@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'École Polytechnique',
  'Blockchain developer and smart contract engineer. Experienced with Solidity and Web3.js. Looking to learn about data science and Python.',
  'Intermediate',
  NOW() - INTERVAL '8 days'
),
(
  'Tyler Brooks',
  'tyler.b@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'Georgia Tech',
  'Game developer using Unity and Unreal Engine. Passionate about graphics programming and shaders. Wants to learn web development.',
  'Beginner',
  NOW() - INTERVAL '6 days'
),
(
  'Aisha Nkosi',
  'aisha.n@demo.com',
  '$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS',
  'University of Cape Town',
  'Backend engineer specializing in Go and microservices. Experienced with gRPC and Kubernetes. Interested in learning ML and data pipelines.',
  'Expert',
  NOW() - INTERVAL '3 days'
);

-- =============================================
-- SKILLS OFFERED
-- =============================================
-- Alex Chen (1)
INSERT INTO skills_offered (user_id, skill) VALUES
(1, 'React'), (1, 'Node.js'), (1, 'TypeScript'), (1, 'GraphQL'), (1, 'PostgreSQL');

-- Priya Sharma (2)
INSERT INTO skills_offered (user_id, skill) VALUES
(2, 'Python'), (2, 'Machine Learning'), (2, 'TensorFlow'), (2, 'Data Analysis'), (2, 'Statistics');

-- Marcus Johnson (3)
INSERT INTO skills_offered (user_id, skill) VALUES
(3, 'UI/UX Design'), (3, 'Figma'), (3, 'CSS Animations'), (3, 'Design Systems'), (3, 'Adobe XD');

-- Sofia Martinez (4)
INSERT INTO skills_offered (user_id, skill) VALUES
(4, 'Cybersecurity'), (4, 'Penetration Testing'), (4, 'Network Security'), (4, 'Linux'), (4, 'Ethical Hacking');

-- James Park (5)
INSERT INTO skills_offered (user_id, skill) VALUES
(5, 'iOS Development'), (5, 'Android Development'), (5, 'Swift'), (5, 'Kotlin'), (5, 'React Native');

-- Emma Wilson (6)
INSERT INTO skills_offered (user_id, skill) VALUES
(6, 'Data Visualization'), (6, 'Tableau'), (6, 'Power BI'), (6, 'SQL'), (6, 'Excel / VBA');

-- Raj Patel (7)
INSERT INTO skills_offered (user_id, skill) VALUES
(7, 'AWS'), (7, 'Docker'), (7, 'Kubernetes'), (7, 'CI/CD Pipelines'), (7, 'Terraform');

-- Chloe Dubois (8)
INSERT INTO skills_offered (user_id, skill) VALUES
(8, 'Blockchain'), (8, 'Solidity'), (8, 'Web3.js'), (8, 'Smart Contracts'), (8, 'Ethereum');

-- Tyler Brooks (9)
INSERT INTO skills_offered (user_id, skill) VALUES
(9, 'Unity'), (9, 'Unreal Engine'), (9, 'C#'), (9, 'Game Design'), (9, 'GLSL Shaders');

-- Aisha Nkosi (10)
INSERT INTO skills_offered (user_id, skill) VALUES
(10, 'Go (Golang)'), (10, 'Microservices'), (10, 'gRPC'), (10, 'Kubernetes'), (10, 'System Design');

-- =============================================
-- SKILLS WANTED
-- =============================================
-- Alex Chen (1)
INSERT INTO skills_wanted (user_id, skill) VALUES
(1, 'Machine Learning'), (1, 'Data Science'), (1, 'Python'), (1, 'UI/UX Design');

-- Priya Sharma (2)
INSERT INTO skills_wanted (user_id, skill) VALUES
(2, 'React'), (2, 'TypeScript'), (2, 'UI/UX Design'), (2, 'GraphQL');

-- Marcus Johnson (3)
INSERT INTO skills_wanted (user_id, skill) VALUES
(3, 'Node.js'), (3, 'PostgreSQL'), (3, 'AWS'), (3, 'Docker');

-- Sofia Martinez (4)
INSERT INTO skills_wanted (user_id, skill) VALUES
(4, 'iOS Development'), (4, 'React Native'), (4, 'Flutter'), (4, 'Swift');

-- James Park (5)
INSERT INTO skills_wanted (user_id, skill) VALUES
(5, 'AWS'), (5, 'Docker'), (5, 'Kubernetes'), (5, 'CI/CD Pipelines');

-- Emma Wilson (6)
INSERT INTO skills_wanted (user_id, skill) VALUES
(6, 'Machine Learning'), (6, 'Python'), (6, 'TensorFlow'), (6, 'AI Applications');

-- Raj Patel (7)
INSERT INTO skills_wanted (user_id, skill) VALUES
(7, 'React'), (7, 'UI/UX Design'), (7, 'Figma'), (7, 'CSS Animations');

-- Chloe Dubois (8)
INSERT INTO skills_wanted (user_id, skill) VALUES
(8, 'Python'), (8, 'Data Science'), (8, 'Machine Learning'), (8, 'Data Analysis');

-- Tyler Brooks (9)
INSERT INTO skills_wanted (user_id, skill) VALUES
(9, 'React'), (9, 'Node.js'), (9, 'TypeScript'), (9, 'Web APIs');

-- Aisha Nkosi (10)
INSERT INTO skills_wanted (user_id, skill) VALUES
(10, 'Machine Learning'), (10, 'Python ML Pipelines'), (10, 'Data Engineering'), (10, 'Spark');

-- =============================================
-- SWAP REQUESTS (various statuses)
-- =============================================
INSERT INTO swap_requests (sender_id, receiver_id, status, message, created_at) VALUES
(1, 2, 'accepted', 'Hey Priya! I can teach you React and TypeScript. Would love to learn ML from you!', NOW() - INTERVAL '20 days'),
(2, 3, 'accepted', 'Hi Marcus! I want to improve my UI skills. I can share my Python and data skills with you.', NOW() - INTERVAL '18 days'),
(3, 7, 'accepted', 'Hey Raj! Let''s swap — I teach you Figma & design, you teach me AWS and Docker.', NOW() - INTERVAL '15 days'),
(5, 7, 'pending',  'Hi Raj! You know AWS and I know mobile dev — let''s swap! I need cloud skills badly.', NOW() - INTERVAL '10 days'),
(4, 5, 'pending',  'Hi James! I can teach you network security and ethical hacking in exchange for Swift lessons.', NOW() - INTERVAL '9 days'),
(6, 2, 'pending',  'Hi Priya! I''m a data analyst wanting to break into ML. Would you mentor me on TensorFlow?', NOW() - INTERVAL '7 days'),
(9, 1, 'pending',  'Alex! I''m a game dev wanting to learn web. Would love to swap Unity skills for React lessons!', NOW() - INTERVAL '5 days'),
(8, 2, 'pending',  'Priya, I can teach you Solidity and smart contracts if you help me learn Python for data!', NOW() - INTERVAL '4 days'),
(10, 2, 'accepted','Hi Priya! I''d love to learn ML pipelines from you. I can help you with Go and microservices.', NOW() - INTERVAL '14 days'),
(1, 7, 'pending',  'Raj, your DevOps skills are amazing. I can help with React/GraphQL in return for Kubernetes!', NOW() - INTERVAL '2 days');

-- =============================================
-- MESSAGES (for accepted swaps)
-- =============================================
-- Swap 1: Alex (1) ↔ Priya (2)
INSERT INTO messages (swap_id, sender_id, content, created_at) VALUES
(1, 1, 'Hey Priya! Excited to start our skill exchange. When are you free this week?', NOW() - INTERVAL '19 days'),
(1, 2, 'Hi Alex! I''m free Wednesday and Friday evenings. Does that work for you?', NOW() - INTERVAL '19 days'),
(1, 1, 'Perfect! Let''s start with a 1-hour React intro on Wednesday. I''ll prep some exercises.', NOW() - INTERVAL '18 days'),
(1, 2, 'Awesome! And I''ll walk you through a Python ML notebook on Friday. Deal!', NOW() - INTERVAL '18 days'),
(1, 1, 'Just finished our first session — you picked up React hooks really fast!', NOW() - INTERVAL '15 days'),
(1, 2, 'Thanks! Your ML session was eye-opening. NumPy and Pandas make so much sense now.', NOW() - INTERVAL '15 days');

-- Swap 2: Priya (2) ↔ Marcus (3)
INSERT INTO messages (swap_id, sender_id, content, created_at) VALUES
(2, 2, 'Marcus! Looking forward to learning design from you. I think my apps lack good UX.', NOW() - INTERVAL '17 days'),
(2, 3, 'Don''t worry, I''ll show you the fundamentals. Let''s start with Figma basics.', NOW() - INTERVAL '17 days'),
(2, 2, 'That first session was great! I can already see how layout grids help.', NOW() - INTERVAL '14 days'),
(2, 3, 'You''re a fast learner! Your Python session really helped me understand backend logic.', NOW() - INTERVAL '14 days');

-- Swap 3: Marcus (3) ↔ Raj (7)
INSERT INTO messages (swap_id, sender_id, content, created_at) VALUES
(3, 3, 'Raj, ready to learn some cloud magic! Can we start with an AWS overview?', NOW() - INTERVAL '14 days'),
(3, 7, 'Sure! Let''s start with S3 and EC2. And I''m excited for your Figma workshop!', NOW() - INTERVAL '14 days'),
(3, 3, 'EC2 setup done! I deployed my first instance. This is so satisfying.', NOW() - INTERVAL '11 days'),
(3, 7, 'Great progress! The design system you showed me already improved my team''s workflow.', NOW() - INTERVAL '10 days');

-- Swap 9: Aisha (10) ↔ Priya (2)
INSERT INTO messages (swap_id, sender_id, content, created_at) VALUES
(9, 10, 'Hi Priya! Ready to dive into ML. What would you suggest starting with?', NOW() - INTERVAL '13 days'),
(9, 2, 'Let''s start with Scikit-learn! I''ll share a Jupyter notebook I prepared.', NOW() - INTERVAL '13 days'),
(9, 10, 'Your intro to supervised learning was brilliant! Loved the examples.', NOW() - INTERVAL '10 days'),
(9, 2, 'Your Go tutorial saved me so much time! gRPC makes sense now.', NOW() - INTERVAL '9 days');

-- =============================================
-- RATINGS (for completed/accepted swaps)
-- =============================================
INSERT INTO ratings (rater_id, rated_id, swap_id, score, created_at) VALUES
(1, 2, 1, 5, NOW() - INTERVAL '10 days'),
(2, 1, 1, 5, NOW() - INTERVAL '10 days'),
(2, 3, 2, 4, NOW() - INTERVAL '8 days'),
(3, 2, 2, 5, NOW() - INTERVAL '8 days'),
(3, 7, 3, 5, NOW() - INTERVAL '6 days'),
(7, 3, 3, 4, NOW() - INTERVAL '6 days'),
(10, 2, 9, 5, NOW() - INTERVAL '5 days'),
(2, 10, 9, 5, NOW() - INTERVAL '5 days');

-- =============================================
-- CUSTOM SKILL REQUESTS (Skill Board)
-- =============================================
INSERT INTO custom_skill_requests (user_id, title, description, created_at) VALUES
(9, 'Looking for a React Mentor',
 'I''m a game developer transitioning to web. I need someone patient who can guide me through React, hooks, state management, and building my first real web app. Happy to swap Unity/game dev skills!',
 NOW() - INTERVAL '5 days'),
(6, 'Need help understanding Neural Networks',
 'I''m a data analyst comfortable with SQL and Tableau but want to go deeper into ML. Specifically interested in understanding neural networks from scratch — not just using libraries. Can trade data viz skills.',
 NOW() - INTERVAL '7 days'),
(8, 'Smart Contract Audit Partner Wanted',
 'Looking for someone experienced in Solidity security auditing to review my smart contracts. I''m building a DeFi protocol and want a second pair of eyes. Will teach blockchain fundamentals in return.',
 NOW() - INTERVAL '4 days'),
(4, 'Flutter Developer Needed',
 'I know Swift and have some Android experience but want to learn Flutter for cross-platform development. Looking for a Flutter expert who might want to learn about network security or ethical hacking.',
 NOW() - INTERVAL '6 days'),
(3, 'Looking to learn Rust',
 'I''m a designer who codes (HTML, CSS, some JS). I''ve heard Rust is the future for systems and Web Assembly. Looking for a Rust developer to mentor me. I can help with UI/UX and Figma in return.',
 NOW() - INTERVAL '9 days'),
(7, 'Advanced CSS / Animation skills wanted',
 'I''m a backend/cloud engineer and my frontend skills are pretty basic. I want to learn advanced CSS, animations, and how to make UIs that actually look good. Will swap DevOps / AWS expertise.',
 NOW() - INTERVAL '10 days'),
(1, 'Looking for a Data Engineering mentor',
 'I''m a full-stack dev curious about the data engineering world — Spark, Airflow, dbt, data pipelines. Anyone experienced in this space who wants to swap for React or Node.js lessons?',
 NOW() - INTERVAL '11 days'),
(5, 'AR/VR Development Basics',
 'Mobile developer here. I want to explore AR development — ARKit, ARCore, and maybe Unity AR. Looking for someone in that space. Can teach Swift, Kotlin, and mobile architecture in return.',
 NOW() - INTERVAL '3 days'),
(2, 'Blockchain/Web3 Curiosity',
 'I hear a lot about Web3 but never had time to explore it. Looking for a patient blockchain dev to explain the ecosystem and perhaps do a small project together. I can teach Python and ML.',
 NOW() - INTERVAL '2 days'),
(10, 'Frontend Framework Deep Dive',
 'Backend engineer looking to finally become full-stack. I want to go beyond basics and really understand a modern frontend framework (React or Vue). Ready to trade my Go/microservices expertise.',
 NOW() - INTERVAL '1 day');
