-- =============================================
-- SkillSwap Demo Seed Data (Assam Version)
-- =============================================

-- Password for ALL demo users: demo1234
-- bcrypt hash:
-- $2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS

-- =============================================
-- RESET DATABASE
-- =============================================
TRUNCATE TABLE 
  ratings, messages, swap_requests, custom_skill_requests, 
  skills_wanted, skills_offered, users 
RESTART IDENTITY CASCADE;

-- =============================================
-- USERS
-- =============================================
INSERT INTO users (name, email, password_hash, university, bio, badge, created_at) VALUES

('Prachi Saud','prachisaud@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Gauhati University','Full-stack developer. Loves React & JS. Wants ML & Data Science.','Expert', NOW() - INTERVAL '30 days'),

('Priya Sharma','priya.sharma@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Tezpur University','ML researcher. Teaches Python & TensorFlow. Wants frontend skills.','Expert', NOW() - INTERVAL '25 days'),

('Hridip Sarma','hridip@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Cotton University','UI/UX designer. Expert in Figma & CSS. Wants backend skills.','Intermediate', NOW() - INTERVAL '20 days'),

('Licha Pathak','licha@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Assam Don Bosco University','Cybersecurity student. Ethical hacking & Linux. Wants app dev.','Intermediate', NOW() - INTERVAL '18 days'),

('Abhijeet Das','abhijeet@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Dibrugarh University','Mobile dev (Swift/Kotlin). Wants DevOps skills.','Expert', NOW() - INTERVAL '15 days'),

('Azadul Hoque','azadul@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Assam University','Data analyst. Tableau & SQL expert. Wants ML.','Intermediate', NOW() - INTERVAL '12 days'),

('Raj Patel','raj.patel@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Kaziranga University','Cloud architect (AWS/GCP). Wants UI/UX.','Expert', NOW() - INTERVAL '10 days'),

('Raju Parasor','rajuparasor.d@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Royal Global University','Blockchain dev. Solidity & Web3. Wants Data Science.','Intermediate', NOW() - INTERVAL '8 days'),

('Anurag Deka','anuragdeka.b@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Assam Agricultural University','Game dev (Unity/Unreal). Wants web dev.','Beginner', NOW() - INTERVAL '6 days'),

('Aisha Das','aisha.n@demo.com','$2a$10$vPagHQo19RAj8YjhsOS5Fur777phIUG7.VbiOLc0A4nBPKWeB4ITS','Krishna Kanta Handiqui State Open University','Backend engineer (Go). Wants ML & data pipelines.','Expert', NOW() - INTERVAL '3 days');

-- =============================================
-- SKILLS OFFERED
-- =============================================
INSERT INTO skills_offered (user_id, skill) VALUES
(1,'React'),(1,'Node.js'),(1,'TypeScript'),(1,'GraphQL'),(1,'PostgreSQL'),
(2,'Python'),(2,'Machine Learning'),(2,'TensorFlow'),(2,'Data Analysis'),(2,'Statistics'),
(3,'UI/UX Design'),(3,'Figma'),(3,'CSS Animations'),(3,'Design Systems'),(3,'Adobe XD'),
(4,'Cybersecurity'),(4,'Penetration Testing'),(4,'Network Security'),(4,'Linux'),(4,'Ethical Hacking'),
(5,'iOS Development'),(5,'Android Development'),(5,'Swift'),(5,'Kotlin'),(5,'React Native'),
(6,'Data Visualization'),(6,'Tableau'),(6,'Power BI'),(6,'SQL'),(6,'Excel / VBA'),
(7,'AWS'),(7,'Docker'),(7,'Kubernetes'),(7,'CI/CD Pipelines'),(7,'Terraform'),
(8,'Blockchain'),(8,'Solidity'),(8,'Web3.js'),(8,'Smart Contracts'),(8,'Ethereum'),
(9,'Unity'),(9,'Unreal Engine'),(9,'C#'),(9,'Game Design'),(9,'GLSL Shaders'),
(10,'Go (Golang)'),(10,'Microservices'),(10,'gRPC'),(10,'Kubernetes'),(10,'System Design');

-- =============================================
-- SKILLS WANTED
-- =============================================
INSERT INTO skills_wanted (user_id, skill) VALUES
(1,'Machine Learning'),(1,'Data Science'),(1,'Python'),(1,'UI/UX Design'),
(2,'React'),(2,'TypeScript'),(2,'UI/UX Design'),(2,'GraphQL'),
(3,'Node.js'),(3,'PostgreSQL'),(3,'AWS'),(3,'Docker'),
(4,'iOS Development'),(4,'React Native'),(4,'Flutter'),(4,'Swift'),
(5,'AWS'),(5,'Docker'),(5,'Kubernetes'),(5,'CI/CD Pipelines'),
(6,'Machine Learning'),(6,'Python'),(6,'TensorFlow'),(6,'AI Applications'),
(7,'React'),(7,'UI/UX Design'),(7,'Figma'),(7,'CSS Animations'),
(8,'Python'),(8,'Data Science'),(8,'Machine Learning'),(8,'Data Analysis'),
(9,'React'),(9,'Node.js'),(9,'TypeScript'),(9,'Web APIs'),
(10,'Machine Learning'),(10,'Python ML Pipelines'),(10,'Data Engineering'),(10,'Spark');

-- =============================================
-- SWAP REQUESTS
-- =============================================
INSERT INTO swap_requests (sender_id, receiver_id, status, message, created_at) VALUES
(1,2,'accepted','Let’s swap React for ML!', NOW() - INTERVAL '20 days'),
(2,3,'accepted','Teach me UI/UX, I’ll teach Python.', NOW() - INTERVAL '18 days'),
(3,7,'accepted','Design for AWS swap?', NOW() - INTERVAL '15 days'),
(5,7,'pending','Mobile dev for cloud skills?', NOW() - INTERVAL '10 days'),
(4,5,'pending','Security for Swift lessons?', NOW() - INTERVAL '9 days');

-- =============================================
-- MESSAGES
-- =============================================
INSERT INTO messages (swap_id, sender_id, content, created_at) VALUES
(1,1,'Hey! Ready to start?', NOW() - INTERVAL '19 days'),
(1,2,'Yes! Let’s begin.', NOW() - INTERVAL '19 days'),
(2,2,'Excited for UI learning!', NOW() - INTERVAL '17 days'),
(2,3,'Let’s start with Figma.', NOW() - INTERVAL '17 days');

-- =============================================
-- RATINGS
-- =============================================
INSERT INTO ratings (rater_id, rated_id, swap_id, score, created_at) VALUES
(1,2,1,5, NOW() - INTERVAL '10 days'),
(2,1,1,5, NOW() - INTERVAL '10 days'),
(2,3,2,4, NOW() - INTERVAL '8 days'),
(3,2,2,5, NOW() - INTERVAL '8 days');

-- =============================================
-- CUSTOM SKILL REQUESTS
-- =============================================
INSERT INTO custom_skill_requests (user_id, title, description, created_at) VALUES
(9,'Need React Mentor','Game dev switching to web. Need React help.', NOW() - INTERVAL '5 days'),
(6,'Learn Neural Networks','Want deep ML understanding.', NOW() - INTERVAL '7 days'),
(4,'Flutter Help Needed','Want cross-platform dev skills.', NOW() - INTERVAL '6 days'),
(1,'Data Engineering Mentor','Interested in pipelines & Spark.', NOW() - INTERVAL '11 days');

-- =============================================
-- DONE ✅
-- =============================================
