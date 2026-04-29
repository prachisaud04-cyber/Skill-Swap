const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const swapRoutes = require('./routes/swaps');
const messageRoutes = require('./routes/messages');
const ratingRoutes = require('./routes/ratings');
const customRequestRoutes = require('./routes/customRequests');

const app = express();
const PORT = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/custom-requests', customRequestRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkillSwap backend running on http://0.0.0.0:${PORT}`);
});
