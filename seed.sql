CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  bio TEXT,
  badge VARCHAR(50) DEFAULT 'Beginner',
  profile_picture VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills_offered (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  skill VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS skills_wanted (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  skill VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS swap_requests (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  swap_id INTEGER REFERENCES swap_requests(id) ON DELETE CASCADE,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  rater_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  rated_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  swap_id INTEGER REFERENCES swap_requests(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 1 AND score <= 5),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(rater_id, swap_id)
);

CREATE TABLE IF NOT EXISTS custom_skill_requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_offered_user ON skills_offered(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_wanted_user ON skills_wanted(user_id);
CREATE INDEX IF NOT EXISTS idx_swap_requests_sender ON swap_requests(sender_id);
CREATE INDEX IF NOT EXISTS idx_swap_requests_receiver ON swap_requests(receiver_id);
CREATE INDEX IF NOT EXISTS idx_ratings_rated ON ratings(rated_id);
CREATE INDEX IF NOT EXISTS idx_messages_swap ON messages(swap_id);
