const express = require('express');
const cors = require('cors');

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json()); // Gelen JSON verilerini okuyabilmek için

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);

// Test Rotası
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'StudyMate API çalışıyor!' });
});

// İleride rotaları buraya ekleyeceksin
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/matches', require('./routes/matchRoutes'));

module.exports = app;