const db = require('../config/db');
const { getRatingSummary } = require('../utils/userStats');

exports.createRating = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { session_id, communication_score, reliability_score, resource_sharing_score, study_harmony_score, course_contribution_score } = req.body;

    if (!session_id) {
      return res.status(400).json({ message: 'session_id zorunludur.' });
    }

    const scores = {
      communication_score,
      reliability_score,
      resource_sharing_score,
      study_harmony_score,
      course_contribution_score
    };

    for (const [key, value] of Object.entries(scores)) {
      if (value === undefined || value === null) continue;
      if (!Number.isInteger(value) || value < 1 || value > 5) {
        return res.status(400).json({ message: `${key} 1 ile 5 arasında tam sayı olmalıdır.` });
      }
    }

    if (
      communication_score == null &&
      reliability_score == null &&
      resource_sharing_score == null &&
      study_harmony_score == null &&
      course_contribution_score == null
    ) {
      return res.status(400).json({ message: 'En az bir puan alanı gönderilmelidir.' });
    }

    const sessionResult = await db.query(
      `SELECT s.id, s.status, m.user1_id, m.user2_id
       FROM sessions s
       JOIN matches m ON s.match_id = m.id
       WHERE s.id = $1`,
      [session_id]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ message: 'Oturum bulunamadı.' });
    }

    const session = sessionResult.rows[0];
    if (session.user1_id !== reviewerId && session.user2_id !== reviewerId) {
      return res.status(403).json({ message: 'Bu oturumu değerlendirme yetkiniz yok.' });
    }

    if (session.status !== 'completed') {
      return res.status(400).json({ message: 'Yalnızca tamamlanmış oturumlar değerlendirilebilir.' });
    }

    const revieweeId = session.user1_id === reviewerId ? session.user2_id : session.user1_id;

    const existing = await db.query(
      'SELECT id FROM ratings WHERE session_id = $1 AND reviewer_id = $2',
      [session_id, reviewerId]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Bu oturum için zaten değerlendirme yaptınız.' });
    }

    const inserted = await db.query(
      `INSERT INTO ratings (
         session_id, reviewer_id, reviewee_id,
         course_contribution_score, communication_score, reliability_score,
         resource_sharing_score, study_harmony_score
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        session_id,
        reviewerId,
        revieweeId,
        course_contribution_score || null,
        communication_score || null,
        reliability_score || null,
        resource_sharing_score || null,
        study_harmony_score || null
      ]
    );

    const summary = await getRatingSummary(revieweeId);

    res.status(201).json({
      message: 'Değerlendirme kaydedildi.',
      rating: inserted.rows[0],
      reviewee_summary: summary
    });
  } catch (error) {
    console.error('Değerlendirme oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listUserRatings = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id;
    const ratings = await db.query(
      `SELECT id, session_id, reviewer_id, reviewee_id,
              course_contribution_score, communication_score, reliability_score,
              resource_sharing_score, study_harmony_score, created_at
       FROM ratings
       WHERE reviewee_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    const summary = await getRatingSummary(userId);

    res.json({
      message: 'Değerlendirmeler getirildi.',
      summary,
      ratings: ratings.rows
    });
  } catch (error) {
    console.error('Değerlendirme listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
