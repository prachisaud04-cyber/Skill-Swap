const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// POST /api/ratings - submit a rating
router.post('/', authMiddleware, async (req, res) => {
  const { rated_id, swap_id, score } = req.body;
  const rater_id = req.user.id;

  if (!rated_id || !swap_id || !score) {
    return res.status(400).json({ error: 'rated_id, swap_id, and score are required' });
  }

  const scoreNum = parseInt(score);
  if (scoreNum < 1 || scoreNum > 5) {
    return res.status(400).json({ error: 'Score must be between 1 and 5' });
  }

  try {
    const swapResult = await pool.query('SELECT * FROM swap_requests WHERE id = $1', [swap_id]);
    if (swapResult.rows.length === 0) {
      return res.status(404).json({ error: 'Swap not found' });
    }

    const swap = swapResult.rows[0];
    if (swap.status !== 'accepted') {
      return res.status(403).json({ error: 'Can only rate after swap is accepted' });
    }

    if (swap.sender_id !== rater_id && swap.receiver_id !== rater_id) {
      return res.status(403).json({ error: 'You are not part of this swap' });
    }

    if (parseInt(rated_id) === rater_id) {
      return res.status(400).json({ error: 'Cannot rate yourself' });
    }

    const result = await pool.query(
      'INSERT INTO ratings (rater_id, rated_id, swap_id, score) VALUES ($1, $2, $3, $4) ON CONFLICT (rater_id, swap_id) DO UPDATE SET score = $4 RETURNING *',
      [rater_id, rated_id, swap_id, scoreNum]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Submit rating error:', err);
    res.status(500).json({ error: 'Server error submitting rating' });
  }
});

// GET /api/ratings/:userId - get average rating for a user
router.get('/:userId', authMiddleware, async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const result = await pool.query(
      'SELECT COALESCE(AVG(score), 0) as avg_rating, COUNT(*) as rating_count FROM ratings WHERE rated_id = $1',
      [userId]
    );

    res.json({
      avg_rating: parseFloat(result.rows[0].avg_rating).toFixed(1),
      rating_count: parseInt(result.rows[0].rating_count),
    });
  } catch (err) {
    console.error('Get rating error:', err);
    res.status(500).json({ error: 'Server error fetching rating' });
  }
});

// GET /api/ratings/check/:swapId - check if current user has rated in a swap
router.get('/check/:swapId', authMiddleware, async (req, res) => {
  const swapId = parseInt(req.params.swapId);
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM ratings WHERE rater_id = $1 AND swap_id = $2',
      [userId, swapId]
    );
    res.json({ hasRated: result.rows.length > 0, rating: result.rows[0] || null });
  } catch (err) {
    console.error('Check rating error:', err);
    res.status(500).json({ error: 'Server error checking rating' });
  }
});

module.exports = router;
