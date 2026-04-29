const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user_${req.user.id}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

async function getUserWithDetails(userId) {
  const userResult = await pool.query(
    'SELECT id, name, email, university, bio, badge, profile_picture, created_at FROM users WHERE id = $1',
    [userId]
  );
  if (userResult.rows.length === 0) return null;

  const user = userResult.rows[0];

  const offeredResult = await pool.query('SELECT skill FROM skills_offered WHERE user_id = $1', [userId]);
  const wantedResult = await pool.query('SELECT skill FROM skills_wanted WHERE user_id = $1', [userId]);
  const ratingResult = await pool.query(
    'SELECT COALESCE(AVG(score), 0) as avg_rating, COUNT(*) as rating_count FROM ratings WHERE rated_id = $1',
    [userId]
  );

  user.skills_offered = offeredResult.rows.map(r => r.skill);
  user.skills_wanted = wantedResult.rows.map(r => r.skill);
  user.avg_rating = parseFloat(ratingResult.rows[0].avg_rating).toFixed(1);
  user.rating_count = parseInt(ratingResult.rows[0].rating_count);

  return user;
}

// GET /api/users - all users for dashboard
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usersResult = await pool.query(
      'SELECT id FROM users WHERE id != $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    const users = [];
    for (const row of usersResult.rows) {
      const user = await getUserWithDetails(row.id);
      if (user) users.push(user);
    }

    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// GET /api/users/me - current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await getUserWithDetails(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/users/:id - single user profile
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await getUserWithDetails(parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Server error fetching user' });
  }
});

// PUT /api/users/:id - update profile
router.put('/:id', authMiddleware, async (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden: cannot edit another user\'s profile' });
  }

  const { name, university, bio, badge, skills_offered, skills_wanted } = req.body;

  try {
    await pool.query(
      'UPDATE users SET name = $1, university = $2, bio = $3, badge = $4 WHERE id = $5',
      [name, university || null, bio || null, badge || 'Beginner', userId]
    );

    await pool.query('DELETE FROM skills_offered WHERE user_id = $1', [userId]);
    await pool.query('DELETE FROM skills_wanted WHERE user_id = $1', [userId]);

    if (skills_offered && Array.isArray(skills_offered)) {
      for (const skill of skills_offered) {
        if (skill.trim()) {
          await pool.query('INSERT INTO skills_offered (user_id, skill) VALUES ($1, $2)', [userId, skill.trim()]);
        }
      }
    }

    if (skills_wanted && Array.isArray(skills_wanted)) {
      for (const skill of skills_wanted) {
        if (skill.trim()) {
          await pool.query('INSERT INTO skills_wanted (user_id, skill) VALUES ($1, $2)', [userId, skill.trim()]);
        }
      }
    }

    const user = await getUserWithDetails(userId);
    res.json(user);
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// POST /api/users/:id/upload - upload profile picture
router.post('/:id/upload', authMiddleware, upload.single('picture'), async (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const picturePath = `/uploads/${req.file.filename}`;
    await pool.query('UPDATE users SET profile_picture = $1 WHERE id = $2', [picturePath, userId]);
    res.json({ profile_picture: picturePath });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error uploading picture' });
  }
});

module.exports = router;
