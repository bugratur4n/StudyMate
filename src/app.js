const express = require('express');
const cors = require('cors');

const app = express();

// Middleware'ler
app.use(cors());
app.use(express.json()); // Gelen JSON verilerini okuyabilmek için

// Rotaları içeri aktarıyoruz
const authRoutes = require('./routes/authRoutes');

// Rotaları kullanıma açıyoruz
app.use('/api/auth', authRoutes);

// Test Rotası
app.get('/api/health', (req, res) => {
  res.json({ status: 'success', message: 'StudyMate API çalışıyor!' });
});

// İleride rotaları buraya ekleyeceksin
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/matches', require('./routes/matchRoutes'));

module.exports = app;