const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// POST /api/messages - send a message
router.post('/', authMiddleware, async (req, res) => {
  const { swap_id, content } = req.body;
  const sender_id = req.user.id;

  if (!swap_id || !content || !content.trim()) {
    return res.status(400).json({ error: 'swap_id and content are required' });
  }

  try {
    const swapResult = await pool.query('SELECT * FROM swap_requests WHERE id = $1', [swap_id]);
    if (swapResult.rows.length === 0) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    const swap = swapResult.rows[0];
    if (swap.status !== 'accepted') {
      return res.status(403).json({ error: 'Can only message in accepted swaps' });
    }

    if (swap.sender_id !== sender_id && swap.receiver_id !== sender_id) {
      return res.status(403).json({ error: 'You are not part of this swap' });
    }

    const result = await pool.query(
      'INSERT INTO messages (swap_id, sender_id, content) VALUES ($1, $2, $3) RETURNING *',
      [swap_id, sender_id, content.trim()]
    );

    const msgWithSender = await pool.query(
      'SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.id = $1',
      [result.rows[0].id]
    );

    res.status(201).json(msgWithSender.rows[0]);
  } catch (err) {
    console.error('Send message error:', err);
    res.status(500).json({ error: 'Server error sending message' });
  }
});

// GET /api/messages/:swapId - get messages for a swap
router.get('/:swapId', authMiddleware, async (req, res) => {
  const swapId = parseInt(req.params.swapId);
  const userId = req.user.id;

  try {
    const swapResult = await pool.query('SELECT * FROM swap_requests WHERE id = $1', [swapId]);
    if (swapResult.rows.length === 0) {
      return res.status(404).json({ error: 'Swap request not found' });
    }

    const swap = swapResult.rows[0];
    if (swap.sender_id !== userId && swap.receiver_id !== userId) {
      return res.status(403).json({ error: 'You are not part of this swap' });
    }

    const result = await pool.query(
      'SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.swap_id = $1 ORDER BY m.created_at ASC',
      [swapId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Get messages error:', err);
    res.status(500).json({ error: 'Server error fetching messages' });
  }
});

module.exports = router;
