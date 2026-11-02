const db = require('../config/db');

exports.createReport = async (req, res) => {
  try {
    const reporterId = req.user.id;
    const { reported_id, reason } = req.body;

    if (!reported_id || !reason) {
      return res.status(400).json({ message: 'reported_id ve reason zorunludur.' });
    }

    if (reported_id === reporterId) {
      return res.status(400).json({ message: 'Kendinizi raporlayamazsınız.' });
    }

    const userCheck = await db.query('SELECT id FROM users WHERE id = $1', [reported_id]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Raporlanan kullanıcı bulunamadı.' });
    }

    const result = await db.query(
      `INSERT INTO reports (reporter_id, reported_id, reason)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [reporterId, reported_id, reason]
    );

    res.status(201).json({
      message: 'Rapor alındı.',
      report: result.rows[0]
    });
  } catch (error) {
    console.error('Rapor oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listMyReports = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, reported_id, reason, status, created_at
       FROM reports
       WHERE reporter_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      message: 'Raporlarınız getirildi.',
      reports: result.rows
    });
  } catch (error) {
    console.error('Rapor listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
