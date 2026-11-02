const db = require('../config/db');

exports.listCourses = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, course_code, course_name, created_at FROM courses ORDER BY course_code'
    );

    res.json({
      message: 'Dersler başarıyla getirildi.',
      courses: result.rows
    });
  } catch (error) {
    console.error('Ders listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, course_code, course_name, created_at FROM courses WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ders bulunamadı.' });
    }

    res.json({
      message: 'Ders bilgisi getirildi.',
      course: result.rows[0]
    });
  } catch (error) {
    console.error('Ders getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
