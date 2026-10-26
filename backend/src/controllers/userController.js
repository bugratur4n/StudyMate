const db = require('../config/db');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // authMiddleware'den geliyor

    // 1. Kullanıcı bilgilerini al
    const userResult = await db.query(
      'SELECT id, first_name, last_name, email, department, is_premium, daily_session_count FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // 2. Kullanıcının kayıtlı olduğu dersleri al (user_courses ve courses tablolarını birleştirerek)
    const coursesResult = await db.query(`
      SELECT c.id, c.course_code, c.course_name, uc.proficiency_level
      FROM user_courses uc
      JOIN courses c ON uc.course_id = c.id
      WHERE uc.user_id = $1
    `, [userId]);

    res.json({
      message: 'Profil bilgileri başarıyla getirildi.',
      user: {
        ...userResult.rows[0],
        courses: coursesResult.rows
      }
    });
  } catch (error) {
    console.error('Profil getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};